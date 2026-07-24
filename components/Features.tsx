function PlayerCard() {
  return (
    <div className="player-card" aria-hidden="true">
      <div className="video">
        <img className="video-img" src="/talkbt.webp" alt="" loading="lazy" decoding="async" />
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

function SyncCard() {
  return (
    <div className="tv-card-wrap" aria-hidden="true">
      <div className="tv-card">
        {/* runtime clock — comments are pinned to the show's timeline, not the wall clock */}
        <svg
          width="46"
          height="46"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--red)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
        <div className="label">Synced to the runtime</div>
        <div className="sublabel">You're at 8:10 — no spoilers from ahead</div>
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
    title: "Right on the page you're watching",
    body: "Sign in with the accounts you already pay for. TalkAbtIT layers the conversation straight onto the player — Netflix, Hulu, Disney+, Max, Prime Video, or Crunchyroll, right in your browser.",
    visual: <PlayerCard />,
  },
  {
    kicker: "No spoilers, ever",
    title: "Comments pinned to the exact moment",
    body: "Every comment is tied to the show's runtime, so at 8:10 you only see what people said by 8:10 — never a beat ahead. Flip on spoiler protection for an extra layer, and if you're about to give something away, mark your comment as a spoiler before you send so it stays hidden until everyone's caught up.",
    visual: <SyncCard />,
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
