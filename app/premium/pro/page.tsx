import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ProPerks, UpgradeNote } from "@/components/Premium";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pro",
  description:
    "TalkAbtIT Pro — $5.99/month for everything in Plus, the crown badge, 9 animated name styles, a custom pop-up background, and GIF profile pics.",
  alternates: { canonical: "/premium/pro/" },
  openGraph: {
    title: "TalkAbtIT Pro",
    description:
      "Everything in Plus, the crown badge, 9 animated name styles, a custom pop-up background, and GIF profile pics — $5.99/month.",
    url: "/premium/pro/",
    images: [OG_IMAGE],
  },
};

export default function ProPage() {
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
                TalkAbtIT <span className="accent-gold">Pro</span>
              </h1>
              <p className="lede">
                The full kit — everything in Plus, the crown, and every name
                style. Posting and reading stay free for everyone.
              </p>
            </div>

            <div className="perk-solo">
              <ProPerks />
            </div>

            <UpgradeNote />
            <p className="tier-switch">
              Just the essentials? <a href="/premium/plus/">See Plus →</a>
            </p>
          </div>
        </section>
      </main>
      <Footer sub />
    </>
  );
}
