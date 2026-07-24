// Temporary splash shown at "/" while the full site is parked. Uses the same
// brand theme (dark base, gold accent, ambient glow) and the Handjet display
// font already loaded site-wide via `.display`.
export default function ComingSoon() {
  return (
    <>
      <div className="glow" />
      <main className="coming">
        <div className="coming-inner">
          <img className="coming-logo" src="/logo.svg" alt="TalkAbtIT" />
          <h1 className="display coming-title">
            Coming<br />
            <span className="accent">Soon</span>
          </h1>
          <div className="coming-foot">
            <span>© 2026 TalkAbtIT</span>
            <span className="sep" aria-hidden="true">·</span>
            <a href="mailto:support@talkabtit.app">support@talkabtit.app</a>
          </div>
        </div>
      </main>
    </>
  );
}
