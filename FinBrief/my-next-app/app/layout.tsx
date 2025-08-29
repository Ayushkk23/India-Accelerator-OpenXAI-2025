import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinBrief - AI Stock News Summarizer",
  description: "AI-powered tool that analyzes financial news and provides actionable insights with key points, market impact, and risk factors.",
  keywords: ["stock news", "financial analysis", "AI summarizer", "market insights", "investment tools"],
  authors: [{ name: "FinBrief Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "FinBrief - AI Stock News Summarizer",
    description: "Transform lengthy financial articles into actionable insights with AI-powered analysis.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinBrief - AI Stock News Summarizer",
    description: "Transform lengthy financial articles into actionable insights with AI-powered analysis.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
