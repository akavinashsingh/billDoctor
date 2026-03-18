# BillDoctor

BillDoctor is a Next.js app that audits Indian hospital bills using an AI vision model, highlights suspicious charges, and drafts a dispute letter.

## What It Does

- Upload a hospital bill image (JPG, PNG, or WEBP)
- Analyze each billed line item in Indian healthcare context
- Flag common issues such as duplicate billing, upcoding, and inflated consumable prices
- Show a risk score and overall verdict
- Generate a ready-to-edit dispute letter with actionable next steps
- Keep processing in-memory without saving uploaded files in app storage

## Current Stack

- Next.js 15 (App Router)
- TypeScript
- OpenRouter Chat Completions API
- Model: nvidia/nemotron-nano-12b-v2-vl:free
- react-dropzone (upload UI)

## Prerequisites

- Node.js 18+
- npm
- OpenRouter API key

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create local env file:

```bash
cp .env.local.example .env.local
```

3. Add your key in .env.local:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

4. Start development server:

```bash
npm run dev
```

Open http://localhost:3000.

## Available Scripts

- npm run dev: start local development server
- npm run build: create production build
- npm run start: run production server

## Request Flow

1. User selects one image file in the browser.
2. Client converts the file to base64.
3. Client sends payload to POST /api/analyze.
4. Server calls OpenRouter with image + structured audit prompt.
5. Server returns normalized JSON used by the UI tabs:
    - Overview
    - Line Items
    - Dispute Letter

## API Contract

Endpoint: POST /api/analyze

Request body:

```json
{
   "fileBase64": "...",
   "mimeType": "image/jpeg",
   "fileName": "bill.jpg"
}
```

Response shape:

```json
{
   "hospitalName": "string",
   "patientName": "string",
   "billDate": "string",
   "totalCharged": 0,
   "verdict": "LIKELY_LEGITIMATE | SUSPICIOUS | LIKELY_FRAUDULENT",
   "verdictSummary": "string",
   "riskScore": 0,
   "lineItems": [
      {
         "code": "string",
         "description": "string",
         "chargedAmount": 0,
         "expectedRange": "string",
         "status": "ok | warning | critical",
         "reason": "string"
      }
   ],
   "redFlags": ["string"],
   "disputeLetter": "string",
   "nextSteps": ["string"]
}
```

## Current Limitations

- PDF files are not currently accepted by the upload component.
- Output quality depends on image clarity and model response consistency.
- This tool is informational and not legal advice.

## Project Structure

- app/page.tsx: main UI and result tabs
- app/api/analyze/route.ts: AI analysis endpoint
- app/components/: upload, verdict, line-item table, dispute letter UI
- app/lib/types.ts: shared request and response types

## Roadmap Ideas

- Add PDF parsing support
- Add multilingual dispute letter templates
- Add export/share options for report and letter
- Add historical report storage (opt-in)
