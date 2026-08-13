"use client";

import { useEffect, useRef, useState } from "react";

// The demo clip (public/talkabtit-demo-*.webm) cuts between streaming services,
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

  return (
    <div className="browser" aria-hidden="true">
      {/* tab strip: the active streaming tab */}
      <div className="browser-tabbar">
        <span className="browser-tab">
          <span className="tab-fav" style={{ background: svc.fav }} />
          {svc.name}
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
            <img src="/mark.svg" alt="" />
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

      {/* the web page: a fullscreen player */}
      <div className="screen">
        <video
          ref={videoRef}
          className="screen-video"
          autoPlay
          muted
          loop
          playsInline
        >
          {/* Both encodes are 720p30, no audio (the player is always muted).
              AV1 is the smaller file; Safari on pre-AV1 hardware skips it and
              takes the VP9 fallback */}
          <source src="/talkabtit-demo-av1.webm" type='video/webm; codecs="av01.0.09M.08"' />
          <source src="/talkabtit-demo-vp9.webm" type="video/webm" />
        </video>
      </div>
    </div>
  );
}
