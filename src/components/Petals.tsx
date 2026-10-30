const PETALS = [
  { left: 4, delay: 0, duration: 13, size: 10 },
  { left: 14, delay: 4, duration: 16, size: 8 },
  { left: 24, delay: 8, duration: 12, size: 12 },
  { left: 33, delay: 2, duration: 15, size: 9 },
  { left: 45, delay: 6, duration: 14, size: 11 },
  { left: 55, delay: 10, duration: 17, size: 8 },
  { left: 64, delay: 1, duration: 13, size: 10 },
  { left: 73, delay: 7, duration: 15, size: 12 },
  { left: 82, delay: 3, duration: 12, size: 9 },
  { left: 91, delay: 9, duration: 16, size: 11 },
];

/** Kelopak bunga yang berjatuhan perlahan. */
export default function Petals() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="absolute -top-6 block animate-fall rounded-[100%_0] bg-gradient-to-br from-blush to-blush-dark opacity-0"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
