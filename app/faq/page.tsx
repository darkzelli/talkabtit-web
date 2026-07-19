import type { Metadata } from "next";
import type { ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FAQ — TalkAbtit",
  description:
    "Answers to common questions about TalkAbtit — the app that adds a live, time-stamped comment section to Netflix, Hulu, Disney+, Max, Prime Video, and Crunchyroll.",
};

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "What is TalkAbtit?",
    a: (
      <>
        TalkAbtit adds a live comment section to the streaming services you
        already use. Every comment is pinned to the exact moment in the show, so
        you can react together — even when you&apos;re watching on your own time.
      </>
    ),
  },
  {
    q: "Which streaming services work with it?",
    a: (
      <>
        Netflix, Hulu, Disney+, Max, Prime Video, and Crunchyroll. You can watch
        right inside the app, or keep playing on your TV and follow the comments
        on your phone.
      </>
    ),
  },
  {
    q: "Do I need my own subscriptions?",
    a: (
      <>
        Yes. TalkAbtit doesn&apos;t include or replace any subscription —
        you&apos;ll need your own account with each service. You sign in directly
        with the service, so your login details never pass through us.
      </>
    ),
  },
  {
    q: "Is this legal? Is it a piracy app?",
    a: (
      <>
        No, it&apos;s not piracy. TalkAbtit doesn&apos;t stream, host, download,
        or unlock any content. All video plays through your own account with the
        streaming service. We simply add a conversation layer on top.
      </>
    ),
  },
  {
    q: "Does TalkAbtit see my streaming passwords?",
    a: (
      <>
        No. You log in directly with each streaming service, and those
        credentials never pass through our servers. See our{" "}
        <a href="/privacy">Privacy Policy</a> for the details on what we do and
        don&apos;t collect.
      </>
    ),
  },
  {
    q: "How do comments stay in sync with the show?",
    a: (
      <>
        Comments are timestamped to the show&apos;s runtime rather than to the
        clock. When you reach 12:04 in an episode, you see what everyone said at
        12:04 — no spoilers from further ahead.
      </>
    ),
  },
  {
    q: "Can I watch on my TV and still see the comments?",
    a: (
      <>
        Yes. Keep playing on your TV and use TalkAbtit as a second screen — the
        comments stay synced to the show&apos;s runtime while you watch on the
        big screen.
      </>
    ),
  },
  {
    q: "How do I sign up?",
    a: (
      <>
        Download the app and sign in with your Apple ID, then pick a username —
        that&apos;s the name everyone sees next to your comments. The whole thing
        takes a few seconds.
      </>
    ),
  },
  {
    q: "Is it free?",
    a: (
      <>
        Yes — the core experience is free with the subscriptions you already
        have. An optional Pro upgrade unlocks extra customization like avatars,
        colors, and comment styling.
      </>
    ),
  },
  {
    q: "What can I customize?",
    a: (
      <>
        With Pro you can personalize how you show up in the conversation —
        avatars, name and bubble colors, and more — so your comments look like
        you.
      </>
    ),
  },
  {
    q: "How do I report a comment or block someone?",
    a: (
      <>
        Every comment can be reported from the app, and you can block users you
        don&apos;t want to hear from. We review reports and remove content that
        breaks our <a href="/terms">community guidelines</a>.
      </>
    ),
  },
  {
    q: "Which devices are supported?",
    a: <>TalkAbtit is available on iPhone. Support for more devices is on the way.</>,
  },
  {
    q: "How do I delete my account and data?",
    a: (
      <>
        You can delete your account from within the app at any time, which
        removes your profile and associated data. See our{" "}
        <a href="/privacy">Privacy Policy</a> for what happens to your
        information when you do.
      </>
    ),
  },
];

function Chevron() {
  return (
    <svg
      className="chev"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function FAQPage() {
  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <header className="page-hero">
          <div className="wrap">
            <span className="kicker">Questions &amp; answers</span>
            <h1 className="display">Frequently asked questions</h1>
            <p className="lede">
              Everything about how TalkAbtit works — the comment section for your
              favorite streaming service.
            </p>
          </div>
        </header>

        <section className="content">
          <div className="wrap">
            <div className="faq-list">
              {FAQS.map((item) => (
                <details className="faq-item" key={item.q}>
                  <summary>
                    {item.q}
                    <Chevron />
                  </summary>
                  <p className="answer">{item.a}</p>
                </details>
              ))}
            </div>

            <div className="contact-card">
              <h3 className="display">Still have a question?</h3>
              <p>
                Reach us at{" "}
                <a href="mailto:support@talkabtit.com">support@talkabtit.com</a>{" "}
                and we&apos;ll get back to you.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer sub />
    </>
  );
}
