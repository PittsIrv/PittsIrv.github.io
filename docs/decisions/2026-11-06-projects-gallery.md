# Projects gallery (T-0022)

## Intent
Replace the home page's three featured project tiles with a gallery of all side projects rendered from one data file (`src/data/projects.json`) that the Router keeps current. Everything not confirmed public is kept outside the repo.

## Decisions
- Data file in `src/data/projects.json`, not a content collection: one file, one import, no schema churn. Router, 2026-11-06.
- Visibility levels `public`, `title`, `hold`. Only `public` and `title` render; `title` shows name, status pill and one neutral line. Router, 2026-11-06.
- Held entries are not stored in the repo, which is public: they live in the Router's private inventory. Router, 2026-11-06, after the independent review found the exposure.
- Which entries are public: side projects only (standin, Table Forty Nine, Golfie, Daybook, Brawl Lab, Dealer's Choice). Mingxi, 2026-11-06.
- `/work` keeps experience, publications, education, skills and the résumé link; only its Projects section is removed and replaced by a nav link to `/projects`. The Router's earlier decision to redirect `/work` to `/projects` is withdrawn: it would have removed public content outside the gallery's scope. Router, 2026-11-06.
- The standin chat widget stays on `/work` in its own short "standin" section, outside the removed Projects section. Router, 2026-11-06.
- `personal.astro` link `/work#projects` repointed to `/projects#shipped` so no anchor breaks. Worker, small.
- `astro check` skipped: it needs `@astrojs/check`, a new dependency. `npx tsc --noEmit` and `npm run build` pass.

## Intuitions and rejected alternatives
- Rejected: redirecting `/work` (deletes 418 lines of non-project content).
- Rejected: images on cards; the old tiles are no longer referenced but the files remain in `public/images/built/`.
- Unused `.built-*` CSS remains in `global.css`; not touched.

## How to verify
Open `/` : the Projects section links to the gallery. Open `/projects`: six cards grouped Active, Shipped, Paused. Open `/work`: no Projects section; the nav "Projects" link goes to `/projects`.

## Revisit when
Mingxi wants non-side-project entries shown (use `title`, via the private inventory), or 2026-12-01 at the latest.

## Independent review — 2026-11-06 (gpt-6-astra, high)
Full text kept outside the repo (`~/.claude/router/reviews/T-0022-review.md`).
- /work#projects bookmarks lose their target → disagree — a static page cannot redirect fragments; the old URL still loads /work.
- "Project details" link tied to a status group → agree — cards have per-project anchors; the link is /projects#dealer-s-choice.
- Unknown status drops an entry; malformed dates render nonsense → agree — the build throws on invalid status, visibility or period.
- Held metadata in a public repo → agree, a real problem: held entries moved to the private inventory and the branch history rewritten locally so no commit contains them.
- Standin chat removal bundled in → agree — chat restored on /work.
- Automated visibility test → disagree for now; the build-time check and the six-card verification suffice at this size.
- title → public approval gap → agree; doc fixed.
- CLAUDE.md content inventory stale → agree; fixed.
- `astro check` absent → already recorded.
Verdict: ship with fixes. Action taken: all agreed fixes applied.
