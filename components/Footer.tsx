export default function Footer({ sub = false }: { sub?: boolean }) {
  // on sub-pages the section anchors have to jump back to the homepage first
  const base = sub ? "/" : "";
  return (
    // on the homepage the closing band above is the same flat black, so the
    // divider line is dropped there; sub-pages keep it
    <footer className={sub ? undefined : "footer-flush"}>
      <div className="footer-grid">
        <div className="footer-brand">
          <img src="/logo.svg" alt="TalkAbtIT" loading="lazy" decoding="async" />
          <p>A comment section for streaming services.</p>
          <p className="footer-copy">© 2026 TalkAbtIT</p>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li>
              <a href="/premium/">Premium</a>
            </li>
            <li>
              <a href={`${base}#how`}>How it works</a>
            </li>
            <li>
              <a href="/support/">FAQ</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li>
              <a href="/privacy/">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms/">Terms of Service</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>
              <a href="mailto:support@talkabtit.app">support@talkabtit.app</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Follow</h4>
          <ul>
            <li>
              <a href="https://x.com/TalkAbtItapp" target="_blank" rel="noopener noreferrer">
                X
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com/@TalkAbtItapp" target="_blank" rel="noopener noreferrer">
                TikTok
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/TalkAbtItapp" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
