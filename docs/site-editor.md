# Site editor

Edit site text from the browser at `/admin` (Sveltia CMS, GitHub backend). Every save is a commit to `main`, and the Pages workflow publishes it.

## Use it
1. **Create a token** at https://github.com/settings/personal-access-tokens/new:
   - Token name: Site editor.
   - Expiration: 90 days.
   - Resource owner: PittsIrv.
   - Repository access: only PittsIrv/PittsIrv.github.io.
   - Repository permissions: Contents, Read and write.
   - Copy the token; GitHub shows it once.
2. **Open** https://pittsirv.github.io/admin/.
3. **Sign in** with "Sign In Using Access Token" and paste the token. "Sign In with GitHub" needs an OAuth app the site does not have. The token stays in that browser. On a shared computer, sign out from the account menu at the top right.
4. **Edit and publish.** Open an entry, change it and click Save. The site rebuilds within about a minute.

## If a change does not appear
Open https://github.com/PittsIrv/PittsIrv.github.io/actions. A red mark on the newest run means the build rejected the edit. Open that run, then the "build" job, then the red step "Build Astro site"; the error line names the file and field (for example `contact: Expected string`). Fix the field in the editor and save again; until then the live site keeps the previous version.

## When the token expires
After 90 days the editor rejects the token; GitHub emails a reminder shortly before. Create a new token (step 1), then sign in again (step 3). The old token can be deleted on the same GitHub page.

## Maintenance
- Editor version: `@sveltia/cms` in `package.json`, pinned exactly. `npm run build` copies it to `public/admin/cms/`.
- Editable fields: `public/admin/config.yml`. Build-time checks: `src/data/schemas.ts` and `src/content/config.ts`. Keep the three in step when a field changes.
- `public/admin/index.html` sets a Content-Security-Policy that allows scripts only from this site. Keep it when upgrading: the sign-in token lives in this origin's storage.
