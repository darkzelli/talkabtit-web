import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Premium from "@/components/Premium";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Premium",
  description:
    "TalkAbtIT pricing — commenting and reading are free and unlimited, forever. Premium is pure expression: compare Plus and Pro, from $3.99/month.",
  alternates: { canonical: "/premium/" },
  openGraph: {
    title: "Premium — TalkAbtIT",
    description:
      "Commenting and reading are free forever. Premium is pure expression — compare Plus and Pro.",
    url: "/premium/",
    images: [OG_IMAGE],
  },
};

export default function PremiumPage() {
  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <Premium />
      </main>
      <Footer sub />
    </>
  );
}
