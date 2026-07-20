"use client";

import { useEffect, useState } from "react";

const DEMO_COMMENTS = [
  { who: "Jake", ts: "0:43", body: "We shouldn't have opened the door" },
  { who: "Michael", ts: "1:07", body: "no way that just happened" },
  { who: "Ashley", ts: "1:15", body: "THE MUSIC. turn it up" },
  { who: "June", ts: "1:43", body: "watch the window on the left…" },
  { who: "Sam", ts: "2:08", body: "this scene lives rent free in my head" },
  { who: "Priya", ts: "2:31", body: "called it from the first episode" },
];

// timing (ms) for the looping "comments being sent" demo
const REVEAL_FIRST = 120; // first comment rides in with the returning panel
const REVEAL_GAP = 1500; // delay between each comment "being sent"
const HOLD = 2000; // pause after the last comment, all visible
const SLIDE_DUR = 550; // matches the CSS slide transition
const OFFSCREEN = 450; // beat while the overlay is slid away

export default function PhoneDemo() {
  const [count, setCount] = useState(0); // how many comments are on screen
  const [hidden, setHidden] = useState(false); // overlay slid off the video

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => {
      timers.push(setTimeout(() => !cancelled && fn(), ms));
    };

    function runCycle() {
      // slide the overlay back in from the right; the first comment rides in with it
      setHidden(false);
      setCount(0);
      DEMO_COMMENTS.forEach((_, i) =>
        at(REVEAL_FIRST + i * REVEAL_GAP, () => setCount(i + 1))
      );

      const lastAt = REVEAL_FIRST + (DEMO_COMMENTS.length - 1) * REVEAL_GAP;
      const slideOutAt = lastAt + HOLD;
      at(slideOutAt, () => setHidden(true)); // swipe the comments away to the right
      at(slideOutAt + SLIDE_DUR + OFFSCREEN, runCycle); // swipe back to the left
    }

    runCycle();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  const shown = DEMO_COMMENTS.slice(0, count);

  return (
    <div className="phone" aria-hidden="true">
      <div className="screen">
        <div className="cam" />
        <video
          className="screen-video"
          src="/talkabtitvidmin.webm"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className={`comments-popup${hidden ? " is-hidden" : ""}`}>
          <div className="feed">
            <div className="feed-inner">
              {shown.map((c, i) => (
                <div className="comment" key={i}>
                  <div className="who">
                    {c.who} <span className="ts">{c.ts}</span>
                  </div>
                  <div className="body">{c.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
