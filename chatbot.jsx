// chatbot.jsx
// "Pitch" — the firm's concierge. A working chat panel with the pixel
// mascot as the assistant avatar. Talks to window.claude.complete.
//
// Design notes:
//   - The mascot lives in the header; mouth animates when assistant is
//     either streaming or thinking.
//   - Messages are rendered as quiet editorial bubbles; assistant uses
//     paper-on-ink, user uses ink-on-accent.
//   - Suggested questions are shown until the user sends a message.

const PITCH_SYSTEM = `You are Pitch, the digital concierge for Pitchfact — an independent design and digital transformation consultancy founded in 2018, with offices in Dubai and New Delhi.

The firm has four practices: Strategy & Transformation, Design, Engineering, and AI & Automation. It works with corporates, public bodies and global brands across the Middle East, Africa and Asia. 75+ organisations, 200+ programmes shipped, eight years in practice.

How to respond:
- Speak as a calm, senior, well-briefed concierge — not a sales bot, not a chatbot. Think McKinsey reception, not SaaS pop-up.
- Two to four short sentences. No bullet lists. No emojis. No exclamation marks.
- If asked about pricing, named clients, or specifics beyond what is on the website, decline gracefully and offer a partner briefing.
- If asked about defence, surveillance, or gambling work, say the firm declines those sectors on principle.
- Out-of-scope questions (politics, personal advice, etc.): redirect to the practice politely in one line.
- When useful, end with one short suggestion of what the visitor could ask next, phrased as a question.`;

const PITCH_WELCOME =
  "Hello. I'm Pitch — the firm's concierge. Ask me about our practices, the sectors we work in, or how an engagement begins.";

const SUGGESTED = [
  "What does a typical engagement look like?",
  "How is AI handled across the firm?",
];

// ── Terminal Feed Data ────────────────────────────────────────────────────

// Single interleaved feed — studio activity mixed with world pulse
const FEED_SOURCE = [
  { time: "10:00", type: "brainstormed", text: "Chamundeshwari prototype — kickoff with creative leads" },
  { type: "heard",        text: "OpenAI debuts real-time multi-agent orchestration — 47k GitHub stars in 24h" },
  { time: "10:17", type: "cooking",      text: "Team 2 deep in big-data sentiment pipeline · early signals strong" },
  { type: "updated",      text: "Claude 4.5: context window extended to 2M tokens · live in production" },
  { time: "11:43", type: "finalised",    text: "AI Agents architecture locked for Project Three — Team 3 ships!" },
  { type: "heard",        text: "Figma launches AI-first design system automation for enterprise" },
  { time: "13:05", type: "updated",      text: "Politician Platform 3 design system · iteration 4 approved" },
  { type: "brainstormed", text: "Agentic workflows set to reshape 40% of enterprise SaaS by 2027 — a16z" },
  { time: "14:22", type: "finalised",    text: "Design handoff complete for Politician 3 · dev sprint starts Monday" },
  { type: "heard",        text: "Mistral drops open-source reasoning model · benchmarks challenge GPT-4o" },
  { time: "15:38", type: "heard",        text: "Client brief received · Gulf fintech expansion · scoping begins" },
  { type: "updated",      text: "Vercel v0 ships full-stack AI apps from a single natural-language prompt" },
  { time: "16:10", type: "brainstormed", text: "Internal AI sprint — 3 hypotheses pressure-tested · all green" },
  { type: "brainstormed", text: "Next frontier: agents that negotiate contracts and self-deploy infrastructure" },
  { type: "heard",        text: "WHO report: AI diagnostics cut clinical error rates 31% across 14 countries" },
  { type: "updated",      text: "Apple Intelligence on-device coding assistant ships with Xcode 17" },
  { type: "brainstormed", text: "Voice-first UX will dominate emerging-market mobile by 2028 — GSMA" },
  { type: "heard",        text: "Design tokens are the new brand language — Adobe MAX 2026 keynote" },
];

const TYPE_META = {
  heard:        { label: "$ heard",        color: "#f4c542" },
  brainstormed: { label: "↳ brainstormed", color: "#1fb6cc" },
  updated:      { label: "✓ updated",      color: null  }, // accent
  finalised:    { label: "✓ finalised",    color: "#c6ff3d" },
  cooking:      { label: "↳ cooking",      color: "#ff8c42" },
};

function TypingDots({ accent }) {
  return (
    <span
      aria-label="thinking"
      style={{
        display: "inline-flex",
        gap: 4,
        alignItems: "center",
        padding: "2px 0",
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: accent,
            opacity: 0.4,
            animation: `chatDot 1.1s ${i * 0.18}s ease-in-out infinite`,
          }}
        />
      ))}
    </span>
  );
}

// ── Terminal Components ───────────────────────────────────────────────────

function TerminalLine({ type, text, time, accent }) {
  const meta = TYPE_META[type] || { label: `$ ${type}`, color: accent };
  const color = meta.color || accent;
  return (
    <div
      className={`term-line term-${type}`}
      style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "3px 0" }}
    >
      {/* left: tag + optional time as one unit — fixed width so text always starts at same column */}
      <div style={{ minWidth: 132, flexShrink: 0, display: "flex", alignItems: "center", gap: 6 }}>
        <span
          className="mono"
          style={{ fontSize: 10, color, letterSpacing: "0.05em", whiteSpace: "nowrap" }}
        >
          {meta.label}
        </span>
        {time && (
          <span
            className="mono"
            style={{ fontSize: 9.5, color: "var(--mute-2)", letterSpacing: "0.02em" }}
          >
            {time}
          </span>
        )}
      </div>
      {/* right: text — single line, truncates with ellipsis */}
      <span
        className="mono"
        style={{
          fontSize: 10, color: "var(--paper)", opacity: 0.72, lineHeight: 1.45,
          letterSpacing: "0.01em", flex: 1, minWidth: 0,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}
      >
        {text}
      </span>
    </div>
  );
}

function TerminalFeed({ accent }) {
  const [displayed, setDisplayed] = React.useState([]);
  const feedRef = React.useRef(null);
  const idxRef = React.useRef(0);
  const timerRef = React.useRef(null);

  const MAX_ROWS = 18;

  // 2.4 – 5 s random gap — slow enough to read, alive enough to feel live
  function nextDelay() { return 2400 + Math.random() * 2600; }

  React.useEffect(() => {
    function tick() {
      const item = FEED_SOURCE[idxRef.current % FEED_SOURCE.length];
      idxRef.current++;
      setDisplayed((prev) => {
        const next = [...prev, { ...item, uid: idxRef.current }];
        return next.length > MAX_ROWS ? next.slice(next.length - MAX_ROWS) : next;
      });
      timerRef.current = setTimeout(tick, nextDelay());
    }
    timerRef.current = setTimeout(tick, 700);
    return () => clearTimeout(timerRef.current);
  }, []);

  React.useEffect(() => {
    const el = feedRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [displayed]);

  return (
    <div style={{ borderBottom: "1px solid var(--line-2)" }}>
      {/* header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 16px",
          borderBottom: "1px solid var(--line)",
          background: "rgba(0,0,0,0.22)",
        }}
      >
        <span
          className="pulse"
          style={{
            width: 6, height: 6, borderRadius: 999,
            background: "#c6ff3d", boxShadow: "0 0 8px #c6ff3d",
            display: "inline-block", flexShrink: 0,
          }}
        />
        <span
          className="mono"
          style={{ fontSize: 9.5, letterSpacing: "0.15em", textTransform: "uppercase", color: "#c6ff3d" }}
        >
          pitchfact.studio · live
        </span>
      </div>

      {/* rolling log */}
      <div
        ref={feedRef}
        style={{
          padding: "8px 14px",
          maxHeight: 152,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          scrollbarWidth: "none",
        }}
      >
        {displayed.map((item) => (
          <TerminalLine key={item.uid} type={item.type} text={item.text} time={item.time} accent={accent} />
        ))}
        <span
          style={{
            display: "inline-block", width: 6, height: 11,
            background: accent, animation: "termCursor 0.85s step-start infinite",
            marginLeft: 2, verticalAlign: "middle",
          }}
        />
      </div>
    </div>
  );
}

function ChatBot({ accent, faceStyle }) {
  const [messages, setMessages] = React.useState([
    { role: "assistant", text: PITCH_WELCOME },
  ]);
  const [draft, setDraft] = React.useState("");
  const [streaming, setStreaming] = React.useState(false);
  const [showSuggested, setShowSuggested] = React.useState(true);
  const scrollerRef = React.useRef(null);
  const inputRef = React.useRef(null);

  // auto-scroll to bottom
  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, streaming]);

  const send = async (text) => {
    const value = (text ?? draft).trim();
    if (!value || streaming) return;
    setShowSuggested(false);
    setDraft("");
    const nextHistory = [...messages, { role: "user", text: value }];
    setMessages(nextHistory);
    setStreaming(true);

    // Build messages array for claude.complete
    const apiMessages = [
      ...nextHistory.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.text,
      })),
    ];

    try {
      // window.claude.complete accepts a string or a {messages, system} payload
      const reply = await window.claude.complete({
        system: PITCH_SYSTEM,
        messages: apiMessages,
      });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: String(reply || "").trim() },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            "I'm unable to reach the desk right now. You're welcome to email partners@pitchfact.co and we'll respond within two business days.",
        },
      ]);
    } finally {
      setStreaming(false);
      // refocus input
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // Mascot talking when streaming
  const mascotTalking = streaming;

  return (
    <div
      style={{
        border: "1px solid var(--line-2)",
        borderRadius: 16,
        background:
          "linear-gradient(180deg, rgba(238,242,248,0.025) 0%, rgba(238,242,248,0.005) 100%)",
        overflow: "hidden",
        minHeight: 460,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
      }}
    >
      {/* header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "16px 20px",
          borderBottom: "1px solid var(--line-2)",
          background: "var(--ink-2)",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: "var(--ink)",
            border: "1px solid var(--line-2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <PixelFace
            size={32}
            variant="solid"
            accent={accent}
            blink={!mascotTalking}
            talking={mascotTalking}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "0.02em",
                color: "var(--paper)",
              }}
            >
              Pitch
            </span>
            <span
              className="serif-italic"
              style={{ fontSize: 13, color: "var(--mute)" }}
            >
              — the firm&rsquo;s concierge
            </span>
          </div>
          <div
            className="mono"
            style={{
              fontSize: 10.5,
              color: "var(--mute-2)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginTop: 2,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              className="pulse"
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: accent,
                display: "inline-block",
                boxShadow: `0 0 8px ${accent}`,
              }}
            />
            {streaming ? "Composing reply" : "Available now"}
          </div>
        </div>
      </div>

      {/* terminal feed */}
      <TerminalFeed accent={accent} />

      {/* messages */}
      <div
        ref={scrollerRef}
        style={{
          flex: 1,
          padding: "12px 16px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          overflowY: "auto",
          maxHeight: 220,
          minHeight: 120,
          scrollbarWidth: "none",
        }}
      >
        {messages.map((m, i) => (
          <ChatBubble key={i} m={m} accent={accent} />
        ))}
        {streaming && (
          <ChatBubble
            m={{ role: "assistant", text: "" }}
            accent={accent}
            thinking
          />
        )}
        {showSuggested && (
          <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px solid var(--line)" }}>
            <div
              className="mono"
              style={{ fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mute-2)", marginBottom: 6 }}
            >
              Try asking
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  style={{
                    textAlign: "left",
                    border: 0,
                    background: "transparent",
                    color: "var(--mute)",
                    padding: "4px 0",
                    fontFamily: "var(--font-display)",
                    fontSize: 13,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    transition: "color 0.12s ease",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--paper)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--mute)"; }}
                >
                  <span style={{ color: accent, fontFamily: "var(--font-mono)", fontSize: 10, flexShrink: 0 }}>→</span>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* composer */}
      <div
        style={{
          borderTop: "1px solid var(--line-2)",
          padding: "12px 14px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "var(--ink-2)",
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKey}
          placeholder="Ask Pitch about the practice…"
          disabled={streaming}
          style={{
            flex: 1,
            background: "transparent",
            border: 0,
            outline: "none",
            color: "var(--paper)",
            fontFamily: "var(--font-display)",
            fontSize: 14.5,
            padding: "8px 8px",
            minWidth: 0,
          }}
        />
        <button
          onClick={() => send()}
          disabled={streaming || !draft.trim()}
          aria-label="Send"
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: streaming || !draft.trim() ? "var(--ink-3)" : accent,
            color: streaming || !draft.trim() ? "var(--mute-2)" : "var(--ink)",
            border: 0,
            cursor: streaming || !draft.trim() ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.15s ease",
            flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 8h11M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* footer note */}
      <div
        className="mono"
        style={{
          padding: "7px 16px",
          fontSize: 9.5,
          letterSpacing: "0.07em",
          color: "var(--mute-2)",
          borderTop: "1px solid var(--line)",
          textAlign: "center",
        }}
      >
        partners@pitchfact.co
      </div>
    </div>
  );
}

function ChatBubble({ m, accent, thinking = false }) {
  const isAssistant = m.role === "assistant";
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        justifyContent: isAssistant ? "flex-start" : "flex-end",
        alignItems: "flex-end",
      }}
    >
      {isAssistant && (
        <div
          style={{
            width: 26,
            height: 26,
            flexShrink: 0,
            borderRadius: 6,
            background: "var(--ink)",
            border: "1px solid var(--line-2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PixelFace
            size={18}
            variant="solid"
            accent={accent}
            blink={!thinking}
            talking={thinking}
          />
        </div>
      )}
      <div
        style={{
          maxWidth: "84%",
          borderRadius: 12,
          padding: "10px 14px",
          fontFamily: "var(--font-display)",
          fontSize: 14,
          lineHeight: 1.5,
          textWrap: "pretty",
          background: isAssistant
            ? "rgba(238,242,248,0.04)"
            : accent,
          color: isAssistant ? "var(--paper)" : "var(--ink)",
          border: isAssistant ? "1px solid var(--line)" : "0",
          borderBottomLeftRadius: isAssistant ? 4 : 12,
          borderBottomRightRadius: isAssistant ? 12 : 4,
        }}
      >
        {thinking ? <TypingDots accent={accent} /> : m.text}
      </div>
    </div>
  );
}

// ── styles ────────────────────────────────────────────────────────────────
const chatCSS = `
@keyframes chatDot {
  0%, 100% { transform: translateY(0); opacity: 0.4; }
  40%      { transform: translateY(-3px); opacity: 1; }
}
@keyframes termCursor {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
@keyframes termFadeIn {
  from { opacity: 0; transform: translateY(3px); }
  to   { opacity: 1; transform: translateY(0); }
}
.term-line {
  animation: termFadeIn 0.28s ease forwards;
}
.term-heard        { }
.term-brainstormed { }
.term-updated      { }
.term-finalised    { }
.term-cooking      { }
input::placeholder { color: var(--mute-2); }
`;
(function injectChatCSS() {
  if (typeof document === "undefined") return;
  if (document.getElementById("__chat_css")) return;
  const s = document.createElement("style");
  s.id = "__chat_css";
  s.textContent = chatCSS;
  document.head.appendChild(s);
})();

Object.assign(window, { ChatBot, ChatBubble, TerminalFeed, TerminalLine });
