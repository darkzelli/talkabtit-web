const DEMO_COMMENTS = [
  { who: "Jake", ts: "0:43", body: "We shouldn't have opened the door" },
  { who: "Michael", ts: "1:07", body: "no way that just happened" },
  { who: "Ashley", ts: "1:15", body: "THE MUSIC. turn it up" },
  { who: "June", ts: "1:43", body: "watch the window on the left…" },
  { who: "Sam", ts: "2:08", body: "this scene lives rent free in my head" },
  { who: "Priya", ts: "2:31", body: "called it from the first episode" },
];

function PhoneDemo() {
  // list is duplicated so the crawl loops seamlessly
  const looped = [...DEMO_COMMENTS, ...DEMO_COMMENTS];
  return (
    <div className="phone" aria-hidden="true">
      <div className="video">
        <div className="play" />
        <div className="track" />
      </div>
      <div className="feed">
        <div className="feed-inner">
          {looped.map((c, i) => (
            <div className="comment" key={i}>
              <div className="who">
                {c.who} <span className="ts">{c.ts}</span>
              </div>
              <div className="body">{c.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <header className="hero wrap">
      <span className="kicker">Watch with everyone</span>
      <h1 className="display">
        Add a <span className="accent">comment section</span> to any streaming
        service.
      </h1>
      <p className="sub">
        No one to watch with? No problem. Join the conversation and talk about
        your favorite shows — with comments synced to every second of the video.
      </p>
      <div className="ctas">
        <a className="btn btn-brand" href="#get">
          Download for iPhone
        </a>
        <a className="btn btn-white" href="#how">
          See how it works
        </a>
      </div>
      <p className="fineprint">
        Free to use with your existing streaming subscriptions. *Available on
        iPhone.
      </p>
      <PhoneDemo />
    </header>
  );
}
