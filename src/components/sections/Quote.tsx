import { wedding } from "@/data/wedding";
import Floral from "../Floral";
import Reveal from "../Reveal";
import { Ornament, Words } from "../ui";

export default function Quote() {
  const { quote } = wedding;
  const wordCount = quote.text.split(" ").length;

  return (
    <section className="relative overflow-hidden bg-sand px-8 py-24">
      <Floral className="-right-8 -top-6 h-36 w-36 opacity-80" flip="xy" />
      <Floral className="-bottom-6 -left-8 h-36 w-36 opacity-80" />

      {/* Kutipan muncul kata demi kata, seperti sedang dibacakan */}
      <Reveal variant="none" className="relative text-center">
        <Ornament className="mb-6" />
        <span aria-hidden="true" className="block font-serif text-6xl leading-none text-gold/40">
          “
        </span>
        <p className="-mt-4 font-serif text-xl italic leading-relaxed text-ink">
          <Words text={quote.text} step={55} />
        </p>
        <p
          style={{ transitionDelay: `${wordCount * 55 + 200}ms` }}
          className="mt-6 text-xs font-medium uppercase tracking-[0.3em] text-gold-dark opacity-0 transition-opacity duration-1000 group-data-[visible=true]/reveal:opacity-100"
        >
          {quote.source}
        </p>
      </Reveal>
    </section>
  );
}
