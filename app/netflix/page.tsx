import type { Metadata } from "next";
import ServicePage, { type ServiceConfig } from "@/components/ServicePage";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Netflix Comment Section",
  description:
    "Add a comment section to Netflix with TalkAbtIT — a free Chrome extension that pins comments to the exact moment in every show and movie. React to the twist the second it happens.",
  alternates: { canonical: "/netflix/" },
  openGraph: {
    title: "Netflix Comment Section — TalkAbtIT",
    description:
      "A free Chrome extension that adds a time-stamped comment section to every show and movie on Netflix.",
    url: "/netflix/",
    images: [OG_IMAGE],
  },
};

const netflix: ServiceConfig = {
  name: "Netflix",
  slug: "netflix",
  lede: "TalkAbtIT is a free Chrome extension that adds a time-stamped comment section to every show and movie on Netflix. React to the plot twist the second it lands — and read everyone else's reactions pinned to that exact moment.",
  pitch: [
    "When a Netflix show drops, the whole internet reacts at once — on X, on Reddit, in group chats — but none of it is attached to the moment you're actually watching. By the time you find the discussion, you've been spoiled or the thread has moved on.",
    "TalkAbtIT puts the conversation on the Netflix player itself. Every comment is pinned to a timestamp, so at 23:47 you see what everyone said about 23:47 — no spoilers from later in the episode, no digging through threads. Watch on your own schedule and it still feels like watching together.",
  ],
  steps: [
    {
      title: "Add TalkAbtIT to Chrome",
      body: "Install the free extension from the Chrome Web Store and pick a username. It takes a few seconds, and you sign in to Netflix exactly like you always do — TalkAbtIT never asks for your Netflix login.",
    },
    {
      title: "Press play on any show",
      body: "Open netflix.com and start any episode or movie. The popcorn bucket appears over the player — click it and the comment section slides in beside the video.",
    },
    {
      title: "Join the conversation",
      body: "Read reactions as they land at the exact moment they're about, drop your own, and like the best ones. Spoiler-tagged comments stay blurred until you tap them.",
    },
  ],
  faqs: [
    {
      q: "Does TalkAbtIT work with my Netflix plan?",
      a: (
        <>
          Yes — every Netflix plan works, including ad-supported ones. TalkAbtIT
          overlays the comment section on the player in your browser; it
          doesn&apos;t change or touch your Netflix account.
        </>
      ),
      text: "Yes — every Netflix plan works, including ad-supported ones. TalkAbtIT overlays the comment section on the player in your browser; it doesn't change or touch your Netflix account.",
    },
    {
      q: "Do my friends need to watch at the same time?",
      a: (
        <>
          No. Unlike watch-party tools, comments are pinned to timestamps in the
          show, not to a live session. Watch tonight, and your reactions are
          right there when a friend watches next week.
        </>
      ),
      text: "No. Unlike watch-party tools, comments are pinned to timestamps in the show, not to a live session. Watch tonight, and your reactions are right there when a friend watches next week.",
    },
    {
      q: "Will comments spoil the episode for me?",
      a: (
        <>
          You only see comments for the moment you&apos;re at — never for later
          in the episode. Comments marked as spoilers stay blurred until you
          choose to reveal them.
        </>
      ),
      text: "You only see comments for the moment you're at — never for later in the episode. Comments marked as spoilers stay blurred until you choose to reveal them.",
    },
    {
      q: "Is the Netflix comment section free?",
      a: (
        <>
          Yes. Commenting and reading are free and unlimited — no daily caps, no
          locked threads. An optional Premium upgrade adds cosmetic extras like
          pop-up comments and name styles.
        </>
      ),
      text: "Yes. Commenting and reading are free and unlimited — no daily caps, no locked threads. An optional Premium upgrade adds cosmetic extras like pop-up comments and name styles.",
    },
  ],
};

export default function NetflixPage() {
  return <ServicePage service={netflix} />;
}
