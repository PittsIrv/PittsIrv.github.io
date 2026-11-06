# What's new

## 2026-11-06 · Ask MeeTwo on the site
Try: open `/meetwo` on the site and ask a question.
You get: a page where visitors talk with MeeTwo, linked from the home page and the Work page; if MeeTwo is unreachable the page says so instead of showing a broken box.

## 2026-11-06 · Projects gallery
Try: open `/projects` on the site (or run `npm run build && npm run preview`).
You get: every side project on one page, grouped by status with active first, driven by one file (`src/data/projects.json`) that the Router updates; the home page now points to it and the old three tiles are gone.
