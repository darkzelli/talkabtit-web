"use client";

import { useEffect, useState } from "react";
import { isSoon, partyStatus, type PartyStatus, type WatchParty } from "@/lib/watch-party-format";

type Props = Pick<WatchParty, "showName" | "title" | "season" | "episode" | "start" | "end">;

// The hero's watch party flag: a pill above the headline. In the last 24
// hours before a party it shows the start time ("At 3:00 AM"); while the
// party runs it shows LIVE. The browser re-checks every 30 seconds, so a
// build from before the start time flips to LIVE on its own and pulls the
// pill at the end.
// "3:00 AM" — Eastern on the server, the viewer's own zone after mount.
function startTime(iso: string, timeZone?: string) {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone });
}

export default function WatchPartyLivePill({ party, initialStatus, initialSoon }: { party: Props; initialStatus: PartyStatus; initialSoon: boolean }) {
  const [status, setStatus] = useState<PartyStatus>(initialStatus);
  const [soon, setSoon] = useState(initialSoon);
  const [time, setTime] = useState(() => startTime(party.start, "America/New_York"));

  useEffect(() => {
    setTime(startTime(party.start));
    const tick = () => {
      setStatus(partyStatus(party));
      setSoon(isSoon(party.start));
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [party]);

  const live = status === "live";
  if (!live && !(status === "upcoming" && soon)) return null;

  const season = party.season == null ? null : party.season >= 1900 ? `${party.season}` : `S${party.season}`;
  return (
    <a className="wp-livepill" href="/watch-party/schedule/" data-cta={live ? "watch-party-live-pill" : "watch-party-soon-pill"}>
      {live ? (
        <span className="wp-live-tag"><span className="wp-dot" aria-hidden="true" />Live</span>
      ) : (
        <span className="wp-live-tag wp-soon-tag">At {time}</span>
      )}
      <img className="wp-livepill-logo" src="/watch-party-logo.svg" alt="Watch Party" width={1230} height={317} />
      <span className="wp-livepill-show">
        {party.showName || party.title}
        {season && <> <span className="wp-livepill-ep">{season}{party.episode != null && <><span className="wp-livepill-sep"> · </span>E{party.episode}</>}</span></>}
      </span>
      <span className="wp-livepill-go">
        <span className="wp-livepill-go-long">{live ? "Join now" : "Get ready"}</span>
        <span className="wp-livepill-go-short">{live ? "Join" : "Details"}</span>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </a>
  );
}
