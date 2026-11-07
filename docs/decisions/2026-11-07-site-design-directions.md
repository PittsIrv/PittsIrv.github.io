# Site design: survey, audit and directions (T-0035)

Goal: make the site read like a professional academic homepage while keeping the project cards' stack tags, "what I did" bullets and Intuition paragraphs, arranged with a clear hierarchy.

## Done
- Survey of 14 faculty homepages: `docs/design/2026-11-07-academic-site-survey.md`.
- Audit of the live site at 1280 and 375 px, 12 ranked findings: `docs/design/2026-11-07-site-audit.md`.
- Three directions for home and /projects on a private design canvas (A one-column reading list, B facts and Intuition side by side, C index table with expandable rows). Waiting for the pick.

## Small decisions (Claude)
- **Survey criticism is not attributed in the public repo.** The repo is public and some surveyed faculty may read it; the repo copy lists strengths per site and failures as unattributed anti-patterns. The attributed critique lives outside the repo.
- **Directions keep the current palette** (ink `#17243c`, accent `#244fc2`, paper `#fbfcff`) and Source Serif 4. They differ in layout and the sans companion (system sans, Source Sans 3, Public Sans; all OFL via Google Fonts), because the audit's problems are arrangement, not colour.
- **Projects joins the nav in all directions.** It is the page Mingxi asked to improve and was reachable only from links inside pages.
- **Mock copy uses only existing site text.** Statement and photo are bracketed placeholders for Mingxi.
- **Recommendation: B.** A reviewer scans the left column (one line, bullets, tags, links) without the Intuition pushing it down; the Intuition sits beside it in a tinted panel and stays fully visible. Rows end the unequal-height grid.

## Intuitions and rejected alternatives
- Grouping projects by theme (a strong faculty pattern) was not mocked: it needs theme names, which are Mingxi's to define.
- Hiding the Intuition behind a toggle (C) is kept as an option because it gives the shortest page, but it makes Mingxi's own words one click away.

## Open questions for Mingxi
- A one-sentence research statement for the home page.
- A photo, or none.
- Whether About merges into the home page.
