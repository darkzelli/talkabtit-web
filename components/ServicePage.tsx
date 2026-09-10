import type { ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { PlayerCard } from "@/components/Features";
import FaqList, { type Faq, faqPageJsonLd } from "@/components/FaqList";
import MobileReminder from "@/components/MobileReminder";
import { CHROME_STORE_URL, SITE_URL } from "@/lib/seo";

// One landing page per streaming service (/netflix/, /hulu/, …), each built
// around its own query family ("netflix comment section", "crunchyroll
// comments", …). Pages under app/<slug>/ define the metadata + config and
// render this.
export type ServiceConfig = {
  name: string;
  slug: string;
  lede: string;
  /* two short paragraphs on why this service is better with comments */
  pitch: [string, string];
  steps: { title: string; body: string }[];
  /* rendered as the page's FAQ accordion + FAQPage structured data */
  faqs: Faq[];
};

// big solid glyphs for the step walkthrough, one per step in order:
// install the extension → press play → join the conversation
const STEP_ICONS: ReactNode[] = [
  // puzzle piece — the extension itself
  <svg key="install" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V22c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V24H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" />
  </svg>,
  // player window with a play-button cutout
  <svg key="play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M4 3.5h16A2.5 2.5 0 0 1 22.5 6v12a2.5 2.5 0 0 1-2.5 2.5H4A2.5 2.5 0 0 1 1.5 18V6A2.5 2.5 0 0 1 4 3.5Zm5.8 5v7l6.2-3.5-6.2-3.5Z"
    />
  </svg>,
  // comment bubble with typing-dot cutouts
  <svg key="talk" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M4 2.5h16A2.5 2.5 0 0 1 22.5 5v10a2.5 2.5 0 0 1-2.5 2.5H9.6L5 21.4v-3.9H4A2.5 2.5 0 0 1 1.5 15V5A2.5 2.5 0 0 1 4 2.5ZM7 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
    />
  </svg>,
];

export default function ServicePage({ service }: { service: ServiceConfig }) {
  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <header className="page-hero">
          <div className="wrap svc-hero">
            <div className="svc-hero-copy">
              <span className="kicker">TalkAbtIT for {service.name}</span>
              <h1 className="display">
                A <span className="accent">comment section</span> for {service.name}.
              </h1>
            </div>
            <PlayerCard />
          </div>
        </header>

        <section className="content">
          <div className="wrap">
            <div className="prose">
              <h2>Why {service.name} is better with comments</h2>
              <p>{service.pitch[0]}</p>
              <p>{service.pitch[1]}</p>

              <h2 className="svc-how-title">How it works on {service.name}</h2>
            </div>

            {/* three columns across: glyph on top, then STEP kicker,
                title and body underneath */}
            <div className="svc-steps">
              {service.steps.map((step, i) => (
                <div className="svc-step" key={step.title}>
                  <div className="svc-step-icon" aria-hidden="true">
                    {STEP_ICONS[i % STEP_ICONS.length]}
                  </div>
                  <span className="svc-step-kicker">Step {i + 1}</span>
                  <h3 className="display">{step.title}</h3>
                  {i === 0 ? (
                    /* the install step IS the call to action — the button
                       stands in for the body copy */
                    <a
                      className="btn-appstore svc-step-cta"
                      href={CHROME_STORE_URL}
                      data-cta="service-step"
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
                  ) : (
                    <p>{step.body}</p>
                  )}
                  {i === 0 && (
                    /* on touch the CTA above hides (no installs on a phone —
                       the reminder form below the steps stands in), so the
                       written step body returns */
                    <p className="svc-step-body-touch">{step.body}</p>
                  )}
                </div>
              ))}
            </div>

            <MobileReminder />

            {/* per-service Q&As — real content depth for the page's query
                family, mirrored into FAQPage structured data below */}
            <section className="svc-faq-block">
              <h2>{service.name} comment section FAQ</h2>
              <FaqList faqs={service.faqs} />
            </section>
          </div>
        </section>
      </main>
      <Footer sub />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqPageJsonLd(service.faqs, `${SITE_URL}/${service.slug}/#faq`),
          ),
        }}
      />
    </>
  );
}
