# MeeTwo page (T-0023)

## Intent
Give a visitor a dedicated space on the site to talk with Mingxi's MeeTwo as it exists today, with an entry point from the home page. MeeTwo itself does not change.

## Decisions
- Public name is "MeeTwo" everywhere on the site; "standin" stays the repo's name only. Router, 2026-11-06.
- Route `/meetwo`, home-page link "Ask MeeTwo", Work section renamed and linked. Router, 2026-11-06.
- The chat talks to the hosted API: `GET {base}/v1/health`, `POST {base}/v1/agents/{handle}/ask` with `question`, `history` (last 10 turns) and `conversationId`. Base is `PUBLIC_STANDIN_URL`; handle is `PUBLIC_MEETWO_HANDLE`, defaulting to `mingxi`. Router, 2026-11-06.
- Replies are plain text; the API's rate-limit (429) and paused-budget texts show as replies; any other error shows "Something went wrong. Please try again." Worker.
- On `/meetwo`, an unset address or a failed health check shows "MeeTwo is not available right now." The Work page embed stays hidden in that case. Worker.
- The build job gets `environment: github-pages` because the repository variable is scoped to that environment. Router, 2026-11-06.
- The old "kept for 90 days" privacy line is removed: it described the retired Worker, and the hosted API's retention is not documented in this repo. A correct line needs the MeeTwo session's wording.

## Intuitions and rejected alternatives
- Rejected: a floating bubble on every page.
- Citations from the API are held for the next request but never shown.

## How to verify
Open `/`: "Ask MeeTwo" in the intro links. Open `/meetwo`: with the variable set and the API healthy, type a question and get a reply; a follow-up keeps the conversation. With the variable unset or the API down, the page shows the fallback line.

## Revisit when
The retention line is supplied, or 2026-12-01.

## Independent review — 2026-11-06 (gpt-6-astra, high)
Full text kept outside the repo (`~/.claude/router/reviews/T-0023-review.md`).
- No timeout on health or ask → agree — 8 s on health, 45 s on ask; either failure shows the fallback or the error line.
- Paused budget with a non-2xx status → disagree — the Router states the API returns paused with a 200.
- Handle override not wired in the workflow → agree — `PUBLIC_MEETWO_HANDLE` is passed to the build; empty falls back to `mingxi`.
- `/work#projects` bookmarks → disagree — a static page cannot redirect fragments (as in T-0022).
- CORS and the real API contract → open — Mingxi set `WEB_ORIGIN` on Render; verified by their live test, not by this PR.
- Retention disclosure missing → agree, open: needs the MeeTwo session's accurate wording before the chat is public; merge held on this.
- Citations hidden → disagree — plain-text replies were Mingxi's earlier ruling (decision 124 in the MeeTwo repo).
- Automated tests, schema validation, immutable ids, `astro check` → deferred; same reasons as T-0022.
Verdict: ship with fixes. Action taken: timeout and handle fixes applied; the retention line is outstanding.
