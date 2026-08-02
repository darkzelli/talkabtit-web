import { AvatarGlyph } from "./Customize";

function PlayerCard() {
  return (
    <div className="player-card" aria-hidden="true">
      <div className="video">
        <img className="video-img" src="/player-panel.jpg" alt="" loading="lazy" decoding="async" />
        <div className="play" />
        <div className="track" />
      </div>
    </div>
  );
}

function Heart({ filled }: { filled?: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

/* CSS recreation of the extension's comment panel mid-episode: sort and
   popup controls up top, then the feed with spoiler images blurred until
   you've caught up. */
function SpoilerPanelCard() {
  return (
    <div className="spoiler-card" aria-hidden="true">
      <div className="sp-head">
        <img src="/logo.svg" alt="" loading="lazy" decoding="async" />
        <span className="sp-x">✕</span>
      </div>
      <div>
        <div className="sp-service">Crunchyroll</div>
        <div className="sp-title">Demon Slayer: Infinity Castle</div>
      </div>
      <div className="sp-chips">
        <span className="sp-chip">By time</span>
        <span className="sp-chip">Top</span>
        <span className="sp-chip sp-chip-on">Newest</span>
      </div>
      <div className="sp-chips">
        <span className="sp-label">Popup duration</span>
        <span className="sp-chip sp-chip-on">5s</span>
        <span className="sp-chip">10s</span>
        <span className="sp-chip">20s</span>
        <span className="sp-chip">30s</span>
      </div>
      <div className="sp-comment">
        {/* Plus: an uploaded PNG/JPG pic */}
        <span className="sp-avatar pk-av-still" />
        <div className="sp-main">
          <div className="sp-row">
            <span className="sp-who" style={{ color: "#C084FC" }}>
              mika_j <AvatarGlyph name="popcorn" size={12} color="#FFB91F" />{" "}
              <span className="pv-ts">2:46</span>
            </span>
            <span className="sp-like">
              <Heart /> 0
            </span>
          </div>
          <div className="sp-body">😂😂😂😂</div>
        </div>
      </div>
      <div className="sp-comment">
        {/* Pro: the GIF pic */}
        <span className="sp-avatar pk-av-gif" />
        <div className="sp-main">
          <div className="sp-row">
            <span className="sp-who">
              ozani <AvatarGlyph name="crown" size={12} color="#FFB91F" />
              <span className="pv-ts">2:34</span>
            </span>
            <span className="sp-like sp-like-on">
              <Heart filled /> 1
            </span>
          </div>
          <div className="sp-img sp-img-a" />
        </div>
      </div>
      <div className="sp-comment">
        {/* free: a bundled avatar from the picker */}
        <span className="sp-avatar sp-av-free">
          <AvatarGlyph name="flag" size={12} color="#fff" />
        </span>
        <div className="sp-main">
          <div className="sp-row">
            <span className="sp-who" style={{ color: "#6EE7A0" }}>
              renn
              <span className="pv-ts">2:34</span>
            </span>
            <span className="sp-like">
              <Heart /> 0
            </span>
          </div>
          <img className="sp-gif" src="/homer.gif" alt="" loading="lazy" decoding="async" />
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    kicker: "Your favorite streaming sites",
    title: "Right on the page you're watching",
    body: "Sign in with the accounts you already pay for. TalkAbtIT layers the conversation straight onto the player.",
    visual: <PlayerCard />,
  },
  {
    kicker: "No spoilers, ever",
    title: "Spoilers stay blurred until you're ready",
    body: "About to give something away? Hit the spoiler button and your comment sends blurred — readers tap to reveal it when they're ready.",
    visual: <SpoilerPanelCard />,
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
