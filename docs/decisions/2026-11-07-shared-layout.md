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
