import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FaqList, { type Faq, faqPageJsonLd } from "@/components/FaqList";
import MobileReminder from "@/components/MobileReminder";
import { CHROME_STORE_URL, OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How to Install",
  description:
    "Install TalkAbtIT in about a minute: add the extension from the Chrome Web Store, sign in, open Netflix, Hulu, Disney+, HBO Max, Paramount+, or Crunchyroll, press play, and click the popcorn bucket.",
  alternates: { canonical: "/how-to-install/" },
  openGraph: {
    title: `How to Install — ${SITE_NAME}`,
    description:
      "Step-by-step: add TalkAbtIT to Chrome, sign in, and open the comment section on your first episode.",
    url: "/how-to-install/",
    images: [OG_IMAGE],
  },
};

// Each step carries the screenshot the homepage walkthrough already ships
// (public/how-step-*.avif) — step 4 has no screenshot there either, the
// homepage renders a CSS mock of the bucket button instead.
type Step = { title: string; body: string; img?: string; alt?: string; tall?: boolean };

const STEPS: Step[] = [
  {
    title: "Add TalkAbtIT from the Chrome Web Store",
    body: "Open the listing in Chrome (or Edge, Brave, or another Chromium browser) on your computer and click Add to Chrome, then Add extension in the confirmation. It's free and there's nothing else to download.",
    img: "/how-step-1.avif",
    alt: "TalkAbtIT extension listing on the Chrome Web Store",
  },
  {
    title: "Pin it to your toolbar",
    body: "Click the puzzle-piece button at the top right of Chrome, just to the right of the address bar. Find TalkAbtIT in the list and click the pin next to it so the popcorn icon stays in your toolbar.",
    img: "/how-step-pin.avif",
    alt: "Chrome's Extensions menu open from the puzzle-piece button at the top right, with TalkAbtIT pinned to the toolbar",
    tall: true,
  },
  {
    title: "Click the popcorn icon and sign in",
    body: "Click the TalkAbtIT popcorn icon in your toolbar and continue with Google or GitHub, or create an account with your email. Then choose a username — that's the name everyone sees next to your comments.",
  },
  {
    title: "Open your streaming service",
    body: "Head to Netflix, Hulu, Disney+, HBO Max, Paramount+, or Crunchyroll and sign in like you always do. TalkAbtIT never asks for your streaming login.",
    img: "/how-step-2.avif",
    alt: "Netflix home page with a TalkAbtIT comment popping up over the featured preview",
  },
  {
    title: "Press play and find the popcorn bucket",
    body: "Start any show or movie. Hover over the video and the popcorn bucket appears on the right edge of the player, with a count of the comments waiting on that episode.",
    img: "/how-step-3.avif",
    alt: "An episode playing on Netflix with the TalkAbtIT popcorn bucket at the edge of the video",
  },
  {
    title: "Click the bucket and join in",
    body: "The comment section slides in beside the video, matched to the exact episode. Comments are pinned to the moment they were written, so read along as they land and drop your own.",
    img: "/how-step-4.avif",
    alt: "The TalkAbtIT comment panel open beside an episode on Netflix",
  },
];

const FAQS: Faq[] = [
  {
    q: "I installed it, but nothing shows up on the video.",
    a: (
      <>
        Reload the streaming tab — pages that were already open before the
        install don&apos;t pick up the extension until they refresh. Then
        make sure the video is actually playing and hover over it: the popcorn
        bucket only appears over the player, not on the browse pages.
      </>
    ),
    text: "Reload the streaming tab — pages that were already open before the install don't pick up the extension until they refresh. Then make sure the video is actually playing and hover over it: the popcorn bucket only appears over the player, not on the browse pages.",
  },
  {
    q: "Where did the TalkAbtIT icon go?",
    a: (
      <>
        Chrome tucks new extensions behind the puzzle-piece button at the
        top right, next to the address bar. Click it, find TalkAbtIT, and hit
        the pin so the popcorn icon stays in your toolbar — see{" "}
        <a href="#step-2">step 2</a> above.
      </>
    ),
    text: "Chrome tucks new extensions behind the puzzle-piece button at the top right, next to the address bar. Click it, find TalkAbtIT, and hit the pin so the popcorn icon stays in your toolbar — see step 2 above.",
  },
  {
    q: "Can I install it on my phone or a TV?",
    a: (
      <>
        Not yet. TalkAbtIT is a Chrome extension, so it runs in the Chrome
        browser on your computer. On a phone, drop your email into the
        reminder box on this page and we&apos;ll send you the link for when
        you&apos;re on your computer.
      </>
    ),
    text: "Not yet. TalkAbtIT is a Chrome extension, so it runs in the Chrome browser on your computer. On a phone, drop your email into the reminder box on this page and we'll send you the link for when you're on your computer.",
  },
  {
    q: "Does it work in Edge, Brave, Arc, or Opera?",
    a: (
      <>
        Yes. They all run Chrome extensions, so the same Chrome Web Store
        listing installs in each of them. Firefox and Safari aren&apos;t
        supported yet.
      </>
    ),
    text: "Yes. They all run Chrome extensions, so the same Chrome Web Store listing installs in each of them. Firefox and Safari aren't supported yet.",
  },
  {
    q: "Is it really free?",
    a: (
      <>
        Yes. Reading and posting comments are free and unlimited. An optional{" "}
        <a href="/premium/">Premium</a> upgrade adds cosmetic extras like
        pop-up comments and a custom name color, but nothing is behind a
        paywall.
      </>
    ),
    text: "Yes. Reading and posting comments are free and unlimited. An optional Premium upgrade adds cosmetic extras like pop-up comments and a custom name color, but nothing is behind a paywall.",
  },
  {
    q: "How do I uninstall it?",
    a: (
      <>
        Right-click the TalkAbtIT icon in your toolbar and choose Remove from
        Chrome, or manage it from chrome://extensions. To delete your account
        and data as well, do that from inside the extension first — see the{" "}
        <a href="/privacy/">Privacy Policy</a> for what gets removed.
      </>
    ),
    text: "Right-click the TalkAbtIT icon in your toolbar and choose Remove from Chrome, or manage it from chrome://extensions. To delete your account and data as well, do that from inside the extension first — see the Privacy Policy for what gets removed.",
  },
];

// HowTo structured data — the step list as Google reads it, tied to the
// SoftwareApplication node the root layout publishes.
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${SITE_URL}/how-to-install/#howto`,
  name: `How to install ${SITE_NAME}`,
  description:
    "Add the TalkAbtIT Chrome extension, sign in, and open the comment section on Netflix, Hulu, Disney+, HBO Max, Paramount+, or Crunchyroll.",
  totalTime: "PT2M",
  tool: [{ "@type": "HowToTool", name: "Google Chrome or another Chromium browser" }],
  about: { "@id": `${SITE_URL}/#app` },
  step: STEPS.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.body,
    url: `${SITE_URL}/how-to-install/#step-${i + 1}`,
    ...(s.img ? { image: `${SITE_URL}${s.img}` } : {}),
  })),
};

const faqJsonLd = faqPageJsonLd(FAQS, `${SITE_URL}/how-to-install/#faq`);

export default function HowToInstallPage() {
  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <header className="page-hero">
          <div className="wrap">
            <span className="kicker">Getting started</span>
            <h1 className="display">How to install TalkAbtIT</h1>
            <p className="lede">
              Six steps, about a minute. Add the extension to Chrome on your
              computer, press play on any show, and the comment section is
              waiting beside the video.
            </p>
            {/* the ask up top, tagged so the store-click listener in the
                layout attributes it to this page */}
            <a
              className="btn-appstore install-cta"
              href={CHROME_STORE_URL}
              data-cta="install-page"
              target="_blank"
              rel="noopener"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V22c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V24H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" />
              </svg>
              <span className="btn-appstore-text">
                Get TalkAbtIT
                <small>Free · Chrome Web Store</small>
              </span>
            </a>
            {/* on a phone the store button above hides and this stands in */}
            <MobileReminder />
          </div>
        </header>

        <section className="content">
          <div className="wrap">
            <ol className="install-steps">
              {STEPS.map((s, i) => (
                <li className="install-step" key={s.title} id={`step-${i + 1}`}>
                  <div className="install-step-copy">
                    <span className="svc-step-kicker">Step {i + 1}</span>
                    <h2 className="display">{s.title}</h2>
                    <p>{s.body}</p>
                  </div>
                  {s.img && (
                    <img
                      className={s.tall ? "install-step-img install-step-img-tall" : "install-step-img"}
                      src={s.img}
                      alt={s.alt ?? ""}
                      width={s.tall ? 814 : 1400}
                      height={s.tall ? 1264 : 788}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  )}
                </li>
              ))}
            </ol>

            <div className="prose install-next">
              <h2>That&apos;s it</h2>
              <p>
                Not sure what to watch first? The extension&apos;s New Releases
                picks link straight to fresh episodes where the conversation
                is just getting started. Want to see the comment section
                before you install? Try the <a href="/demo/">live demo</a>.
              </p>
            </div>

            <section className="svc-faq-block">
              <h2>Install troubleshooting</h2>
              <FaqList faqs={FAQS} />
            </section>

            <div className="contact-card">
              <h3 className="display">Still stuck?</h3>
              <p>
                Email{" "}
                <a href="mailto:support@talkabtit.app">support@talkabtit.app</a>{" "}
                with your browser and the streaming service you&apos;re on and
                we&apos;ll sort it out.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer sub />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
