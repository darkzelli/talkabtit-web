import { episodeTag, formatPartyStart, loadWatchParties } from "@/lib/watch-parties";
import "./watch-party.css";

// Countdown-page card for a show that has a watch party on the calendar:
// the Watch Party lockup, when it starts (Eastern, same as the schedule's
// static HTML), and a button to that party on /watch-party/schedule/.
// Renders nothing when the show has no upcoming party.
export default function WatchPartyCallout({ show }: { show: string }) {
  const party = loadWatchParties().find((p) => p.show === show);
  if (!party) return null;
  const tag = episodeTag(party);
  const premiere = party.episode === 1;
  return (
    <a className="wp-callout" href={`/watch-party/schedule/#${party.slug}`} data-cta="countdown-watch-party">
      <img className="wp-callout-logo" src="/watch-party-logo.svg" alt="Watch Party" width={1230} height={317} />
      <span className="wp-callout-copy">
        <span className="wp-callout-title">
          Watch the {premiere ? "premiere" : tag ? tag : "episode"} live with everyone
        </span>
        <span className="wp-callout-when">
          {formatPartyStart(party.start)}
          {party.service ? ` · ${party.service.label}` : ""} · live comments
        </span>
      </span>
      <span className="wp-callout-go">
        Join the party
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </a>
  );
}
