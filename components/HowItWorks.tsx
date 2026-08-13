/* the extension's edge button as it overlays the player: frosted square,
   the popcorn-bucket mark, red unread badge — floating on a dark video strip */
function BucketDemo() {
  return (
    <div className="bucket-demo" aria-hidden="true">
      <span className="bucket-btn">
        <img src="/mark.svg" alt="" loading="lazy" decoding="async" />
        <span className="bucket-badge">3</span>
      </span>
    </div>
  );
}

const STEPS = [
  {
    title: "Add it to your browser & pick a username",
    body: "Install the extension from the Chrome Web Store, then continue with Google or GitHub — or create an account with your email — and pick the name everyone sees with your comments. Takes seconds.",
    visual: null as React.ReactNode,
  },
  {
    title: "Open your streaming service",
    body: "Head to Netflix, Hulu, Disney+, HBO Max, or Crunchyroll and press play — the popcorn bucket pops up over the video. Click it to open the conversation.",
    visual: <BucketDemo />,
  },
  {
    title: "Join the conversation",
    body: "Comments are pinned to the exact moment in the show. Read reactions as they land, and drop your own.",
    visual: null,
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="band band-gold">
      <div className="wrap">
        <span className="kicker">Getting started</span>
        <h2 className="display">How it works</h2>
        <div className="steps">
          {STEPS.map((step, i) => (
            <div className="step" key={step.title}>
              <div className="num">{i + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              {step.visual}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
