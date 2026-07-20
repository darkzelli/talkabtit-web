import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — TalkAbtIT",
  description:
    "How TalkAbtIT collects, uses, and protects your information — and why your streaming service passwords never pass through us.",
};

export default function PrivacyPage() {
  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <header className="page-hero">
          <div className="wrap">
            <span className="kicker">Legal</span>
            <h1 className="display">Privacy Policy</h1>
            <p className="updated">Last updated: July 19, 2026</p>
          </div>
        </header>

        <section className="content">
          <div className="wrap">
            <div className="prose">
              <p>
                This Privacy Policy explains how TalkAbtIT (&quot;TalkAbtIT,&quot;
                &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses,
                and protects your information when you use the TalkAbtIT app and
                related services (the &quot;Service&quot;). By using the Service,
                you agree to the practices described here.
              </p>

              <h2>The short version</h2>
              <p>
                TalkAbtIT adds a comment section on top of the streaming services
                you already use. <strong>You sign in directly with each streaming
                service, and those passwords never pass through our servers.</strong>{" "}
                We collect only what we need to run your account and the
                conversation around your shows.
              </p>

              <h2>Information we collect</h2>
              <h3>Account information</h3>
              <p>
                When you sign in with Apple, we receive a unique identifier and,
                depending on your Apple settings, an email address (which may be a
                private relay address Apple provides). We also store the username
                you choose and any profile details or customization you set.
              </p>
              <h3>Content you create</h3>
              <p>
                We store the comments you post, along with their timestamps and
                the show or content they relate to, so we can display the
                conversation to you and other viewers.
              </p>
              <h3>Usage and device information</h3>
              <p>
                We may collect limited technical information — such as app
                version, device type, and diagnostic or crash data — to keep the
                Service working and to improve it.
              </p>

              <h2>Information we do not collect</h2>
              <p>
                We do <strong>not</strong> collect or receive your streaming
                service passwords or login credentials. You authenticate directly
                with each service, and that sign-in does not pass through
                TalkAbtIT. We also don&apos;t stream, host, or store the video
                content you watch.
              </p>

              <h2>How we use your information</h2>
              <ul>
                <li>To create and manage your account and username.</li>
                <li>
                  To display comments and sync them to the runtime of the show
                  you&apos;re watching.
                </li>
                <li>To provide customization and other Pro features.</li>
                <li>
                  To maintain, secure, troubleshoot, and improve the Service.
                </li>
                <li>
                  To enforce our{" "}
                  <a href="/terms">Terms of Service</a> and respond to reports of
                  abuse.
                </li>
                <li>To comply with legal obligations.</li>
              </ul>

              <h2>How we share information</h2>
              <p>
                We don&apos;t sell your personal information. We share information
                only in these limited cases:
              </p>
              <ul>
                <li>
                  <strong>Publicly, by design:</strong> your username and the
                  comments you post are visible to other users of the Service.
                </li>
                <li>
                  <strong>Service providers:</strong> we use trusted vendors to
                  host and operate the Service — including Supabase for
                  authentication and database hosting, and Apple for sign-in and
                  payments. They process data on our behalf under their own
                  agreements.
                </li>
                <li>
                  <strong>Legal reasons:</strong> we may disclose information if
                  required by law or to protect the rights, safety, and security
                  of our users and the Service.
                </li>
              </ul>

              <h2>Data storage and security</h2>
              <p>
                Your information is stored with our hosting provider and protected
                using industry-standard safeguards. No method of transmission or
                storage is completely secure, but we work to protect your
                information and limit access to it.
              </p>

              <h2>Data retention</h2>
              <p>
                We keep your information for as long as your account is active or
                as needed to provide the Service. When you delete your account, we
                remove your profile and associated personal data, except where we
                need to retain certain information to comply with legal
                obligations or resolve disputes.
              </p>

              <h2>Your rights and choices</h2>
              <p>
                You can delete your account at any time from within the app, which
                removes your profile and associated data. Depending on where you
                live, you may have additional rights to access, correct, or
                request deletion of your personal information. To make a request,
                contact us at the address below.
              </p>

              <h2>Children&apos;s privacy</h2>
              <p>
                The Service is not directed to children under 13, and we don&apos;t
                knowingly collect personal information from them. If you believe a
                child has provided us with personal information, please contact us
                and we&apos;ll take steps to delete it.
              </p>

              <h2>Changes to this policy</h2>
              <p>
                We may update this Privacy Policy from time to time. When we make
                material changes, we&apos;ll update the &quot;Last updated&quot;
                date above and, where appropriate, notify you in the app.
              </p>

              <h2>Contact us</h2>
              <p>
                If you have questions about this Privacy Policy or your data,
                email us at{" "}
                <a href="mailto:support@talkabtit.com">support@talkabtit.com</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer sub />
    </>
  );
}
