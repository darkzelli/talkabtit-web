import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { PlusPerks, UpgradeNote } from "@/components/Premium";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Plus",
  description:
    "TalkAbtIT Plus — $3.99/month for pop-up comments over the video, a custom name color, an uploaded profile pic, and the popcorn bucket badge.",
  alternates: { canonical: "/premium/plus/" },
  openGraph: {
    title: "TalkAbtIT Plus",
    description:
      "Pop-up comments over the video, a custom name color, an uploaded profile pic, and the popcorn bucket badge — $3.99/month.",
    url: "/premium/plus/",
    images: [OG_IMAGE],
  },
};

export default function PlusPage() {
  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <section className="band band-premium">
          <div className="wrap">
            <div className="premium-head">
              <span className="kicker">Premium</span>
              <h1 className="display">
                TalkAbtIT <span className="accent-gold">Plus</span>
              </h1>
              <p className="lede">
                Pop-up comments over the video and a look that&apos;s yours —
                posting and reading stay free for everyone.
              </p>
            </div>

            <div className="perk-solo">
              <PlusPerks />
            </div>

            <UpgradeNote />
            <p className="tier-switch">
              Want the full kit? <a href="/premium/pro/">See Pro →</a>
            </p>
          </div>
        </section>
      </main>
      <Footer sub />
    </>
  );
}
