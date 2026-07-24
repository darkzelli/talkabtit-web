const STEPS = [
  {
    title: "Add it to your browser & pick a username",
    body: "Install the extension from the Chrome Web Store, then create an account with your email and pick the name everyone sees with your comments. Takes seconds.",
  },
  {
    title: "Open your streaming service",
    body: "Head to Netflix, Hulu, Disney+, Max, Prime Video, or Crunchyroll in your browser and start playing — TalkAbtIT lights up right on the page.",
  },
  {
    title: "Join the conversation",
    body: "Comments are pinned to the exact moment in the show. Read reactions as they land, and drop your own.",
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
