import type { ReactNode } from "react";

// One FAQ entry. `a` is the rich JSX answer rendered on the page; `text` is a
// plain-text copy of the same answer — Google's FAQPage rich result requires
// plain text, so every entry carries both.
export type Faq = { q: string; a: ReactNode; text: string };

// FAQPage structured data for a page's FAQ list — makes the Q&As eligible for
// expandable rich results in Google search. Serialize into a JSON-LD script tag.
export function faqPageJsonLd(faqs: Faq[], id: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": id,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.text },
    })),
  };
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

// FAQ accordion (native <details>, no JS) — styles in globals.css (.faq-list).
// Used by /support/ and every service landing page.
export default function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="faq-list">
      {faqs.map((item) => (
        <details className="faq-item" key={item.q}>
          <summary>
            {item.q}
            <Chevron />
          </summary>
          <p className="answer">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
