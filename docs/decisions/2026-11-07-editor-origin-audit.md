# What can read the editor's sign-in token (T-0032, step 3)

Question: Sveltia CMS keeps the GitHub token in `localStorage` on `https://pittsirv.github.io` (key `sveltia-cms.user`). Any script that runs on that origin can read it. What runs there?

## Finding: no third-party script runs on this origin today
- **Site pages.** The live home, Projects, Work, Personal and MeeTwo pages, and every built page in `dist/`, load no external script, iframe or stylesheet. All scripts are the site's own bundles and inline scripts. Fonts are self-hosted.
- **MeeTwo chat.** It calls the MeeTwo API with `fetch`. A remote server cannot read browser storage. The chat writes questions and replies with `textContent`, never as HTML, so an API response cannot inject a script. Its own `sessionStorage` key holds only whether the panel is open and the visible conversation.
- **The editor page (`/admin`).** The editor bundle and its chunks are served from this site, pinned by version and lockfile hash. Sveltia can import extra libraries from unpkg at runtime; the page's Content-Security-Policy (`script-src 'self' blob:`) blocks them, so no third-party script can run there. Fonts come from cdn.jsdelivr.net; network calls go to api.github.com and githubstatus.com. Neither fonts nor `fetch` responses execute code.
- **Other GitHub Pages sites of this account.** A project site of the same GitHub account is served under the same origin (`pittsirv.github.io/<repo>/`) and shares its storage.
  - One other repository has Pages configured. It is a private repository, and its URL returns 404 today, so it serves nothing.
  - Its pages load third-party scripts from public CDNs. If that site is ever published, those scripts would run on this origin and could read the token.

## Recommendation
- Turn off Pages for that repository. This is a settings change on another repository, so it is the owner's hands: Settings → Pages → Unpublish, or delete the Pages source.
- Until then, the risk is latent: nothing is served.
- Before any new project site under this account goes live, check it loads no third-party script, or give it its own domain.

## Method
- `curl` of each live page, plus a grep of `dist/` for external `script`, `iframe` and stylesheet tags.
- A read of `src/components/MeeTwoChat.astro` and `MeeTwoLauncher.astro`.
- The GitHub Pages API for every repository of the account.
- A grep of the Sveltia bundle for runtime `import()` targets.
- A browser session on `/admin` with the CSP, recording blocked requests.
