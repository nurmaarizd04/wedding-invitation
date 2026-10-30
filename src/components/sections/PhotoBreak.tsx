import type { Interlude } from "@/data/wedding";
import Reveal from "../Reveal";
import { Ornament, Words } from "../ui";

/** Jeda foto layar penuh bergaya sinematik dengan efek parallax saat di-scroll. */
export default function PhotoBreak({ interlude }: { interlude: Interlude }) {
  return (
    <section className="grain relative flex h-[85svh] items-center justify-center overflow-hidden text-center text-white">
      <img
        decoding="async"
        loading="lazy"
        src={interlude.photo}
        alt=""
        className="scroll-parallax absolute inset-x-0 -top-[15%] h-[130%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(0_0_0/0.55)_100%)]" />

      <Reveal variant="none" className="relative px-8">
        <Ornament className="mb-5 !text-gold-light" />
        <h2 className="title-write px-2 pb-2 font-script text-6xl leading-tight group-data-[visible=true]/reveal:animate-write">
          {interlude.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xs font-serif text-lg italic leading-relaxed text-white/90">
          <Words text={interlude.text} step={70} />
        </p>
      </Reveal>
    </section>
  );
}
