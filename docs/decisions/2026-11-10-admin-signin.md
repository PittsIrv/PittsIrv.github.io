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

## Revisit when
First real sign-in: if it still fails, the single thing needed is the exact red message on the sign-in screen (or "popup", if a new window opened).
