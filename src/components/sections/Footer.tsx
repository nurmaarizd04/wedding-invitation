import { wedding } from "@/data/wedding";
import Reveal from "../Reveal";
import { Ornament } from "../ui";

export default function Footer() {
  const { groom, bride, footerPhoto, music, musicCredit } = wedding;

  return (
    <footer className="relative overflow-hidden px-8 pb-32 pt-28 text-center text-white">
      <img decoding="async" src={footerPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-sand via-black/55 to-black/85" />

      <Reveal className="relative">
        <p className="text-sm leading-relaxed text-white/90">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
          berkenan hadir dan memberikan doa restu kepada kami.
        </p>
        <p className="mt-6 font-serif text-lg italic">Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh</p>
        <Ornament className="my-8 !text-gold-light" />
        <p className="text-xs uppercase tracking-[0.35em] text-white/80">Kami yang berbahagia</p>
        <p className="mt-3 font-script text-6xl">
          {groom.nickname} <span className="text-gold-light">&amp;</span> {bride.nickname}
        </p>
        {music && musicCredit && <p className="mt-14 text-[10px] text-white/50">Musik: {musicCredit}</p>}
      </Reveal>
    </footer>
  );
}
