import { wedding } from "@/data/wedding";
import { formatShortDate, googleCalendarUrl } from "@/lib/format";
import Countdown from "../Countdown";
import { CalendarIcon } from "../icons";
import { Wave } from "../ui";

export default function Hero() {
  const { groom, bride, heroPhoto, events } = wedding;
  const mainEvent = events[0];
  const lastEvent = events[events.length - 1];

  return (
    <section id="home" className="relative flex min-h-svh items-end overflow-hidden text-white">
      <img src={heroPhoto} alt="" className="absolute inset-0 h-full w-full animate-kenburns object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent via-40% to-black/85" />

      <div className="relative w-full px-6 pb-20 pt-32 text-center">
        <p className="font-serif text-xs uppercase tracking-[0.4em] text-white/85">We are getting married</p>
        <h2 className="mt-3 font-script text-6xl leading-tight drop-shadow-lg">
          {groom.nickname} <span className="text-gold-light">&amp;</span> {bride.nickname}
        </h2>
        <p className="mt-4 font-serif text-lg tracking-[0.3em]">{formatShortDate(mainEvent.start)}</p>

        <div className="mt-8">
          <Countdown target={mainEvent.start} />
        </div>

        <a
          href={googleCalendarUrl({
            title: `Pernikahan ${groom.nickname} & ${bride.nickname}`,
            start: mainEvent.start,
            end: lastEvent.end ?? lastEvent.start,
            location: `${mainEvent.venue}, ${mainEvent.address}`,
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-6 py-2.5 text-sm backdrop-blur-sm transition hover:bg-white hover:text-ink"
        >
          <CalendarIcon /> Simpan Tanggal
        </a>
      </div>

      <Wave className="fill-sand" />
    </section>
  );
}
