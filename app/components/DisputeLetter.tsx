"use client";

import { useState } from "react";

interface DisputeLetterProps {
  letter: string;
  nextSteps: string[];
}

export default function DisputeLetter({ letter, nextSteps }: DisputeLetterProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Next Steps */}
      <div>
        <h3
          style={{
            fontFamily: "var(--display)",
            fontSize: "18px",
            fontWeight: 700,
            marginBottom: "16px",
          }}
        >
          What to Do Next
        </h3>
        <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
          {nextSteps.map((step, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                gap: "12px",
                padding: "14px 16px",
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                fontSize: "14px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontWeight: 600,
                  color: "var(--accent)",
                  flexShrink: 0,
                  minWidth: "20px",
                }}
              >
                {i + 1}.
              </span>
              <span style={{ color: "var(--text-dim)" }}>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Dispute Letter */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ fontFamily: "var(--display)", fontSize: "18px", fontWeight: 700 }}>
            Dispute Letter
          </h3>
          <button
            onClick={handleCopy}
            style={{
              padding: "8px 16px",
              background: copied ? "var(--accent)" : "var(--surface2)",
              border: "1px solid",
              borderColor: copied ? "var(--accent)" : "var(--border)",
              borderRadius: "8px",
              color: copied ? "var(--bg)" : "var(--text-dim)",
              fontFamily: "var(--mono)",
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {copied ? "✓ Copied!" : "Copy Letter"}
          </button>
        </div>

        <div
          style={{
            padding: "20px",
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            fontFamily: "var(--mono)",
            fontSize: "13px",
            color: "var(--text-dim)",
            whiteSpace: "pre-wrap",
            lineHeight: 1.7,
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          {letter}
        </div>

        <p style={{ marginTop: "10px", fontSize: "12px", color: "var(--text-muted)" }}>
          💡 Fill in <strong style={{ color: "var(--warning)" }}>[PATIENT_NAME]</strong> and <strong style={{ color: "var(--warning)" }}>[DATE]</strong> before sending.
        </p>
      </div>
    </div>
  );
}
