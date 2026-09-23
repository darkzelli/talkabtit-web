import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Countdown from "@/components/Countdown";
import ToolCta, { ToolAttribution } from "@/components/ToolCta";
import { PosterGrid } from "@/components/PosterCard";
import FaqList, { faqPageJsonLd, type Faq } from "@/components/FaqList";
import { SITE_URL } from "@/lib/seo";
import { endedOn, formatDate, formatHours, isUpcoming, loadIndex, loadShow, relatedShows, seasonLabel, seasonShort } from "@/lib/tv";
import "@/components/tools.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return loadIndex().shows.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

function nextLabel(show: ReturnType<typeof loadShow>) {
  const n = show.nextEpisode!;
  return n.number === 1 ? `${show.name} ${seasonLabel(n.season)}` : `${show.name} ${seasonLabel(n.season)}, Episode ${n.number}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const show = loadShow(slug);
  const up = isUpcoming(show);
  const title = up
    ? `${nextLabel(show)} Countdown — ${formatDate(show.nextEpisode!.airdate)}`
    : show.status === "Ended"
      ? `Is ${show.name} Coming Back? Release Countdown`
      : `${show.name} Next Season Release Date Countdown`;
  const description = up
    ? `${nextLabel(show)} ${show.nextEpisode!.number === 1 ? "premieres" : "airs"} on ${formatDate(show.nextEpisode!.airdate)}. Live countdown to the release, plus the last episode that aired.`
    : show.status === "Ended"
      ? `${show.name} ended${endedOn(show) ? ` on ${formatDate(endedOn(show))}` : ""} after ${show.seasonCount} season${show.seasonCount === 1 ? "" : "s"}. What's known about a return, and where things stand.`
      : `No release date has been announced for the next episode of ${show.name}. This page turns into a live countdown the moment a date is listed.`;
  return {
    title,
    description,
    alternates: { canonical: `/tools/countdown/${slug}/` },
    openGraph: { title, description, url: `/tools/countdown/${slug}/` },
  };
}

export default async function CountdownPage({ params }: Props) {
  const { slug } = await params;
  const show = loadShow(slug);
  const { fetchedAt, shows } = loadIndex();
  const up = isUpcoming(show);
  const next = show.nextEpisode;
  const last = show.lastAired;
  const plural = show.seasonCount === 1 ? "season" : "seasons";
  const related = relatedShows(show, shows);
  const ended = show.status === "Ended";

  const FAQS: Faq[] = [
    {
      q: up ? `When does ${nextLabel(show)} come out?` : `When is the next episode of ${show.name}?`,
      a: up
        ? <>{formatDate(next!.airdate)}. {next!.name ? `The episode is titled "${next!.name}".` : ""}</>
        : ended
          ? <>{show.name} has ended, so no new episodes are scheduled. The finale{last ? `, "${last.name}",` : ""} aired{endedOn(show) ? ` on ${formatDate(endedOn(show))}` : ""}.</>
          : <>No date has been listed yet. TVmaze currently marks the show as &ldquo;{show.status}&rdquo;. This page updates automatically once a date is announced.</>,
      text: up
        ? `${formatDate(next!.airdate)}. ${next!.name ? `The episode is titled "${next!.name}".` : ""}`.trim()
        : ended
          ? `${show.name} has ended, so no new episodes are scheduled. The finale${last ? `, "${last.name}",` : ""} aired${endedOn(show) ? ` on ${formatDate(endedOn(show))}` : ""}.`
          : `No date has been listed yet. TVmaze currently marks the show as "${show.status}". This page updates automatically once a date is announced.`,
    },
    show.network
      ? {
          q: `What network is ${show.name} on?`,
          a: <>{show.name} {ended ? "aired" : "airs"} on {show.network}. Episodes run about {show.averageRuntime} minutes each.</>,
          text: `${show.name} ${ended ? "aired" : "airs"} on ${show.network}. Episodes run about ${show.averageRuntime} minutes each.`,
        }
      : {
          q: `How long is an episode of ${show.name}?`,
          a: <>Episodes of {show.name} average {show.averageRuntime} minutes.</>,
          text: `Episodes of ${show.name} average ${show.averageRuntime} minutes.`,
        },
    {
      q: `How many seasons of ${show.name} are there?`,
      a: <>{show.seasonCount} {plural} and {show.episodeCount} episodes so far, about {formatHours(show.totalMinutes)} in total. See <a href={`/tools/how-long-to-watch/${show.slug}/`}>how long it takes to watch {show.name}</a>.</>,
      text: `${show.seasonCount} ${plural} and ${show.episodeCount} episodes so far, about ${formatHours(show.totalMinutes)} in total.`,
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
            <span className="kicker">Release countdown</span>
            <h1 className="display">
              {up ? `${nextLabel(show)} countdown` : ended ? `Is ${show.name} coming back?` : `When does ${show.name} return?`}
            </h1>
            {up ? (
              <>
                <Countdown airstamp={next!.airstamp} label={nextLabel(show)} />
                <p className="cd-when">
                  <strong>{next!.name ? `"${next!.name}"` : `${seasonLabel(next!.season)}, Episode ${next!.number}`}</strong>
                  {" "}{next!.number === 1 ? "premieres" : "airs"} on <strong>{formatDate(next!.airdate)}</strong>
                  {show.network ? ` on ${show.network}` : ""}. Times are converted to your local time zone.
                </p>
              </>
            ) : ended ? (
              <p className="lede">
                {show.name} ended{endedOn(show) ? ` on ${formatDate(endedOn(show))}` : ""} after {show.seasonCount} {plural} and {show.episodeCount} episodes. Nothing new is scheduled. If a revival is announced and dated, a live countdown appears here.
              </p>
            ) : (
              <p className="lede">
                No release date has been announced yet for the next episode of {show.name}. TVmaze lists the show as &ldquo;{show.status}&rdquo;. This page turns into a live countdown as soon as a date is listed.
              </p>
            )}
            <div className="tool-stats">
              <div className="tool-stat"><span className="tool-stat-num">{show.status}</span><span className="tool-stat-label">Status</span></div>
              <div className="tool-stat"><span className="tool-stat-num">{last ? `${seasonShort(last.season)} E${last.number}` : "—"}</span><span className="tool-stat-label">Last aired</span></div>
              <div className="tool-stat"><span className="tool-stat-num">{last ? formatDate(last.airdate) : "—"}</span><span className="tool-stat-label">On</span></div>
              <div className="tool-stat"><span className="tool-stat-num">{show.network || "—"}</span><span className="tool-stat-label">Network</span></div>
            </div>
            <div className="tool-xlinks">
              <a href={`/tools/how-long-to-watch/${show.slug}/`}>How long does it take to watch {show.name}?</a>
              <a href="/tools/countdown/">All countdowns</a>
            </div>
            </div>
            {show.poster && <img className="tool-poster" src={show.poster} alt={`${show.name} poster`} width={210} height={295} />}
          </div>
        </header>

        <section className="content">
          <div className="wrap">
            <div className="prose">
              {up ? (
                <>
                  <h2>When is the next episode of {show.name}?</h2>
                  <p>
                    The next episode of {show.name} is {seasonLabel(next!.season)}, Episode {next!.number}
                    {next!.name ? `, "${next!.name}"` : ""}, {next!.number === 1 ? "premiering" : "airing"} on {formatDate(next!.airdate)}
                    {show.network ? ` on ${show.network}` : ""}. The countdown at the top of this page is live and in your local time.
                    {next!.number === 1 && show.seasonCount > 0 ? ` If you're not caught up, the ${show.seasonCount} completed ${plural} so far add up to about ${formatHours(show.totalMinutes)}.` : ""}
                  </p>
                  <h2>What was the last episode of {show.name}?</h2>
                  <p>
                    {last
                      ? `The most recent episode to air was ${seasonLabel(last.season)}, Episode ${last.number}, "${last.name}", on ${formatDate(last.airdate)}.`
                      : "No aired episodes are listed yet."}
                  </p>
                </>
              ) : ended ? (
                <>
                  <h2>Is {show.name} coming back for another season?</h2>
                  <p>
                    Not as of the latest listings. {show.name} is marked as ended after {show.seasonCount} {plural}{show.premiered ? `, running from ${formatDate(show.premiered)}` : ""}{endedOn(show) ? ` to ${formatDate(endedOn(show))}` : ""}. No revival or new season is scheduled. If one is announced and dated, this page turns into a live countdown automatically.
                  </p>
                  <h2>When was the final episode of {show.name}?</h2>
                  <p>
                    {last
                      ? `The series finale aired on ${formatDate(last.airdate)}. It was ${seasonLabel(last.season)}, Episode ${last.number}, "${last.name}". The full run is ${show.episodeCount} episodes, roughly ${formatHours(show.totalMinutes)}.`
                      : `The full run is ${show.episodeCount} episodes, roughly ${formatHours(show.totalMinutes)}.`}
                  </p>
                </>
              ) : (
                <>
                  <h2>
                    {show.seasonCount < 1900 && last && last.season < 1900
                      ? `When does ${show.name} Season ${last.season + 1} come out?`
                      : `When is ${show.name} coming back?`}
                  </h2>
                  <p>
                    No release date has been announced yet. TVmaze lists {show.name} as &ldquo;{show.status}&rdquo;
                    {show.status === "Running" ? ", which means it hasn't been cancelled, but the next episode hasn't been scheduled" : ""}.
                    This page checks for a date every week and becomes a live countdown the moment one is listed.
                  </p>
                  <h2>What is the most recent episode of {show.name}?</h2>
                  <p>
                    {last
                      ? `The most recent episode was ${seasonLabel(last.season)}, Episode ${last.number}, "${last.name}", on ${formatDate(last.airdate)}. Catching up on everything so far is ${show.episodeCount} episodes, about ${formatHours(show.totalMinutes)}.`
                      : "No aired episodes are listed yet."}
                  </p>
                </>
              )}
              {show.summary && (
                <>
                  <h2>About {show.name}</h2>
                  <p>{show.summary}</p>
                </>
              )}
              <h2>{show.name} release FAQ</h2>
            </div>
            <FaqList faqs={FAQS} />

            <div className="prose" style={{ marginTop: 44 }}>
              <h2>More countdowns</h2>
            </div>
            <PosterGrid
              base="/tools/countdown/"
              items={related.map((s) => ({
                slug: s.slug,
                name: s.name,
                poster: s.poster,
                meta: isUpcoming(s) ? formatDate(s.nextEpisode!.airdate) : s.status === "Ended" ? "Ended" : "No date yet",
                badge: isUpcoming(s) ? "Upcoming" : null,
              }))}
            />

            <ToolCta cta="countdown" showName={show.name} network={show.network} />
            <ToolAttribution fetchedAt={fetchedAt} tvmazeUrl={show.tvmazeUrl} />
          </div>
        </section>
      </main>
      <Footer sub />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(FAQS, `${SITE_URL}/tools/countdown/${show.slug}/#faq`)) }}
      />
    </>
  );
}
