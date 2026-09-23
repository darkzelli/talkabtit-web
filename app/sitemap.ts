import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { loadIndex } from "@/lib/tv";

// Required to emit a static file under output: "export".
export const dynamic = "force-static";

// Emitted as a static /sitemap.xml at build time (works with output: "export").
// Trailing slashes match next.config's `trailingSlash: true` so the sitemap
// URLs are the canonical ones search engines will crawl.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = "2026-07-19";
  // Tool pages (/tools/, /tools/binge-calculator/, /tools/countdown/ and the
  // per-show pages under each) are generated from data/tv/, refreshed weekly
  // by the refresh-shows workflow, so their lastModified is the data date.
  const tv = loadIndex();
  const toolIndexes: MetadataRoute.Sitemap = [
    "/tools/",
    "/tools/binge-calculator/",
    "/tools/how-long-to-watch/",
    "/tools/countdown/",
  ].map((url) => ({
    url: `${SITE_URL}${url}`,
    lastModified: tv.fetchedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));
  const toolPages: MetadataRoute.Sitemap = tv.shows.flatMap((s) => [
    { url: `${SITE_URL}/tools/how-long-to-watch/${s.slug}/`, lastModified: tv.fetchedAt, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${SITE_URL}/tools/countdown/${s.slug}/`, lastModified: tv.fetchedAt, changeFrequency: "weekly" as const, priority: 0.5 },
  ]);
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
      url: `${SITE_URL}/how-to-install/`,
      lastModified: "2026-09-13",
      changeFrequency: "monthly",
      priority: 0.8,
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
    ...toolIndexes,
    ...toolPages,
  ];
}
