"use client";

import { useState } from "react";
import { daysAtPace, formatDuration, formatHours } from "@/lib/tv-format";

// The manual calculator on /tools/binge-calculator/: episodes × runtime, then how
// many days that is at the viewer's pace. Pure client state; no data needed.
export default function BingeCalculator() {
  const [episodes, setEpisodes] = useState(50);
  const [runtime, setRuntime] = useState(42);
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [speed, setSpeed] = useState(1);

  const total = (episodes * runtime) / speed;
  const perDay = hoursPerDay * 60;
  const days = total > 0 && perDay > 0 ? daysAtPace(total, perDay) : 0;

  const num = (v: string, fallback: number) => {
    const n = parseFloat(v);
    return Number.isFinite(n) && n >= 0 ? n : fallback;
  };

  return (
    <div className="tool-card">
      <div className="tool-form">
        <label className="tool-field">
          <span>Episodes</span>
          <input type="number" min="0" inputMode="numeric" value={episodes} onChange={(e) => setEpisodes(num(e.target.value, 0))} />
        </label>
        <label className="tool-field">
          <span>Minutes per episode</span>
          <input type="number" min="0" inputMode="numeric" value={runtime} onChange={(e) => setRuntime(num(e.target.value, 0))} />
        </label>
        <label className="tool-field">
          <span>Hours per day</span>
          <input type="number" min="0.5" step="0.5" inputMode="decimal" value={hoursPerDay} onChange={(e) => setHoursPerDay(num(e.target.value, 1))} />
        </label>
        <label className="tool-field">
          <span>Playback speed</span>
          <select value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))}>
            <option value={1}>1× (normal)</option>
            <option value={1.25}>1.25×</option>
            <option value={1.5}>1.5×</option>
            <option value={2}>2×</option>
          </select>
        </label>
      </div>
      <div className="tool-result" aria-live="polite">
        <div className="tool-stat">
          <span className="tool-stat-num">{formatHours(total)}</span>
          <span className="tool-stat-label">Total watch time</span>
        </div>
        <div className="tool-stat">
          <span className="tool-stat-num">{formatDuration(total)}</span>
          <span className="tool-stat-label">Non-stop</span>
        </div>
        <div className="tool-stat">
          <span className="tool-stat-num">{days} {days === 1 ? "day" : "days"}</span>
          <span className="tool-stat-label">At {hoursPerDay}h a day</span>
        </div>
      </div>
    </div>
  );
}
