import type { Metadata } from "next";
import type { ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Closing from "@/components/Closing";
import { SITE_URL, CHROME_STORE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "TalkAbtIT vs Teleparty",
  description:
    "Looking for a Teleparty alternative? TalkAbtIT adds a time-stamped comment section to Netflix, Hulu, Disney+, HBO Max, and Crunchyroll — no scheduling, no synced session. See how the two compare.",
  alternates: { canonical: "/teleparty-alternative/" },
  openGraph: {
    title: "TalkAbtIT vs Teleparty",
    description:
      "A Teleparty alternative that works on your schedule — comments pinned to the exact moment in the show, no synced session needed.",
    url: "/teleparty-alternative/",
  },
};

// Honest side-by-side: Teleparty is a live watch-party tool, TalkAbtIT is an
// async comment section. Rows stay factual — this page ranks and converts on
// clarity, not trash talk.
const ROWS: { label: string; us: string; them: string }[] = [
  {
    label: "How you watch",
    us: "On your own schedule — comments are pinned to timestamps in the show",
    them: "Live — everyone joins a session and watches at the same time",
  },
  {
    label: "The conversation",
    us: "A permanent comment section on every episode that grows over time",
    them: "A live chat that lasts as long as the party",
  },
  {
    label: "Scheduling",
    us: "None — watch at 2am and the reactions are already there",
    them: "Everyone needs to be free at the same time",
  },
  {
    label: "Spoiler protection",
    us: "You only see comments up to the moment you're at; spoilers stay blurred",
    them: "Not needed — everyone is at the same moment",
  },
  {
    label: "Streaming services",
    us: "Netflix, Hulu, Disney+, HBO Max, Crunchyroll",
    them: "Netflix, Hulu, Disney+, HBO Max, and more",
  },
  {
    label: "Price",
    us: "Free — unlimited comments; optional cosmetic Premium",
    them: "Free, with optional paid upgrades",
  },
];

const FAQS: { q: string; a: ReactNode; text: string }[] = [
  {
    q: "Is TalkAbtIT a Teleparty alternative?",
    a: (
      <>
        Yes, if what you want is to not watch alone. But they solve it
        differently: Teleparty syncs everyone into one live session, while
        TalkAbtIT pins comments to timestamps so the shared experience works
        even when everyone watches at different times.
      </>
    ),
    text: "Yes, if what you want is to not watch alone. But they solve it differently: Teleparty syncs everyone into one live session, while TalkAbtIT pins comments to timestamps so the shared experience works even when everyone watches at different times.",
  },
  {
    q: "Does TalkAbtIT do synced watch parties like Teleparty?",
    a: (
      <>
        No — and that&apos;s the point. There&apos;s no session to create, no
        link to send, and nothing to schedule. You press play whenever you
        want, and the conversation is already there, synced to the show instead
        of to other people&apos;s calendars.
      </>
    ),
    text: "No — and that's the point. There's no session to create, no link to send, and nothing to schedule. You press play whenever you want, and the conversation is already there, synced to the show instead of to other people's calendars.",
  },
  {
    q: "Can I use TalkAbtIT and Teleparty together?",
    a: (
      <>
        They&apos;re separate extensions, so you can have both installed and
        use whichever fits the night — a scheduled live party, or comments on
        your own time.
      </>
    ),
    text: "They're separate extensions, so you can have both installed and use whichever fits the night — a scheduled live party, or comments on your own time.",
  },
  {
    q: "Is TalkAbtIT free?",
    a: (
      <>
        Yes. Commenting and reading are free and unlimited — no daily caps, no
        locked threads. An optional Premium upgrade adds cosmetic extras like
        pop-up comments and name styles.
      </>
    ),
    text: "Yes. Commenting and reading are free and unlimited — no daily caps, no locked threads. An optional Premium upgrade adds cosmetic extras like pop-up comments and name styles.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/teleparty-alternative/#faq`,
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.text },
  })),
};

function ExtensionIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V22c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V24H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg
      className="chev"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function TelepartyAlternativePage() {
  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <header className="page-hero">
          <div className="wrap">
            <span className="kicker">Teleparty alternative</span>
            <h1 className="display">
              TalkAbtIT <span className="accent">vs</span> Teleparty
            </h1>
            <p className="lede">
              Both fix watching alone. Teleparty does it with live, synced
              watch parties. TalkAbtIT does it with a comment section pinned to
              every moment of the show — so it works even when nobody&apos;s
              free at the same time.
            </p>
            <a
              className="btn-appstore svc-cta"
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener"
            >
              <ExtensionIcon />
              <span className="btn-appstore-text">
                Get TalkAbtIT
                <small>Free · Chrome Web Store</small>
              </span>
            </a>
          </div>
        </header>

        <section className="content">
          <div className="wrap">
            <div className="prose">
              <h2>The short version</h2>
              <p>
                Teleparty (formerly Netflix Party) is a watch-party extension:
                you create a session, send a link, and everyone watches the
                same thing at the same time with a live chat beside it.
                It&apos;s great when the group is actually free together.
              </p>
              <p>
                TalkAbtIT starts from the opposite reality: most of the time,
                nobody&apos;s free together. So instead of syncing people, it
                syncs the conversation to the show — every comment is pinned to
                the exact timestamp it&apos;s about, on every episode,
                permanently. Watch tonight, and your reactions are waiting for
                whoever watches next.
              </p>

              <h2>Side by side</h2>
            </div>

            <div className="vs-scroll">
              <table className="vs-table">
                <thead>
                  <tr>
                    <th aria-hidden="true"></th>
                    <th>TalkAbtIT</th>
                    <th>Teleparty</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.label}>
                      <td>{row.label}</td>
                      <td>{row.us}</td>
                      <td>{row.them}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="prose">
              <h2>Which one should you use?</h2>
              <p>
                If your group can actually get together at the same time and
                you want a live hangout, Teleparty is built for exactly that.
              </p>
              <p>
                If you watch on your own schedule — late nights, lunch breaks,
                three episodes ahead of your friends — TalkAbtIT gives you the
                watching-together feeling without the scheduling. And since
                comments accumulate on every episode, the conversation gets
                better the more people watch, not just while a party is
                running.
              </p>

              <h2>TalkAbtIT vs Teleparty FAQ</h2>
            </div>

            <div className="faq-list svc-faq">
              {FAQS.map((item) => (
                <details className="faq-item" key={item.q}>
                  <summary>
                    {item.q}
                    <Chevron />
                  </summary>
                  <p className="answer">{item.a}</p>
                </details>
              ))}
            </div>

            <p className="svc-disclaimer">
              Teleparty is a trademark of its respective owner. TalkAbtIT is an
              independent product and is not affiliated with, endorsed by, or
              sponsored by Teleparty or any streaming service.
            </p>
          </div>
        </section>

        <Closing />
      </main>
      <Footer sub />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
