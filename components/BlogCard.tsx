// Pieces shared by the blog index and the post page: the show poster with
// the season/episode line under it, the date · read-time line, and the
// compact card used for earlier posts.
import { episodeLabel, readingTime, type BlogPost } from "@/lib/blog";
import type { Author } from "@/lib/authors";
import { formatDate } from "@/lib/tv-format";

export function BlogPoster({
  post,
  className,
  link = true,
}: {
  post: BlogPost;
  className?: string;
  link?: boolean;
}) {
  const ep = episodeLabel(post);
  const inner = (
    <>
      <span className="pc-img">
        {post.poster ? (
          <img src={post.poster} alt={post.showName ? `${post.showName} poster` : ""} width={210} height={295} decoding="async" />
        ) : (
          <span className="pc-fallback" aria-hidden="true">{(post.showName || post.title).slice(0, 1)}</span>
        )}
      </span>
      <span>
        {post.showName && <span className="blog-show">{post.showName}</span>}
        {ep && <span className="blog-ep">{ep}</span>}
      </span>
    </>
  );
  // The poster links to the show's tool page when the show is in data/tv/,
  // otherwise to the post itself.
  const href = post.show ? `/tools/how-long-to-watch/${post.show}/` : `/blog/${post.slug}/`;
  return link ? (
    <a className={className} href={href}>{inner}</a>
  ) : (
    <div className={className}>{inner}</div>
  );
}

// "By Ozani Cre · September 23, 2026 · 3 min read". `byline` off drops the
// author (the compact cards have no room for it).
export function PostMeta({ post, byline = true }: { post: BlogPost; byline?: boolean }) {
  return (
    <div className="blog-meta">
      {byline && (
        <>
          <span className="blog-byline">
            By <a href={`/blog/author/${post.author.slug}/`} rel="author">{post.author.name}</a>
          </span>
          <span className="dot" aria-hidden="true">·</span>
        </>
      )}
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span className="dot" aria-hidden="true">·</span>
      <span>{readingTime(post)}</span>
    </div>
  );
}

// The "Written by" box at the foot of a post, linking to the author page.
export function AuthorBox({ author }: { author: Author }) {
  return (
    <aside className="author-box">
      <a className="author-avatar" href={`/blog/author/${author.slug}/`} aria-hidden="true" tabIndex={-1}>
        {author.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
      </a>
      <div className="author-box-copy">
        <span className="author-box-label">Written by</span>
        <a className="author-box-name" href={`/blog/author/${author.slug}/`} rel="author">{author.name}</a>
        <span className="author-box-title">{author.title}</span>
        <a className="author-box-more" href={`/blog/author/${author.slug}/`}>More about {author.name.split(" ")[0]} →</a>
      </div>
    </aside>
  );
}

// One row in the /blog/ earlier-posts list: title with the show and
// season/episode beneath, date and read time on the right.
export function BlogRow({ post }: { post: BlogPost }) {
  const ep = episodeLabel(post);
  const sub = [post.showName, ep].filter(Boolean).join(" · ");
  return (
    <li>
      <a href={`/blog/${post.slug}/`}>
        <span className="blog-row-copy">
          <strong>{post.title}</strong>
          {sub && <small>{sub}</small>}
        </span>
        <span className="blog-row-meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{readingTime(post)}</span>
        </span>
      </a>
    </li>
  );
}

export default function BlogCard({ post }: { post: BlogPost }) {
  const ep = episodeLabel(post, true);
  return (
    <a className="blog-card" href={`/blog/${post.slug}/`}>
      <span className="pc-img">
        {post.poster ? (
          <img src={post.poster} alt="" width={210} height={295} loading="lazy" decoding="async" />
        ) : (
          <span className="pc-fallback" aria-hidden="true">{(post.showName || post.title).slice(0, 1)}</span>
        )}
      </span>
      <span className="blog-card-copy">
        {(post.showName || ep) && (
          <span className="blog-card-show">
            {post.showName}
            {post.showName && ep && " "}
            {ep && <span>{ep}</span>}
          </span>
        )}
        <h3>{post.title}</h3>
        <PostMeta post={post} byline={false} />
      </span>
    </a>
  );
}
