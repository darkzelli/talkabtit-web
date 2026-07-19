export default function Nav() {
  return (
    <nav>
      <div className="nav-inner">
        <a className="nav-logo" href="#" aria-label="talkabtit home">
          <img src="/logo.svg" alt="talkabtit" />
        </a>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#how">How it works</a>
        </div>
        <a className="btn btn-white btn-sm" href="#get">
          Get the app
        </a>
      </div>
    </nav>
  );
}
