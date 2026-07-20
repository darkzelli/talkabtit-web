function PlayerCard() {
  return (
    <div className="player-card" aria-hidden="true">
      <div className="video">
        <img className="video-img" src="/talkbt.webp" alt="" />
        <div className="play" />
        <div className="track" />
      </div>
      <div className="skel-comments">
        {[0, 1, 2].map((i) => (
          <div className="skel-comment" key={i}>
            <div className="skel-avatar" />
            <div className="skel-lines">
              <div className="skel-line skel-name" />
              <div className="skel-line skel-body" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TvCard() {
  return (
    <div className="tv-card-wrap" aria-hidden="true">
      <div className="tv-card">
        {/* SecondScreenShape from the app: two overlapping screens, brand red */}
        <svg
          width="54"
          height="45"
          viewBox="0 0 274 230"
          fill="none"
          stroke="var(--red)"
          strokeWidth="15"
        >
          <path d="M222 66.5V5H5v203h176M222 66.5h46.5v158H181V208M222 66.5h-41V208" />
        </svg>
        <div className="label">Playing on another device</div>
        <div className="sublabel">Join the discussion while you watch</div>
      </div>
      <div className="progress">
        <div className="bar" />
        <div className="times">
          <span>8:10</span>
          <span>24:00</span>
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    kicker: "Your favorite streaming sites",
    title: "Watch right in the app",
    body: "Sign in with the accounts you already pay for. TalkAbtIT wraps the player and brings the crowd — open Netflix, Hulu, Disney+, Max, Prime Video, or Crunchyroll without leaving the app.",
    visual: <PlayerCard />,
  },
  {
    kicker: "Watching on your TV?",
    title: "Keep the conversation on your phone",
    body: "View the comments on your phone while you watch — synced to the show's runtime.",
    visual: <TvCard />,
  },
];

export default function Features() {
  return (
    <section className="features band band-elevated">
      <div className="wrap">
        {FEATURES.map((f, i) => (
          <div className={i % 2 === 1 ? "feature reverse" : "feature"} key={f.title}>
            <div className="feature-copy">
              <span className="kicker">{f.kicker}</span>
              <h2 className="display">{f.title}</h2>
              <p className="lede">{f.body}</p>
            </div>
            <div className="feature-visual">{f.visual}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
