// Blog authors. A post picks one with `author: <slug>` in its front matter;
// posts without one get DEFAULT_AUTHOR. Each author has a page at
// /blog/author/<slug>/ built from this file.
export type Author = {
  slug: string;
  name: string;
  title: string; // one line under the name
  short: string; // one sentence for the box under each post
  bio: string[]; // paragraphs on the author page
  beats: string[]; // what they cover
  email?: string;
  sameAs?: string[]; // profile URLs for the Person schema (X, LinkedIn, …)
};

export const AUTHORS: Record<string, Author> = {
  "ozani-cre": {
    slug: "ozani-cre",
    name: "Ozani Cre",
    title: "Entertainment journalist",
    short:
      "Ozani Cre is an entertainment journalist covering television and streaming, and writes the TalkAbtIT blog.",
    bio: [
      "Ozani Cre is an entertainment journalist covering television and streaming: the finales, the twists, and the arguments they start.",
    ],
    beats: ["Streaming TV", "Season finales", "Episode breakdowns", "Fan reactions", "Release dates"],
    email: "support@talkabtit.app",
  },
};

export const DEFAULT_AUTHOR = "ozani-cre";

export function getAuthor(slug?: string | null): Author {
  const a = AUTHORS[slug || DEFAULT_AUTHOR];
  if (!a) throw new Error(`Unknown blog author "${slug}" — add it to lib/authors.ts`);
  return a;
}
