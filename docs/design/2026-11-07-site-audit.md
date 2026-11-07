# Site audit (2026-11-07)

Live site https://pittsirv.github.io, captured at 1280 and 375 px (full page, headless Chrome) after PR #7. Pages: home, about, work, projects, personal, meetwo, articles/monologue, poems/adventure. No page scrolls horizontally at 375 px (scrollWidth = viewport on all 16 captures). Text contrast passes AA: muted `#56627a` on `#fbfcff` is about 5.9:1.

Ranked by how much each costs a first-time academic or recruiter visitor.

## 1. The home page does not say what Mingxi works on
The fold is a 7.5rem name, a caps eyebrow and four links. The only statement of focus is in the side note ("Focus: AI systems and infrastructure"). Faculty homepages open with a two-to-four sentence bio and research interests beside a photo; this one opens with typography. **Needs Mingxi:** a short bio paragraph and, optionally, a photo.

## 2. "All projects" is an empty section
Home has a heading "All projects" with nothing under it except a "Gallery" link on the right. It reads as a missing block. The projects themselves are one click away and invisible from the entry page.

## 3. Projects is not in the navigation
Nav is Work, Personal, About. /projects and /meetwo are reachable only from links inside pages. Work also has an in-page "Projects" anchor that means something different, so the same word points to two places.

## 4. Project cards: no reading order
Each card stacks period, one-line, Intuition, bullets, links and tags with near-equal weight.
- The Intuition sits between the one-line and the "what I did" bullets, so the facts a reviewer scans for come after a first-person paragraph. MeeTwo's Intuition is about 140 words and pushes its bullets below the fold.
- Two-column grid with very unequal content: Table Forty Nine and Daybook carry 150–250 px of dead space; the grid row height is set by the longest Intuition.
- The status pill on every card repeats the section heading above it (Active / Shipped).
- Tags are 12 px muted text with no grouping, the smallest text on the page, though Mingxi wants them kept and visible.
- The "Intuition" label and the status pills use a monospace all-caps face, a template tell.

## 5. The project list and the cards say the same thing twice
The text list at the top repeats each card's name and one-line. On a phone that is seven rows before the first card, then the same seven names again.

## 6. Floating "Ask MeeTwo" covers content
At 1280 px it sits on the right edge of the content column (over a card title row on /projects and the date column on /work). At 375 px it collapses to an "M" disc that overlaps text. It must stay; it needs a resting place that clears the column.

## 7. Template chrome across the site
Monospace tracked caps eyebrows above every heading; numbered markers 01/02/03 on the home cards although they are not a sequence; "↗" (external-link arrow) on internal links (Work, About, Gallery); middle-dot meta strings. Together these read as a generated template rather than an academic page.

## 8. Home "Selected work" cards hide their substance
Three equal boxes with about 100 px of blank space above a "Details +" toggle; the real result (UIST 2026, +46% attack success) is behind the toggle. Faculty sites show the paper or result line directly.

## 9. Work page: publications are not formatted as publications
Title, then a grey course/venue line, then a summary, then "Details". No author list with Mingxi's name marked, no venue tag aligned, no PDF/code links. Alternating blue-grey bands make a long page look segmented rather than ordered. Skills repeat what the project tags already say.

## 10. About is thin and partly duplicates Work
Two sentences, four interest tiles that repeat Personal, and a "Get in touch" heading with the same sentence as the home side note. **Needs Mingxi:** whether About merges into home (common on faculty sites) or stays as a page.

## 11. Writing pages: oversized call to action
Poem and article pages end with a full-width dark band and a large filled "View all writing" button, the heaviest element on a quiet page; there is also a "Back to Personal" link at the top.

## 12. MeeTwo page leaves the right 40% empty
Fine functionally; reads unfinished at 1280 px.

## Not changed by this audit
- The footer self-description captions are Mingxi's decision of 2026-11-04 (`docs/decisions/2026-11-04-ai-reader-notes.md`); they stay.
- Intuition text is Mingxi's own; placement only.
