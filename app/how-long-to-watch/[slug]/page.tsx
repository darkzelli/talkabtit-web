import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ToolCta, { ToolAttribution } from "@/components/ToolCta";
import { PosterGrid } from "@/components/PosterCard";
import FaqList, { faqPageJsonLd, type Faq } from "@/components/FaqList";
import { SITE_URL } from "@/lib/seo";
import {
  daysAtPace,
  endedOn,
  formatDate,
  formatDuration,
  formatHours,
  loadIndex,
  loadShow,
  relatedShows,
  yearSpan,
} from "@/lib/tv";
import "@/components/tools.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return loadIndex().shows.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const show = loadShow(slug);
  const title = `How Long to Watch ${show.name}? (${formatHours(show.totalMinutes)})`;
  const description = `It takes ${formatDuration(show.totalMinutes)} to watch all ${show.episodeCount} episodes of ${show.name} across ${show.seasonCount} season${show.seasonCount === 1 ? "" : "s"}. See the per-season breakdown and how many days it takes at your pace.`;
  return {
    title,
    description,
    alternates: { canonical: `/how-long-to-watch/${slug}/` },
    openGraph: { title, description, url: `/how-long-to-watch/${slug}/` },
  };
}

const PACES: { label: string; minutesPerDay: (avg: number) => number }[] = [
  { label: "One episode a day", minutesPerDay: (avg) => avg },
  { label: "1 hour a day", minutesPerDay: () => 60 },
  { label: "2 hours a day", minutesPerDay: () => 120 },
  { label: "3 hours a day", minutesPerDay: () => 180 },
  { label: "4 hours a day", minutesPerDay: () => 240 },
  { label: "8-hour marathon days", minutesPerDay: () => 480 },
];

export default async function HowLongToWatchPage({ params }: Props) {
  const { slug } = await params;
  const show = loadShow(slug);
  const { fetchedAt, shows } = loadIndex();
  const total = show.totalMinutes;
  const plural = show.seasonCount === 1 ? "season" : "seasons";
  const span = yearSpan(show);
  const twoHourDays = daysAtPace(total, 120);
  const skipIntroSaved = Math.round(show.episodeCount * 1.25);
  const related = relatedShows(show, shows);

  const FAQS: Faq[] = [
    {
      q: `How long does it take to watch all of ${show.name}?`,
      a: <>{formatDuration(total)} of screen time. That&apos;s {show.episodeCount} episodes at about {show.averageRuntime} minutes each. At two hours a night it takes {twoHourDays} days.</>,
      text: `${formatDuration(total)} of screen time. That's ${show.episodeCount} episodes at about ${show.averageRuntime} minutes each. At two hours a night it takes ${twoHourDays} days.`,
    },
    {
      q: `How many episodes of ${show.name} are there?`,
      a: <>{show.episodeCount} regular episodes across {show.seasonCount} {plural}{span ? ` (${span})` : ""}. Specials and recap episodes are not counted.</>,
      text: `${show.episodeCount} regular episodes across ${show.seasonCount} ${plural}${span ? ` (${span})` : ""}. Specials and recap episodes are not counted.`,
    },
    {
      q: `How long is an episode of ${show.name}?`,
      a: <>Episodes average {show.averageRuntime} minutes. The per-season table above shows where runtimes change.</>,
      text: `Episodes average ${show.averageRuntime} minutes. The per-season table above shows where runtimes change.`,
    },
    {
      q: `Is ${show.name} still running?`,
      a: show.status === "Ended"
        ? <>No. {show.name} ended{endedOn(show) ? ` on ${formatDate(endedOn(show))}` : ""} after {show.seasonCount} {plural}.</>
        : <>TVmaze lists {show.name} as &ldquo;{show.status}&rdquo;. {show.nextEpisode ? `The next episode is scheduled for ${formatDate(show.nextEpisode.airdate)}.` : "No next episode date is listed yet."} See the <a href={`/countdown/${show.slug}/`}>release countdown</a>.</>,
      text: show.status === "Ended"
        ? `No. ${show.name} ended${endedOn(show) ? ` on ${formatDate(endedOn(show))}` : ""} after ${show.seasonCount} ${plural}.`
        : `TVmaze lists ${show.name} as "${show.status}". ${show.nextEpisode ? `The next episode is scheduled for ${formatDate(show.nextEpisode.airdate)}.` : "No next episode date is listed yet."}`,
    },
  ];

  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <header className="page-hero">
          <div className="wrap tool-hero">
            <div className="tool-hero-copy">
            <span className="kicker">Binge time calculator</span>
            <h1 className="display">How long does it take to watch {show.name}?</h1>
            <p className="tool-big">
              {formatDuration(total)}
              <small>{show.episodeCount.toLocaleString("en-US")} episodes · {formatHours(total)}</small>
            </p>
            <p className="tool-sub">
              All {show.seasonCount} {plural} of {show.name}{span ? ` (${span})` : ""}, back to back. At two hours a night, you&apos;ll finish in <strong style={{ color: "var(--text)" }}>{twoHourDays} days</strong>.
            </p>
            <div className="tool-stats">
              <div className="tool-stat"><span className="tool-stat-num">{show.episodeCount.toLocaleString("en-US")}</span><span className="tool-stat-label">Episodes</span></div>
              <div className="tool-stat"><span className="tool-stat-num">{show.seasonCount}</span><span className="tool-stat-label">{plural}</span></div>
              <div className="tool-stat"><span className="tool-stat-num">{show.averageRuntime} min</span><span className="tool-stat-label">Avg episode</span></div>
              <div className="tool-stat"><span className="tool-stat-num">{show.network || "—"}</span><span className="tool-stat-label">Network</span></div>
            </div>
            <div className="tool-xlinks">
              <a href={`/countdown/${show.slug}/`}>When is the next episode of {show.name}?</a>
              <a href="/binge-calculator/">All shows</a>
            </div>
            </div>
            {show.poster && <img className="tool-poster" src={show.poster} alt={`${show.name} poster`} width={210} height={295} />}
          </div>
        </header>

        <section className="content">
          <div className="wrap">
            <div className="prose">
              <h2>How many days to binge {show.name}</h2>
              <p>
                Pick the pace that matches your life. Days are rounded up, so
                the last day is usually a short one.
              </p>
            </div>
            <div className="tool-scroll">
              <table className="tool-table">
                <thead>
                  <tr>
                    <th>Pace</th>
                    <th className="num">Days</th>
                    <th className="num">Weeks</th>
                  </tr>
                </thead>
                <tbody>
                  {PACES.map((p) => {
                    const d = daysAtPace(total, p.minutesPerDay(show.averageRuntime));
                    return (
                      <tr key={p.label}>
                        <td>{p.label}</td>
                        <td className="num">{d.toLocaleString("en-US")}</td>
                        <td className="num">{d < 7 ? "<1" : Math.round(d / 7).toLocaleString("en-US")}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td>Non-stop, no sleep</td>
                    <td className="num" colSpan={2}>{formatDuration(total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="prose" style={{ marginTop: 44 }}>
              <h2>{show.name} runtime by season</h2>
            </div>
            <div className="tool-scroll">
              <table className="tool-table">
                <thead>
                  <tr>
                    <th>Season</th>
                    <th className="num">Episodes</th>
                    <th className="num">Avg runtime</th>
                    <th className="num">Total</th>
                    <th>First aired</th>
                  </tr>
                </thead>
                <tbody>
                  {show.seasons.map((s) => (
                    <tr key={s.number}>
                      <td>Season {s.number}</td>
                      <td className="num">{s.episodes.length}</td>
                      <td className="num">{Math.round(s.minutes / s.episodes.length)} min</td>
                      <td className="num">{formatHours(s.minutes)}</td>
                      <td>{s.episodes[0]?.airdate ? formatDate(s.episodes[0].airdate) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="prose" style={{ marginTop: 44 }}>
              {show.summary && (
                <>
                  <h2>About {show.name}</h2>
                  <p>{show.summary}</p>
                </>
              )}
              <h2>How to get through {show.name} faster</h2>
              <ul>
                <li>
                  <strong>Skip the intro.</strong> Roughly a minute and a quarter per episode adds up to about {formatDuration(skipIntroSaved)} across the whole run.
                </li>
                <li>
                  <strong>Bump the speed.</strong> At 1.25× the total drops to {formatHours(total / 1.25)}; at 1.5× it&apos;s {formatHours(total / 1.5)}.
                </li>
                <li>
                  <strong>Watch with a comment section.</strong> A running conversation pinned to each moment makes long stretches feel shorter, and it&apos;s the reason TalkAbtIT exists.
                </li>
              </ul>
              <h2>{show.name} FAQ</h2>
            </div>
            <FaqList faqs={FAQS} />

            <div className="prose" style={{ marginTop: 44 }}>
              <h2>More binge times</h2>
            </div>
            <PosterGrid
              base="/how-long-to-watch/"
              items={related.map((s) => ({
                slug: s.slug,
                name: s.name,
                poster: s.poster,
                meta: `${s.episodeCount.toLocaleString("en-US")} episodes`,
                badge: formatHours(s.totalMinutes).replace(" hours", "h").replace(" hour", "h"),
              }))}
            />

            <ToolCta cta="binge-show" showName={show.name} network={show.network} />
            <ToolAttribution fetchedAt={fetchedAt} tvmazeUrl={show.tvmazeUrl} />
          </div>
        </section>
      </main>
      <Footer sub />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(FAQS, `${SITE_URL}/how-long-to-watch/${show.slug}/#faq`)) }}
      />
    </>
  );
}
