// Single source of truth for site-wide SEO facts. Used by layout metadata,
// sitemap, robots, manifest, and the JSON-LD structured data.
//
// If the production domain is ever not talkabtit.app, change SITE_URL here and
// every canonical URL, sitemap entry, robots sitemap ref, and OG/Twitter tag
// updates with it.
export const SITE_URL = "https://talkabtit.app";

export const SITE_NAME = "TalkAbtIT";

export const SITE_TAGLINE =
  "A comment section for streaming services";

export const SITE_DESCRIPTION =
  "No one to watch with? No problem. TalkAbtIT is a browser extension that adds a time-stamped comment section to Netflix, Hulu, Disney+, Max, Paramount+, and Crunchyroll.";

// Chrome Web Store listing for the extension — the single source of truth for
// every "Get TalkAbtIT" button.
export const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/talkabtit/cemkclokkcdemkidbcfgkheaicpinjjh";

// The streaming services the product layers onto — reused in copy and schema.
export const SUPPORTED_SERVICES = [
  "Netflix",
  "Hulu",
  "Disney+",
  "Max",
  "Paramount+",
  "Crunchyroll",
] as const;

// 1200x630 social-share card (Open Graph + Twitter). Committed as a static PNG
// so GitHub Pages serves it with the right image/png content-type. Regenerate
// it from scripts/og-image.tsx — see the instructions at the top of that file.
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "TalkAbtIT — a comment section for streaming services.",
} as const;
