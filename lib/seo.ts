// Single source of truth for site-wide SEO facts. Used by layout metadata,
// sitemap, robots, manifest, and the JSON-LD structured data.
//
// If the production domain is ever not talkabtit.app, change SITE_URL here and
// every canonical URL, sitemap entry, robots sitemap ref, and OG/Twitter tag
// updates with it.
export const SITE_URL = "https://talkabtit.app";

export const SITE_NAME = "TalkAbtIT";

export const SITE_TAGLINE =
  "Add a comment section to any streaming service";

export const SITE_DESCRIPTION =
  "No one to watch with? No problem. TalkAbtIT adds a live, time-stamped comment section to Netflix, Hulu, Disney+, Max, Prime Video, and Crunchyroll.";

// The streaming services the product layers onto — reused in copy and schema.
export const SUPPORTED_SERVICES = [
  "Netflix",
  "Hulu",
  "Disney+",
  "Max",
  "Prime Video",
  "Crunchyroll",
] as const;

// 1200x630 social-share image (generated from the in-app screenshot).
export const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "TalkAbtIT — a live, time-stamped comment section on top of your streaming service.",
} as const;
