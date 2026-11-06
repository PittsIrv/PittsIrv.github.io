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
