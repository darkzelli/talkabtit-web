export default function Nav({ sub = false }: { sub?: boolean }) {
  // on sub-pages the section anchors have to jump back to the homepage first
  const base = sub ? "/" : "";
  return (
    <nav>
      <div className="nav-inner">
        <a className="nav-logo" href={sub ? "/" : "#"} aria-label="TalkAbtit home">
          <img src="/logo.svg" alt="TalkAbtit" />
        </a>
        <div className="nav-links">
          <a href={`${base}#customize`}>Customize</a>
          <a href={`${base}#how`}>How it works</a>
          <a href="/faq">FAQ</a>
        </div>
        <a className="btn btn-white btn-sm btn-icon" href={`${base}#get`}>
          <svg width="15" height="15" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
          </svg>
          Get the app
        </a>
      </div>
    </nav>
  );
}
