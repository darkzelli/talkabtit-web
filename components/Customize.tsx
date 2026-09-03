import NameStyles from "./NameStyles";

/* Avatar glyphs traced from the app's bundled SVGs (Assets.xcassets/Avatars) */
const GLYPHS = {
  crown: {
    viewBox: "0 0 165 115",
    d: "M21.2959 114.304L13.8282 72.9122M13.8282 72.9122L3.7959 17.3045L48.2959 58.8045M13.8282 72.9122L13.2959 74.3045M13.8282 72.9122L26.2959 40.3045M48.2959 58.8045L87.2959 71.3045M48.2959 58.8045L60.2959 109.804H109.796V83.3045L87.2959 71.3045M48.2959 56.3045L77.7959 4.80448L109.796 54.3045L87.2959 71.3045M110.796 55.8045L115.296 62.3045L160.796 13.3045L150.365 69.8045M150.365 69.8045L142.296 114.304M150.365 69.8045H121.296",
  },
  flag: {
    viewBox: "0 0 82 129",
    d: "M2.5 124V33.0205V5.99969L33.6863 36.9239L11.5815 58.843L19.1543 71.8493L43.6816 47.5282L77.5 81.0623L2.5 124Z",
  },
  popcorn: {
    viewBox: "0 0 105 115",
    d: "M11.5323 49.6016H95.5259L82.4872 112.5H22.7517L11.5323 49.6016ZM95.5259 49.6016L62.4743 106.968L48 58L33.5 106.968L11.5323 49.6016M12.1387 49.9055C5.77098 43.1193 -4.96315 27.4808 10.3194 24.0776C25.602 20.6745 22.9538 13.9491 19.7193 11.0118C26.7946 7.66938 41.1271 3.29384 41.8548 12.5311C41.8548 4.26619 49.7387 2.40253 53.6806 2.50381C62.171 2.50381 65.9107 9.79637 66.7194 13.4427C65.9916 9.55329 76.1194 7.77066 81.2742 7.36552C87.8239 12.7134 89.4613 19.7224 89.4613 22.5584C93.8075 23.6725 102.5 27.6632 102.5 34.7126C102.5 41.7621 96.8398 49.0952 95.5258 49.9055",
  },
};

export function AvatarGlyph({
  name,
  size,
  color,
}: {
  name: keyof typeof GLYPHS;
  size: number;
  color: string;
}) {
  const g = GLYPHS[name];
  return (
    <svg width={size} viewBox={g.viewBox} fill="none" stroke={color}>
      <path d={g.d} vectorEffect="non-scaling-stroke" strokeWidth={1.6} />
    </svg>
  );
}

function SlashIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M6.5 17.5L17.5 6.5" />
    </svg>
  );
}

function SliderRow({
  withCrown,
  thumbLeft,
  thumbColor,
  variant,
}: {
  withCrown?: boolean;
  thumbLeft: string;
  thumbColor: string;
  variant: "popup" | "comment";
}) {
  return (
    <div className={`cz-slider cz-slider-${variant}`}>
      <span className="cz-slot-mini">
        <SlashIcon size={14} color="rgba(255,255,255,0.55)" />
      </span>
      {withCrown && (
        <span className="cz-slot-mini cz-crown">
          <AvatarGlyph name="crown" size={14} color="rgba(255,255,255,0.9)" />
        </span>
      )}
      <div className="cz-track">
        <span
          className="cz-thumb"
          style={{ left: thumbLeft, background: thumbColor }}
        />
      </div>
    </div>
  );
}

export function CustomizeCard() {
  return (
    <div className="customize-card" aria-hidden="true">
      <div className="cz-head">
        <span className="cz-cancel">Cancel</span>
        <span className="cz-title">Customize</span>
        <span />
      </div>

      {/* avatar carousel: centered pick wears the gold ring.
          gray "locked" slots bookend the strip so sliding never reveals empty space */}
      <div className="cz-carousel">
        <span className="cz-slot cz-gray">
          <AvatarGlyph name="popcorn" size={22} color="rgba(30,30,34,0.55)" />
        </span>
        <span className="cz-slot cz-gray">
          <AvatarGlyph name="crown" size={24} color="rgba(30,30,34,0.55)" />
        </span>
        <span className="cz-slot cz-red cz-dim">
          <SlashIcon size={19} color="rgba(255,255,255,0.55)" />
        </span>
        <span className="cz-slot cz-red cz-selected">
          <AvatarGlyph name="crown" size={36} color="#fff" />
        </span>
        <span className="cz-slot cz-red cz-dim">
          <AvatarGlyph name="flag" size={17} color="#fff" />
        </span>
        <span className="cz-slot cz-red cz-bright">
          <AvatarGlyph name="popcorn" size={22} color="#fff" />
        </span>
        <span className="cz-slot cz-gray">
          <AvatarGlyph name="crown" size={24} color="rgba(30,30,34,0.55)" />
        </span>
      </div>

      <div className="cz-label">Pop-up</div>
      <div className="cz-glass">
        <div className="cz-bubble">
          <div className="cz-who">
            <span className="cz-av-stack">
              <AvatarGlyph name="crown" size={13} color="#E5B65A" />
              <AvatarGlyph name="flag" size={9} color="#E5B65A" />
              <SlashIcon size={12} color="#E5B65A" />
            </span>
            user_0efc1045 <span className="cz-ts">12:34</span>
          </div>
          <div className="cz-body">this scene goes so hard 🔥</div>
        </div>
      </div>
      <SliderRow
        withCrown
        variant="popup"
        thumbLeft="78%"
        thumbColor="hsl(281 46% 63%)"
      />

      <div className="cz-label">Comment</div>
      <div className="cz-glass cz-comment">
        <span className="cz-cmt-avatar">
          <span className="cz-av-stack">
            <AvatarGlyph name="crown" size={19} color="#fff" />
            <AvatarGlyph name="flag" size={12} color="#fff" />
            <SlashIcon size={16} color="#fff" />
          </span>
        </span>
        <div className="cz-cmt-main">
          <div className="cz-cmt-who">
            user_0efc1045 <span className="cz-ts">12:34</span>
          </div>
          <div className="cz-cmt-body">this scene goes so hard 🔥</div>
        </div>
        <span className="cz-like">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          12
        </span>
      </div>
      <SliderRow
        variant="comment"
        thumbLeft="74%"
        thumbColor="hsl(266 46% 63%)"
      />

      <span className="cz-save">Save</span>
    </div>
  );
}

export default function Customize() {
  return (
    <section id="customize" className="customize band">
      <div className="wrap">
        <div className="feature">
          <div className="feature-copy">
            <span className="kicker">Make it yours</span>
            <h2 className="display">Customize how you show up</h2>
            <p className="lede">
              Everyone picks an avatar for free, with a live preview before you
              save. Plus adds pop-up comments over the video, a custom name
              color, a profile pic, and the popcorn-bucket badge — Pro layers
              on a crown badge, GIF pics, a custom pop-up background, and nine
              animated name styles.
            </p>
            <a className="customize-more" href="/premium/">
              See everything in Premium →
            </a>
          </div>
          <div className="feature-visual">
            {/* premium showcase tiles, same look as /premium's perk grid */}
            <div className="customize-stack">
              <div className="perk">
                <div className="perk-head">
                  <span className="perk-name">Name styles</span>
                  <span className="perk-tag">PRO</span>
                </div>
                <div className="perk-box">
                  <NameStyles />
                </div>
              </div>
              <div className="perk">
                <div className="perk-head">
                  <span className="perk-name">Name color</span>
                  <span className="perk-tag">PLUS</span>
                </div>
                <div className="perk-box" aria-hidden="true">
                  <div className="pv-row">
                    <span className="pv-avatar cz-pick-free">
                      <AvatarGlyph name="crown" size={12} color="#fff" />
                    </span>
                    <div>
                      <div className="pv-who pk-color-cycle">
                        you <span className="pv-ts">12:04</span>
                      </div>
                      <div className="pv-body">this scene goes so hard 🔥</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="perk">
                <div className="perk-head">
                  <span className="perk-name">Avatar &amp; profile pic</span>
                </div>
                <div className="perk-box" aria-hidden="true">
                  <div className="cz-picks">
                    <div className="cz-pick">
                      <span className="cz-pick-circle cz-pick-free">
                        <AvatarGlyph name="flag" size={17} color="#fff" />
                      </span>
                      <span className="cz-pick-cap">Free</span>
                    </div>
                    <div className="cz-pick">
                      <span className="cz-pick-circle cz-pick-still" />
                      <span className="cz-pick-cap">Plus</span>
                    </div>
                    <div className="cz-pick">
                      <span className="cz-pick-circle pk-av-gif" />
                      <span className="cz-pick-cap">Pro</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
