import { CHROME_STORE_URL } from "@/lib/seo";
import { serviceFor } from "@/lib/tv";

function ExtensionIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V22c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V24H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" />
    </svg>
  );
}

// The product pitch that closes every tool page. `cta` tags the store click
// for attribution (the listener in the root layout reads data-cta). When the
// show's network maps to a supported service, the copy links its landing page.
export default function ToolCta({
  cta,
  showName,
  network,
}: {
  cta: string;
  showName?: string;
  network?: string | null;
}) {
  const svc = serviceFor(network ?? null);
  return (
    <aside className="tool-pitch">
      <h2>{showName ? `Watching ${showName} alone?` : "Watching alone?"}</h2>
      <p>
        TalkAbtIT is a free Chrome extension that adds a time-stamped comment
        section to {svc ? <a href={svc.href}>{svc.label}</a> : "Netflix, Hulu, Disney+, HBO Max, Paramount+, and Crunchyroll"}.
        Every reaction is pinned to the exact moment it&apos;s about, spoilers
        stay blurred until you reach them, and the conversation is waiting on
        every episode whenever you press play.
      </p>
      <a className="btn-appstore" href={CHROME_STORE_URL} data-cta={cta} target="_blank" rel="noopener">
        <ExtensionIcon />
        <span className="btn-appstore-text">
          Get TalkAbtIT
          <small>Free · Chrome Web Store</small>
        </span>
      </a>
    </aside>
  );
}

// TVmaze asks for a link back in exchange for the free API.
export function ToolAttribution({ fetchedAt, tvmazeUrl }: { fetchedAt: string; tvmazeUrl?: string }) {
  return (
    <p className="tool-attrib">
      Episode data from{" "}
      <a href={tvmazeUrl || "https://www.tvmaze.com"} target="_blank" rel="noopener noreferrer">
        TVmaze
      </a>
      , refreshed weekly (last update {fetchedAt}). Runtimes are as listed
      per episode, so totals exclude recaps you skip and credits you don&apos;t.
    </p>
  );
}
