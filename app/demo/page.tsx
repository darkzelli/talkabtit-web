import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DemoStage from "@/components/DemoStage";
import { OG_IMAGE, SITE_URL, SITE_NAME, CHROME_STORE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Live Demo",
  description:
    "Try TalkAbtIT without installing it. A working player with the real comment overlay: open the sidebar, sort the thread, post a comment pinned to the moment, and watch time-stamped pop-ups land over the video.",
  alternates: { canonical: "/demo/" },
  openGraph: {
    title: `Live Demo — ${SITE_NAME}`,
    description:
      "A playable copy of the extension: the comment sidebar, timed pop-ups, spoiler blur and all — running right on the page.",
    url: "/demo/",
    images: [OG_IMAGE],
  },
};

// Marks the page as an interactive demo of the extension, linked back to the
// SoftwareApplication node the root layout publishes.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/demo/#webpage`,
  url: `${SITE_URL}/demo/`,
  name: `Live Demo — ${SITE_NAME}`,
  description:
    "An in-browser demo of the TalkAbtIT comment overlay for streaming services.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#app` },
};

// The services the overlay layers onto — the same marks (and landing-page
// links) the home hero scatters, lined up under the player.
// gd = offset into the shared 21s glow cycle (6 slots of 3.5s), so exactly one
// mark is lit at a time. Slot order hops along the row on purpose, the way the
// hero's does — consecutive slots are never neighbors, so the glow wanders
// instead of sweeping left to right.
const SERVICES = [
  { href: "/netflix/", label: "Netflix comment section", src: "/logos/netflix.svg", gd: 0 },
  { href: "/hulu/", label: "Hulu comment section", src: "/logos/hulu.svg", gd: 7 },
  { href: "/disney-plus/", label: "Disney+ comment section", src: "/logos/disneyplus.svg", gd: 14 },
  { href: "/hbo-max/", label: "HBO Max comment section", src: "/logos/max.svg", gd: 3.5 },
  { href: "/paramount-plus/", label: "Paramount+ comment section", src: "/logos/paramountplus.svg", gd: 17.5 },
  { href: "/crunchyroll/", label: "Crunchyroll comment section", src: "/logos/crunchyroll.svg", gd: 10.5 },
];

export default function DemoPage() {
  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main className="demo-page">
        {/* the player carries the page on its own; the h1 stays for search and
            screen readers only */}
        <h1 className="demo-h1">
          TalkAbtIT live demo — the comment section, exactly as it ships
        </h1>

        <div className="demo-stage-col">
          {/* the ask: a plain store link, tagged so the store-click listener in
              the layout knows it came from the demo */}
          <div className="demo-cta">
            <a
              className="demo-store-link"
              href={CHROME_STORE_URL}
              data-cta="demo"
              target="_blank"
              rel="noopener"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V22c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V24H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" />
              </svg>
              <span>Available on the Chrome Web Store</span>
            </a>
          </div>

          <DemoStage />

          <div className="demo-services">
            <span className="demo-services-label">Works on:</span>
            {SERVICES.map((s) => (
              <a
                key={s.href}
                className="demo-service"
                href={s.href}
                aria-label={s.label}
                style={{ "--gd": `${s.gd}s` } as React.CSSProperties}
              >
                <img src={s.src} alt="" />
              </a>
            ))}
          </div>

          {/* what you are looking at, and what the demo does not do — left
              aligned under the marks so it reads as body copy, not a banner */}
          <section className="demo-about">
            <h2>How the demo works</h2>
            <p>
              Click the popcorn bucket at the right edge of the player and a panel slides out showing
              comments. Leave a comment and it pins to the moment you are at, popping up over the
              video when the runtime reaches it.
            </p>
            <p>
              Everything behaves the way it does in the extension — sorting, likes, replies, spoiler
              blur, reporting, GIFs, the pop-up duration picker. Two differences: this thread lives
              in your browser tab, and the GIF tab searches a handful of samples rather than the
              full Klipy library. <b>Nothing you type here is posted or saved.</b>
            </p>
          </section>
        </div>
      </main>
      <Footer sub />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
