// Pulls the most popular TV shows in the US this week from JustWatch (the
// "Popular" chart on justwatch.com) and writes data/tv/trending.json, which
// the binge calculator's "Most watched this week" section is prerendered from.
//
// Any chart show that isn't in data/tv/ yet is looked up on TVmaze and
// fetched the same way scripts/fetch-shows.mjs does, then remembered in
// data/tv/extra-shows.json so the weekly refresh keeps it (and its
// /tools/how-long-to-watch/ URL) after it drops off the chart. Run after
// fetch-shows.mjs: `node scripts/fetch-trending.mjs`.
//
// JustWatch has no public API; this uses the GraphQL endpoint their site
// calls. If it ever changes shape or refuses us, the script leaves the
// previous trending.json in place and exits 0 so the weekly job still ships
// the TVmaze refresh.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  EXTRA_FILE,
  OUT,
  fetchShow,
  get,
  loadExtraShows,
  norm,
  sleep,
  toIndexRow,
} from "./fetch-shows.mjs";

const JUSTWATCH = "https://apis.justwatch.com/graphql";
const TVMAZE = "https://api.tvmaze.com";
const WANT = 12; // how many shows the section shows
const ASK = 30; // chart depth to pull; some won't resolve on TVmaze
const TRENDING_FILE = path.join(OUT, "trending.json");

const QUERY = `
query GetPopularTitles($country: Country!, $first: Int!, $filter: TitleFilter, $sortBy: PopularTitlesSorting!, $sortRandomSeed: Int!, $language: Language!) {
  popularTitles(country: $country, first: $first, filter: $filter, sortBy: $sortBy, sortRandomSeed: $sortRandomSeed) {
    edges {
      node {
        id
        content(country: $country, language: $language) {
          title
          originalReleaseYear
          fullPath
        }
      }
    }
  }
}`;

async function fetchChart() {
  const res = await fetch(JUSTWATCH, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      // The endpoint 403s the default Node UA.
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36",
    },
    body: JSON.stringify({
      operationName: "GetPopularTitles",
      query: QUERY,
      variables: {
        country: "US",
        language: "en",
        first: ASK,
        sortRandomSeed: 0,
        sortBy: "POPULAR",
        filter: { objectTypes: ["SHOW"] },
      },
    }),
  });
  if (!res.ok) throw new Error(`JustWatch ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(`JustWatch: ${json.errors[0].message}`);
  const edges = json.data?.popularTitles?.edges || [];
  if (!edges.length) throw new Error("JustWatch: empty chart");
  return edges.map((e) => ({
    title: e.node.content.title,
    year: e.node.content.originalReleaseYear || null,
    url: `https://www.justwatch.com${e.node.content.fullPath}`,
  }));
}

const yearOf = (show) => Number((show.premiered || "").slice(0, 4)) || null;
const yearsMatch = (a, b) => !a || !b || Math.abs(a - b) <= 1;

// Find a chart title in the index: same normalized name, and the premiere
// year agrees when both sides have one (so "Dark Matter" 2024 doesn't pick
// up the 2015 series if both are ever in the list).
function findInIndex(index, entry) {
  const key = norm(entry.title);
  const same = index.filter((s) => norm(s.name) === key);
  return same.find((s) => yearsMatch(yearOf(s), entry.year)) || null;
}

// Stricter than fetch-shows' resolve(): the chart is full of brand-new
// titles TVmaze may not carry yet, and a loose match would put the wrong
// show on the page. Require the name to match (exactly, or one containing
// the other, for "Lioness" vs "Special Ops: Lioness") and the year to agree.
async function resolveOnTvmaze(entry) {
  const results = await get(`${TVMAZE}/search/shows?q=${encodeURIComponent(entry.title)}`);
  const key = norm(entry.title);
  const pool = (results || [])
    .map((r) => r.show)
    .filter((s) => {
      const n = norm(s.name);
      return (n === key || n.includes(key) || key.includes(n)) && yearsMatch(yearOf(s), entry.year);
    })
    .sort((a, b) => (norm(a.name) === key ? -1 : norm(b.name) === key ? 1 : (b.weight || 0) - (a.weight || 0)));
  return pool[0] || null;
}

async function main() {
  let chart;
  try {
    chart = await fetchChart();
  } catch (err) {
    console.warn(`Skipping trending refresh: ${err.message}`);
    return;
  }

  const indexFile = path.join(OUT, "index.json");
  const index = JSON.parse(await readFile(indexFile, "utf8"));
  const extra = await loadExtraShows();
  const known = new Set(index.shows.map((s) => s.id));
  const picked = [];
  const notes = [];
  let added = false;

  for (const entry of chart) {
    if (picked.length >= WANT) break;
    let show = findInIndex(index.shows, entry);
    if (!show) {
      try {
        const hit = await resolveOnTvmaze(entry);
        await sleep(600);
        if (!hit) {
          notes.push(`not on TVmaze: ${entry.title} (${entry.year || "?"})`);
          continue;
        }
        if (known.has(hit.id)) {
          // Chart title differs from the name we file it under.
          show = index.shows.find((s) => s.id === hit.id);
        } else {
          const full = await fetchShow(hit.id, entry.title);
          await sleep(600);
          if (!full || !full.episodeCount) {
            notes.push(`no episodes yet: ${entry.title} (TVmaze ${hit.id})`);
            continue;
          }
          await writeFile(path.join(OUT, "shows", `${full.slug}.json`), JSON.stringify(full));
          show = toIndexRow(full);
          index.shows.push(show);
          known.add(show.id);
          extra.push({ id: hit.id, q: entry.title, name: entry.title, addedFrom: "justwatch" });
          added = true;
          notes.push(`added: ${entry.title} → ${full.slug} (${full.episodeCount} eps)`);
        }
      } catch (err) {
        notes.push(`${entry.title}: ${err.message}`);
        continue;
      }
    }
    if (picked.some((p) => p.slug === show.slug)) continue;
    picked.push({ rank: picked.length + 1, slug: show.slug, title: entry.title, url: entry.url });
  }

  if (picked.length < 5) {
    console.warn(`Skipping trending refresh: only ${picked.length} chart shows resolved`);
    return;
  }

  if (added) {
    index.shows.sort((a, b) => a.name.localeCompare(b.name));
    await writeFile(indexFile, JSON.stringify(index, null, 0));
    await writeFile(EXTRA_FILE, JSON.stringify(extra, null, 2) + "\n");
  }
  await writeFile(
    TRENDING_FILE,
    JSON.stringify(
      {
        fetchedAt: new Date().toISOString().slice(0, 10),
        source: "JustWatch",
        sourceUrl: "https://www.justwatch.com/us",
        shows: picked,
      },
      null,
      2,
    ) + "\n",
  );

  console.log(picked.map((p) => `${String(p.rank).padStart(2)}. ${p.title.padEnd(40)} /tools/how-long-to-watch/${p.slug}/`).join("\n"));
  if (notes.length) console.log("\nNotes:\n" + notes.map((n) => "  - " + n).join("\n"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
