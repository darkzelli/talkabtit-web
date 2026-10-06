"use client";

import { useEffect, useState } from "react";
import { partyStatus, type PartyStatus, type WatchParty } from "@/lib/watch-party-format";

type Props = Pick<WatchParty, "showName" | "title" | "season" | "episode" | "start" | "end">;

// The hero's live flag: a pill above the headline that exists ONLY while a
// watch party is running. The static HTML carries it (hidden) whenever a
// party is on the calendar, so a build from before the start time still
// lights up on its own: the browser re-checks every 30 seconds, shows the
// pill at the start, and pulls it at the end.
export default function WatchPartyLivePill({ party, initialStatus }: { party: Props; initialStatus: PartyStatus }) {
  const [status, setStatus] = useState<PartyStatus>(initialStatus);

  useEffect(() => {
    const tick = () => setStatus(partyStatus(party));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [party]);

  if (status !== "live") return null;

  const season = party.season == null ? null : party.season >= 1900 ? `${party.season}` : `S${party.season}`;
  return (
    <a className="wp-livepill" href="/watch-party/schedule/" data-cta="watch-party-live-pill">
      <span className="wp-live-tag"><span className="wp-dot" aria-hidden="true" />Live</span>
      <img className="wp-livepill-logo" src="/watch-party-logo.svg" alt="Watch Party" width={1230} height={317} />
      <span className="wp-livepill-show">
        {party.showName || party.title}
        {season && <> <span className="wp-livepill-ep">{season}{party.episode != null && <><span className="wp-livepill-sep"> · </span>E{party.episode}</>}</span></>}
      </span>
      <span className="wp-livepill-go">
        <span className="wp-livepill-go-long">Join now</span>
        <span className="wp-livepill-go-short">Join</span>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </a>
  );
}
