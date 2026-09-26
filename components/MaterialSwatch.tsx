import type { MaterialKind } from "@/data/site";

type Props = {
  kind: MaterialKind;
  /** Unique per instance; scopes SVG pattern/filter ids. */
  uid: string;
  className?: string;
};

/**
 * Art-directed material textures used wherever real project photography has
 * not been supplied yet. Pure SVG: no network requests, scales to any box.
 */
export function MaterialSwatch({ kind, uid, className }: Props) {
  const id = (s: string) => `${uid}-${s}`;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={className ?? "absolute inset-0 h-full w-full"}
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id={id("grain")} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.55" />
          </feComponentTransfer>
        </filter>
        <filter id={id("mottle")} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="7" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5" />
          </feComponentTransfer>
        </filter>
        <linearGradient id={id("light")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.10" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.28" />
        </linearGradient>
        {kind === "brick" && <BrickPattern id={id("p")} />}
        {kind === "concrete" && <ConcretePattern id={id("p")} />}
        {kind === "paving" && <PavingPattern id={id("p")} />}
        {kind === "roofing" && <RoofingPattern id={id("p")} />}
        {kind === "stone" && <StonePattern id={id("p")} />}
        {kind === "plan" && <PlanPattern id={id("p")} />}
      </defs>

      <rect width="800" height="600" fill={BASE[kind]} />
      <rect width="800" height="600" fill={`url(#${id("p")})`} />
      {kind === "plan" && <PlanDrawing />}
      <rect width="800" height="600" filter={`url(#${id("mottle")})`} opacity={kind === "plan" ? 0.12 : 0.22} style={{ mixBlendMode: "overlay" }} />
      <rect width="800" height="600" filter={`url(#${id("grain")})`} opacity={kind === "plan" ? 0.08 : 0.2} style={{ mixBlendMode: "overlay" }} />
      <rect width="800" height="600" fill={`url(#${id("light")})`} />
    </svg>
  );
}

const BASE: Record<MaterialKind, string> = {
  brick: "#2b2320",
  concrete: "#86827b",
  paving: "#7b7770",
  roofing: "#353d46",
  stone: "#a79f90",
  plan: "#26313c",
};

function BrickPattern({ id }: { id: string }) {
  const tones = ["#5b3a30", "#4d3129", "#664236", "#553629", "#4a2f28", "#5f3d31"];
  const w = 76;
  const h = 24;
  const j = 5;
  return (
    <pattern id={id} width={(w + j) * 3} height={(h + j) * 2} patternUnits="userSpaceOnUse">
      {[0, 1, 2].map((i) => (
        <rect key={`a${i}`} x={i * (w + j)} y={0} width={w} height={h} fill={tones[i]} />
      ))}
      {[-0.5, 0.5, 1.5, 2.5].map((i, k) => (
        <rect key={`b${k}`} x={i * (w + j)} y={h + j} width={w} height={h} fill={tones[(k + 3) % tones.length]} />
      ))}
      <rect x="0" y={h} width={(w + j) * 3} height="1.2" fill="#000" opacity="0.25" />
      <rect x="0" y={h * 2 + j} width={(w + j) * 3} height="1.2" fill="#000" opacity="0.25" />
    </pattern>
  );
}

function ConcretePattern({ id }: { id: string }) {
  // 4'×8' form panels with snap-tie holes at 2' o.c.
  const holes: Array<[number, number]> = [];
  for (const x of [50, 150, 250, 350]) for (const y of [50, 150]) holes.push([x, y]);
  return (
    <pattern id={id} width="400" height="200" patternUnits="userSpaceOnUse">
      <rect width="400" height="200" fill="none" stroke="#5f5c56" strokeWidth="1.5" opacity="0.7" />
      <rect x="1.5" y="1.5" width="397" height="197" fill="none" stroke="#a8a49c" strokeWidth="0.8" opacity="0.35" />
      {holes.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="5.5" fill="#9a968f" />
          <circle cx={x} cy={y} r="3.6" fill="#55524d" />
        </g>
      ))}
    </pattern>
  );
}

function PavingPattern({ id }: { id: string }) {
  // Sidewalk flags with tooled score joints.
  return (
    <pattern id={id} width="150" height="150" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
      <rect width="150" height="150" fill="#86827a" />
      <rect x="0" y="0" width="150" height="2.5" fill="#5a5750" />
      <rect x="0" y="0" width="2.5" height="150" fill="#5a5750" />
      <rect x="0" y="2.5" width="150" height="1" fill="#a9a59c" opacity="0.6" />
      <rect x="2.5" y="0" width="1" height="150" fill="#a9a59c" opacity="0.6" />
      <circle cx="40" cy="60" r="1" fill="#5d5a54" />
      <circle cx="110" cy="100" r="1.2" fill="#5d5a54" />
      <circle cx="80" cy="30" r="0.9" fill="#a9a59c" />
    </pattern>
  );
}

function RoofingPattern({ id }: { id: string }) {
  // Standing-seam metal panels.
  return (
    <pattern id={id} width="48" height="600" patternUnits="userSpaceOnUse">
      <rect x="0" width="48" height="600" fill="#3a434d" />
      <rect x="0" width="18" height="600" fill="#414b56" />
      <rect x="44" width="2" height="600" fill="#6f7c8a" />
      <rect x="46" width="2" height="600" fill="#20262c" />
    </pattern>
  );
}

function StonePattern({ id }: { id: string }) {
  // Coursed ashlar limestone, three courses per repeat.
  const courses: Array<{ y: number; h: number; blocks: number[] }> = [
    { y: 0, h: 52, blocks: [132, 96, 112] },
    { y: 56, h: 38, blocks: [84, 150, 106] },
    { y: 98, h: 52, blocks: [118, 72, 150] },
  ];
  const tones = ["#b3ab9b", "#aaa292", "#b9b1a2", "#a49c8c", "#b0a898"];
  let t = 0;
  return (
    <pattern id={id} width="344" height="154" patternUnits="userSpaceOnUse">
      <rect width="344" height="154" fill="#8b8375" />
      {courses.map((c) =>
        c.blocks.map((bw, i) => {
          const x = c.blocks.slice(0, i).reduce((a, b) => a + b + 4, 0);
          const fill = tones[t++ % tones.length];
          return (
            <g key={`${c.y}-${i}`}>
              <rect x={x} y={c.y} width={bw} height={c.h} fill={fill} />
              <rect x={x} y={c.y} width={bw} height="1.2" fill="#fff" opacity="0.25" />
            </g>
          );
        }),
      )}
    </pattern>
  );
}

function PlanPattern({ id }: { id: string }) {
  return (
    <pattern id={id} width="100" height="100" patternUnits="userSpaceOnUse">
      {[20, 40, 60, 80].map((p) => (
        <g key={p}>
          <rect x={p} y="0" width="0.6" height="100" fill="#fff" opacity="0.06" />
          <rect x="0" y={p} width="100" height="0.6" fill="#fff" opacity="0.06" />
        </g>
      ))}
      <rect x="0" y="0" width="1" height="100" fill="#fff" opacity="0.14" />
      <rect x="0" y="0" width="100" height="1" fill="#fff" opacity="0.14" />
    </pattern>
  );
}

/** Schematic plan linework: walls, a column grid bubble, and a dimension string. */
function PlanDrawing() {
  const s = { stroke: "#c9d5e0", fill: "none" } as const;
  return (
    <g opacity="0.5">
      <path d="M140 150 H620 V430 H380 V360 H140 Z" {...s} strokeWidth="6" opacity="0.8" />
      <path d="M140 150 H620 V430 H380 V360 H140 Z" {...s} strokeWidth="1" transform="translate(9 9)" opacity="0.6" />
      <path d="M300 150 V250 M300 290 V360 M460 150 V300" {...s} strokeWidth="3" />
      <path d="M300 250 A40 40 0 0 1 340 290" {...s} strokeWidth="1" strokeDasharray="4 4" />
      <path d="M140 110 H620" {...s} strokeWidth="1" />
      <path d="M134 116 L146 104 M294 116 L306 104 M454 116 L466 104 M614 116 L626 104" {...s} strokeWidth="1.5" />
      <circle cx="140" cy="60" r="18" {...s} strokeWidth="1.2" />
      <path d="M140 78 V140" {...s} strokeWidth="0.8" strokeDasharray="6 4" />
      <circle cx="620" cy="60" r="18" {...s} strokeWidth="1.2" />
      <path d="M620 78 V140" {...s} strokeWidth="0.8" strokeDasharray="6 4" />
      <path d="M660 430 L700 470 M700 470 H760" {...s} strokeWidth="1" />
      <circle cx="560" cy="500" r="26" {...s} strokeWidth="1.2" />
      <path d="M534 500 H586" {...s} strokeWidth="1" />
    </g>
  );
}
