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

```diff
diff --git a/docs/decisions/2026-11-07-meetwo-cite-ids.md b/docs/decisions/2026-11-07-meetwo-cite-ids.md
new file mode 100644
index 0000000..9ddd68a
--- /dev/null
+++ b/docs/decisions/2026-11-07-meetwo-cite-ids.md
@@ -0,0 +1,35 @@
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
+| A build-time script check (`scripts/check-meetwo-request.mjs`), run by `npm run build` | Worker | The site has no test runner; adding one for one helper is more than the ticket needs. The build already runs the CSP check the same way. |
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
index 0000000..acbcbf3
--- /dev/null
+++ b/scripts/check-meetwo-request.mjs
@@ -0,0 +1,23 @@
+// Fails the build when the MeeTwo widget would send history the API rejects: cites must be id strings
+// (at most 64 characters, at most 20). Covers replies with cite objects and turns saved by an older widget.
+// Usage: node scripts/check-meetwo-request.mjs
+import assert from 'node:assert/strict';
+import { citeIds, toTurn } from '../src/lib/meetwo-turns.ts';
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
index 3fd1d7b..14aac63 100644
--- a/src/components/MeeTwoChat.astro
+++ b/src/components/MeeTwoChat.astro
@@ -29,16 +29,16 @@ const handle = import.meta.env.PUBLIC_MEETWO_HANDLE || 'mingxi';
 )}
 
 <script>
+  import { citeIds, toTurn, type Turn } from "../lib/meetwo-turns";
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
diff --git a/src/lib/meetwo-turns.ts b/src/lib/meetwo-turns.ts
new file mode 100644
index 0000000..01c3e8d
--- /dev/null
+++ b/src/lib/meetwo-turns.ts
@@ -0,0 +1,23 @@
+// What the MeeTwo API accepts for an earlier turn: cites are ids (strings of at most 64 characters, at most 20).
+export type Turn = { question: string; reply: string; cites: string[] };
+
+const MAX_CITES = 20;
+const MAX_ID = 64;
+
+// The ask endpoint returns cites as { id, statement, node }; history sends back only the ids.
+export function citeIds(cites: unknown): string[] {
+  if (!Array.isArray(cites)) return [];
+  const ids: string[] = [];
+  for (const c of cites) {
+    const id = typeof c === "string" ? c : typeof (c as { id?: unknown } | null)?.id === "string" ? (c as { id: string }).id : null;
+    if (id && id.length <= MAX_ID) ids.push(id);
+  }
+  return ids.slice(0, MAX_CITES);
+}
+
+// A turn read from session storage (possibly saved by an older widget) or built from a reply; null when unusable.
+export function toTurn(t: unknown): Turn | null {
+  const x = t as { question?: unknown; reply?: unknown; cites?: unknown } | null;
+  if (typeof x?.question !== "string" || typeof x?.reply !== "string") return null;
+  return { question: x.question, reply: x.reply, cites: citeIds(x.cites) };
+}
```

Reviewer sees only this package.
