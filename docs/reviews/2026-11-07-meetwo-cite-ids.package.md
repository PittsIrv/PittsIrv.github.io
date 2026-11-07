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

28:          node-version: 20
```diff
diff --git a/docs/decisions/2026-11-07-meetwo-cite-ids.md b/docs/decisions/2026-11-07-meetwo-cite-ids.md
new file mode 100644
index 0000000..116540a
--- /dev/null
+++ b/docs/decisions/2026-11-07-meetwo-cite-ids.md
@@ -0,0 +1,47 @@
+# MeeTwo widget: send earlier citations as ids (T-0041)
+
+Date: 2026-11-07. Worker: T-0041.
+
+## Intent
+
+A second question to MeeTwo after any answer that cites the record failed with "Something went wrong". The widget now sends earlier citations back as ids only, which is what the MeeTwo API accepts, so a conversation keeps working past the first cited answer.
+
+## What was wrong
+
+The ask endpoint returns `cites` as objects (`{ id, statement, node }`). The widget saved them as they came and sent them back in `history`. The API's body rule wants each turn's `cites` as id strings (at most 64 characters, at most 20), so it answered 400 and the widget showed its fallback. Seen live on 2026-11-07: the API logged a 400 in under a millisecond for the message after a cited reply. The API rule has not changed since the hosted app started; the widget was wrong from the start.
+
+## Decisions
+
+| What | Who | Why |
+|---|---|---|
+| Fix on the client, leave the API alone | Router (T-0041) | The client broke the contract; a more tolerant API would need another production deploy. |
+| Turns read back from session storage are normalised too, not only new ones | Worker | A visitor who already has a session saved by the old widget would otherwise keep failing until the tab is closed. |
+| Ids that are not strings or are over 64 characters are dropped; at most 20 are kept | Worker | Same limits as the API, so the request is never rejected for its cites. |
+| A build-time script check (`scripts/check-meetwo-request.mjs`), run by `npm run build` | Worker | The site has no test runner; adding one for one helper is more than the ticket needs. The build already runs the CSP check the same way. The helper is plain JavaScript (`src/lib/meetwo-turns.mjs`, like `src/csp.mjs`) because the deploy builds on Node 20, which cannot import TypeScript. |
+
+The widget still uses `fetch` and `textContent` only; the CSP is unchanged and the build's CSP check passes.
+
+## Intuitions and rejected alternatives
+
+- Dropping `cites` from history altogether: the API uses them, and the field is required.
+- A test runner (Vitest): the only logic worth testing is the helper; a script check keeps the build the single gate.
+
+## How to verify
+
+Open https://pittsirv.github.io/meetwo/ and ask "What do you think about AI agents?" (an answer that cites the record), then ask two or three more questions without reloading. Each gets a reply; none shows "Something went wrong". The live check is recorded below.
+
+## Revisit when
+
+The API's history rule changes (for example to accept cite objects), or the widget starts sending anything else back from a reply.
+
+## Independent review — 2026-11-07 (gemini-3.1-pro-preview, single pass)
+
+Full text: `docs/reviews/2026-11-07-meetwo-cite-ids.review.md`.
+
+- "The `npm run build` command will fail because standard Node.js throws an error when natively executing a script that imports a TypeScript file" → agree: the deploy workflow uses Node 20. The helper is now plain JavaScript (`src/lib/meetwo-turns.mjs`), and the check passes under Node 20 (`npx node@20 scripts/check-meetwo-request.mjs`) as well as in the full build.
+- "Empty strings are silently stripped from citation arrays due to a truthiness check" → agree that it was implicit; now an explicit `id.length > 0` rule. The API never issues an empty id.
+- "Does sending an empty `cites` array genuinely resolve the 400 error, or does it trigger a missing-field error?" → done: the API's rule is an array of at most 20 strings, and an empty array satisfies it (turns with no citations already send `[]`).
+- Use Vitest instead of a build script → disagree, reason in Decisions.
+- Documentation gap on Node and TypeScript → resolved by the change to plain JavaScript; nothing extra to document.
+
+Verdict: do not ship (build break). Action taken: helper converted to plain JavaScript and checked under Node 20; the review was re-run on the fixed diff (below).
diff --git a/docs/whats-new.md b/docs/whats-new.md
index 7d21641..bb4419e 100644
--- a/docs/whats-new.md
+++ b/docs/whats-new.md
@@ -1,5 +1,9 @@
 # What's new
 
+## 2026-11-07 · MeeTwo keeps answering after the first question
+Try: on /meetwo ask "What do you think about AI agents?", then keep asking without reloading.
+You get: every follow-up gets a reply; before, any question after an answer drawn from your record showed "Something went wrong".
+
 ## 2026-11-07 · The site only runs its own code
 Try: open any page with the browser console open; ask MeeTwo a question.
 You get: every page refuses scripts from other sites, which protects the site-editor sign-in; nothing visible changes, and MeeTwo works as before.
diff --git a/package.json b/package.json
index 7321c32..1e3caef 100644
--- a/package.json
+++ b/package.json
@@ -4,7 +4,7 @@
   "version": "0.0.1",
   "scripts": {
     "dev": "node scripts/copy-cms.mjs && astro dev",
-    "build": "node scripts/copy-cms.mjs && astro build && node scripts/check-csp.mjs",
+    "build": "node scripts/copy-cms.mjs && astro build && node scripts/check-csp.mjs && node scripts/check-meetwo-request.mjs",
     "preview": "astro preview",
     "astro": "astro"
   },
diff --git a/scripts/check-meetwo-request.mjs b/scripts/check-meetwo-request.mjs
new file mode 100644
index 0000000..b11fe29
--- /dev/null
+++ b/scripts/check-meetwo-request.mjs
@@ -0,0 +1,23 @@
+// Fails the build when the MeeTwo widget would send history the API rejects: cites must be id strings
+// (at most 64 characters, at most 20). Covers replies with cite objects and turns saved by an older widget.
+// Usage: node scripts/check-meetwo-request.mjs
+import assert from 'node:assert/strict';
+import { citeIds, toTurn } from '../src/lib/meetwo-turns.mjs';
+
+const reply = { text: 'I built a chess agent.', cites: [{ id: 'm-1', statement: 'I built a chess agent in the AI agent course.', node: 'Work' }, { id: 'm-2', statement: 'x', node: 'Work' }] };
+assert.deepEqual(citeIds(reply.cites), ['m-1', 'm-2']);
+assert.deepEqual(citeIds(['m-3']), ['m-3']);
+assert.deepEqual(citeIds(undefined), []);
+assert.deepEqual(citeIds([null, 7, { id: 9 }, { id: 'x'.repeat(65) }]), []);
+assert.equal(citeIds(Array.from({ length: 30 }, (_, i) => ({ id: `m-${i}` }))).length, 20);
+
+const stored = toTurn({ question: 'What do you think about AI agents?', reply: reply.text, cites: reply.cites });
+assert.deepEqual(stored, { question: 'What do you think about AI agents?', reply: reply.text, cites: ['m-1', 'm-2'] });
+assert.equal(toTurn({ question: 'q' }), null);
+
+// The body the widget sends, against the API's history rule.
+const body = JSON.parse(JSON.stringify({ question: 'And what are you working on?', history: [stored], conversationId: null }));
+for (const t of body.history) {
+  assert.ok(Array.isArray(t.cites) && t.cites.length <= 20 && t.cites.every((c) => typeof c === 'string' && c.length <= 64));
+}
+console.log('MeeTwo request shape: ok');
diff --git a/src/components/MeeTwoChat.astro b/src/components/MeeTwoChat.astro
index 3fd1d7b..81ae435 100644
--- a/src/components/MeeTwoChat.astro
+++ b/src/components/MeeTwoChat.astro
@@ -29,16 +29,16 @@ const handle = import.meta.env.PUBLIC_MEETWO_HANDLE || 'mingxi';
 )}
 
 <script>
+  import { citeIds, toTurn, type Turn } from "../lib/meetwo-turns.mjs";
   const FAILED = "Something went wrong. Please try again.";
   const MAX_HISTORY = 10;
-  type Turn = { question: string; reply: string; cites: unknown[] };
   type Saved = { history: Turn[]; conversationId: string | null };
   const KEY = "meetwo:v1";
   const load = (): Saved => {
     try {
       const s = JSON.parse(sessionStorage.getItem(KEY) ?? "");
       if (Array.isArray(s?.history)) {
-        const history = s.history.filter((t: Turn) => typeof t?.question === "string" && typeof t?.reply === "string");
+        const history = s.history.map(toTurn).filter((t: Turn | null): t is Turn => t !== null);
         return { history, conversationId: typeof s.conversationId === "string" ? s.conversationId : null };
       }
     } catch {}
@@ -113,7 +113,7 @@ const handle = import.meta.env.PUBLIC_MEETWO_HANDLE || 'mingxi';
         if (r.ok && typeof body.text === "string") {
           reply.textContent = body.text;
           conversationId = body.conversationId ?? conversationId;
-          history.push({ question, reply: body.text, cites: body.cites ?? [] });
+          history.push({ question, reply: body.text, cites: citeIds(body.cites) });
           save({ history: history.slice(-MAX_HISTORY), conversationId });
         } else {
           reply.textContent = r.status === 429 ? (body.text ?? body.error ?? FAILED) : FAILED;
diff --git a/src/lib/meetwo-turns.mjs b/src/lib/meetwo-turns.mjs
new file mode 100644
index 0000000..4978c05
--- /dev/null
+++ b/src/lib/meetwo-turns.mjs
@@ -0,0 +1,33 @@
+// What the MeeTwo API accepts for an earlier turn: cites are ids (strings of at most 64 characters, at most 20).
+// Plain JavaScript so the build's Node can import it in scripts/check-meetwo-request.mjs.
+
+/** @typedef {{ question: string; reply: string; cites: string[] }} Turn */
+
+const MAX_CITES = 20;
+const MAX_ID = 64;
+
+/**
+ * The ask endpoint returns cites as { id, statement, node }; history sends back only the ids.
+ * @param {unknown} cites
+ * @returns {string[]}
+ */
+export function citeIds(cites) {
+  if (!Array.isArray(cites)) return [];
+  const ids = [];
+  for (const c of cites) {
+    const id = typeof c === 'string' ? c : typeof c?.id === 'string' ? c.id : null;
+    if (id !== null && id.length > 0 && id.length <= MAX_ID) ids.push(id);
+  }
+  return ids.slice(0, MAX_CITES);
+}
+
+/**
+ * A turn read from session storage (possibly saved by an older widget) or built from a reply; null when unusable.
+ * @param {unknown} t
+ * @returns {Turn | null}
+ */
+export function toTurn(t) {
+  const x = /** @type {{ question?: unknown; reply?: unknown; cites?: unknown } | null} */ (t);
+  if (typeof x?.question !== 'string' || typeof x?.reply !== 'string') return null;
+  return { question: x.question, reply: x.reply, cites: citeIds(x.cites) };
+}
```

Reviewer sees only this package.
