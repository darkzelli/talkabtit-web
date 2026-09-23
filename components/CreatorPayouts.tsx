"use client";

import { useEffect, useState } from "react";
import { Camera } from "@/components/CreatorLink";

/* The Connect return page. ?connect=done means Stripe finished the
   onboarding flow (it may still be verifying details — the pop-up's
   creator card asks Stripe for the live status on open); ?connect=refresh
   means the onboarding link expired or was reopened, so they need a fresh
   one from the pop-up. Anything else is someone who typed the URL. */
type Mode = "done" | "refresh" | "other";

export default function CreatorPayouts() {
  const [mode, setMode] = useState<Mode>("other");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("connect");
    setMode(c === "done" ? "done" : c === "refresh" ? "refresh" : "other");
    setReady(true);
  }, []);

  return (
    <header className="page-hero">
      <div className="wrap">
        <span className="kicker">Creator payouts</span>
        {ready && mode === "done" && (
          <>
            <h1 className="display">
              <Camera /> Payouts are set up
            </h1>
            <p className="lede">
              Stripe has what it needs. Open the TalkAbtIT pop-up again — your
              creator card now reads <em>Open payout dashboard</em>, and each
              commission transfers to your Stripe account 30 days after the
              subscription it came from starts. If Stripe is still verifying
              your details it may say <em>Finish payout setup</em> for a little
              while; that clears on its own.
            </p>
          </>
        )}
        {ready && mode === "refresh" && (
          <>
            <h1 className="display">
              <Camera /> That link expired
            </h1>
            <p className="lede">
              Stripe onboarding links only last a few minutes. Open the
              TalkAbtIT pop-up and tap <em>Finish payout setup</em> to get a
              fresh one — you&apos;ll pick up where you left off.
            </p>
          </>
        )}
        {ready && mode === "other" && (
          <>
            <h1 className="display">
              <Camera /> Creator payouts
            </h1>
            <p className="lede">
              Creators set up and manage payouts from the TalkAbtIT pop-up:
              open it, find the Creator card, and tap the payouts button.
              Stripe handles bank details, identity and tax forms.
            </p>
          </>
        )}
      </div>
    </header>
  );
}
