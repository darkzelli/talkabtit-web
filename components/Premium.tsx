import { AvatarGlyph } from "./Customize";
import NameStyles from "./NameStyles";

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

function PerkTag({ label }: { label: string }) {
  return <span className="perk-tag">{label}</span>;
}

/* One showcase tile: title + tier tag up top, live demo in the middle,
   one-line caption under it. The demo areas reuse the pv-* preview pieces. */
function Perk({
  title,
  tier,
  sub,
  bare,
  children,
}: {
  title: string;
  tier?: string;
  sub?: string;
  /* no glass box at all — the demo inside is the card */
  bare?: boolean;
  children: React.ReactNode;
}) {
  /* the label always sits above; bare demos are the card themselves, the
     rest get a glass box around just the demo */
  const demo = (
    <>
      <div className="perk-demo">{children}</div>
      {sub && <p className="perk-sub">{sub}</p>}
    </>
  );
  return (
    <div className="perk">
      <div className="perk-head">
        <span className="perk-name">{title}</span>
        {tier && <PerkTag label={tier} />}
      </div>
      {bare ? demo : <div className="perk-box">{demo}</div>}
    </div>
  );
}

/* Popup comments (Plus): a frosted popup floating over a dark "video",
   red runtime bar underneath — the moment the comment is pinned to. */
function PopupDemo() {
  return (
    <div className="pk-video" aria-hidden="true">
      <div className="pk-bubble">
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
      <div className="pk-progress">
        <span className="pk-progress-fill" />
      </div>
    </div>
  );
}

/* The Plus look, all at once: uploaded profile pic, custom name color
   cycling the vivid ramp, and the popcorn bucket by the name. */
function PlusCardDemo() {
  return (
    <div className="pk-inset" aria-hidden="true">
      <div className="pv-row">
        <span className="pv-avatar pk-av-still" />
        <div>
          <div className="pv-who pk-color-cycle">
            you <AvatarGlyph name="popcorn" size={13} color="#FFB91F" />{" "}
            <span className="pv-ts">12:04</span>
          </div>
          <div className="pv-body">this scene goes so hard 🔥</div>
        </div>
      </div>
    </div>
  );
}

/* The Pro look, all at once: GIF profile pic, crown badge, an animated
   name style, and the popup filled solid in your color. */
function ProCardDemo() {
  return (
    <div className="pv-popup" aria-hidden="true">
      <span className="pv-avatar pk-av-gif" />
      <div>
        <div className="pv-who pv-who-pro">
          <span className="ns-fx ns-scan" data-text="you">
            you
          </span>{" "}
          <AvatarGlyph name="crown" size={14} color="#FFB91F" />{" "}
          <span className="pv-ts">12:04</span>
        </div>
        <div className="pv-body">that episode was great</div>
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
// never sold. Perk lists mirror the extension's customize sheet: name color +
// uploaded pic + popup comments + bucket badge at Plus; crown badge, name
// styles, popup fill and GIF pics at Pro.
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
      "Popcorn bucket badge",
    ],
  },
  {
    title: "Pro",
    price: "$7.99",
    period: "/month",
    annual: "or $79.99/year — 2 months free",
    badge: "Best value",
    features: [
      "Everything in Plus",
      "Crown badge on every comment",
      "9 name styles — Glitch, VHS & more",
      "Custom popup background",
      "GIF profile pic",
    ],
  },
];

function PlanCard({ plan }: { plan: (typeof PREMIUM_PLANS)[number] }) {
  return (
    <div className={plan.badge ? "plan plan-featured" : "plan"}>
      <div className="plan-head">
        <span className="plan-title">
          {plan.title}
          {plan.badge && <span className="plan-badge">{plan.badge}</span>}
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
    </div>
  );
}

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
            Make your comments stand out. Premium is pure expression — posting
            and reading stay free for everyone.
          </p>
        </div>

        {/* everything you unlock, in two tier columns — each column keeps
            its tiles together, so mobile stacks Plus with its popup demo
            before Pro with its name styles */}
        <div className="perk-grid">
          <div className="perk-col">
            {/* one tier pill heads the whole column */}
            <div className="perk-col-head">
              <PerkTag label="PLUS" />
            </div>
            <Perk bare title="The Plus look">
              <PlusCardDemo />
            </Perk>
            <Perk title="Popup comments">
              <PopupDemo />
            </Perk>
            <PlanCard plan={PREMIUM_PLANS[0]} />
          </div>
          <div className="perk-col">
            <div className="perk-col-head">
              <PerkTag label="PRO" />
            </div>
            <Perk bare title="The Pro look">
              <ProCardDemo />
            </Perk>
            <Perk title="Name styles">
              <NameStyles />
            </Perk>
            <PlanCard plan={PREMIUM_PLANS[1]} />
          </div>
        </div>

        <p className="plans-note">
          Sign in to the extension and upgrade right from the popup — monthly
          or annual, cancel anytime.
        </p>
      </div>
    </section>
  );
}
