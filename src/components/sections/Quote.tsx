import { wedding } from "@/data/wedding";
import Floral from "../Floral";
import Reveal from "../Reveal";
import { Ornament } from "../ui";

export default function Quote() {
  const { quote } = wedding;

  return (
    <section className="relative overflow-hidden bg-sand px-8 py-20">
      <Floral className="-right-8 -top-6 h-36 w-36 opacity-80" flip="xy" />
      <Floral className="-bottom-6 -left-8 h-36 w-36 opacity-80" />

      <Reveal className="relative text-center">
        <Ornament className="mb-6" />
        <p className="font-serif text-xl italic leading-relaxed text-ink">“{quote.text}”</p>
        <p className="mt-6 text-xs font-medium uppercase tracking-[0.3em] text-gold-dark">{quote.source}</p>
      </Reveal>
    </section>
  );
}
