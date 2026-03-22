"use client";

import { useState } from "react";
import UploadZone from "./components/UploadZone";
import VerdictBadge from "./components/VerdictBadge";
import LineItemsTable from "./components/LineItemsTable";
import DisputeLetter from "./components/DisputeLetter";
import { AnalysisResult } from "./lib/types";

type Tab = "overview" | "lineitems" | "dispute";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setResult(null);
    setError(null);
    setIsLoading(true);
    setActiveTab("overview");

    try {
      // Convert file to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          // Strip the data URL prefix to get raw base64
          resolve(dataUrl.split(",")[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(selectedFile);
      });

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileBase64: base64,
          mimeType: selectedFile.type,
          fileName: selectedFile.name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setIsLoading(false);
  };

  const flaggedCount = result?.lineItems.filter(i => i.status !== "ok").length ?? 0;

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "0 24px",
          background: "rgba(240, 244, 248, 0.90)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "60px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "22px" }}>🩺</span>
            <span
              style={{
                fontFamily: "var(--display)",
                fontWeight: 800,
                fontSize: "18px",
                color: "var(--text)",
              }}
            >
              Bill<span style={{ color: "var(--accent)" }}>Doctor</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {result && !isLoading && (
              <button
                onClick={handleReset}
                style={{
                  padding: "6px 14px",
                  background: "var(--accent-dim)",
                  border: "1px solid var(--accent)",
                  borderRadius: "8px",
                  color: "var(--accent)",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontFamily: "var(--mono)",
                  transition: "all 0.15s",
                }}
              >
                + New Bill
              </button>
            )}
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: "11px",
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
              }}
            >
              INDIA HOSPITAL BILL AUDITOR
            </span>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {/* Hero */}
        {!result && !isLoading && (
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                background: "var(--accent-dim)",
                border: "1px solid var(--accent)",
                borderRadius: "100px",
                fontFamily: "var(--mono)",
                fontSize: "11px",
                color: "var(--accent)",
                marginBottom: "20px",
                letterSpacing: "0.08em",
              }}
            >
              ✦ FREE · PRIVATE · AI-POWERED
            </div>

            <h1
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(32px, 6vw, 52px)",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: "16px",
                color: "var(--text)",
              }}
            >
              Is your hospital bill
              <br />
              <span style={{ color: "var(--accent)" }}>overcharging you?</span>
            </h1>

            <p
              style={{
                fontSize: "16px",
                color: "var(--text-muted)",
                maxWidth: "480px",
                margin: "0 auto 28px",
                lineHeight: 1.7,
              }}
            >
              Upload your hospital bill — our AI audits every charge against
              CGHS rates, NPPA caps, and standard Indian billing norms. Get a
              dispute letter in seconds.
            </p>

            <div
              style={{
                display: "flex",
                gap: "8px",
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: "36px",
              }}
            >
              {[
                "⚡ Instant Analysis",
                "🔒 Never Stored",
                "📋 CGHS Rate Check",
                "⚖️ Legal Templates",
              ].map((f) => (
                <span
                  key={f}
                  style={{
                    padding: "5px 13px",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "100px",
                    fontSize: "12px",
                    color: "var(--text-dim)",
                    fontFamily: "var(--mono)",
                  }}
                >
                  {f}
                </span>
              ))}
            </div>

            <UploadZone onFileSelect={handleFileSelect} isLoading={isLoading} />
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div
            style={{
              textAlign: "center",
              padding: "64px 40px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
            }}
          >
            <style>{`
              @keyframes spin { to { transform: rotate(360deg); } }
              @keyframes ripple {
                0% { transform: scale(1); opacity: 0.4; }
                100% { transform: scale(1.8); opacity: 0; }
              }
            `}</style>
            <div style={{ position: "relative", width: "56px", height: "56px", margin: "0 auto 28px" }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  border: "2px solid var(--accent)",
                  borderRadius: "50%",
                  animation: "ripple 1.4s ease-out infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  border: "3px solid var(--border)",
                  borderTopColor: "var(--accent)",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
            </div>
            <h3
              style={{
                fontFamily: "var(--display)",
                fontSize: "20px",
                fontWeight: 700,
                marginBottom: "6px",
              }}
            >
              Auditing your bill...
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "6px" }}>
              AI is cross-checking every charge against CGHS rates
            </p>
            <p
              style={{
                fontFamily: "var(--mono)",
                fontSize: "12px",
                color: "var(--text-muted)",
                marginBottom: "32px",
              }}
            >
              📄 {file?.name}
            </p>
            <div
              style={{
                display: "inline-flex",
                flexDirection: "column",
                gap: "10px",
                textAlign: "left",
              }}
            >
              {[
                "Reading bill structure",
                "Verifying CPT / procedure codes",
                "Cross-checking CGHS rate tables",
                "Scanning for overcharges",
                "Drafting dispute letter",
              ].map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "var(--accent)",
                      flexShrink: 0,
                      animation: "pulse 1.8s ease infinite",
                      animationDelay: `${i * 0.35}s`,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "13px",
                      color: "var(--text-muted)",
                      fontFamily: "var(--mono)",
                    }}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div
            style={{
              padding: "24px",
              background: "var(--danger-dim)",
              border: "1px solid var(--danger)",
              borderRadius: "12px",
              marginBottom: "24px",
            }}
          >
            <p style={{ color: "var(--danger)", fontWeight: 500 }}>⚠ Analysis failed</p>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "4px" }}>
              {error}
            </p>
            <button
              onClick={handleReset}
              style={{
                marginTop: "12px",
                padding: "8px 16px",
                background: "transparent",
                border: "1px solid var(--danger)",
                borderRadius: "8px",
                color: "var(--danger)",
                cursor: "pointer",
                fontSize: "13px",
                fontFamily: "var(--mono)",
              }}
            >
              Try again
            </button>
          </div>
        )}

        {/* Results */}
        {result && !isLoading && (
          <div style={{ animation: "fadeUp 0.4s ease forwards" }}>
            {/* Bill summary bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 18px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                marginBottom: "24px",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "var(--text-muted)" }}>
                  🏥 <strong style={{ color: "var(--text)" }}>{result.hospitalName}</strong>
                </span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "var(--text-muted)" }}>
                  👤 {result.patientName}
                </span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "var(--text-muted)" }}>
                  📅 {result.billDate}
                </span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "13px" }}>
                  Total: <strong style={{ color: "var(--warning)" }}>₹{result.totalCharged.toLocaleString("en-IN")}</strong>
                </span>
              </div>
              <button
                onClick={handleReset}
                style={{
                  padding: "6px 14px",
                  background: "transparent",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontFamily: "var(--mono)",
                }}
              >
                ← New bill
              </button>
            </div>

            {/* Verdict */}
            <VerdictBadge verdict={result.verdict} riskScore={result.riskScore} />

            {/* Summary text */}
            <div
              style={{
                margin: "20px 0",
                padding: "16px 20px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                fontSize: "15px",
                color: "var(--text-dim)",
                lineHeight: 1.7,
              }}
            >
              {result.verdictSummary}
            </div>

            {/* Red flags */}
            {result.redFlags.length > 0 && (
              <div
                style={{
                  margin: "20px 0",
                  padding: "16px 20px",
                  background: "var(--danger-dim)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: "12px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--display)",
                    fontWeight: 700,
                    fontSize: "14px",
                    color: "var(--danger)",
                    marginBottom: "10px",
                  }}
                >
                  🚩 Red Flags ({result.redFlags.length})
                </p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                  {result.redFlags.map((flag, i) => (
                    <li key={i} style={{ fontSize: "14px", color: "var(--text-dim)", display: "flex", gap: "8px" }}>
                      <span style={{ color: "var(--danger)", flexShrink: 0 }}>•</span>
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tabs */}
            <div
              style={{
                display: "flex",
                gap: "4px",
                padding: "4px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                margin: "28px 0 20px",
              }}
            >
              {(
                [
                  { id: "overview" as Tab, label: "Overview", icon: "📊" },
                  {
                    id: "lineitems" as Tab,
                    label: `Line Items ${flaggedCount > 0 ? `(${flaggedCount} flagged)` : ""}`,
                    icon: "📋",
                  },
                  { id: "dispute" as Tab, label: "Dispute Letter", icon: "✉️" },
                ] as { id: Tab; label: string; icon: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    background: activeTab === tab.id ? "var(--accent-dim)" : "transparent",
                    border: `1px solid ${activeTab === tab.id ? "var(--accent)" : "transparent"}`,
                    borderRadius: "8px",
                    color: activeTab === tab.id ? "var(--accent)" : "var(--text-muted)",
                    cursor: "pointer",
                    fontFamily: "var(--mono)",
                    fontSize: "12px",
                    fontWeight: 500,
                    transition: "all 0.15s",
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === "overview" && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "12px",
                  animation: "fadeUp 0.3s ease forwards",
                }}
              >
                {[
                  {
                    icon: "🏦",
                    label: "Total Billed",
                    value: `₹${result.totalCharged.toLocaleString("en-IN")}`,
                    color: "var(--text)",
                    sub: "Charged amount",
                  },
                  {
                    icon: "📋",
                    label: "Line Items",
                    value: result.lineItems.length,
                    color: "var(--text)",
                    sub: "Charges reviewed",
                  },
                  {
                    icon: "🚩",
                    label: "Flagged Items",
                    value: flaggedCount,
                    color: flaggedCount > 0 ? "var(--danger)" : "var(--accent)",
                    sub: flaggedCount > 0 ? "Need attention" : "All clear",
                  },
                  {
                    icon: "🎯",
                    label: "Risk Score",
                    value: `${result.riskScore}/100`,
                    color:
                      result.riskScore > 60
                        ? "var(--danger)"
                        : result.riskScore > 30
                        ? "var(--warning)"
                        : "var(--accent)",
                    sub: result.riskScore > 60 ? "High risk" : result.riskScore > 30 ? "Medium risk" : "Low risk",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "20px",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "12px",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span style={{ fontSize: "24px", marginBottom: "2px" }}>{stat.icon}</span>
                    <p style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--mono)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {stat.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--display)",
                        fontSize: "22px",
                        fontWeight: 700,
                        color: stat.color,
                        lineHeight: 1.1,
                      }}
                    >
                      {stat.value}
                    </p>
                    <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>{stat.sub}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "lineitems" && (
              <LineItemsTable items={result.lineItems} />
            )}

            {activeTab === "dispute" && (
              <DisputeLetter
                letter={result.disputeLetter}
                nextSteps={result.nextSteps}
              />
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "28px 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "13px",
            color: "var(--text-muted)",
            fontFamily: "var(--mono)",
            marginBottom: "10px",
          }}
        >
          ⚕ BillDoctor is an AI tool for informational purposes only.
        </p>
        <p style={{ fontSize: "12px", color: "var(--text-muted)", opacity: 0.6 }}>
          Always consult a qualified medical billing expert or consumer advocate for legal disputes.
        </p>
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {["🔒 Private by Design", "🇮🇳 India-Focused", "⚡ Powered by AI"].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                fontFamily: "var(--mono)",
                opacity: 0.5,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </footer>
    </main>
  );
}
