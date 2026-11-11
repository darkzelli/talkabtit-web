import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ToolCta, { ToolAttribution } from "@/components/ToolCta";
import { PosterGrid } from "@/components/PosterCard";
import FaqList, { faqPageJsonLd, type Faq } from "@/components/FaqList";
import { SITE_NAME, SITE_URL, monthYear, pageMeta, withTail } from "@/lib/seo";
import {
  daysAtPace,
  endedOn,
  formatDate,
  formatDuration,
  formatHours,
  hasAired,
  loadIndex,
  loadShow,
  relatedShows,
  seasonLabel,
  yearSpan,
  type Show,
} from "@/lib/tv";
import "@/components/tools.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return loadIndex().shows.filter(hasAired).map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

// Titles lead with the wording people search ("how long is X") and name
// what the page has, but leave the numbers for the page: titles that
// carried the hours got almost no clicks.
function seoTitle(show: Show): string {
  const q = `How Long Is ${show.name}?`;
  const options = [
    `${q} Total Runtime & Episode Length`,
    `${q} Runtime & Episode Length`,
    `${q} Total Runtime`,
    q,
  ];
  return options.find((t) => t.length <= 60) ?? options[options.length - 1];
}

function seoDescription(show: Show, fetchedAt: string): string {
  const hours = formatHours(show.totalMinutes);
  const eps = `${show.episodeCount.toLocaleString("en-US")} episode${show.episodeCount === 1 ? "" : "s"}`;
  const tails = ["See days to finish at your pace and runtime by season.", "Days to finish at your pace, by season.", "Runtime by season."];
  if (show.status === "Ended") {
    const seasons = `${show.seasonCount} season${show.seasonCount === 1 ? "" : "s"}`;
    return withTail(`${show.name} is ${hours} long: ${eps} over ${seasons}, about ${show.averageRuntime} min each.`, ...tails);
  }
  const through = show.lastAired ? ` through ${seasonLabel(show.lastAired.season)}` : "";
  return withTail(`${show.name} is ${hours} long so far: ${eps}${through}, about ${show.averageRuntime} min each (updated ${monthYear(fetchedAt)}).`, ...tails);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const show = loadShow(slug);
  return pageMeta({
    title: seoTitle(show),
    description: seoDescription(show, loadIndex().fetchedAt),
    path: `/tools/how-long-to-watch/${slug}/`,
    absoluteTitle: true,
    image: show.poster ? { url: show.poster, alt: `${show.name} poster` } : null,
  });
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
  const related = relatedShows(show, shows.filter(hasAired));
  const ended = show.status === "Ended";
  const url = `${SITE_URL}/tools/how-long-to-watch/${show.slug}/`;

  const FAQS: Faq[] = [
    {
      q: `How long does it take to watch all of ${show.name}?`,
      a: <>{formatHours(total)} ({formatDuration(total)}) of screen time. That&apos;s {show.episodeCount} episodes at about {show.averageRuntime} minutes each. At two hours a night it takes {twoHourDays} days.</>,
      text: `${formatHours(total)} (${formatDuration(total)}) of screen time. That's ${show.episodeCount} episodes at about ${show.averageRuntime} minutes each. At two hours a night it takes ${twoHourDays} days.`,
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
        : <>TVmaze lists {show.name} as &ldquo;{show.status}&rdquo;. {show.nextEpisode ? `The next episode is scheduled for ${formatDate(show.nextEpisode.airdate)}.` : "No next episode date is listed yet."} See the <a href={`/tools/countdown/${show.slug}/`}>release countdown</a>.</>,
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
            <h1 className="display">How long is {show.name}?</h1>
            <p className="tool-big">
              {formatDuration(total)}
              <small>{show.episodeCount.toLocaleString("en-US")} episodes · {formatHours(total)}</small>
            </p>
            <p className="tool-sub">
              {show.name} episodes are about {show.averageRuntime} minutes long. All {show.episodeCount.toLocaleString("en-US")} episodes{ended ? "" : " so far"} add up to {formatHours(total)}{span ? ` (${span})` : ""}. At two hours a night, you&apos;ll finish in <strong style={{ color: "var(--text)" }}>{twoHourDays} days</strong>.
            </p>
            <div className="tool-stats">
              <div className="tool-stat"><span className="tool-stat-num">{show.episodeCount.toLocaleString("en-US")}</span><span className="tool-stat-label">Episodes</span></div>
              <div className="tool-stat"><span className="tool-stat-num">{show.seasonCount}</span><span className="tool-stat-label">{plural}</span></div>
              <div className="tool-stat"><span className="tool-stat-num">{show.averageRuntime} min</span><span className="tool-stat-label">Avg episode</span></div>
              <div className="tool-stat"><span className="tool-stat-num">{show.network || "—"}</span><span className="tool-stat-label">Network</span></div>
            </div>
            <div className="tool-xlinks">
              <a href={`/tools/countdown/${show.slug}/`}>When is the next episode of {show.name}?</a>
              <a href="/tools/binge-calculator/">All shows</a>
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
              base="/tools/how-long-to-watch/"
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "TVSeries",
                "@id": `${url}#series`,
                name: show.name,
                url,
                ...(show.poster ? { image: `${SITE_URL}${show.poster}` } : {}),
                ...(show.premiered ? { startDate: show.premiered } : {}),
                ...(ended && endedOn(show) ? { endDate: endedOn(show) } : {}),
                numberOfSeasons: show.seasonCount,
                numberOfEpisodes: show.episodeCount,
                ...(show.genres.length ? { genre: show.genres } : {}),
                sameAs: show.tvmazeUrl,
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
                  { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools/` },
                  { "@type": "ListItem", position: 3, name: "How long to watch", item: `${SITE_URL}/tools/how-long-to-watch/` },
                  { "@type": "ListItem", position: 4, name: show.name, item: url },
                ],
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(FAQS, `${url}#faq`)) }}
      />
    </>
  );
}
