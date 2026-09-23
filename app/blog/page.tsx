import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { BlogPoster, BlogRow, PostMeta } from "@/components/BlogCard";
import ToolCta from "@/components/ToolCta";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { loadPosts } from "@/lib/blog";
import "@/components/tools.css";
import "@/components/blog.css";

export const metadata: Metadata = {
  title: "Blog — episode breakdowns, finales, and what to watch next",
  description:
    "The TalkAbtIT blog: episode breakdowns, season finales, catch-up guides, and what to watch next on Netflix, Hulu, Disney+, HBO Max, Paramount+, and Crunchyroll.",
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: "The TalkAbtIT Blog",
    description: "Episode breakdowns, season finales, catch-up guides, and what to watch next.",
    url: "/blog/",
  },
};

export default function BlogIndex() {
  const posts = loadPosts();
  const [latest, ...earlier] = posts;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog/`,
    name: `${SITE_NAME} Blog`,
    url: `${SITE_URL}/blog/`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${SITE_URL}/blog/${p.slug}/`,
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}/`,
      datePublished: p.date,
      author: { "@type": "Person", name: p.author.name, url: `${SITE_URL}/blog/author/${p.author.slug}/` },
      ...(p.poster ? { image: `${SITE_URL}${p.poster}` } : {}),
    })),
  };

  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <header className="page-hero">
          <div className="wrap">
            <span className="kicker">Blog</span>
            <h1 className="display">
              Talk about <span className="accent">what you&apos;re watching</span>
            </h1>
            <p className="lede">
              Episode breakdowns, finales, catch-up guides, and what to watch
              next, from the people building a comment section for streaming.
            </p>
          </div>
        </header>

        <section className="content">
          <div className="wrap">
            {!latest ? (
              <p className="blog-empty">The first post is on its way. Check back soon.</p>
            ) : (
              <>
                <div className="tool-sec">
                  <div>
                    <h2>Latest post</h2>
                  </div>
                </div>
                <article className="blog-feat">
                  <BlogPoster post={latest} className="blog-feat-poster" />
                  <div className="blog-feat-copy">
                    <PostMeta post={latest} />
                    <h2>
                      <a href={`/blog/${latest.slug}/`}>{latest.title}</a>
                    </h2>
                    <p>{latest.excerpt}</p>
                    <a className="btn btn-white btn-icon" href={`/blog/${latest.slug}/`}>
                      Read the post
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </a>
                  </div>
                </article>

                {earlier.length > 0 && (
                  <>
                    <div className="tool-sec">
                      <div>
                        <h2>Earlier posts</h2>
                        <p>Everything else we&apos;ve written, newest first.</p>
                      </div>
                    </div>
                    <ul className="blog-list">
                      {earlier.map((p) => (
                        <BlogRow key={p.slug} post={p} />
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}

            <ToolCta cta="blog-index" />
          </div>
        </section>
      </main>
      <Footer sub />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
