import type { Metadata } from "next";
import ServicePage, { type ServiceConfig } from "@/components/ServicePage";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Crunchyroll Comment Section",
  description:
    "Add a comment section to Crunchyroll with TalkAbtIT — a free Chrome extension that pins comments to the exact moment in every anime episode. React to every hype moment with other fans.",
  alternates: { canonical: "/crunchyroll/" },
  openGraph: {
    title: "Crunchyroll Comment Section — TalkAbtIT",
    description:
      "A free Chrome extension that adds a time-stamped comment section to every anime episode on Crunchyroll.",
    url: "/crunchyroll/",
    images: [OG_IMAGE],
  },
};

const crunchyroll: ServiceConfig = {
  name: "Crunchyroll",
  slug: "crunchyroll",
  lede: "TalkAbtIT is a free Chrome extension that adds a time-stamped comment section to every anime on Crunchyroll. Scream about the hype moment with other fans — pinned to the exact second it happens.",
  pitch: [
    "Anime fandom is built on shared reactions — episode threads, reaction clips, the whole season-of-the-week conversation. But on Crunchyroll itself, you watch in silence, and the discussion lives somewhere else entirely, usually full of spoilers for arcs you haven't reached.",
    "TalkAbtIT brings that energy onto the Crunchyroll player. Every comment is pinned to a timestamp, so the hype hits exactly when the moment does — whether you're watching a simulcast the hour it drops or catching up on a series years later. The conversation is always there, always in sync with where you are.",
  ],
  steps: [
    {
      title: "Add TalkAbtIT to Chrome",
      body: "Install the free extension from the Chrome Web Store and pick a username. You sign in to Crunchyroll like you always do — TalkAbtIT never asks for your Crunchyroll login.",
    },
    {
      title: "Press play on any anime",
      body: "Open crunchyroll.com and start any episode — simulcast or back catalog. The popcorn bucket appears over the player; click it and the comment section slides in beside the video.",
    },
    {
      title: "Join the conversation",
      body: "Read reactions pinned to the exact moment they're about, drop your own, and like the best ones. Spoiler-tagged comments stay blurred until you tap them — no getting spoiled on a later arc.",
    },
  ],
  faqs: [
    {
      q: "Does TalkAbtIT work with free Crunchyroll accounts?",
      a: (
        <>
          Yes — it works with any Crunchyroll account, free or Premium. TalkAbtIT
          overlays the comment section on the player in your browser; your
          Crunchyroll account is untouched.
        </>
      ),
      text: "Yes — it works with any Crunchyroll account, free or Premium. TalkAbtIT overlays the comment section on the player in your browser; your Crunchyroll account is untouched.",
    },
    {
      q: "Does it work on simulcasts?",
      a: (
        <>
          Yes. Comments work on every episode the moment it&apos;s on
          Crunchyroll — new simulcast episodes included. Someone starts every
          conversation, and the first comment on an episode permanently wears a
          &quot;started the conversation&quot; marker.
        </>
      ),
      text: "Yes. Comments work on every episode the moment it's on Crunchyroll — new simulcast episodes included. Someone starts every conversation, and the first comment on an episode permanently wears a \"started the conversation\" marker.",
    },
    {
      q: "Will I get spoiled on later arcs?",
      a: (
        <>
          No. You only see comments for the moment you&apos;re at in the
          episode, and comments marked as spoilers stay blurred until you choose
          to reveal them.
        </>
      ),
      text: "No. You only see comments for the moment you're at in the episode, and comments marked as spoilers stay blurred until you choose to reveal them.",
    },
    {
      q: "Is the Crunchyroll comment section free?",
      a: (
        <>
          Yes. Commenting and reading are free and unlimited. An optional
          Premium upgrade adds cosmetic extras like pop-up comments over the
          video and animated name styles.
        </>
      ),
      text: "Yes. Commenting and reading are free and unlimited. An optional Premium upgrade adds cosmetic extras like pop-up comments over the video and animated name styles.",
    },
  ],
};

export default function CrunchyrollPage() {
  return <ServicePage service={crunchyroll} />;
}
