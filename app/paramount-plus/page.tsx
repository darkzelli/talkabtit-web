import type { Metadata } from "next";
import ServicePage, { type ServiceConfig } from "@/components/ServicePage";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Paramount+ Comment Section",
  description:
    "Add a comment section to Paramount+ with TalkAbtIT — a free Chrome extension that pins comments to the exact moment in every show and movie. Talk about the episode right on the player.",
  alternates: { canonical: "/paramount-plus/" },
  openGraph: {
    title: "Paramount+ Comment Section — TalkAbtIT",
    description:
      "A free Chrome extension that adds a time-stamped comment section to every show and movie on Paramount+.",
    url: "/paramount-plus/",
    images: [OG_IMAGE],
  },
};

const paramountPlus: ServiceConfig = {
  name: "Paramount+",
  slug: "paramount-plus",
  lede: "TalkAbtIT is a free Chrome extension that adds a time-stamped comment section to every show and movie on Paramount+. A new episode drops, everyone reacts — and the reactions live right on the player, pinned to the moment.",
  pitch: [
    "The talking happens everywhere except where you watch: the episode ends and you go hunting for the discussion somewhere else.",
    "TalkAbtIT puts the comment section right on the Paramount+ player — every comment pinned to the exact moment it's about, spoiler-tagged comments blurred until you tap them, and likes to float the best reactions to the top.",
  ],
  steps: [
    {
      title: "Add TalkAbtIT to Chrome",
      body: "Install the free extension from the Chrome Web Store and pick a username. You sign in to Paramount+ exactly like you always do — TalkAbtIT never asks for your Paramount+ login.",
    },
    {
      title: "Press play on any show",
      body: "Open paramountplus.com and start any episode or movie. The popcorn bucket appears over the player — click it and the comment section slides in beside the video.",
    },
    {
      title: "Join the conversation",
      body: "Read reactions pinned to the exact moment they're about, drop your own, and like the best ones. Spoiler-tagged comments stay blurred until you tap them.",
    },
  ],
  faqs: [
    {
      q: "Does TalkAbtIT work with my Paramount+ plan?",
      a: (
        <>
          Yes — every Paramount+ plan works, Essential or Premium, with or
          without ads. TalkAbtIT overlays the comment section on the player in
          your browser; it doesn&apos;t change or touch your Paramount+ account.
        </>
      ),
      text: "Yes — every Paramount+ plan works, Essential or Premium, with or without ads. TalkAbtIT overlays the comment section on the player in your browser; it doesn't change or touch your Paramount+ account.",
    },
    {
      q: "Do my friends need to watch at the same time?",
      a: (
        <>
          No. Comments are pinned to timestamps in the show, not to a live
          session — so it works even when everyone watches on their own
          schedule, which is how weekly TV actually gets watched.
        </>
      ),
      text: "No. Comments are pinned to timestamps in the show, not to a live session — so it works even when everyone watches on their own schedule, which is how weekly TV actually gets watched.",
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
      q: "Is the Paramount+ comment section free?",
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

export default function ParamountPlusPage() {
  return <ServicePage service={paramountPlus} />;
}
