# Feeds, previous/next and reading time (T-0054)

## Intent
A reader who finishes a poem or article reaches a dead end, and there is no way to follow new writing. Add RSS and Atom feeds, previous and next links, and an automatic reading time, with no manual step when content is added from /admin. Measure: a poem added the CMS way appears in both feeds and in the navigation with no other edit.

## Decisions
- **Feeds: summary, not full text.** Claude, small. `/rss.xml` (RSS 2.0) and `/atom.xml` list every non-draft poem and article, newest first, each with title, link and the first 300 characters of its own text. Full text would need a Markdown-to-HTML step and a sanitiser dependency; a summary links readers to the page. Revisit if Mingxi wants readers to read in the feed.
- **Hand-written XML, no new dependency.** Claude, small. One module (`src/lib/feed.ts`) with a single escape function; both endpoints are static files at build time. Well-formedness is checked with `xmllint` and Python's XML parser (below), not in the build.
- **One ordered list.** Claude, small. `src/lib/writing.ts` returns poems and articles sorted by date; the feeds, the previous/next links and the reading time use it, so they cannot disagree.
- **Previous and next stay in the same group.** Claude, small. Poems group by their category field; articles are one group. Previous is the next older piece, next the next newer one; an end of the list shows no link. A "More writing" link to /personal#writing replaces the old "All writing" link.
- **Reading time is computed.** Claude, small, and the one visible change to existing text. About 200 words a minute, Chinese and Japanese characters at about 400 a minute, minimum 1 minute. It replaces the hand-typed value: Monologue now says 6 min read (1,184 words) where the typed value said 8 min. The typed field was the only manual step left for a new article. The schema now makes `readTime` optional and the editor labels it "not used; the site counts it", so an article saved without it builds. Easy to revert: use the typed value when present.
- **Unreadable dates.** Claude, small. The editor stores dates as free text. A date the site cannot read sorts last, gets no date in RSS, and uses the newest date in Atom (which requires one); the build still passes. Dates like "spring 2024" are read leniently as 1 January 2024.
- **Discovery.** Claude, small. Both feeds are linked in the head of every page, and the footer has one "RSS" link. Footer links no longer wrap mid-label on a phone.
- **Sitemap and robots.** Checked, no change. Astro's sitemap integration was already installed; the built sitemap lists the poem and article pages, and `robots.txt` already points to it and allows all crawlers.
- **Build check.** Claude, small. `scripts/check-feeds.mjs` runs in `npm run build`: both feeds must exist, list as many entries as there are built poem and article pages, and contain each page's link.
- **Not changed.** CSP (the new code adds no script, style, image or request), existing copy, held or private items. All labels are "Previous", "Next", "More writing", "RSS" and the feed titles "Mingxi Yan: writing".

## Intuitions and rejected alternatives
- Rejected: full text in feeds (dependency and sanitising for little gain on a small site).
- Rejected: `@astrojs/rss` (a dependency for about 40 lines of XML).
- Rejected: previous/next across poems and articles (a reader of a poem does not expect an essay next).
- Rejected: keeping the typed reading time (it needs a manual step and disagreed with the text).
- Left alone: the text of the About-style cards on /personal, apart from the article card's reading time, which now uses the same computed value.

## How to verify
- Open `/poems/adventure`: at the bottom, a "Next" link to "A Love Letter" on the right and "More writing" below it. Open `/poems/love-letter`: "Previous" to "Adventure".
- Open `/articles/monologue`: "6 min read" under the title; no previous or next, "More writing" at the bottom.
- Open `/rss.xml` and `/atom.xml`: three entries, newest first. Every page's footer has "RSS".
- Add a poem file the way the editor does (title, date, category): build passes and the poem is in both feeds and in its neighbours' links.

## Check (local production build)
- `npx tsc --noEmit` and `npm run build` pass (CSP, preview and feed checks included).
- `xmllint --noout` passes on both feeds, and Python's XML parser reads 3 items and 3 entries with the expected titles and dates.
- Three files added to the poems folder with no other change, then removed: a normal poem dated March 2024, one with the date "whenever", and one marked draft. Build passed (12 pages, 5 feed entries); the normal poem appeared in both feeds and in its neighbour's link; the unreadable-date poem appeared with no date in RSS and the newest date in Atom; the draft was in neither feed.
- Lighthouse (mobile and desktop) 100 in all four categories and axe 0 violations on `/`, `/personal`, both poems and the article.

## Revisit when
- Mingxi wants full text in feeds, or per-tag feeds.
- A third kind of writing is added (the list builder needs the new collection).
- The reading speed feels wrong: one number in `src/lib/writing.ts`.

Spend: $0.00

## Independent review
Pending.
