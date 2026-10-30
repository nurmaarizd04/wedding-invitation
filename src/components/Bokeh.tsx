const LIGHTS = [
  { left: 8, bottom: 6, size: 46, delay: 0, duration: 15 },
  { left: 22, bottom: 18, size: 18, delay: 4, duration: 12 },
  { left: 35, bottom: 2, size: 30, delay: 8, duration: 16 },
  { left: 51, bottom: 12, size: 14, delay: 2, duration: 11 },
  { left: 63, bottom: 4, size: 38, delay: 6, duration: 17 },
  { left: 76, bottom: 20, size: 20, delay: 10, duration: 13 },
  { left: 88, bottom: 8, size: 28, delay: 3, duration: 15 },
  { left: 44, bottom: 26, size: 12, delay: 9, duration: 12 },
];

/** Bulatan cahaya lembut yang melayang naik, memberi kesan hangat & dreamy. */
export default function Bokeh() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {LIGHTS.map((l, i) => (
        <span
          key={i}
          className="absolute block animate-rise rounded-full bg-[radial-gradient(circle,rgb(255_243_214/0.75)_0%,rgb(230_211_168/0.35)_45%,transparent_70%)] opacity-0"
          style={{
            left: `${l.left}%`,
            bottom: `${l.bottom}%`,
            width: l.size,
            height: l.size,
            animationDelay: `${l.delay}s`,
            animationDuration: `${l.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
