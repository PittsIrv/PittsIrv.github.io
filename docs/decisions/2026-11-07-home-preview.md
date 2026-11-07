# Home: identity block, selected work and project preview (T-0035, PR 3 of 4)

## Intent
Replace the home page's oversized name and empty "All projects" heading with the faculty-site pattern from the survey: a small identity block, then selected work and a project preview, each in the same row format as /projects (direction B). No research statement or photo yet: the Router said to render nothing until Mingxi provides them.

## Decisions
- **Identity block** (Router: small identity block). Name at 3.5 rem (was 7.5 rem), the affiliation line, four text links (Work, Ask MeeTwo, Resume (PDF), Email; no arrows, all on this site or mail). The "Currently" note becomes a tinted panel on the right with the same sentence and the BS line.
- **Selected work shows its result directly** (Claude, small; audit finding 8). The three entries' summary and detail are both visible; the "Details +" toggles and empty card space are gone. Each title links to its section on /work.
- **Project preview** (Router). The first three active public projects in `projects.json` order, each with its one line and stack tags, linking to its row on /projects. "All projects" links the full page. Selection is a rule, not a hand-picked list, so editing the data file changes it.
- **Home text moved into `src/data/home.json`** (Claude, small). Affiliation, the "Currently" sentence, the BS line and the three selected-work entries were hard-coded in the page; a future form editor can now edit them. Wording unchanged except the affiliation line, which joins the two existing parts ("Language Technologies Institute, Carnegie Mellon University").
- **Dead home styles removed from `global.css`** (Claude, small): the old intro, margin note, tile and note-card classes, used only by the previous home page.

## Intuitions and rejected alternatives
- Projects before selected work was considered; research and internships carry more weight with academic readers, so selected work comes first.
- A hand-picked "featured" flag in `projects.json` was not added: it would be a new field and a new editorial decision for Mingxi.

## How to verify
- Open the home page at a laptop width: name, affiliation and four links on the left, a light blue "Currently" panel on the right; below, "Selected work" with three rows and "Projects" with three rows and their stack tags.
- Click "MeeTwo" under Projects: /projects opens at the MeeTwo row.
- On a phone: everything stacks in one column; no horizontal scroll.

## Revisit when
Mingxi provides a research statement or photo (they go in the identity block), or more than three projects are active and a different preview rule is wanted.

## Independent review — 2026-11-07 (gemini-3.1-pro-preview, middle tier): "ship with fixes"
- Removed `.built-*` styles may be used elsewhere → checked, no — no file under `src/` references them.
- Inline `slug()` may drift from /projects ids → agree — one `src/utils/slug.ts` used by both pages; built /projects has `#meetwo`, `#table-forty-nine`, `#agent-relay`.
- /work anchors assumed → checked — the built /work page has `#tiktok`, `#personateaming`, `#sapling`.
- `tags` may be undefined → disagree — required by the schema in `docs/projects-gallery.md`; every entry has it.
- `home.json` is needless indirection → disagree — site content must live in data files so a form editor can change it (ticket rule).
- Add a `featured` flag → disagree for now — a new field and an editorial choice for Mingxi; recorded under rejected alternatives.
Verdict: ship with fixes. Action taken: shared slug utility.
