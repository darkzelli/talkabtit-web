import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import EarlyInvite from "@/components/EarlyInvite";
import { OG_IMAGE, SITE_NAME } from "@/lib/seo";

// The landing page behind an early-supporter invite link
// (/early/?code=XXXX-XXXX, minted by mint_early_supporter_code in Supabase).
// The page itself can't redeem anything — the account lives in the
// extension — so it shows the code and tells the reader to open the toolbar
// pop-up on this tab, where the code is already filled in. Not indexed:
// there's nothing here without a code.
export const metadata: Metadata = {
  title: "Early supporter invite",
  description: `You've been invited as a ${SITE_NAME} early supporter: Pro for life and a badge nobody else can get.`,
  alternates: { canonical: "/early/" },
  robots: { index: false, follow: false },
  openGraph: {
    title: `Early supporter invite — ${SITE_NAME}`,
    description: "Pro for life and the early supporter ticket, for the people who were here first.",
    url: "/early/",
    images: [OG_IMAGE],
  },
};

export default function EarlyPage() {
  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <EarlyInvite />
      </main>
      <Footer sub />
    </>
  );
}
