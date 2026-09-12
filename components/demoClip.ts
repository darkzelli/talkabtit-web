/* ===========================================================================
   THE DEMO CLIP — the one place to edit when the video lands.

   Both /demo surfaces read from here: the playable stage (DemoStage) and the
   "this is how it looks on:" skin cycler (ServiceSkins).

   Drop the file in public/ and point VIDEO_SOURCES at it (mp4 first; a webm
   sibling is used by browsers that prefer it). Until a file is actually there
   the stage falls back to a virtual clock of DEMO_DURATION seconds, so the
   comment side stays fully playable — nothing downstream cares which clock it
   is reading.
   ========================================================================= */

export const VIDEO_SOURCES = [
  { src: "/demo-episode.mp4", type: "video/mp4" },
  { src: "/demo-episode.webm", type: "video/webm" },
];

export const POSTER = ""; // optional, e.g. "/demo-poster.jpg"

export const DEMO_DURATION = 300; // seconds — the stand-in clock's length

// What the page, the player bar and the drawer header all call this episode.
// The real overlay scrapes the same three facts off the streaming site it is
// sitting on: which service, which series, and which episode.
export const EPISODE = {
  service: "Demo",
  series: "TalkAbtIT demo clip",
  season: 1,
  episode: 1,
  title: "The comment section, exactly as it ships",
};

/// "S1:E1" — the short label the player bar and the drawer both print.
export const EP_LABEL = `S${EPISODE.season}:E${EPISODE.episode}`;
