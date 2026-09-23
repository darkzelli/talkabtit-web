// Pure helpers and types for the show data — no filesystem access, so client
// components can import from here. The build-time loaders live in lib/tv.ts.

export type Episode = {
  n: number;
  name: string;
  airdate: string | null;
  runtime: number;
};
export type Season = { number: number; episodes: Episode[]; minutes: number };
export type NextEpisode = {
  season: number;
  number: number;
  name: string | null;
  airdate: string;
  airstamp: string;
};
export type LastAired = { season: number; number: number; name: string; airdate: string };

export type ShowSummary = {
  id: number;
  slug: string;
  name: string;
  poster: string | null; // /posters/<slug>.jpg, committed by the fetch script
  tvmazeUrl: string;
  status: string; // "Running" | "Ended" | "To Be Determined" | "In Development"
  premiered: string | null;
  ended: string | null;
  network: string | null;
  genres: string[];
  language: string | null;
  rating: number | null;
  averageRuntime: number;
  episodeCount: number;
  seasonCount: number;
  totalMinutes: number;
  nextEpisode: NextEpisode | null;
  lastAired: LastAired | null;
};
export type Show = ShowSummary & { summary: string; seasons: Season[] };
export type ShowIndex = { fetchedAt: string; shows: ShowSummary[] };

// "3 days, 4 hours" / "76 hours, 30 minutes" / "45 minutes"
export function formatDuration(minutes: number): string {
  const m = Math.round(minutes);
  const days = Math.floor(m / 1440);
  const hours = Math.floor((m % 1440) / 60);
  const mins = m % 60;
  const parts: string[] = [];
  if (days) parts.push(`${days} day${days === 1 ? "" : "s"}`);
  if (hours) parts.push(`${hours} hour${hours === 1 ? "" : "s"}`);
  if (mins && !days) parts.push(`${mins} minute${mins === 1 ? "" : "s"}`);
  return parts.length ? parts.join(", ") : "0 minutes";
}

// "76.5 hours" — the one-number version for headlines and tables.
export function formatHours(minutes: number): string {
  const h = minutes / 60;
  const rounded = h >= 100 ? Math.round(h) : Math.round(h * 10) / 10;
  return `${rounded.toLocaleString("en-US")} hour${rounded === 1 ? "" : "s"}`;
}

export function daysAtPace(minutes: number, minutesPerDay: number): number {
  return Math.max(1, Math.ceil(minutes / minutesPerDay));
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

// "2005–2013", "2016–present", or "" when unknown.
export function yearSpan(show: ShowSummary): string {
  const start = show.premiered?.slice(0, 4);
  if (!start) return "";
  const end = (show.status === "Ended" ? show.lastAired?.airdate || show.ended : show.ended)?.slice(0, 4);
  if (end && end !== start) return `${start}–${end}`;
  if (end) return start;
  return show.status === "Ended" ? start : `${start}–present`;
}

// Where the show's original network maps onto a service TalkAbtIT supports, so
// the CTA can point at the matching landing page. Only the six supported
// services; anything else gets the generic store CTA.
export function serviceFor(network: string | null): { href: string; label: string } | null {
  if (!network) return null;
  const n = network.toLowerCase();
  if (n === "netflix") return { href: "/netflix/", label: "Netflix" };
  if (n === "hulu") return { href: "/hulu/", label: "Hulu" };
  if (n.includes("disney")) return { href: "/disney-plus/", label: "Disney+" };
  if (n === "hbo" || n.includes("hbo max") || n === "max") return { href: "/hbo-max/", label: "HBO Max" };
  if (n.includes("paramount") || n === "cbs" || n === "showtime") return { href: "/paramount-plus/", label: "Paramount+" };
  if (n.includes("crunchyroll") || n === "funimation") return { href: "/crunchyroll/", label: "Crunchyroll" };
  return null;
}

// The date a finished show actually finished: the last regular episode's air
// date. TVmaze's `ended` can be later (Breaking Bad's is the 2019 film).
export function endedOn(show: ShowSummary): string | null {
  if (show.status !== "Ended") return null;
  return show.lastAired?.airdate || show.ended || null;
}

// TVmaze numbers some long-running shows' seasons by year (One Piece's
// "season 2026"); label those as the year instead of "Season 2026".
export function seasonLabel(n: number): string {
  return n >= 1900 ? `${n}` : `Season ${n}`;
}
export function seasonShort(n: number): string {
  return n >= 1900 ? `${n}` : `S${n}`;
}

export function isUpcoming(show: ShowSummary, today = new Date()): boolean {
  return !!show.nextEpisode && new Date(show.nextEpisode.airstamp).getTime() > today.getTime();
}

// A handful of other shows for the "more like this" strip: same first genre
// when possible, padded from the rest of the index.
export function relatedShows(show: ShowSummary, all: ShowSummary[], count = 6): ShowSummary[] {
  const genre = show.genres[0];
  const same = all.filter((s) => s.slug !== show.slug && genre && s.genres.includes(genre));
  const rest = all.filter((s) => s.slug !== show.slug && !same.includes(s));
  // Deterministic pick so the build output is stable between runs.
  const seed = show.id;
  const pick = (arr: ShowSummary[], n: number) => {
    const out: ShowSummary[] = [];
    for (let i = 0; i < arr.length && out.length < n; i++) {
      out.push(arr[(seed + i * 7) % arr.length]);
    }
    return [...new Set(out)];
  };
  const chosen = pick(same, count);
  return chosen.length >= count ? chosen : [...chosen, ...pick(rest, count - chosen.length)];
}
