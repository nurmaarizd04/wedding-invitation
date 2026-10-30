# 💍 Wedding Invitation

Website undangan pernikahan digital berbasis **Next.js 15 + Tailwind CSS 4**.

## ✨ Fitur

- **Cover pembuka** bergaya floral dengan kelopak bunga berjatuhan dan nama tamu otomatis dari link (`?to=Nama+Tamu`)
- **Tampilan desktop premium**: slideshow foto di kiri, undangan berbentuk kolom HP di kanan
- **Menu navigasi bawah** untuk lompat ke tiap bagian
- **Kisah cinta** dalam bentuk timeline
- **Hitung mundur** menuju hari acara + tombol *Simpan ke Google Calendar*
- **Profil mempelai**: foto, nama lengkap, orang tua, dan Instagram
- **Waktu & tempat**: tanggal, jam, alamat, tombol Google Maps, dan peta tertanam
- **Galeri foto** dengan tampilan layar penuh (bisa geser kiri/kanan)
- **Amplop digital**: nomor rekening/e-wallet dengan tombol salin, QRIS (opsional), dan alamat kirim kado
- **Ucapan & doa** dari tamu + konfirmasi kehadiran (Hadir / Tidak Hadir / Masih Ragu)
- **Musik latar** yang otomatis berputar saat undangan dibuka, dengan tombol putar/jeda
- Animasi muncul saat di-scroll, responsif untuk HP dan desktop

## 🚀 Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## ✏️ Mengubah Isi Undangan

Semua isi diatur di satu file: **[`src/data/wedding.ts`](src/data/wedding.ts)**

| Bagian | Yang diubah |
| --- | --- |
| `groom` / `bride` | Nama panggilan, nama lengkap, orang tua, foto, Instagram |
| `coverPhoto` | Foto dalam bingkai lengkung di halaman pembuka |
| `heroPhoto` | Foto latar bagian pertama (hitung mundur) |
| `sidePhotos` | Slideshow foto di sisi kiri saat dibuka di laptop/desktop |
| `footerPhoto` | Foto latar bagian penutup |
| `story` | Kisah cinta: tanggal, judul, cerita, foto (kosongkan `[]` untuk menyembunyikan) |
| `interludes` | Dua selingan foto layar penuh (setelah Mempelai & setelah Waktu & Tempat): foto, judul, kalimat |
| `events` | Nama acara, waktu mulai/selesai, nama tempat, alamat, kata kunci Google Maps |
| `gallery` | Daftar foto galeri |
| `gift.accounts` | Bank / e-wallet, nomor rekening, atas nama |
| `gift.qris` | Path gambar QRIS (kosongkan jika tidak ada) |
| `gift.address` | Alamat kirim kado (hapus jika tidak ada) |
| `music` | Path file musik `.mp3` (kosongkan jika tidak ada) |
| `musicCredit` | Kredit lagu, tampil kecil di footer (wajib untuk lagu berlisensi CC BY) |

### Foto & Musik

Simpan file di folder `public/`, lalu tulis path-nya tanpa kata `public`:

```
public/images/groom.jpg   →  photo: "/images/groom.jpg"
public/images/qris.png    →  qris: "/images/qris.png"
public/music/song.mp3     →  music: "/music/song.mp3"
```

> Foto bawaan saat ini adalah foto contoh dari [Unsplash](https://unsplash.com) — ganti dengan foto asli Anda.

### Musik

`music` bisa berisi **file mp3** atau **link YouTube**:

```ts
music: "https://www.youtube.com/watch?v=uBFa-NYdHRw", // diputar lewat player YouTube tersembunyi
music: "/music/canon-in-d.mp3",                        // file di public/music
```

- **Link YouTube:** lagu tidak diunduh, tapi diputar lewat player YouTube yang disembunyikan. Kekurangannya:
  iklan YouTube bisa ikut terputar, lagu hilang jika videonya dihapus, dan di beberapa browser HP
  (terutama Safari iPhone) musik bisa gagal berputar otomatis.
- **File mp3:** paling stabil di semua perangkat. Tersedia `public/music/canon-in-d.mp3` —
  **“Canon in D Major” – Kevin MacLeod** ([incompetech.com](https://incompetech.com)), lisensi
  [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).

Pastikan Anda berhak memakai lagu yang dipilih, dan sesuaikan `musicCredit`.

## 💬 Penyimpanan Ucapan Tamu

Ucapan disimpan lewat API `/api/wishes`:

- **Lokal (default):** tanpa konfigurasi, ucapan disimpan di file `data/wishes.json`.
- **Production (Vercel):** sistem file Vercel tidak permanen, jadi gunakan PostgreSQL gratis seperti
  [Neon](https://neon.tech) atau [Supabase](https://supabase.com). Salin connection string-nya ke
  environment variable `DATABASE_URL` (lihat `.env.example`). Tabel `wishes` dibuat otomatis.

Untuk menghapus ucapan yang tidak pantas, hapus baris di tabel `wishes` (atau di file `data/wishes.json`).

### Format Waktu

Gunakan format ISO dengan zona waktu WIB (`+07:00`):

```ts
start: "2026-12-20T08:00:00+07:00",
end:   "2026-12-20T10:00:00+07:00",
```

## 📨 Membagikan ke Tamu

Tambahkan nama tamu di akhir link:

```
https://undangan-anda.vercel.app/?to=Budi+Santoso
https://undangan-anda.vercel.app/?to=Keluarga%20Bapak%20Ahmad
```

Nama tersebut akan tampil di halaman cover.

## ☁️ Deploy

Cara termudah: push ke GitHub, lalu import repo di [Vercel](https://vercel.com/new). Tidak perlu konfigurasi tambahan.
