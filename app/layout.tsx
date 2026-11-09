import type { Metadata, Viewport } from "next";
import { Unbounded, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Unbounded({ subsets: ["latin"], variable: "--font-display", weight: ["500", "700"] });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "feisssz7.mn",
  description: "feisssz7.mn — links",
  metadataBase: new URL("https://feisssz7.mn"),
  openGraph: { title: "feisssz7.mn", description: "feisssz7.mn — links", url: "https://feisssz7.mn" },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
