"use client";

type Verdict = "LIKELY_LEGITIMATE" | "SUSPICIOUS" | "LIKELY_FRAUDULENT";

interface VerdictBadgeProps {
  verdict: Verdict;
  riskScore: number;
}

const VERDICT_CONFIG = {
  LIKELY_LEGITIMATE: {
    label: "Likely Legitimate",
    emoji: "✅",
    color: "var(--accent)",
    bg: "var(--accent-dim)",
    border: "var(--accent)",
  },
  SUSPICIOUS: {
    label: "Suspicious",
    emoji: "⚠️",
    color: "var(--warning)",
    bg: "var(--warning-dim)",
    border: "var(--warning)",
  },
  LIKELY_FRAUDULENT: {
    label: "Likely Fraudulent",
    emoji: "🚨",
    color: "var(--danger)",
    bg: "var(--danger-dim)",
    border: "var(--danger)",
  },
};

export default function VerdictBadge({ verdict, riskScore }: VerdictBadgeProps) {
  const config = VERDICT_CONFIG[verdict];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        padding: "32px",
        background: config.bg,
        border: `2px solid ${config.border}`,
        borderRadius: "16px",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: "48px" }}>{config.emoji}</span>

      <div>
        <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: config.color, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px" }}>
          Audit Verdict
        </p>
        <h2
          style={{
            fontFamily: "var(--display)",
            fontSize: "28px",
            fontWeight: 800,
            color: config.color,
          }}
        >
          {config.label}
        </h2>
      </div>

      {/* Risk score meter */}
      <div style={{ width: "100%", maxWidth: "280px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--mono)" }}>Risk Score</span>
          <span style={{ fontSize: "12px", color: config.color, fontFamily: "var(--mono)", fontWeight: 500 }}>
            {riskScore}/100
          </span>
        </div>
        <div style={{ height: "6px", background: "var(--border)", borderRadius: "3px", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${riskScore}%`,
              background: config.color,
              borderRadius: "3px",
              transition: "width 1s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
}
