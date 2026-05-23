// app.jsx — root composition + Tweaks

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#1fb6cc", "#0a1626", "#f2eee5"],
  "faceStyle": "solid",
  "heroPace": "medium",
  "density": "regular",
  "motion": "moderate"
}/*EDITMODE-END*/;

// Curated palette options — [accent, ink, paper]
// Editorial, executive-grade palettes for a senior consultancy.
const PALETTES = [
  ["#1fb6cc", "#0a1626", "#f2eee5"], // Cyan / navy / cream (default — consultancy)
  ["#b89968", "#10141d", "#f1ece1"], // Brass / graphite
  ["#3a6df0", "#0a1020", "#eef2f8"], // Sapphire / midnight
  ["#c1462e", "#10100e", "#f4ede0"], // Vermillion / coffee
  ["#1f7a5a", "#0a1410", "#eef3ec"], // Forest / fern
  ["#0a1626", "#f2eee5", "#0a1626"], // Inverted — paper-led
];

function applyPalette(palette, motion) {
  const [accent, ink, paper] = palette;
  const r = document.documentElement;
  r.style.setProperty("--accent", accent);
  r.style.setProperty("--ink", ink);
  r.style.setProperty("--paper", paper);
  // motion
  r.style.setProperty(
    "--motion-on",
    motion === "off" ? "0" : "1"
  );
}

// Disable animations when motion="off"
const motionCSS = `
[data-motion="off"] * { animation: none !important; transition: none !important; }
[data-motion="subtle"] .grid-overlay { display: none; }
`;
(function injectMotionCSS() {
  if (typeof document === "undefined") return;
  if (document.getElementById("__motion_css")) return;
  const s = document.createElement("style");
  s.id = "__motion_css";
  s.textContent = motionCSS;
  document.head.appendChild(s);
})();

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const accent = t.palette[0];

  React.useEffect(() => {
    applyPalette(t.palette, t.motion);
    document.documentElement.setAttribute("data-motion", t.motion);
  }, [t.palette, t.motion]);

  return (
    <>
      <Nav faceStyle={t.faceStyle} accent={accent} />
      <Hero faceStyle={t.faceStyle} accent={accent} pace={t.heroPace} />
      <Marquee
        accent={accent}
        items={[
          "Strategy & Transformation",
          "Design",
          "Engineering",
          "AI & Data",
          "Eight years in practice · since 2018",
          "Middle East · Africa · Asia",
          "75+ organisations · 200+ programs",
        ]}
      />
      <Manifesto />
      <History accent={accent} />
      <Services accent={accent} faceStyle={t.faceStyle} />
      <Capabilities accent={accent} />
      <Process accent={accent} />
      <Trust accent={accent} faceStyle={t.faceStyle} />
      <ClientWall accent={accent} />
      <CTA accent={accent} faceStyle={t.faceStyle} />
      <Footer accent={accent} faceStyle={t.faceStyle} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand" />
        <TweakColor
          label="Palette"
          value={t.palette}
          options={PALETTES}
          onChange={(v) => setTweak("palette", v)}
        />
        <TweakRadio
          label="Mascot style"
          value={t.faceStyle}
          options={["solid", "outline", "glyph"]}
          onChange={(v) => setTweak("faceStyle", v)}
        />

        <TweakSection label="Hero" />
        <TweakRadio
          label="Rotation"
          value={t.heroPace}
          options={["off", "slow", "medium", "fast"]}
          onChange={(v) => setTweak("heroPace", v)}
        />

        <TweakSection label="System" />
        <TweakRadio
          label="Motion"
          value={t.motion}
          options={["off", "subtle", "moderate"]}
          onChange={(v) => setTweak("motion", v)}
        />

        <TweakSection label="Mascot preview" />
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 0 6px",
            background: t.palette[1],
            borderRadius: 10,
          }}
        >
          <PixelFace size={56} variant={t.faceStyle} accent={accent} blink />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 13,
              letterSpacing: "0.18em",
              fontWeight: 600,
              color: t.palette[2],
            }}
          >
            mascot
          </span>
        </div>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
