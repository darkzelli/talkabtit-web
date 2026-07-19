export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <img src="/logo.svg" alt="talkabtit" />
          <p>
            A live comment section for everything you stream. No one to watch
            with? No problem.
          </p>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#how">How it works</a>
            </li>
            <li>
              <a href="#get">Get the app</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Fine print</h4>
          <p>
            Not affiliated with Netflix, Hulu, Disney+, Max, Prime Video, or
            Crunchyroll. Subscriptions to each service are required and are not
            included.
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>© 2026 talkabtit</span>
          <span>Made for people who talk during the movie.</span>
        </div>
      </div>
    </footer>
  );
}
