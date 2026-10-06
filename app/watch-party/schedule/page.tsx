import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WatchPartyStatus from "@/components/WatchPartyStatus";
import { CHROME_STORE_URL, SITE_NAME, SITE_URL } from "@/lib/seo";
import { calendarUrl, episodeTag, featuredParty, formatPartyStart, loadWatchParties, partyStatus, type WatchParty } from "@/lib/watch-parties";
import { loadPosts } from "@/lib/blog";
import "@/components/tools.css";
import "@/components/watch-party.css";

const PAGE_URL = `${SITE_URL}/watch-party/schedule/`;
// the schedule row always shows this many cards; empty slots are placeholders
const SLOTS = 4;

export function generateMetadata(): Metadata {
  const party = featuredParty(loadWatchParties());
  const title = party ? `${party.title} — live watch party` : "Watch party schedule";
  const description = party
    ? `${party.description} ${formatPartyStart(party.start)} on ${party.service?.label ?? "your streaming service"}. Free with the TalkAbtIT Chrome extension.`
    : "Every live and upcoming TalkAbtIT watch party: everyone presses play at the same time and the comment section rolls in live. Nothing is scheduled right now — check back soon.";
  return {
    title,
    description,
    alternates: { canonical: "/watch-party/schedule/" },
    openGraph: { title, description, url: "/watch-party/schedule/", ...(party?.poster ? { images: [{ url: party.poster }] } : {}) },
  };
}

function ExtensionIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V22c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V24H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" />
    </svg>
  );
}

function Poster({ party }: { party: WatchParty }) {
  return (
    <div className="wp-poster">
      {party.poster ? (
        <img src={party.poster} alt={`${party.showName || party.title} poster`} width={210} height={295} />
      ) : (
        <span className="wp-poster-fallback" aria-hidden="true">{(party.showName || party.title).slice(0, 1)}</span>
      )}
    </div>
  );
}

// "Lioness S3 · E8" with the episode in party red — or the title alone for a
// party that isn't tied to a show in data/tv/.
function Headline({ party }: { party: WatchParty }) {
  if (!party.showName) return <>{party.title}</>;
  const season = party.season == null ? null : party.season >= 1900 ? `${party.season}` : `S${party.season}`;
  return (
    <>
      {party.showName}
      {season && (
        <>
          {" "}
          <span className="wp-ep">
            {season}
            {party.episode != null && <> <span className="wp-ep-sep">·</span> E{party.episode}</>}
          </span>
        </>
      )}
    </>
  );
}

export default function WatchPartyPage() {
  const parties = loadWatchParties();
  const party = featuredParty(parties);
  const post = party?.post ? loadPosts().find((p) => p.slug === party.post) : undefined;
  const svcName = party?.service?.label ?? "the streaming service";

  // One Event per party (Google's event rich results), plus the breadcrumb.
  const events = parties.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${PAGE_URL}#${p.slug}`,
    name: `${p.title} · TalkAbtIT watch party`,
    description: p.description,
    startDate: p.start,
    endDate: p.end,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    location: { "@type": "VirtualLocation", url: p.url ?? PAGE_URL },
    organizer: { "@id": `${SITE_URL}/#organization` },
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", url: PAGE_URL, availability: "https://schema.org/InStock" },
    ...(p.poster ? { image: `${SITE_URL}${p.poster}` } : {}),
    ...(p.show ? { workFeatured: { "@type": "TVSeries", name: p.showName } } : {}),
  }));
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Watch parties", item: `${SITE_URL}/watch-party/` },
      { "@type": "ListItem", position: 3, name: "Schedule", item: PAGE_URL },
    ],
  };

  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <header className="page-hero wp-page-hero">
          <div className="wrap">
            {party ? (
              <div className="wp-hero">
                <Poster party={party} />
                <div className="wp-hero-copy">
                  <a className="wp-crumb" href="/watch-party/">&larr; What is a watch party?</a>
                  <img className="wp-logo" src="/watch-party-logo.svg" alt="TalkAbtIT Watch Party" width={1230} height={317} />
                  <h1 className="display">
                    <Headline party={party} />
                  </h1>
                  <WatchPartyStatus party={{ start: party.start, end: party.end, showName: party.showName, title: party.title }} />
                  <div className="wp-ctas">
                    {party.url ? (
                      <a className="wp-join" href={party.url} target="_blank" rel="noopener" data-cta="watch-party-open">
                        Open the episode on {svcName}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M7 17L17 7M9 7h8v8" />
                        </svg>
                      </a>
                    ) : (
                      <a className="wp-join" href={CHROME_STORE_URL} target="_blank" rel="noopener" data-cta="watch-party-hero">
                        <ExtensionIcon />
                        Get TalkAbtIT — free
                      </a>
                    )}
                    <a className="wp-cal" href={calendarUrl(party, PAGE_URL)} target="_blank" rel="noopener">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" />
                      </svg>
                      Add to Google Calendar
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="wp-empty">
                <a className="wp-crumb" href="/watch-party/">&larr; What is a watch party?</a>
                <img className="wp-logo" src="/watch-party-logo.svg" alt="TalkAbtIT Watch Party" width={1230} height={317} />
                <h1 className="display">
                  Watch party <span className="wp-ep">schedule</span>
                </h1>
                <p className="lede">
                  Nothing is scheduled right now. The next party shows up here, and on the
                  homepage, as soon as it&apos;s on the calendar.{" "}
                  <a href="/watch-party/">Read how watch parties work</a> in the meantime.
                </p>
              </div>
            )}
          </div>
        </header>

        <section className="content">
          <div className="wrap">
            {party && (
              <div className="wp-about">
                <span className="kicker">About this party</span>
                <h2>{party.title}</h2>
                <p>
                  {party.description}
                  {party.service && (
                    <>
                      {" "}Streaming on <a className="wp-svc" href={party.service.href}>{party.service.label}</a>.
                    </>
                  )}
                </p>
                {party.html && <div className="prose wp-about-notes" dangerouslySetInnerHTML={{ __html: party.html }} />}
                {post && (
                  <p>
                    Need a refresher first? Read <a href={`/blog/${post.slug}/`}>{post.title}</a> on the blog.
                  </p>
                )}
              </div>
            )}

            <div className="tool-sec wp-sched-head">
              <div>
                <h2>Schedule</h2>
                <p>Every party that&apos;s live or coming up. Times in Eastern.</p>
              </div>
              <a href="/watch-party/">What is a watch party? &rarr;</a>
            </div>
            <ul className="wp-sched">
              {parties.map((p) => {
                const isLive = partyStatus(p) === "live";
                const tag = episodeTag(p);
                return (
                  <li className={`wp-scard${isLive ? " wp-scard-live" : ""}${p.slug === party?.slug ? " wp-scard-now" : ""}`} key={p.slug} id={p.slug}>
                    <span className="wp-scard-poster" aria-hidden="true">
                      {p.poster ? <img src={p.poster} alt="" width={210} height={295} loading="lazy" decoding="async" /> : <span className="wp-scard-fallback">{(p.showName || p.title).slice(0, 1)}</span>}
                      {isLive && <span className="wp-live-tag wp-scard-tag"><span className="wp-dot" aria-hidden="true" />Live</span>}
                    </span>
                    <strong className="wp-scard-show">
                      {p.showName || p.title}
                      {tag && <> <span className="wp-scard-ep">{tag}</span></>}
                    </strong>
                    <span className="wp-scard-when">{formatPartyStart(p.start)}</span>
                    {p.service && <span className="wp-scard-svc">{p.service.label}</span>}
                    {p.url && (
                      <a className="wp-scard-go" href={p.url} target="_blank" rel="noopener">
                        {isLive ? "Join now" : "Episode link"} &rarr;
                      </a>
                    )}
                  </li>
                );
              })}
              {Array.from({ length: Math.max(0, SLOTS - parties.length) }).map((_, i) => (
                <li className="wp-scard wp-scard-empty" key={`empty-${i}`}>
                  <span className="wp-scard-poster">
                    <img className="wp-scard-mark" src="/mark.svg" alt="" width={40} height={40} />
                  </span>
                  <strong className="wp-scard-show">{parties.length === 0 && i === 0 ? "Nothing scheduled yet" : "Next party TBA"}</strong>
                  <span className="wp-scard-when">
                    {parties.length === 0 && i === 0 ? "The next one lands here the moment it's on the calendar." : "Announced here first."}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer sub />
      {events.map((e) => (
        <script key={e["@id"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(e) }} />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
