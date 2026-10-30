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
      <h2 className="mt-2 font-script text-5xl text-gold-dark">{title}</h2>
      <Ornament className="mt-3" />
    </div>
  );
}

/** Foto berbingkai lengkung dengan garis emas yang sedikit bergeser. */
export function ArchPhoto({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-t-full border border-gold/60" />
      <img src={src} alt={alt} className="relative h-full w-full rounded-t-full object-cover shadow-xl" />
    </div>
  );
}

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
