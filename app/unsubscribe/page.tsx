import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import UnsubscribeForm from "@/components/UnsubscribeForm";

// Linked from the footer of every email we send. Kept out of search: it's a
// utility page, not a landing page, so it's noindex and absent from the sitemap.
export const metadata: Metadata = {
  title: "Unsubscribe",
  description: "Stop receiving emails from TalkAbtIT.",
  alternates: { canonical: "/unsubscribe/" },
  robots: { index: false, follow: false },
};

export default function UnsubscribePage() {
  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <header className="page-hero">
          <div className="wrap">
            <span className="kicker">Email preferences</span>
            <h1 className="display">Unsubscribe</h1>
            <p className="lede">
              Confirm your address and we&apos;ll stop sending you emails. The
              extension keeps working either way.
            </p>
          </div>
        </header>

        <section className="content">
          <div className="wrap">
            <div className="unsub-card">
              <UnsubscribeForm />
              <p className="unsub-note">
                Requests are handled by a person, so a message already on its
                way may still arrive. Questions? Email{" "}
                <a href="mailto:support@talkabtit.app">support@talkabtit.app</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer sub />
    </>
  );
}
