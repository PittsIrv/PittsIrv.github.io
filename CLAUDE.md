# CLAUDE.md

Personal website for Mingxi Yan. Astro + Tailwind CSS + TypeScript, deployed to GitHub Pages via GitHub Actions on push to `main`.

## Commands

- `npm run dev` — dev server at localhost:4321
- `npm run build` — production build to `./dist/` (must pass before committing)

## Content

All content lives in `src/content/` collections (poems, articles, quotes, projects, poker-games); schemas in `src/content/config.ts`. Pages are in `src/pages/`, shared layout in `src/layouts/Layout.astro`.

## Implementation workflow

Mingxi owns the design; Claude implements directly (the earlier Codex-as-worker workflow is retired). Claude reviews its own diff against the spec and voice principles and runs `npm run build` before committing.

**Commits:** Mingxi is the author. Every commit Claude makes ends with a `Co-Authored-By: Claude …` trailer. Never make Claude the author.

Active design spec: `docs/superpowers/specs/2026-09-08-professional-restructure-design.md` (supersedes the 2026-07-17 editorial redesign spec).
