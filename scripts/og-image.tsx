import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

// SOURCE for the branded social-share card served at /og.png (see lib/seo.ts).
// This is NOT a live route — it's kept here so the card can be regenerated.
// Text uses next/og's bundled Noto Sans; the gold wordmark is the real
// /public/logo.svg inlined as a data URI, so the card stays on-brand without
// shipping a font.
//
// To regenerate public/og.png after editing this file:
//   1. cp scripts/og-image.tsx app/opengraph-image.tsx
//   2. npm run build
//   3. cp out/opengraph-image public/og.png
//   4. rm app/opengraph-image.tsx
export const dynamic = "force-static";
export const alt =
  "TalkAbtIT — a comment section for streaming, right in your browser";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand palette (mirrors app/globals.css :root)
const BG = "#090A0D";
const BG_ELEVATED = "#121319";
const GOLD = "#FFB91F";
const RED = "#ED3D23";
const TEXT_DIM = "#9198A6";

// Two demo comments, echoing the phone mock on the homepage.
const COMMENTS = [
  { who: "Jake", ts: "0:43", body: "we shouldn't have opened the door" },
  { who: "Ashley", ts: "1:15", body: "THE MUSIC. turn it up" },
];

export default function OpengraphImage() {
  const logo = readFileSync(join(process.cwd(), "public/logo.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: `linear-gradient(135deg, ${BG_ELEVATED}, ${BG} 60%)`,
          color: "#fff",
          position: "relative",
        }}
      >
        {/* ambient gold glow, top-right */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: 620,
            background: `radial-gradient(circle, rgba(255,185,31,0.30), rgba(255,185,31,0) 65%)`,
          }}
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="TalkAbtIT" height={58} />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
            <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1 }}>
              A comment section for
            </div>
            <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1, color: GOLD }}>
              any streaming service.
            </div>
            <div style={{ fontSize: 26, lineHeight: 1.4, color: TEXT_DIM, marginTop: 26 }}>
              Time-stamped comments on Netflix, Hulu, Disney+, Max &amp; more —
              free, right in your browser.
            </div>
          </div>

          {/* comment-card mock */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 360,
              padding: 24,
              borderRadius: 22,
              background: "rgba(18,19,25,0.92)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
            }}
          >
            {COMMENTS.map((c, i) => (
              <div
                key={c.who}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  marginTop: i === 0 ? 0 : 20,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 40,
                    marginRight: 14,
                    background: i === 0 ? RED : GOLD,
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: 16, color: TEXT_DIM }}>
                    {`${c.who} · ${c.ts}`}
                  </div>
                  <div style={{ fontSize: 19, color: "#fff", marginTop: 3 }}>
                    {c.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 26, color: TEXT_DIM }}>talkabtit.app</div>
          <div
            style={{
              display: "flex",
              fontSize: 21,
              fontWeight: 700,
              color: BG,
              background: GOLD,
              padding: "11px 22px",
              borderRadius: 999,
            }}
          >
            Free Chrome extension
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
