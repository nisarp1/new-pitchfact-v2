// sections.jsx
// Manifesto · Services · Capabilities · Process · Trust · CTA · Footer

// ── Manifesto (paper flip) ────────────────────────────────────────────────
function Manifesto() {
  const dyad = useRotatingDyad({ interval: 2800, color: "var(--accent)", suffixA: ",", suffixB: "." });
  return (
    <section className="paper-section" id="about" data-screen-label="Manifesto" style={{ position: "relative", overflow: "hidden" }}>
      <div className="wrap" style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 56, alignItems: "start" }} className="manifesto-grid">
          <div>
            <span className="tag">01 · The practice</span>
            <div className="mono" style={{ fontSize: 11, color: "rgba(10,11,14,0.5)", marginTop: 32, lineHeight: 1.7 }}>
              <div>Founded 2018 · Dubai &amp; New Delhi.</div>
              <div>Independent. Privately held.</div>
              <div style={{ marginTop: 8, color: "var(--ink)" }}>Senior practitioners only.</div>
            </div>
          </div>
          <div>
            <span
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(10,11,14,0.55)",
                display: "block",
                marginBottom: 18,
              }}
            >
              A consultancy for design and digital transformation.
            </span>
            <h2
              className="display"
              style={{
                fontSize: "clamp(40px, 5.6vw, 84px)",
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                marginBottom: 32,
                color: "var(--ink)",
              }}
            >
              We work with firms that are{" "}
              {dyad.a} not firms that intend to be{" "}
              {dyad.b}
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "rgba(10,11,14,0.74)", maxWidth: 720, marginBottom: 16, textWrap: "pretty" }}>
              Corporates and MNCs come to us when the gap between strategy
              and execution has become a liability &mdash; when boards have
              signed off, programmes have stalled, and the operating model
              hasn&rsquo;t caught up with the ambition.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "rgba(10,11,14,0.74)", maxWidth: 720, textWrap: "pretty" }}>
              We bring strategy, design and engineering into one room and
              into one accountable team. We diagnose honestly, design with
              craft, and stay until the programme is in service. That is
              the firm. That is the work.
            </p>

            {/* three pillars */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 56 }} className="pillars">
              {[
                { id: "01", title: "Senior teams", body: "No pyramid. The partners who win the work run the work." },
                { id: "02", title: "End-to-end", body: "Strategy, design, engineering and change &mdash; in one accountable team." },
                { id: "03", title: "In service", body: "We measure success by what is operating in production, not what is on a slide." },
              ].map((p) => (
                <div key={p.id} style={{ borderTop: "1px solid rgba(10,11,14,0.18)", paddingTop: 16 }}>
                  <div className="mono" style={{ fontSize: 11, color: "rgba(10,11,14,0.5)", marginBottom: 10 }}>{p.id}</div>
                  <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 6, letterSpacing: "-0.01em" }}>{p.title}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.55, color: "rgba(10,11,14,0.7)" }} dangerouslySetInnerHTML={{ __html: p.body }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────────────────
const SERVICES = [
  // — Strategy & Transformation —
  {
    id: "S01",
    group: "strategy",
    title: "Digital Strategy",
    body: "Board-grade clarity on where to play and how to win. Diagnostics, market mapping, business cases — sized to the room they will be argued in.",
    bullets: ["Diagnostics & maturity", "Investment case", "North-star roadmap"],
    badge: "boardroom",
  },
  {
    id: "S02",
    group: "strategy",
    title: "Operating Model",
    body: "Re-wire the firm around the new ambition. Structures, governance, talent, and the decision rights that make the strategy run.",
    bullets: ["Target operating model", "Governance & RACI", "Talent & capability"],
    badge: "transform",
  },
  {
    id: "S03",
    group: "strategy",
    title: "Change & Adoption",
    body: "The half of transformation that gets cut from the budget — and shouldn’t. Communications, enablement, and the rituals that make change stick.",
    bullets: ["Programme communications", "Capability uplift", "Adoption metrics"],
    badge: "people",
  },
  // — Design —
  {
    id: "D01",
    group: "design",
    title: "Brand & Identity",
    body: "Wordmarks, systems and verbal identity for firms whose brand has to read in a boardroom, on an airport jetway, and in an annual report.",
    bullets: ["Wordmark & system", "Verbal identity", "Brand governance"],
    badge: "studio",
  },
  {
    id: "D02",
    group: "design",
    title: "Product & Experience",
    body: "End-to-end product design for the surfaces customers, employees and citizens actually use. Research-led, evidence-tested, design-system clean.",
    bullets: ["Service & UX design", "Design systems", "Usability & research"],
    badge: "design",
  },
  {
    id: "D03",
    group: "design",
    title: "Digital Properties",
    body: "Websites, apps and editorial properties for global brands. Built to ship, built to last, built to be edited by the people who own them.",
    bullets: ["Web & mobile", "CMS & editorial", "Performance & SEO"],
    badge: "build",
  },
  // — Engineering —
  {
    id: "E01",
    group: "engineering",
    title: "Platform Engineering",
    body: "Cloud-native platforms that the rest of the business can build on. Modular, observed, secure by default — and documented for handover.",
    bullets: ["Cloud architecture", "DevOps & SRE", "Platform handover"],
    badge: "platform",
  },
  {
    id: "E02",
    group: "engineering",
    title: "Data & Analytics",
    body: "From scattered systems to a single, governed view of the firm. Warehouses, pipelines, and the dashboards leadership actually consults.",
    bullets: ["Data warehouse", "Pipelines & ETL", "Executive analytics"],
    badge: "data",
  },
  {
    id: "E03",
    group: "engineering",
    title: "Cyber & Resilience",
    body: "A security posture that holds up to a regulator, a board, and a bad Tuesday. Identity, controls, response, and the audits to prove it.",
    bullets: ["Identity & access", "Controls & audit", "Incident response"],
    badge: "secure",
  },
  // — AI & Automation —
  {
    id: "A01",
    group: "ai",
    title: "AI Strategy",
    body: "Where AI earns its keep — and where it doesn’t. A clear-eyed portfolio, sized to the firm’s data, talent and appetite for risk.",
    bullets: ["Use-case portfolio", "Value & risk sizing", "Responsible AI"],
    badge: "advisory",
  },
  {
    id: "A02",
    group: "ai",
    title: "Agentic Systems",
    body: "Production agents for operations, customer service and back-office work — instrumented, evaluated, and integrated into the systems they replace.",
    bullets: ["Agent design", "Tool & API integration", "Evals & telemetry"],
    badge: "production",
  },
  {
    id: "A03",
    group: "ai",
    title: "Intelligent Automation",
    body: "Process automation that ships through the line, not around it. Workflow mining, redesign, and the engineering that makes it stick.",
    bullets: ["Process mining", "Workflow design", "Integration delivery"],
    badge: "ops",
  },
];

const SERVICE_GROUPS = [
  {
    id: "strategy",
    label: "Strategy & Transformation",
    subtitle: "Where to play. How to win. How to run.",
  },
  {
    id: "design",
    label: "Design",
    subtitle: "Brand, product, and the digital surface.",
  },
  {
    id: "engineering",
    label: "Engineering",
    subtitle: "Platform, data and resilience.",
  },
  {
    id: "ai",
    label: "AI & Automation",
    subtitle: "From advisory to agents in production.",
  },
];

function ServiceCard({ s, accent, faceStyle, href }) {
  const inner = (
    <article className="card" style={{ display: "flex", flexDirection: "column", gap: 16, minHeight: 320, cursor: href ? "pointer" : "default" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="mono" style={{ fontSize: 11, color: "var(--mute-2)", letterSpacing: "0.1em" }}>
          {s.id}
        </span>
        <span
          className="mono"
          style={{
            fontSize: 10,
            color: accent,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            border: `1px solid ${accent}`,
            padding: "3px 8px",
            borderRadius: 999,
          }}
        >
          {s.badge}
        </span>
      </div>
      <h3
        className="display"
        style={{
          fontSize: 26,
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          fontWeight: 500,
        }}
      >
        {s.title}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--mute)", flexGrow: 0 }}>{s.body}</p>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "auto 0 0",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          borderTop: "1px solid var(--line)",
          paddingTop: 16,
        }}
      >
        {s.bullets.map((b) => (
          <li
            key={b}
            className="mono"
            style={{ fontSize: 12, color: "var(--mute)", display: "flex", gap: 10 }}
          >
            <span style={{ color: accent }}>+</span> {b}
          </li>
        ))}
      </ul>
    </article>
  );
  return href ? (
    <a href={href} style={{ textDecoration: "none", display: "block" }}>{inner}</a>
  ) : inner;
}

function Services({ accent, faceStyle, groupBaseHref = "services-v2.html" }) {
  return (
    <section className="section" id="services" data-screen-label="Services">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="tag">03 · Practices</span>
          </div>
          <h2 className="display">
            Four practices.{" "}
            <span className="serif-italic" style={{ color: "var(--accent)" }}>
              One accountable
            </span>{" "}
            team.
          </h2>
        </div>

        {SERVICE_GROUPS.map((g, gi) => {
          const cards = SERVICES.filter((s) => s.group === g.id);
          return (
            <div key={g.id} id={g.id} style={{ marginBottom: gi < SERVICE_GROUPS.length - 1 ? 56 : 0 }}>
              {/* group header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 16,
                  paddingBottom: 18,
                  marginBottom: 20,
                  borderBottom: "1px solid var(--line-2)",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                  <span
                    className="mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      color: accent,
                      textTransform: "uppercase",
                    }}
                  >
                    {String(gi + 1).padStart(2, "0")} /
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 22,
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      color: "var(--paper)",
                    }}
                  >
                    {g.label}
                  </span>
                </div>
                <span
                  className="serif-italic"
                  style={{
                    fontSize: 16,
                    color: "var(--mute)",
                  }}
                >
                  {g.subtitle}
                </span>
              </div>

              {/* cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 20,
                }}
                className="services-grid"
              >
                {cards.map((s) => (
                  <ServiceCard key={s.id} s={s} accent={accent} faceStyle={faceStyle} href={`${groupBaseHref}#${s.group}`} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── Capabilities → Sectors & coverage ─────────────────────────────────────
const SECTORS = [
  { group: "Financial Services", items: ["Banking", "Insurance", "Capital markets", "Wealth & asset mgmt", "Islamic finance"] },
  { group: "Government & Public", items: ["Public sector", "Civic & municipal", "Aviation authority", "Humanitarian", "Education"] },
  { group: "Industrial & Energy", items: ["Energy & utilities", "Oil &amp; gas", "Manufacturing", "Cement &amp; materials", "Infrastructure"] },
  { group: "Consumer & Retail",   items: ["Retail &amp; luxury", "FMCG", "Travel &amp; hospitality", "Aviation", "Lifestyle"] },
  { group: "Technology & Media",  items: ["Technology", "Telco", "Media &amp; publishing", "B2B SaaS", "Marketplaces"] },
];

function Capabilities({ accent }) {
  return (
    <section className="section" id="sectors" data-screen-label="Sectors">
      <div className="wrap">
        <div className="section-head">
          <div><span className="tag">04 · Sectors</span></div>
          <h2 className="display">
            We work across{" "}
            <span className="serif-italic" style={{ color: "var(--accent)" }}>five</span>{" "}
            sectors. We refuse the sixth.
          </h2>
        </div>

        <div
          style={{
            border: "1px solid var(--line-2)",
            borderRadius: 18,
            overflow: "hidden",
            background: "var(--ink-2)",
          }}
        >
          {/* header strip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 22px",
              borderBottom: "1px solid var(--line)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--mute)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: 999, background: accent, boxShadow: `0 0 10px ${accent}` }} />
            <span>Sector coverage · {SECTORS.reduce((n, s) => n + s.items.length, 0)} sub-sectors</span>
            <span style={{ marginLeft: "auto", color: "var(--mute-2)" }}>Engagements live across all five</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0 }} className="stack-grid">
            {SECTORS.map((col, i) => (
              <div
                key={col.group}
                style={{
                  padding: "32px 24px",
                  borderRight: i < SECTORS.length - 1 ? "1px solid var(--line)" : "none",
                }}
              >
                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--mute-2)",
                    marginBottom: 8,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: "var(--paper)",
                    marginBottom: 22,
                    textWrap: "balance",
                  }}
                >
                  {col.group}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.items.map((it) => (
                    <li
                      key={it}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 13.5,
                        color: "var(--paper)",
                        opacity: 0.85,
                        display: "flex",
                        gap: 10,
                        alignItems: "baseline",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: `<span style="color:${accent};font-family:var(--font-mono);font-size:10px;letter-spacing:0.08em">—</span> ${it}`,
                      }}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* refusal strip */}
          <div
            style={{
              borderTop: "1px solid var(--line)",
              padding: "16px 22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--mute-2)",
            }}
          >
            <span>Out of scope · Defence · Surveillance · Gambling</span>
            <span className="serif-italic" style={{ textTransform: "none", letterSpacing: 0, color: "var(--mute)" }}>
              On principle, not on policy.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Process ───────────────────────────────────────────────────────────────
const PROCESS = [
  { id: "P01", word: "Diagnose", body: "An honest read of the firm — leadership interviews, document review, and a written hypothesis inside three weeks." },
  { id: "P02", word: "Define",   body: "Scope, success criteria and the operating model the programme will run inside. Signed off before a line of code." },
  { id: "P03", word: "Design",   body: "Strategy, service, brand and product — designed end-to-end by senior practitioners. Weekly demos with the steering committee." },
  { id: "P04", word: "Deliver",  body: "Build, integrate, instrument and hand over. We stay until the programme is in service and the firm can run it without us." },
];

function Process({ accent }) {
  return (
    <section className="section" id="process" data-screen-label="Process">
      <div className="wrap">
        <div className="section-head">
          <div><span className="tag">05 · How we engage</span></div>
          <h2 className="display">
            Four phases.{" "}
            <span className="serif-italic" style={{ color: "var(--accent)" }}>
              One programme.
            </span>{" "}
            From diagnosis to handover.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, border: "1px solid var(--line)", borderRadius: 18, overflow: "hidden" }} className="process-grid">
          {PROCESS.map((p, i) => (
            <div
              key={p.id}
              style={{
                padding: "40px 32px 36px",
                borderRight: i < PROCESS.length - 1 ? "1px solid var(--line)" : "none",
                background: i % 2 === 0 ? "var(--ink-2)" : "var(--ink)",
                position: "relative",
                minHeight: 240,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div className="mono" style={{ fontSize: 11, color: "var(--mute-2)", letterSpacing: "0.1em", marginBottom: 18 }}>
                  {p.id}
                </div>
                <h3
                  className="display"
                  style={{
                    fontSize: 48,
                    lineHeight: 0.98,
                    letterSpacing: "-0.03em",
                    color: i === 2 ? accent : "var(--paper)",
                    fontWeight: 500,
                    marginBottom: 18,
                  }}
                >
                  {i === 2 ? (
                    <span className="serif-italic" style={{ color: accent }}>
                      {p.word}.
                    </span>
                  ) : (
                    <>{p.word}.</>
                  )}
                </h3>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--mute)", textWrap: "pretty" }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Trust / Outcomes ──────────────────────────────────────────────────────
const QUOTES = [
  {
    body: "They diagnosed the operating model honestly, then designed the programme our board could actually sign. Two years on, it is what is running the bank.",
    role: "Group Chief Operating Officer",
    org: "Tier-1 Regional Bank · GCC",
  },
  {
    body: "The brand and the digital estate were re-imagined as one. The first time in a decade the firm reads on the outside the way it operates on the inside.",
    role: "Chief Marketing Officer",
    org: "Listed Industrial Group · India",
  },
  {
    body: "Senior partners on the floor. No back-bench. They stayed until the platform was in service and the team owned it. That is what we paid for.",
    role: "Chief Digital Officer",
    org: "National Utility · East Africa",
  },
];

function Trust({ accent, faceStyle }) {
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % QUOTES.length), 6400);
    return () => clearInterval(id);
  }, []);
  const q = QUOTES[active];

  return (
    <section className="section" id="work" data-screen-label="Trust">
      <div className="wrap">
        <div className="section-head">
          <div><span className="tag">06 · The record</span></div>
          <h2 className="display">
            Outcomes, on the{" "}
            <span className="serif-italic" style={{ color: "var(--accent)" }}>
              record.
            </span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 48, alignItems: "stretch" }} className="trust-grid">
          {/* Quote */}
          <div
            style={{
              border: "1px solid var(--line-2)",
              borderRadius: 18,
              padding: "44px 44px 36px",
              background: "var(--ink-2)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 320,
            }}
          >
            <div
              className="serif-italic"
              style={{
                fontSize: "clamp(22px, 2.4vw, 32px)",
                lineHeight: 1.3,
                color: "var(--paper)",
                textWrap: "pretty",
              }}
            >
              &ldquo;{q.body}&rdquo;
            </div>
            <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", marginTop: 36, gap: 16, flexWrap: "wrap" }}>
              <div>
                <div className="mono" style={{ fontSize: 12, color: "var(--paper)", marginBottom: 2 }}>{q.role}</div>
                <div className="mono" style={{ fontSize: 11, color: "var(--mute-2)" }}>{q.org}</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {QUOTES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Quote ${i + 1}`}
                    style={{
                      width: 22,
                      height: 4,
                      background: i === active ? accent : "var(--line-2)",
                      border: 0,
                      borderRadius: 4,
                      cursor: "pointer",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Metrics column */}
          <div style={{ display: "grid", gridTemplateRows: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { v: "USD 420M", l: "programme value under management" },
              { v: "18 mo", l: "median engagement, lead-partner held" },
              { v: "94%", l: "programmes in service at handover" },
            ].map((m) => (
              <div
                key={m.l}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: 14,
                  padding: "20px 22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                }}
              >
                <div
                  className="display"
                  style={{
                    fontSize: 32,
                    letterSpacing: "-0.02em",
                    color: accent,
                    fontWeight: 500,
                  }}
                >
                  {m.v}
                </div>
                <div className="mono" style={{ fontSize: 11, color: "var(--mute)", textAlign: "right", lineHeight: 1.4, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  {m.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────
function CTA({ accent, faceStyle }) {
  return (
    <section className="section" id="contact" data-screen-label="CTA" style={{ paddingBottom: 80 }}>
      <div className="wrap">
        <div
          style={{
            border: "1px solid var(--line-2)",
            borderRadius: 24,
            padding: "72px 64px",
            background:
              "linear-gradient(180deg, var(--ink-2) 0%, var(--ink) 100%)",
            position: "relative",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 56,
            alignItems: "center",
          }}
          className="cta-card"
        >
          <div>
            <span className="tag">08 · Engage</span>
            <h2
              className="display"
              style={{
                fontSize: "clamp(44px, 6.4vw, 88px)",
                lineHeight: 0.98,
                letterSpacing: "-0.03em",
                marginTop: 18,
                marginBottom: 24,
              }}
            >
              Begin a{" "}
              <span className="serif-italic" style={{ color: accent }}>
                conversation.
              </span>
            </h2>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.6,
                color: "var(--mute)",
                maxWidth: 560,
                marginBottom: 32,
                textWrap: "pretty",
              }}
            >
              We take a small number of engagements each quarter. Tell us
              the ambition, the constraints and the timing. A senior partner
              will come back inside two business days &mdash; with a point of
              view, not a sales deck.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="mailto:partners@pitchfact.co">
                partners@pitchfact.co <span className="arr">→</span>
              </a>
              <a className="btn btn-ghost" href="mailto:partners@pitchfact.co">
                Request a partner briefing
              </a>
            </div>
          </div>

          {/* Right: partner card — quiet, editorial */}
          <div>
            <div
              style={{
                border: "1px solid var(--line-2)",
                borderRadius: 16,
                padding: "24px 24px 20px",
                background: "rgba(238, 242, 248, 0.02)",
              }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--mute)",
                  marginBottom: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <span>Partner contacts</span>
                <span style={{ color: accent }}>Q3 2026</span>
              </div>
              {[
                { name: "Dubai", role: "Managing Partner · GCC", line: "Strategy, Design" },
                { name: "New Delhi", role: "Partner · South Asia", line: "Engineering, AI" },
                { name: "Nairobi", role: "Partner · East Africa", line: "Public sector, Energy" },
              ].map((p, i, arr) => (
                <div
                  key={p.name}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "14px 0",
                    borderBottom:
                      i < arr.length - 1 ? "1px solid var(--line)" : "none",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 18,
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        color: "var(--paper)",
                        marginBottom: 4,
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      className="mono"
                      style={{
                        fontSize: 11,
                        color: "var(--mute)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {p.role}
                    </div>
                  </div>
                  <div
                    className="serif-italic"
                    style={{ fontSize: 14, color: accent, textAlign: "right" }}
                  >
                    {p.line}
                  </div>
                </div>
              ))}
            </div>
            <div
              className="mono"
              style={{
                marginTop: 16,
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--mute-2)",
                textAlign: "right",
              }}
            >
              NDA on first call · References on second
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────
function Footer({ accent, faceStyle, homePrefix = "" }) {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--line)",
        paddingTop: 56,
        paddingBottom: 40,
      }}
    >
      <div className="wrap">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 40,
            marginBottom: 56,
          }}
          className="footer-grid"
        >
          <div>
            <a className="brand" href={homePrefix ? homePrefix : "#top"} style={{ textDecoration: "none" }}>
              <BrandLockup size={36} variant={faceStyle} accent={accent} />
            </a>
            <p
              style={{
                marginTop: 20,
                fontSize: 14,
                lineHeight: 1.6,
                color: "var(--mute)",
                maxWidth: 380,
                textWrap: "pretty",
              }}
            >
              An independent consultancy for design and digital transformation.
              Strategy, design and engineering &mdash; senior teams, end-to-end,
              in service of the firm.
            </p>
          </div>

          {[
            {
              h: "Practices",
              links: [
                { label: "Strategy & Transformation", href: "services-v2.html#strategy" },
                { label: "Design",                    href: "services-v2.html#design" },
                { label: "Engineering",               href: "services-v2.html#engineering" },
                { label: "AI & Automation",           href: "services-v2.html#ai" },
              ],
            },
            {
              h: "Firm",
              links: [
                { label: "About",    href: "about-v2.html" },
                { label: "Sectors",  href: "#sectors" },
                { label: "Process",  href: "#process" },
                { label: "Careers",  href: "careers-v2.html" },
              ],
            },
            {
              h: "Offices",
              links: [
                { label: "Dubai · GCC",            href: "about-v2.html#offices" },
                { label: "New Delhi · South Asia",  href: "about-v2.html#offices" },
                { label: "Nairobi · East Africa",   href: "about-v2.html#offices" },
                { label: "partners@pitchfact.co",   href: "mailto:partners@pitchfact.co" },
              ],
            },
          ].map((col) => (
            <div key={col.h}>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--mute-2)",
                  marginBottom: 16,
                }}
              >
                {col.h}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      style={{
                        textDecoration: "none",
                        fontSize: 14,
                        color: "var(--paper)",
                        opacity: 0.85,
                      }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid var(--line)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--mute-2)",
            letterSpacing: "0.06em",
          }}
        >
          <span>© 2026 PITCHFACT CONSULTING</span>
          <span>SENIOR TEAMS · END-TO-END · IN SERVICE</span>
          <span>ESTABLISHED 2018 · DUBAI · NEW DELHI</span>
        </div>
      </div>
    </footer>
  );
}

// responsive media for sections
const sectionMediaCSS = `
@media (max-width: 1100px) {
  .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
  .stack-grid { grid-template-columns: repeat(2, 1fr) !important; }
  .stack-grid > div { border-right: none !important; border-bottom: 1px solid var(--line) !important; }
  .process-grid { grid-template-columns: repeat(2, 1fr) !important; }
  .process-grid > div { border-right: none !important; border-bottom: 1px solid var(--line) !important; }
}
@media (max-width: 900px) {
  .manifesto-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
  .pillars { grid-template-columns: 1fr !important; gap: 16px !important; }
  .trust-grid { grid-template-columns: 1fr !important; }
  .cta-card { grid-template-columns: 1fr !important; padding: 48px 32px !important; }
  .footer-grid { grid-template-columns: 1fr 1fr !important; }
}
@media (max-width: 720px) {
  .services-grid { grid-template-columns: 1fr !important; }
  .stack-grid { grid-template-columns: 1fr !important; }
  .process-grid { grid-template-columns: 1fr !important; }
  .footer-grid { grid-template-columns: 1fr !important; }
}
`;
(function injectSectionsCSS() {
  if (typeof document === "undefined") return;
  if (document.getElementById("__sections_media_css")) return;
  const s = document.createElement("style");
  s.id = "__sections_media_css";
  s.textContent = sectionMediaCSS;
  document.head.appendChild(s);
})();

Object.assign(window, { Manifesto, Services, Capabilities, Process, Trust, CTA, Footer });
