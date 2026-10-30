import { wedding } from "@/data/wedding";
import { formatDateParts, formatTimeRange, googleCalendarUrl, mapsEmbedUrl, mapsUrl } from "@/lib/format";
import Floral from "../Floral";
import Reveal from "../Reveal";
import { CalendarIcon, ClockIcon, MapPinIcon } from "../icons";
import { SectionTitle } from "../ui";

export default function Events() {
  const { events, groom, bride } = wedding;

  return (
    <section id="acara" className="relative overflow-hidden px-6 py-20">
      <Floral className="-right-10 -top-8 h-40 w-40 opacity-70" flip="xy" />

      <Reveal>
        <SectionTitle eyebrow="Save the Date" title="Waktu & Tempat" />
      </Reveal>

      <div className="relative space-y-8">
        {events.map((event, i) => {
          const date = formatDateParts(event.start);
          return (
            <Reveal key={event.title} delay={i * 100}>
              <article className="overflow-hidden rounded-[2rem] border border-gold/30 bg-white/70 shadow-sm">
                <div className="px-6 pb-7 pt-8 text-center">
                  <h3 className="font-script text-5xl text-gold-dark">{event.title}</h3>

                  <div className="mt-5 flex items-center justify-center gap-4">
                    <p className="w-24 border-y border-gold/50 py-1.5 font-serif text-lg">{date.weekday}</p>
                    <p className="font-serif text-6xl font-semibold leading-none text-gold-dark">{date.day}</p>
                    <p className="w-24 border-y border-gold/50 py-1.5 font-serif text-lg">{date.month}</p>
                  </div>
                  <p className="mt-2 font-serif text-xl tracking-[0.3em] text-muted">{date.year}</p>

                  <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-sand px-4 py-1.5 text-sm">
                    <ClockIcon width={16} height={16} className="text-gold-dark" />
                    {formatTimeRange(event.start, event.end)}
                  </p>

                  <div className="mt-5">
                    <p className="flex items-center justify-center gap-1.5 font-serif text-xl font-semibold">
                      <MapPinIcon className="text-gold-dark" /> {event.venue}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{event.address}</p>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <a
                      href={mapsUrl(event.mapsQuery)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-gold py-2.5 text-sm font-medium text-white transition hover:bg-gold-dark"
                    >
                      <MapPinIcon width={16} height={16} /> Lihat Lokasi
                    </a>
                    <a
                      href={googleCalendarUrl({
                        title: `${event.title} ${groom.nickname} & ${bride.nickname}`,
                        start: event.start,
                        end: event.end,
                        location: `${event.venue}, ${event.address}`,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-gold py-2.5 text-sm font-medium text-gold-dark transition hover:bg-gold hover:text-white"
                    >
                      <CalendarIcon width={16} height={16} /> Ingatkan
                    </a>
                  </div>
                </div>

                <iframe
                  title={`Peta lokasi ${event.title}`}
                  src={mapsEmbedUrl(event.mapsQuery)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-52 w-full border-0"
                />
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
