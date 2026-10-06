// Build-time loader for the watch parties under content/watch-parties/.
// Server components only — this reads from disk.
//
// One Markdown file per party, content/watch-parties/<slug>.md:
//
//   ---
//   title: Lioness Season 3 finale rewatch     # optional; built from show + episode when left out
//   description: One sentence for the hero, search results, and the calendar invite.
//   show: lioness            # slug under data/tv/ → poster, name, runtime, service come for free
//   season: 3
//   episode: 8
//   start: 2026-10-09T20:00:00-04:00   # ISO 8601 WITH the offset (-04:00 = EDT, -05:00 = EST)
//   duration: 75             # optional minutes; defaults to the show's runtime + 20
//   url: https://www.paramountplus.com/…   # where to press play (the episode on the service)
//   service: Paramount+      # optional override when the show isn't in data/tv/
//   showName: My Show        # optional override, same reason
//   poster: /blog/my.jpg     # optional override, same reason
//   post: lioness-season-3-finale-backlash   # optional blog slug to cross-link
//   draft: true              # shows in `next dev` only — never in the deployed build
//   ---
//
//   Optional body in Markdown (same flavor as the blog): house rules, what to
//   have watched first, whatever people should know before they join.
//
// A party disappears from the build once it's over, and the hero pill also
// hides itself in the browser the moment the end time passes, so a stale
// deploy never advertises a finished party. Nothing is shown when the
// folder has no upcoming party.
import fs from "node:fs";
import path from "node:path";
import { loadIndex, serviceFor } from "./tv";
import { parseFrontMatter, renderMarkdown } from "./blog";
import type { WatchParty } from "./watch-party-format";

export * from "./watch-party-format";

const DIR = path.join(process.cwd(), "content", "watch-parties");

let cache: WatchParty[] | null = null;

// Every party that hasn't ended as of the build, soonest first. Drafts are
// included in `next dev` so a party can be previewed before it goes public.
export function loadWatchParties(now = Date.now()): WatchParty[] {
  if (cache) return cache;
  if (!fs.existsSync(DIR)) return (cache = []);
  const shows = loadIndex().shows;
  const parties: WatchParty[] = [];
  for (const file of fs.readdirSync(DIR)) {
    if (!file.endsWith(".md") || file.startsWith("_")) continue;
    const raw = fs.readFileSync(path.join(DIR, file), "utf8");
    const { meta, body } = parseFrontMatter(raw);
    if (meta.draft === "true" && process.env.NODE_ENV === "production") continue;
    if (!meta.start) throw new Error(`content/watch-parties/${file}: front matter needs "start" (ISO 8601 with offset)`);
    const start = new Date(meta.start);
    if (Number.isNaN(start.getTime())) throw new Error(`content/watch-parties/${file}: "start" is not a valid date: ${meta.start}`);
    const show = meta.show ? shows.find((s) => s.slug === meta.show) : undefined;
    if (meta.show && !show && !meta.showName) {
      throw new Error(`content/watch-parties/${file}: show "${meta.show}" is not in data/tv/ — add showName:, poster: and service: to the front matter`);
    }
    const showName = meta.showName || show?.name || "";
    if (!showName && !meta.title) throw new Error(`content/watch-parties/${file}: needs "title" or "show"`);
    const season = meta.season ? Number(meta.season) : null;
    const episode = meta.episode ? Number(meta.episode) : null;
    const durationMinutes = meta.duration ? Number(meta.duration) : (show?.averageRuntime ?? 60) + 20;
    const end = new Date(start.getTime() + durationMinutes * 60_000);
    if (end.getTime() <= now) continue; // over — drop it from the build
    const service = serviceFor(meta.service || show?.network || null);
    const ep = season == null ? "" : episode == null ? ` Season ${season}` : ` Season ${season}, Episode ${episode}`;
    parties.push({
      slug: (meta.slug || file.replace(/\.md$/, "")).toLowerCase(),
      title: meta.title || `${showName}${ep} watch party`,
      description:
        meta.description ||
        `Watch ${showName}${ep} together with everyone else on TalkAbtIT — press play at the same time and the comments roll in live.`,
      show: show?.slug ?? null,
      showName,
      poster: meta.poster || show?.poster || null,
      season: Number.isFinite(season) ? season : null,
      episode: Number.isFinite(episode) ? episode : null,
      service,
      url: meta.url || null,
      start: start.toISOString(),
      end: end.toISOString(),
      durationMinutes,
      post: meta.post || null,
      html: body.trim() ? renderMarkdown(body) : "",
    });
  }
  parties.sort((a, b) => a.start.localeCompare(b.start));
  return (cache = parties);
}
