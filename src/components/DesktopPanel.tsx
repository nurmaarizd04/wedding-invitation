"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";
import { formatDate } from "@/lib/format";
import { Ornament } from "./ui";

const KEN_BURNS = ["animate-kb-1", "animate-kb-2", "animate-kb-3"];
const SLIDE_INTERVAL = 6500;

const ENTER =
  "translate-y-6 opacity-0 transition-[opacity,translate] duration-[1400ms] ease-out-expo opened:translate-y-0 opened:opacity-100";

/** Slideshow foto besar di sisi kiri, hanya tampil di layar laptop/desktop. */
export default function DesktopPanel() {
  const { sidePhotos, groom, bride, events, quote } = wedding;
  const [slide, setSlide] = useState({ current: 0, previous: -1 });

  useEffect(() => {
    // Muat semua foto lebih dulu agar pergantian tidak tersendat
    for (const src of sidePhotos) new Image().src = src;
    if (sidePhotos.length < 2) return;
    const id = setInterval(
      () => setSlide((s) => ({ previous: s.current, current: (s.current + 1) % sidePhotos.length })),
      SLIDE_INTERVAL,
    );
    return () => clearInterval(id);
  }, [sidePhotos]);

  return (
    <aside className="relative hidden h-svh flex-1 overflow-hidden bg-ink lg:sticky lg:top-0 lg:block lg:self-start">
      {sidePhotos.map((src, i) => {
        const isCurrent = i === slide.current;
        const isPrevious = i === slide.previous;
        // Foto baru memudar masuk DI ATAS foto lama (yang tetap terlihat & tetap bergerak),
        // jadi tidak ada lompatan maupun kilatan gelap.
        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[2500ms] ease-in-out ${
              isCurrent ? "z-10 opacity-100" : isPrevious ? "z-[5] opacity-100" : "z-0 opacity-0"
            }`}
          >
            <img decoding="async"
              src={src}
              alt=""
              className={`h-full w-full object-cover backface-hidden will-change-transform ${
                isCurrent || isPrevious ? KEN_BURNS[i % KEN_BURNS.length] : ""
              }`}
            />
          </div>
        );
      })}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />

      <div className="absolute inset-x-0 bottom-0 z-30 p-14 text-white">
        <p className={`${ENTER} font-serif text-sm uppercase tracking-[0.4em] text-white/85 delay-[1200ms]`}>
          The Wedding of
        </p>
        <h2 className="title-write mt-3 pb-2 pr-4 font-script text-8xl leading-tight opened:animate-write-late">
          {groom.nickname} <span className="text-gold-light">&amp;</span> {bride.nickname}
        </h2>
        <p className={`${ENTER} mt-2 font-serif text-2xl tracking-wide delay-[1600ms]`}>
          {formatDate(events[0].start)}
        </p>
        <div className={`${ENTER} delay-[1800ms]`}>
          <Ornament className="my-6 !justify-start !text-gold-light" />
          <p className="max-w-xl font-serif text-lg italic leading-relaxed text-white/80">
            “{quote.text}”
            <span className="mt-2 block text-sm not-italic tracking-[0.2em] text-gold-light">{quote.source}</span>
          </p>
        </div>
      </div>
    </aside>
  );
}
