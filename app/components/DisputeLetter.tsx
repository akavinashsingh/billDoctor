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

  const handleDownload = () => {
    const blob = new Blob([letter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dispute-letter.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px", animation: "fadeUp 0.3s ease forwards" }}>
      {/* Next Steps */}
      <div>
        <h3
          style={{
            fontFamily: "var(--display)",
            fontSize: "18px",
            fontWeight: 700,
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>🗺</span> What to Do Next
        </h3>
        <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
          {nextSteps.map((step, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                gap: "14px",
                padding: "14px 16px",
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                fontSize: "14px",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "var(--accent-dim)",
                  border: "1px solid var(--accent)",
                  color: "var(--accent)",
                  fontFamily: "var(--mono)",
                  fontSize: "11px",
                  fontWeight: 600,
                  flexShrink: 0,
                  marginTop: "1px",
                }}
              >
                {i + 1}
              </span>
              <span style={{ color: "var(--text-dim)", lineHeight: 1.6 }}>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Dispute Letter */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <h3 style={{ fontFamily: "var(--display)", fontSize: "18px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
            <span>✉️</span> Dispute Letter
          </h3>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handleDownload}
              style={{
                padding: "8px 14px",
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                color: "var(--text-dim)",
                fontFamily: "var(--mono)",
                fontSize: "12px",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <span>⬇</span> Download
            </button>
            <button
              onClick={handleCopy}
              style={{
                padding: "8px 16px",
                background: copied ? "var(--accent)" : "var(--surface2)",
                border: `1px solid ${copied ? "var(--accent)" : "var(--border)"}`,
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
            lineHeight: 1.8,
            maxHeight: "420px",
            overflowY: "auto",
          }}
        >
          {letter}
        </div>

        <p style={{ marginTop: "12px", fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px" }}>
          <span>💡</span>
          <span>
            Fill in <strong style={{ color: "var(--warning)" }}>[PATIENT_NAME]</strong> and{" "}
            <strong style={{ color: "var(--warning)" }}>[DATE]</strong> before sending.
          </span>
        </p>
      </div>
    </div>
  );
}
