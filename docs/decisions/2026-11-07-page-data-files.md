# Work, Personal and About text in data files (T-0032, step 1)

Goal: every piece of page text Mingxi may want to change lives in a data file, so a browser editor can change it without touching page code.

## Done
- `src/data/work.json`: intro line, experience, MeeTwo line, publications, education, skills, closing note.
- `src/data/personal.json`: intro line, Now (with its "Updated" month), interests, sports, poker terminology, closing note.
- `src/data/about.json`: opening paragraphs, interests, contact line, closing note.
- The pages read these files; wording is unchanged.

## Check
- Built HTML for /work, /personal and /about before and after is identical once whitespace is normalised (the Quotes section on /personal is excluded because it shuffles six quotes at each build).
- Full-page screenshots at 1280 and 375 px have the same heights on /work and /about; /personal differs only by the shuffled quotes. No horizontal scroll at 375 px.

## Small decisions (Claude)
- **Publications without a link omit the field** instead of storing `null`, so the editor shows an empty optional group rather than an invalid value. Rendering is the same.
- **The Dealer's Choice paragraph on /personal stays in the page.** It mixes live counts of variants and links into one sentence; splitting it into fields would change how it reads. Poker variants, poems, articles and quotes are already editable content collections.
- **Build-time validation.** `src/data/schemas.ts` checks each page file when the site builds. A wrong shape (for example a list saved as one string) fails the build with the field name, so the deploy stops and the live site keeps its last good version. Tested: setting About `opening` to a string fails with "Expected array, received string".
- **Review packages leave the repo.** `docs/reviews/` is removed (the files remain in git history); packages and reviews go to `~/.claude/router/reviews/`, as the repo rule says.
- The built CSS loses two unused utilities (`relative`, `bg-gray-50`) because Tailwind no longer scans the removed review files; no element uses them.

## Gemini review (single pass, middle tier): ship with fixes
- *Array fields crash on a wrong shape:* agree; fixed with build-time validation (above).
- *Omitting `link` may break a `=== null` check:* disagree; the template tests `pub.link &&`, and the built HTML is identical.
- *Use Zod schemas rather than raw JSON:* agree in substance; schemas added without moving the files into collections, so the editor reads plain JSON files.
- *Email, résumé path and external links stay in page code:* disagree for this step; they are addresses, not page text, and appear in several components. A site-wide links file is a possible follow-up.
- *Editor needs to know optional fields:* handled in the editor configuration (next step).
