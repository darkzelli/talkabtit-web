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
  "TalkAbtIT — a comment section for streaming services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand palette (mirrors app/globals.css :root)
const BG = "#090A0D";
const BG_ELEVATED = "#121319";
const GOLD = "#FFB91F";

// logo.svg viewBox is 588x217 — both dimensions must be set explicitly or
// Satori stretches the image to fill the flex container.
const LOGO_WIDTH = 542;
const LOGO_HEIGHT = 200;

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
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${BG_ELEVATED}, ${BG} 60%)`,
          color: "#fff",
          position: "relative",
        }}
      >
        {/* ambient gold glow behind the logo */}
        <div
          style={{
            position: "absolute",
            top: -40,
            left: 300,
            width: 600,
            height: 600,
            borderRadius: 600,
            background: `radial-gradient(circle, rgba(255,185,31,0.22), rgba(255,185,31,0) 65%)`,
          }}
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="TalkAbtIT" width={LOGO_WIDTH} height={LOGO_HEIGHT} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 44,
          }}
        >
          <div style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.2, letterSpacing: -0.5 }}>
            A comment section for
          </div>
          <div style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.2, letterSpacing: -0.5, color: GOLD }}>
            streaming services.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
