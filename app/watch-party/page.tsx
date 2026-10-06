import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ToolCta from "@/components/ToolCta";
import FaqList, { faqPageJsonLd, type Faq } from "@/components/FaqList";
import { CHROME_STORE_URL, SITE_NAME, SITE_URL } from "@/lib/seo";
import { featuredParty, formatPartyStart, loadWatchParties, partyStatus } from "@/lib/watch-parties";
import "@/components/tools.css";
import "@/components/watch-party.css";

// The evergreen explainer: what a TalkAbtIT watch party is, how one runs,
// and the questions people ask. Links through to /watch-party/schedule/ for
// whatever is live or on the calendar right now.
export const metadata: Metadata = {
  title: "Watch parties — watch an episode live with everyone",
  description:
    "A TalkAbtIT watch party is a scheduled episode the whole crowd watches at once: everyone presses play at the same time and the comment section rolls in live. How it works, how to join, and what's on the schedule.",
  alternates: { canonical: "/watch-party/" },
  openGraph: {
    title: "TalkAbtIT watch parties",
    description: "One episode, one start time, everyone's comments live beside the player. Free in Chrome.",
    url: "/watch-party/",
  },
};

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function WatchPartyExplainer() {
  const party = featuredParty(loadWatchParties());
  const live = party ? partyStatus(party) === "live" : false;
  const season = party?.season == null ? null : party.season >= 1900 ? `${party.season}` : `S${party.season}`;

  const FAQS: Faq[] = [
    {
      q: "What is a TalkAbtIT watch party?",
      a: <>A scheduled episode that everyone watches at the same time, each on their own account, with the TalkAbtIT comment section running live beside the player. Nobody shares a screen or a login — you open the episode on Netflix, Hulu, Disney+, HBO Max, Paramount+ or Crunchyroll and press play when the party starts.</>,
      text: "A scheduled episode that everyone watches at the same time, each on their own account, with the TalkAbtIT comment section running live beside the player. Nobody shares a screen or a login — you open the episode on Netflix, Hulu, Disney+, HBO Max, Paramount+ or Crunchyroll and press play when the party starts.",
    },
    {
      q: "Do I need a subscription to the streaming service?",
      a: <>Yes. TalkAbtIT adds the comment section; it doesn&apos;t stream the show. You watch on your own account, and the party is free on top of that.</>,
      text: "Yes. TalkAbtIT adds the comment section; it doesn't stream the show. You watch on your own account, and the party is free on top of that.",
    },
    {
      q: "What if I join late?",
      a: <>Press play whenever you get there. Comments are time-stamped to the episode, so the chat replays in sync with your spot — you see the room&apos;s reaction to each scene as you reach it, not a wall of spoilers.</>,
      text: "Press play whenever you get there. Comments are time-stamped to the episode, so the chat replays in sync with your spot — you see the room's reaction to each scene as you reach it, not a wall of spoilers.",
    },
    {
      q: "Is there a watch party on right now?",
      a: <>The <a href="/watch-party/schedule/">schedule page</a> shows whatever is live or coming up, with a countdown and the episode link. {party ? <>Right now that&apos;s {party.showName || party.title}{season ? ` ${season}${party.episode != null ? ` E${party.episode}` : ""}` : ""}, {live ? "live at the moment" : formatPartyStart(party.start)}.</> : "Nothing is scheduled at the moment."}</>,
      text: `The schedule page at ${SITE_URL}/watch-party/schedule/ shows whatever is live or coming up, with a countdown and the episode link.`,
    },
    {
      q: "Can I host my own watch party?",
      a: <>Not yet. Parties are picked and scheduled by TalkAbtIT for now. If there&apos;s an episode you want the whole room for, tell us at <a href="mailto:support@talkabtit.app">support@talkabtit.app</a>.</>,
      text: "Not yet. Parties are picked and scheduled by TalkAbtIT for now. If there's an episode you want the whole room for, tell us at support@talkabtit.app.",
    },
  ];

  const jsonLd = faqPageJsonLd(FAQS, `${SITE_URL}/watch-party/#faq`);
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Watch parties", item: `${SITE_URL}/watch-party/` },
    ],
  };

  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <header className="page-hero wp-page-hero">
          <div className="wrap">
            <div className="wp-explain-hero">
              <div className="wp-hero-copy">
                <img className="wp-logo" src="/watch-party-logo.svg" alt="TalkAbtIT Watch Party" width={1230} height={317} />
                <h1 className="display">
                  One episode, one start time, <span className="wp-ep">everyone&apos;s comments live.</span>
                </h1>
                <p className="lede">
                  A scheduled episode everyone watches at once, with the comments rolling in live.
                </p>
                <div className="wp-ctas">
                  <a className="wp-join" href="/watch-party/schedule/" data-cta="watch-party-explainer-schedule">
                    {live ? "A party is live now" : party ? "See what's scheduled" : "See the schedule"} <Arrow />
                  </a>
                  <a className="wp-cal" href={CHROME_STORE_URL} target="_blank" rel="noopener" data-cta="watch-party-explainer">
                    Get TalkAbtIT — free
                  </a>
                </div>
              </div>

              {/* what's on: the live/next party, or an empty card */}
              <a className={`wp-now${live ? " wp-now-live" : ""}`} href="/watch-party/schedule/">
                <span className="wp-now-label">{live ? <span className="wp-live-tag"><span className="wp-dot" aria-hidden="true" />Live now</span> : party ? "Next up" : "On the schedule"}</span>
                {party ? (
                  <>
                    <span className="wp-now-poster">
                      {party.poster ? <img src={party.poster} alt="" width={210} height={295} /> : null}
                    </span>
                    <strong className="wp-now-show">
                      {party.showName || party.title}
                      {season && <> <span className="wp-now-ep">{season}{party.episode != null && <> · E{party.episode}</>}</span></>}
                    </strong>
                    <span className="wp-now-when">{live ? "Started " : ""}{formatPartyStart(party.start)}</span>
                  </>
                ) : (
                  <>
                    <strong className="wp-now-show">Nothing scheduled yet</strong>
                    <span className="wp-now-when">The next party lands here the moment it&apos;s on the calendar.</span>
                  </>
                )}
                <span className="wp-now-go">{live ? "Join now" : "Open the schedule"} <Arrow /></span>
              </a>
            </div>
          </div>
        </header>

        <section className="content">
          <div className="wrap">
            <div className="wp-how-head">
              <span className="kicker">How it works</span>
              <h2 className="display">From the schedule to the credits.</h2>
            </div>
            <ol className="wp-how">
              <li className="wp-how-step">
                <span className="wp-how-num" aria-hidden="true">1</span>
                <h3>Pick a party</h3>
                <p>
                  Find it on the <a href="/watch-party/schedule/">schedule</a> and add it to your calendar.
                </p>
              </li>
              <li className="wp-how-step">
                <span className="wp-how-num" aria-hidden="true">2</span>
                <h3>Open the episode</h3>
                <p>With TalkAbtIT installed, the comment panel is already beside the player.</p>
              </li>
              <li className="wp-how-step">
                <span className="wp-how-num" aria-hidden="true">3</span>
                <h3>Press play on time</h3>
                <p>Everyone starts together and the comments roll in live. Late? The chat syncs to your spot.</p>
              </li>
            </ol>

            <div className="tool-sec" id="faq">
              <div>
                <h2>Questions</h2>
              </div>
            </div>
            <FaqList faqs={FAQS} />

            <ToolCta cta="watch-party-explainer-pitch" />
          </div>
        </section>
      </main>
      <Footer sub />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
