# Projects gallery

Source: `src/data/projects.json`. Page: `/projects` (`src/pages/projects.astro`). The home page links to it.

## Entry fields

`name`, `oneLine`, `status`, `period` (`start`, `end`: `YYYY-MM`, `now`, or `unknown`), `did` (2–4 public-safe bullets), `links` (`site`, `repo`, `paper`, `page` for a path on this site such as `/personal/poker`, opened in the same tab; `repo` only if `gh repo view --json visibility` says PUBLIC), optional `comingSoon` (a link label shown as "<label>: coming soon"), `tags`, `visibility`, optional `intuition` (shown as "Thoughts"; Mingxi's own text, grammar fixed only; absent when Mingxi has not written one).

## Status vocabulary

- `active`: being worked on now.
- `shipped`: released; maintained only as needed.
- `paused`: deliberately not worked on.
- `archived`: finished or abandoned.

Cards group by status in that order (active, shipped, paused, archived).

## Visibility

- `public`: rendered on the page.
- `title`: rendered as name, status pill and `oneLine` only; no dates, bullets, links or tags. `oneLine` must be neutral (no findings, numbers or names).
- `hold`: never in this repo. The repository is public, so held projects (research, coursework, anything not confirmed public) live only in the Router's private inventory, `~/.claude/router/site-inventory-private.json`, same schema. Review packages for this repo are kept outside it too (`~/.claude/router/reviews/`).

Moving an entry from the private inventory to this file as `title`, or from `title` to `public`, needs Mingxi's approval.

## Update procedure

1. Edit `src/data/projects.json`.
2. Run `npm run build`; it must pass.
3. Ship on a feature branch via PR (see the `ship` skill).

## Approval rule

Ship without asking: status changes, period changes, edits to an already-approved blurb (`oneLine`, `did`, `tags`, `links`).

Ask Mingxi first: a new project, a new blurb, any entry added from the private inventory, or any change from `title` to `public`.

The build fails on an unknown `status`, `visibility` or `period` value. Each card has an anchor (`/projects#<slug of name>`).
