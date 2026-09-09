import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of TalkAbtIT, the browser extension that adds a live comment section to streaming services.",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <header className="page-hero">
          <div className="wrap">
            <span className="kicker">Legal</span>
            <h1 className="display">Terms of Service</h1>
            <p className="updated">Last updated: August 5, 2026</p>
          </div>
        </header>

        <section className="content">
          <div className="wrap">
            <div className="prose">
              <p>
                Welcome to TalkAbtIT. These Terms of Service (&quot;Terms&quot;)
                are an agreement between you and ByWhateverMedium L.L.C.
                (&quot;TalkAbtIT,&quot; &quot;we,&quot; &quot;us,&quot; or
                &quot;our&quot;), the company that owns and operates TalkAbtIT,
                and govern your use of the TalkAbtIT browser extension and
                related services (the &quot;Service&quot;). By installing, accessing, or using the
                Service, you agree to be bound by these Terms. If you don&apos;t
                agree, please don&apos;t use the Service.
              </p>

              <h2>1. What TalkAbtIT is</h2>
              <p>
                TalkAbtIT adds a time-stamped comment section on top of
                third-party streaming services so you can talk about shows and
                movies with other viewers. TalkAbtIT does not stream, host,
                download, or unlock any video content. All content plays through
                your own account with the applicable streaming service.
              </p>
              <p>
                <strong>
                  TalkAbtIT is an independent product and is not affiliated with,
                  endorsed by, or sponsored by Netflix, Hulu, Disney+, HBO Max,
                  Paramount+, Crunchyroll, or any other streaming service.
                </strong>{" "}
                All names, trademarks, and logos are the property of their
                respective owners and are used for identification purposes only.
              </p>

              <h2>2. Eligibility</h2>
              <p>
                You must be at least 13 years old (or the minimum age required in
                your country) to use the Service. If you are under the age of
                majority where you live, you may only use the Service with the
                consent and supervision of a parent or legal guardian who agrees
                to these Terms.
              </p>

              <h2>3. Your account</h2>
              <p>
                You create an account by signing in with your Google or GitHub
                account — or with an email address and password — and
                choosing a username. You are responsible for maintaining the
                security of your account and for all activity that happens under
                it. Please choose a username that isn&apos;t offensive,
                misleading, or infringing — we may reclaim or require changes to
                usernames that violate these Terms.
              </p>

              <h2>4. Third-party streaming services</h2>
              <p>
                To use the Service you need your own active subscriptions with
                the streaming services you want to watch. Your use of those
                services is governed by their own terms and privacy policies. You
                sign in on each service&apos;s own site, and you agree to comply
                with their terms. We are not responsible for the availability,
                content, or policies of any third-party service.
              </p>

              <h2>5. User content and conduct</h2>
              <p>
                &quot;User Content&quot; means the comments, usernames, and other
                material you submit through the Service. You retain ownership of
                your User Content. By submitting it, you grant TalkAbtIT a
                worldwide, non-exclusive, royalty-free license to host, store,
                reproduce, and display that content for the purpose of operating
                and improving the Service.
              </p>
              <p>You agree not to post or do any of the following:</p>
              <ul>
                <li>
                  Post content that is unlawful, hateful, harassing, abusive,
                  threatening, defamatory, or obscene.
                </li>
                <li>
                  Post spam, advertising, or content that infringes anyone&apos;s
                  intellectual property or privacy rights.
                </li>
                <li>Post deliberate spoilers designed to ruin others&apos; experience.</li>
                <li>
                  Impersonate any person or entity, or misrepresent your
                  affiliation with anyone.
                </li>
                <li>
                  Attempt to disrupt, reverse-engineer, or gain unauthorized
                  access to the Service or its systems.
                </li>
              </ul>
              <p>
                We may remove or filter content and suspend or terminate
                accounts that violate these rules. Some filtering is automatic —
                for example, profanity is masked and comments containing links
                are blocked. You can report comments and block other users from
                within the extension.
              </p>

              <h2>6. GIFs and advertising</h2>
              <p>
                The GIF picker is powered by Klipy, a third-party GIF library,
                and may include sponsored content provided by Klipy and its
                advertising partners. We don&apos;t endorse and aren&apos;t
                responsible for third-party GIFs or ads, and sponsored content
                may be shown to free and paid users alike. See our{" "}
                <a href="/privacy/">Privacy Policy</a> for what Klipy receives
                when you use the picker.
              </p>

              <h2>7. Purchases and subscriptions</h2>
              <p>
                The core Service is free to use. We may offer optional paid
                features (such as &quot;Plus&quot; and &quot;Pro&quot; upgrades
                with additional customization). Payments are processed by our
                payment provider, Stripe, and are subject to Stripe&apos;s terms.
                Subscriptions renew automatically until cancelled, and you can
                manage or cancel your subscription at any time from within the
                extension or through the billing portal we provide. Except where
                required by law, purchases are non-refundable. When a paid
                subscription ends or moves to a lower tier, the customization
                that came with it — including any uploaded profile picture — is
                removed from your profile.
              </p>

              <h2>8. Intellectual property</h2>
              <p>
                The Service, including its software, design, logos, and content
                we create, is owned by ByWhateverMedium L.L.C. and protected
                by intellectual
                property laws. We grant you a limited, personal, non-transferable,
                non-exclusive license to use the Service for its intended
                purpose. You may not copy, modify, distribute, or create
                derivative works from the Service without our permission.
              </p>

              <h2>9. Disclaimers</h2>
              <p>
                The Service is provided &quot;as is&quot; and &quot;as
                available&quot; without warranties of any kind, whether express or
                implied, including warranties of merchantability, fitness for a
                particular purpose, and non-infringement. We don&apos;t warrant
                that the Service will be uninterrupted, error-free, or secure, or
                that it will remain compatible with any third-party streaming
                service.
              </p>

              <h2>10. Limitation of liability</h2>
              <p>
                To the fullest extent permitted by law, TalkAbtIT will not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages, or any loss of data, profits, or goodwill,
                arising out of or related to your use of the Service. Our total
                liability for any claim relating to the Service will not exceed
                the greater of the amount you paid us in the twelve months before
                the claim or USD $50.
              </p>

              <h2>11. Termination</h2>
              <p>
                You may stop using the Service and delete your account at any
                time. We may suspend or terminate your access if you violate
                these Terms or if we discontinue the Service. Provisions that by
                their nature should survive termination will continue to apply.
              </p>

              <h2>12. Changes to these Terms</h2>
              <p>
                We may update these Terms from time to time. When we make material
                changes, we&apos;ll update the &quot;Last updated&quot; date above
                and, where appropriate, notify you in the extension. Your continued use
                of the Service after changes take effect means you accept the
                revised Terms.
              </p>

              <h2>13. Governing law</h2>
              <p>
                These Terms are governed by the laws of the United States and the
                state in which TalkAbtIT operates, without regard to conflict of
                law principles. Any disputes will be resolved in the courts
                located there, unless applicable law requires otherwise.
              </p>

              <h2>14. Contact</h2>
              <p>
                Questions about these Terms? Email us at{" "}
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
