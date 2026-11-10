# Site editor

Edit site text from the browser at `/admin` (Sveltia CMS, GitHub backend). Every save is a commit to `main`, and the Pages workflow publishes it.

## Use it
1. **Create a token.** Open https://github.com/settings/personal-access-tokens/new (GitHub may ask for your password or a code first). Choose a *fine-grained* token, not a classic one:
   - Token name: Site editor.
   - Expiration: 90 days.
   - Resource owner: PittsIrv.
   - Repository access: **Only select repositories**, then pick PittsIrv/PittsIrv.github.io. (The default, "Public repositories", gives no write access and fails.)
   - Repository permissions: Contents, **Read and write**. Metadata (Read) is added by itself. Nothing else is needed.
   - Click Generate token and copy it; GitHub shows it once.
2. **Open** https://pittsirv.github.io/admin/.
3. **Sign in** with the only sign-in button, "Sign In Using Access Token": paste the token, click Sign In. Ignore "Work with Local Repository". The token stays in that browser. On a shared computer, sign out from the account menu at the top right.
4. **Edit and publish.** Open an entry, change it and click Save. The site rebuilds within about a minute.

## If sign-in fails
Read the red line on the sign-in screen.

| Message | Meaning | Check |
|---|---|---|
| The provided token is invalid | GitHub rejected the token (401) | Pasted in full with no spaces or line break; not expired or deleted; it starts with `github_pat_`. Create a new one if unsure. |
| You don't have access to the "PittsIrv.github.io" repository | The token cannot see the repository | Resource owner PittsIrv; Repository access is "Only select repositories" with PittsIrv.github.io ticked; the token was made while signed in as PittsIrv. |
| You don't have write access to the "PittsIrv.github.io" repository | The token can read but not write | Repository permissions: Contents is "Read and write", not "Read-only". |
| Couldn't check your access … try again | GitHub did not answer properly (busy, rate-limited, offline) | Wait a minute and retry; check https://www.githubstatus.com. |
| Cookie storage access has been denied | The browser blocks this site's storage | Use a normal (not private) window and allow site data for pittsirv.github.io. |
| A blank page or endless spinner after signing in | Something was blocked | Open the browser console (Option+Cmd+J) and send the red lines. |

The "Sign In with GitHub" button was removed: it needs an OAuth app this site does not have and ended on a "Not Found" page.

## If a change does not appear
Open https://github.com/PittsIrv/PittsIrv.github.io/actions. A red mark on the newest run means the build rejected the edit. Open that run, then the "build" job, then the red step "Build Astro site"; the error line names the file and field (for example `contact: Expected string`). Fix the field in the editor and save again; until then the live site keeps the previous version.

## When the token expires
After 90 days the editor rejects the token; GitHub emails a reminder shortly before. Create a new token (step 1), then sign in again (step 3). The old token can be deleted on the same GitHub page.

## Maintenance
- Editor version: `@sveltia/cms` in `package.json`, pinned exactly. `npm run build` copies it to `public/admin/cms/`.
- Editable fields: `public/admin/config.yml`. Build-time checks: `src/data/schemas.ts` and `src/content/config.ts`. Keep the three in step when a field changes.
- `public/admin/index.html` sets a Content-Security-Policy that allows scripts only from this site. Keep it when upgrading: the sign-in token lives in this origin's storage.
- `npm run build` runs `scripts/check-admin.mjs`: `/admin` stays noindex, its policy lists only reviewed hosts (GitHub's API, status, avatars, the font CDN) with no wildcard or `unsafe-eval`, the config points at this site's repository and `main`, and the OAuth button stays hidden. After upgrading the editor, sign in once with a real token and save one edit; the build cannot test that.
