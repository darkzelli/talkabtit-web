import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BlogCard, { AuthorBox, BlogPoster, PostMeta } from "@/components/BlogCard";
import ToolCta from "@/components/ToolCta";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/seo";
import { episodeLabel, loadPost, loadPosts } from "@/lib/blog";
import { loadIndex } from "@/lib/tv";
import "@/components/tools.css";
import "@/components/blog.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return loadPosts().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = loadPost(slug);
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}/` },
    authors: [{ name: post.author.name, url: `${SITE_URL}/blog/author/${post.author.slug}/` }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${slug}/`,
      publishedTime: post.date,
      authors: [`${SITE_URL}/blog/author/${post.author.slug}/`],
      // The poster is portrait, so the site card stays the share image; the
      // poster rides along as a second option for platforms that pick.
      images: post.poster ? [OG_IMAGE, { url: post.poster, alt: `${post.showName} poster` }] : [OG_IMAGE],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = loadPost(slug);
  const posts = loadPosts();
  const more = posts.filter((p) => p.slug !== slug).slice(0, 3);
  const show = post.show ? loadIndex().shows.find((s) => s.slug === post.show) : undefined;
  const ep = episodeLabel(post);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${slug}/`,
    mainEntityOfPage: `${SITE_URL}/blog/${slug}/`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    wordCount: post.wordCount,
    inLanguage: "en-US",
    ...(post.poster ? { image: `${SITE_URL}${post.poster}` } : {}),
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/blog/author/${post.author.slug}/#person`,
      name: post.author.name,
      jobTitle: post.author.title,
      url: `${SITE_URL}/blog/author/${post.author.slug}/`,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/blog/` },
    ...(post.showName
      ? {
          about: {
            "@type": "TVSeries",
            name: post.showName,
            ...(show?.tvmazeUrl ? { sameAs: show.tvmazeUrl } : {}),
          },
        }
      : {}),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog/` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${slug}/` },
    ],
  };

  return (
    <>
      <div className="glow" />
      <Nav sub />
      <main>
        <header className="page-hero">
          <div className="wrap post-hero">
            <div className="post-hero-copy">
              <span className="kicker">
                <a href="/blog/">Blog</a>
                {post.showName && (
                  <>
                    {" "}· {post.showName}
                    {ep && ` · ${ep}`}
                  </>
                )}
              </span>
              <h1 className="display">{post.title}</h1>
              <PostMeta post={post} />
            </div>
            <BlogPoster post={post} className="post-poster" />
          </div>
        </header>

        <section className="content">
          <div className="wrap">
            <article className="post-body" dangerouslySetInnerHTML={{ __html: post.html }} />

            <AuthorBox author={post.author} />

            {show && (
              <div className="tool-xlinks">
                <a href={`/tools/how-long-to-watch/${show.slug}/`}>How long to watch {show.name}</a>
                <a href={`/tools/countdown/${show.slug}/`}>{show.name} release countdown</a>
              </div>
            )}

            <ToolCta cta="blog-post" showName={post.showName || undefined} network={show?.network} />

            {more.length > 0 && (
              <>
                <div className="tool-sec">
                  <div>
                    <h2>More from the blog</h2>
                  </div>
                  <a href="/blog/">All posts →</a>
                </div>
                <div className="blog-grid">
                  {more.map((p) => (
                    <BlogCard key={p.slug} post={p} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer sub />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
