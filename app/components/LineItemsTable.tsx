"use client";

import { BillLineItem } from "@/app/lib/types";

interface LineItemsTableProps {
  items: BillLineItem[];
}

const STATUS_STYLE = {
  ok: { color: "var(--accent)", bg: "var(--accent-dim)", label: "OK", border: "#00d4aa" },
  warning: { color: "var(--warning)", bg: "var(--warning-dim)", label: "⚠ Review", border: "#f59e0b" },
  critical: { color: "var(--danger)", bg: "var(--danger-dim)", label: "🚨 Flagged", border: "#ef4444" },
};

export default function LineItemsTable({ items }: LineItemsTableProps) {
  const flagged = items.filter((i) => i.status !== "ok");
  const ok = items.filter((i) => i.status === "ok");

  return (
    <div style={{ animation: "fadeUp 0.3s ease forwards" }}>
      {/* Summary bar */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "120px",
            padding: "14px 16px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-muted)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Total Items
          </p>
          <p style={{ fontFamily: "var(--display)", fontSize: "20px", fontWeight: 700, color: "var(--text)" }}>
            {items.length}
          </p>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: "120px",
            padding: "14px 16px",
            background: "var(--accent-dim)",
            border: "1px solid #00d4aa33",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--accent)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.06em", opacity: 0.8 }}>
            Looks OK
          </p>
          <p style={{ fontFamily: "var(--display)", fontSize: "20px", fontWeight: 700, color: "var(--accent)" }}>
            {ok.length}
          </p>
        </div>
        {flagged.length > 0 && (
          <div
            style={{
              flex: 1,
              minWidth: "120px",
              padding: "14px 16px",
              background: "var(--danger-dim)",
              border: "1px solid #ef444433",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--danger)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.06em", opacity: 0.8 }}>
              Flagged
            </p>
            <p style={{ fontFamily: "var(--display)", fontSize: "20px", fontWeight: 700, color: "var(--danger)" }}>
              {flagged.length}
            </p>
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {items.map((item, i) => {
          const style = STATUS_STYLE[item.status];
          return (
            <div
              key={i}
              style={{
                background: "var(--surface2)",
                border: `1px solid ${item.status !== "ok" ? style.border + "44" : "var(--border)"}`,
                borderLeft: item.status !== "ok" ? `3px solid ${style.border}` : "3px solid transparent",
                borderRadius: "10px",
                padding: "16px",
                transition: "border-color 0.2s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                    {item.code !== "N/A" && (
                      <span
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: "11px",
                          padding: "2px 8px",
                          background: "var(--surface)",
                          border: "1px solid var(--border)",
                          borderRadius: "4px",
                          color: "var(--text-dim)",
                        }}
                      >
                        {item.code}
                      </span>
                    )}
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: "11px",
                        padding: "2px 9px",
                        background: style.bg,
                        borderRadius: "4px",
                        color: style.color,
                        fontWeight: 500,
                      }}
                    >
                      {style.label}
                    </span>
                  </div>
                  <p style={{ fontWeight: 500, fontSize: "15px", color: "var(--text)", marginBottom: "3px" }}>
                    {item.description}
                  </p>
                  {item.reason && (
                    <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.5 }}>{item.reason}</p>
                  )}
                </div>

                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "17px",
                      fontWeight: 600,
                      color: item.status === "critical" ? "var(--danger)" : "var(--text)",
                    }}
                  >
                    ₹{item.chargedAmount.toLocaleString("en-IN")}
                  </p>
                  {item.expectedRange && (
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "3px" }}>
                      Expected: <span style={{ color: "var(--accent)" }}>{item.expectedRange}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
