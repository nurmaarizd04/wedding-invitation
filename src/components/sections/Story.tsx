import { wedding } from "@/data/wedding";
import Reveal from "../Reveal";
import { HeartIcon } from "../icons";
import { REVEAL_ZOOM, SectionTitle } from "../ui";

export default function Story() {
  const { story } = wedding;
  if (story.length === 0) return null;

  return (
    <section id="cerita" className="bg-sand px-6 py-20">
      <Reveal>
        <SectionTitle eyebrow="Our Love Story" title="Kisah Kami" />
      </Reveal>

      <ol className="relative ml-4 border-l border-gold/40">
        {story.map((item, i) => (
          <li key={item.title} className="relative pb-10 pl-8 last:pb-0">
            <span className="absolute -left-[13px] top-1 grid h-6 w-6 place-items-center rounded-full bg-gold text-white ring-4 ring-sand">
              <HeartIcon width={12} height={12} />
            </span>
            <Reveal delay={i * 100}>
              <div className="overflow-hidden rounded-2xl bg-cream shadow-sm">
                {item.photo && (
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      decoding="async"
                      src={item.photo}
                      alt={item.title}
                      loading="lazy"
                      className={`h-full w-full object-cover ${REVEAL_ZOOM}`}
                    />
                  </div>
                )}
                <div className="p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-dark">{item.date}</p>
                  <h3 className="mt-1 font-serif text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
