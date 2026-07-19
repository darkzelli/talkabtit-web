const STEPS = [
  {
    title: "Get the app & pick a username",
    body: "It's the name everyone sees with your comments. Sign up takes seconds with your Apple ID.",
  },
  {
    title: "Open your streaming service",
    body: "Log in to Netflix, Hulu, Disney+, Max, Prime Video, or Crunchyroll — right inside the app, or keep playing on your TV.",
  },
  {
    title: "Join the conversation",
    body: "Comments are pinned to the exact moment in the show. Read reactions as they land, and drop your own.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="wrap">
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
    </section>
  );
}
