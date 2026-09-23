import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CreatorLink from "@/components/CreatorLink";
import { OG_IMAGE, SITE_NAME } from "@/lib/seo";

// The landing page behind a creator's share link (/c/?ref=XXXX-XXXX,
// issued by grant_creator in Supabase — 0039). Like /early/, the page can't
// link anything itself — the account lives in the extension — so it shows
// the code and tells the reader to open the toolbar pop-up on this tab,
// where the referral card is already filled in. Not indexed: nothing here
// without a code.
export const metadata: Metadata = {
  title: "You came from a creator",
  description: `Support a ${SITE_NAME} creator: link their code and they earn a cut if you ever subscribe. Costs you nothing.`,
  alternates: { canonical: "/c/" },
  robots: { index: false, follow: false },
  openGraph: {
    title: `Support a creator — ${SITE_NAME}`,
    description: "Link a creator's code to your TalkAbtIT account. If you ever go Plus or Pro, they earn a cut.",
    url: "/c/",
    images: [OG_IMAGE],
  },
};

export default function CreatorLinkPage() {
  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <CreatorLink />
      </main>
      <Footer sub />
    </>
  );
}
