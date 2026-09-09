# Professional Restructure — Design Spec

**Date:** 2026-09-08
**Status:** Approved (planning only; implementation not yet started)
**Supersedes:** `2026-07-17-editorial-redesign-design.md`
**Goal:** Make the site credible in the first 30 seconds to a reader who is deciding whether to interview Mingxi, without deleting the personal material that makes it memorable to a reader who stays longer.

## Why this supersedes the editorial redesign spec

The 2026-07-17 spec assumed a 50/50 audience (recruiters/engineers and friends/general readers), declared the Academic page out of scope, and threaded personal material through every page. The audience weighting has since changed: the site is now optimized for hiring managers, interviewers, and referrers, with personal material consolidated rather than threaded.

Carried forward from that spec, unchanged: the voice principles, the typo fixes, the removal of template-default visual idioms, the self-hosted serif direction, and sourcing the homepage quote from the `quotes` collection.

Dropped from that spec: the standalone `/now` page (folds into Personal), the cross-page through-line threading (replaced by consolidation), the narrative-first homepage opening (demoted below the positioning block), and "Academic page content is out of scope" (that page is now the centerpiece).

## Diagnosis

- Three of Mingxi's strongest credentials are absent from the site entirely: the TikTok Data Engineer internship, Sapling Lab, and PersonaTeaming (the CMU–Apple collaboration). `academic.astro` stops at AlpSoft and Enterview. This is the single largest gap and it is a content problem, not a design problem.
- The homepage spends its first screen on blob animations, a "Code | Poker | Write | Sports" divider row, and a Heidegger quote. Nothing above the fold states CMU, TikTok, AI systems, or a graduation date.
- Six nav items split attention across two audiences on every page, so neither is served well.
- `src/content/projects/task-manager.md` is unmodified Astro scaffold boilerplate ("github.com/yourusername/task-manager"). The `projects` collection is referenced by no page.
- Typos across the site — `expriences`, `chanllenge`, `reading ane exploiting`, `every people I met`, `every skills I developed` — cost more with a professional audience than any design choice.

## Direction chosen

A professional spine with personal material consolidated one click away. Nav goes from six items to four: **Home · Work · Personal · About**.

Alternatives considered and rejected:

- **Index page plus per-project case study pages.** Initially chosen, then rejected: the depth reads as showcasing, and publishing detailed internal TikTok architecture on a public page is a confidentiality risk not worth taking.
- **Split Engineering / Research pages** mirroring the master bank's two positioning branches. Rejected: TikTok and the poker work legitimately belong on both, and the duplication costs more than the sharper per-audience framing gains.
- **Sterilizing the site into a conventional portfolio.** Rejected: the people who actually click a personal site link are interviewers and referrers, and they reward distinctiveness. The fix is ordering, not deletion.

## Design

### 1. Content source and the honesty constraint

All Work-page content derives from the Resume Master Bank (Google Doc `1_2LuoWTCWZu0lXGI0Z2leou19ASdKuFq7bmI9V_XSL0`).

**Binding rule — the master bank's "Claims / Do Not Overstate" sections govern every bullet on this site.** No invented metrics, no numbers the bank marks unknown, no scale claims the bank does not support. Specifically:

- **TikTok:** describe problem shape, ownership, and technologies only. No internal system architecture, no pipeline steps, no internal service or tool names. Exact table/dataset counts are unknown and must not be numeric.
- **PersonaTeaming:** second author. Do not claim the red-teaming research direction originated with Mingxi (it came from the PhD lead). Do not claim ownership of the 11-practitioner industry user study — the contribution there was the interface. The "~80% of the codebase" estimate stays out of public copy.
- **WeAudit:** do not claim authorship of the CSCW Best Paper, and do not claim to have built the demographic classification model. Deployment description stays qualitative.
- **Sapling Lab / MToM:** "NSF-funded project" as context only — never that Mingxi won or wrote the grant. The simulation study is *ongoing and first-author*; it has not been submitted, accepted, or published, and its findings do not exist yet. The planned 300–500 participant Sotopia study is not a completed contribution.

Any bullet a reviewer cannot trace to the master bank does not ship.

### 2. Home (`src/pages/index.astro`)

Above the fold, in order:

1. Name.
2. A one-line positioning statement spanning both master-bank branches — an AI systems engineer who builds the infrastructure around models and the models themselves.
3. A compact credential line: Carnegie Mellon, Information Systems & Computer Science, May 2026 · TikTok · CMU–Apple collaboration.
4. Resume, GitHub, LinkedIn, email.

Below the fold: the through-line narrative in 4–6 first-person sentences (invents poker variants → built a platform to play them → taught a language model to reason about them), three featured work items linking to anchors on `/work`, and a quote selected at build time from the `quotes` collection.

Removed: blob animations and their keyframes, the "Code | Poker | Write | Sports" divider row, the scroll indicator, the icon-in-black-square cards, the hard-coded Heidegger quote.

### 3. Work (`src/pages/work.astro`, replacing `academic.astro`)

One page, one depth level, anchored sections: Education · Experience · Projects · Publications · Skills.

**Experience** gains three entries currently missing, each at the same depth as the existing ones — 3–4 bullets naming the problem shape, Mingxi's ownership, and the skills and technologies used. No pipelines, no architectures:

- **TikTok — Data Engineer Intern.** Two workstreams (enterprise data discovery for internal agents; livestream operations revenue diagnosis), described at problem-and-skills level per the constraint above.
- **Chimps Lab, CMU — Research Assistant.** Existing WeAudit entry gains PersonaTeaming, identified as the CMU–Apple collaboration, second author.
- **Sapling Lab, CMU — Research Assistant, NLP-side lead.** NSF-funded MToM research program; leading an ongoing first-author simulation study.

Existing entries (AlpSoft, Enterview, THUNLP/OpenBMB, TA, ProtectPT) are retained and lightly tightened for voice.

**Projects** keeps Dealer's Choice. **Publications** holds the solver-guided poker fine-tuning paper with its existing `/papers/solver-guided-poker-finetuning.pdf` link. **Skills** is refreshed against the master bank's Skills Inventory.

`academic.astro` is removed; `/academic` redirects to `/work` so existing resume links do not break.

### 4. Personal (`src/pages/personal.astro`, replacing `misc.astro`)

In order: a dated **"Right now · Month Year"** block (building, reading, playing, learning — short enough that updating it takes ten minutes), then poker variants from the `poker-games` collection (12 entries, the deepest collection on the site), then poems, then `monologue.md`, then quotes, then the guitar and photography content migrated from Misc.

`monologue.md` stays in the `articles` collection and keeps its `/articles/monologue` URL; only its surfacing moves. `misc.astro` and `writing.astro` are removed. The `/poems/[slug]` and `/articles/[slug]` dynamic routes are retained.

### 5. About (`src/pages/about.astro`)

Structure unchanged; editorial pass applied. The concrete origin story (late to code, and what that perspective gives) opens the page. The five interest vignettes are cut roughly in half, keeping only sentences carrying specifics — the Kyrie line stays, generic pattern-recognition sentences go. The opening philosophical meditation is condensed to 2–3 sentences and moved to close the page. Contact section unchanged.

### 6. Voice principles (site-wide)

- Every rewritten section contains at least one specific fact only Mingxi could have written. "I came to code after starting university" passes; "exploring the intersections of technology, strategy, and creativity" fails.
- First person, shorter sentences. Abstractions are earned: concrete details first, philosophy at the end of a story, never the beginning.
- Fix all existing typos during the pass: `expriences`, `chanllenge`, `reading ane exploiting`, `every people I met`, `every skills I developed`, and any others encountered.

### 7. Visual system

Keep: the black/white/grey palette, the Astro + Tailwind stack, subtle fade-in animations.

Add: a self-hosted serif (e.g. Source Serif) for headings and long-form prose, body stays sans, no external font CDNs. Larger type-scale contrast, wider margins.

Remove: blob animations, icon-in-black-square tiles, hover-lift card effects. Cards become simple bordered or hairline-ruled blocks.

### 8. Repo cleanup

Delete `src/content/projects/task-manager.md` (scaffold boilerplate) and remove the now-empty `projects` collection from `src/content/config.ts`. Dealer's Choice stays authored directly in the Work page, as it is today.

### 9. Deployment

Unchanged: GitHub Pages via the existing Actions workflow on push to `main`. Vercel was considered and rejected — the site is fully static, the pipeline works, and preview deploys are not what the site needs.

Separately (requires Mingxi to register a domain, so it is sequenced last and may ship independently): add `public/CNAME`, update `site:` in `astro.config.mjs` from `https://PittsIrv.github.io` to the custom domain, and point DNS at GitHub Pages. A `pittsirv.github.io` URL on a resume undercuts the rest of this work.

## Out of scope / unchanged

- Content collection schemas in `src/content/config.ts` (except the `projects` removal in §8).
- The `/poems/[slug]` and `/articles/[slug]` dynamic routes.
- Resume PDF and paper PDF.
- The GitHub Actions workflow itself.

## Open items

- **Writing page deferred.** A professional-facing Writing page needs 2–3 essays to earn a nav slot; today there is one article and it is literary prose. When such essays exist, revisit adding `/writing` as a fifth nav item.
- **Domain registration** is a prerequisite for §9's second paragraph and is Mingxi's action, not an implementation task.

## Verification

Static site, no test infrastructure. `npm run build` must pass. Then a visual pass of every page in dev at desktop and mobile widths, plus a link check that `/academic` redirects and that the resume and paper PDFs still resolve.

Content review gate: every Work-page bullet is checked against the master bank's "Claims / Do Not Overstate" sections before commit.

## Implementation workflow

Per `CLAUDE.md`: Claude acts as the brain (task breakdown, prompts, review, verification); Codex CLI acts as the worker. Each task — Claude writes a precise self-contained prompt referencing this spec → Codex implements via `codex exec --sandbox workspace-write` → Claude reviews the diff against the spec, the voice principles, and the honesty constraint → iterate or accept.
