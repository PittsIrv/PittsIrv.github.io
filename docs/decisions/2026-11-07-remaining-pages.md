# Remaining pages: Work, Personal, About, MeeTwo, writing (T-0035, PR 4 of 4)

## Intent
Bring the remaining pages in line with the shared layout and the home and /projects pages: no tracked-capital labels, no alternating tinted bands, arrows only on external links, and quiet calls to action. Wording is unchanged except two About headings.

## Decisions
- **Section headings on Work and Personal** (Claude, small; Router: retire template details). The small grey tracked capitals ("EXPERIENCE", "WRITING") become serif sentence-case headings, the same style as home and /projects (`.section-title` in `global.css`).
- **No alternating tinted bands** on Work and Personal (Claude, small; audit finding 9). Sections are separated by a rule; the page reads as one document.
- **About** (Claude, small): the "About", "Outside work" and "Contact" labels above headings are removed; the heading "Get in touch" becomes "Contact" (audit: rhetorical headline). The sentence under it is unchanged.
- **Arrows only on external links** (Router): removed from internal and mail links on Work, About and MeeTwo; "Read →" on writing cards becomes "Read" with the title for screen readers.
- **Poem and article pages** (Claude, small; audit finding 11): the full-width dark "View all writing" band becomes a plain "All writing" link under a rule; the category label is sentence case.

## Not changed (flagged to the Router)
- Work, Personal and About text is still written inside the page files. Moving it into data files, for the planned form editor, is a separate step.
- The Work page's course-project entry names two collaborators; the ticket's no-teammate-names rule covers new text, so this existing line is left for Mingxi to decide.
- Publications are not reformatted as citations (authors, venue, links): the data has no author lists.

## Intuitions and rejected alternatives
- Keeping the bands on Work was considered for scannability; with serif headings and rules the sections are already distinct, and the bands made the page read as stacked panels.

## How to verify
- Open /work and /personal: headings read "Experience", "Publications", "Writing", "Quotes" in the serif; no blue-grey bands.
- Open /about: "Interests" and "Contact" headings with no small labels above them.
- Open a poem from /personal: the page ends with a small "All writing" link, not a dark button.

## Revisit when
Page text moves into data files (the layouts here should not need to change).

## Independent review — 2026-11-07 (gemini-3.1-pro-preview, middle tier): "ship with fixes"
- `poem.title` vs `poem.data.title` mismatch → checked, no — `personal.astro` maps the collection to flat objects; the built page has "A Love Letter", "Adventure" and "Monologue" in the screen-reader text.
- `ml-5` between inline links indents a wrapped second link → agree — the pair is now a wrapping flex row with a gap.
- Section distinction without bands on Work → checked at 375 and 1280 px; serif headings and rules separate sections. Kept.
- Mail links should keep "↗" → disagree — on this site the arrow means "opens another site in a new tab"; mail links do neither.
Verdict: ship with fixes. Action taken: link row fix.
