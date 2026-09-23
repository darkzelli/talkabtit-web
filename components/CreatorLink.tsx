"use client";

import { useEffect, useState } from "react";
import { CHROME_STORE_URL } from "@/lib/seo";

/* Reads ?ref= off the URL after mount (static export, no server), shows the
   creator code big with a copy button, and walks through linking it. The
   extension pop-up reads the same URL off the active tab and fills the code
   into its referral card, so "open the pop-up and hit Support" is the whole
   flow for someone who already has TalkAbtIT installed. Mirrors EarlyInvite. */
function normalize(raw: string | null): string | null {
  const s = (raw ?? "").replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  return s.length === 8 ? `${s.slice(0, 4)}-${s.slice(4)}` : null;
}

/* The creator badge — the same hand-drawn camera as the extension's
   assets/creator-badge.svg, in currentColor. */
export function Camera({ className = "invite-cam" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 110" fill="none" aria-hidden="true">
      <g
        transform="rotate(-8 60 60)"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 41.5C40 40.5 60 40 98 41C102.5 41 105 43.5 105 47.5C105.5 61 105 75 104.5 85C104.5 89 102 91.5 98 91.5C70 92.5 42 92 22 91.5C18 91.5 15.5 89 15.5 85C15 74 15 60 15.5 47.5C15.5 43.5 18 41 22 41.5Z" />
        <path d="M36 41C37 35 40 31 45.5 30.5C52 30 58 30 63 30.5C68 31 71 35 72 41" />
        <path d="M82 40.5V34.5C82 32 84 30.5 87 30.5C90 30.5 92 32 92 34.5V40.5" strokeWidth="4" />
        <circle cx="58" cy="66" r="16.5" />
        <circle cx="58" cy="66" r="7" strokeWidth="4" />
        <path d="M91.5 52.5L91.5 53" strokeWidth="6" />
      </g>
    </svg>
  );
}

export default function CreatorLink() {
  const [code, setCode] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCode(normalize(new URLSearchParams(window.location.search).get("ref")));
    setReady(true);
  }, []);

  const copy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — the code is right there to select */
    }
  };

  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <span className="kicker">Creator link</span>
          <h1 className="display">
            <Camera /> You came from a creator
          </h1>
          <p className="lede">
            Someone you watch sent you here. Link their code to your TalkAbtIT
            account and, if you ever go Plus or Pro, they earn a cut of your
            first payment. It costs you nothing, changes nothing about your
            price, and takes one tap.
          </p>
          {ready && code && (
            <div className="invite-code-box">
              <span className="invite-code-label">Their creator code</span>
              <code className="invite-code">{code}</code>
              <button type="button" className="btn btn-white btn-sm invite-copy" onClick={copy}>
                {copied ? "Copied" : "Copy code"}
              </button>
              <p className="invite-limit">
                One creator per account, and it has to happen before you subscribe — so do it now, even if
                you&apos;re staying free.
              </p>
            </div>
          )}
          {ready && !code && (
            <div className="invite-code-box">
              <p className="invite-limit">
                This link is missing its code. Ask whoever sent it for the full
                link — it ends in <code>?ref=XXXX-XXXX</code>.
              </p>
            </div>
          )}
        </div>
      </header>

      <section className="content">
        <div className="wrap">
          <ol className="install-steps invite-steps">
            <li className="install-step">
              <div className="install-step-copy">
                <span className="svc-step-kicker">Step 1</span>
                <h2 className="display">Install TalkAbtIT and sign in</h2>
                <p>
                  Already have it? Skip ahead. Otherwise{" "}
                  <a href={CHROME_STORE_URL} target="_blank" rel="noopener">
                    add it from the Chrome Web Store
                  </a>
                  , click the popcorn icon in your toolbar, and sign in with
                  Google, GitHub, or your email.
                </p>
              </div>
            </li>
            <li className="install-step">
              <div className="install-step-copy">
                <span className="svc-step-kicker">Step 2</span>
                <h2 className="display">Open the pop-up on this tab</h2>
                <p>
                  Stay on this page and click the TalkAbtIT popcorn icon. The
                  creator card is at the top with the code already filled in.
                  (Don&apos;t see it? Tap <em>Supporting a creator?</em> at the
                  bottom of the pop-up and paste the code.)
                </p>
              </div>
            </li>
            <li className="install-step">
              <div className="install-step-copy">
                <span className="svc-step-kicker">Step 3</span>
                <h2 className="display">Hit Support</h2>
                <p>
                  Done. Your account now says who you&apos;re supporting, and
                  they get their cut automatically if you ever subscribe —
                  nothing else to remember.
                </p>
              </div>
            </li>
          </ol>

          <div className="prose install-next">
            <h2>How creator links work</h2>
            <p>
              Creators are people we&apos;ve invited: they wear the camera
              badge next to their name and get Pro for life. When someone who
              linked their code starts a <a href="/premium/">Plus or Pro</a>{" "}
              subscription, the creator earns a share of that first payment,
              paid out through Stripe. Your price is the same either way.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
