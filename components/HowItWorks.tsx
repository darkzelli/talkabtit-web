"use client";

import { useState } from "react";

// Teleparty-style walkthrough: the step list on the left drives the stage on
// the right. Most steps show real screenshots (public/how-step-*.avif, 1400×788
// AVIF crops of the store listing and the extension on Netflix); the "click the
// popcorn bucket" step instead renders a CSS remake of the bucket button riding
// the right edge of the player, pulsing to be clicked.
type Step = { title: string; body?: string; img?: string; alt?: string; mock?: boolean };

const STEPS: Step[] = [
  {
    title: "Add it to your browser",
    body: "Install the extension from the Chrome Web Store, then continue with Google or GitHub — or create an account with your email — and pick the name everyone sees with your comments.",
    img: "/how-step-1.avif",
    alt: "TalkAbtIT extension listing on the Chrome Web Store",
  },
  {
    title: "Open your streaming service",
    body: "Head to Netflix, Hulu, Disney+, HBO Max, or Crunchyroll.",
    img: "/how-step-2.avif",
    alt: "Netflix home page with a TalkAbtIT comment popping up over the featured preview",
  },
  {
    title: "Pick a show or movie",
    body: "Press play, then hover over the video and the popcorn bucket appears.",
    img: "/how-step-3.avif",
    alt: "An episode playing on Netflix with the TalkAbtIT popcorn bucket at the edge of the video",
  },
  {
    title: "Click the popcorn bucket",
    body: "The comment section slides in beside the video, matched to the exact episode you're watching. Sort by time, top, or newest, and tune how pop-ups behave.",
    mock: true,
  },
  {
    title: "Join the conversation",
    body: "Comments are pinned to the exact moment in the show. Read reactions as they land, and drop your own.",
    img: "/how-step-4.avif",
    alt: "The TalkAbtIT comment panel open beside an episode on Netflix",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  return (
    <section id="how" className="how band band-elevated">
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
          {/* screenshots all stay mounted (stacked in one grid cell, inactive
              ones hidden), so stepping through never waits on a decode */}
          <div className="how-media">
            {STEPS.map((s, i) =>
              s.mock ? (
                /* mock player surface with the extension's popcorn button
                   pulsing on the right edge, the way it rides a real video */
                <div
                  key={s.title}
                  className="how-bucket-mock"
                  style={i === active ? undefined : { visibility: "hidden" }}
                  aria-hidden={i !== active}
                >
                  <div className="bucket-btn">
                    <img src="/mark.svg" alt="" loading="lazy" decoding="async" />
                    <span className="bucket-badge">12</span>
                  </div>
                </div>
              ) : (
                s.img && (
                  <img
                    key={s.title}
                    src={s.img}
                    alt={s.alt ?? ""}
                    loading="lazy"
                    decoding="async"
                    style={i === active ? undefined : { visibility: "hidden" }}
                    aria-hidden={i !== active}
                  />
                )
              )
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
                {s.body && <p className="how-step-body">{s.body}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
