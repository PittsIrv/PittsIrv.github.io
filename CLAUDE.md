# CLAUDE.md

Personal website for Mingxi Yan. Astro + Tailwind CSS + TypeScript, deployed to GitHub Pages via GitHub Actions on push to `main`.

## Commands

- `npm run dev` — dev server at localhost:4321
- `npm run build` — production build to `./dist/` (must pass before committing)

## Content

All content lives in `src/content/` collections (poems, articles, quotes, projects, poker-games); schemas in `src/content/config.ts`. Pages are in `src/pages/`, shared layout in `src/layouts/Layout.astro`.

## Implementation workflow: Claude as brain, Codex as worker

Claude does not implement changes directly in this repo. Instead:

1. **Claude (brain):** breaks the approved spec/plan into small, self-contained tasks; writes a precise prompt per task (files to touch, acceptance criteria, relevant spec excerpts).
2. **Codex (worker):** executes each task via the Codex CLI, non-interactively:
   ```bash
   codex exec --sandbox workspace-write --output-last-message /tmp/codex-last.md "<task prompt>"
   ```
3. **Claude (review):** reviews the resulting diff (`git diff`) against the spec and voice principles, runs `npm run build`, and either accepts (commit) or sends Codex a corrective follow-up prompt. Claude never rubber-stamps — it reads the actual diff.

Never use `--dangerously-bypass-approvals-and-sandbox`. One task per `codex exec` call; keep prompts self-contained since Codex has no memory between calls.

Active design spec: `docs/superpowers/specs/2026-09-08-professional-restructure-design.md` (supersedes the 2026-07-17 editorial redesign spec).
