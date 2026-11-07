# MeeTwo widget: send earlier citations as ids (T-0041)

Date: 2026-11-07. Worker: T-0041.

## Intent

A second question to MeeTwo after any answer that cites the record failed with "Something went wrong". The widget now sends earlier citations back as ids only, which is what the MeeTwo API accepts, so a conversation keeps working past the first cited answer.

## What was wrong

The ask endpoint returns `cites` as objects (`{ id, statement, node }`). The widget saved them as they came and sent them back in `history`. The API's body rule wants each turn's `cites` as id strings (at most 64 characters, at most 20), so it answered 400 and the widget showed its fallback. Seen live on 2026-11-07: the API logged a 400 in under a millisecond for the message after a cited reply. The API rule has not changed since the hosted app started; the widget was wrong from the start.

## Decisions

| What | Who | Why |
|---|---|---|
| Fix on the client, leave the API alone | Router (T-0041) | The client broke the contract; a more tolerant API would need another production deploy. |
| Turns read back from session storage are normalised too, not only new ones | Worker | A visitor who already has a session saved by the old widget would otherwise keep failing until the tab is closed. |
| Ids that are not strings or are over 64 characters are dropped; at most 20 are kept | Worker | Same limits as the API, so the request is never rejected for its cites. |
| A build-time script check (`scripts/check-meetwo-request.mjs`), run by `npm run build` | Worker | The site has no test runner; adding one for one helper is more than the ticket needs. The build already runs the CSP check the same way. |

The widget still uses `fetch` and `textContent` only; the CSP is unchanged and the build's CSP check passes.

## Intuitions and rejected alternatives

- Dropping `cites` from history altogether: the API uses them, and the field is required.
- A test runner (Vitest): the only logic worth testing is the helper; a script check keeps the build the single gate.

## How to verify

Open https://pittsirv.github.io/meetwo/ and ask "What do you think about AI agents?" (an answer that cites the record), then ask two or three more questions without reloading. Each gets a reply; none shows "Something went wrong". The live check is recorded below.

## Revisit when

The API's history rule changes (for example to accept cite objects), or the widget starts sending anything else back from a reply.
