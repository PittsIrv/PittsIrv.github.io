# What's new

## 2026-11-07 · Follow your writing, and keep reading
Try: open /poems/adventure and click "Next"; open /articles/monologue; add /rss.xml to a feed reader.
You get: previous and next links at the end of every poem and article, an RSS and an Atom feed that pick up new poems and articles by themselves, an "RSS" link in every footer, and a reading time worked out from the article's text (Monologue now reads 6 min, not the 8 min you typed).

## 2026-11-07 · Link previews and accessibility fixes on every page
Try: paste your site's link, or /personal/poker, into a chat app or a social post; open /personal and check the faint grey text.
You get: a large preview card in the site's own look instead of a plain link; the faint grey on /personal is now readable; the poker page's headings follow a proper order. Every page scores 100 on Lighthouse and has no axe violations.

## 2026-11-07 · Thoughts on projects, and poker rules on their own page
Try: open /projects, then /personal, then click "All 12 variants".
You get: project cards say "Thoughts"; /personal is about 1,000 px shorter and leads with your writing; every variant and the terminology live at /personal/poker, and old variant links still land there.

## 2026-11-07 · MeeTwo keeps answering after the first question
Try: on /meetwo ask "What do you think about AI agents?", then keep asking without reloading.
You get: every follow-up gets a reply; before, any question after an answer drawn from your record showed "Something went wrong".

## 2026-11-07 · The site only runs its own code
Try: open any page with the browser console open; ask MeeTwo a question.
You get: every page refuses scripts from other sites, which protects the site-editor sign-in; nothing visible changes, and MeeTwo works as before.

## 2026-11-07 · Edit the site from the browser
Try: create a GitHub token (90 days, this repository only, Contents read and write), open /admin, choose "Sign In Using Access Token", change a line and click Save.
You get: the change live on the site in about a minute, with no terminal. Covers the Home, Work, Personal and About text, Projects, poems, prose, quotes and poker variants.

## 2026-11-07 · Work, Personal and About match the new look
Try: open /work, /personal, /about and any poem.
You get: plain serif section headings instead of small spaced capitals, no alternating tinted bands, a "Contact" heading on About, and a quiet "All writing" link at the end of each poem and article.

## 2026-11-07 · A clearer home page
Try: open the home page.
You get: your name and affiliation at a normal size with four links, a "Currently" panel, three selected-work entries with their results visible, and three active projects with their stack, each one click from its full entry.

## 2026-11-07 · Projects, easier to scan
Try: open `/projects`; read one project left to right, then tap a name in the list at the top on a phone.
You get: each project as one row, what it is, what was built and its stack on the left, the Intuition beside it; no more empty gaps between cards; the list at the top jumps to each project.

## 2026-11-07 · Projects in the menu; MeeTwo out of the way
Try: open any page; the top menu now reads Projects, Work, Personal, About. Scroll a long page such as Work.
You get: Projects one click from everywhere, plainer section labels, and an "Ask MeeTwo" button that no longer sits on top of text: in the right margin on a laptop, in the top bar on a phone.

## 2026-11-07 · Why I built it
Try: open `/projects` and read the Intuition paragraph on the MeeTwo, Agent Relay, Agent Workspace, Brawl Lab, Dealer's Choice and Table Forty Nine cards.
You get: your own reasons for each project, in your words with grammar fixed, shown on the cards.

## 2026-11-07 · Projects at a glance
Try: open `/projects`; the list above the cards.
You get: one line per public project (name, its one line, one link), readable on a phone; the full cards stay below.

## 2026-11-06 · MeeTwo on every page
Try: open any page on the site and click "Ask MeeTwo" in the bottom-right corner; ask something, then go to another page.
You get: a small floating MeeTwo that opens the chat in place, closes back to a button, and keeps the conversation while you move between pages. Golfie is now Active, the Agent Relay project and a coming-soon Agent Workspace entry are on the gallery, Brawl Lab links its repository, and the "seeking full-time roles" and "NLP lead" wording is gone.

## 2026-11-06 · Ask MeeTwo on the site
Try: open `/meetwo` on the site and ask a question.
You get: a page where visitors talk with MeeTwo, linked from the home page and the Work page; if MeeTwo is unreachable the page says so instead of showing a broken box.

## 2026-11-06 · Projects gallery
Try: open `/projects` on the site (or run `npm run build && npm run preview`).
You get: every side project on one page, grouped by status with active first, driven by one file (`src/data/projects.json`) that the Router updates; the home page now points to it and the old three tiles are gone.
