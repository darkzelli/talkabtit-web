"use client";

import { useEffect, useState } from "react";

// Live days/hours/minutes/seconds until `airstamp`. The prerendered HTML has
// dashes; real numbers appear after mount so the static page never carries a
// stale build-time countdown and hydration matches.
export default function Countdown({ airstamp, label }: { airstamp: string; label: string }) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(airstamp).getTime();
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [airstamp]);

  const s = left == null ? null : Math.floor(left / 1000);
  const units = s == null
    ? [["--", "days"], ["--", "hours"], ["--", "minutes"], ["--", "seconds"]]
    : [
        [String(Math.floor(s / 86400)), "days"],
        [String(Math.floor((s % 86400) / 3600)).padStart(2, "0"), "hours"],
        [String(Math.floor((s % 3600) / 60)).padStart(2, "0"), "minutes"],
        [String(s % 60).padStart(2, "0"), "seconds"],
      ];

  if (left === 0) {
    return <p className="tool-big" style={{ fontSize: "clamp(28px,4vw,44px)" }}>{label} is out now.</p>;
  }

  return (
    <div className="countdown" role="timer" aria-label={`Time until ${label}`}>
      {units.map(([n, l]) => (
        <div className="cd-unit" key={l}>
          <span className="cd-num">{n}</span>
          <span className="cd-label">{l}</span>
        </div>
      ))}
    </div>
  );
}
