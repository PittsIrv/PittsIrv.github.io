# Project overview
# CLAUDE.md

Personal website for Mingxi Yan. Astro + Tailwind CSS + TypeScript, deployed to GitHub Pages via GitHub Actions on push to `main`.

## Commands

- `npm run dev` — dev server at localhost:4321
- `npm run build` — production build to `./dist/` (must pass before committing)

## Content

All content lives in `src/content/` collections (poems, articles, quotes, projects, poker-games), except the projects gallery, which reads `src/data/projects.json` (see `docs/projects-gallery.md`); schemas in `src/content/config.ts`. Pages are in `src/pages/`, shared layout in `src/layouts/Layout.astro`.

# Decision record (follow-up section and revisit list)
## Follow-up — 2026-11-07: content added from /admin must not break the build
The first version failed the build for any page without a committed PNG. A poem or article added from the site editor is only a Markdown file, so publishing it would have broken the Pages deploy. Decision (Claude, small, Router's brief offered two routes): the layout uses `og/home.png` when a page has no image of its own. `check-previews` still fails on a missing title or description, and on an image tag whose file is missing. Rejected: generating images during the build, because the deploy has no Chrome. Checked locally with a poem file in the content folder and no PNG: build green, 11 pages pass, the page's `og:image` is the home image. Generating the page's own image stays optional (`node scripts/generate-og.mjs`). Revisit if per-page cards for CMS content matter to Mingxi.

## Independent review — 2026-11-07 (gemini-3.1-pro-preview, single pass, middle tier)

# Diff
```diff
diff --git a/scripts/generate-og.mjs b/scripts/generate-og.mjs
index f41d06f..5a31c52 100644
--- a/scripts/generate-og.mjs
+++ b/scripts/generate-og.mjs
@@ -1,6 +1,6 @@
 // Renders the 1200x630 link-preview images in public/og/ from the site's own font and colours.
 // Needs a local Chrome: CHROME_PATH=/path/to/chrome node scripts/generate-og.mjs
-// Re-run after adding a page, poem or article; commit the PNGs.
+// Optional: pages without their own image use og/home.png. Re-run to give new pages, poems or articles their own; commit the PNGs.
 import { execFileSync } from 'node:child_process';
 import { mkdirSync, readdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
 import { join, resolve } from 'node:path';
diff --git a/src/layouts/Layout.astro b/src/layouts/Layout.astro
index 80007d4..7ac0502 100644
--- a/src/layouts/Layout.astro
+++ b/src/layouts/Layout.astro
@@ -2,6 +2,7 @@
 import '../styles/global.css';
 import MeeTwoLauncher from '../components/MeeTwoLauncher.astro';
 import { buildCsp } from '../csp.mjs';
+import { existsSync } from 'node:fs';
 
 interface Props {
   title: string;
@@ -14,7 +15,9 @@ const hasMeeTwo = launcher && Boolean(import.meta.env.PUBLIC_STANDIN_URL);
 const canonicalURL = new URL(Astro.url.pathname, Astro.site);
 
 const slug = Astro.url.pathname.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home';
-const imageURL = new URL(`/og/${slug}.png`, Astro.site).href;
+// A page without its own committed image (a poem or article added from /admin) uses the home image.
+const ownImage = existsSync(`public/og/${slug}.png`);
+const imageURL = new URL(`/og/${ownImage ? slug : 'home'}.png`, Astro.site).href;
 const imageAlt = `${title}`;
 
 const csp = buildCsp(import.meta.env.PUBLIC_STANDIN_URL, Astro.url);
```
Reviewer sees only this package.
