# /projects: facts and Intuition side by side (T-0035, PR 2 of 4)

## Intent
Rebuild /projects in direction B (Router's pick, 2026-11-07): each project is one full-width row with its facts on the left and Mingxi's Intuition beside them, so both are fully visible and the two-column card grid's empty gaps go away. Content still comes only from `src/data/projects.json`.

## Decisions
- **One row per project, not a card grid** (Router, direction B). Wide screens: facts 7 parts, Intuition 5 parts. Below 768 px the Intuition follows the facts.
- **Order inside the facts** (Claude, small): one line, "what I did" bullets, then stack tags and links on one line. The tags are larger (13 px on a tinted chip, was 12 px grey text).
- **Intuition in a tinted panel with a small "Intuition" label** (Router, direction B). Text unchanged.
- **Status pill removed from each entry** (Claude, small). The group heading (Active, Shipped) already says it.
- **The one-line list at the top stays** (Claude; Router asked for the reason to be recorded). On a phone each row is 600–1000 px tall, so the list is the only place a visitor sees all projects in one screen. To make it an index rather than a duplicate, each name now jumps to its row, and the right-hand link shows only when there is a live site or public repository (the old "Details ↓" fallback is gone).
- **Group headings** in the serif at 1.75 rem, sentence case, instead of tracked capitals.

## Intuitions and rejected alternatives
- Dropping the list was considered; it would leave a phone reader scrolling about seven screens to see what exists.
- Putting the Intuition first was rejected: reviewers scan for what was built first; the panel keeps Mingxi's words visible without pushing the bullets down.

## How to verify
- Open /projects at a laptop width: each project is a row; the left column reads one line, bullets, tags and links; the Intuition sits in a light blue panel on the right. Golfie and Daybook (no Intuition) have no panel.
- On a phone: the panel follows the facts; tap a name in the list at the top and the page jumps to that project.

## Revisit when
A project gets more than about five bullets or an image, which would unbalance the two columns.
