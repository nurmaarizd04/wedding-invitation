"use client";

import type { CSSProperties } from "react";

const COUNT = 32;

// Hanya dirender di browser setelah tombol diklik, jadi aman memakai perhitungan Math.
const PARTICLES = Array.from({ length: COUNT }, (_, i) => {
  const angle = (i / COUNT) * Math.PI * 2 + (i % 3) * 0.15;
  const distance = 28 + ((i * 37) % 26); // vmin
  return {
    tx: `${(Math.cos(angle) * distance).toFixed(1)}vmin`,
    ty: `${(Math.sin(angle) * distance).toFixed(1)}vmin`,
    rot: `${(i * 47) % 360}deg`,
    delay: 450 + (i % 6) * 70,
    size: 5 + (i % 4) * 3,
    petal: i % 3 === 0,
  };
});

/**
 * Percikan kilau emas dan kelopak bunga dari tengah layar saat undangan dibuka.
 * Wadahnya selalu dirender (hanya partikelnya yang muncul/hilang) — memasang/melepas
 * komponen ini di samping Server Component membuat React DevTools melempar error.
 */
export default function OpeningBurst({ active }: { active: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {active &&
        PARTICLES.map((p, i) => (
          <span
            key={i}
            className={`absolute left-1/2 top-1/2 block animate-burst ${
              p.petal
                ? "rounded-[100%_0] bg-gradient-to-br from-blush to-blush-dark"
                : "rounded-full bg-gold-light shadow-[0_0_10px_3px_rgb(230_211_168/0.85)]"
            }`}
            style={
              {
                width: p.petal ? p.size * 1.6 : p.size,
                height: p.petal ? p.size * 1.6 : p.size,
                animationDelay: `${p.delay}ms`,
                "--tx": p.tx,
                "--ty": p.ty,
                "--rot": p.rot,
              } as CSSProperties
            }
          />
        ))}
    </div>
  );
}
