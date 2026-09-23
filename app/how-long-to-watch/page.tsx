import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ShowFinder from "@/components/ShowFinder";
import { PosterGrid, type PosterItem } from "@/components/PosterCard";
import ToolCta, { ToolAttribution } from "@/components/ToolCta";
import { formatHours, loadIndex, yearSpan, type ShowSummary } from "@/lib/tv";
import "@/components/tools.css";

export const metadata: Metadata = {
  title: "How Long to Watch — binge times for every show",
  description:
    "Total watch time for hundreds of TV shows: how many hours, how many days at your pace, and a season-by-season breakdown.",
  alternates: { canonical: "/how-long-to-watch/" },
  openGraph: {
    title: "How Long to Watch",
    description: "Total watch time for hundreds of TV shows.",
    url: "/how-long-to-watch/",
  },
};

export default function HowLongToWatchIndexPage() {
  const { fetchedAt, shows } = loadIndex();
  const items: PosterItem[] = [...shows]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((s: ShowSummary) => ({
      slug: s.slug,
      name: s.name,
      poster: s.poster,
      meta: `${s.episodeCount.toLocaleString("en-US")} episodes${yearSpan(s) ? ` · ${yearSpan(s)}` : ""}`,
      badge: formatHours(s.totalMinutes).replace(" hours", "h").replace(" hour", "h"),
    }));
  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <header className="page-hero">
          <div className="wrap">
            <span className="kicker">Binge time calculator</span>
            <h1 className="display">
              How long to <span className="accent">watch</span>
            </h1>
            <p className="lede">
              Every show in the list, A to Z, with its total runtime. Pick one
              for the per-season table and how many nights it takes at your pace.
            </p>
          </div>
        </header>
        <ShowFinder items={items} base="/how-long-to-watch/" placeholder="Search a show, e.g. Breaking Bad">
              <div className="tool-sec">
                <div>
                  <h2>All shows</h2>
                  <p>{items.length} shows. Show not listed? Work out how long it takes with the <a href="/binge-calculator/">binge calculator</a>.</p>
                </div>
              </div>
              <PosterGrid items={items} base="/how-long-to-watch/" />
              <ToolCta cta="how-long-index" />
              <ToolAttribution fetchedAt={fetchedAt} />
        </ShowFinder>
      </main>
      <Footer sub />
    </>
  );
}
