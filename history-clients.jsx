// history-clients.jsx
// History timeline (2018→2024) + Client wall — sourced from the legacy pitchfact.co site.

const HISTORY = [
  {
    year: "2018",
    title: "The Beginning",
    accent: "consulting",
    body: "Founded in Dubai as an independent practice — design and digital transformation, retained engagements, senior-only delivery.",
  },
  {
    year: "2020",
    title: "Growth & Expansion",
    accent: "global",
    body: "A second office in Gurgaon. The firm becomes a multi-geography partner — 75+ corporates and public bodies, 200+ programmes.",
  },
  {
    year: "2022",
    title: "Engineering First",
    accent: "delivery",
    body: "Engineering, data and cyber capabilities brought in-house. The consultancy ships the programmes it designs, end-to-end.",
  },
  {
    year: "2026",
    title: "Future Ready",
    accent: "trusted",
    body: "A trusted partner across the Middle East, Africa and Asia. AI sits inside every practice — not as a posture, as a discipline.",
  },
];

function History({ accent }) {
  return (
    <section className="section" id="history" data-screen-label="History">
      <div className="wrap">
        <div className="section-head">
          <div><span className="tag">02 · Since 2018</span></div>
          <h2 className="display">
            A brief journey of{" "}
            <span className="serif-italic" style={{ color: "var(--accent)" }}>
              growth
            </span>{" "}
            and{" "}
            <span className="serif-italic" style={{ color: "var(--accent)" }}>
              invention.
            </span>
          </h2>
        </div>

        {/* timeline */}
        <div
          style={{
            position: "relative",
            border: "1px solid var(--line)",
            borderRadius: 18,
            overflow: "hidden",
            background: "var(--ink-2)",
          }}
        >
          {/* horizontal rail */}
          <div
            style={{
              position: "absolute",
              top: 86,
              left: 32,
              right: 32,
              height: 1,
              background: "var(--line-2)",
              pointerEvents: "none",
            }}
            aria-hidden="true"
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 0,
            }}
            className="history-grid"
          >
            {HISTORY.map((h, i) => (
              <div
                key={h.year}
                style={{
                  padding: "40px 28px 36px",
                  borderRight: i < HISTORY.length - 1 ? "1px solid var(--line)" : "none",
                  position: "relative",
                  minHeight: 280,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* year + node */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 18,
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      fontSize: 13,
                      letterSpacing: "0.12em",
                      color: i === HISTORY.length - 1 ? accent : "var(--paper)",
                      fontWeight: 500,
                    }}
                  >
                    {h.year}
                  </span>
                  <span
                    className={i === HISTORY.length - 1 ? "pulse" : ""}
                    style={{
                      width: 10,
                      height: 10,
                      background: i === HISTORY.length - 1 ? accent : "var(--paper)",
                      display: "inline-block",
                      boxShadow: i === HISTORY.length - 1 ? `0 0 12px ${accent}` : "none",
                      position: "relative",
                      zIndex: 1,
                    }}
                  />
                </div>

                <h3
                  className="display"
                  style={{
                    fontSize: 24,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.1,
                    marginBottom: 8,
                  }}
                >
                  {h.title}
                </h3>
                <div
                  className="serif-italic"
                  style={{
                    fontSize: 16,
                    color: accent,
                    marginBottom: 14,
                  }}
                >
                  &ldquo;{h.accent}.&rdquo;
                </div>

                <p
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.5,
                    color: "var(--mute)",
                    textWrap: "pretty",
                  }}
                >
                  {h.body}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Client wall ───────────────────────────────────────────────────────────
const CLIENTS = [
  { name: "Air Arabia",         tag: "Aviation" },
  { name: "RTA Dubai",          tag: "Public Sector" },
  { name: "National Bonds",     tag: "Finance" },
  { name: "Dubai Humanitarian", tag: "NGO" },
  { name: "Horn Cement",        tag: "Manufacturing" },
  { name: "Independent Energy", tag: "Energy" },
  { name: "Independent Tobacco",tag: "FMCG" },
  { name: "Advanced Luxury",    tag: "Retail" },
  { name: "Hana Shisha",        tag: "FMCG" },
  { name: "Imperion",           tag: "Industrial" },
  { name: "Mavenlabs",          tag: "Technology" },
  { name: "Mindfield",          tag: "Retail Intel." },
  { name: "Athena",             tag: "Education" },
  { name: "EACS",               tag: "Services" },
  { name: "Guedi",              tag: "Infrastructure" },
  { name: "MSG",                tag: "Hospitality" },
  { name: "Turrino",            tag: "Lifestyle" },
  { name: "SO",                 tag: "Hospitality" },
];

function ClientWall({ accent }) {
  return (
    <section className="section" id="clients" data-screen-label="Clients">
      <div className="wrap">
        <div className="section-head">
          <div><span className="tag">07 · Client base</span></div>
          <h2 className="display">
            Trusted, quietly, by{" "}
            <span className="serif-italic" style={{ color: "var(--accent)" }}>
              75+
            </span>{" "}
            organisations.
          </h2>
        </div>

        {/* meta strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            paddingBottom: 18,
            marginBottom: 0,
            borderBottom: "1px solid var(--line-2)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--mute)",
          }}
        >
          <span>{CLIENTS.length} of 75+ shown</span>
          <span>Middle East · Africa · Asia</span>
          <span>Public · Private · Civic</span>
        </div>

        {/* grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 0,
          }}
          className="clients-grid"
        >
          {CLIENTS.map((c, i) => {
            const col = i % 6;
            const row = Math.floor(i / 6);
            const totalRows = Math.ceil(CLIENTS.length / 6);
            return (
              <div
                key={c.name}
                style={{
                  padding: "22px 18px",
                  borderRight: col < 5 ? "1px solid var(--line)" : "none",
                  borderBottom: row < totalRows - 1 ? "1px solid var(--line)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  minHeight: 96,
                  position: "relative",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--ink-2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    color: "var(--mute-2)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 17,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: "var(--paper)",
                    lineHeight: 1.15,
                    textWrap: "balance",
                  }}
                >
                  {c.name}
                </span>
                <span
                  className="mono"
                  style={{
                    fontSize: 10.5,
                    color: accent,
                    letterSpacing: "0.04em",
                    marginTop: "auto",
                  }}
                >
                  ◆ {c.tag}
                </span>
              </div>
            );
          })}
        </div>

        {/* note */}
        <p
          style={{
            marginTop: 24,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.06em",
            color: "var(--mute-2)",
            textTransform: "uppercase",
          }}
        >
          + 57 more under nda · references on request
        </p>
      </div>
    </section>
  );
}

// responsive
const historyMediaCSS = `
@media (max-width: 1100px) {
  .clients-grid { grid-template-columns: repeat(3, 1fr) !important; }
  .clients-grid > div:nth-child(3n) { border-right: none !important; }
  .clients-grid > div { border-bottom: 1px solid var(--line) !important; }
  .history-grid { grid-template-columns: repeat(2, 1fr) !important; }
  .history-grid > div:nth-child(2n) { border-right: none !important; }
  .history-grid > div { border-bottom: 1px solid var(--line); }
  .history-stats { grid-template-columns: repeat(2, 1fr) !important; }
}
@media (max-width: 720px) {
  .clients-grid { grid-template-columns: repeat(2, 1fr) !important; }
  .clients-grid > div:nth-child(odd) { border-right: 1px solid var(--line) !important; }
  .clients-grid > div:nth-child(even) { border-right: none !important; }
  .history-grid { grid-template-columns: 1fr !important; }
  .history-grid > div { border-right: none !important; }
  .history-stats { grid-template-columns: 1fr !important; }
}
`;
(function injectHistoryCSS() {
  if (typeof document === "undefined") return;
  if (document.getElementById("__history_media_css")) return;
  const s = document.createElement("style");
  s.id = "__history_media_css";
  s.textContent = historyMediaCSS;
  document.head.appendChild(s);
})();

Object.assign(window, { History, ClientWall });
