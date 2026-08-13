import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How TalkAbtIT collects, uses, and protects your information — and why your streaming service passwords never pass through us.",
  alternates: { canonical: "/privacy/" },
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
            <p className="updated">Last updated: August 5, 2026</p>
          </div>
        </header>

        <section className="content">
          <div className="wrap">
            <div className="prose">
              <p>
                This Privacy Policy explains how TalkAbtIT (&quot;TalkAbtIT,&quot;
                &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses,
                and protects your information when you use the TalkAbtIT browser
                extension and related services (the &quot;Service&quot;). By using the Service,
                you agree to the practices described here.
              </p>

              <h2>The short version</h2>
              <p>
                TalkAbtIT adds a comment section on top of the streaming services
                you already use. <strong>You sign in on each streaming
                service&apos;s own site — TalkAbtIT never asks for those
                passwords, and they never pass through our servers.</strong>{" "}
                We collect only what we need to run your account and the
                conversation around your shows.
              </p>

              <h2>Information we collect</h2>
              <h3>Account information</h3>
              <p>
                You create a TalkAbtIT account with an email address and
                password, or by signing in with Google or GitHub — Sign in
                with Apple is not supported. Either way, we store your email
                address and a unique account identifier; when you use Google
                or GitHub, we receive your email address from them and never
                see your password for those services. We also store the
                username you choose and any profile details or customization
                you set.
              </p>
              <h3>Content you create</h3>
              <p>
                We store the comments you post — including any GIFs you attach —
                along with their timestamps and the show or content they relate
                to, so we can display the conversation to you and other viewers.
                If you upload a profile picture, we store that image too.
              </p>
              <h3>Usage and device information</h3>
              <p>
                We may collect limited technical information — such as extension
                version, browser type, and diagnostic or crash data — to keep the
                Service working and to improve it.
              </p>
              <h3>Viewing activity</h3>
              <p>
                When you open the comment panel on an episode, we record that a
                viewing session happened — the show or episode, when it was
                opened, and a random identifier for your extension install — so
                we can see how rooms are doing and show which episodes are
                trending. That identifier is minted locally in your browser and
                isn&apos;t derived from your account.
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
                  <a href="/terms/">Terms of Service</a> and respond to reports of
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
                  authentication and database hosting, Google and GitHub for
                  sign-in, and
                  Stripe for payments. They process data on our behalf under their
                  own agreements.
                </li>
                <li>
                  <strong>GIFs and ads:</strong> the GIF picker talks directly
                  to Klipy, our GIF and advertising partner — see &quot;GIFs and
                  advertising&quot; below for exactly what Klipy receives.
                </li>
                <li>
                  <strong>Legal reasons:</strong> we may disclose information if
                  required by law or to protect the rights, safety, and security
                  of our users and the Service.
                </li>
              </ul>

              <h2>GIFs and advertising</h2>
              <p>
                The GIF picker is powered by Klipy, a third-party GIF library.
                When you browse or search for GIFs, your browser talks to Klipy
                directly, so Klipy receives your search terms, IP address,
                browser information, and language — much like when you visit any
                website. We also pass Klipy a random identifier for your
                extension install; we never send Klipy your account, email
                address, or username.
              </p>
              <p>
                The GIF picker may also show sponsored content provided by Klipy
                and its advertising partners. Those ads are served by Klipy
                using the same information described above — TalkAbtIT does not
                give advertisers your identity, and we don&apos;t show ads
                anywhere else in the Service.
              </p>

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
                as needed to provide the Service. If a paid subscription ends, we
                remove the paid customization that came with it, including any
                uploaded profile picture. When you delete your account, we
                remove your profile and associated personal data, except where we
                need to retain certain information to comply with legal
                obligations or resolve disputes.
              </p>

              <h2>Your rights and choices</h2>
              <p>
                You can delete your account at any time from within the extension,
                which removes your profile and associated data. Depending on where you
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
                date above and, where appropriate, notify you in the extension.
              </p>

              <h2>Contact us</h2>
              <p>
                If you have questions about this Privacy Policy or your data,
                email us at{" "}
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
