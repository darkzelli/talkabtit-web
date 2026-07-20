import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Required to emit a static file under output: "export".
export const dynamic = "force-static";

// Emitted as a static /robots.txt at build time (works with output: "export").
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
