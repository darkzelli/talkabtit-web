import type { Metadata } from "next";

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
  "No one to watch with? TalkAbtIT adds a time-stamped comment section to Netflix, Hulu, Disney+, HBO Max, Paramount+, and Crunchyroll. Free for Chrome.";

// Chrome Web Store listing for the extension — the single source of truth for
// every "Get TalkAbtIT" button.
export const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/talkabtit/cemkclokkcdemkidbcfgkheaicpinjjh";

// Reddit Ads pixel id (Ads Manager → Events Manager → Reddit Pixel). Looks
// like "a2_xxxxxxxxxx". Leave empty and the pixel script is not rendered.
export const REDDIT_PIXEL_ID = "a2_jm2rqobnhx1m";

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

// Trim to `max` characters at a word boundary, with an ellipsis. Google cuts
// descriptions at roughly 155 characters and titles at roughly 60.
export function clip(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return (space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,;:.\-—]+$/, "") + "…";
}

// The answer, then the first follow-up sentence that still fits in 155
// characters, so templated descriptions end on a full sentence instead of "…".
export function withTail(answer: string, ...tails: string[]): string {
  const tail = tails.find((t) => answer.length + 1 + t.length <= 155);
  return tail ? `${answer} ${tail}` : answer;
}

// Full metadata for a sub-page. Next replaces (doesn't merge) the layout's
// openGraph and twitter objects, so a page that sets its own openGraph loses
// og:image/og:site_name and inherits the homepage's twitter:title. This fills
// all of them in. `absoluteTitle` skips the " — TalkAbtIT" template suffix,
// for pages where the title's room is better spent on the answer.
export function pageMeta({
  title,
  description,
  path,
  image,
  type = "website",
  absoluteTitle = false,
  social,
}: {
  title: string;
  description: string;
  path: string;
  // A second share image (a show poster) offered after the site card.
  image?: { url: string; alt: string } | null;
  type?: "website" | "article";
  absoluteTitle?: boolean;
  // A shorter title/description for share cards, when they differ.
  social?: { title?: string; description?: string };
}): Metadata {
  const desc = clip(description, 155);
  const shareTitle = social?.title ?? (absoluteTitle ? title : `${title} — ${SITE_NAME}`);
  const shareDesc = social?.description ?? desc;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: "en_US",
      title: shareTitle,
      description: shareDesc,
      url: path,
      images: image ? [OG_IMAGE, image] : [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: shareDesc,
      images: [OG_IMAGE.url],
    },
  };
}

// "October 2026" from an ISO date, for "as of" / "updated" markers.
export function monthYear(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}
