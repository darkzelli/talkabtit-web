import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site has no server data, API routes, or dynamic rendering, so export it
  // as a fully static bundle (HTML/CSS/JS in `out/`) that any static host can serve.
  output: "export",
  // Emit each route as `route/index.html` so extensionless URLs (e.g. /faq/)
  // resolve on ANY static host — plain nginx/Apache/GitHub Pages included, not
  // just those that rewrite /faq -> faq.html.
  trailingSlash: true,
};

export default nextConfig;
