# Project intuitions (T-0031 part B)

## Intent
Show, on each project's card, a short paragraph on the intuition behind building it. Mingxi, 2026-11-07 (via Router). Held for Mingxi's review before merge.

## Decisions
- New optional field `intuition` in `src/data/projects.json`; rendered under the one line, labelled "Intuition", for public entries only; absent means nothing renders.
- Paragraphs are Mingxi's own text with grammar and wording fixes only (Mingxi, 2026-11-07: "just refine my grammar or wording but keep my idea and most words"), so the voice is personal and conversational, overriding the formal-writing default. Filled: MeeTwo, Dealer's Choice, Table Forty Nine. Brawl Lab, Golfie, Daybook and Agent Workspace get no paragraph. Agent Relay's earlier draft is left out until Mingxi confirms it. Ambiguous phrases take the reading closest to the words and are flagged on the review page ("garbage change" as "garbage exchange", "my minds" as "my mind").
- Wording stays first person and plain, with no stack and no names.

## Intuitions and rejected alternatives
- Rejected: filling the others from READMEs and goals, which state what a project does, not why Mingxi builds it. Rejected: my first MeeTwo draft from a joint application; replaced by Mingxi's own text.

## How to verify
Open `/projects`: MeeTwo, Table Forty Nine and Dealer's Choice cards show an "Intuition" paragraph; every other card is unchanged.

## Revisit when
Mingxi answers the open questions, or edits the two drafts.
