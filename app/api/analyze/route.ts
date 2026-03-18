import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AnalysisResult } from "@/app/lib/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You are BillDoctor, an expert medical billing auditor specializing in Indian hospitals. 
Your job is to analyze hospital bills for Indian patients and detect:
1. Inflated charges (compared to CGHS rates, NPPA MRP, or standard private hospital rates in India)
2. Duplicate billing (same procedure billed multiple times)
3. Upcoding (billing for a more expensive procedure than what was done)
4. Phantom charges (billing for services/items not actually provided)
5. Unnecessary procedures (procedures not medically justified for the diagnosis)
6. Consumables overcharging (gloves, syringes, IV sets billed at 5-10x MRP)
7. Incorrect CPT/ICD-10 codes (codes that don't match described procedures)

Indian context to apply:
- CGHS (Central Government Health Scheme) rates are standard benchmarks
- NPPA regulates medical device prices (stents capped at ₹27,890, knee implants capped)
- Many states have clinical establishment acts capping rates
- Common scams: charging for branded drugs when generics used, multiple surgeon fees for one procedure, ICU charges for non-ICU patients

Respond ONLY with a valid JSON object matching this exact schema (no markdown, no explanation):
{
  "hospitalName": "string",
  "patientName": "string", 
  "billDate": "string",
  "totalCharged": number,
  "verdict": "LIKELY_LEGITIMATE" | "SUSPICIOUS" | "LIKELY_FRAUDULENT",
  "verdictSummary": "string (2-3 sentences explaining the overall verdict)",
  "riskScore": number (0-100, where 0=perfectly clean, 100=definitely fraudulent),
  "lineItems": [
    {
      "code": "string (CPT/ICD/procedure code or 'N/A')",
      "description": "string",
      "chargedAmount": number,
      "expectedRange": "string (e.g. '₹500 – ₹1,200' based on CGHS/market rates)",
      "status": "ok" | "warning" | "critical",
      "reason": "string (clear explanation for the patient)"
    }
  ],
  "redFlags": ["string array of specific issues found"],
  "disputeLetter": "string (a formal dispute letter in English addressed to hospital's billing department, ready to send. Include specific code violations, consumer protection rights under Consumer Protection Act 2019, and demand for itemized justification. Leave [PATIENT_NAME] and [DATE] as placeholders.)",
  "nextSteps": ["string array of 3-5 actionable steps the patient should take"]
}`;

export async function POST(req: NextRequest) {
  try {
    const { fileBase64, mimeType, fileName } = await req.json();

    if (!fileBase64 || !mimeType) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: mimeType,
          data: fileBase64,
        },
      },
      {
        text: `${SYSTEM_PROMPT}\n\nAnalyze the hospital bill in this document/image. File name: ${fileName}`,
      },
    ]);

    const responseText = result.response.text();

    // Strip any accidental markdown fences
    const cleaned = responseText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const analysis: AnalysisResult = JSON.parse(cleaned);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);
    const message =
      error instanceof Error ? error.message : "Analysis failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
