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
| A build-time script check (`scripts/check-meetwo-request.mjs`), run by `npm run build` | Worker | The site has no test runner; adding one for one helper is more than the ticket needs. The build already runs the CSP check the same way. The helper is plain JavaScript (`src/lib/meetwo-turns.mjs`, like `src/csp.mjs`) because the deploy builds on Node 20, which cannot import TypeScript. |

The widget still uses `fetch` and `textContent` only; the CSP is unchanged and the build's CSP check passes.

## Intuitions and rejected alternatives

- Dropping `cites` from history altogether: the API uses them, and the field is required.
- A test runner (Vitest): the only logic worth testing is the helper; a script check keeps the build the single gate.

## How to verify

Open https://pittsirv.github.io/meetwo/ and ask "What do you think about AI agents?" (an answer that cites the record), then ask two or three more questions without reloading. Each gets a reply; none shows "Something went wrong". The live check is recorded below.

## Revisit when

The API's history rule changes (for example to accept cite objects), or the widget starts sending anything else back from a reply.

## Independent review — 2026-11-07 (gemini-3.1-pro-preview, single pass)

Full text: `docs/reviews/2026-11-07-meetwo-cite-ids.review.md`.

- "The `npm run build` command will fail because standard Node.js throws an error when natively executing a script that imports a TypeScript file" → agree: the deploy workflow uses Node 20. The helper is now plain JavaScript (`src/lib/meetwo-turns.mjs`), and the check passes under Node 20 (`npx node@20 scripts/check-meetwo-request.mjs`) as well as in the full build.
- "Empty strings are silently stripped from citation arrays due to a truthiness check" → agree that it was implicit; now an explicit `id.length > 0` rule. The API never issues an empty id.
- "Does sending an empty `cites` array genuinely resolve the 400 error, or does it trigger a missing-field error?" → done: the API's rule is an array of at most 20 strings, and an empty array satisfies it (turns with no citations already send `[]`).
- Use Vitest instead of a build script → disagree, reason in Decisions.
- Documentation gap on Node and TypeScript → resolved by the change to plain JavaScript; nothing extra to document.

Verdict: do not ship (build break). Action taken: helper converted to plain JavaScript and checked under Node 20; the review was re-run on the fixed diff (below).

## Independent review, second pass — 2026-11-07 (gemini-3.1-pro-preview)

Full text: `docs/reviews/2026-11-07-meetwo-cite-ids.review2.md`. Verdict: ship.

- Dropping ids over 64 characters or beyond 20 could lose context → disagree as a risk: these are the API's own input limits, so sending more is always a 400; the API's cite ids are memory ids far shorter than 64, and dropping one only narrows what the next turn is told was cited.
- Use `node --test` instead of a bare assert script → disagree for now: one check, run by the build like `check-csp.mjs`; worth switching if more client checks appear.
