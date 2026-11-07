# Project intuitions (T-0031 part B)

## Intent
Show, on each project's card, a short paragraph on the intuition behind building it. Mingxi, 2026-11-07 (via Router). Held for Mingxi's review before merge.

## Decisions
- New optional field `intuition` in `src/data/projects.json`; rendered under the one line, labelled "Intuition", for public entries only; absent means nothing renders.
- Only projects whose motivation is stated in Mingxi's own material are filled: MeeTwo (the application's answer to why the idea was picked) and Agent Relay (the scenario recorded as the original problem). The rest stay empty and are questions for Mingxi; nothing is inferred.
- Wording stays first person and plain, with no stack and no names.

## Intuitions and rejected alternatives
- Rejected: filling the other five from READMEs and goals, which state what each project does or aims at, not why Mingxi builds it.

## How to verify
Open `/projects`: MeeTwo and Agent Relay cards show an "Intuition" paragraph; every other card is unchanged.

## Revisit when
Mingxi answers the open questions, or edits the two drafts.
