// services.jsx — Pitchfact v2 Services inner page

const SERVICES_ACCENT = "#1fb6cc";
const SERVICES_FACE   = "solid";

const MARQUEE_ITEMS = [
  "Digital Strategy", "Operating Model", "Change & Adoption",
  "Brand & Identity", "Product & Experience", "Digital Properties",
  "Platform Engineering", "Data & Analytics", "Cyber & Resilience",
  "AI Strategy", "Agentic Systems", "Intelligent Automation",
];

// ── Services Hero ──────────────────────────────────────────────────────────
function ServicesHero({ accent }) {
  return (
    <header
      id="top"
      style={{
        position: "relative",
        paddingTop: 72,
        paddingBottom: 96,
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
          <span className="tag">03 · Practices</span>
          <span className="tag no-dot" style={{ color: "var(--mute-2)" }}>
            <span
              className="pulse"
              style={{
                width: 6, height: 6, borderRadius: 999,
                background: accent, display: "inline-block",
                marginRight: 8, boxShadow: `0 0 10px ${accent}`,
              }}
            />
            Engagements open · Q3 2026
          </span>
        </div>

        <div
          className="fadeup"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 80,
            alignItems: "end",
          }}
        >
          {/* left: headline + body */}
          <div>
            <h1
              className="display"
              style={{ fontSize: "clamp(44px, 6.6vw, 82px)", marginBottom: 28 }}
            >
              Four practices.{" "}
              <span
                className="serif-italic"
                style={{ color: accent, fontFamily: "var(--font-serif)", fontWeight: 400, letterSpacing: "-0.01em" }}
              >
                One accountable
              </span>{" "}
              team.
            </h1>
            <p
              style={{
                fontSize: "clamp(16px, 1.4vw, 20px)",
                lineHeight: 1.55,
                color: "var(--mute)",
                maxWidth: 580,
                marginBottom: 32,
                textWrap: "pretty",
              }}
            >
              Strategy, design, engineering and AI & automation — run by senior
              partners from brief to delivery. No handoffs. No junior proxies.
              One team accountable for the outcome.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="mailto:partners@pitchfact.co">
                Start a conversation <span className="arr">→</span>
              </a>
              <a className="btn btn-ghost" href="#strategy">
                See the practices
              </a>
            </div>
          </div>

          {/* right: practice index card */}
          <div
            style={{
              border: "1px solid var(--line-2)",
              borderRadius: 14,
              overflow: "hidden",
              background: "linear-gradient(180deg, rgba(238,242,248,0.025) 0%, rgba(238,242,248,0.005) 100%)",
            }}
          >
            <div
              style={{
                padding: "14px 20px",
                borderBottom: "1px solid var(--line-2)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                className="pulse"
                style={{ width: 7, height: 7, borderRadius: 999, background: accent, boxShadow: `0 0 10px ${accent}`, display: "inline-block" }}
              />
              <span className="mono" style={{ fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--paper)" }}>
                Practice index
              </span>
            </div>
            {[
              { num: "01", id: "strategy", label: "Strategy & Transformation", sub: "S01 · S02 · S03" },
              { num: "02", id: "design",   label: "Design",                    sub: "D01 · D02 · D03" },
              { num: "03", id: "engineering", label: "Engineering",            sub: "E01 · E02 · E03" },
              { num: "04", id: "ai",        label: "AI & Automation",          sub: "A01 · A02 · A03" },
            ].map((p, i, arr) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none",
                  textDecoration: "none",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(238,242,248,0.04)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <span className="mono" style={{ fontSize: 10, color: accent, letterSpacing: "0.1em" }}>{p.num}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 500, color: "var(--paper)" }}>
                    {p.label}
                  </span>
                </div>
                <span className="mono" style={{ fontSize: 10, color: "var(--mute-2)", letterSpacing: "0.06em" }}>{p.sub}</span>
              </a>
            ))}
          </div>
        </div>

        {/* stat strip */}
        <div
          style={{
            marginTop: 80,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
            paddingTop: 32,
            borderTop: "1px solid var(--line)",
          }}
        >
          {[
            { v: "12",  l: "service lines across 4 practices" },
            { v: "200+", l: "programmes delivered" },
            { v: "75+",  l: "corporate & public clients" },
            { v: "8",    l: "years · since 2018" },
          ].map(({ v, l }) => (
            <div key={l}>
              <div className="display" style={{ fontSize: 44, letterSpacing: "-0.02em", color: accent, fontWeight: 500 }}>{v}</div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--mute)", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

// ── ServicesApp root ────────────────────────────────────────────────────────
function ServicesApp() {
  return (
    <>
      <Nav
        faceStyle={SERVICES_FACE}
        accent={SERVICES_ACCENT}
        homePrefix="./index.html"
        contactHref="mailto:hello@pitchfact.co"
      />
      <ServicesHero accent={SERVICES_ACCENT} />
      <Marquee accent={SERVICES_ACCENT} items={MARQUEE_ITEMS} />
      {/* Services section — on the services page cards link to same-page anchors */}
      <Services accent={SERVICES_ACCENT} faceStyle={SERVICES_FACE} groupBaseHref="" />
      <Capabilities accent={SERVICES_ACCENT} />
      <CTA accent={SERVICES_ACCENT} faceStyle={SERVICES_FACE} />
      <Footer accent={SERVICES_ACCENT} faceStyle={SERVICES_FACE} homePrefix="./index.html" />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<ServicesApp />);
