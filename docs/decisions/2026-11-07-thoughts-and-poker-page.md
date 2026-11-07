# "Thoughts" label and a page of its own for Dealer's Choice (T-0042)

Date: 2026-11-07. Worker: T-0042.

## Intent

Mingxi (2026-11-07): "The "intuition" should be renamed as "Thoughts"; Dealer's Choice on my personal page is taking too much space, or it should be at the wrong place?" The project cards now say "Thoughts", and the poker rulebook moves to its own page so /personal leads with Mingxi's own writing.

## Decisions

| What | Who | Why |
|---|---|---|
| Rename the visible label "Intuition" to "Thoughts" on /projects and in the /admin editor | Mingxi | Their words above. |
| Keep the data key `intuition` | Worker | Renaming the key would mean migrating every project entry; readers and the editor only ever see the label. |
| Move the full rulebook (12 variants and the terminology) unchanged to /personal/poker; keep a one-paragraph Poker block on /personal | Router (as manager; Mingxi can reverse) | Measured live at 1280 px: the Poker section was 1214 px of a 3991 px page, the largest section, placed second, ahead of the writing. |
| Order on /personal: Now, Writing, Poker, Quotes, Elsewhere; nav and subtitle follow | Router | Same reason. The subtitle in `personal.json` now lists the sections in page order. |
| Old `/personal#game-…` links forward to `/personal/poker#game-…` | Worker | The CSP record names `/personal#game-auction` as a working link; it should keep working. |
| A new optional project link `page` (a path on this site, same tab, no ↗), used by Dealer's Choice for /personal/poker, labelled "More on this site" | Worker | The links object only allowed outside links; this is the general form, editable in /admin. |

The poker variants collection (`src/content/poker-games`) and the terminology in `personal.json` are untouched, so the editor needs no change for them.

## Intuitions and rejected alternatives

- Collapsing the whole Poker section into one closed expander on /personal: still loads the full rulebook on a page about Mingxi, and hides it from the nav.
- Moving Poker to the end of /personal without a new page: the page stays 1200 px longer than it needs to be.

## How to verify

Open https://pittsirv.github.io/projects: project cards say "Thoughts" where they said "Intuition"; Dealer's Choice has a "More on this site" link to /personal/poker. Open /personal: Now, Writing, then a short Dealer's Choice paragraph with "Play online", "All 12 variants" and "Project details". Click "All 12 variants": every variant opens and closes, and the terminology is at the bottom. Open /personal#game-auction: it lands on /personal/poker with Auction open. In /admin, a project's field reads "Thoughts".

## Revisit when

Mingxi adds more poker content (for example hand write-ups), or wants Poker back on /personal.
