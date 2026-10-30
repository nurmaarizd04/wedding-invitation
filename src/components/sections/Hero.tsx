import { wedding } from "@/data/wedding";
import { formatShortDate, googleCalendarUrl } from "@/lib/format";
import Countdown from "../Countdown";
import { CalendarIcon } from "../icons";
import { Wave } from "../ui";

/** Muncul bertahap setelah undangan dibuka */
const ENTER =
  "translate-y-6 opacity-0 transition-[opacity,translate] duration-[1200ms] ease-out-expo opened:translate-y-0 opened:opacity-100";

export default function Hero() {
  const { groom, bride, heroPhoto, events } = wedding;
  const mainEvent = events[0];
  const lastEvent = events[events.length - 1];

  return (
    <section id="home" className="relative flex min-h-svh items-end overflow-hidden text-white">
      {/* Foto: zoom-out dramatis saat dibuka, lalu bergerak perlahan */}
      <div className="absolute inset-0 scale-[1.35] transition-transform delay-300 duration-[3200ms] ease-out-expo will-change-transform opened:scale-100">
        <img decoding="async" src={heroPhoto} alt="" className="h-full w-full animate-kenburns object-cover will-change-transform" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent via-40% to-black/85" />

      {/* Kilatan cahaya hangat yang memudar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,#fffaf0_0%,rgb(255_250_240/0.75)_35%,transparent_80%)] transition-opacity delay-700 duration-[2200ms] opened:opacity-0"
      />

      <div className="relative w-full px-6 pb-20 pt-32 text-center">
        <p className={`${ENTER} font-serif text-xs uppercase tracking-[0.4em] text-white/85 delay-[1300ms]`}>
          We are getting married
        </p>
        <h2 className="mt-3 scale-90 font-script text-6xl leading-tight opacity-0 blur-sm drop-shadow-lg transition-[opacity,scale,filter] delay-[1500ms] duration-[1600ms] ease-out-expo opened:scale-100 opened:opacity-100 opened:blur-none">
          {groom.nickname} <span className="text-gold-light">&amp;</span> {bride.nickname}
        </h2>
        <p className={`${ENTER} mt-4 font-serif text-lg tracking-[0.3em] delay-[1900ms]`}>
          {formatShortDate(mainEvent.start)}
        </p>

        <div className={`${ENTER} mt-8 delay-[2100ms]`}>
          <Countdown target={mainEvent.start} />
        </div>

        <div className={`${ENTER} delay-[2300ms]`}>
          <a
            href={googleCalendarUrl({
              title: `Pernikahan ${groom.nickname} & ${bride.nickname}`,
              start: mainEvent.start,
              end: lastEvent.end ?? lastEvent.start,
              location: `${mainEvent.venue}, ${mainEvent.address}`,
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/50 bg-black/20 px-6 py-2.5 text-sm transition hover:bg-white hover:text-ink"
          >
            <CalendarIcon /> Simpan Tanggal
          </a>
        </div>
      </div>

      <Wave className="fill-sand" />
    </section>
  );
}
