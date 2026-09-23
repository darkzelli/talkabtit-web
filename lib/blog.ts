// Build-time loader for the blog posts under content/blog/. Server components
// only — this reads from disk.
//
// Each post is one Markdown file, content/blog/<slug>.md, with a front-matter
// block at the top:
//
//   ---
//   title: The Bear season 4 finally lets everyone breathe
//   description: One-sentence summary for search results and social cards.
//   date: 2026-09-23
//   show: the-bear          # slug under data/tv/ → poster + name come for free
//   season: 4
//   episode: 10             # optional; leave out for a whole-season post
//   author: ozani-cre       # optional; a slug from lib/authors.ts (defaults to Ozani)
//   poster: /blog/my.jpg    # optional override; needed only for shows not in data/tv/
//   showName: My Show       # optional override, same reason
//   ---
//
//   Body in Markdown: paragraphs, ## headings, **bold**, *italic*, [links](…),
//   - bullets, 1. numbered lists, > quotes, plus three extras:
//     :::highlights … :::                                  boxed callout with a label
//     ![caption](/blog/show/still.jpg "Paramount+")     image with a credit line
//     > @handle: what they posted                        social-post card: the quote,
//     > https://x.com/handle/status/123                  the handle linked to the post,
//     > likes: 1815                                      and the like count (both lines
//                                                        optional)
import fs from "node:fs";
import path from "node:path";
import { loadIndex } from "./tv";
import { getAuthor, type Author } from "./authors";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  author: Author;
  show: string | null; // slug in data/tv/, when it is one
  showName: string;
  poster: string | null;
  season: number | null;
  episode: number | null;
  excerpt: string; // first ~100 words of the body, plain text
  html: string; // rendered body
  wordCount: number;
};

const DIR = path.join(process.cwd(), "content", "blog");

function parseFrontMatter(raw: string): { meta: Record<string, string>; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    val = val.replace(/\s+#.*$/, ""); // trailing comment
    val = val.replace(/^["'](.*)["']$/, "$1");
    if (key) meta[key] = val;
  }
  return { meta, body: raw.slice(m[0].length) };
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Inline Markdown: code, bold, italic, links. Runs on already-escaped text.
function inline(s: string): string {
  return s
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, href) => {
      const ext = /^https?:\/\//.test(href) && !href.startsWith("https://talkabtit.app");
      return `<a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ""}>${text}</a>`;
    });
}

// A small block-level Markdown renderer — enough for a blog post, with no
// dependency to keep the static build lean.
export function renderMarkdown(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    let m: RegExpMatchArray | null;
    if ((m = line.match(/^(#{1,4})\s+(.*)$/))) {
      // "# Title" in the body is demoted to h2: the page's h1 is the post title
      const level = Math.min(4, Math.max(2, m[1].length));
      out.push(`<h${level}>${inline(escapeHtml(m[2].trim()))}</h${level}>`);
      i++; continue;
    }
    if (/^(-{3,}|\*{3,})$/.test(line.trim())) { out.push("<hr />"); i++; continue; }
    // :::highlights … ::: → a boxed callout with a small label, for the
    // "Highlights" bullets under the lead image
    if ((m = line.match(/^:::\s*([A-Za-z][\w-]*)?\s*$/))) {
      const name = (m[1] || "note").toLowerCase();
      const inner: string[] = [];
      i++;
      while (i < lines.length && !/^:::\s*$/.test(lines[i])) { inner.push(lines[i]); i++; }
      i++; // closing :::
      const label = name.charAt(0).toUpperCase() + name.slice(1);
      out.push(`<aside class="post-box post-box-${name}"><span class="post-box-label">${escapeHtml(label)}</span>${renderMarkdown(inner.join("\n"))}</aside>`);
      continue;
    }
    if (/^>/.test(line)) {
      const q: string[] = [];
      while (i < lines.length && /^>/.test(lines[i])) { q.push(lines[i].replace(/^>\s?/, "")); i++; }
      // > @handle: text            → a social-post card. A following line
      // > https://x.com/…/status/…   holding the post's URL links the handle.
      const t = q[0].match(/^@([A-Za-z0-9_.]+):?\s+(.*)$/);
      if (t) {
        const rest = q.slice(1).map((l) => l.trim());
        const url = rest.find((l) => /^https?:\/\/(x\.com|twitter\.com|www\.reddit\.com|reddit\.com|old\.reddit\.com|www\.threads\.net|threads\.net|www\.tiktok\.com)\//.test(l));
        const likesLine = rest.find((l) => /^likes:\s*[\d,]+$/i.test(l));
        const likes = likesLine ? Number(likesLine.replace(/\D/g, "")) : null;
        const text = inline(escapeHtml([t[2], ...rest.filter((l) => l !== url && l !== likesLine)].join(" ").trim()));
        const handle = escapeHtml(t[1]);
        const site = !url ? "" : /reddit\.com/.test(url) ? "Reddit" : /threads\.net/.test(url) ? "Threads" : /tiktok\.com/.test(url) ? "TikTok" : "X";
        const name = url ? `<a href="${url}" target="_blank" rel="noopener">@${handle}</a>` : `<span>@${handle}</span>`;
        const meta = [
          likes != null ? `<span class="post-social-likes"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>${likes.toLocaleString("en-US")}</span>` : "",
          url ? `<a class="post-social-link" href="${url}" target="_blank" rel="noopener">View on ${site} →</a>` : "",
        ].filter(Boolean).join("");
        out.push(`<figure class="post-social"><span class="post-social-head"><span class="post-social-avatar" aria-hidden="true">${handle.slice(0, 1).toUpperCase()}</span><strong>${name}</strong>${meta ? `<span class="post-social-meta">${meta}</span>` : ""}</span><blockquote>${text}</blockquote></figure>`);
        continue;
      }
      out.push(`<blockquote>${renderMarkdown(q.join("\n"))}</blockquote>`);
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) { items.push(lines[i].replace(/^\s*[-*]\s+/, "")); i++; }
      out.push(`<ul>${items.map((t) => `<li>${inline(escapeHtml(t))}</li>`).join("")}</ul>`);
      continue;
    }
    if (/^\s*\d+[.)]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) { items.push(lines[i].replace(/^\s*\d+[.)]\s+/, "")); i++; }
      out.push(`<ol>${items.map((t) => `<li>${inline(escapeHtml(t))}</li>`).join("")}</ol>`);
      continue;
    }
    // ![caption](/blog/x.jpg "Credit") or ![caption](/blog/x.jpg "Credit|https://…")
    // → figure with the caption and an "Image credits: Credit" line
    if ((m = line.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/))) {
      const [, alt, src, creditRaw] = m;
      let credit = "";
      if (creditRaw) {
        const [text, href] = creditRaw.split("|");
        const inner = escapeHtml(text.trim());
        credit = `<span class="post-credit">Image credits: ${href ? `<a href="${href.trim()}" target="_blank" rel="noopener">${inner}</a>` : inner}</span>`;
      }
      const cap = alt ? `<span>${inline(escapeHtml(alt))}</span>` : "";
      out.push(`<figure><img src="${src}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" />${cap || credit ? `<figcaption>${cap}${credit}</figcaption>` : ""}</figure>`);
      i++; continue;
    }
    // paragraph: consecutive non-blank lines
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|>|\s*[-*]\s|\s*\d+[.)]\s|!\[)/.test(lines[i])) { para.push(lines[i].trim()); i++; }
    out.push(`<p>${inline(escapeHtml(para.join(" ")))}</p>`);
  }
  return out.join("\n");
}

function plainText(md: string): string {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function excerptOf(md: string, words = 100): string {
  // headings, quotes, and list items read badly mid-sentence, so the excerpt
  // is paragraph copy only
  const body = md.split(/\r?\n/).filter((l) => !/^\s*(#{1,6}\s|>|[-*]\s|\d+[.)]\s|:::)/.test(l)).join("\n");
  const w = plainText(body).split(" ");
  if (w.length <= words) return w.join(" ");
  // cut at the sentence end nearest the word budget when there is one close by
  const cut = w.slice(0, words).join(" ");
  const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  return end > cut.length * 0.6 ? cut.slice(0, end + 1) : `${cut}…`;
}

let cache: BlogPost[] | null = null;

// Every post, newest first.
export function loadPosts(): BlogPost[] {
  if (cache) return cache;
  if (!fs.existsSync(DIR)) return (cache = []);
  const shows = loadIndex().shows;
  const posts: BlogPost[] = [];
  for (const file of fs.readdirSync(DIR)) {
    if (!file.endsWith(".md") || file.startsWith("_")) continue;
    const raw = fs.readFileSync(path.join(DIR, file), "utf8");
    const { meta, body } = parseFrontMatter(raw);
    if (!meta.title || !meta.date) throw new Error(`content/blog/${file}: front matter needs at least "title" and "date"`);
    if (meta.draft === "true") continue;
    const slug = (meta.slug || file.replace(/\.md$/, "")).toLowerCase();
    const show = meta.show ? shows.find((s) => s.slug === meta.show) : undefined;
    if (meta.show && !show && !meta.showName) {
      throw new Error(`content/blog/${file}: show "${meta.show}" is not in data/tv/ — add showName: and poster: to the front matter`);
    }
    const season = meta.season ? Number(meta.season) : null;
    const episode = meta.episode ? Number(meta.episode) : null;
    posts.push({
      slug,
      title: meta.title,
      description: meta.description || excerptOf(body, 28),
      date: meta.date,
      author: getAuthor(meta.author),
      show: show?.slug ?? null,
      showName: meta.showName || show?.name || "",
      poster: meta.poster || show?.poster || null,
      season: Number.isFinite(season) ? season : null,
      episode: Number.isFinite(episode) ? episode : null,
      excerpt: excerptOf(body),
      html: renderMarkdown(body),
      wordCount: plainText(body).split(" ").filter(Boolean).length,
    });
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));
  return (cache = posts);
}

export function loadPost(slug: string): BlogPost {
  const p = loadPosts().find((x) => x.slug === slug);
  if (!p) throw new Error(`No blog post with slug "${slug}"`);
  return p;
}

// "Season 4, Episode 10" / "Season 4" / "" — the line under the poster.
export function episodeLabel(p: Pick<BlogPost, "season" | "episode">, short = false): string {
  if (p.season == null) return "";
  const s = p.season >= 1900 ? `${p.season}` : short ? `S${p.season}` : `Season ${p.season}`;
  if (p.episode == null) return s;
  return short ? `${s} · E${p.episode}` : `${s}, Episode ${p.episode}`;
}

// Reading time at ~230 wpm, floored at one minute.
export function readingTime(p: BlogPost): string {
  return `${Math.max(1, Math.round(p.wordCount / 230))} min read`;
}
