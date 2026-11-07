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
- **Review packages leave the repo.** `docs/reviews/` is removed (the files remain in git history); packages and reviews go to `~/.claude/router/reviews/`, as the repo rule says.
