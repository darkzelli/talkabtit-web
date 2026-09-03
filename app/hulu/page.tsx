import type { Metadata } from "next";
import ServicePage, { type ServiceConfig } from "@/components/ServicePage";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hulu Comment Section",
  description:
    "Add a comment section to Hulu with TalkAbtIT — a free Chrome extension that pins comments to the exact moment in every show. Talk about this week's episode right on the player.",
  alternates: { canonical: "/hulu/" },
  openGraph: {
    title: "Hulu Comment Section — TalkAbtIT",
    description:
      "A free Chrome extension that adds a time-stamped comment section to every show on Hulu.",
    url: "/hulu/",
    images: [OG_IMAGE],
  },
};

const hulu: ServiceConfig = {
  name: "Hulu",
  slug: "hulu",
  lede: "TalkAbtIT is a free Chrome extension that adds a time-stamped comment section to every show on Hulu. This week's episode drops, everyone reacts — and the reactions live right on the player, pinned to the moment.",
  pitch: [
    "Hulu is where week-to-week TV lives — next-day network episodes, currently airing seasons, the shows people actually talk about at work the next morning. But the talking happens everywhere except where you watch: the episode ends and you go hunting for the discussion somewhere else.",
    "TalkAbtIT puts that discussion on the Hulu player itself. Every comment is pinned to a timestamp, so reactions land exactly where they belong — the cold open, the reveal, the cliffhanger. Catch the episode the night it drops or three days later; the conversation is waiting at every moment either way.",
  ],
  steps: [
    {
      title: "Add TalkAbtIT to Chrome",
      body: "Install the free extension from the Chrome Web Store and pick a username. You sign in to Hulu exactly like you always do — TalkAbtIT never asks for your Hulu login.",
    },
    {
      title: "Press play on any show",
      body: "Open hulu.com and start any episode or movie. The popcorn bucket appears over the player — click it and the comment section slides in beside the video.",
    },
    {
      title: "Join the conversation",
      body: "Read reactions pinned to the exact moment they're about, drop your own, and like the best ones. Spoiler-tagged comments stay blurred until you tap them.",
    },
  ],
  faqs: [
    {
      q: "Does TalkAbtIT work with my Hulu plan?",
      a: (
        <>
          Yes — every Hulu plan works, with or without ads. TalkAbtIT overlays
          the comment section on the player in your browser; it doesn&apos;t
          change or touch your Hulu account.
        </>
      ),
      text: "Yes — every Hulu plan works, with or without ads. TalkAbtIT overlays the comment section on the player in your browser; it doesn't change or touch your Hulu account.",
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
      q: "Is the Hulu comment section free?",
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

export default function HuluPage() {
  return <ServicePage service={hulu} />;
}
