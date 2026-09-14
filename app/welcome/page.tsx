import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import InstallSteps from "@/components/InstallSteps";
import { AFTER_INSTALL_STEPS } from "@/lib/install-steps";
import { OG_IMAGE, SITE_NAME } from "@/lib/seo";

// The tab the extension opens on a fresh install (background.js
// onInstalled). The store and the pin are behind the reader now, so this is
// /how-to-install/ from "sign in" onward with a welcome up top. Not indexed:
// it's a landing spot, not a destination — /how-to-install/ is the page
// search should send people to.
export const metadata: Metadata = {
  title: "Welcome",
  description: `${SITE_NAME} is installed. Sign in, open a show, press play, and click the popcorn bucket.`,
  alternates: { canonical: "/welcome/" },
  robots: { index: false, follow: true },
  openGraph: {
    title: `Welcome — ${SITE_NAME}`,
    description: "You're in. Sign in, press play on any show, and the comment section is waiting beside the video.",
    url: "/welcome/",
    images: [OG_IMAGE],
  },
};

export default function WelcomePage() {
  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <header className="page-hero">
          <div className="wrap">
            <span className="kicker">You&apos;re in</span>
            <h1 className="display">
              Welcome to <span className="accent">{SITE_NAME}</span>
            </h1>
            <p className="lede">
              The extension is installed — that was the hard part. Four quick
              steps and you&apos;ll be reading along with everyone else who
              watched the same episode. Nothing else to download, and your
              streaming login stays yours.
            </p>
          </div>
        </header>

        <section className="content">
          <div className="wrap">
            <InstallSteps steps={AFTER_INSTALL_STEPS} />

            <div className="prose install-next">
              <h2>That&apos;s it</h2>
            </div>

            <div className="contact-card">
              <h3 className="display">Stuck?</h3>
              <p>
                Email{" "}
                <a href="mailto:support@talkabtit.app">support@talkabtit.app</a>{" "}
                with your browser and the streaming service you&apos;re on and
                we&apos;ll sort it out.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer sub />
    </>
  );
}
