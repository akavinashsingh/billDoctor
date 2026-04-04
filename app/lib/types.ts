export type Severity = "ok" | "warning" | "critical";

export interface BillLineItem {
  code: string;           // CPT / ICD-10 / procedure code
  description: string;    // What the hospital says it is
  chargedAmount: number;  // In INR..
  expectedRange?: string; // e.g. "₹800 – ₹1,500"
  status: Severity;
  reason: string;         // Why it's flagged or cleared
}

export interface AnalysisResult {
  hospitalName: string;
  patientName: string;
  billDate: string;
  totalCharged: number;
  verdict: "LIKELY_LEGITIMATE" | "SUSPICIOUS" | "LIKELY_FRAUDULENT";
  verdictSummary: string;
  riskScore: number;       // 0–100
  lineItems: BillLineItem[];
  redFlags: string[];
  disputeLetter: string;   // Pre-drafted letter if needed
  nextSteps: string[];
}

export interface AnalyzeRequest {
  fileBase64: string;
  mimeType: string;
  fileName: string;
}
