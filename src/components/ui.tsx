export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-gold ${className}`}>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/70" />
      <span className="text-lg leading-none">❦</span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/70" />
    </div>
  );
}

export function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10 text-center">
      <p className="font-serif text-xs uppercase tracking-[0.35em] text-muted">{eyebrow}</p>
      <h2 className="title-write mt-2 px-2 pb-1 font-script text-5xl text-gold-dark group-data-[visible=true]/reveal:animate-write">
        {title}
      </h2>
      <Ornament className="mt-3" />
    </div>
  );
}

/** Foto berbingkai lengkung dengan garis emas yang sedikit bergeser. */
export function ArchPhoto({
  src,
  alt,
  className = "",
  imgClassName = "",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-t-full border border-gold/60" />
      <div className="relative h-full w-full overflow-hidden rounded-t-full shadow-xl">
        <img decoding="async" src={src} alt={alt} className={`h-full w-full object-cover ${imgClassName}`} />
      </div>
    </div>
  );
}

/** Teks yang muncul kata demi kata saat <Reveal variant="none"> induknya terlihat. */
export function Words({ text, step = 45 }: { text: string; step?: number }) {
  return text.split(" ").map((word, i) => (
    <span
      key={i}
      style={{ transitionDelay: `${i * step}ms` }}
      className="inline-block translate-y-2 opacity-0 blur-[3px] transition-[opacity,translate,filter] duration-700 ease-out group-data-[visible=true]/reveal:translate-y-0 group-data-[visible=true]/reveal:opacity-100 group-data-[visible=true]/reveal:blur-none"
    >
      {word}&nbsp;
    </span>
  ));
}

/** Foto di dalam <Reveal> yang ikut zoom-out halus saat muncul. */
export const REVEAL_ZOOM =
  "scale-125 transition-transform duration-[2200ms] ease-out-expo will-change-transform group-data-[visible=true]/reveal:scale-100";

/** Pemisah bergelombang di bagian bawah sebuah section. */
export function Wave({ className = "fill-cream" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 480 40"
      preserveAspectRatio="none"
      className={`absolute inset-x-0 -bottom-px h-8 w-full ${className}`}
    >
      <path d="M0 40V22C80 2 160 2 240 18S400 38 480 14V40Z" />
    </svg>
  );
}
