import type { Metadata } from "next";
import ServicePage, { type ServiceConfig } from "@/components/ServicePage";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "HBO Max Comment Section",
  description:
    "Add a comment section to HBO Max with TalkAbtIT — a free Chrome extension that pins comments to the exact moment in every episode. Episode discussion, right on the player.",
  alternates: { canonical: "/hbo-max/" },
  openGraph: {
    title: "HBO Max Comment Section — TalkAbtIT",
    description:
      "A free Chrome extension that adds a time-stamped comment section to every show and movie on HBO Max.",
    url: "/hbo-max/",
    images: [OG_IMAGE],
  },
};

const hboMax: ServiceConfig = {
  name: "HBO Max",
  slug: "hbo-max",
  lede: "TalkAbtIT is a free Chrome extension that adds a time-stamped comment section to every show and movie on HBO Max. The Sunday-night episode ends and everyone has thoughts — now they live on the player, pinned to the moment.",
  pitch: [
    "The talking happens everywhere except where you watch: the Sunday episode ends and the discussion lives in threads you have to go find.",
    "TalkAbtIT puts the comment section on the HBO Max player — every comment pinned to its exact scene, spoiler-tagged comments blurred until you tap them, and likes to rank the best reactions.",
  ],
  steps: [
    {
      title: "Add TalkAbtIT to Chrome",
      body: "Install the free extension from the Chrome Web Store and pick a username. You sign in to HBO Max like you always do — TalkAbtIT never asks for your HBO Max login.",
    },
    {
      title: "Press play on any title",
      body: "Open the HBO Max site and start any episode or movie. The popcorn bucket appears over the player — click it and the comment section slides in beside the video.",
    },
    {
      title: "Join the conversation",
      body: "Read reactions pinned to the exact moment they're about, drop your own, and like the best ones. Spoiler-tagged comments stay blurred until you tap them.",
    },
  ],
  faqs: [
    {
      q: "Does TalkAbtIT work with my HBO Max plan?",
      a: (
        <>
          Yes — every HBO Max plan works, with or without ads. TalkAbtIT
          overlays the comment section on the player in your browser; your HBO
          Max account is untouched.
        </>
      ),
      text: "Yes — every HBO Max plan works, with or without ads. TalkAbtIT overlays the comment section on the player in your browser; your HBO Max account is untouched.",
    },
    {
      q: "Do my friends need to watch at the same time?",
      a: (
        <>
          No. Comments are pinned to timestamps in the episode, not to a live
          session — the Sunday-night crowd&apos;s reactions are right there when
          you catch up midweek.
        </>
      ),
      text: "No. Comments are pinned to timestamps in the episode, not to a live session — the Sunday-night crowd's reactions are right there when you catch up midweek.",
    },
    {
      q: "Will comments spoil the episode?",
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
      q: "Is the HBO Max comment section free?",
      a: (
        <>
          Yes. Commenting and reading are free and unlimited — no daily caps, no
          locked threads. An optional Premium upgrade adds cosmetic extras.
        </>
      ),
      text: "Yes. Commenting and reading are free and unlimited — no daily caps, no locked threads. An optional Premium upgrade adds cosmetic extras.",
    },
  ],
};

export default function HboMaxPage() {
  return <ServicePage service={hboMax} />;
}
