import { SUPPORTED_SERVICES } from "@/lib/seo";

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
          <span className="kicker">Launching soon on iOS</span>
          <h1 className="display coming-title">
            Coming<br />
            <span className="accent">Soon</span>
          </h1>
          <p className="coming-sub">
            A live, time-stamped comment section on top of{" "}
            {SUPPORTED_SERVICES.slice(0, -1).join(", ")}, and{" "}
            {SUPPORTED_SERVICES.at(-1)}. No one to watch with? No problem.
          </p>
          <div className="coming-foot">
            <span>© 2026 TalkAbtIT</span>
            <span className="sep" aria-hidden="true">·</span>
            <a href="mailto:support@talkabtit.com">support@talkabtit.com</a>
          </div>
        </div>
      </main>
    </>
  );
}
