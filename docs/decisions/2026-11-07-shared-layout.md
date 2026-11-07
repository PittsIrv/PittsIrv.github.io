# Shared layout: nav, labels, MeeTwo button (T-0035, PR 1 of 4)

## Intent
First build step of the site redesign (direction B, picked by the Router on 2026-11-07; see `2026-11-07-site-design-directions.md`). Fix what every page shares: Projects reachable from the nav, no template details, and a MeeTwo button that never covers text.

## Decisions
- **Projects added to the nav** (Router). Order: Projects, Work, Personal, About; nav text one step larger and in ink rather than grey.
- **"Personal" kept as a label** (Claude, small). It is not a noun, but the page mixes poker variants, writing, quotes and interests; a replacement word would be new wording for Mingxi to choose. Flagged to the Router.
- **Section labels (`.eyebrow`) become small sentence-case sans** (Router: retire template details). The tracked monospace capitals are gone everywhere that class is used. Page-level Tailwind caps headings are handled in each page's own PR.
- **Home "01 / 02 / 03" numbering removed** (Router). The three items are not a sequence.
- **Footer: "↗" only on external links** (Claude, small). Email and Resume (PDF) lose the arrow; GitHub and LinkedIn keep it.
- **MeeTwo button placement** (Claude, small; Router asked that it cover nothing). The button stays on every page and stays fixed, but sits where there is no text:
  - below 1200 px wide, in a reserved slot at the right end of the sticky nav bar (the nav is padded so links never run under it); the chat panel opens from there;
  - from 1200 px, bottom-right in the side gutter as the round "M" mark (the gutter is at least 64 px there);
  - from 1440 px, with its "Ask MeeTwo" label (the gutter fits the full button).
  The mobile `padding-bottom` that made room for the old bottom button is removed.

## Intuitions and rejected alternatives
- A bottom-right button with extra page padding only protects the last screen; anything fixed over the text column covers text while scrolling. Only the nav bar and the side gutter are free of text.
- A full-width bottom bar on phones was rejected: it also covers text and takes more screen than the nav slot.

## How to verify
- Open any page at a laptop width (1280 px): nav reads Projects, Work, Personal, About; the "M" button sits in the right margin, clear of the text, at the bottom.
- Narrow the window below 1200 px or open on a phone: the "M" button sits at the top right inside the nav bar; tap it and the chat opens; Escape or × closes it.
- Home: section labels are plain small text; no 01/02/03.

## Revisit when
The site's content width changes (`.page-shell` max-width or padding), since the breakpoints depend on the gutter width.

## Independent review — 2026-11-07 (gemini-3.1-pro-preview, middle tier)
- `:has()` for the nav padding fails on browsers older than Firefox 121 / Safari 15.4 → agree — the layout now adds a `has-meetwo` class to `<body>` at build time; no `:has()`.
- Button `right` (viewport) and nav padding (container) can misalign → disagree — they only coexist below 1200 px; between 1160 and 1199 px the reserved slot (68–124 px from the right edge) still contains the button (48–92 px), so links never run under it.
- Nav may overflow at 320–375 px → checked, no — at 320 and 375 px the links wrap to their own row under the name, `scrollWidth` equals the viewport, the button sits beside the name.
- Panel may open off-screen from a top button → checked, no — at 320 and 375 px the open panel spans 8–134 px from the top and stays inside the viewport.
- Top-right is harder to reach one-handed than bottom-right → disagree for now — the Router's requirement is that the button cover nothing; the nav bar is the only text-free place on a phone. Revisit if visitors miss it.
- Resume lost `target="_blank"` → disagree — it never had one; only the arrow and label changed.
- Package lacked the directions record → agree — later packages include it.
Verdict: ship with fixes. Action taken: `:has()` replaced; other points checked as above.
