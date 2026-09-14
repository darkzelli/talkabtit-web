// The install walkthrough, shared by /how-to-install/ (all six steps) and
// /welcome/ (the page the extension opens on a fresh install — steps 3–6,
// since by then the store and the pin are done). Each step carries the
// screenshot the homepage walkthrough already ships (public/how-step-*.avif)
// plus the two install-only shots. w/h are the asset's intrinsic pixels so
// the browser reserves the box before it loads; `fit` picks the CSS
// treatment for the shots that aren't 16:9 captures.
export type Step = {
  title: string;
  body: string;
  img?: string;
  alt?: string;
  w?: number;
  h?: number;
  fit?: "tall" | "narrow";
};

export const INSTALL_STEPS: Step[] = [
  {
    title: "Add TalkAbtIT from the Chrome Web Store",
    body: "Open the listing in Chrome (or Edge, Brave, or another Chromium browser) on your computer and click Add to Chrome, then Add extension in the confirmation. It's free and there's nothing else to download.",
    img: "/how-step-1.avif",
    alt: "TalkAbtIT extension listing on the Chrome Web Store",
  },
  {
    title: "Pin it to your toolbar",
    body: "Click the puzzle-piece button at the top right of Chrome, just to the right of the address bar. Find TalkAbtIT in the list and click the pin next to it so the popcorn icon stays in your toolbar.",
    img: "/how-step-pin.avif",
    alt: "Chrome's Extensions menu open from the puzzle-piece button, with the pin next to TalkAbtIT",
    w: 650,
    h: 482,
    fit: "narrow",
  },
  {
    title: "Click the popcorn icon and sign in",
    body: "Click the TalkAbtIT popcorn icon in your toolbar and continue with Google or GitHub, or enter your email and we'll send you a code — no password to make up. Then choose a username, the name everyone sees next to your comments.",
    img: "/how-step-signin.avif",
    alt: "The TalkAbtIT extension popup open in Chrome, showing the sign-in panel with Google and GitHub buttons and an email field",
    w: 684,
    h: 1288,
    fit: "tall",
  },
  {
    title: "Open your streaming service",
    body: "Head to Netflix, Hulu, Disney+, HBO Max, Paramount+, or Crunchyroll and sign in like you always do. TalkAbtIT never asks for your streaming login.",
    img: "/how-step-2.avif",
    alt: "Netflix home page with a TalkAbtIT comment popping up over the featured preview",
  },
  {
    title: "Press play and find the popcorn bucket",
    body: "Start any show or movie. Hover over the video and the popcorn bucket appears on the right edge of the player, with a count of the comments waiting on that episode.",
    img: "/how-step-3.avif",
    alt: "An episode playing on Netflix with the TalkAbtIT popcorn bucket at the edge of the video",
  },
  {
    title: "Click the bucket and join in",
    body: "The comment section slides in beside the video, matched to the exact episode. Comments are pinned to the moment they were written, so read along as they land and drop your own.",
    img: "/how-step-4.avif",
    alt: "The TalkAbtIT comment panel open beside an episode on Netflix",
  },
];

// The part that's left once the extension is installed: sign in, open a
// service, press play, click the bucket. What /welcome/ walks through.
export const AFTER_INSTALL_STEPS = INSTALL_STEPS.slice(2);
