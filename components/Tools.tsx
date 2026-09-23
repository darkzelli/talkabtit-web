import { formatHours, isUpcoming, loadIndex, loadTrending, seasonShort, type ShowSummary } from "@/lib/tv";

// Homepage teaser for the free tool pages (/tools/). Two cards, each built
// around a real show from this week's JustWatch chart: the #1 show asks the
// watch-time question, the trending show with the soonest new episode asks
// the countdown question. Both link straight to that show's tool page, and a
// line under them sends anyone else to the search. Data is read at build,
// same as the tool pages, and the weekly refresh keeps it current.
function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// "September 25" — the year is on the countdown page itself
function monthDay(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", { month: "long", day: "numeric", timeZone: "UTC" });
}

function Poster({ show }: { show: ShowSummary }) {
  return (
    <span className="tools-poster">
      {show.poster ? (
        <img src={show.poster} alt={`${show.name} poster`} width={210} height={295} loading="lazy" decoding="async" />
      ) : (
        <span className="tools-poster-fallback" aria-hidden="true">{show.name.slice(0, 1)}</span>
      )}
    </span>
  );
}

export default function Tools() {
  const { shows } = loadIndex();
  const today = new Date();
  const trending = (loadTrending()?.shows || [])
    .map((t) => shows.find((s) => s.slug === t.slug))
    .filter((s): s is ShowSummary => Boolean(s));

  // #1 this week (falling back to the longest show in the index)
  const top = trending[0] ?? [...shows].sort((a, b) => b.totalMinutes - a.totalMinutes)[0];
  // soonest upcoming episode among the rest of the chart, then the whole index
  const soonest = (pool: ShowSummary[]) =>
    pool
      .filter((s) => s.slug !== top.slug && isUpcoming(s, today))
      .sort((a, b) => (a.nextEpisode!.airstamp < b.nextEpisode!.airstamp ? -1 : 1))[0];
  const next = soonest(trending) ?? soonest(shows);

  return (
    <section id="tools" className="tools band band-gold">
      <div className="wrap">
        <div className="tools-head">
          <div>
            <span className="kicker">Free tools</span>
            <h2 className="display">Tools for binge watchers</h2>
            <p className="lede">
              Binge math and release countdowns for hundreds of shows. No
              extension needed, no sign-up, refreshed every week.
            </p>
          </div>
          <a className="tools-all" href="/tools/">
            All tools <Arrow />
          </a>
        </div>

        <div className="tools-grid">
          <a className="tools-card" href={`/tools/how-long-to-watch/${top.slug}/`}>
            <Poster show={top} />
            <span className="tools-copy">
              <span className="tools-card-stat">{trending[0] ? "#1 most watched this week" : "Binge time calculator"}</span>
              <h3>How long does it take to watch {top.name}?</h3>
              <span className="tools-answer">
                {formatHours(top.totalMinutes)}
                <small>
                  {top.episodeCount.toLocaleString("en-US")} episodes · {top.seasonCount} season{top.seasonCount === 1 ? "" : "s"}
                </small>
              </span>
              <span className="tools-card-go">
                See the breakdown <Arrow />
              </span>
            </span>
          </a>

          {next && (
            <a className="tools-card" href={`/tools/countdown/${next.slug}/`}>
              <Poster show={next} />
              <span className="tools-copy">
                <span className="tools-card-stat">Release countdown</span>
                <h3>When is the next episode of {next.name}?</h3>
                <span className="tools-answer">
                  {monthDay(next.nextEpisode!.airdate)}
                  <small>
                    {seasonShort(next.nextEpisode!.season)} E{next.nextEpisode!.number}
                    {next.nextEpisode!.number === 1 ? " premiere" : ""}
                  </small>
                </span>
                <span className="tools-card-go">
                  Start the countdown <Arrow />
                </span>
              </span>
            </a>
          )}
        </div>

        {/* every tool hub gets a homepage link with descriptive anchor text */}
        <p className="tools-more">
          Watching something else? <a href="/tools/binge-calculator/">Search any show in the binge calculator</a>,
          browse <a href="/tools/how-long-to-watch/">watch times for every show</a>, or see{" "}
          <a href="/tools/countdown/">all upcoming release dates</a>.
        </p>
      </div>
    </section>
  );
}
