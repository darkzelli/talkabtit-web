import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { BlogRow } from "@/components/BlogCard";
import ToolCta from "@/components/ToolCta";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { AUTHORS, getAuthor } from "@/lib/authors";
import { loadPosts } from "@/lib/blog";
import "@/components/tools.css";
import "@/components/blog.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(AUTHORS).map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getAuthor(slug);
  return {
    title: `${a.name}, ${a.title}`,
    description: a.short,
    alternates: { canonical: `/blog/author/${slug}/` },
    openGraph: { type: "profile", title: a.name, description: a.short, url: `/blog/author/${slug}/` },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const a = getAuthor(slug);
  const posts = loadPosts().filter((p) => p.author.slug === slug);
  const initials = a.name.split(" ").map((w) => w[0]).join("").slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/blog/author/${slug}/`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_URL}/blog/author/${slug}/#person`,
      name: a.name,
      jobTitle: a.title,
      description: a.short,
      url: `${SITE_URL}/blog/author/${slug}/`,
      worksFor: { "@id": `${SITE_URL}/#organization` },
      knowsAbout: a.beats,
      ...(a.email ? { email: a.email } : {}),
      ...(a.sameAs?.length ? { sameAs: a.sameAs } : {}),
    },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog/` },
      { "@type": "ListItem", position: 3, name: a.name, item: `${SITE_URL}/blog/author/${slug}/` },
    ],
  };

  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <header className="page-hero">
          <div className="wrap">
            <span className="kicker">
              <a href="/blog/" style={{ color: "inherit", textDecoration: "none" }}>Blog</a> · Author
            </span>
            <div className="author-hero">
              <span className="author-avatar" aria-hidden="true">{initials}</span>
              <div>
                <h1 className="display">{a.name}</h1>
                <span className="author-title">{a.title}</span>
              </div>
            </div>
            <ul className="author-beats" aria-label="Covers">
              {a.beats.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </header>

        <section className="content">
          <div className="wrap">
            <div className="author-bio">
              {a.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {a.email && (
                <p className="author-contact">
                  Tips, corrections, and press: <a href={`mailto:${a.email}`}>{a.email}</a>
                </p>
              )}
            </div>

            {posts.length > 0 && (
              <>
                <div className="tool-sec">
                  <div>
                    <h2>Posts by {a.name.split(" ")[0]}</h2>
                  </div>
                  <a href="/blog/">All posts →</a>
                </div>
                <ul className="blog-list">
                  {posts.map((p) => (
                    <BlogRow key={p.slug} post={p} />
                  ))}
                </ul>
              </>
            )}

            <ToolCta cta="blog-author" />
          </div>
        </section>
      </main>
      <Footer sub />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
