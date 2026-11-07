# What's new

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
