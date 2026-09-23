import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ShowFinder from "@/components/ShowFinder";
import { PosterGrid, type PosterItem } from "@/components/PosterCard";
import ToolCta, { ToolAttribution } from "@/components/ToolCta";
import { formatDate, isUpcoming, loadIndex, seasonShort, type ShowSummary } from "@/lib/tv";
import "@/components/tools.css";

export const metadata: Metadata = {
  title: "TV Release Countdowns — next episode and new season dates",
  description:
    "Live countdowns to the next episode and next season of your shows: premiere dates, what's airing this week, and which shows have no return date yet.",
  alternates: { canonical: "/tools/countdown/" },
  openGraph: {
    title: "TV Release Countdowns",
    description: "Live countdowns to the next episode and next season of your shows.",
    url: "/tools/countdown/",
  },
};

// "3 days" / "Sep 30" for the poster badge — relative inside two weeks, a
// short date after. Computed at build; the weekly refresh keeps it honest.
function whenBadge(s: ShowSummary, today: Date): string {
  const t = new Date(s.nextEpisode!.airstamp).getTime();
  const days = Math.ceil((t - today.getTime()) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days <= 14) return `${days} days`;
  const [y, m, d] = s.nextEpisode!.airdate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

export default function CountdownIndexPage() {
  const { fetchedAt, shows } = loadIndex();
  const today = new Date();
  const upcoming = shows
    .filter((s) => isUpcoming(s, today))
    .sort((a, b) => (a.nextEpisode!.airstamp < b.nextEpisode!.airstamp ? -1 : 1));
  const waiting = shows.filter((s) => !isUpcoming(s, today) && s.status !== "Ended");
  const ended = shows.filter((s) => s.status === "Ended");

  const toItem = (s: ShowSummary): PosterItem => ({
    slug: s.slug,
    name: s.name,
    poster: s.poster,
    meta: isUpcoming(s, today)
      ? `${seasonShort(s.nextEpisode!.season)} E${s.nextEpisode!.number}${s.nextEpisode!.number === 1 ? " premiere" : ""} · ${formatDate(s.nextEpisode!.airdate)}`
      : s.status === "Ended"
        ? `Ended${s.lastAired ? ` ${s.lastAired.airdate.slice(0, 4)}` : ""}`
        : "No date yet",
    badge: isUpcoming(s, today) ? whenBadge(s, today) : null,
  });
  const all = shows.map(toItem);

  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <header className="page-hero">
          <div className="wrap">
            <span className="kicker">Free tool</span>
            <h1 className="display">
              Release <span className="accent">countdowns</span>
            </h1>
            <p className="lede">
              When does the next episode drop? Live countdowns for every show
              in the list, and which ones are still waiting on a date.
            </p>
          </div>
        </header>

        <ShowFinder items={all} base="/tools/countdown/" placeholder="Search a show, e.g. Stranger Things">
              <div className="tool-sec">
                <div>
                  <h2>Coming up</h2>
                  <p>Confirmed next episodes, soonest first.</p>
                </div>
              </div>
              {upcoming.length ? (
                <PosterGrid items={upcoming.map(toItem)} base="/tools/countdown/" />
              ) : (
                <p className="finder-count">No scheduled episodes in the list right now.</p>
              )}

              {waiting.length > 0 && (
                <>
                  <div className="tool-sec">
                    <div>
                      <h2>Waiting on a date</h2>
                      <p>Not ended, nothing scheduled. Each page becomes a live countdown the moment a date is listed.</p>
                    </div>
                  </div>
                  <ul className="row-list row-list-compact row-list-cols">
                    {waiting.map((s) => (
                      <li key={s.slug}>
                        <a href={`/tools/countdown/${s.slug}/`}>
                          {s.poster ? <img className="row-thumb" src={s.poster} alt="" loading="lazy" decoding="async" /> : <span className="row-thumb-empty" />}
                          <span className="row-name">
                            {s.name}
                            <small>{s.lastAired ? `Last: ${seasonShort(s.lastAired.season)} E${s.lastAired.number}, ${formatDate(s.lastAired.airdate)}` : s.status}</small>
                          </span>
                          <span className="row-val"><span>{s.status}</span></span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="tool-sec">
                <div>
                  <h2>Finished shows</h2>
                  <p>No new episodes scheduled. Still worth a rewatch.</p>
                </div>
                <a href="/tools/binge-calculator/">How long to binge them →</a>
              </div>
              <PosterGrid items={ended.map(toItem)} base="/tools/countdown/" />

              <ToolCta cta="countdown-index" />
              <ToolAttribution fetchedAt={fetchedAt} />
        </ShowFinder>
      </main>
      <Footer sub />
    </>
  );
}
