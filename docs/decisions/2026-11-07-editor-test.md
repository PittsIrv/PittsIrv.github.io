# Site editor tested without a real token (T-0032, step 4)

Goal: show that editing a field in `/admin` changes exactly the expected file and produces the expected page, without using Mingxi's token.

## Method
- Sveltia's "Work with Local Repository" mode reads and writes a Git checkout through the browser's folder picker.
- The test used a fresh shallow clone of this repository, copied into the browser's private file system. The picker was pointed at it, so no real folder, account or token was involved.
- The editor ran from a local production build (`npm run build`, `astro preview`) with the same `/admin` page, config and Content-Security-Policy as the live site.

## Results
| Edit | File written | Diff against the original |
|---|---|---|
| About → Contact line | `src/data/about.json` | Exactly one line, the `contact` value. Indentation, key order and the final newline are unchanged. |
| Projects → Golfie → One line | `src/data/projects.json` | The edited line, plus the removal of empty `links: {}`, `did: []` and `tags: []`. The repo file was then normalised to that shape; the editor's output and the normalised file are byte-identical apart from the edit. |
| Poems → Adventure → Category | `src/content/poems/adventure.md` | The edited value, kept in double quotes. The first save also adds `draft: false`, `bilingual: false` and a final newline. The poem body is unchanged. |
| Poems → Adventure → Poem body (Markdown editor) | `src/content/poems/adventure.md` | The added words at the end of the last line; every other line of the body is unchanged. |

- **Page:** a site build from the edited `about.json` shows "Graduating August 2027. Test edit from the site editor." under Contact on `/about`. All other built pages are unchanged.
- **Validation:** a list saved as text (About → Opening paragraphs) fails the build with "Expected array, received string". The deploy would stop and the live site would keep its last good version.
- **Policy:** with the CSP on, loading, editing and saving blocked no script. The only blocked request was Sveltia's version check against unpkg.
- **Live:** https://pittsirv.github.io/admin/ loads, shows "Sign In with GitHub" and "Sign In Using Access Token", and blocks only that version check.

## What this test does not cover
- **The commit through the GitHub API.** Local mode writes files but does not commit, and a real commit needs a token, which is Mingxi's to create.
- **Expected behaviour with a token:**
  - One commit on `main`, authored as the token's owner, changing only the edited file, with the message `Edit pages “about” (site editor)`.
  - The push starts the Pages workflow, and the page updates when the deploy finishes: 35–45 seconds on recent runs, plus up to a few minutes of Pages caching.
  - This is confirmed on Mingxi's first real edit.
