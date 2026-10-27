---
name: write-blog
description: Write or convert a TalkAbtIT blog post under content/blog/ — episode breakdowns, finales, catch-up guides — with real, verified fan reactions, press stills, and screenshot previews. Use when the user asks to write a blog, add a post, turn a draft into a post, or cover an episode/finale.
---

# Write a TalkAbtIT blog post

Posts are Markdown files in `content/blog/<slug>.md`, rendered by `lib/blog.ts`
(front matter + a small Markdown renderer with three extras). Byline defaults to
Ozani Cre (`lib/authors.ts`). Read the latest post in `content/blog/` first and
match its voice: short paragraphs, plain declarative sentences, spoiler warning
before spoilers, headings that read like search queries.

## 1. Gather facts before writing

- **Episode facts**: TVmaze is already wired in. `data/tv/shows/<slug>.json` has
  the show; `https://api.tvmaze.com/shows/<id>/episodes` has titles, air dates,
  summaries and the episode still (`image.original`). Cross-check plot beats
  against two or more published reviews/recaps (WebFetch them) — never write a
  scene you can't source.
- **Reactions — real ones only.** The user rejected fabricated reactions and
  live embeds. Every quote needs a URL you verified.
  - X posts: find candidate IDs via WebSearch (`site:x.com "<show>" <episode>`),
    then verify each with
    `https://cdn.syndication.twimg.com/tweet-result?id=<id>&token=a`
    (returns text, screen_name, favorite_count, created_at). Use the text
    verbatim and the like count from that response. Skip posts dated before
    the episode aired and posts with 0 likes.
  - Reddit is NOT reachable from this environment (www/old/api.reddit.com,
    redlib mirrors, and curl all fail). Don't pretend otherwise: tell the user,
    and offer forum alternatives that do load (MyAnimeList episode threads load;
    AniList and AnimeSuperhero return 403). Quote forum posts with username,
    thread link and date.
  - If you can't verify enough reactions, write the post with fewer cards and
    say so. Never invent a handle, quote, or like count.
- **Stills**: download the TVmaze episode still and/or show art, resize to
  1600px wide with `sips -Z 1600 in.jpg --out public/blog/<show>/<name>.jpg`.
  Credit the network/streamer that owns it (e.g. "Crunchyroll", "Paramount+")
  with a link to the show page.

## 2. Write the file

```
---
title: <Show> Season N, Episode M: <hook, under ~70 chars>
description: <one sentence, ~150 chars, for search + social>
date: YYYY-MM-DD
show: <slug in data/tv/>         # poster + name come for free
season: N
episode: M                        # omit for a whole-season post
# author: ozani-cre               # optional
# showName/poster: overrides only for shows not in data/tv/
---
```

Body order that has worked: one-line dek → lead still → `:::highlights` (2–3
bullets) → context paragraphs → spoiler warning → sections by beat, each with a
search-friendly `##` → reaction cards where they belong → closing question
heading. Extras from `lib/blog.ts`:

- Still with credit: `![caption](/blog/show/file.jpg "Crunchyroll|https://…")`
- Callout: `:::highlights … :::`
- Social card: 
  ```
  > @handle: exact post text
  > https://x.com/handle/status/<id>
  > likes: 1234
  ```
  (also accepts reddit.com, threads.net, tiktok.com URLs)

Keep it 600–900 words. Italicize the show title. No template notes, source
tables, or checklists in the body.

## 3. Preview, then stop

- Start `npx next dev -p 3177`, open `/blog/<slug>/`, and screenshot at 1440 and
  390 wide. `scripts/shot-section.mjs` captures an element over the DevTools
  protocol: launch Chrome with `--headless=new --remote-debugging-port=9333`,
  then `node scripts/shot-section.mjs <url> "<selector>" out.png [width]`.
- Show the user the screenshots and a bullet list of every reaction used with
  its source and like count, so they can veto any.
- The sitemap and blog index pick the post up automatically. Don't commit or
  push until asked — they do that as a separate step.
