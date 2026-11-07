// Fails the build when the MeeTwo widget would send history the API rejects: cites must be id strings
// (at most 64 characters, at most 20). Covers replies with cite objects and turns saved by an older widget.
// Usage: node scripts/check-meetwo-request.mjs
import assert from 'node:assert/strict';
import { citeIds, toTurn } from '../src/lib/meetwo-turns.ts';

const reply = { text: 'I built a chess agent.', cites: [{ id: 'm-1', statement: 'I built a chess agent in the AI agent course.', node: 'Work' }, { id: 'm-2', statement: 'x', node: 'Work' }] };
assert.deepEqual(citeIds(reply.cites), ['m-1', 'm-2']);
assert.deepEqual(citeIds(['m-3']), ['m-3']);
assert.deepEqual(citeIds(undefined), []);
assert.deepEqual(citeIds([null, 7, { id: 9 }, { id: 'x'.repeat(65) }]), []);
assert.equal(citeIds(Array.from({ length: 30 }, (_, i) => ({ id: `m-${i}` }))).length, 20);

const stored = toTurn({ question: 'What do you think about AI agents?', reply: reply.text, cites: reply.cites });
assert.deepEqual(stored, { question: 'What do you think about AI agents?', reply: reply.text, cites: ['m-1', 'm-2'] });
assert.equal(toTurn({ question: 'q' }), null);

// The body the widget sends, against the API's history rule.
const body = JSON.parse(JSON.stringify({ question: 'And what are you working on?', history: [stored], conversationId: null }));
for (const t of body.history) {
  assert.ok(Array.isArray(t.cites) && t.cites.length <= 20 && t.cites.every((c) => typeof c === 'string' && c.length <= 64));
}
console.log('MeeTwo request shape: ok');
