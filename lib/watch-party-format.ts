// Pure types and helpers for watch parties — no filesystem access, so the
// client components (hero pill, live status) can import from here. The
// build-time loader is lib/watch-parties.ts.

export type WatchParty = {
  slug: string;
  title: string; // "Lioness Season 3 finale rewatch"
  description: string;
  show: string | null; // slug in data/tv/, when it is one
  showName: string;
  poster: string | null;
  season: number | null;
  episode: number | null;
  service: { label: string; href: string } | null; // supported service, for copy + landing-page link
  url: string | null; // where to press play: the episode on the streaming service
  start: string; // ISO 8601 with offset, e.g. 2026-10-09T20:00:00-04:00
  end: string; // ISO 8601 — start + duration
  durationMinutes: number;
  post: string | null; // a blog slug to cross-link
  html: string; // rendered body (optional notes under the hero)
};

export type PartyStatus = "upcoming" | "live" | "ended";

export function partyStatus(p: Pick<WatchParty, "start" | "end">, now = Date.now()): PartyStatus {
  const start = new Date(p.start).getTime();
  const end = new Date(p.end).getTime();
  if (now >= end) return "ended";
  if (now >= start) return "live";
  return "upcoming";
}

// The one party the homepage advertises: live beats upcoming, soonest first.
export function featuredParty<T extends Pick<WatchParty, "start" | "end">>(parties: T[], now = Date.now()): T | null {
  const open = parties.filter((p) => partyStatus(p, now) !== "ended");
  if (!open.length) return null;
  return open.find((p) => partyStatus(p, now) === "live") ?? open.sort((a, b) => a.start.localeCompare(b.start))[0];
}

// "S3 E8" / "Season 3" / "" — the compact episode tag.
export function episodeTag(p: Pick<WatchParty, "season" | "episode">): string {
  if (p.season == null) return "";
  const s = p.season >= 1900 ? `${p.season}` : `S${p.season}`;
  return p.episode == null ? s : `${s} E${p.episode}`;
}

// "Thu, Oct 9 · 8:00 PM EDT". Server renders Eastern (the default); the
// client re-renders in the viewer's own zone after mount.
export function formatPartyStart(iso: string, timeZone = "America/New_York"): string {
  const d = new Date(iso);
  const day = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone });
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone, timeZoneName: "short" });
  return `${day} · ${time}`;
}

// "3d 14h" / "2h 05m" / "4m" — what the hero pill shows before start.
export function formatUntil(iso: string, now = Date.now()): string {
  const s = Math.max(0, Math.floor((new Date(iso).getTime() - now) / 1000));
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (d) return `${d}d ${h}h`;
  if (h) return `${h}h ${String(m).padStart(2, "0")}m`;
  return `${Math.max(1, m)}m`;
}

// Google Calendar "add event" link — no file download, works on every static host.
export function calendarUrl(p: WatchParty, pageUrl: string): string {
  const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: `${p.title} · TalkAbtIT watch party`,
    dates: `${stamp(p.start)}/${stamp(p.end)}`,
    details: `${p.description}\n\nHow to join: ${pageUrl}${p.url ? `\nPress play here: ${p.url}` : ""}`,
    location: p.url ?? pageUrl,
  });
  return `https://calendar.google.com/calendar/render?${q}`;
}
