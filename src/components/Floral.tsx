type Point = [number, number];
type Curve = [Point, Point, Point, Point];

const STEM: Curve = [[8, 212], [50, 150], [96, 96], [200, 30]];
const BRANCH: Curve = [[78, 122], [100, 104], [128, 102], [158, 116]];

const round = (n: number, digits = 1) => Math.round(n * 10 ** digits) / 10 ** digits;

function pointAt([p0, p1, p2, p3]: Curve, t: number): Point {
  const u = 1 - t;
  const at = (i: 0 | 1) => u * u * u * p0[i] + 3 * u * u * t * p1[i] + 3 * u * t * t * p2[i] + t * t * t * p3[i];
  return [at(0), at(1)];
}

function angleAt([p0, p1, p2, p3]: Curve, t: number) {
  const u = 1 - t;
  const d = (i: 0 | 1) =>
    3 * u * u * (p1[i] - p0[i]) + 6 * u * t * (p2[i] - p1[i]) + 3 * t * t * (p3[i] - p2[i]);
  return (Math.atan2(d(1), d(0)) * 180) / Math.PI;
}

function leavesAlong(curve: Curve, count: number, from: number, to: number, baseScale: number) {
  return Array.from({ length: count }, (_, i) => {
    const t = from + (i * (to - from)) / (count - 1);
    const [x, y] = pointAt(curve, t);
    const side = i % 2 === 0 ? 1 : -1;
    return {
      x: round(x),
      y: round(y),
      angle: round(angleAt(curve, t) + side * 52),
      scale: round(baseScale * (1 - t * 0.35), 2),
      light: i % 3 === 0,
    };
  });
}

const LEAVES = [...leavesAlong(STEM, 11, 0.06, 0.88, 1), ...leavesAlong(BRANCH, 5, 0.15, 0.9, 0.75)];
const LEAF_PATH = "M0 0C7 -8 21 -8 30 0C21 8 7 8 0 0Z";

function Flower({ x, y, r }: { x: number; y: number; r: number }) {
  const petals = [0, 72, 144, 216, 288];
  return (
    <g transform={`translate(${x} ${y})`}>
      {petals.map((a) => (
        <ellipse
          key={`o${a}`}
          cx={0}
          cy={round(-r * 0.55)}
          rx={round(r * 0.45)}
          ry={round(r * 0.62)}
          transform={`rotate(${a})`}
          className="fill-blush stroke-blush-dark"
          strokeWidth={0.7}
        />
      ))}
      {petals.map((a) => (
        <ellipse
          key={`i${a}`}
          cx={0}
          cy={round(-r * 0.3)}
          rx={round(r * 0.28)}
          ry={round(r * 0.38)}
          transform={`rotate(${a + 36})`}
          className="fill-[#f4e2dc] stroke-blush-dark"
          strokeWidth={0.5}
        />
      ))}
      <circle r={round(r * 0.2)} className="fill-gold" />
    </g>
  );
}

const FLIP = {
  none: "",
  x: "-scale-x-100",
  y: "-scale-y-100",
  xy: "-scale-x-100 -scale-y-100",
} as const;

/** Ornamen ranting bunga untuk sudut-sudut bagian undangan. */
export default function Floral({
  className = "",
  flip = "none",
}: {
  className?: string;
  flip?: keyof typeof FLIP;
}) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <div className={`h-full w-full ${FLIP[flip]}`}>
        <svg viewBox="0 0 220 220" className="h-full w-full origin-bottom-left animate-sway">
          <path
            d="M8 212C50 150 96 96 200 30"
            className="fill-none stroke-sage-dark"
            strokeWidth={1.6}
            strokeLinecap="round"
          />
          <path
            d="M78 122C100 104 128 102 158 116"
            className="fill-none stroke-sage-dark"
            strokeWidth={1.2}
            strokeLinecap="round"
          />
          {LEAVES.map((leaf, i) => (
            <g key={i} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.angle}) scale(${leaf.scale})`}>
              <path d={LEAF_PATH} className={leaf.light ? "fill-[#a9b79c]" : "fill-sage"} opacity={0.9} />
              <path d="M2 0L26 0" className="stroke-sage-dark" strokeWidth={0.6} />
            </g>
          ))}
          <Flower x={200} y={30} r={18} />
          <Flower x={158} y={116} r={13} />
          <Flower x={44} y={160} r={11} />
          {[
            [182, 58],
            [176, 22],
            [140, 132],
            [60, 150],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={2.4} className="fill-gold-light" />
          ))}
        </svg>
      </div>
    </div>
  );
}
