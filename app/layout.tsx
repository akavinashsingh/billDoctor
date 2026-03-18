import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BillDoctor — Hospital Bill Auditor for India",
  description:
    "Upload your hospital bill and instantly find out if you're being overcharged. Powered by AI, built for Indian patients.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
