"use client";

import { useState } from "react";
import { mapsEmbedUrl } from "@/lib/format";
import { MapPinIcon } from "./icons";

/**
 * Peta Google Maps yang baru dimuat saat diklik.
 * Iframe Maps sangat berat; memuatnya otomatis membuat scroll tersendat.
 */
export default function MapEmbed({ query, title }: { query: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={title}
        src={mapsEmbedUrl(query)}
        referrerPolicy="no-referrer-when-downgrade"
        className="h-52 w-full border-0"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group relative grid h-40 w-full place-items-center overflow-hidden bg-sand text-gold-dark"
    >
      {/* Pola grid tipis menyerupai peta */}
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-40 [background-image:linear-gradient(var(--color-gold-light)_1px,transparent_1px),linear-gradient(90deg,var(--color-gold-light)_1px,transparent_1px)] [background-size:28px_28px]"
      />
      <span className="relative flex flex-col items-center gap-2">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-gold-dark shadow-md transition group-hover:scale-110">
          <MapPinIcon width={22} height={22} />
        </span>
        <span className="text-sm font-medium">Tampilkan Peta</span>
      </span>
    </button>
  );
}
