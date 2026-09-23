"use client";

import { useMemo, useState, type ReactNode } from "react";
import PosterCard, { type PosterItem } from "./PosterCard";

// The search band under a tool page's hero. Sticky beneath the nav; while a
// query is typed the browse sections (`children`) are swapped for matching
// poster cards, and cleared they come back. `persistent` renders beneath
// either way — the FAQ and CTA on the binge page. Everything is
// server-rendered with every show link, so crawlers see the full list.
export default function ShowFinder({
  items,
  base,
  placeholder = "Search shows…",
  children,
  persistent,
}: {
  items: PosterItem[];
  base: string;
  placeholder?: string;
  children: ReactNode;
  persistent?: ReactNode;
}) {
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const shown = useMemo(
    () => (needle ? items.filter((s) => s.name.toLowerCase().includes(needle)) : []),
    [items, needle],
  );

  return (
    <>
      <div className="finder-band">
        <div className="wrap">
          <label className="finder">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <span className="sr-only" style={{ position: "absolute", left: -9999 }}>Search shows</span>
            <input
              type="search"
              value={q}
              placeholder={placeholder}
              autoComplete="off"
              onChange={(e) => setQ(e.target.value)}
            />
            {q && (
              <button type="button" className="finder-clear" onClick={() => setQ("")} aria-label="Clear search">
                ×
              </button>
            )}
          </label>
        </div>
      </div>
      <section className="content">
        <div className="wrap">
          {needle ? (
            <>
              <p className="finder-count" aria-live="polite">
                {shown.length === 0
                  ? "No matches. The list is curated; ask for a show at support@talkabtit.app."
                  : `${shown.length} ${shown.length === 1 ? "match" : "matches"}`}
              </p>
              <div className="pc-grid">
                {shown.map((it) => (
                  <PosterCard key={it.slug} item={it} base={base} />
                ))}
              </div>
            </>
          ) : (
            children
          )}
          {persistent}
        </div>
      </section>
    </>
  );
}
