export default function Footer({ sub = false }: { sub?: boolean }) {
  // on sub-pages the section anchors have to jump back to the homepage first
  const base = sub ? "/" : "";
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <img src="/logo.svg" alt="TalkAbtIT" loading="lazy" decoding="async" />
          <p>A comment section for your favorite streaming service.</p>
          <p className="footer-copy">© 2026 TalkAbtIT</p>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li>
              <a href={`${base}#premium`}>Customize</a>
            </li>
            <li>
              <a href={`${base}#how`}>How it works</a>
            </li>
            <li>
              <a href="/faq/">FAQ</a>
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
      </div>
    </footer>
  );
}
