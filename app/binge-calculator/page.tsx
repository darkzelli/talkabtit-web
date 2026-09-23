import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BingeCalculator from "@/components/BingeCalculator";
import ShowFinder from "@/components/ShowFinder";
import { PosterGrid, type PosterItem } from "@/components/PosterCard";
import ToolCta, { ToolAttribution } from "@/components/ToolCta";
import FaqList, { faqPageJsonLd, type Faq } from "@/components/FaqList";
import { SITE_URL } from "@/lib/seo";
import { formatHours, loadIndex, yearSpan, type ShowSummary } from "@/lib/tv";
import "@/components/tools.css";

export const metadata: Metadata = {
  title: "Binge Time Calculator — how long to watch any show",
  description:
    "Find out exactly how long it takes to binge-watch any TV show. Total hours, days at your pace, and a per-season breakdown for hundreds of shows, or plug in your own numbers.",
  alternates: { canonical: "/binge-calculator/" },
  openGraph: {
    title: "Binge Time Calculator",
    description: "How long does it take to watch every episode? Look up a show or plug in your own numbers.",
    url: "/binge-calculator/",
  },
};

const FAQS: Faq[] = [
  {
    q: "How is binge time calculated?",
    a: <>Every episode&apos;s listed runtime is added up, season by season. Days-at-a-pace divides that total by the hours you plan to watch per day and rounds up, so a 40-hour show at two hours a night is 20 nights.</>,
    text: "Every episode's listed runtime is added up, season by season. Days-at-a-pace divides that total by the hours you plan to watch per day and rounds up, so a 40-hour show at two hours a night is 20 nights.",
  },
  {
    q: "Do the totals include intros and recaps?",
    a: <>Runtimes are the listed length of each episode, which includes the title sequence and credits. Skipping intros on a 20-episode-a-season show saves roughly a minute an episode, so knock about 5% off the total if you always hit skip.</>,
    text: "Runtimes are the listed length of each episode, which includes the title sequence and credits. Skipping intros on a 20-episode-a-season show saves roughly a minute an episode, so knock about 5% off the total if you always hit skip.",
  },
  {
    q: "What if my show isn't listed?",
    a: <>Use the calculator with the episode count and average runtime from the show&apos;s streaming page. The show list is curated and grows over time; ask for a show at support@talkabtit.app.</>,
    text: "Use the calculator with the episode count and average runtime from the show's streaming page. The show list is curated and grows over time; ask for a show at support@talkabtit.app.",
  },
];

export default function BingeCalculatorPage() {
  const { fetchedAt, shows } = loadIndex();
  const toItem = (s: ShowSummary): PosterItem => ({
    slug: s.slug,
    name: s.name,
    poster: s.poster,
    meta: `${s.episodeCount.toLocaleString("en-US")} episodes${yearSpan(s) ? ` · ${yearSpan(s)}` : ""}`,
    badge: formatHours(s.totalMinutes).replace(" hours", "h").replace(" hour", "h"),
  });
  const popular = [...shows].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 18);
  const longest = [...shows].sort((a, b) => b.totalMinutes - a.totalMinutes).slice(0, 10);
  const weekend = shows
    .filter((s) => s.totalMinutes <= 600 && s.status === "Ended")
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 12);
  const byName = [...shows].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <header className="page-hero">
          <div className="wrap">
            <span className="kicker">Free tool</span>
            <h1 className="display">
              Binge time <span className="accent">calculator</span>
            </h1>
            <p className="lede">
              How long does it really take to watch the whole thing? Search a
              show for its total runtime, a per-season breakdown, and how many
              nights it is at your pace.
            </p>
          </div>
        </header>

        <ShowFinder
          items={byName.map(toItem)}
          base="/how-long-to-watch/"
          placeholder="Search a show, e.g. The Office"
          persistent={
            <>
              <div className="tool-sec">
                <div>
                  <h2>How long will it take me to watch a show?</h2>
                  <p>Enter the episode count and runtime for any show, pick your pace and playback speed, and get the total hours and how many days it takes.</p>
                </div>
              </div>
              <BingeCalculator />

              <div className="tool-sec">
                <div>
                  <h2>Binge calculator FAQ</h2>
                </div>
              </div>
              <FaqList faqs={FAQS} />

              <ToolCta cta="binge-calculator" />
              <ToolAttribution fetchedAt={fetchedAt} />
            </>
          }
        >
              <div className="tool-sec">
                <div>
                  <h2>Highest rated</h2>
                  <p>The shows most worth the hours, by TVmaze user rating.</p>
                </div>
                <a href="/how-long-to-watch/">All shows A–Z →</a>
              </div>
              <PosterGrid items={popular.map(toItem)} base="/how-long-to-watch/" />

              <div className="tool-sec">
                <div>
                  <h2>The longest binges</h2>
                  <p>The ten biggest commitments in the list, by total screen time.</p>
                </div>
              </div>
              <ol className="row-list">
                {longest.map((s, i) => (
                  <li key={s.slug}>
                    <a href={`/how-long-to-watch/${s.slug}/`}>
                      <span className="row-rank">{i + 1}</span>
                      {s.poster ? <img className="row-thumb" src={s.poster} alt="" loading="lazy" decoding="async" /> : <span className="row-thumb-empty" />}
                      <span className="row-name">
                        {s.name}
                        <small>{s.episodeCount.toLocaleString("en-US")} episodes · {s.seasonCount} seasons{yearSpan(s) ? ` · ${yearSpan(s)}` : ""}</small>
                      </span>
                      <span className="row-val">
                        <strong>{formatHours(s.totalMinutes)}</strong>
                        <span>{Math.ceil(s.totalMinutes / 120)} days at 2h/day</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>

              {weekend.length > 0 && (
                <>
                  <div className="tool-sec">
                    <div>
                      <h2>Finished in a weekend</h2>
                      <p>Complete shows you can clear in ten hours or less.</p>
                    </div>
                  </div>
                  <PosterGrid items={weekend.map(toItem)} base="/how-long-to-watch/" />
                </>
              )}

        </ShowFinder>
      </main>
      <Footer sub />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(FAQS, `${SITE_URL}/binge-calculator/#faq`)) }}
      />
    </>
  );
}
