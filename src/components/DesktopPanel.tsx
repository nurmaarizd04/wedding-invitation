"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/data/wedding";
import { formatDate } from "@/lib/format";
import { Ornament } from "./ui";

/** Slideshow foto besar di sisi kiri, hanya tampil di layar laptop/desktop. */
export default function DesktopPanel() {
  const { sidePhotos, groom, bride, events, quote } = wedding;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (sidePhotos.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % sidePhotos.length), 7000);
    return () => clearInterval(id);
  }, [sidePhotos.length]);

  return (
    <aside className="relative hidden h-svh flex-1 overflow-hidden lg:sticky lg:top-0 lg:block lg:self-start">
      {sidePhotos.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ${
            i === index ? "animate-kenburns opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />

      <div className="absolute inset-x-0 bottom-0 p-14 text-white">
        <p className="font-serif text-sm uppercase tracking-[0.4em] text-white/85">The Wedding of</p>
        <h2 className="mt-3 font-script text-8xl leading-tight">
          {groom.nickname} <span className="text-gold-light">&amp;</span> {bride.nickname}
        </h2>
        <p className="mt-2 font-serif text-2xl tracking-wide">{formatDate(events[0].start)}</p>
        <Ornament className="my-6 !justify-start !text-gold-light" />
        <p className="max-w-xl font-serif text-lg italic leading-relaxed text-white/80">
          “{quote.text}”
          <span className="mt-2 block text-sm not-italic tracking-[0.2em] text-gold-light">{quote.source}</span>
        </p>
      </div>
    </aside>
  );
}
