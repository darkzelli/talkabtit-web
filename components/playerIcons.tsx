/* Player glyphs shared by the demo stage and the per-service skin cycler.
   Every one takes a size and a stroke weight, because the skins differ partly
   in how heavy their icons are — Disney+ draws chunky and round, Max draws
   thin and flat. Drawn rather than traced from any service's assets. */

type G = { size?: number; stroke?: number };

export const Play = ({ size = 22 }: G) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.1-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14z" />
  </svg>
);

export const Pause = ({ size = 22 }: G) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 4h3.2v16H7zM13.8 4H17v16h-3.2z" />
  </svg>
);

/* back/forward N seconds — the number rides inside the loop, like every player */
export const Skip = ({ dir, secs = 10, size = 22, stroke = 1.9 }: G & { dir: "back" | "fwd"; secs?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {dir === "back" ? (
      <><path d="M11.5 5.5 7 9l4.5 3.5" /><path d="M7 9h6.2a5.8 5.8 0 1 1 0 11.6H8.4" /></>
    ) : (
      <><path d="M12.5 5.5 17 9l-4.5 3.5" /><path d="M17 9h-6.2a5.8 5.8 0 1 0 0 11.6h4.8" /></>
    )}
    <text x="12" y="18.4" fontSize="7" fontWeight="800" fill="currentColor" stroke="none" textAnchor="middle">
      {secs}
    </text>
  </svg>
);

export const Vol = ({ level = 1, size = 22, stroke = 1.9 }: G & { level?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 9.5h3.2L12 5.4v13.2L7.2 14.5H4z" fill="currentColor" />
    {level === 0 ? (
      <><path d="M16.5 9.5 21 14" /><path d="M21 9.5 16.5 14" /></>
    ) : (
      <>
        <path d="M15.6 9.6a3.4 3.4 0 0 1 0 4.8" />
        {level > 0.55 && <path d="M18.2 7a7 7 0 0 1 0 10" />}
      </>
    )}
  </svg>
);

export const Pip = ({ size = 21, stroke = 1.9 }: G) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round" aria-hidden="true">
    <rect x="2.8" y="4.6" width="18.4" height="14.8" rx="2.4" />
    <rect x="12" y="11.4" width="8" height="6.6" rx="1.4" fill="currentColor" stroke="none" />
  </svg>
);

export const Fs = ({ on, size = 21, stroke = 2.1 }: G & { on?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {on ? (
      <><path d="M9 3.8v5.2H3.8" /><path d="M15 3.8v5.2h5.2" /><path d="M9 20.2V15H3.8" /><path d="M15 20.2V15h5.2" /></>
    ) : (
      <><path d="M3.8 9V3.8H9" /><path d="M20.2 9V3.8H15" /><path d="M3.8 15v5.2H9" /><path d="M20.2 15v5.2H15" /></>
    )}
  </svg>
);

/* the player's overflow menu */
export const Dots = ({ size = 21 }: G) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="5" r="1.9" />
    <circle cx="12" cy="12" r="1.9" />
    <circle cx="12" cy="19" r="1.9" />
  </svg>
);

export const Heart = ({ filled, size = 14 }: G & { filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
