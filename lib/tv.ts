// Build-time loaders for the show data under data/tv/ (written by
// scripts/fetch-shows.mjs). Server components only — this reads from disk.
// Types and formatting helpers are re-exported from lib/tv-format.ts so pages
// can import everything from one place.
import fs from "node:fs";
import path from "node:path";
import type { Show, ShowIndex } from "./tv-format";

export * from "./tv-format";

const DIR = path.join(process.cwd(), "data", "tv");

let indexCache: ShowIndex | null = null;
export function loadIndex(): ShowIndex {
  if (!indexCache) {
    indexCache = JSON.parse(fs.readFileSync(path.join(DIR, "index.json"), "utf8"));
  }
  return indexCache!;
}

export function loadShow(slug: string): Show {
  return JSON.parse(fs.readFileSync(path.join(DIR, "shows", `${slug}.json`), "utf8"));
}

// This week's most-watched shows (data/tv/trending.json, written by
// scripts/fetch-trending.mjs from JustWatch's US popularity chart). Null when
// the file is missing so pages can simply skip the section.
export type TrendingShow = { rank: number; slug: string; title: string; url: string };
export type Trending = { fetchedAt: string; source: string; sourceUrl: string; shows: TrendingShow[] };

let trendingCache: Trending | null | undefined;
export function loadTrending(): Trending | null {
  if (trendingCache === undefined) {
    try {
      trendingCache = JSON.parse(fs.readFileSync(path.join(DIR, "trending.json"), "utf8"));
    } catch {
      trendingCache = null;
    }
  }
  return trendingCache ?? null;
}
