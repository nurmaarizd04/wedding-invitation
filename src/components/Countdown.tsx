"use client";

import { useEffect, useState } from "react";

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    units: {
      Hari: Math.floor(diff / 86_400_000),
      Jam: Math.floor((diff / 3_600_000) % 24),
      Menit: Math.floor((diff / 60_000) % 60),
      Detik: Math.floor((diff / 1000) % 60),
    },
    done: diff === 0,
  };
}

const EMPTY_UNITS = { Hari: 0, Jam: 0, Menit: 0, Detik: 0 };

export default function Countdown({ target }: { target: string }) {
  const targetTime = new Date(target).getTime();
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    setRemaining(getRemaining(targetTime));
    const id = setInterval(() => setRemaining(getRemaining(targetTime)), 1000);
    return () => clearInterval(id);
  }, [targetTime]);

  if (remaining?.done) {
    return <p className="font-serif text-xl">Alhamdulillah, acara telah berlangsung 🤍</p>;
  }

  const units = remaining?.units ?? EMPTY_UNITS;

  return (
    <div className="flex justify-center gap-3">
      {Object.entries(units).map(([label, value]) => (
        <div
          key={label}
          className="w-16 rounded-2xl border border-white/30 bg-white/10 py-3 backdrop-blur-sm sm:w-20"
        >
          <p className="font-serif text-2xl font-semibold tabular-nums sm:text-3xl">
            {remaining ? String(value).padStart(2, "0") : "--"}
          </p>
          <p className="text-[11px] uppercase tracking-wider text-white/80">{label}</p>
        </div>
      ))}
    </div>
  );
}
