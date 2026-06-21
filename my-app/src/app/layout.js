import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "zodify-json — Instant Zod Schema Generator",
  description:
    "Paste raw JSON and instantly generate type-safe Zod schema validation code with inferred TypeScript types. Zero-cost, client-side developer utility.",
  keywords: ["zod", "json", "schema", "typescript", "generator", "developer tool"],
  openGraph: {
    title: "zodify-json — Instant Zod Schema Generator",
    description:
      "Paste raw JSON and instantly generate type-safe Zod schema validation code.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
