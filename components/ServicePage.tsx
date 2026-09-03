import type { ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE_URL, CHROME_STORE_URL } from "@/lib/seo";

// One landing page per streaming service (/netflix/, /hulu/, …), each built
// around its own query family ("netflix comment section", "crunchyroll
// comments", …). Pages under app/<slug>/ define the metadata + config and
// render this. FAQs carry both the rendered JSX answer and a plain-text copy
// for the FAQPage structured data, same pattern as the support page.
export type ServiceConfig = {
  name: string;
  slug: string;
  lede: string;
  /* two short paragraphs on why this service is better with comments */
  pitch: [string, string];
  steps: { title: string; body: string }[];
  faqs: { q: string; a: ReactNode; text: string }[];
};

function ExtensionIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V22c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V24H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" />
    </svg>
  );
}

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

export default function ServicePage({ service }: { service: ServiceConfig }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/${service.slug}/#faq`,
    mainEntity: service.faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.text },
    })),
  };

  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <header className="page-hero">
          <div className="wrap">
            <span className="kicker">TalkAbtIT for {service.name}</span>
            <h1 className="display">
              A <span className="accent">comment section</span> for {service.name}.
            </h1>
            <p className="lede">{service.lede}</p>
            <a
              className="btn-appstore svc-cta"
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener"
            >
              <ExtensionIcon />
              <span className="btn-appstore-text">
                Get TalkAbtIT
                <small>Free · Chrome Web Store</small>
              </span>
            </a>
          </div>
        </header>

        <section className="content">
          <div className="wrap">
            <div className="prose">
              <h2>Why {service.name} is better with comments</h2>
              <p>{service.pitch[0]}</p>
              <p>{service.pitch[1]}</p>

              <h2>How it works on {service.name}</h2>
              {service.steps.map((step, i) => (
                <div key={step.title}>
                  <h3>
                    {i + 1}. {step.title}
                  </h3>
                  <p>{step.body}</p>
                </div>
              ))}

              <h2>{service.name} comment section FAQ</h2>
            </div>

            <div className="faq-list svc-faq">
              {service.faqs.map((item) => (
                <details className="faq-item" key={item.q}>
                  <summary>
                    {item.q}
                    <Chevron />
                  </summary>
                  <p className="answer">{item.a}</p>
                </details>
              ))}
            </div>

            <p className="svc-disclaimer">
              TalkAbtIT is an independent product and is not affiliated with,
              endorsed by, or sponsored by {service.name}. You need your own{" "}
              {service.name} subscription — TalkAbtIT never streams, hosts, or
              unlocks video content.
            </p>
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
