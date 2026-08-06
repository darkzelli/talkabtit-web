import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  SUPPORTED_SERVICES,
  OG_IMAGE,
} from "@/lib/seo";

// Only weight 700 (`.display` headings) is ever used, so the variable font is
// instanced to 700 and subset to Latin + punctuation — 284KB TTF -> 15KB WOFF2.
const handjet = localFont({
  src: "./fonts/Handjet-700.woff2",
  weight: "700",
  display: "swap",
  variable: "--font-handjet",
});

export const metadata: Metadata = {
  // Absolute base for every canonical/OG/Twitter URL derived below.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    // Sub-pages set `title: "FAQ"` and render as "FAQ — TalkAbtIT".
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "TalkAbtIT",
    "comment section for streaming",
    "browser extension for streaming",
    "Chrome extension",
    "watch together",
    "time-stamped comments",
    "watch party",
    ...SUPPORTED_SERVICES.map((s) => `${s} comments`),
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "entertainment",
  alternates: { canonical: "/" },
  icons: {
    icon: { url: "/mark.svg", type: "image/svg+xml" },
    apple: "/mark.svg",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

// Site-wide structured data. Organization + WebSite describe the brand; the
// SoftwareApplication node makes the product eligible for app-style rich
// results (name, category, price, platform) — here a browser extension.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
      email: "support@talkabtit.app",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#app`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      applicationCategory: "BrowserApplication",
      operatingSystem: "Chrome",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      // Core experience is free; the optional paid tiers are documented on-page.
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={handjet.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
