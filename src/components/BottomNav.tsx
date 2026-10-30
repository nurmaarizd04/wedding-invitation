"use client";

import { useEffect, useState } from "react";
import { CalendarIcon, ChatIcon, GiftIcon, HeartIcon, HomeIcon, ImageIcon } from "./icons";

const ITEMS = [
  { id: "home", label: "Home", Icon: HomeIcon },
  { id: "mempelai", label: "Mempelai", Icon: HeartIcon },
  { id: "acara", label: "Acara", Icon: CalendarIcon },
  { id: "galeri", label: "Galeri", Icon: ImageIcon },
  { id: "hadiah", label: "Hadiah", Icon: GiftIcon },
  { id: "ucapan", label: "Ucapan", Icon: ChatIcon },
];

export default function BottomNav({ visible }: { visible: boolean }) {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of ITEMS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed bottom-4 left-1/2 z-40 -translate-x-1/2 transition-all duration-700 lg:left-auto lg:right-[240px] lg:translate-x-1/2 ${
        visible ? "translate-y-0 opacity-100 delay-[2400ms]" : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <ul className="flex items-center gap-1 rounded-full border border-gold/20 bg-white/95 p-1.5 shadow-lg shadow-ink/10">
        {ITEMS.map(({ id, label, Icon }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-label={label}
              title={label}
              className={`grid h-10 w-10 place-items-center rounded-full transition ${
                active === id ? "bg-gold text-white shadow" : "text-muted hover:text-gold-dark"
              }`}
            >
              <Icon width={18} height={18} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
