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

