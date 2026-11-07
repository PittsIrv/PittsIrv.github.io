# Projects text list (T-0031 part A)

## Intent
Add a text-only version of the projects: one project, one line, one link, above the existing cards. Mingxi, 2026-11-07 (via Router).

## Decisions
- List sits above the cards; the cards stay. Layout is the Worker's call: a plain list reads at 375px without a toggle's state to remember.
- Only `visibility: public` entries; `title` and `hold` entries render nothing in the list (`title` entries keep their card).
- Link per entry: live site, else public repository, else the entry's own card (`#slug`, labelled Details). MeeTwo and Table Forty Nine have no public link, so they point to their cards; private repositories are never linked.
- Order follows the status order (active first), then file order.

## Intuitions and rejected alternatives
- Rejected: a Cards/List toggle (extra state, JS, hidden content).

## How to verify
Open `/projects` at desktop and 375px: the list above the cards, each row with one link; the Golfie link goes to its site, Daybook to its repository, MeeTwo to its card.

## Revisit when
An entry gains a public link (the row then uses it), or 2026-12-01.
