import BrowserDemo from "./BrowserDemo";
import { CHROME_STORE_URL } from "@/lib/seo";

export default function Hero() {
  return (
    <header className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 className="display">
              A <span className="accent">comment section</span>
              <br />
              for streaming services.
            </h1>
            <p className="sub">Stop watching alone. Watch with everyone.</p>
            <div className="ctas">
              <a
                className="btn-appstore"
                href={CHROME_STORE_URL}
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
          </div>

          <BrowserDemo />
        </div>

        <div className="hero-streamers">
          <div className="streamers-inner">
            <span className="streamers-label">Add a comment section to</span>
            <div className="logo-strip">
              <img className="logo logo-netflix" src="/logos/netflix.svg" alt="Netflix" />
              <img className="logo logo-hulu" src="/logos/hulu.svg" alt="Hulu" />
              <img className="logo logo-disney" src="/logos/disneyplus.svg" alt="Disney+" />
              <img className="logo logo-max" src="/logos/max.svg" alt="HBO Max" />
              <img className="logo logo-cr" src="/logos/crunchyroll.svg" alt="Crunchyroll" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
