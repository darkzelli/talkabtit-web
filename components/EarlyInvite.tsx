"use client";

import { useEffect, useState } from "react";
import { CHROME_STORE_URL } from "@/lib/seo";

/* Reads ?code= off the URL after mount (the site is a static export, so
   there's no server to read it), shows it big with a copy button, and walks
   through the claim. The extension pop-up reads the same URL off the active
   tab and fills the code in, so "open the pop-up and hit Claim" is the whole
   flow for someone who already has TalkAbtIT installed. */
function normalize(raw: string | null): string | null {
  const s = (raw ?? "").replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  return s.length === 8 ? `${s.slice(0, 4)}-${s.slice(4)}` : null;
}

function Ticket() {
  return (
    <svg className="invite-ticket" viewBox="0 0 120 110" fill="none" aria-hidden="true">
      <g
        transform="rotate(-12 60 56)"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19.5 31.5C46 30.5 74 31 101 32C105 32 107.5 34.5 107.5 38.5L108 48.5C102 50.5 99.5 53 99.5 56.5C99.5 60 102.5 62.5 108 64L107.5 74C107.5 78 105 80.5 101 80.5C74 81.5 46 81 19.5 80.5C15.5 80.5 13 78 13 74L12.5 64C18 62.5 21 60 21 56.5C21 53 18 50.5 12.5 48.5L13 38.5C13 34.5 15.5 32 19.5 31.5Z" />
        <path d="M38 38.5V74" strokeDasharray="5 6" />
        <path d="M56 48.5L82 48.5M56 56.5L86 56.5M56 64.5L74 64.5" strokeWidth="4" />
      </g>
    </svg>
  );
}

export default function EarlyInvite() {
  const [code, setCode] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCode(normalize(new URLSearchParams(window.location.search).get("code")));
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
          <span className="kicker">Early supporter</span>
          <h1 className="display">
            <Ticket /> You&apos;re invited
          </h1>
          <p className="lede">
            Thanks for being here before everyone else. This invite makes your
            account an early supporter: every Pro perk, for life, and the
            ticket badge next to your name that nobody can buy.
          </p>
          {ready && code && (
            <div className="invite-code-box">
              <span className="invite-code-label">Your invite code</span>
              <code className="invite-code">{code}</code>
              <button type="button" className="btn btn-white btn-sm invite-copy" onClick={copy}>
                {copied ? "Copied" : "Copy code"}
              </button>
              <p className="invite-limit">
                Invites are limited — each link only works for so many people, first come first served.
              </p>
            </div>
          )}
          {ready && !code && (
            <div className="invite-code-box">
              <p className="invite-limit">
                This link is missing its code. Ask whoever sent it for the full
                link — it ends in <code>?code=XXXX-XXXX</code>.
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
                  Stay on this page and click the TalkAbtIT popcorn icon. Your
                  invite card is at the top with the code already filled in.
                  (Don&apos;t see it? Tap <em>Have an invite code?</em> at the
                  bottom of the pop-up and paste the code.)
                </p>
              </div>
            </li>
            <li className="install-step">
              <div className="install-step-copy">
                <span className="svc-step-kicker">Step 3</span>
                <h2 className="display">Hit Claim</h2>
                <p>
                  That&apos;s it. Pro is on your account for good, the ticket
                  is on your name, and you can pick any badge you own from
                  Customize.
                </p>
              </div>
            </li>
          </ol>

          <div className="prose install-next">
            <h2>What early supporters get</h2>
            <p>
              Everything in <a href="/premium/">Pro</a> — unlimited comments,
              pop-up comments, custom name color and style, uploaded and GIF
              profile pics, pop-up backgrounds — with no subscription and no
              expiry. Plus the early supporter badge, which is only ever handed
              out through these invites.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
