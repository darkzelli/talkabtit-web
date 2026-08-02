import BrowserDemo from "./BrowserDemo";
import { CHROME_STORE_URL } from "@/lib/seo";

export default function Hero() {
  return (
    <header className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="kicker">Join the conversation</span>
            <h1 className="display">
              A <span className="accent">comment section</span> for your
              favorite streaming service.
            </h1>
            <p className="sub">
              No one to watch with? No problem. Add TalkAbtIT to your browser
              and talk about your favorite shows with everyone.
            </p>
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
          <div className="logo-strip">
            <img className="logo logo-netflix" src="/logos/netflix.svg" alt="Netflix" />
            <img className="logo logo-hulu" src="/logos/hulu.svg" alt="Hulu" />
            <img className="logo logo-disney" src="/logos/disneyplus.svg" alt="Disney+" />
            <img className="logo logo-max" src="/logos/max.svg" alt="Max" />
            <img className="logo logo-prime" src="/logos/primevideo.svg" alt="Prime Video" />
            <img className="logo logo-cr" src="/logos/crunchyroll.svg" alt="Crunchyroll" />
          </div>
        </div>

        <div className="disclaimer">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <span>
            Subscriptions not included — you'll need your own account with each
            service. TalkAbtIT isn't piracy: we don't stream, host, or
            unlock any content. You sign in directly with the service, and your
            login details never pass through us. TalkAbtIT is not affiliated
            with, endorsed by, or sponsored by any of these streaming services —
            all names and logos are trademarks of their respective owners.
          </span>
        </div>
      </div>
    </header>
  );
}
