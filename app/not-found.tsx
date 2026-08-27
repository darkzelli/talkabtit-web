import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

// 404 wears the splash's outfit (dark base, ambient glow, Handjet display).
// The popcorn-bucket mark stands in for about's "o" — the same trick as the
// wordmark, where the bucket spells "Abt".
export default function NotFound() {
  return (
    <>
      <div className="glow" />
      <main className="coming">
        <div className="coming-inner">
          <span className="kicker">Error 404</span>
          <h1
            className="display nf-title"
            aria-label="No one’s talking about that."
          >
            <span aria-hidden="true">
              No one&rsquo;s talking
              <br />
              ab
              <img className="nf-mark" src="/mark.svg" alt="" />
              ut <span className="accent">that.</span>
            </span>
          </h1>
          <p className="coming-sub">
            Whatever page you were looking for isn&rsquo;t part of the
            conversation.
          </p>
          <a className="btn btn-brand nf-home" href="/">
            Back to the homepage
          </a>
        </div>
      </main>
    </>
  );
}
