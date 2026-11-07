# Project intuitions (T-0031 part B)

## Intent
Show, on each project's card, a short paragraph on the intuition behind building it. Mingxi, 2026-11-07 (via Router). Held for Mingxi's review before merge.

## Decisions
- New optional field `intuition` in `src/data/projects.json`; rendered under the one line, labelled "Intuition", for entries the page shows (`public` and `title`); absent means nothing renders. `hold` entries never reach this repo.
- Paragraphs are Mingxi's own text with grammar and wording fixes only (Mingxi, 2026-11-07: "just refine my grammar or wording but keep my idea and most words"), so the voice is personal and conversational, overriding the formal-writing default. Filled: MeeTwo, Dealer's Choice, Table Forty Nine, Brawl Lab, Agent Relay (Mingxi wrote "Agent Overlay"; read as Agent Relay, flagged) and Agent Workspace, whose text ends mid-sentence ("Send email to") and is kept exactly as written for Mingxi to finish. Golfie and Daybook get no paragraph. The Agent Workspace entry is `title`-level, so `intuition` now renders for `title` entries too; its card keeps the "coming soon" status and no repo link. Ambiguous phrases take the reading closest to the words and are flagged on the review page ("garbage change" as "garbage exchange", "my minds" as "my mind").
- Wording stays first person and plain, with no stack and no names.

## Intuitions and rejected alternatives
- Rejected: filling the others from READMEs and goals, which state what a project does, not why Mingxi builds it. Rejected: my first MeeTwo draft from a joint application; replaced by Mingxi's own text.

## How to verify
Open `/projects`: MeeTwo, Table Forty Nine, Dealer's Choice, Brawl Lab, Agent Relay and Agent Workspace cards show an "Intuition" paragraph; every other card is unchanged.

## Revisit when
Mingxi answers the open questions, or edits the two drafts.

## Final wording — 2026-11-07
- Mingxi approved the set: "you should use as much my language as possible, just fix what my grammar or where it sounds weird." Style-only edits were undone (for example "a question of", "I want to show everyone", "the poker rules", "an escape"); colloquial fragments such as "How to avoid garbage exchange then?" and "Want to show everyone!" stay as written.
- "Agent Overlay" is Agent Relay (Router, relaying Mingxi).
- Removal Mingxi can restore: the unfinished words "Send email to" at the end of the Agent Workspace text are dropped, because a dangling fragment sounds weird; nothing replaces them. To restore, append " Send email to" to that entry's `intuition` in `src/data/projects.json`.
- Golfie and Daybook have no paragraph.

## Independent review — 2026-11-07 (gemini-3.1-pro-preview, single pass)
Full text outside the repo (`~/.claude/router/reviews/T-0031B-review.md`).
- Intuition renders without a visibility guard → agree on the wording, no code change — the page already filters to `public` and `title` before rendering and `hold` entries are never in the repo; the decision text said "public only" and is corrected above.
- `--ink` may be undefined → disagree — the fallback `inherit` is the intended colour.
- Dropping "Send email to" assumes a mistake → disagree — Mingxi's own ruling via the Router, recorded and restorable.
- Move prose out of JSON to content collections → disagree — one data file is the gallery's design; revisit if formatting is needed.
- Public-only rule versus Agent Workspace → already done — Mingxi asked for it on that entry; rule corrected above.
- No schema types → disagree — the file has no schema by design; fields are documented in `docs/projects-gallery.md`.
Verdict: ship with fixes. Action taken: decision text corrected.
