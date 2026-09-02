import { CHROME_STORE_URL } from "@/lib/seo";

// Universal browser-extension (puzzle-piece) glyph, reused on every
// "Get TalkAbtIT" button in place of the old App Store mark.
function ExtensionIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V22c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V24H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" />
    </svg>
  );
}

export default function Nav({ sub = false }: { sub?: boolean }) {
  // on sub-pages the section anchors have to jump back to the homepage first
  const base = sub ? "/" : "";
  return (
    <nav>
      <div className="nav-inner">
        <a className="nav-logo" href={sub ? "/" : "#"} aria-label="TalkAbtIT home">
          <img src="/logo.svg" alt="TalkAbtIT" />
        </a>
        <div className="nav-links">
          <a href={`${base}#premium`}>Customize</a>
          <a href={`${base}#how`}>How it works</a>
          <a href="/support/">FAQ</a>
        </div>
        <a className="btn btn-white btn-sm btn-icon" href={CHROME_STORE_URL} target="_blank" rel="noopener">
          <ExtensionIcon size={15} />
          <span className="nav-cta-full">Get TalkAbtIT</span>
          <span className="nav-cta-short">Get now</span>
        </a>
      </div>
    </nav>
  );
}
