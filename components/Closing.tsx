import { CHROME_STORE_URL } from "@/lib/seo";

export default function Closing() {
  return (
    <section id="get" className="closing wrap">
      <div className="banner">
        <h2 className="display">Stop watching alone. Watch with everyone.</h2>
        <p>
          Add TalkAbtIT to your browser and talk about your favorite shows.
        </p>
        <a
          className="btn btn-white btn-lg btn-icon"
          href={CHROME_STORE_URL}
          target="_blank"
          rel="noopener"
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V22c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V24H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" />
          </svg>
          <span>
            Get TalkAbtIT<span className="btn-free"> — Free</span>
          </span>
        </a>
      </div>
    </section>
  );
}
