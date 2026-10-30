"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ATTENDANCE_LABEL,
  ATTENDANCE_OPTIONS,
  MESSAGE_MAX,
  NAME_MAX,
  type Attendance,
  type Wish,
} from "@/lib/wish-types";
import Reveal from "../Reveal";
import { SectionTitle } from "../ui";

const BADGE_STYLE: Record<Attendance, string> = {
  hadir: "bg-emerald-100 text-emerald-700",
  tidak: "bg-rose-100 text-rose-700",
  ragu: "bg-amber-100 text-amber-700",
};

const TIME_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31_536_000],
  ["month", 2_592_000],
  ["week", 604_800],
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
];

function timeAgo(iso: string) {
  const diff = (new Date(iso).getTime() - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat("id", { numeric: "auto" });
  for (const [unit, seconds] of TIME_UNITS) {
    if (Math.abs(diff) >= seconds) return rtf.format(Math.round(diff / seconds), unit);
  }
  return "baru saja";
}

const inputClass =
  "w-full rounded-xl border border-gold/30 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-muted/60 focus:border-gold focus:ring-2 focus:ring-gold/20";

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("hadir");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const guest = new URLSearchParams(window.location.search).get("to");
    if (guest) setName(guest.slice(0, NAME_MAX));

    fetch("/api/wishes")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setWishes)
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, []);

  const counts = useMemo(() => {
    const result: Record<Attendance, number> = { hadir: 0, tidak: 0, ragu: 0 };
    for (const wish of wishes) result[wish.attendance]++;
    return result;
  }, [wishes]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, attendance }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal mengirim ucapan");
      setWishes((prev) => [data, ...prev]);
      setMessage("");
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim ucapan");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="ucapan" className="bg-sand px-6 py-20">
      <Reveal>
        <SectionTitle eyebrow="Ucapan & Doa" title="Kirim Ucapan" />
        <p className="-mt-3 mb-10 text-center text-sm leading-relaxed text-muted">
          Berikan ucapan dan doa restu untuk kedua mempelai, serta konfirmasi kehadiran Anda.
        </p>
      </Reveal>

      <Reveal>
        <div className="mb-6 grid grid-cols-3 gap-3 text-center">
          {ATTENDANCE_OPTIONS.map((option) => (
            <div key={option} className="rounded-2xl border border-gold/20 bg-white/70 py-3">
              <p className="font-serif text-3xl font-semibold text-gold-dark">{counts[option]}</p>
              <p className="text-xs text-muted">{ATTENDANCE_LABEL[option]}</p>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-3xl border border-gold/30 bg-white/70 p-6 shadow-sm"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Anda"
            maxLength={NAME_MAX}
            required
            className={inputClass}
          />
          <div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis ucapan & doa untuk mempelai..."
              maxLength={MESSAGE_MAX}
              rows={4}
              required
              className={`${inputClass} resize-none`}
            />
            <p className="mt-1 text-right text-xs text-muted">
              {message.length}/{MESSAGE_MAX}
            </p>
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-medium">Konfirmasi Kehadiran</legend>
            <div className="grid grid-cols-3 gap-2">
              {ATTENDANCE_OPTIONS.map((option) => (
                <label
                  key={option}
                  className={`cursor-pointer rounded-xl border px-2 py-2.5 text-center text-sm transition ${
                    attendance === option
                      ? "border-gold bg-gold text-white"
                      : "border-gold/30 bg-white text-ink hover:border-gold"
                  }`}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value={option}
                    checked={attendance === option}
                    onChange={() => setAttendance(option)}
                    className="sr-only"
                  />
                  {ATTENDANCE_LABEL[option]}
                </label>
              ))}
            </div>
          </fieldset>

          {error && <p className="text-sm text-rose-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className={`w-full rounded-full py-3 text-sm font-medium text-white transition disabled:opacity-60 ${
              sent ? "bg-emerald-600" : "bg-gold hover:bg-gold-dark"
            }`}
          >
            {submitting ? "Mengirim..." : sent ? "Terima kasih atas ucapannya! 🤍" : "Kirim Ucapan"}
          </button>
        </form>

        <div
          data-lenis-prevent
          className="mt-8 max-h-[30rem] space-y-4 overflow-y-auto pr-1">
          {loading && <p className="py-6 text-center text-sm text-muted">Memuat ucapan...</p>}
          {loadError && (
            <p className="py-6 text-center text-sm text-rose-600">Ucapan gagal dimuat. Coba muat ulang halaman.</p>
          )}
          {!loading && !loadError && wishes.length === 0 && (
            <p className="py-6 text-center text-sm text-muted">Belum ada ucapan. Jadilah yang pertama! ✨</p>
          )}

          {wishes.map((wish) => (
            <article key={wish.id} className="flex gap-3 rounded-2xl border border-gold/20 bg-white p-4 shadow-sm">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold font-serif text-lg font-semibold text-white">
                {wish.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{wish.name}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${BADGE_STYLE[wish.attendance]}`}>
                    {ATTENDANCE_LABEL[wish.attendance]}
                  </span>
                </div>
                <p className="mt-1 whitespace-pre-line break-words text-sm leading-relaxed text-ink/90">
                  {wish.message}
                </p>
                <p className="mt-2 text-xs text-muted">{timeAgo(wish.createdAt)}</p>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
