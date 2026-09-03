"use client";

import { useState } from "react";

// Teleparty-style walkthrough: the step list on the left drives the stage on
// the right. Each step's demo video drops into `video` when it's ready
// (put the file in public/ and reference it here, e.g. "/how-step-1.webm");
// until then the stage shows the resting bucket mark. Once videos are in,
// the stage advances to the next step when one finishes playing.
const STEPS = [
  {
    title: "Add it to your browser",
    body: "Install the extension from the Chrome Web Store, then continue with Google or GitHub — or create an account with your email — and pick the name everyone sees with your comments. Takes seconds.",
    video: null as string | null,
  },
  {
    title: "Open your streaming service",
    body: "Head to Netflix, Hulu, Disney+, HBO Max, or Crunchyroll and press play — the popcorn bucket pops up over the video. Click it to open the conversation.",
    video: null,
  },
  {
    title: "Join the conversation",
    body: "Comments are pinned to the exact moment in the show. Read reactions as they land, and drop your own.",
    video: null,
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];
  return (
    <section id="how" className="how band">
      <div className="wrap how-grid">
        <div className="how-side">
          <span className="kicker">Getting started</span>
          <h2 className="display">How it works</h2>
          <ol className="how-steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  className={i === active ? "how-step how-step-on" : "how-step"}
                  aria-current={i === active}
                  onClick={() => setActive(i)}
                >
                  <span className="how-step-num">{i + 1}</span>
                  <span className="how-step-bar" aria-hidden="true" />
                  {s.title}
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="how-stage">
          <div className="how-media">
            {step.video ? (
              <video
                key={step.video}
                src={step.video}
                autoPlay
                muted
                playsInline
                onEnded={() => setActive((active + 1) % STEPS.length)}
              />
            ) : (
              <div className="how-media-empty" aria-hidden="true">
                <img src="/mark.svg" alt="" loading="lazy" decoding="async" />
              </div>
            )}
          </div>
          {/* every caption occupies the same grid cell, so the block always
              reserves the tallest step's height — switching steps never
              changes the section height or moves the page */}
          <div className="how-caption">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                className="how-caption-item"
                style={i === active ? undefined : { visibility: "hidden" }}
                aria-hidden={i !== active}
              >
                <h3 className="how-step-title">{s.title}</h3>
                <p className="how-step-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
