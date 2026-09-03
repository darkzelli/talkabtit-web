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
    "The talking happens everywhere except where you watch: the credits roll and you go hunting for the discussion somewhere else.",
    "TalkAbtIT adds the comment section to the Netflix player itself — every comment pinned to the exact timestamp it's about, spoiler-tagged comments blurred until you tap them, and likes to surface the best reactions.",
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
