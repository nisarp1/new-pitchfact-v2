// app.jsx — root composition + Tweaks

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#00b8e6", "#060d18", "#f5f5f7"],
  "faceStyle": "solid",
  "heroPace": "medium",
  "density": "regular",
  "motion": "moderate"
}/*EDITMODE-END*/;

// Curated palette options — [accent, ink, paper]
// Editorial, executive-grade palettes for a senior consultancy.
const PALETTES = [
  // ── Premium directions (new) ─────────────────────────────────────
  ["#00b8e6", "#060d18", "#f5f5f7"], // Abyssal Ink — deepest midnight · electric cerulean · apple premium grey
  ["#0ea5c9", "#091520", "#fbfbfd"], // Prussian Study — rich prussian blue · deep sky-teal · apple crisp white
  ["#0cb4d4", "#0b1219", "#f4f4f5"], // Slate & Mercury — graphite slate · blue-shifted cyan · premium cement ash
  // ── Existing options ─────────────────────────────────────────────
  ["#1fb6cc", "#0a1626", "#f2eee5"], // Cyan / navy / cream (original)
  ["#b89968", "#10141d", "#f1ece1"], // Brass / graphite
  ["#3a6df0", "#0a1020", "#eef2f8"], // Sapphire / midnight
  ["#c1462e", "#10100e", "#f4ede0"], // Vermillion / coffee
  ["#1f7a5a", "#0a1410", "#eef3ec"], // Forest / fern
];

// Full variable specs for premium palettes — applied on top of accent/ink/paper
// to give a true full-depth preview including derived ink-2/ink-3/mute/line values.
const PALETTE_SPECS = {
  "#00b8e6|#060d18|#f5f5f7": { ink2: "#0a1424", ink3: "#101e33", paper2: "#e5e5ea", rgba: "220,228,240", accent2: "#b89460" },
  "#0ea5c9|#091520|#fbfbfd": { ink2: "#0e1d2d", ink3: "#152639", paper2: "#f0f0f2", rgba: "230,234,242", accent2: "#b89a5e" },
  "#0cb4d4|#0b1219|#f4f4f5": { ink2: "#111a24", ink3: "#192433", paper2: "#e4e4e7", rgba: "215,225,235", accent2: "#b8975a" },
};

function applyPalette(palette, motion) {
  const [accent, ink, paper] = palette;
  const r = document.documentElement;
  r.style.setProperty("--accent", accent);
  r.style.setProperty("--ok", accent);
  r.style.setProperty("--ink", ink);
  r.style.setProperty("--paper", paper);

  // Apply full depth spec for premium palettes (ink-2/3, mute, line, paper-2)
  const spec = PALETTE_SPECS[`${accent}|${ink}|${paper}`];
  if (spec) {
    r.style.setProperty("--ink-2",   spec.ink2);
    r.style.setProperty("--ink-3",   spec.ink3);
    r.style.setProperty("--paper-2", spec.paper2);
    r.style.setProperty("--accent-2", spec.accent2);
    r.style.setProperty("--line",    `rgba(${spec.rgba}, 0.07)`);
    r.style.setProperty("--line-2",  `rgba(${spec.rgba}, 0.14)`);
    r.style.setProperty("--mute",    `rgba(${spec.rgba}, 0.58)`);
    r.style.setProperty("--mute-2",  `rgba(${spec.rgba}, 0.38)`);
  } else {
    // Reset derived vars to stylesheet defaults for non-premium palettes
    ["--ink-2","--ink-3","--paper-2","--accent-2","--line","--line-2","--mute","--mute-2"]
      .forEach((v) => r.style.removeProperty(v));
  }

  // motion
  r.style.setProperty("--motion-on", motion === "off" ? "0" : "1");
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
      <MetricsStrip accent={accent} tag="03 · Scale" metrics={[
        { v: "8 yrs", l: "since founded · 2018" },
        { v: "200+", l: "transformations shipped" },
        { v: "75+", l: "organizations trusted" },
        { v: "3", l: "continents · ME · Africa · Asia" }
      ]} />
      <Services accent={accent} faceStyle={t.faceStyle} />
      <StatementBreak 
        accent={accent}
        tag="Note"
        dyads={[
          ["execution", "liability"],
          ["design", "document"],
          ["engineering", "concept"],
          ["evidence", "gamble"],
        ]}
      />
      <Capabilities accent={accent} />
      <Process accent={accent} />


      <Accreditations accent={accent} />
      <ClientWall accent={accent} />
      <CTA accent={accent} faceStyle={t.faceStyle} />
      <Footer accent={accent} faceStyle={t.faceStyle} />


    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
