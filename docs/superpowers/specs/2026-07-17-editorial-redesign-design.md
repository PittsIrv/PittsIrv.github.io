# Editorial Redesign — Design Spec

**Date:** 2026-07-17
**Status:** Superseded by `2026-09-08-professional-restructure-design.md` (never implemented)
**Goal:** Make the site interesting through storytelling and voice while staying professional for a balanced audience (recruiters/engineers and friends/general readers, 50/50).

## Diagnosis

- The site's most distinctive material — inventing poker variants, building the Dealer's Choice platform, co-authoring a paper fine-tuning an LLM to explain poker decisions — is one story told three ways, but the site presents it as disconnected cards on separate pages.
- Prose tells instead of shows: abstract meditations open pages while concrete, memorable specifics are buried mid-paragraph.
- Visual idioms (animated blobs, icon-in-black-square tiles, hover-lift cards) read as Tailwind-template defaults, which undercuts both distinctiveness and professionalism.

## Direction chosen

Editorial rewrite within the current structure, plus two structural upgrades: a narrative homepage and a `/now` page replacing Misc. Alternatives considered and rejected: full narrative-spine restructure (too much rewriting before anything ships) and writing-first digital garden (under-serves the recruiter half of the audience).

## Design

### 1. Voice principles (site-wide)

- Every rewritten section must contain at least one specific fact only Mingxi could have written. "I came to code after starting university" passes; "exploring the intersections of technology, strategy, and creativity" fails.
- First person, shorter sentences. Abstractions are earned: concrete details first, philosophy at the end of a story, never the beginning.
- Fix existing typos during the pass: "expriences", "chanllenge", "reading ane exploiting", and similar.

### 2. Homepage (`src/pages/index.astro`)

- Remove: blob animations, "Code | Poker | Write | Sports" divider row, scroll indicator, icon cards.
- Add: a quiet text-first opening — name, then a single 5–8 sentence first-person introduction telling the through-line (invents poker games → built a platform to play them → taught a language model to reason about them; CMU CS; writes poems).
- Section links become plain text links with one-line descriptions (Academic, Poker, Writing, Now).
- The quote section pulls a random quote from the existing `quotes` content collection at build time instead of a hard-coded Heidegger quote.

### 3. About (`src/pages/about.astro`)

- Open with the concrete origin story (late to code, what that perspective gives).
- Five interest vignettes each cut roughly in half; keep only sentences with specifics (the Kyrie line stays; generic pattern-recognition sentences go).
- The opening philosophical meditation is condensed to 2–3 sentences and moved to close the page.
- Contact section unchanged.

### 4. Through-line threading (cross-links)

- Academic: Dealer's Choice project card links to `/poker` ("the games this platform exists to play →").
- Poker page: one-sentence mentions of the platform and the paper.
- Paper card on Academic: one sentence noting it grew from the same obsession.
- Total new copy: three or four sentences across the site.

### 5. `/now` page replacing Misc

- New `src/pages/now.astro`; `misc.astro` removed; navigation label "Misc" → "Now".
- Visible "Updated <Month Year>" date at top — the honesty mechanism. Content stays short enough that an update takes ten minutes.
- Sections: building, reading, playing, learning. Guitar/photography content from Misc migrates here in shortened form.
- Plain Astro page, manually edited every couple of months. No new content collection.

### 6. Typographic redesign (restrained)

- Keep: black/white/grey palette, Astro + Tailwind stack, subtle fade-in animations.
- Add: a self-hosted serif (e.g., Source Serif) for headings and long-form prose; body stays sans. No external font CDNs.
- Remove: blob animations, icon-in-black-square tiles, hover-lift card effects.
- Cards become simple bordered or hairline-ruled blocks. Larger type-scale contrast, wider margins.

## Out of scope / unchanged

- Site architecture, content collections, deploy pipeline (GitHub Pages via Actions).
- Academic page structure and content — the recruiter path stays exactly as findable as today.
- Resume PDF, paper PDF, SEO/meta setup.

## Verification

Static site — no test infrastructure. `npm run build` must pass, plus a visual pass of every page in dev (desktop and mobile widths).

## Implementation workflow

Claude acts as the brain (task breakdown, prompts, review, verification); Codex CLI acts as the worker executing implementation tasks. Each task: Claude writes a precise prompt referencing this spec → Codex implements → Claude reviews the diff against the spec and voice principles → iterate or accept.
