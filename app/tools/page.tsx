import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { PosterGrid, type PosterItem } from "@/components/PosterCard";
import ToolCta, { ToolAttribution } from "@/components/ToolCta";
import { SITE_URL } from "@/lib/seo";
import { formatHours, loadIndex, loadTrending, yearSpan, type ShowSummary } from "@/lib/tv";
import "@/components/tools.css";

export const metadata: Metadata = {
  title: "Free TV Tools — binge calculator, watch times, release countdowns",
  description:
    "Free tools for TV fans: work out how long it takes to binge any show, look up total watch times for hundreds of series, and count down to the next episode or season.",
  alternates: { canonical: "/tools/" },
  openGraph: {
    title: "Free TV Tools",
    description: "Binge time calculator, watch times for hundreds of shows, and release countdowns.",
    url: "/tools/",
  },
};

// The hub every tool hangs off. Each card is a plain link so the tool pages
// get crawled from here as well as from the nav and footer.
const TOOLS = [
  {
    href: "/tools/binge-calculator/",
    name: "Binge time calculator",
    blurb: "How long does it take to watch the whole thing? Search a show or plug in your own episode count and runtime.",
  },
  {
    href: "/tools/how-long-to-watch/",
    name: "How long to watch",
    blurb: "Total watch time for every show in the list, A to Z, with a per-season breakdown and days at your pace.",
  },
  {
    href: "/tools/countdown/",
    name: "Release countdowns",
    blurb: "Live countdowns to the next episode and next season, plus which shows are still waiting on a date.",
  },
];

export default function ToolsPage() {
  const { fetchedAt, shows } = loadIndex();
  const trending = loadTrending();
  const thisWeek = (trending?.shows || [])
    .map((t) => shows.find((s) => s.slug === t.slug))
    .filter((s): s is ShowSummary => Boolean(s));
  const toItem = (s: ShowSummary, i: number): PosterItem => ({
    slug: s.slug,
    name: s.name,
    poster: s.poster,
    meta: `#${i + 1} · ${s.episodeCount.toLocaleString("en-US")} episodes${yearSpan(s) ? ` · ${yearSpan(s)}` : ""}`,
    badge: formatHours(s.totalMinutes).replace(" hours", "h").replace(" hour", "h"),
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/tools/`,
    name: "Free TV Tools",
    url: `${SITE_URL}/tools/`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    hasPart: TOOLS.map((t) => ({ "@type": "WebPage", name: t.name, url: `${SITE_URL}${t.href}` })),
  };

  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <header className="page-hero">
          <div className="wrap">
            <span className="kicker">Free tools</span>
            <h1 className="display">
              Tools for <span className="accent">TV people</span>
            </h1>
            <p className="lede">
              Binge math, total watch times, and release countdowns for
              hundreds of shows. Free, no sign-up, refreshed every week.
            </p>
          </div>
        </header>

        <section className="content">
          <div className="wrap">
            <div className="tool-hub">
              {TOOLS.map((t) => (
                <a key={t.href} className="tool-hub-card" href={t.href}>
                  <h2>{t.name}</h2>
                  <p>{t.blurb}</p>
                  <span>Open →</span>
                </a>
              ))}
            </div>

            {thisWeek.length > 0 && (
              <>
                <div className="tool-sec">
                  <div>
                    <h2>Most watched this week</h2>
                    <p>What everyone is streaming right now, by JustWatch&apos;s US popularity chart. Tap one for how long it takes to catch up.</p>
                  </div>
                  <a href="/tools/binge-calculator/">Binge calculator →</a>
                </div>
                <PosterGrid items={thisWeek.map(toItem)} base="/tools/how-long-to-watch/" />
              </>
            )}

            <ToolCta cta="tools-hub" />
            <ToolAttribution fetchedAt={fetchedAt} trendingAt={thisWeek.length > 0 ? trending?.fetchedAt : undefined} />
          </div>
        </section>
      </main>
      <Footer sub />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
