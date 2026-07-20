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
      url: `${SITE_URL}/faq/`,
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
