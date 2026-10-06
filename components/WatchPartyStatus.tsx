"use client";

import { useEffect, useState } from "react";
import { formatPartyStart, partyStatus, type PartyStatus, type WatchParty } from "@/lib/watch-party-format";

type Props = Pick<WatchParty, "start" | "end" | "showName" | "title">;

// The live half of the /watch-party/ hero: status badge, the start time in
// the viewer's zone, and a ticking countdown that becomes "live" at start
// and "ended" after. Prerendered with build-time values (Eastern time) so the
// static HTML is meaningful; the browser takes over after mount.
export default function WatchPartyStatus({ party }: { party: Props }) {
  const [status, setStatus] = useState<PartyStatus>(() => partyStatus(party));
  const [when, setWhen] = useState(() => formatPartyStart(party.start));
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(party.start).getTime();
    const tick = () => {
      const now = Date.now();
      setStatus(partyStatus(party, now));
      setLeft(Math.max(0, target - now));
    };
    setWhen(formatPartyStart(party.start, Intl.DateTimeFormat().resolvedOptions().timeZone));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [party]);

  const s = left == null ? null : Math.floor(left / 1000);
  const units = s == null
    ? [["--", "days"], ["--", "hours"], ["--", "minutes"], ["--", "seconds"]]
    : [
        [String(Math.floor(s / 86400)), "days"],
        [String(Math.floor((s % 86400) / 3600)).padStart(2, "0"), "hours"],
        [String(Math.floor((s % 3600) / 60)).padStart(2, "0"), "minutes"],
        [String(s % 60).padStart(2, "0"), "seconds"],
      ];

  return (
    <div className="wp-status">
      {/* no badge while upcoming — the countdown says it; live and ended get one */}
      {status !== "upcoming" && (
        <span className={`wp-badge wp-badge-${status}`}>
          <span className="wp-dot" aria-hidden="true" />
          {status === "live" ? "Live now" : "This party has ended"}
        </span>
      )}
      <p className="wp-when">
        {status === "live" ? "Started " : status === "ended" ? "Was " : "Starts "}
        <strong>{when}</strong>
        {status === "upcoming" && <span className="wp-when-tz"><span className="wp-when-sep"> · </span>shown in your time zone</span>}
      </p>
      {status === "upcoming" && (
        <div className="countdown" role="timer" aria-label={`Time until the ${party.showName || party.title} watch party`}>
          {units.map(([n, l]) => (
            <div className="cd-unit" key={l}>
              <span className="cd-num">{n}</span>
              <span className="cd-label">{l}</span>
            </div>
          ))}
        </div>
      )}
      {status === "live" && (
        <p className="wp-live-copy">
          The party is on. Open the episode, press play, and the comments are already rolling.
        </p>
      )}
    </div>
  );
}
