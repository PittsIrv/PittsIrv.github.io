# Package

## Project overview
# CLAUDE.md

Personal website for Mingxi Yan. Astro + Tailwind CSS + TypeScript, deployed to GitHub Pages via GitHub Actions on push to `main`.

## Commands

- `npm run dev` — dev server at localhost:4321
- `npm run build` — production build to `./dist/` (must pass before committing)

## Content

All content lives in `src/content/` collections (poems, articles, quotes, projects, poker-games), except page text and the projects gallery, which read `src/data/*.json` (`home`, `work`, `about`, `personal`, `projects`; see `docs/projects-gallery.md`), validated by `src/data/schemas.ts`; collection schemas in `src/content/config.ts`. Pages are in `src/pages/`, shared layout in `src/layouts/Layout.astro`.

## Decision record
# Admin sign-in failure (T-0086)

## Intent
Mingxi cannot sign in to the site editor at `/admin`. The editor was only ever tested against a local folder, so the real path (paste a fine-grained GitHub token, read the repository, save one edit as a commit) has never run.
This step finds why sign-in fails, fixes whatever is on the site's side (policy, config, version, how-to) with the smallest change, adds a check that would have caught it, and gives Mingxi an exact checklist for the token and for each error message. Signing in with the real token stays Mingxi's own step.

## Evidence (no real token used; a deliberately fake one was typed)
- **Live and local are identical.** `/admin/cms/sveltia-cms.js` on pittsirv.github.io has the same SHA-1 as the local build; chunks answer 200 with a JavaScript type; the live CSP equals the repo's. The app loads on a local build and shows three buttons.
- **CSP does not block sign-in.** Fake token "Sign In Using Access Token" produced a real request to api.github.com, answered 401, shown as "The provided token is invalid. Please check and try again." The only CSP violation in the console is Sveltia's own version check to unpkg.com, which is intentionally blocked (decided 2026-11-07) and harmless. Every host the GitHub backend uses in the shipped bundle is api.github.com (REST `/user`, `/repos/…`, and `/graphql`), plus avatars.githubusercontent.com for the avatar, all allowed.
- **Config is right.** `backend: github`, `repo: PittsIrv/PittsIrv.github.io` (matches `git remote`; the repo is public), `branch: main`. Sveltia 0.250.2 offers token sign-in ("Sign In Using Access Token"). Its own token-page link asks for `contents=write`.
- **What sign-in does** (read from the shipped bundle): GET api.github.com/user with the token (401 → "token is invalid"); then GET /repos/PittsIrv/PittsIrv.github.io and requires `permissions.push` (401/403/404 → "You don't have access to the repository"; read but not push → "You don't have write access"); then loads files over GraphQL; the token is kept in this origin's IndexedDB (`sveltia-cms.user`).
- **Most likely cause: the OAuth button.** The page's most prominent button is "Sign In with GitHub". It opens a popup to `https://api.netlify.com/auth?provider=github&site_id=pittsirv.github.io…`, which answers `404 Not Found` (checked with curl; in the in-app browser the popup was attempted to api.netlify.com). The 2026-11-07 record kept the button visible and relied on the how-to. Anyone who clicks it gets a dead end, with no error on the editor page.
- **Pages prerequisite.** `WebDevLabs` (private) still has Pages enabled in its settings, but https://pittsirv.github.io/WebDevLabs/ answers 404 now, so nothing is published at that path. Nothing changed there.
- **Not testable here:** a valid token's full path (repo check, GraphQL load, first save). Residual causes on Mingxi's side, in order: token made with "Public repositories" or wrong repository selection; Contents left at Read-only; a mistyped or truncated paste; a browser that blocks site storage.

## Fix (smallest change)
- `public/admin/index.html`: hide the OAuth button with one CSS rule, `.buttons > button[data-label*="GitHub"]`. Verified in the browser: three buttons, the GitHub one `display: none`, the token one works.
- `scripts/check-admin.mjs`, run by `npm run build`: noindex present; CSP has no wildcard or `unsafe-eval`, `script-src 'self' blob:`, only reviewed hosts, `api.github.com` in `connect-src`, avatars in `img-src`; config is github / this site's repo / main; the hide rule is present and the bundle still has the labels it targets. Confirmed it fails when the rule or `api.github.com` is removed.
- `docs/site-editor.md`: exact token steps ("Only select repositories", Contents Read and write) and an error table. `docs/whats-new.md` entry.

## Small decisions (Claude)
- **Hide, not replace, the OAuth button.** Sveltia has no setting to hide it; CSS is one line and reversible. A script that edits the page would need more code on a token-bearing origin. Revisit when: an OAuth app or a proxy is ever added, or an upgrade changes the button markup (the build check fails then).
- **Selector uses `data-label*="GitHub"`, not position.** Safari has no "Work with Local Repository" button, so a position rule could hide the token button. Revisit when: the CMS locale is set to a language whose label drops the word GitHub.
- **No new allowed host.** Nothing needed one.

## Intuitions and rejected alternatives
- Rejected: adding api.netlify.com to the CSP. It would not help; the endpoint returns 404 for this site.
- Rejected: an OAuth app or proxy (ruled out by the brief: no new provider, no secret in the site).
- Rejected: patching the bundle's login screen; the CSS rule keeps the pinned package untouched.

## How to verify
Open `https://pittsirv.github.io/admin/` after the deploy: only "Work with Local Repository" and "Sign In Using Access Token" show. Create the token as in `docs/site-editor.md`, paste it, open an entry and save. Locally: `npm run build` prints "Admin check: …".

## Revisit when
First real sign-in: if it still fails, the single thing needed is the exact red message on the sign-in screen (or "popup", if a new window opened).

## Diff (PR #29 against main)
```diff
diff --git a/docs/site-editor.md b/docs/site-editor.md
index 145f76a..b688fea 100644
--- a/docs/site-editor.md
+++ b/docs/site-editor.md
@@ -3,17 +3,31 @@
 Edit site text from the browser at `/admin` (Sveltia CMS, GitHub backend). Every save is a commit to `main`, and the Pages workflow publishes it.
 
 ## Use it
-1. **Create a token** at https://github.com/settings/personal-access-tokens/new:
+1. **Create a token.** Open https://github.com/settings/personal-access-tokens/new (GitHub may ask for your password or a code first). Choose a *fine-grained* token, not a classic one:
    - Token name: Site editor.
    - Expiration: 90 days.
    - Resource owner: PittsIrv.
-   - Repository access: only PittsIrv/PittsIrv.github.io.
-   - Repository permissions: Contents, Read and write.
-   - Copy the token; GitHub shows it once.
+   - Repository access: **Only select repositories**, then pick PittsIrv/PittsIrv.github.io. (The default, "Public repositories", gives no write access and fails.)
+   - Repository permissions: Contents, **Read and write**. Metadata (Read) is added by itself. Nothing else is needed.
+   - Click Generate token and copy it; GitHub shows it once.
 2. **Open** https://pittsirv.github.io/admin/.
-3. **Sign in** with "Sign In Using Access Token" and paste the token. "Sign In with GitHub" needs an OAuth app the site does not have. The token stays in that browser. On a shared computer, sign out from the account menu at the top right.
+3. **Sign in** with the only sign-in button, "Sign In Using Access Token": paste the token, click Sign In. Ignore "Work with Local Repository". The token stays in that browser. On a shared computer, sign out from the account menu at the top right.
 4. **Edit and publish.** Open an entry, change it and click Save. The site rebuilds within about a minute.
 
+## If sign-in fails
+Read the red line on the sign-in screen.
+
+| Message | Meaning | Check |
+|---|---|---|
+| The provided token is invalid | GitHub rejected the token (401) | Pasted in full with no spaces or line break; not expired or deleted; it starts with `github_pat_`. Create a new one if unsure. |
+| You don't have access to the "PittsIrv.github.io" repository | The token cannot see the repository | Resource owner PittsIrv; Repository access is "Only select repositories" with PittsIrv.github.io ticked; the token was made while signed in as PittsIrv. |
+| You don't have write access to the "PittsIrv.github.io" repository | The token can read but not write | Repository permissions: Contents is "Read and write", not "Read-only". |
+| Couldn't check your access … try again | GitHub did not answer properly (busy, rate-limited, offline) | Wait a minute and retry; check https://www.githubstatus.com. |
+| Cookie storage access has been denied | The browser blocks this site's storage | Use a normal (not private) window and allow site data for pittsirv.github.io. |
+| A blank page or endless spinner after signing in | Something was blocked | Open the browser console (Option+Cmd+J) and send the red lines. |
+
+The "Sign In with GitHub" button was removed: it needs an OAuth app this site does not have and ended on a "Not Found" page.
+
 ## If a change does not appear
 Open https://github.com/PittsIrv/PittsIrv.github.io/actions. A red mark on the newest run means the build rejected the edit. Open that run, then the "build" job, then the red step "Build Astro site"; the error line names the file and field (for example `contact: Expected string`). Fix the field in the editor and save again; until then the live site keeps the previous version.
 
@@ -24,3 +38,4 @@ After 90 days the editor rejects the token; GitHub emails a reminder shortly bef
 - Editor version: `@sveltia/cms` in `package.json`, pinned exactly. `npm run build` copies it to `public/admin/cms/`.
 - Editable fields: `public/admin/config.yml`. Build-time checks: `src/data/schemas.ts` and `src/content/config.ts`. Keep the three in step when a field changes.
 - `public/admin/index.html` sets a Content-Security-Policy that allows scripts only from this site. Keep it when upgrading: the sign-in token lives in this origin's storage.
+- `npm run build` runs `scripts/check-admin.mjs`: `/admin` stays noindex, its policy lists only reviewed hosts (GitHub's API, status, avatars, the font CDN) with no wildcard or `unsafe-eval`, the config points at this site's repository and `main`, and the OAuth button stays hidden. After upgrading the editor, sign in once with a real token and save one edit; the build cannot test that.
diff --git a/docs/whats-new.md b/docs/whats-new.md
index 36fd472..1e6a754 100644
--- a/docs/whats-new.md
+++ b/docs/whats-new.md
@@ -1,5 +1,9 @@
 # What's new
 
+## 2026-11-10 · Editor sign-in
+Try: open `/admin`; the only sign-in button is "Sign In Using Access Token". Follow `docs/site-editor.md` to create the token (Only select repositories, Contents Read and write) and paste it.
+You get: no more dead-end "Sign In with GitHub" button (it ended on a "Not Found" page), and a table of what each sign-in error means.
+
 ## 2026-11-08 · Your rulings on the resume merge
 Try: open /work and click "Resume (PDF)"; read the Chimps Lab and Enterview.ai entries; open /projects and find Dealer's Choice.
 You get: the AI-engineer resume as the site's PDF, Chimps Lab as "Research Engineer", "Enterview.ai", and Dealer's Choice dated June 2025 to June 2026.
diff --git a/package.json b/package.json
index 096f2a4..58aab9b 100644
--- a/package.json
+++ b/package.json
@@ -4,7 +4,7 @@
   "version": "0.0.1",
   "scripts": {
     "dev": "node scripts/copy-cms.mjs && astro dev",
-    "build": "node scripts/copy-cms.mjs && astro build && node scripts/check-csp.mjs && node scripts/check-previews.mjs && node scripts/check-feeds.mjs && node scripts/check-meetwo-request.mjs",
+    "build": "node scripts/copy-cms.mjs && astro build && node scripts/check-csp.mjs && node scripts/check-admin.mjs && node scripts/check-previews.mjs && node scripts/check-feeds.mjs && node scripts/check-meetwo-request.mjs",
     "preview": "astro preview",
     "astro": "astro"
   },
diff --git a/public/admin/index.html b/public/admin/index.html
index 9220b09..f4062a1 100644
--- a/public/admin/index.html
+++ b/public/admin/index.html
@@ -7,6 +7,8 @@
   <!-- Only scripts served by this site may run here: the editor keeps the sign-in token in this origin's storage. -->
   <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' blob:; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://avatars.githubusercontent.com; font-src 'self' data: https://cdn.jsdelivr.net; connect-src 'self' blob: data: https://api.github.com https://www.githubstatus.com; worker-src 'self' blob:; frame-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'none'">
   <title>Site editor</title>
+  <!-- "Sign In with GitHub" needs an OAuth app this site does not have; its popup ends on a "Not Found" page. Only the access-token sign-in works, so the OAuth button is hidden. -->
+  <style>.buttons > button[data-label*="GitHub"] { display: none; }</style>
   <link href="/admin/config.yml" type="application/yaml" rel="cms-config-url">
 </head>
 <body>
diff --git a/scripts/check-admin.mjs b/scripts/check-admin.mjs
new file mode 100644
index 0000000..80da98f
--- /dev/null
+++ b/scripts/check-admin.mjs
@@ -0,0 +1,45 @@
+// Fails the build when the site editor at /admin could not sign in or is no longer locked down.
+// Reads the built page and config from dist/ and the pinned CMS bundle from public/admin/cms/.
+// Usage: node scripts/check-admin.mjs [distDir]
+import { readFileSync, readdirSync } from 'node:fs';
+import { join } from 'node:path';
+import config from '../astro.config.mjs';
+
+const dist = process.argv[2] ?? 'dist';
+const html = readFileSync(join(dist, 'admin/index.html'), 'utf8');
+const yml = readFileSync(join(dist, 'admin/config.yml'), 'utf8');
+const problems = [];
+const need = (ok, msg) => { if (!ok) problems.push(msg); };
+
+// Page is never indexed.
+need(/<meta name="robots" content="noindex, nofollow">/.test(html), 'admin/index.html lost its noindex tag');
+
+// Policy: named hosts only, nothing broad, and the GitHub backend's own host is reachable.
+const csp = html.match(/http-equiv="Content-Security-Policy" content="([^"]*)"/)?.[1] ?? '';
+const dirs = Object.fromEntries(csp.split(';').map((d) => d.trim().split(/\s+/)).filter((d) => d[0]).map(([k, ...v]) => [k, v]));
+const allowedHosts = new Set(['https://api.github.com', 'https://www.githubstatus.com', 'https://avatars.githubusercontent.com', 'https://cdn.jsdelivr.net']);
+need(csp !== '', 'admin/index.html has no Content-Security-Policy');
+need(!/\*|unsafe-eval/.test(csp), 'admin CSP contains a wildcard or unsafe-eval');
+need(dirs['script-src']?.join(' ') === "'self' blob:", `admin script-src must be 'self' blob:, got ${dirs['script-src']?.join(' ')}`);
+for (const [name, values] of Object.entries(dirs)) {
+  for (const v of values.filter((x) => /^https?:/.test(x))) need(allowedHosts.has(v), `admin CSP ${name} lists an unreviewed host ${v}`);
+}
+need(dirs['connect-src']?.includes('https://api.github.com'), 'admin connect-src must allow https://api.github.com (sign-in and every save)');
+need(dirs['img-src']?.includes('https://avatars.githubusercontent.com'), 'admin img-src must allow https://avatars.githubusercontent.com');
+
+// Config: GitHub backend on this site's own repository and branch.
+const repo = yml.match(/^\s+repo:\s*(\S+)/m)?.[1];
+const owner = new URL(config.site).hostname.split('.')[0];
+need(/^\s+name:\s*github\s*$/m.test(yml), 'config.yml backend is not github');
+need(repo?.toLowerCase() === `${owner}/${owner}.github.io`.toLowerCase(), `config.yml repo "${repo}" is not ${owner}/${owner}.github.io`);
+need(/^\s+branch:\s*main\s*$/m.test(yml), 'config.yml branch is not main');
+
+// The unusable OAuth button stays hidden, and the selector still matches the pinned bundle's button.
+need(html.includes('button[data-label*="GitHub"] { display: none; }'), 'admin page no longer hides the "Sign In with GitHub" (OAuth) button');
+const bundle = readFileSync(new URL('../public/admin/cms/sveltia-cms.js', import.meta.url), 'utf8');
+need(bundle.includes('Sign In with '), 'CMS bundle no longer has the "Sign In with" label the hide rule targets');
+need(bundle.includes('Sign In Using Access Token'), 'CMS bundle no longer offers token sign-in');
+need(readdirSync(new URL('../public/admin/cms/', import.meta.url)).includes('chunks'), 'CMS lazy chunks were not copied');
+
+if (problems.length) { console.error(`Admin check failed:\n- ${problems.join('\n- ')}`); process.exit(1); }
+console.log('Admin check: noindex, strict CSP with named hosts, GitHub repo/branch, token sign-in only.');
```

Reviewer sees only this package.
