import { featuredParty, formatPartyStart, loadWatchParties, partyStatus } from "@/lib/watch-parties";
import "./watch-party.css";

// Homepage watch-party section: "Live. Watch Parties." over the lockup, one
// line on what a party is, and the link to the explainer at /watch-party/ —
// with the live/next party as a card on the right (or an empty card when
// nothing is on the calendar), linking to /watch-party/schedule/.
function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function WatchParties() {
  const party = featuredParty(loadWatchParties());
  const live = party ? partyStatus(party) === "live" : false;
  const season = party?.season == null ? null : party.season >= 1900 ? `${party.season}` : `S${party.season}`;
  return (
    <section id="watch-party" className="wp-band band">
      <div className="wrap wp-band-row">
        <div className="wp-band-copy">
          <img className="wp-logo" src="/watch-party-logo.svg" alt="TalkAbtIT Watch Party" width={1230} height={317} />
          <h2 className="wp-band-sub">
            Live public watch parties for the most anticipated episodes. Up to 200 users.
          </h2>
          <a className="btn btn-white btn-icon" href="/watch-party/">
            How watch parties work <Arrow />
          </a>
        </div>

        <a className={`wp-up${live ? " wp-up-live" : ""}`} href="/watch-party/schedule/" data-cta="watch-party-next">
          <span className="wp-up-poster" aria-hidden="true">
            {party?.poster ? (
              <img src={party.poster} alt="" width={210} height={295} decoding="async" />
            ) : (
              <img className="wp-up-poster-mark" src="/mark.svg" alt="" width={64} height={64} />
            )}
          </span>
          <span className="wp-up-body">
            <span className="wp-up-label">
              {live ? <span className="wp-live-tag"><span className="wp-dot" aria-hidden="true" />Live now</span> : party ? "Up next" : "On the schedule"}
            </span>
            {party ? (
              <>
                <strong className="wp-up-show">
                  {party.showName || party.title}
                  {season && <> <span className="wp-up-ep">{season}{party.episode != null && <> · E{party.episode}</>}</span></>}
                </strong>
                <span className="wp-up-when">
                  {live ? "Started " : ""}{formatPartyStart(party.start)}
                  {party.service && <> · on {party.service.label}</>}
                </span>
              </>
            ) : (
              <>
                <strong className="wp-up-show">Nothing scheduled yet</strong>
                <span className="wp-up-when">The next party lands here the moment it&apos;s on the calendar.</span>
              </>
            )}
            <span className="wp-up-go">{live ? "Join now" : "See the schedule"} <Arrow /></span>
          </span>
        </a>
      </div>
    </section>
  );
}
