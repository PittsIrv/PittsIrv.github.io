# Site editor at /admin (T-0032, step 2)

Goal: Mingxi changes a line of site text from the browser, with no terminal, and sees it live after the Pages deploy (about 2 minutes). Edits must not break the build, 375 px or contrast.

## What exists
- `/admin` runs Sveltia CMS 0.250.2 with the GitHub backend on `PittsIrv/PittsIrv.github.io`, branch `main`. Sign-in is a fine-grained personal access token held only in Mingxi's browser. There is no OAuth app, no new provider, no server and no secret in the repo.
- Collections, each field labelled in plain words:
  - Pages: Home, Work, Personal, About (`src/data/*.json`).
  - Projects (`src/data/projects.json`).
  - Poems, Prose, Quotes, Poker variants (`src/content/*`).
- Every save is one commit to `main` with the message `Edit <collection> “<entry>” (site editor)`. The push triggers the existing Pages workflow.

## Small decisions (Claude)
- **Self-hosted, pinned bundle.** `@sveltia/cms` is pinned to exact version 0.250.2, published 2026-10-22; the latest release was then a day old, too new to trust. npm checks the lockfile integrity hash on every CI install, and `scripts/copy-cms.mjs` copies the script and its lazy chunks (no source maps) to `public/admin/cms/` at build time. Nothing is loaded from a CDN, so SRI is not needed. To upgrade, change the version in `package.json`.
- **Content-Security-Policy on `/admin`.** Sveltia can import libraries from unpkg at runtime: date locales, image encoders, svgo, pdf.js, exifr, turndown, leaflet and others. Code imported that way would run on this origin and could read the token. The page's CSP allows scripts only from this site (`script-src 'self' blob:`), so such imports are blocked. A feature that needs one (image optimisation on upload, maps, pasting HTML into Markdown) fails instead of loading third-party code.
  - Fonts are allowed from cdn.jsdelivr.net: the editor's own UI fonts and icon font. A font cannot execute code.
  - Network calls are allowed only to api.github.com and githubstatus.com. Sveltia's version check against unpkg is blocked; it is not needed.
  - Tested: loading, editing JSON, editing a poem's Markdown body and saving produce no blocked script.
- **The editor is not indexed.** `/admin/index.html` is a static file, not an Astro page, so it is not in the sitemap and carries no site layout or MeeTwo launcher. It is also marked `noindex, nofollow`. It is not added to `robots.txt`: a disallowed page cannot show search engines its noindex tag.
- **Build-time validation covers every editable data file.**
  - `projects.json` and `home.json` now have schemas too. The old hand-written status and period checks moved into the projects schema.
  - A blank optional field counts as absent, so an empty "Coming soon" or link renders nothing.
  - Missing lists default to empty.
- **`projects.json` is normalised to the editor's output.** The editor omits empty optional fields (`links: {}`, `did: []`, `tags: []`). The file now has the same shape, so Mingxi's first save produces a one-line diff. The built pages are byte-identical (whitespace-normalised).
- **YAML is written with double quotes**, matching the existing Markdown files. On a first save the editor still adds `draft: false` and `bilingual: false` to a poem or article, plus a final newline. Both are harmless and stay after the first save.
- **The "Sign In with GitHub" button stays visible.** It needs an OAuth app, which the brief rules out; the how-to tells Mingxi to use "Sign In Using Access Token". Sveltia has no setting to hide the button.
- **Commits go straight to `main` (simple publish mode).** This is Mingxi editing their own text with their own token. The Pages workflow and the build-time schemas are the guard: a bad edit fails the deploy, and the live site keeps its last good version.

## Gemini review (single pass, middle tier): ship with fixes
- *Copy script assumes `node_modules` next to the repo; pnpm could hoist it:* disagree. The repo uses npm (`package-lock.json`), and CI runs `npm ci`.
- *CI might call `astro build` directly and skip the copy:* already handled. `.github/workflows/deploy.yml` runs `npm run build`.
- *A bad edit on `main` fails the deploy with no feedback in the editor:* agree in part.
  - The editor's own validation mirrors the build schemas: required fields, the YYYY-MM period pattern, and select lists for status, visibility and kind. An edit that passes the editor passes the build.
  - GitHub emails the pusher when a workflow fails.
  - The how-to adds a recovery step: if the page has not changed after five minutes, open the Actions tab, then fix the field in the editor and save again. No terminal is needed.
- *Use the editorial workflow (pull requests) instead:* disagree. It adds a merge step to every edit. The Pages workflow runs only on pushes to `main`, so a pull request would not be built and checked either.
- *Use `vite-plugin-static-copy` instead of the copy script:* disagree. It adds a dependency to replace an eight-line script.
- *Are the added `draft`/`bilingual` booleans allowed?:* yes. `src/content/config.ts` declares both as optional booleans.
