// hero.jsx
// Nav + Hero composition.

// homePrefix: "" on home page, "./index.html" on inner pages
// contactHref: "#contact" scrolls to CTA on home; "mailto:…" or full page on inner pages
const NAV_SERVICE_GROUPS = [
  { id: "strategy", label: "Strategy & Transformation" },
  { id: "design",   label: "Design" },
  { id: "engineering", label: "Engineering" },
  { id: "ai",       label: "AI & Automation" },
];

function Nav({ faceStyle, accent, homePrefix = "", contactHref = "#contact" }) {
  const currentFile = window.location.pathname.split("/").pop();
  const isServicesPage = currentFile === "services-v2.html";

  const isHomePage = !currentFile || currentFile === "index.html";
  const prefix = isHomePage ? "" : "index.html";

  const NAV_LINKS = [
    { label: "Home",    href: "index.html",            page: "index.html",     dropdown: null, mobileHide: true },
    { label: "About",   href: "about-v2.html",         page: "about-v2.html",  dropdown: null },
    { label: "Services",href: "services-v2.html",      page: "services-v2.html", dropdown: NAV_SERVICE_GROUPS },
    { label: "Work",    href: `${prefix}#work`,        page: null,             dropdown: null },
    { label: "Process", href: `${prefix}#process`,     page: null,             dropdown: null },
    { label: "Contact", href: "contact.html",          page: "contact.html",   dropdown: null },
  ];

  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a className="brand" href={homePrefix || "index.html"} style={{ textDecoration: "none" }}>
          <BrandLockup size={32} variant={faceStyle} accent={accent} />
        </a>
        <div className="nav-links">
          {NAV_LINKS.map((l) => {
            const isActive = l.page && currentFile === l.page;
            if (l.dropdown) {
              return (
                <div key={l.label} className="nav-dd-wrap">
                  <a
                    href={l.href}
                    className="nav-dd-trigger"
                    style={isActive ? { color: accent } : {}}
                  >
                    {l.label} <span className="nav-dd-arrow">▾</span>
                  </a>
                  <div className="nav-dd-panel">
                    <div className="nav-dd-panel-inner">
                      {l.dropdown.map((g) => (
                        <a
                          key={g.id}
                          href={`services-v2.html#${g.id}`}
                          className="nav-dd-item"
                        >
                          {g.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <a
                key={l.label}
                href={l.href}
                className={l.mobileHide ? "nav-hide-mobile" : undefined}
                style={isActive ? { color: accent, pointerEvents: "none" } : {}}
              >
                {l.label}
              </a>
            );
          })}
        </div>
        <a className="btn btn-primary" href={contactHref}>
          Pitch us <span className="arr">→</span>
        </a>
      </div>
    </nav>
  );
}

// Hero rotation — both italic accent words swap.
// "Pitching the X. Engineering the Y." — the brand line, now restated
// against a consultancy register.
const HERO_DYADS = [
  ["fact",      "transformation"],
  ["strategy",  "operation"],
  ["evidence",  "programme"],
  ["case",      "system"],
  ["ambition",  "outcome"],
];

const HERO_SUB =
  "An independent consultancy of strategists, designers and engineers — eight years and 200+ programmes shipped for corporates, public bodies and global brands across the Middle East, Africa, Asia, Europe and the Americas.";

const HERO_PACES = { off: 0, slow: 6500, medium: 4500, fast: 3000 };

function useHeroRotation(pace) {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const ms = HERO_PACES[pace];
    if (!ms) return;
    const id = setInterval(() => setI((v) => (v + 1) % HERO_DYADS.length), ms);
    return () => clearInterval(id);
  }, [pace]);
  return [i, setI];
}

// Active engagements — anonymized, consultancy-coded.
// Each card reads like a real CXO-level programme card.
const ENGAGEMENTS = [
  {
    sector: "BFSI",
    geo: "GCC",
    practice: "Strategy + Design",
    body: "Regional banking group · digital operating model & customer experience overhaul.",
    phase: 3,
  },
  {
    sector: "Aviation",
    geo: "Asia",
    practice: "Engineering + AI",
    body: "Full-service airline · rebooking platform and ancillary surfaces.",
    phase: 2,
  },
  {
    sector: "Energy",
    geo: "East Africa",
    practice: "Transformation",
    body: "State utility · target operating model and digital backbone.",
    phase: 1,
  },
];

const PHASE_LABELS = ["Diagnose", "Define", "Design", "Deliver"];

function EngagementCard({ e, accent }) {
  return (
    <div
      style={{
        padding: "18px 20px",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 8,
        }}
      >
        <span
          className="mono"
          style={{
            fontSize: 10.5,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--mute)",
          }}
        >
          {e.sector} · {e.geo}
        </span>
        <span
          className="mono"
          style={{
            fontSize: 10.5,
            letterSpacing: "0.08em",
            color: accent,
          }}
        >
          {e.practice}
        </span>
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 14,
          lineHeight: 1.45,
          color: "var(--paper)",
          marginBottom: 12,
          textWrap: "pretty",
        }}
      >
        {e.body}
      </div>
      {/* phase strip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", gap: 4, flex: 1 }}>
          {PHASE_LABELS.map((p, i) => (
            <div
              key={p}
              style={{
                flex: 1,
                height: 4,
                background: i < e.phase ? accent : "var(--line-2)",
                opacity: i < e.phase ? (i === e.phase - 1 ? 1 : 0.5) : 1,
              }}
            />
          ))}
        </div>
        <span
          className="mono"
          style={{
            fontSize: 10.5,
            color: "var(--mute-2)",
            letterSpacing: "0.06em",
            minWidth: 92,
            textAlign: "right",
          }}
        >
          {PHASE_LABELS[e.phase - 1]} · {String(e.phase).padStart(2, "0")}/04
        </span>
      </div>
    </div>
  );
}

function EngagementBoard({ accent }) {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30 * 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = now
    .toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Dubai",
    });

  return (
    <div
      style={{
        border: "1px solid var(--line-2)",
        borderRadius: 14,
        background:
          "linear-gradient(180deg, rgba(238,242,248,0.025) 0%, rgba(238,242,248,0.005) 100%)",
        overflow: "hidden",
        minHeight: 360,
      }}
    >
      {/* header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          borderBottom: "1px solid var(--line-2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            className="pulse"
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              background: accent,
              boxShadow: `0 0 10px ${accent}`,
              display: "inline-block",
            }}
          />
          <span
            className="mono"
            style={{
              fontSize: 10.5,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--paper)",
            }}
          >
            Active engagements · Q2 2026
          </span>
        </div>
        <span
          className="mono"
          style={{
            fontSize: 10.5,
            color: "var(--mute-2)",
            letterSpacing: "0.06em",
          }}
        >
          DXB {timeStr}
        </span>
      </div>

      {ENGAGEMENTS.map((e, i) => (
        <EngagementCard key={i} e={e} accent={accent} />
      ))}

      {/* footer */}
      <div
        style={{
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <span
          className="mono"
          style={{
            fontSize: 10.5,
            color: "var(--mute)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          + 4 in diligence
        </span>
        <span
          className="serif-italic"
          style={{ fontSize: 13, color: "var(--mute)" }}
        >
          References under NDA.
        </span>
      </div>
    </div>
  );
}

function HeroStat({ value, label, accent }) {
  // Parse numeric prefix so we can count up; preserve suffix as-is.
  const match = String(value).match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = React.useState(target != null ? 0 : value);

  React.useEffect(() => {
    if (target == null) return;
    let raf;
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const v = target * eased;
      // preserve decimal places of original
      const decimals = (match[1].split(".")[1] || "").length;
      setDisplay(v.toFixed(decimals));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return (
    <div>
      <div
        className="display"
        style={{
          fontSize: 44,
          letterSpacing: "-0.02em",
          color: accent,
          fontWeight: 500,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {target != null ? `${display}${suffix}` : value}
      </div>
      <div
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--mute)",
          marginTop: 4,
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ── Typewriter hook ────────────────────────────────────────────────────────
// Reveals `text` character by character at `speed` ms/char.
// When `enabled` flips to false, jumps instantly to full text (for non-active slots).
function useTypewriter(text, speed = 40, enabled = true) {
  const len = (text || "").length;
  const [count, setCount] = React.useState(enabled ? 0 : len);
  React.useEffect(() => {
    if (!enabled) { setCount(len); return; }
    setCount(0);
    if (!len) return;
    let n = 0;
    const id = setInterval(() => {
      n++;
      setCount(n);
      if (n >= len) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, enabled, speed]);
  const safe = Math.min(count, len);
  return { typed: (text || "").slice(0, safe), done: safe >= len };
}

function Hero({ faceStyle, accent, pace = "medium" }) {
  const [i, setI] = useHeroRotation(pace);
  const [a, b] = HERO_DYADS[i];
  const ms = HERO_PACES[pace];
  const twA = useTypewriter(a, 52);
  const twB = useTypewriter(b, 58); // slightly different speed for natural stagger
  // Stable widths for both rotating slots so layout doesn't jump.
  const maxA = HERO_DYADS.reduce((m, d) => Math.max(m, d[0].length), 0);
  const maxB = HERO_DYADS.reduce((m, d) => Math.max(m, d[1].length), 0);
  return (
    <header
      id="top"
      style={{
        position: "relative",
        paddingTop: 72,
        overflow: "hidden",
      }}
    >
      <div className="grid-overlay" />

      <div className="wrap" style={{ position: "relative" }}>
        {/* eyebrow */}
        <div
          className="fadeup"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 56,
            flexWrap: "wrap",
          }}
        >
          <span className="tag">
            Independent consultancy · est. 2018 · Dubai · Gurgaon
          </span>
          <span className="tag no-dot" style={{ color: "var(--mute-2)" }}>
            <span
              className="pulse"
              style={{
                width: 6, height: 6, borderRadius: 999,
                background: accent, display: "inline-block",
                marginRight: 8,
                boxShadow: `0 0 10px ${accent}`,
              }}
            />
            Engagements open · Q3 2026
          </span>
        </div>

        {/* ── Two-column grid: hero content left · chatbot right ── */}
        <div className="fadeup hero-main">
          {/* Left: headline + sub-copy + pace strip + CTAs */}
          <div>
            <h1
              className="display"
              style={{
                fontSize: "clamp(36px, 8vw, 82px)",
                marginBottom: 28,
              }}
            >
              <span style={{ display: "block" }}>
                Pitching the{" "}
                <span className="rot-wrap" style={{ minWidth: `${maxA * 0.58}ch` }}>
                  <span
                    className="serif-italic"
                    style={{
                      color: accent,
                      fontFamily: "var(--font-serif)",
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {twA.typed}
                    {!twA.done && (
                      <span style={{
                        display: "inline-block",
                        width: "0.06em", height: "0.82em",
                        background: accent,
                        verticalAlign: "-0.06em",
                        marginLeft: "0.06em",
                        animation: "blink 0.7s steps(2) infinite",
                      }} />
                    )}
                  </span>
                  {twA.done && (
                    <span style={{ color: "var(--paper)", fontFamily: "var(--font-display)", fontStyle: "normal" }}>.</span>
                  )}
                </span>
              </span>
              <span style={{ display: "block" }}>
                Engineering the{" "}
                <span className="rot-wrap" style={{ minWidth: `${maxB * 0.58}ch` }}>
                  <span
                    className="serif-italic"
                    style={{
                      color: accent,
                      fontFamily: "var(--font-serif)",
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {twB.typed}
                    {!twB.done && (
                      <span style={{
                        display: "inline-block",
                        width: "0.06em", height: "0.82em",
                        background: accent,
                        verticalAlign: "-0.06em",
                        marginLeft: "0.06em",
                        animation: "blink 0.7s steps(2) infinite",
                      }} />
                    )}
                  </span>
                  {twB.done && (
                    <span style={{ color: "var(--paper)", fontFamily: "var(--font-display)", fontStyle: "normal" }}>.</span>
                  )}
                </span>
              </span>
            </h1>

            <p
              style={{
                fontSize: "clamp(16px, 1.4vw, 20px)",
                lineHeight: 1.55,
                color: "var(--mute)",
                maxWidth: 560,
                marginBottom: 28,
                textWrap: "pretty",
              }}
            >
              {HERO_SUB}
            </p>

            {/* pace strip */}
            {ms > 0 && (
              <div className="pace-bar" aria-hidden="true">
                {HERO_DYADS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setI(idx)}
                    className={`pace-tick ${idx === i ? "active" : idx < i ? "done" : ""}`}
                    style={{
                      "--pace-ms": `${ms}ms`,
                      border: 0,
                      padding: 0,
                      cursor: "pointer",
                    }}
                    aria-label={`Frame ${idx + 1}`}
                  />
                ))}
              </div>
            )}

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
              <a className="btn btn-primary" href="#contact">
                Request a briefing <span className="arr">→</span>
              </a>
              <a className="btn btn-ghost" href="#services">
                View the practice
              </a>
            </div>
          </div>

          {/* Right: live chatbot — Pitch, the firm's concierge */}
          <div style={{ position: "relative" }}>
            <ChatBot accent={accent} faceStyle={faceStyle} />
          </div>
        </div>


      </div>
    </header>
  );
}

Object.assign(window, { Nav, Hero });
