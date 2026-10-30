import { NextResponse } from "next/server";
import { addWish, listWishes } from "@/lib/wishes";
import { ATTENDANCE_OPTIONS, MESSAGE_MAX, NAME_MAX, type Attendance } from "@/lib/wish-types";

export const dynamic = "force-dynamic";

const badRequest = (error: string) => NextResponse.json({ error }, { status: 400 });

export async function GET() {
  try {
    return NextResponse.json(await listWishes());
  } catch (err) {
    console.error("Gagal memuat ucapan:", err);
    return NextResponse.json({ error: "Gagal memuat ucapan" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return badRequest("Data tidak valid");
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const attendance = body.attendance as Attendance;

  if (!name) return badRequest("Nama wajib diisi");
  if (name.length > NAME_MAX) return badRequest(`Nama maksimal ${NAME_MAX} karakter`);
  if (!message) return badRequest("Ucapan wajib diisi");
  if (message.length > MESSAGE_MAX) return badRequest(`Ucapan maksimal ${MESSAGE_MAX} karakter`);
  if (!ATTENDANCE_OPTIONS.includes(attendance)) return badRequest("Pilih status kehadiran");

  try {
    const wish = await addWish({ name, message, attendance });
    return NextResponse.json(wish, { status: 201 });
  } catch (err) {
    console.error("Gagal menyimpan ucapan:", err);
    return NextResponse.json({ error: "Gagal menyimpan ucapan, coba lagi" }, { status: 500 });
  }
}
