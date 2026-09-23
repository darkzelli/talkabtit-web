// Pieces shared by the blog index and the post page: the show poster with
// the season/episode line under it, the date · read-time line, and the
// compact card used for earlier posts.
import { episodeLabel, readingTime, type BlogPost } from "@/lib/blog";
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

export function PostMeta({ post }: { post: BlogPost }) {
  return (
    <div className="blog-meta">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span className="dot" aria-hidden="true">·</span>
      <span>{readingTime(post)}</span>
    </div>
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
        <PostMeta post={post} />
      </span>
    </a>
  );
}
