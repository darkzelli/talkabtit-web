import type { Metadata } from "next";
import type { ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE_URL, OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about TalkAbtIT — the browser extension that adds a time-stamped comment section to Netflix, Hulu, Disney+, HBO Max, and Crunchyroll.",
  alternates: { canonical: "/support/" },
  openGraph: {
    title: "FAQ — TalkAbtIT",
    description:
      "Answers to common questions about TalkAbtIT — the comment section for streaming services.",
    url: "/support/",
    images: [OG_IMAGE],
  },
};

// Each FAQ carries both the rich JSX answer (`a`, rendered on the page) and a
// plain-text `text` version — Google's FAQPage rich result requires plain text
// in acceptedAnswer, so the two are kept deliberately in sync.
const FAQS: { q: string; a: ReactNode; text: string }[] = [
  {
    q: "What is TalkAbtIT?",
    a: (
      <>
        TalkAbtIT is a browser extension that adds a time-stamped comment section
        to the streaming services you already use. Every comment is pinned to the
        exact moment in the show, so you can react together — even when
        you&apos;re watching on your own time.
      </>
    ),
    text: "TalkAbtIT is a browser extension that adds a time-stamped comment section to the streaming services you already use. Every comment is pinned to the exact moment in the show, so you can react together — even when you're watching on your own time.",
  },
  {
    q: "Which streaming services work with it?",
    a: (
      <>
        TalkAbtIT works with Netflix, Hulu, Disney+, HBO Max, and Crunchyroll,
        with more coming soon. It works right in your browser — start playing
        any content from them and the comments appear on the page.
      </>
    ),
    text: "TalkAbtIT works with Netflix, Hulu, Disney+, HBO Max, and Crunchyroll, with more coming soon. It works right in your browser — start playing any content from them and the comments appear on the page.",
  },
  {
    q: "Do I need my own subscriptions?",
    a: (
      <>
        Yes. TalkAbtIT doesn&apos;t include or replace any subscription —
        you&apos;ll need an active subscription to each streaming service you
        watch. You sign in on the streaming service&apos;s own site, just like
        you normally do — TalkAbtIT never asks for your streaming login.
      </>
    ),
    text: "Yes. TalkAbtIT doesn't include or replace any subscription — you'll need an active subscription to each streaming service you watch. You sign in on the streaming service's own site, just like you normally do — TalkAbtIT never asks for your streaming login.",
  },
  {
    q: "Is this legal? Is it piracy?",
    a: (
      <>
        No, it&apos;s not piracy. TalkAbtIT doesn&apos;t stream, host, download,
        or unlock any content. All video plays through your own account with the
        streaming service. We simply add a conversation layer on top.
      </>
    ),
    text: "No, it's not piracy. TalkAbtIT doesn't stream, host, download, or unlock any content. All video plays through your own account with the streaming service. We simply add a conversation layer on top.",
  },
  {
    q: "Does TalkAbtIT see my streaming passwords?",
    a: (
      <>
        No. You log in on each streaming service&apos;s own site, just like you
        normally do — TalkAbtIT never asks for those credentials, and they never
        pass through our servers. See our{" "}
        <a href="/privacy/">Privacy Policy</a> for the details on what we do and
        don&apos;t collect.
      </>
    ),
    text: "No. You log in on each streaming service's own site, just like you normally do — TalkAbtIT never asks for those credentials, and they never pass through our servers. See our Privacy Policy for the details on what we do and don't collect.",
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
    text: "Comments are timestamped to the show's runtime rather than to the clock. When you reach 12:04 in an episode, you see what everyone said at 12:04 — no spoilers from further ahead.",
  },
  {
    q: "Do I have to watch in my browser?",
    a: (
      <>
        Yes. TalkAbtIT is a browser extension, so the comments appear on the
        streaming site while you watch in your browser on your computer. Anything
        you play there stays perfectly in sync with the conversation.
      </>
    ),
    text: "Yes. TalkAbtIT is a browser extension, so the comments appear on the streaming site while you watch in your browser on your computer. Anything you play there stays perfectly in sync with the conversation.",
  },
  {
    q: "How do I sign up?",
    a: (
      <>
        Add the extension from the Chrome Web Store, then continue with Google
        or GitHub — or create an account with your email — and pick a username:
        that&apos;s the name everyone sees next to your comments. The whole
        thing takes a few seconds.
      </>
    ),
    text: "Add the extension from the Chrome Web Store, then continue with Google or GitHub — or create an account with your email — and pick a username: that's the name everyone sees next to your comments. The whole thing takes a few seconds.",
  },
  {
    q: "Is it free?",
    a: (
      <>
        Yes. Commenting and reading are free and unlimited — no daily caps, no
        locked threads. An optional Premium upgrade adds ways to stand out, like
        pop-up comments over the video, a custom name color, and a profile pic —
        but posting and reading are never behind a paywall.
      </>
    ),
    text: "Yes. Commenting and reading are free and unlimited — no daily caps, no locked threads. An optional Premium upgrade adds ways to stand out, like pop-up comments over the video, a custom name color, and a profile pic — but posting and reading are never behind a paywall.",
  },
  {
    q: "How is TalkAbtIT different from Teleparty?",
    a: (
      <>
        Teleparty runs live watch parties — everyone joins a session and
        watches at the same time. TalkAbtIT pins comments to timestamps in the
        show, so the shared experience works even when everyone watches on
        their own schedule. See the full{" "}
        <a href="/teleparty-alternative/">TalkAbtIT vs Teleparty</a> comparison.
      </>
    ),
    text: "Teleparty runs live watch parties — everyone joins a session and watches at the same time. TalkAbtIT pins comments to timestamps in the show, so the shared experience works even when everyone watches on their own schedule.",
  },
  {
    q: "What can I customize?",
    a: (
      <>
        Everyone can pick an avatar for free. Plus adds pop-up comments over the
        video, a custom name color, and a profile pic (PNG or JPG); Pro adds GIF
        profile pics and a custom pop-up color — all with a live preview before
        you save.
      </>
    ),
    text: "Everyone can pick an avatar for free. Plus adds pop-up comments over the video, a custom name color, and a profile pic (PNG or JPG); Pro adds GIF profile pics and a custom pop-up color — all with a live preview before you save.",
  },
  {
    q: "What if no one has commented on my episode yet?",
    a: (
      <>
        Someone starts every conversation — and it&apos;s remembered: the first
        comment on an episode permanently wears a &quot;started the
        conversation&quot; marker. Not sure where to begin? The extension&apos;s
        New Releases picks link you straight to fresh episodes where the
        conversation is just getting started.
      </>
    ),
    text: "Someone starts every conversation — and it's remembered: the first comment on an episode permanently wears a \"started the conversation\" marker. Not sure where to begin? The extension's New Releases picks link you straight to fresh episodes where the conversation is just getting started.",
  },
  {
    q: "How do I report a comment or block someone?",
    a: (
      <>
        Every comment can be reported from the extension, and you can block users
        you don&apos;t want to hear from. We review reports and remove content
        that breaks our <a href="/terms/">community guidelines</a>.
      </>
    ),
    text: "Every comment can be reported from the extension, and you can block users you don't want to hear from. We review reports and remove content that breaks our community guidelines.",
  },
  {
    q: "Which browsers are supported?",
    a: <>TalkAbtIT is a Chrome extension and works in Chrome and other Chromium browsers like Edge and Brave. Support for more browsers is on the way.</>,
    text: "TalkAbtIT is a Chrome extension and works in Chrome and other Chromium browsers like Edge and Brave. Support for more browsers is on the way.",
  },
  {
    q: "How do I delete my account and data?",
    a: (
      <>
        You can delete your account from within the extension at any time, which
        removes your profile and associated data. See our{" "}
        <a href="/privacy/">Privacy Policy</a> for what happens to your
        information when you do.
      </>
    ),
    text: "You can delete your account from within the extension at any time, which removes your profile and associated data. See our Privacy Policy for what happens to your information when you do.",
  },
];

// FAQPage structured data — makes these Q&As eligible for expandable rich
// results in Google search.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/support/#faq`,
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.text },
  })),
};

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
              Everything about how TalkAbtIT works — the comment section for
              streaming services.
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
                <a href="mailto:support@talkabtit.app">support@talkabtit.app</a>{" "}
                and we&apos;ll get back to you.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer sub />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
