"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const VARIANTS = {
  /** muncul dari bawah */
  up: {
    hidden: "translate-y-10 opacity-0",
    shown: "translate-y-0 opacity-100",
    duration: "duration-[1100ms]",
  },
  /** membesar perlahan */
  zoom: {
    hidden: "scale-[0.92] opacity-0",
    shown: "scale-100 opacity-100",
    duration: "duration-[1300ms]",
  },
  /** tanpa gerakan sendiri; anak elemen yang beranimasi lewat group-data */
  none: {
    hidden: "",
    shown: "",
    duration: "",
  },
  /** terbuka dari bawah seperti tirai (untuk foto) */
  curtain: {
    hidden: "[clip-path:inset(100%_-10%_-10%_-10%)]",
    shown: "[clip-path:inset(-10%_-10%_-10%_-10%)]",
    duration: "duration-[1600ms]",
  },
} as const;

/**
 * Animasi saat elemen masuk layar.
 * Anak elemen bisa ikut beranimasi lewat `group-data-[visible=true]/reveal:...`
 */
export default function Reveal({
  children,
  delay = 0,
  variant = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  variant?: keyof typeof VARIANTS;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const style = VARIANTS[variant];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Elemen luar dipantau, elemen dalam yang beranimasi: clip-path / transform pada elemen
  // yang dipantau bisa membuat IntersectionObserver menganggapnya tidak terlihat.
  return (
    <div ref={ref} data-visible={visible} className={`group/reveal ${className}`}>
      <div
        style={{ transitionDelay: `${delay}ms` }}
        className={`transition-[opacity,translate,scale,clip-path] ease-out-expo ${style.duration} ${
          visible ? style.shown : style.hidden
        }`}
      >
        {children}
      </div>
    </div>
  );
}
