/**
 * Semua isi undangan diatur dari file ini.
 * Ganti nama, foto, tanggal, lokasi, dan rekening sesuai kebutuhan.
 *
 * Foto: simpan file di folder `public/images/` lalu tulis path-nya,
 * contoh: photo: "/images/groom.jpg"
 */

export type Person = {
  nickname: string;
  fullName: string;
  parents: string;
  photo: string;
  instagram?: string;
};

export type WeddingEvent = {
  title: string;
  /** Format ISO dengan zona waktu, contoh: "2026-12-20T08:00:00+07:00" */
  start: string;
  end?: string;
  venue: string;
  address: string;
  /** Kata kunci pencarian Google Maps (nama tempat atau alamat lengkap) */
  mapsQuery: string;
};

export type StoryItem = {
  date: string;
  title: string;
  text: string;
  photo?: string;
};

export type Interlude = {
  photo: string;
  title: string;
  text: string;
};

export type GiftAccount = {
  /** Nama bank atau e-wallet, contoh: "BCA", "Mandiri", "DANA" */
  provider: string;
  number: string;
  holder: string;
};

export type Wedding = {
  groom: Person;
  bride: Person;
  /** Foto di dalam bingkai lengkung pada halaman pembuka */
  coverPhoto: string;
  /** Foto latar bagian pertama setelah undangan dibuka */
  heroPhoto: string;
  /** Slideshow di sisi kiri saat dibuka di laptop/desktop */
  sidePhotos: string[];
  /** Foto latar bagian penutup */
  footerPhoto: string;
  quote: { text: string; source: string };
  story: StoryItem[];
  /** Dua jeda foto layar penuh: [0] setelah Mempelai, [1] setelah Waktu & Tempat */
  interludes: [Interlude, Interlude];
  events: WeddingEvent[];
  gallery: string[];
  gift: {
    accounts: GiftAccount[];
    /** Path gambar QRIS, kosongkan jika tidak ada */
    qris?: string;
    /** Alamat pengiriman kado fisik, hapus jika tidak ada */
    address?: { recipient: string; detail: string };
  };
  /**
   * Musik latar: path file mp3 (contoh "/music/canon-in-d.mp3")
   * atau link YouTube (contoh "https://www.youtube.com/watch?v=xxxxxxxxxxx").
   * Kosongkan jika tidak ada.
   */
  music?: string;
  /**
   * Penguat volume untuk file mp3 (1 = volume asli, 2 = dua kali lebih keras).
   * Tidak berlaku untuk link YouTube — YouTube membatasi & menormalkan volumenya sendiri.
   */
  musicBoost?: number;
  /** Kredit musik, wajib diisi jika lisensi lagunya meminta atribusi (misal CC BY) */
  musicCredit?: string;
};

/** Foto contoh dari Unsplash (bebas dipakai). Ganti dengan foto Anda sendiri. */
const sample = (id: string, width = 1080) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

export const wedding: Wedding = {
  groom: {
    nickname: "Raka",
    fullName: "Muhammad Raka Pratama, S.Kom.",
    parents: "Putra pertama dari Bapak Ahmad Santoso & Ibu Siti Rahmawati",
    photo: sample("1494955870715-979ca4f13bf0", 700),
    instagram: "raka.pratama",
  },
  bride: {
    nickname: "Nadia",
    fullName: "Nadia Putri Lestari, S.E.",
    parents: "Putri kedua dari Bapak Budi Hartono & Ibu Dewi Kartika",
    photo: sample("1525258946800-98cfd641d0de", 700),
    instagram: "nadia.lestari",
  },
  coverPhoto: sample("1546032996-6dfacbacbf3f", 800),
  heroPhoto: sample("1537633552985-df8429e8048b", 1200),
  sidePhotos: [
    sample("1591604466107-ec97de577aff", 1920),
    sample("1532712938310-34cb3982ef74", 1920),
    sample("1544078751-58fee2d8a03b", 1920),
  ],
  footerPhoto: sample("1532712938310-34cb3982ef74", 1200),
  quote: {
    text: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum: 21",
  },
  story: [
    {
      date: "Maret 2021",
      title: "Pertama Bertemu",
      text: "Berawal dari satu proyek yang sama di Bogor, kami sering berdiskusi hingga larut. Tanpa sadar, kami mulai saling menanti pertemuan berikutnya.",
      photo: sample("1513279922550-250c2129b13a", 800),
    },
    {
      date: "Agustus 2025",
      title: "Lamaran",
      text: "Dengan restu kedua keluarga, Raka melamar Nadia dalam acara sederhana yang hangat dan penuh haru.",
      photo: sample("1520854221256-17451cc331bf", 800),
    },
    {
      date: "Desember 2026",
      title: "Hari Bahagia",
      text: "Kami memutuskan untuk melangkah bersama dalam ikatan suci pernikahan. Mohon doa restu dari Bapak/Ibu/Saudara/i.",
      photo: sample("1606800052052-a08af7148866", 800),
    },
  ],
  interludes: [
    {
      photo: sample("1460978812857-470ed1c77af0", 1200),
      title: "Forever & Always",
      text: "Dua hati yang dipertemukan oleh takdir, kini berjanji untuk saling menjaga selamanya.",
    },
    {
      photo: sample("1544078751-58fee2d8a03b", 1200),
      title: "Two Souls, One Heart",
      text: "Kehadiran dan doa Anda adalah hadiah terindah di hari bahagia kami.",
    },
  ],
  events: [
    {
      title: "Akad Nikah",
      start: "2026-12-20T08:00:00+07:00",
      end: "2026-12-20T10:00:00+07:00",
      venue: "Masjid Raya Bogor",
      address: "Jl. Raya Pajajaran, Bantarjati, Kec. Bogor Utara, Kota Bogor, Jawa Barat",
      mapsQuery: "Masjid Raya Bogor",
    },
    {
      title: "Resepsi",
      start: "2026-12-20T11:00:00+07:00",
      end: "2026-12-20T14:00:00+07:00",
      venue: "Kebun Raya Bogor",
      address: "Jl. Ir. H. Juanda No.13, Paledang, Kec. Bogor Tengah, Kota Bogor, Jawa Barat",
      mapsQuery: "Kebun Raya Bogor",
    },
  ],
  gallery: [
    sample("1591604466107-ec97de577aff", 1200),
    sample("1460978812857-470ed1c77af0", 800),
    sample("1583939003579-730e3918a45a", 800),
    sample("1465495976277-4387d4b0b4c6", 800),
    sample("1515934751635-c81c6bc9a2d8", 800),
    sample("1469371670807-013ccf25f16a", 1200),
    sample("1544078751-58fee2d8a03b", 800),
    sample("1550005809-91ad75fb315f", 800),
    sample("1519741497674-611481863552", 800),
    sample("1529636798458-92182e662485", 800),
  ],
  gift: {
    accounts: [
      { provider: "BCA", number: "1234567890", holder: "Muhammad Raka Pratama" },
      { provider: "Mandiri", number: "1370012345678", holder: "Nadia Putri Lestari" },
      { provider: "DANA", number: "081234567890", holder: "Nadia Putri Lestari" },
    ],
    qris: "",
    address: {
      recipient: "Nadia Putri Lestari",
      detail: "Jl. Melati No. 12, RT 03/RW 05, Kel. Tegal Gundil, Kec. Bogor Utara, Kota Bogor 16152",
    },
  },
  music: "https://www.youtube.com/watch?v=1WCIrw85zbQ",
  musicCredit: "“I Wanna Grow Old with You” – Westlife",
  // Agar lebih keras: taruh file lagu di public/music/ lalu ganti `music` ke path-nya,
  // contoh music: "/music/i-wanna-grow-old-with-you.mp3" — musicBoost di bawah otomatis berlaku.
  musicBoost: 2,
  // Alternatif: Beautiful In White (piano, tanpa vokal)
  // music: "https://www.youtube.com/watch?v=xwqIpktXh2k",
  // musicCredit: "“Beautiful In White” – Shane Filan · Piano version oleh Pianaura",
  // Alternatif: mashup piano Beautiful in White × Canon in D
  // music: "https://www.youtube.com/watch?v=tX73H2FRcK8",
  // musicCredit: "“Beautiful in White × Canon in D” – Piano cover oleh Riyandi Kusuma",
  // Alternatif: Teman Hidup – Tulus (instrumental)
  // music: "https://www.youtube.com/watch?v=oXUE7fjyYlg",
  // musicCredit: "“Teman Hidup” – Tulus · Instrumental cover oleh La Oficio Entertainment",
  // Alternatif bebas lisensi (sudah tersedia di public/music):
  // music: "/music/canon-in-d.mp3",
  // musicCredit: "“Canon in D Major” – Kevin MacLeod (incompetech.com) · CC BY 3.0",
};
