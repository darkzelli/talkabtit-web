"use client";

import { useEffect, useRef, useState } from "react";

/* The nine Pro name styles, mirrored from the extension's customize gallery
   (NAME_STYLES / NAME_STYLE_TITLES in popup.js, minus "none"). Each chip is
   the style's own name wearing the effect — the label IS the demo. Glitch,
   VHS, Echo and Scanner are pure CSS (ns-* keyframes in globals.css);
   Obfuscated, Decode and Cursed need the JS ticker below. */
const STYLES: { key: string; title: string; js?: boolean }[] = [
  { key: "italic", title: "Italic" },
  { key: "strikethrough", title: "Strikethrough" },
  { key: "obfuscated", title: "Obfuscated", js: true },
  { key: "decode", title: "Decode", js: true },
  { key: "cursed", title: "Cursed", js: true },
  { key: "slice", title: "Glitch" },
  { key: "vhs", title: "VHS" },
  { key: "echo", title: "Echo" },
  { key: "scan", title: "Scanner" },
];

const OBF_CHARS =
  "ABCDEFGHJKLMNPQRSTUVXYZabcdefghkmnopqrstuvxyz23456789#$%&?";
const scramble = (orig: string) => {
  let s = "";
  for (const ch of orig)
    s += ch === " " ? " " : OBF_CHARS[(Math.random() * OBF_CHARS.length) | 0];
  return s;
};
/* Cursed: zero-width combining marks crawl over the real characters. */
const zalgo = (orig: string) => {
  let s = "";
  for (const ch of orig) {
    s += ch;
    if (ch === " ") continue;
    const n = 1 + ((Math.random() * 2) | 0);
    for (let k = 0; k < n; k++)
      s += String.fromCharCode(0x300 + ((Math.random() * 0x70) | 0));
  }
  return s;
};
/* Decode: 2 ticks per locked-in character, then hold the plain name ~3s. */
const DECODE_HOLD_TICKS = 38;

export default function NameStyles() {
  /* Server-render every chip as plain text; after mount (and only when the
     user hasn't asked for reduced motion) swap the JS chips to the
     ghost + scramble-layer structure and start the ticker. The invisible
     ghost owns the box, so no random glyph can ever move layout. */
  const [live, setLive] = useState(false);
  const scrRefs = useRef(new Map<string, HTMLSpanElement>());
  const steps = useRef(new Map<string, number>());

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setLive(true);
  }, []);

  useEffect(() => {
    if (!live) return;
    const timer = setInterval(() => {
      for (const { key, title, js } of STYLES) {
        if (!js) continue;
        const scr = scrRefs.current.get(key);
        if (!scr) continue;
        const step = steps.current.get(key) ?? 0;
        if (key === "cursed") {
          if ((step + 1) % 3 === 0) scr.textContent = zalgo(title);
          steps.current.set(key, (step + 1) % 3);
        } else if (key === "decode") {
          const n = title.length;
          const locked = Math.min(n, (step / 2) | 0);
          scr.textContent =
            locked >= n
              ? title
              : title.slice(0, locked) + scramble(title.slice(locked));
          steps.current.set(
            key,
            locked >= n && step >= n * 2 + DECODE_HOLD_TICKS ? 0 : step + 1
          );
        } else {
          scr.textContent = scramble(title);
        }
      }
    }, 80);
    return () => clearInterval(timer);
  }, [live]);

  return (
    <div className="ns-chips">
      {STYLES.map(({ key, title, js }) => (
        <span className="ns-chip" key={key}>
          {/* effect classes live on the inner span so the pseudo-layer
              clones (attr(data-text)) line up with the text exactly */}
          <span className={`ns-fx ns-${key}`} data-text={title}>
            {js && live ? (
              <>
                <span className="ns-ghost">{title}</span>
                <span
                  className="ns-scr"
                  ref={(el) => {
                    if (el) scrRefs.current.set(key, el);
                    else scrRefs.current.delete(key);
                  }}
                >
                  {title}
                </span>
              </>
            ) : (
              title
            )}
          </span>
        </span>
      ))}
    </div>
  );
}
