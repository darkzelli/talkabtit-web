import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CreatorPayouts from "@/components/CreatorPayouts";
import { OG_IMAGE, SITE_NAME } from "@/lib/seo";

// Where Stripe sends a creator back after Connect Express onboarding
// (0039): the creator-connect function's return_url is /creator/?connect=done
// and its refresh_url /creator/?connect=refresh. Nothing to do here but
// point them back at the pop-up, which re-checks payout status on open.
// Not indexed.
export const metadata: Metadata = {
  title: "Creator payouts",
  description: `Payout setup for ${SITE_NAME} creators.`,
  alternates: { canonical: "/creator/" },
  robots: { index: false, follow: false },
  openGraph: {
    title: `Creator payouts — ${SITE_NAME}`,
    description: "Payout setup for TalkAbtIT creators.",
    url: "/creator/",
    images: [OG_IMAGE],
  },
};

export default function CreatorPage() {
  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <CreatorPayouts />
      </main>
      <Footer sub />
    </>
  );
}
