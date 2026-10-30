import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { Pool } from "pg";
import type { NewWish, Wish } from "./wish-types";

/**
 * Penyimpanan ucapan tamu.
 * - Jika env DATABASE_URL diisi → disimpan di PostgreSQL (Neon, Supabase, dll).
 * - Jika tidak → disimpan di file data/wishes.json (cocok untuk development lokal).
 */

const LIST_LIMIT = 200;

// ---------- PostgreSQL ----------

type Db = { pool: Pool; ready: Promise<unknown> };
const globalForDb = globalThis as unknown as { wishesDb?: Db };

function getDb(): Db {
  if (!globalForDb.wishesDb) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 3 });
    const ready = pool.query(`
      CREATE TABLE IF NOT EXISTS wishes (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        message TEXT NOT NULL,
        attendance TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    globalForDb.wishesDb = { pool, ready };
  }
  return globalForDb.wishesDb;
}

type WishRow = { id: number; name: string; message: string; attendance: Wish["attendance"]; created_at: Date };

const toWish = (row: WishRow): Wish => ({
  id: String(row.id),
  name: row.name,
  message: row.message,
  attendance: row.attendance,
  createdAt: new Date(row.created_at).toISOString(),
});

async function pgList() {
  const { pool, ready } = getDb();
  await ready;
  const { rows } = await pool.query<WishRow>(
    "SELECT id, name, message, attendance, created_at FROM wishes ORDER BY created_at DESC LIMIT $1",
    [LIST_LIMIT],
  );
  return rows.map(toWish);
}

async function pgAdd(wish: NewWish) {
  const { pool, ready } = getDb();
  await ready;
  const { rows } = await pool.query<WishRow>(
    "INSERT INTO wishes (name, message, attendance) VALUES ($1, $2, $3) RETURNING id, name, message, attendance, created_at",
    [wish.name, wish.message, wish.attendance],
  );
  return toWish(rows[0]);
}

// ---------- File JSON (fallback lokal) ----------

const FILE_PATH = path.join(process.cwd(), "data", "wishes.json");

async function fileList(): Promise<Wish[]> {
  try {
    return JSON.parse(await fs.readFile(FILE_PATH, "utf8"));
  } catch {
    return [];
  }
}

async function fileAdd(wish: NewWish) {
  const list = await fileList();
  const created: Wish = { ...wish, id: randomUUID(), createdAt: new Date().toISOString() };
  list.unshift(created);
  await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify(list.slice(0, LIST_LIMIT * 5), null, 2));
  return created;
}

// ---------- API ----------

const hasDatabaseUrl = () => Boolean(process.env.DATABASE_URL);

export async function listWishes() {
  return hasDatabaseUrl() ? pgList() : (await fileList()).slice(0, LIST_LIMIT);
}

export async function addWish(wish: NewWish) {
  return hasDatabaseUrl() ? pgAdd(wish) : fileAdd(wish);
}
