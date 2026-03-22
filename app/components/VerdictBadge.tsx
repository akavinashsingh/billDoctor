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
    border: "#00d4aa",
  },
  SUSPICIOUS: {
    label: "Suspicious",
    emoji: "⚠️",
    color: "var(--warning)",
    bg: "var(--warning-dim)",
    border: "#f59e0b",
  },
  LIKELY_FRAUDULENT: {
    label: "Likely Fraudulent",
    emoji: "🚨",
    color: "var(--danger)",
    bg: "var(--danger-dim)",
    border: "#ef4444",
  },
};

export default function VerdictBadge({ verdict, riskScore }: VerdictBadgeProps) {
  const config = VERDICT_CONFIG[verdict];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "24px 28px",
        background: config.bg,
        border: `1px solid ${config.border}33`,
        borderLeft: `4px solid ${config.border}`,
        borderRadius: "12px",
        flexWrap: "wrap",
      }}
    >
      <span style={{ fontSize: "42px", lineHeight: 1, flexShrink: 0 }}>{config.emoji}</span>

      <div style={{ flex: 1, minWidth: "160px" }}>
        <p
          style={{
            fontFamily: "var(--mono)",
            fontSize: "10px",
            color: config.color,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "4px",
            opacity: 0.8,
          }}
        >
          Audit Verdict
        </p>
        <h2
          style={{
            fontFamily: "var(--display)",
            fontSize: "clamp(22px, 4vw, 28px)",
            fontWeight: 800,
            color: config.color,
            lineHeight: 1.1,
          }}
        >
          {config.label}
        </h2>
      </div>

      {/* Risk score meter */}
      <div style={{ minWidth: "200px", flex: "0 0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
          <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--mono)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Risk Score
          </span>
          <span style={{ fontFamily: "var(--mono)", fontWeight: 600, color: config.color }}>
            {riskScore}
            <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 400 }}>/100</span>
          </span>
        </div>
        <div
          style={{
            height: "8px",
            background: "var(--border)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${riskScore}%`,
              background: `linear-gradient(90deg, ${config.border}88, ${config.border})`,
              borderRadius: "4px",
              transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
          <span style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--mono)" }}>LOW</span>
          <span style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--mono)" }}>HIGH</span>
        </div>
      </div>
    </div>
  );
}
