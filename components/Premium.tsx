import { CustomizeCard } from "./Customize";

/* crown glyph traced from the app's bundled avatar SVG */
const CROWN_D =
  "M21.2959 114.304L13.8282 72.9122M13.8282 72.9122L3.7959 17.3045L48.2959 58.8045M13.8282 72.9122L13.2959 74.3045M13.8282 72.9122L26.2959 40.3045M48.2959 58.8045L87.2959 71.3045M48.2959 58.8045L60.2959 109.804H109.796V83.3045L87.2959 71.3045M48.2959 56.3045L77.7959 4.80448L109.796 54.3045L87.2959 71.3045M110.796 55.8045L115.296 62.3045L160.796 13.3045L150.365 69.8045M150.365 69.8045L142.296 114.304M150.365 69.8045H121.296";

function Crown({ size, color }: { size: number; color: string }) {
  return (
    <svg viewBox="0 0 165 115" width={size} fill="none" stroke={color}>
      <path d={CROWN_D} vectorEffect="non-scaling-stroke" strokeWidth={1.6} />
    </svg>
  );
}

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9.5" />
      <path d="M8.5 12.3l2.4 2.4 4.6-4.9" />
    </svg>
  );
}

/* mirrors the app's Plus preview: your comment with a custom name color + hue slider */
function PlusPreview() {
  return (
    <div className="plan-preview">
      <div className="pv-row">
        <span className="pv-avatar" style={{ background: "#A855F7" }}>
          Z
        </span>
        <div>
          <div className="pv-who" style={{ color: "#C084FC" }}>
            you <span className="pv-ts">12:04</span>
          </div>
          <div className="pv-body">this scene goes so hard 🔥</div>
        </div>
      </div>
      <div className="pv-track">
        <span
          className="pv-thumb"
          style={{ left: "76%", background: "#A855F7" }}
        />
      </div>
    </div>
  );
}

/* mirrors the app's Pro preview: crown-pattern popup on your color, gold border */
function ProPreview() {
  return (
    <div className="plan-preview">
      <div className="pv-popup">
        <span className="pv-avatar pv-avatar-ring">Z</span>
        <div>
          <div className="pv-who pv-who-pro">
            <Crown size={12} color="#FFB91F" /> you
          </div>
          <div className="pv-body">that episode was great</div>
        </div>
      </div>
      <div className="pv-track">
        <span
          className="pv-thumb"
          style={{ left: "8%", background: "var(--red)" }}
        />
      </div>
    </div>
  );
}

const FREE_FEATURES = [
  "Unlimited comments, replies & likes",
  "Time-synced to the exact moment",
  "Every comment on every episode",
  "Avatar picker",
  "Spoiler protection",
];

// Premium is expression only — commenting and reading are free for everyone,
// never sold. Perk lists mirror the extension popup's plan cards.
const PREMIUM_PLANS = [
  {
    title: "Plus",
    price: "$3.99",
    period: "/month",
    annual: "or $39.99/year — 2 months free",
    badge: null as string | null,
    features: [
      "Popup comments over the video",
      "Custom name color",
      "Profile pic (PNG or JPG)",
    ],
    preview: <PlusPreview /> as React.ReactNode,
  },
  {
    title: "Pro",
    price: "$7.99",
    period: "/month",
    annual: "or $79.99/year — 2 months free",
    badge: "Best value",
    features: ["Everything in Plus", "GIF profile pic", "Custom popup color"],
    preview: <ProPreview />,
  },
];

export default function Premium() {
  return (
    <section id="premium" className="band band-premium">
      <div className="wrap">
        <div className="premium-head">
          <span className="kicker">Pricing</span>
          <h2 className="display">
            Stay <span className="accent-gold">free</span> forever
          </h2>
          <p className="lede">
            Commenting and reading are free and unlimited — no daily caps, no
            locked threads. No trial, no card, no catch.
          </p>
        </div>

        <div className="plan plan-free">
          <div className="plan-head">
            <span className="plan-title">Free</span>
            <span className="plan-price">
              $0<small className="plan-per"> forever</small>
            </span>
          </div>
          <ul className="plan-features">
            {FREE_FEATURES.map((f) => (
              <li key={f}>
                <Check />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="plans-divider" aria-hidden="true">
          <span>or</span>
        </div>

        <div className="premium-intro">
          <h3 className="display premium-title">
            Get <img className="premium-logo" src="/logo.svg" alt="TalkAbtIt" loading="lazy" decoding="async" />{" "}
            <span className="accent-gold">Premium</span>
          </h3>
          <p className="lede">
            Make your comments stand out. Premium is pure expression — popup
            comments over the video, a profile pic, and the exact color your
            name shows up in, with a live preview before you save. It never
            sells posting or reading; those stay free for everyone.
          </p>
        </div>

        <div className="feature premium-feature">
          <div className="plans">
            {PREMIUM_PLANS.map((plan) => (
              <div
                className={plan.badge ? "plan plan-featured" : "plan"}
                key={plan.title}
              >
                <div className="plan-head">
                  <span className="plan-title">
                    {plan.title}
                    {plan.badge && (
                      <span className="plan-badge">{plan.badge}</span>
                    )}
                  </span>
                  <span className="plan-price">
                    {plan.price}
                    <small className="plan-per">{plan.period}</small>
                  </span>
                </div>
                <div className="plan-annual">{plan.annual}</div>
                <ul className="plan-features">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.preview}
              </div>
            ))}
          </div>
          <div className="feature-visual">
            <CustomizeCard />
          </div>
        </div>
      </div>
    </section>
  );
}
