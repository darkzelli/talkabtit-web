// One show in a poster grid: the TVmaze poster (committed under
// public/posters/), name, and a one-line meta. No box — the image is the
// shape. Presentational only, so both server pages and the client-side
// search results can render the same markup.
export type PosterItem = {
  slug: string;
  name: string;
  poster: string | null;
  meta: string;
  badge?: string | null;
};

export default function PosterCard({ item, base }: { item: PosterItem; base: string }) {
  return (
    <a className="pc" href={`${base}${item.slug}/`}>
      <span className="pc-img">
        {item.poster ? (
          <img src={item.poster} alt="" width={210} height={295} loading="lazy" decoding="async" />
        ) : (
          <span className="pc-fallback" aria-hidden="true">{item.name.slice(0, 1)}</span>
        )}
        {item.badge && <span className="pc-badge">{item.badge}</span>}
      </span>
      <span className="pc-name">{item.name}</span>
      <span className="pc-meta">{item.meta}</span>
    </a>
  );
}

export function PosterGrid({ items, base }: { items: PosterItem[]; base: string }) {
  return (
    <div className="pc-grid">
      {items.map((it) => (
        <PosterCard key={it.slug} item={it} base={base} />
      ))}
    </div>
  );
}
