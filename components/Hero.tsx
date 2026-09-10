import BrowserDemo from "./BrowserDemo";
import MobileReminder from "./MobileReminder";
import { CHROME_STORE_URL } from "@/lib/seo";

// Streaming wordmarks scattered across the hero as a ghosted background layer.
// Each one still links to its service landing page and lights up to full brand
// color on hover — and, motion permitting, glows up on its own now and then.
// Positions are hand-placed percent coords that hug the empty flanks left and
// right of the centered demo column (~28–72% is content), deliberately jittered
// in x, spacing, size and tilt so the scatter doesn't read as two neat columns.
// x/y = center of the mark, h = height in px, r = rotation in degrees.
// gd = offset into the shared 42s glow cycle (12 slots of 3.5s), so exactly one
// mark is lit at a time. Slot order hops between sides and heights on purpose —
// consecutive slots are never neighbors, so the glow appears to wander.
// Mobile shows only the first six entries (one of each service, nth-child rule
// in globals.css), so the left flank has to lead with the full unique set.
const BG_LOGOS = [
  { href: "/crunchyroll/", label: "Crunchyroll comment section", src: "/logos/crunchyroll.svg", x: 22, y: 9, h: 24, r: 6, gd: 0 },
  { href: "/netflix/", label: "Netflix comment section", src: "/logos/netflix.svg", x: 10, y: 24, h: 20, r: -12, gd: 21 },
  { href: "/hulu/", label: "Hulu comment section", src: "/logos/hulu.svg", x: 18, y: 47, h: 32, r: 8, gd: 14 },
  { href: "/disney-plus/", label: "Disney+ comment section", src: "/logos/disneyplus.svg", x: 5, y: 66, h: 38, r: -7, gd: 28 },
  { href: "/hbo-max/", label: "HBO Max comment section", src: "/logos/max.svg", x: 14, y: 88, h: 48, r: 10, gd: 7 },
  { href: "/paramount-plus/", label: "Paramount+ comment section", src: "/logos/paramountplus.svg", x: 9, y: 36, h: 24, r: 9, gd: 35 },
  { href: "/hbo-max/", label: "HBO Max comment section", src: "/logos/max.svg", x: 79, y: 13, h: 30, r: -9, gd: 10.5 },
  { href: "/netflix/", label: "Netflix comment section", src: "/logos/netflix.svg", x: 93, y: 34, h: 30, r: 6, gd: 3.5 },
  { href: "/disney-plus/", label: "Disney+ comment section", src: "/logos/disneyplus.svg", x: 84, y: 54, h: 52, r: -4, gd: 38.5 },
  { href: "/hulu/", label: "Hulu comment section", src: "/logos/hulu.svg", x: 95, y: 72, h: 22, r: 11, gd: 31.5 },
  { href: "/crunchyroll/", label: "Crunchyroll comment section", src: "/logos/crunchyroll.svg", x: 80, y: 91, h: 34, r: -8, gd: 17.5 },
  { href: "/paramount-plus/", label: "Paramount+ comment section", src: "/logos/paramountplus.svg", x: 90, y: 23, h: 26, r: -5, gd: 24.5 },
];

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-bg-logos" aria-hidden="true">
        {BG_LOGOS.map((l, i) => (
          <a
            key={i}
            className="bg-logo"
            href={l.href}
            aria-label={l.label}
            tabIndex={-1}
            style={
              {
                left: `${l.x}%`,
                top: `${l.y}%`,
                height: `${l.h}px`,
                "--r": `${l.r}deg`,
                "--gd": `${l.gd}s`,
              } as React.CSSProperties
            }
          >
            <img src={l.src} alt="" />
          </a>
        ))}
      </div>

      <div className="wrap">
        {/* one centered column: headline, the browser demo, then the tagline
            sitting beside the CTA */}
        <div className="hero-copy">
          <h1 className="display">
            A <span className="accent">comment section</span>
            <br />
            for streaming services.
          </h1>
        </div>

        <BrowserDemo />

        <div className="ctas">
          <p className="sub">Stop watching alone. Watch with everyone.</p>
          <a
            className="btn-appstore"
            href={CHROME_STORE_URL}
            data-cta="hero"
            target="_blank"
            rel="noopener"
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V22c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V24H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" />
            </svg>
            <span className="btn-appstore-text">
              Get TalkAbtIT
              <small>Free · Chrome Web Store</small>
            </span>
          </a>
        </div>

        <MobileReminder />
      </div>
    </header>
  );
}
