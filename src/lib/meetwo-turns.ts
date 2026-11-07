// What the MeeTwo API accepts for an earlier turn: cites are ids (strings of at most 64 characters, at most 20).
export type Turn = { question: string; reply: string; cites: string[] };

const MAX_CITES = 20;
const MAX_ID = 64;

// The ask endpoint returns cites as { id, statement, node }; history sends back only the ids.
export function citeIds(cites: unknown): string[] {
  if (!Array.isArray(cites)) return [];
  const ids: string[] = [];
  for (const c of cites) {
    const id = typeof c === "string" ? c : typeof (c as { id?: unknown } | null)?.id === "string" ? (c as { id: string }).id : null;
    if (id && id.length <= MAX_ID) ids.push(id);
  }
  return ids.slice(0, MAX_CITES);
}

// A turn read from session storage (possibly saved by an older widget) or built from a reply; null when unusable.
export function toTurn(t: unknown): Turn | null {
  const x = t as { question?: unknown; reply?: unknown; cites?: unknown } | null;
  if (typeof x?.question !== "string" || typeof x?.reply !== "string") return null;
  return { question: x.question, reply: x.reply, cites: citeIds(x.cites) };
}
