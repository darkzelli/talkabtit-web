"use client";

import { useEffect, useState, type FormEvent } from "react";

// Same formsubmit.co relay the mobile reminder uses (see MobileReminder.tsx):
// the request lands in the support inbox as an "Unsubscribe request" email,
// which is the do-not-email list — check it before any send. Nothing here
// stops sends automatically; there's no mailing list to remove anyone from.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/support@talkabtit.app";

type Status = "idle" | "sending" | "sent" | "error";

export default function UnsubscribeForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");

  // Links in our emails carry ?email=… so the field is prefilled and opting
  // out is one tap. Read on the client: the page is statically exported.
  useEffect(() => {
    const fromLink = new URLSearchParams(window.location.search).get("email");
    if (fromLink) setEmail(fromLink.trim());
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const address = email.trim();
    if (!address) return;
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email: address,
          request: "Unsubscribe from all TalkAbtIT emails",
          _subject: "Unsubscribe request",
          _template: "table",
        }),
      });
      // FormSubmit answers 200 even when it drops the submission, so the body
      // is the real verdict (same reasoning as MobileReminder).
      const body: { success?: string; message?: string } | null = await res
        .json()
        .catch(() => null);
      if (!res.ok || body?.success !== "true") {
        throw new Error(body?.message ?? String(res.status));
      }
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="unsub-done" role="status">
        Done — you won&apos;t hear from us by email again.
      </p>
    );
  }

  return (
    <form className="unsub-form" onSubmit={submit}>
      <label htmlFor="unsub-email">Email address</label>
      <div className="unsub-row">
        <input
          id="unsub-email"
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          autoComplete="email"
          inputMode="email"
        />
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Unsubscribe"}
        </button>
      </div>
      {status === "error" && (
        <p className="unsub-error" role="alert">
          Couldn&apos;t send — try again in a minute, or email{" "}
          <a href="mailto:support@talkabtit.app?subject=Unsubscribe">
            support@talkabtit.app
          </a>
          .
        </p>
      )}
    </form>
  );
}
