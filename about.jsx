// about.jsx — About page · content sourced from pitchfact.co live site
// Components: AboutHero · MissionValues · Partners · AboutApp
// Reuses: Nav (hero.jsx) · Marquee · History · ClientWall · CTA · Footer (sections + history-clients)

const ABOUT_ACCENT = "#1fb6cc";
const ABOUT_FACE   = "solid";

const MARQUEE_ITEMS = [
  "Strategy & Transformation",
  "Design",
  "Engineering",
  "AI & Data",
  "Eight years in practice · since 2018",
  "Middle East · Africa · Asia",
  "75+ organisations · 200+ programmes",
];

// ── About Hero ────────────────────────────────────────────────────────────

function AboutStat({ value, label, accent }) {
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
      const eased = 1 - Math.pow(1 - t, 3);
      const decimals = (match[1].split(".")[1] || "").length;
      setDisplay((target * eased).toFixed(decimals));
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
          fontSize: "clamp(36px, 4vw, 60px)",
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

function AboutHero({ accent }) {
  return (
    <header
      id="top"
      style={{ position: "relative", paddingTop: 80, paddingBottom: 96, overflow: "hidden" }}
    >
      <div className="grid-overlay" />
      <GhostFace />

      <div className="wrap" style={{ position: "relative" }}>
        {/* eyebrow */}
        <div className="fadeup" style={{ marginBottom: 52 }}>
          <span className="tag">
            Independent consultancy · est. 2018 · Dubai · New Delhi
          </span>
        </div>

        {/* two-column layout */}
        <div
          className="fadeup about-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 72,
            alignItems: "end",
          }}
        >
          {/* left: headline + copy + CTAs */}
          <div>
            <h1
              className="display"
              style={{ fontSize: "clamp(40px, 5.6vw, 84px)", marginBottom: 28 }}
            >
              We are{" "}
              <span className="serif-italic" style={{ color: accent }}>
                Human First,
              </span>{" "}
              In a Digital World.
            </h1>
            <p
              style={{
                fontSize: "clamp(15px, 1.3vw, 18px)",
                lineHeight: 1.65,
                color: "var(--mute)",
                maxWidth: 560,
                marginBottom: 12,
                textWrap: "pretty",
              }}
            >
              Welcome to Pitchfact — your trusted partner in driving Digital
              Transformation, Artificial Intelligence innovation, IT Solutions,
              and Consulting Services.
            </p>
            <p
              style={{
                fontSize: "clamp(14px, 1.2vw, 16px)",
                lineHeight: 1.65,
                color: "var(--mute-2)",
                maxWidth: 560,
                marginBottom: 36,
                textWrap: "pretty",
              }}
            >
              Headquartered in the UAE, we serve a diverse clientele across the
              Middle East, Africa, Europe, Asia and the United States. We
              combine deep industry expertise with advanced digital capabilities
              to help organisations reimagine their operations and unlock new
              efficiencies.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="mailto:hello@pitchfact.co">
                Request a briefing <span className="arr">→</span>
              </a>
              <a className="btn btn-ghost" href="./index.html#services">
                View the practice
              </a>
            </div>
          </div>

          {/* right: brand pull-quote card */}
          <div
            style={{
              padding: "36px 40px",
              border: "1px solid var(--line-2)",
              borderRadius: 16,
              background: "rgba(238,242,248,0.02)",
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 9.5,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: accent,
                marginBottom: 20,
              }}
            >
              The PITCH
            </div>
            <div
              className="serif-italic"
              style={{
                fontSize: "clamp(18px, 2vw, 28px)",
                lineHeight: 1.45,
                color: "var(--paper)",
                marginBottom: 28,
              }}
            >
              "We aren't just building a company — we are building a commitment
              to pursuing ideas that create hope."
            </div>
            <div
              style={{
                height: 1,
                background: "var(--line-2)",
                marginBottom: 20,
              }}
            />
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: accent,
                marginBottom: 8,
              }}
            >
              Driven By Data. Backed By Facts.
            </div>
            <div
              className="mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--mute-2)",
              }}
            >
              hello@pitchfact.co · +971 586398986
            </div>
          </div>
        </div>

        {/* stats strip */}
        <div
          className="about-stats"
          style={{
            marginTop: 80,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
            paddingTop: 32,
            borderTop: "1px solid var(--line)",
          }}
        >
          <AboutStat value="8"    label="years in practice · since 2018"  accent={accent} />
          <AboutStat value="75+"  label="organisations trusted"            accent={accent} />
          <AboutStat value="200+" label="transformation programmes"        accent={accent} />
          <AboutStat value="100+" label="years collective experience"      accent={accent} />
        </div>
      </div>
    </header>
  );
}

// ── Mission, Vision & Values ──────────────────────────────────────────────

const MVV = [
  {
    num: "01",
    label: "Mission",
    title: "Organisational buoyancy.",
    body: "To see your business transformed by helping you discover and improve your organisational buoyancy through intelligent business solutions.",
  },
  {
    num: "02",
    label: "Vision",
    title: "Future-ready by design.",
    body: "To empower businesses with cutting-edge technology and strategic insights that fuel growth, agility, and future-readiness.",
  },
  {
    num: "03",
    label: "Client Centricity",
    title: "Your challenge is our brief.",
    body: "We put our clients at the centre of everything we do, delivering tailored solutions that bridge today's challenges and tomorrow's opportunities.",
  },
  {
    num: "04",
    label: "People First",
    title: "Human first, always.",
    body: "We place a premium on the well-being of our team, believing our strength is derived from the talents, ideas, and experiences of our people.",
  },
];

function MissionValues({ accent }) {
  return (
    <section className="paper-section" style={{ padding: "120px 0" }}>
      <div className="wrap">
        {/* head */}
        <div className="section-head" style={{ marginBottom: 64 }}>
          <div>
            <span
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(10,11,14,0.5)",
              }}
            >
              01 · Who we are
            </span>
          </div>
          <h2
            className="display"
            style={{
              fontSize: "clamp(34px, 4.6vw, 68px)",
              color: "var(--ink)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
            }}
          >
            Driven by{" "}
            <span className="serif-italic" style={{ color: accent }}>data.</span>{" "}
            Backed by{" "}
            <span className="serif-italic" style={{ color: accent }}>facts.</span>
          </h2>
        </div>

        {/* 2×2 card grid */}
        <div
          className="mvv-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
          }}
        >
          {MVV.map((v) => (
            <div
              key={v.num}
              style={{
                padding: "36px 32px",
                border: "1px solid rgba(10,11,14,0.1)",
                borderRadius: 16,
                background: "rgba(10,11,14,0.03)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <span
                  className="mono"
                  style={{
                    fontSize: 9.5,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "3px 8px",
                    borderRadius: 4,
                    border: `1px solid ${accent}40`,
                    color: accent,
                  }}
                >
                  {v.label}
                </span>
                <span
                  className="mono"
                  style={{ fontSize: 10, color: "rgba(10,11,14,0.3)", letterSpacing: "0.06em" }}
                >
                  {v.num}
                </span>
              </div>
              <h3
                className="display"
                style={{
                  fontSize: 24,
                  fontWeight: 500,
                  color: "var(--ink)",
                  marginBottom: 14,
                  letterSpacing: "-0.01em",
                }}
              >
                {v.title}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "rgba(10,11,14,0.66)",
                  textWrap: "pretty",
                }}
              >
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Offices / Contact ─────────────────────────────────────────────────────

const OFFICES = [
  {
    city: "Dubai",
    geo: "GCC · Middle East",
    role: "Headquarters",
    address: "6th Floor, Meydan Grandstand\nMeydan Road, Nad Al Sheba\nDubai, U.A.E",
    phone: "+971 586398986",
    whatsapp: "+971 555681102",
    email: "hello@pitchfact.co",
    hours: "Mon–Fri · 9AM–6PM",
    note: "Primary office · EST 2018",
  },
  {
    city: "New Delhi",
    geo: "South Asia",
    role: "Engineering Hub",
    address: "New Delhi, India",
    phone: null,
    whatsapp: null,
    email: "hello@pitchfact.co",
    hours: "Mon–Fri · 9AM–6PM",
    note: "Engineering & AI · EST 2020",
  },
  {
    city: "Nairobi",
    geo: "East Africa",
    role: "Africa Practice",
    address: "Nairobi, Kenya",
    phone: null,
    whatsapp: null,
    email: "hello@pitchfact.co",
    hours: "Mon–Fri · 9AM–6PM",
    note: "Public sector & Energy · EST 2022",
  },
];

function Offices({ accent }) {
  return (
    <section className="section" id="offices" style={{ padding: "120px 0" }}>
      <div className="wrap">
        {/* head */}
        <div className="section-head" style={{ marginBottom: 64 }}>
          <div>
            <span className="tag">03 · The offices</span>
          </div>
          <h2
            className="display"
            style={{ fontSize: "clamp(34px, 4.6vw, 68px)" }}
          >
            Three offices.{" "}
            <span className="serif-italic" style={{ color: accent }}>
              One firm.
            </span>
          </h2>
        </div>

        {/* office cards */}
        <div
          className="offices-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {OFFICES.map((o) => (
            <div
              key={o.city}
              style={{
                border: "1px solid var(--line)",
                borderRadius: 16,
                background: "var(--ink-2)",
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* avatar */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  background: "var(--ink)",
                  border: "1px solid var(--line-2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 24,
                }}
              >
                <PixelFace size={32} variant="solid" accent={accent} blink />
              </div>

              <div
                className="display"
                style={{
                  fontSize: 36,
                  fontWeight: 500,
                  letterSpacing: "-0.025em",
                  color: "var(--paper)",
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {o.city}
              </div>

              <div
                className="mono"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--mute-2)",
                  marginBottom: 4,
                }}
              >
                {o.geo}
              </div>

              <div
                style={{
                  fontSize: 12,
                  color: accent,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.06em",
                  marginBottom: 24,
                }}
              >
                {o.role}
              </div>

              <div
                style={{
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: "var(--mute)",
                  whiteSpace: "pre-line",
                  marginBottom: 20,
                }}
              >
                {o.address}
              </div>

              <div style={{ height: 1, background: "var(--line)", marginBottom: 20 }} />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  marginBottom: 16,
                }}
              >
                {o.phone && (
                  <a
                    href={`tel:${o.phone.replace(/\s/g, "")}`}
                    className="mono"
                    style={{
                      fontSize: 11,
                      color: "var(--mute)",
                      textDecoration: "none",
                      letterSpacing: "0.04em",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mute)")}
                  >
                    ☎ {o.phone}
                  </a>
                )}
                {o.whatsapp && (
                  <a
                    href={`https://wa.me/${o.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono"
                    style={{
                      fontSize: 11,
                      color: "var(--mute)",
                      textDecoration: "none",
                      letterSpacing: "0.04em",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#25d366")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mute)")}
                  >
                    WhatsApp {o.whatsapp}
                  </a>
                )}
                <a
                  href={`mailto:${o.email}`}
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: "var(--mute)",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mute)")}
                >
                  {o.email}
                </a>
              </div>

              <div
                className="mono"
                style={{
                  fontSize: 9.5,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--mute-2)",
                  marginTop: "auto",
                }}
              >
                {o.hours} · {o.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Responsive CSS ────────────────────────────────────────────────────────
const aboutCSS = `
@media (max-width: 980px) {
  .about-hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
  .about-stats     { grid-template-columns: repeat(2, 1fr) !important; }
  .offices-grid    { grid-template-columns: 1fr !important; }
}
@media (max-width: 720px) {
  .mvv-grid        { grid-template-columns: 1fr !important; }
  .offices-grid    { grid-template-columns: 1fr !important; }
}
`;
(function injectAboutCSS() {
  if (typeof document === "undefined") return;
  if (document.getElementById("__about_css")) return;
  const s = document.createElement("style");
  s.id = "__about_css";
  s.textContent = aboutCSS;
  document.head.appendChild(s);
})();

// ── AboutApp Root ─────────────────────────────────────────────────────────

function AboutApp() {
  React.useEffect(() => {
    document.documentElement.setAttribute("data-motion", "moderate");
    const r = document.documentElement;
    r.style.setProperty("--accent", ABOUT_ACCENT);
    r.style.setProperty("--ink",    "#0a1626");
    r.style.setProperty("--paper",  "#f2eee5");
    r.style.setProperty("--motion-on", "1");
  }, []);

  return (
    <>
      <Nav
        faceStyle={ABOUT_FACE}
        accent={ABOUT_ACCENT}
        homePrefix="./index.html"
        contactHref="mailto:hello@pitchfact.co"
      />
      <AboutHero accent={ABOUT_ACCENT} />
      <Marquee accent={ABOUT_ACCENT} items={MARQUEE_ITEMS} />
      <MissionValues accent={ABOUT_ACCENT} />
      <History accent={ABOUT_ACCENT} />
      <Offices accent={ABOUT_ACCENT} />
      <ClientWall accent={ABOUT_ACCENT} />
      <CTA accent={ABOUT_ACCENT} faceStyle={ABOUT_FACE} />
      <Footer accent={ABOUT_ACCENT} faceStyle={ABOUT_FACE} homePrefix="./index.html" />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<AboutApp />);
