"use client";

import { useState, type FormEvent } from "react";
import { CHROME_STORE_URL } from "@/lib/seo";

// formsubmit.co relays the submission to the support inbox with no backend
// and auto-replies to the visitor with the install link (_autoresponse).
// NOTE: the first-ever submission emails support@ an activation link — until
// that's clicked, nothing is delivered.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/support@talkabtit.app";

// Fires a GA event when gtag has loaded; the form works fine without it.
function track(action: string) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", action, { cta_location: "mobile-reminder" });
}

type Status = "idle" | "sending" | "sent" | "error";

// Shown only on touch devices, where the store CTAs hide (globals.css): a
// phone can't install a Chrome extension, so instead of a dead-end store
// button the visitor leaves an email and gets the install link to open later
// on their computer.
export default function MobileReminder() {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!email) return;
    setStatus("sending");
    track("remind_me_submit");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email,
          _subject: "TalkAbtIT reminder signup (mobile site)",
          _template: "table",
          _autoresponse:
            "Here's TalkAbtIT, ready for when you're at your computer.\n\n" +
            `Open this link in Chrome on your desktop to install — it's free:\n${CHROME_STORE_URL}\n\n` +
            "Stop watching alone. Watch with everyone.",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      track("remind_me_sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mobile-reminder">
      <p className="mr-label">Remind me later</p>
      <p className="mr-sub">
        TalkAbtIT installs on desktop Chrome. Drop your email and we&apos;ll
        send you the link for when you&apos;re at your computer.
      </p>
      {status === "sent" ? (
        <p className="mr-done">Sent — check your inbox for the install link.</p>
      ) : (
        <>
          <form className="mr-form" onSubmit={submit}>
            <input
              type="email"
              name="email"
              required
              placeholder="you@email.com"
              autoComplete="email"
              inputMode="email"
              aria-label="Email address"
            />
            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Remind me"}
            </button>
          </form>
          {status === "error" && (
            <p className="mr-error">Couldn&apos;t send — try again in a minute.</p>
          )}
        </>
      )}
    </div>
  );
}
