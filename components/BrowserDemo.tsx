"use client";

import { useEffect, useRef, useState } from "react";

// The demo clip (public/talkabtitvidmin.webm) cuts between streaming services,
// each with its own on-screen logo. These are the segment start times (seconds,
// measured from the video) so the tab + address bar always match the logo
// currently showing. Ordered ascending; the last one whose `t` <= currentTime wins.
const SERVICE_SEGMENTS = [
  { t: 0.0, name: "Netflix", url: "netflix.com/watch", fav: "#E50914" },
  { t: 0.9, name: "Crunchyroll", url: "crunchyroll.com/watch", fav: "#F47521" },
  { t: 2.12, name: "Netflix", url: "netflix.com/watch", fav: "#E50914" },
  // 3.12–3.88 is a Prime Video cut in the clip; Prime is no longer supported,
  // so the tab keeps the previous label until the video is re-cut without it.
  { t: 3.88, name: "Hulu", url: "hulu.com/watch", fav: "#1CE783" },
];

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

// tiny toolbar glyphs, sized in em so they scale with the window
function Icon({ d, size = 1.5 }: { d: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={`${size}em`}
      height={`${size}em`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

export default function BrowserDemo() {
  const [count, setCount] = useState(0); // how many comments are on screen
  const [hidden, setHidden] = useState(false); // overlay slid off the video
  const [svc, setSvc] = useState(SERVICE_SEGMENTS[0]); // service the video is on
  const videoRef = useRef<HTMLVideoElement>(null);

  // keep the tab + address bar synced to the logo currently on screen
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let raf = 0;
    let lastIndex = -1;
    const tick = () => {
      const t = video.currentTime;
      let index = 0;
      for (let i = 0; i < SERVICE_SEGMENTS.length; i++) {
        if (t >= SERVICE_SEGMENTS[i].t) index = i;
      }
      if (index !== lastIndex) {
        lastIndex = index;
        setSvc(SERVICE_SEGMENTS[index]);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

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
    <div className="browser" aria-hidden="true">
      {/* tab strip: window controls + the active streaming tab */}
      <div className="browser-tabbar">
        <span className="traffic">
          <span />
          <span />
          <span />
        </span>
        <span className="browser-tab">
          <span className="tab-fav" style={{ background: svc.fav }} />
          {svc.name}
          <span className="tab-x">×</span>
        </span>
        <span className="tab-new">+</span>
      </div>

      {/* toolbar: nav buttons, omnibox, and the pinned TalkAbtIT extension */}
      <div className="browser-toolbar">
        <span className="tb-nav">
          <Icon d="M15 18l-6-6 6-6" />
          <Icon d="M9 18l6-6-6-6" />
          <Icon d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" size={1.35} />
        </span>
        <span className="omnibox">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          <span className="url">{svc.url}</span>
        </span>
        <span className="tb-actions">
          <span className="tb-ext" title="TalkAbtIT">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V22c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V24H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" />
            </svg>
          </span>
          <span className="tb-menu">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <circle cx="12" cy="5" r="1.7" />
              <circle cx="12" cy="12" r="1.7" />
              <circle cx="12" cy="19" r="1.7" />
            </svg>
          </span>
        </span>
      </div>

      {/* the web page: fullscreen player with comments overlaid */}
      <div className="screen">
        <video
          ref={videoRef}
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
