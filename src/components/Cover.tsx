"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { wedding } from "@/data/wedding";
import { formatDate } from "@/lib/format";
import Floral from "./Floral";
import Petals from "./Petals";
import { MailIcon } from "./icons";
import { ArchPhoto } from "./ui";

function GuestName() {
  const guest = useSearchParams().get("to");
  return <>{guest || "Tamu Undangan"}</>;
}

/** Daun pintu kiri/kanan yang terbuka saat undangan dibuka. */
const DOOR = "absolute inset-y-0 w-1/2 overflow-hidden bg-cream transition-transform duration-[1500ms] ease-door";

export default function Cover({
  opened,
  done,
  onOpen,
}: {
  opened: boolean;
  /** true setelah animasi pembuka selesai: cover disembunyikan total (animasinya ikut berhenti) */
  done: boolean;
  onOpen: () => void;
}) {
  const { groom, bride, coverPhoto, events } = wedding;

  return (
    <div
      aria-hidden={opened}
      className={`fixed inset-0 z-50 ${
        opened ? "pointer-events-none invisible transition-[visibility] delay-[2200ms] duration-0" : ""
      } ${done ? "hidden" : ""}`}
    >
      {/* Pintu kiri */}
      <div className={`${DOOR} left-0 ${opened ? "-translate-x-full delay-500" : ""}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_35%,rgb(232_207_198/0.45),transparent_60%)]" />
        <Floral className="-left-12 -top-12 h-44 w-44 md:h-80 md:w-80" flip="y" />
        <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-ink/10 to-transparent" />
      </div>

      {/* Pintu kanan */}
      <div className={`${DOOR} right-0 ${opened ? "translate-x-full delay-500" : ""}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_35%,rgb(232_207_198/0.45),transparent_60%)]" />
        <Floral className="-bottom-12 -right-12 h-44 w-44 md:h-80 md:w-80" flip="x" />
        <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-ink/10 to-transparent" />
      </div>

      {/* Cahaya emas di celah pintu */}
      {opened && (
        <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2">
          <div className="h-full w-full animate-seam bg-gradient-to-b from-transparent via-gold-light to-transparent shadow-[0_0_30px_8px_rgb(230_211_168/0.9)]" />
        </div>
      )}

      {/* Isi cover */}
      <div
        className={`absolute inset-0 transition-[opacity,scale] duration-500 ease-in ${
          opened ? "scale-[1.04] opacity-0" : ""
        }`}
      >
        <Petals />

        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-muted">The Wedding of</p>

          <ArchPhoto
            src={coverPhoto}
            alt={`${groom.nickname} & ${bride.nickname}`}
            className="mt-5 aspect-[3/4] h-[30svh]"
          />

          <h1 className="mt-6 font-script text-6xl leading-tight text-gold-dark">
            {groom.nickname} <span className="text-gold">&amp;</span> {bride.nickname}
          </h1>
          <p className="mt-1 font-serif text-lg tracking-wide text-ink">{formatDate(events[0].start)}</p>

          <div className="mt-6 w-full max-w-xs rounded-2xl border border-gold/30 bg-white/70 px-5 py-4">
            <p className="text-xs text-muted">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            <p className="mt-1 font-serif text-2xl font-semibold text-ink">
              <Suspense fallback="Tamu Undangan">
                <GuestName />
              </Suspense>
            </p>
            <p className="mt-1 text-[10px] text-muted">Mohon maaf apabila ada kesalahan penulisan nama/gelar</p>
          </div>

          <button
            type="button"
            onClick={onOpen}
            className="mt-6 inline-flex animate-float items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-medium text-white shadow-lg shadow-gold/30 transition hover:bg-gold-dark"
          >
            <MailIcon /> Buka Undangan
          </button>
        </div>
      </div>
    </div>
  );
}
