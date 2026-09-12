import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Required to emit a static file under output: "export".
export const dynamic = "force-static";

// Emitted as a static /sitemap.xml at build time (works with output: "export").
// Trailing slashes match next.config's `trailingSlash: true` so the sitemap
// URLs are the canonical ones search engines will crawl.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = "2026-07-19";
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/demo/`,
      lastModified: "2026-09-11",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/premium/`,
      lastModified: "2026-09-02",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/netflix/`,
      lastModified: "2026-09-03",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/hulu/`,
      lastModified: "2026-09-03",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/disney-plus/`,
      lastModified: "2026-09-03",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/hbo-max/`,
      lastModified: "2026-09-03",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/crunchyroll/`,
      lastModified: "2026-09-03",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/paramount-plus/`,
      lastModified: "2026-09-09",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/teleparty-alternative/`,
      lastModified: "2026-09-03",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/support/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
