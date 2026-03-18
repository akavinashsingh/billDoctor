# 🩺 BillDoctor — Hospital Bill Auditor for India

An AI-powered tool that analyzes Indian hospital bills, flags suspicious charges, and generates dispute letters — using Google Gemini's free API.

## Features

- 📄 Upload hospital bills as PDF, JPG, or PNG
- 🔍 AI extracts and audits every line item
- 🏷 Checks CPT/ICD-10 codes for validity
- 💰 Compares charges against CGHS rates & NPPA caps
- 🚨 Flags duplicate billing, upcoding, phantom charges
- ✉️ Auto-generates a dispute letter (Consumer Protection Act 2019)
- 🔒 Files are never stored — analyzed in-memory only

## Tech Stack

- **Next.js 15** (App Router, TypeScript)
- **Google Gemini 2.0 Flash** (free tier: 1500 req/day)
- **react-dropzone** for file upload
- **framer-motion** for animations

## Setup

### 1. Clone & install

```bash
cd billdoctor
npm install
```

### 2. Get a free Gemini API key

1. Go to https://aistudio.google.com/app/apikey
2. Sign in with Google
3. Click **Create API Key**
4. Copy the key

### 3. Set up environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
GEMINI_API_KEY=your_actual_key_here
```

### 4. Run

```bash
npm run dev
```

Open http://localhost:3000

## How It Works

1. User uploads a hospital bill (PDF or image)
2. File is converted to base64 in the browser
3. Sent to `/api/analyze` (Next.js server route)
4. Gemini 2.0 Flash reads the document natively and returns structured JSON:
   - Verdict: Legitimate / Suspicious / Fraudulent
   - Risk score (0–100)
   - Per-line-item audit with expected price ranges
   - Red flags list
   - Ready-to-send dispute letter
5. Results displayed with tabs: Overview, Line Items, Dispute Letter

## Extending for Hackathon

- [ ] Add WhatsApp sharing for dispute letter
- [ ] Add Hindi/Telugu/Tamil language support
- [ ] Add database of CGHS rates for offline comparison
- [ ] Add insurance claim checker
- [ ] Add consumer court filing guide per state
- [ ] Connect to Ayushman Bharat rate cards

## Free Tier Limits (Gemini)

| Model | RPM | Daily Requests |
|-------|-----|----------------|
| gemini-2.0-flash | 15 | 1,500 |
| gemini-1.5-flash | 15 | 1,500 |

More than enough for a hackathon demo!
