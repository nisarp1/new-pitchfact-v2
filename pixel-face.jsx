// pixel-face.jsx
// PITCHFACT mark — abstract pixel grid that reads as a face.
// Three styles: "solid" (filled head w/ screen), "outline" (just the lines), "glyph" (minimal).
// All renders via SVG <rect> so the pixels stay crisp at any size.

// Grid legend: 0=empty, 1=foreground (paper/ink), 2=accent, 3=screen-fill (ink on solid)
// 12x12 grids designed by hand.

const FACE_SOLID = [
  [0,0,0,1,1,1,1,1,1,0,0,0],
  [0,0,1,1,1,1,1,1,1,1,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,1,3,3,3,3,3,3,1,1,0],
  [0,1,1,3,2,3,3,2,3,1,1,0], // eyes
  [0,1,1,3,3,3,3,3,3,1,1,0],
  [0,1,1,3,2,3,3,2,3,1,1,0], // mouth corners
  [0,1,1,3,3,2,2,3,3,1,1,0], // smile
  [0,1,1,3,3,3,3,3,3,1,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,1,1,1,1,1,1,1,1,0,0],
  [0,0,0,1,1,1,1,1,1,0,0,0],
];

const FACE_OUTLINE = [
  [0,0,0,1,1,1,1,1,1,0,0,0],
  [0,0,1,0,0,0,0,0,0,1,0,0],
  [0,1,0,0,0,0,0,0,0,0,1,0],
  [0,1,0,0,0,0,0,0,0,0,1,0],
  [0,1,0,0,2,0,0,2,0,0,1,0], // eyes
  [0,1,0,0,0,0,0,0,0,0,1,0],
  [0,1,0,0,0,0,0,0,0,0,1,0],
  [0,1,0,0,0,2,2,0,0,0,1,0], // mouth
  [0,1,0,0,0,0,0,0,0,0,1,0],
  [0,1,0,0,0,0,0,0,0,0,1,0],
  [0,0,1,0,0,0,0,0,0,1,0,0],
  [0,0,0,1,1,1,1,1,1,0,0,0],
];

const FACE_GLYPH = [
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,1,1,1,1,1,1,1,1,0,0],
  [0,0,1,0,0,0,0,0,0,1,0,0],
  [0,0,1,0,2,0,0,2,0,1,0,0], // eyes
  [0,0,1,0,0,0,0,0,0,1,0,0],
  [0,0,1,0,0,2,2,0,0,1,0,0], // mouth
  [0,0,1,0,0,0,0,0,0,1,0,0],
  [0,0,1,1,1,1,1,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
];

// Blink variant — eyes lit as horizontal lines
const FACE_SOLID_BLINK = (() => {
  const g = FACE_SOLID.map((r) => r.slice());
  // eye row index 4: change pattern to long lines
  g[4] = [0,1,1,3,2,2,3,2,2,3,1,1].map((v) => (v === 0 ? 0 : v));
  // wait that broke head outline — let me build properly
  return [
    [0,0,0,1,1,1,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,3,3,3,3,3,3,1,1,0],
    [0,1,1,3,2,2,3,2,2,1,1,0], // eyes closed (lines)
    [0,1,1,3,3,3,3,3,3,1,1,0],
    [0,1,1,3,2,3,3,2,3,1,1,0],
    [0,1,1,3,3,2,2,3,3,1,1,0],
    [0,1,1,3,3,3,3,3,3,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,1,1,1,1,1,1,1,1,0,0],
    [0,0,0,1,1,1,1,1,1,0,0,0],
  ];
})();

// Talking frames — mouth cycles through O / line / wide to suggest speech.
// All built from FACE_SOLID, only mouth rows (6, 7) change.
const FACE_TALK_A = [
  [0,0,0,1,1,1,1,1,1,0,0,0],
  [0,0,1,1,1,1,1,1,1,1,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,1,3,3,3,3,3,3,1,1,0],
  [0,1,1,3,2,3,3,2,3,1,1,0],
  [0,1,1,3,3,3,3,3,3,1,1,0],
  [0,1,1,3,3,2,2,3,3,1,1,0], // mouth open small
  [0,1,1,3,3,2,2,3,3,1,1,0],
  [0,1,1,3,3,3,3,3,3,1,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,1,1,1,1,1,1,1,1,0,0],
  [0,0,0,1,1,1,1,1,1,0,0,0],
];
const FACE_TALK_B = [
  [0,0,0,1,1,1,1,1,1,0,0,0],
  [0,0,1,1,1,1,1,1,1,1,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,1,3,3,3,3,3,3,1,1,0],
  [0,1,1,3,2,3,3,2,3,1,1,0],
  [0,1,1,3,3,3,3,3,3,1,1,0],
  [0,1,1,3,3,3,3,3,3,1,1,0],
  [0,1,1,3,2,2,2,2,3,1,1,0], // mouth flat line
  [0,1,1,3,3,3,3,3,3,1,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,1,1,1,1,1,1,1,1,0,0],
  [0,0,0,1,1,1,1,1,1,0,0,0],
];
const FACE_TALK_C = [
  [0,0,0,1,1,1,1,1,1,0,0,0],
  [0,0,1,1,1,1,1,1,1,1,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,1,3,3,3,3,3,3,1,1,0],
  [0,1,1,3,2,3,3,2,3,1,1,0],
  [0,1,1,3,3,3,3,3,3,1,1,0],
  [0,1,1,3,2,2,2,2,3,1,1,0], // wider open
  [0,1,1,3,2,3,3,2,3,1,1,0],
  [0,1,1,3,3,2,2,3,3,1,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,1,1,1,1,1,1,1,1,0,0],
  [0,0,0,1,1,1,1,1,1,0,0,0],
];

const STYLES = {
  solid: FACE_SOLID,
  solidBlink: FACE_SOLID_BLINK,
  solidTalkA: FACE_TALK_A,
  solidTalkB: FACE_TALK_B,
  solidTalkC: FACE_TALK_C,
  outline: FACE_OUTLINE,
  glyph: FACE_GLYPH,
};

// ── PMarkPixel ────────────────────────────────────────────────────────────
// Heritage P-mark — keeps the chunky "P" silhouette from the legacy logo
// (where the bee used to live in the bowl) and drops a tiny pixel robot face
// into the bowl knockout. Aspect: 110×150 (taller than wide). `size` = height.
function PMarkPixel({
  size = 64,
  fg = "var(--paper)",
  accent = "var(--accent)",
  blink = false,
  className = "",
  style: cssStyle,
}) {
  const [blinking, setBlinking] = React.useState(false);

  React.useEffect(() => {
    if (!blink) return;
    let t1, t2;
    let alive = true;
    const loop = () => {
      if (!alive) return;
      const wait = 2400 + Math.random() * 2800;
      t1 = setTimeout(() => {
        if (!alive) return;
        setBlinking(true);
        t2 = setTimeout(() => {
          if (!alive) return;
          setBlinking(false);
          loop();
        }, 140);
      }, wait);
    };
    loop();
    return () => {
      alive = false;
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [blink]);

  const h = size;
  const w = size * (110 / 150);

  // Outer P with bowl knockout (evenodd)
  const pPath =
    "M 0 0 H 72 C 95 0 110 14 110 35 C 110 56 95 70 72 70 H 32 V 150 H 0 Z " +
    "M 22 16 H 70 C 80 16 88 24 88 35 C 88 46 80 54 70 54 H 22 Z";

  // 6x6 mini face inside bowl knockout. 0=empty, 1=fg, 2=accent
  const FACE_OPEN = [
    [0, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 2, 1, 1, 2, 1], // eyes
    [1, 1, 1, 1, 1, 1],
    [1, 1, 2, 2, 1, 1], // smile
    [0, 1, 1, 1, 1, 0],
  ];
  const FACE_BLINK_PM = [
    [0, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 1], // eyes closed
    [1, 1, 1, 1, 1, 1],
    [1, 1, 2, 2, 1, 1],
    [0, 1, 1, 1, 1, 0],
  ];
  const grid = blinking ? FACE_BLINK_PM : FACE_OPEN;

  // Position face inside bowl (knockout is x:22-88, y:16-54 → ~66x38)
  // Face 6x6, cell=5 → 30x30, centered at (55, 35) → start (40, 20)
  const faceX = 40, faceY = 20, cell = 5;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 110 150"
      className={`pf ${className}`}
      style={cssStyle}
      aria-hidden="true"
    >
      <path d={pPath} fill={fg} fillRule="evenodd" />
      <g shapeRendering="crispEdges">
        {grid.flatMap((row, y) =>
          row.map((v, x) => {
            if (v === 0) return null;
            const color = v === 1 ? fg : accent;
            return (
              <rect
                key={`${x}-${y}`}
                x={faceX + x * cell}
                y={faceY + y * cell}
                width={cell}
                height={cell}
                fill={color}
              />
            );
          })
        )}
      </g>
    </svg>
  );
}

// Renders a pixel-face mark.
// Props:
//  size    — px width/height of the SVG (it stays square)
//  style   — "solid" | "outline" | "glyph"
//  fg      — foreground (the "case") color
//  accent  — accent (eyes/mouth) color
//  screen  — screen color (only used for "solid")
//  blink   — when true, animates a blink loop on solid variant
//  className/style — passthrough
function PixelFace({
  size = 64,
  variant = "solid",
  fg = "var(--paper)",
  accent = "var(--accent)",
  screen = "var(--ink)",
  blink = false,
  talking = false,
  className = "",
  style: cssStyle,
}) {
  // P-mark heritage variant — different aspect, separate component
  if (variant === "pmark") {
    return (
      <PMarkPixel
        size={size}
        fg={fg}
        accent={accent}
        blink={blink}
        className={className}
        style={cssStyle}
      />
    );
  }

  const [blinking, setBlinking] = React.useState(false);
  const [talkFrame, setTalkFrame] = React.useState(0);

  React.useEffect(() => {
    if (!blink) return;
    let timer;
    const loop = () => {
      // blink for ~120ms every 2.4-5s
      const wait = 2200 + Math.random() * 2800;
      timer = setTimeout(() => {
        setBlinking(true);
        setTimeout(() => {
          setBlinking(false);
          loop();
        }, 130);
      }, wait);
    };
    loop();
    return () => clearTimeout(timer);
  }, [blink]);

  // Talking cycle — rotate through three mouth frames while `talking`
  React.useEffect(() => {
    if (!talking) {
      setTalkFrame(0);
      return;
    }
    const id = setInterval(() => {
      setTalkFrame((f) => (f + 1) % 3);
    }, 130);
    return () => clearInterval(id);
  }, [talking]);

  let grid;
  if (variant === "solid") {
    if (blinking) grid = STYLES.solidBlink;
    else if (talking) {
      grid = [STYLES.solidTalkA, STYLES.solidTalkB, STYLES.solidTalkC][talkFrame];
    } else grid = STYLES.solid;
  } else {
    grid = STYLES[variant] || STYLES.solid;
  }
  const N = grid.length;
  const cell = size / N;

  const colorFor = (v) => {
    if (v === 1) return fg;
    if (v === 2) return accent;
    if (v === 3) return screen;
    return null;
  };

  return (
    <svg
      className={`pf ${className}`}
      width={size}
      height={size}
      viewBox={`0 0 ${N} ${N}`}
      style={cssStyle}
      aria-hidden="true"
    >
      {grid.flatMap((row, y) =>
        row.map((v, x) => {
          const c = colorFor(v);
          if (!c) return null;
          return (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={c}
            />
          );
        })
      )}
    </svg>
  );
}

// Hero-sized animated mark with subtle "looking around" via eye accent swap.
function PixelFaceHero({ size = 360, variant = "solid", accent = "var(--accent)" }) {
  const [phase, setPhase] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => {
      setPhase((v) => (v + 1) % 4);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  // phase 0 = neutral, 1 = look left, 2 = look right, 3 = blink
  const baseGrid = STYLES[variant] || STYLES.solid;
  const grid = React.useMemo(() => {
    const g = baseGrid.map((r) => r.slice());
    if (variant !== "solid") return g;
    if (phase === 1) {
      g[4] = [0,1,1,3,2,3,3,3,3,1,1,0];
    } else if (phase === 2) {
      g[4] = [0,1,1,3,3,3,3,3,2,1,1,0];
    } else if (phase === 3) {
      g[4] = [0,1,1,3,2,2,3,2,2,1,1,0];
    }
    return g;
  }, [phase, variant, baseGrid]);

  const N = grid.length;
  const colorFor = (v) => {
    if (v === 1) return "var(--paper)";
    if (v === 2) return accent;
    if (v === 3) return "var(--ink)";
    return null;
  };

  return (
    <svg
      className="pf"
      width={size}
      height={size}
      viewBox={`0 0 ${N} ${N}`}
      aria-hidden="true"
    >
      {grid.flatMap((row, y) =>
        row.map((v, x) => {
          const c = colorFor(v);
          if (!c) return null;
          return (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={c} />
          );
        })
      )}
    </svg>
  );
}

// Wordmark — pixel face + PITCHFACT text
// Brand lockup — the heritage Pitchfact "P" logo image (black silhouette
// from the legacy site) sitting in a small white panel so it reads on dark
// canvas, followed by the PITCHFACT wordmark. The variant prop is ignored
// here (the lockup is fixed) — `variant` only controls the pixel-face mascot
// used elsewhere (CTA, tweaks preview, etc).
function BrandLockup({ size = 32, variant, accent = "var(--accent)", color = "var(--paper)" }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        textDecoration: "none",
        color,
      }}
    >
      <span
        aria-label="Pitchfact"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          background: "#ffffff",
          borderRadius: Math.max(4, size * 0.18),
          padding: Math.max(2, size * 0.08),
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.5) inset, 0 0 0 1px rgba(255,255,255,0.4), 0 8px 24px rgba(0,0,0,0.35)",
          flexShrink: 0,
        }}
      >
        <img
          src={typeof PITCHFACT_LOGO_DATA_URI !== "undefined" ? PITCHFACT_LOGO_DATA_URI : "assets/pitchfact-logo.png"}
          alt="Pitchfact logo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </span>
      <span
        className="brand-name"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          letterSpacing: "0.18em",
          fontSize: Math.max(13, size * 0.46),
          lineHeight: 1,
          color,
        }}
      >
        PITCHFACT
      </span>
    </span>
  );
}

function Wordmark({ size = 28, variant = "solid", accent = "var(--accent)" }) {
  return <BrandLockup size={size} variant={variant} accent={accent} />;
}

Object.assign(window, { PixelFace, PixelFaceHero, PMarkPixel, Wordmark, BrandLockup, FACE_STYLES: STYLES });

// ── FaceConstellation ────────────────────────────────────────────────────
// Scatters tiny pixel faces at fixed pseudo-random positions, drifting subtly.
// Acts as ambient background art for the hero.

// Deterministic PRNG so layout is stable across re-renders
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function FaceConstellation({ count = 28, seed = 7, accent = "var(--accent)", maxSize = 22, minSize = 8 }) {
  const items = React.useMemo(() => {
    const rnd = mulberry32(seed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: rnd() * 100,
      y: rnd() * 100,
      size: minSize + rnd() * (maxSize - minSize),
      opacity: 0.08 + rnd() * 0.22,
      delay: rnd() * -9, // negative so they're mid-animation already
      duration: 7 + rnd() * 6,
      variant: rnd() > 0.65 ? "glyph" : rnd() > 0.4 ? "outline" : "solid",
      accentChance: rnd() > 0.78, // a few accent-tinted ones
    }));
  }, [count, seed, minSize, maxSize]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {items.map((it) => (
        <div
          key={it.id}
          className="drift"
          style={{
            position: "absolute",
            left: `${it.x}%`,
            top: `${it.y}%`,
            opacity: it.opacity,
            animationDelay: `${it.delay}s`,
            animationDuration: `${it.duration}s`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <PixelFace
            size={it.size}
            variant={it.variant}
            accent={it.accentChance ? accent : "var(--paper)"}
            fg="var(--paper)"
          />
        </div>
      ))}
    </div>
  );
}

// ── GhostFace ─────────────────────────────────────────────────────────────
// Massive low-opacity face behind hero content
function GhostFace({ size = 720, variant = "glyph", accent = "var(--accent)" }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        right: "-8%",
        top: "12%",
        pointerEvents: "none",
        opacity: 0.06,
        transform: "rotate(-6deg)",
      }}
    >
      <PixelFace size={size} variant={variant} accent={accent} fg="var(--paper)" />
    </div>
  );
}

// ── RotatingDyad ──────────────────────────────────────────────────────────
// Two synchronized rotating words for the manifesto headline.
// Pair structure: (the firm we want to be) / (the firm we'd rather not be).
const DYADS = [
  ["modernising",   "rebranding"],
  ["transforming",  "restructuring"],
  ["operating",     "planning"],
  ["shipping",      "deliberating"],
  ["accountable",   "advised"],
];

function useRotatingDyad({ interval = 2800, color = "var(--accent-3)", suffixA = "", suffixB = "" } = {}) {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % DYADS.length), interval);
    return () => clearInterval(id);
  }, [interval]);

  const [a, b] = DYADS[i];
  const maxA = DYADS.reduce((m, d) => Math.max(m, d[0].length), 0);
  const maxB = DYADS.reduce((m, d) => Math.max(m, d[1].length), 0);

  return {
    a: (
      <span className="rot-wrap" style={{ minWidth: `${maxA * 0.55}ch` }}>
        <span key={`a-${i}`} className="rot-word serif-italic" style={{ color }}>
          {a}
        </span>
        {suffixA && (
          <span style={{ fontFamily: "var(--font-display)", fontStyle: "normal", letterSpacing: "-0.02em" }}>
            {suffixA}
          </span>
        )}
      </span>
    ),
    b: (
      <span className="rot-wrap" style={{ minWidth: `${maxB * 0.55}ch` }}>
        <span key={`b-${i}`} className="rot-word serif-italic" style={{ color }}>
          {b}
        </span>
        {suffixB && (
          <span style={{ fontFamily: "var(--font-display)", fontStyle: "normal", letterSpacing: "-0.02em" }}>
            {suffixB}
          </span>
        )}
      </span>
    ),
  };
}

// ── Marquee strip ─────────────────────────────────────────────────────────
function Marquee({ items, accent = "var(--accent)" }) {
  const renderTrack = (key) => (
    <div className="marquee-track" key={key}>
      {items.map((it, i) => (
        <span className="marquee-item" key={`${key}-${i}`}>
          <span className="marquee-dot" />
          {it}
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee" aria-hidden="true">
      {renderTrack("a")}
      {renderTrack("b")}
    </div>
  );
}

Object.assign(window, { FaceConstellation, GhostFace, useRotatingDyad, Marquee });

// ── EyesConstellation ────────────────────────────────────────────────────
// Pairs of pixel eyes scattered across a region; each pair blinks on its own
// schedule. Stays on-brand (the robot is just peeking) without the visual
// noise of full faces.

function EyePair({ size = 20, accent = "var(--accent)", blinkInterval = 3200, blinkPhase = 0 }) {
  const [blink, setBlink] = React.useState(false);
  React.useEffect(() => {
    let timeout;
    let mounted = true;
    const scheduleNext = (initial = false) => {
      const wait = initial ? blinkPhase : blinkInterval + Math.random() * 1800;
      timeout = setTimeout(() => {
        if (!mounted) return;
        setBlink(true);
        setTimeout(() => {
          if (!mounted) return;
          setBlink(false);
          scheduleNext();
        }, 140);
      }, wait);
    };
    scheduleNext(true);
    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, [blinkInterval, blinkPhase]);

  // 8x4 grid: two eyes occupying 2x2 blocks, gap in middle
  // open:   . ■ ■ . . ■ ■ .
  //         . ■ ■ . . ■ ■ .
  // blink:  . . . . . . . .
  //         ■ ■ ■ . ■ ■ ■ .   <- horizontal line
  return (
    <svg width={size * 2} height={size} viewBox="0 0 8 4" className="pf" aria-hidden="true">
      {blink ? (
        <g fill={accent}>
          <rect x="0" y="2" width="3" height="1" />
          <rect x="4" y="2" width="3" height="1" />
        </g>
      ) : (
        <g fill={accent}>
          <rect x="1" y="1" width="2" height="2" />
          <rect x="4" y="1" width="2" height="2" />
        </g>
      )}
    </svg>
  );
}

function EyesConstellation({ count = 9, seed = 11, accent = "var(--accent)", maxSize = 14, minSize = 7 }) {
  const items = React.useMemo(() => {
    const rnd = mulberry32(seed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: rnd() * 100,
      y: rnd() * 100,
      size: minSize + rnd() * (maxSize - minSize),
      opacity: 0.10 + rnd() * 0.22,
      driftDelay: rnd() * -12,
      driftDuration: 14 + rnd() * 10,
      blinkInterval: 3800 + rnd() * 6000,
      blinkPhase: 800 + rnd() * 6000,
      rot: (rnd() - 0.5) * 6,
    }));
  }, [count, seed, minSize, maxSize]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {items.map((it) => (
        <div
          key={it.id}
          className="drift"
          style={{
            position: "absolute",
            left: `${it.x}%`,
            top: `${it.y}%`,
            opacity: it.opacity,
            animationDelay: `${it.driftDelay}s`,
            animationDuration: `${it.driftDuration}s`,
            transform: `translate(-50%, -50%) rotate(${it.rot}deg)`,
          }}
        >
          <EyePair
            size={it.size}
            accent={accent}
            blinkInterval={it.blinkInterval}
            blinkPhase={it.blinkPhase}
          />
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { EyePair, EyesConstellation });
