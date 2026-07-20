import PhoneDemo from "./PhoneDemo";

export default function Hero() {
  return (
    <header className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="kicker">Watch with everyone</span>
            <h1 className="display">
              A <span className="accent">comment section</span> for your
              favorite streaming service.
            </h1>
            <p className="sub">
              No one to watch with? No problem. Join the conversation and talk
              about your favorite shows — with time-stamped comments synced to
              the video.
            </p>
            <div className="ctas">
              <a className="btn-appstore" href="#get">
                <svg
                  viewBox="0 0 384 512"
                  width="24"
                  height="24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.7-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
                <span className="btn-appstore-text">Download Now</span>
              </a>
            </div>
          </div>

          <PhoneDemo />
        </div>

        <div className="hero-streamers">
          <div className="wordmarks">
            <span className="wm wm-netflix">NETFLIX</span>
            <span className="wm wm-hulu">hulu</span>
            <span className="wm wm-disney">Disney+</span>
            <span className="wm wm-max">MAX</span>
            <span className="wm wm-prime">prime video</span>
            <span className="wm wm-cr">crunchyroll</span>
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
            service. TalkAbtIT isn't a piracy app: we don't stream, host, or
            unlock any content. You sign in directly with the service, and your
            login details never pass through us.
          </span>
        </div>
      </div>
    </header>
  );
}
