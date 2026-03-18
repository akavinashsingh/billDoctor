"use client";

import { BillLineItem } from "@/app/lib/types";

interface LineItemsTableProps {
  items: BillLineItem[];
}

const STATUS_STYLE = {
  ok: { color: "var(--accent)", bg: "var(--accent-dim)", label: "OK" },
  warning: { color: "var(--warning)", bg: "var(--warning-dim)", label: "⚠ Review" },
  critical: { color: "var(--danger)", bg: "var(--danger-dim)", label: "🚨 Flagged" },
};

export default function LineItemsTable({ items }: LineItemsTableProps) {
  return (
    <div>
      <h3
        style={{
          fontFamily: "var(--display)",
          fontSize: "18px",
          fontWeight: 700,
          marginBottom: "16px",
          color: "var(--text)",
        }}
      >
        Bill Line Items
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {items.map((item, i) => {
          const style = STATUS_STYLE[item.status];
          return (
            <div
              key={i}
              style={{
                background: "var(--surface2)",
                border: `1px solid ${item.status !== "ok" ? style.color + "44" : "var(--border)"}`,
                borderRadius: "12px",
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
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
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
                        padding: "2px 8px",
                        background: style.bg,
                        borderRadius: "4px",
                        color: style.color,
                        fontWeight: 500,
                      }}
                    >
                      {style.label}
                    </span>
                  </div>
                  <p style={{ fontWeight: 500, fontSize: "15px", color: "var(--text)" }}>{item.description}</p>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>{item.reason}</p>
                </div>

                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "16px",
                      fontWeight: 500,
                      color: item.status === "critical" ? "var(--danger)" : "var(--text)",
                    }}
                  >
                    ₹{item.chargedAmount.toLocaleString("en-IN")}
                  </p>
                  {item.expectedRange && (
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                      Expected: {item.expectedRange}
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
