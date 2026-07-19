function PlayerCard() {
  return (
    <div className="player-card" aria-hidden="true">
      <div className="video">
        <div className="play" />
        <div className="track" />
      </div>
      <div className="row">
        <span className="dot" />
        <span>Now playing — synced with the crowd</span>
      </div>
    </div>
  );
}

function TvCard() {
  return (
    <div className="tv-card-wrap" aria-hidden="true">
      <div className="tv-card">
        <svg
          width="42"
          height="35"
          viewBox="0 0 42 35"
          fill="none"
          stroke="#fff"
          strokeWidth="2.5"
        >
          <rect x="2" y="2" width="38" height="24" />
          <path d="M14 32h14M21 26v6" />
        </svg>
        <div className="label">Playing on another device</div>
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

const AVATARS = [
  { letter: "J", bg: "linear-gradient(135deg, #ED3D23, #C42D12)" },
  { letter: "A", bg: "linear-gradient(135deg, #FFB91F, #E08900)", selected: true },
  { letter: "S", bg: "linear-gradient(135deg, #3A3F4C, #22252E)" },
  { letter: "P", bg: "linear-gradient(135deg, #7A1F12, #4A130A)" },
];

function ProfileCard() {
  return (
    <div className="profile-card" aria-hidden="true">
      <div className="avatar-row">
        {AVATARS.map((a) => (
          <div
            key={a.letter}
            className={a.selected ? "avatar selected" : "avatar"}
            style={{ background: a.bg }}
          >
            {a.letter}
          </div>
        ))}
      </div>
      <div className="username-pill">
        <span className="at">@</span>ashley_watches
      </div>
    </div>
  );
}

const FEATURES = [
  {
    kicker: "Your favorite streaming sites",
    title: "Watch right in the app",
    body: "Sign in with the accounts you already pay for. talkabtit wraps the player and brings the crowd — open Netflix, Hulu, Disney+, Max, Prime Video, or Crunchyroll without leaving the app.",
    visual: <PlayerCard />,
  },
  {
    kicker: "Watching on your TV?",
    title: "Keep the conversation on your phone",
    body: "View the comments while watching on another device. Playing on your TV? Keep the conversation on your phone, synced to the runtime.",
    visual: <TvCard />,
  },
  {
    kicker: "Make it yours",
    title: "Pick your username and avatar",
    body: "Your username is the name everyone sees with your comments. Choose an avatar, customize your look, and make the experience yours.",
    visual: <ProfileCard />,
  },
];

export default function Features() {
  return (
    <section className="features wrap">
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
    </section>
  );
}
