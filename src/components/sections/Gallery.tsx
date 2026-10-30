"use client";

import { useCallback, useEffect, useState } from "react";
import { wedding } from "@/data/wedding";
import Reveal from "../Reveal";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "../icons";
import { REVEAL_ZOOM, SectionTitle } from "../ui";

export default function Gallery() {
  const photos = wedding.gallery;
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (delta: number) =>
      setActive((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, step]);

  return (
    <section id="galeri" className="bg-sand px-5 py-20">
      <Reveal>
        <SectionTitle eyebrow="Our Moments" title="Galeri" />
      </Reveal>

      <div className="grid grid-cols-2 gap-2.5">
        {photos.map((src, i) => {
          const wide = i % 5 === 0;
          return (
            <Reveal key={src} variant="zoom" delay={(i % 2) * 150} className={wide ? "col-span-2" : ""}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className={`group block w-full overflow-hidden rounded-2xl shadow-sm ${
                  wide ? "aspect-[4/3]" : "aspect-[3/4]"
                }`}
                aria-label={`Lihat foto ${i + 1}`}
              >
                <div className={`h-full w-full ${REVEAL_ZOOM}`}>
                  <img
                    decoding="async"
                    src={src}
                    alt={`Foto galeri ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>

      {active !== null && (
        <div
          role="dialog"
          data-lenis-prevent
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <img
            decoding="async"
            src={photos[active]}
            alt={`Foto galeri ${active + 1}`}
            className="max-h-[85svh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={close}
            aria-label="Tutup"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <CloseIcon />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Foto sebelumnya"
            className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Foto berikutnya"
            className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronRightIcon />
          </button>
          <p className="absolute bottom-5 text-sm text-white/70">
            {active + 1} / {photos.length}
          </p>
        </div>
      )}
    </section>
  );
}
