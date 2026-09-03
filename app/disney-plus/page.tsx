import type { Metadata } from "next";
import ServicePage, { type ServiceConfig } from "@/components/ServicePage";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Disney+ Comment Section",
  description:
    "Add a comment section to Disney+ with TalkAbtIT — a free Chrome extension that pins comments to the exact moment in every show and movie. React to every premiere with everyone else.",
  alternates: { canonical: "/disney-plus/" },
  openGraph: {
    title: "Disney+ Comment Section — TalkAbtIT",
    description:
      "A free Chrome extension that adds a time-stamped comment section to every show and movie on Disney+.",
    url: "/disney-plus/",
    images: [OG_IMAGE],
  },
};

const disneyPlus: ServiceConfig = {
  name: "Disney+",
  slug: "disney-plus",
  lede: "TalkAbtIT is a free Chrome extension that adds a time-stamped comment section to every show and movie on Disney+. Premiere night reactions, pinned to the exact moment — there when you watch, whenever that is.",
  pitch: [
    "The talking happens everywhere except where you watch: the premiere ends and the discussion scatters across the internet.",
    "TalkAbtIT pins the conversation to the Disney+ player — comments attached to the exact moment they're about, spoiler-tagged comments blurred until you tap them, and likes to lift the best reactions.",
  ],
  steps: [
    {
      title: "Add TalkAbtIT to Chrome",
      body: "Install the free extension from the Chrome Web Store and pick a username. You sign in to Disney+ like you always do — TalkAbtIT never asks for your Disney+ login.",
    },
    {
      title: "Press play on any title",
      body: "Open disneyplus.com and start any episode or movie. The popcorn bucket appears over the player — click it and the comment section slides in beside the video.",
    },
    {
      title: "Join the conversation",
      body: "Read reactions pinned to the exact moment they're about, drop your own, and like the best ones. Spoiler-tagged comments stay blurred until you tap them.",
    },
  ],
  faqs: [
    {
      q: "Does TalkAbtIT work with my Disney+ plan?",
      a: (
        <>
          Yes — every Disney+ plan works, including ad-supported ones. TalkAbtIT
          overlays the comment section on the player in your browser; your
          Disney+ account is untouched.
        </>
      ),
      text: "Yes — every Disney+ plan works, including ad-supported ones. TalkAbtIT overlays the comment section on the player in your browser; your Disney+ account is untouched.",
    },
    {
      q: "Will comments spoil the episode?",
      a: (
        <>
          No. You only see comments for the moment you&apos;re at — never for
          later in the episode — and comments marked as spoilers stay blurred
          until you choose to reveal them.
        </>
      ),
      text: "No. You only see comments for the moment you're at — never for later in the episode — and comments marked as spoilers stay blurred until you choose to reveal them.",
    },
    {
      q: "Do my friends need to watch at the same time?",
      a: (
        <>
          No. Comments are pinned to timestamps in the show, not to a live
          session. Your reactions are there when a friend catches up on the
          weekend.
        </>
      ),
      text: "No. Comments are pinned to timestamps in the show, not to a live session. Your reactions are there when a friend catches up on the weekend.",
    },
    {
      q: "Is the Disney+ comment section free?",
      a: (
        <>
          Yes. Commenting and reading are free and unlimited. An optional
          Premium upgrade adds cosmetic extras like pop-up comments and name
          styles.
        </>
      ),
      text: "Yes. Commenting and reading are free and unlimited. An optional Premium upgrade adds cosmetic extras like pop-up comments and name styles.",
    },
  ],
};

export default function DisneyPlusPage() {
  return <ServicePage service={disneyPlus} />;
}
