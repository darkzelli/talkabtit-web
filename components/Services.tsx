import type { CSSProperties } from "react";

const SERVICES: {
  label: string;
  badge: string;
  style: CSSProperties;
  badgeStyle?: CSSProperties;
}[] = [
  {
    label: "Netflix",
    badge: "N",
    style: { background: "#000" },
    badgeStyle: { color: "#E50914", fontSize: 34, fontFamily: "Georgia, serif" },
  },
  {
    label: "Hulu",
    badge: "hulu",
    style: { background: "#1CE783", color: "#0A0F14", textTransform: "lowercase", fontSize: 24 },
  },
  { label: "Disney+", badge: "D+", style: { background: "#0A1A5C", fontSize: 24 } },
  { label: "Max", badge: "MAX", style: { background: "#0033C7", fontSize: 22 } },
  { label: "Prime Video", badge: "prime", style: { background: "#1399FF", fontSize: 19 } },
  { label: "Crunchyroll", badge: "CR", style: { background: "#F47521", fontSize: 26 } },
];

export default function Services() {
  return (
    <section id="services" className="services wrap">
      <span className="kicker">Millions of shows &amp; movies</span>
      <h2 className="display">Add a comment section on</h2>

      <div className="service-grid">
        {SERVICES.map((s) => (
          <div className="service-cell" key={s.label}>
            <div className="service" style={s.style}>
              {s.badgeStyle ? <span style={s.badgeStyle}>{s.badge}</span> : s.badge}
            </div>
            <span className="service-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="disclaimer">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
        <span>
          Subscriptions not included — you'll need your own account with each
          service. talkabtit isn't a piracy app: we don't stream, host, or
          unlock any content. You sign in directly with the service, and your
          login details never pass through us.
        </span>
      </div>
    </section>
  );
}
