// Pulls episode data for every show in scripts/show-list.mjs from the TVmaze
// API and writes it to data/tv/ — one JSON per show plus an index — which the
// /how-long-to-watch/ and /countdown/ pages are prerendered from. No API key needed. Run by hand (`node scripts/fetch-shows.mjs`) or by
// the weekly refresh-shows workflow. TVmaze asks for attribution in return;
// the tool pages link back to tvmaze.com.
//
// Prints a review table (name / year / network / episodes) so a bad search
// match — the wrong "The Office" — is easy to spot and pin with `year` or `id`.

import { mkdir, writeFile, readdir, unlink, access } from "node:fs/promises";
import path from "node:path";
import { SHOWS } from "./show-list.mjs";

const API = "https://api.tvmaze.com";
const OUT = path.join(process.cwd(), "data", "tv");
// Show posters (TVmaze's 210x295 "medium" cut) are downloaded once into
// public/posters/<slug>.jpg and committed, so the pages never hotlink and the
// weekly refresh only fetches posters for newly added shows.
const POSTERS = path.join(process.cwd(), "public", "posters");
// TVmaze allows ~20 requests per 10 seconds; stay under it.
const GAP_MS = 600;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url, attempt = 0) {
  const res = await fetch(url);
  if (res.status === 429 && attempt < 5) {
    await sleep(3000 * (attempt + 1));
    return get(url, attempt + 1);
  }
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

// URL-safe slug from a show name: "Law & Order: SVU" -> "law-order-svu".
export function slugify(name) {
  return name
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const norm = (s) => (s || "").toLowerCase().replace(/[^a-z0-9]+/g, "");

// Strip TVmaze's HTML summaries to plain text, capped for the page payload.
function plain(html, max) {
  const text = (html || "")
    // paragraph/line breaks become spaces so sentences don't run together
    .replace(/<\/(p|br|div|li)>|<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

// Resolve a list entry to a TVmaze show id. Exact-name matches win; among
// those, the premiere-year hint wins, then TVmaze's popularity weight.
async function resolve(entry) {
  if (entry.id) return entry.id;
  const results = await get(`${API}/search/shows?q=${encodeURIComponent(entry.q)}`);
  if (!results?.length) return null;
  let pool = results.map((r) => r.show).filter((s) => norm(s.name) === norm(entry.q));
  if (!pool.length) pool = results.map((r) => r.show);
  if (entry.year) {
    const byYear = pool.filter((s) => (s.premiered || "").startsWith(String(entry.year)));
    if (byYear.length) pool = byYear;
  }
  pool.sort((a, b) => (b.weight || 0) - (a.weight || 0));
  return pool[0].id;
}

async function downloadPoster(url, slug) {
  const file = path.join(POSTERS, `${slug}.jpg`);
  try {
    await access(file);
    return `/posters/${slug}.jpg`;
  } catch {}
  const res = await fetch(url);
  if (!res.ok) return null;
  await writeFile(file, Buffer.from(await res.arrayBuffer()));
  await sleep(200);
  return `/posters/${slug}.jpg`;
}

async function fetchShow(id, displayName) {
  const show = await get(`${API}/shows/${id}?embed[]=episodes&embed[]=nextepisode`);
  if (!show) return null;
  const all = show._embedded?.episodes || [];
  // Regular numbered episodes only — specials carry number: null.
  const regular = all.filter((e) => e.number != null && e.season != null);
  const fallbackRuntime = show.averageRuntime || show.runtime || 30;

  const seasonsMap = new Map();
  for (const e of regular) {
    if (!seasonsMap.has(e.season)) seasonsMap.set(e.season, []);
    seasonsMap.get(e.season).push({
      n: e.number,
      name: e.name || `Episode ${e.number}`,
      airdate: e.airdate || null,
      runtime: e.runtime || fallbackRuntime,
    });
  }
  const seasons = [...seasonsMap.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([number, episodes]) => ({
      number,
      episodes: episodes.sort((a, b) => a.n - b.n),
      minutes: episodes.reduce((sum, e) => sum + e.runtime, 0),
    }));

  const totalMinutes = seasons.reduce((s, x) => s + x.minutes, 0);
  const episodeCount = regular.length;
  const next = show._embedded?.nextepisode;
  const nextEpisode =
    next && next.airstamp
      ? {
          season: next.season,
          number: next.number,
          name: next.name || null,
          airdate: next.airdate,
          airstamp: next.airstamp,
        }
      : null;
  const lastAired = [...regular]
    .filter((e) => e.airdate && e.airdate <= new Date().toISOString().slice(0, 10))
    .sort((a, b) => (a.airdate < b.airdate ? 1 : -1))[0];

  const name = displayName || show.name;
  const slug = slugify(name);
  const poster = show.image?.medium ? await downloadPoster(show.image.medium, slug) : null;
  return {
    id: show.id,
    slug,
    name,
    poster,
    tvmazeUrl: show.url,
    status: show.status,
    premiered: show.premiered || null,
    ended: show.ended || null,
    network: show.network?.name || show.webChannel?.name || null,
    genres: show.genres || [],
    language: show.language || null,
    rating: show.rating?.average || null,
    summary: plain(show.summary, 480),
    averageRuntime: episodeCount ? Math.round(totalMinutes / episodeCount) : fallbackRuntime,
    episodeCount,
    seasonCount: seasons.length,
    totalMinutes,
    seasons,
    nextEpisode,
    lastAired: lastAired
      ? { season: lastAired.season, number: lastAired.number, name: lastAired.name, airdate: lastAired.airdate }
      : null,
  };
}

async function main() {
  await mkdir(path.join(OUT, "shows"), { recursive: true });
  await mkdir(POSTERS, { recursive: true });
  const seen = new Set();
  const index = [];
  const rows = [];
  const problems = [];

  for (const entry of SHOWS) {
    try {
      const id = await resolve(entry);
      await sleep(GAP_MS);
      if (!id) {
        problems.push(`no match: ${entry.q}`);
        continue;
      }
      if (seen.has(id)) continue;
      seen.add(id);
      const show = await fetchShow(id, entry.name);
      await sleep(GAP_MS);
      if (!show || !show.episodeCount) {
        problems.push(`no episodes: ${entry.q} (id ${id})`);
        continue;
      }
      await writeFile(path.join(OUT, "shows", `${show.slug}.json`), JSON.stringify(show));
      const { seasons, summary, ...summaryRow } = show;
      index.push(summaryRow);
      rows.push(
        `${show.name.padEnd(42)} ${(show.premiered || "").slice(0, 4)}  ${(show.network || "").padEnd(18)} ${String(show.episodeCount).padStart(5)} eps  ${show.status}${show.nextEpisode ? "  next " + show.nextEpisode.airdate : ""}`,
      );
      process.stderr.write(".");
    } catch (err) {
      problems.push(`${entry.q}: ${err.message}`);
    }
  }
  process.stderr.write("\n");

  // Drop JSON for shows no longer in the list so the pages match the index.
  const keep = new Set(index.map((s) => `${s.slug}.json`));
  for (const f of await readdir(path.join(OUT, "shows"))) {
    if (!keep.has(f)) await unlink(path.join(OUT, "shows", f));
  }

  index.sort((a, b) => a.name.localeCompare(b.name));
  await writeFile(
    path.join(OUT, "index.json"),
    JSON.stringify({ fetchedAt: new Date().toISOString().slice(0, 10), shows: index }, null, 0),
  );

  console.log(rows.join("\n"));
  console.log(`\n${index.length} shows written to data/tv/`);
  if (problems.length) {
    console.log("\nProblems:\n" + problems.map((p) => "  - " + p).join("\n"));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
