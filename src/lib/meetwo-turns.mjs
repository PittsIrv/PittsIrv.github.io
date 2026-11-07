// What the MeeTwo API accepts for an earlier turn: cites are ids (strings of at most 64 characters, at most 20).
// Plain JavaScript so the build's Node can import it in scripts/check-meetwo-request.mjs.

/** @typedef {{ question: string; reply: string; cites: string[] }} Turn */

const MAX_CITES = 20;
const MAX_ID = 64;

/**
 * The ask endpoint returns cites as { id, statement, node }; history sends back only the ids.
 * @param {unknown} cites
 * @returns {string[]}
 */
export function citeIds(cites) {
  if (!Array.isArray(cites)) return [];
  const ids = [];
  for (const c of cites) {
    const id = typeof c === 'string' ? c : typeof c?.id === 'string' ? c.id : null;
    if (id !== null && id.length > 0 && id.length <= MAX_ID) ids.push(id);
  }
  return ids.slice(0, MAX_CITES);
}

/**
 * A turn read from session storage (possibly saved by an older widget) or built from a reply; null when unusable.
 * @param {unknown} t
 * @returns {Turn | null}
 */
export function toTurn(t) {
  const x = /** @type {{ question?: unknown; reply?: unknown; cites?: unknown } | null} */ (t);
  if (typeof x?.question !== 'string' || typeof x?.reply !== 'string') return null;
  return { question: x.question, reply: x.reply, cites: citeIds(x.cites) };
}
