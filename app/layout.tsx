import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Only weight 700 (`.display` headings) is ever used, so the variable font is
// instanced to 700 and subset to Latin + punctuation — 284KB TTF -> 15KB WOFF2.
const handjet = localFont({
  src: "./fonts/Handjet-700.woff2",
  weight: "700",
  display: "swap",
  variable: "--font-handjet",
});

export const metadata: Metadata = {
  title: "TalkAbtIT — Add a comment section to any streaming service",
  description:
    "No one to watch with? No problem. TalkAbtIT adds a live comment section to Netflix, Hulu, Disney+, Max, Prime Video, and Crunchyroll.",
  icons: { icon: { url: "/mark.svg", type: "image/svg+xml" } },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={handjet.variable}>
      <body>{children}</body>
    </html>
  );
}
