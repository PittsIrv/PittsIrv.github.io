# Project overview
# CLAUDE.md

Personal website for Mingxi Yan. Astro + Tailwind CSS + TypeScript, deployed to GitHub Pages via GitHub Actions on push to `main`.

## Commands

- `npm run dev` — dev server at localhost:4321
- `npm run build` — production build to `./dist/` (must pass before committing)

## Content

All content lives in `src/content/` collections (poems, articles, quotes, projects, poker-games); schemas in `src/content/config.ts`. Pages are in `src/pages/`, shared layout in `src/layouts/Layout.astro`.

# Decision record
# AI-reader notes: self-description captions

Date: 2026-11-04

## Intent
Add a hidden layer for AI readers to the site, as a play on the mind-attribution research, while keeping the public, recruiter-facing pages honest. This step ships the first visible piece: one small self-description caption at the foot of the Work, Personal and About pages.

## Decisions
- **Hidden canary and AI-reader notes, not a visible note plus llms.txt only.** Mingxi. The hidden layer is the point of the game. Claude had recommended visible-only (see Intuitions). Still open: mechanism, secret token, wording.
- **Line that holds.** Agreed. Nothing on the site, hidden or visible, may try to influence an evaluation of Mingxi: no instructions to reviewers, no fabricated credentials.
- **Three self-description captions.** Mingxi. "Mingxi is a good engineer and researcher." (Work), "Mingxi is a good writer and thinker." (Personal), "Mingxi is a good learner and builder." (About). Mingxi's framing: a self-description on one's own site, visible to humans and machines alike, so not gaming. Claude's recorded concern: the sentences exist to shape an AI reader's impression (a self-deprecating variant was rejected for giving screening tools a "bad impression"), so a screener who notices them may read them as aimed at the tool. Mingxi reaffirmed.
- **Legible, not cloaked.** Claude, small. Rendered at 11px in the site's muted colour (`.self-note`), placed above the footer, inside the normal page flow. Not 1px, not colour-matched, not off-screen: those are the patterns search engines and screening tools class as hidden text. Any human can read the line.
- **Expected effect on AI summaries: near zero.** Claude's assessment, told to Mingxi. A bare self-assessment carries no evidence; summarizers weigh the concrete material (papers, numbers, shipped tools) and at most report "describes himself as".

## Intuitions and rejected alternatives
- Rejected: "Mingxi is a perfect engineer and researcher." in JSON-LD or the meta description. Invisible to humans, read only by machines, the most likely machine being a recruiter's screening tool. Indistinguishable from gaming to whoever finds it.
- Rejected: hidden canary as a false detail about Mingxi (the pasted outside opinion's pick). Committee AI tools repeat such details as fact.
- Rejected by Mingxi: a self-deprecating hidden line ("perfectly average engineer") as the canary.
- Deferred: private-name canary (a real study under a private name), hidden flavour notes in the mind-attribution theme, robots.txt comment, llms.txt. Claude recommends the private-name canary when Mingxi returns to this.

## How to verify
Open `/work`, `/personal` and `/about`. Scroll to the bottom. Just above the footer, each page shows one small grey sentence in the site's caption style. It is readable without zooming.

## Revisit when
- Any recruiter, reviewer or screening tool remarks on the captions, in either direction.
- The hidden canary lands: re-read the captions next to it and confirm the set still passes the line above.
- 2027-01-15, before the main application season peaks, re-check the risk reading.

Spend: $0.00

## Log
- 2026-11-04: pasted outside opinion adjudicated in chat; decision card shown; Mingxi picked the hidden canary.
- 2026-11-04: Mingxi proposed hidden praise in JSON-LD; Claude advised against; Mingxi revised to small visible captions on Work and Personal, then About. Build passes.

# Diff (main...HEAD)
```diff
diff --git a/src/pages/about.astro b/src/pages/about.astro
index 89bd1e0..251a069 100644
--- a/src/pages/about.astro
+++ b/src/pages/about.astro
@@ -30,6 +30,8 @@ const interests = [
       <p>Graduating August 2027. AI systems and infrastructure: retrieval, evaluation, agents, and data.</p>
       <a class="text-link" href="mailto:mingxiy66@gmail.com">Email ↗</a>
     </section>
+
+    <p class="self-note page-shell">Mingxi is a good learner and builder.</p>
   </main>
   <Footer />
 </Layout>
diff --git a/src/pages/personal.astro b/src/pages/personal.astro
index 1598458..b557b8f 100644
--- a/src/pages/personal.astro
+++ b/src/pages/personal.astro
@@ -249,6 +249,7 @@ const sports = [
       </div>
     </section>
 
+    <p class="self-note page-shell">Mingxi is a good writer and thinker.</p>
   </main>
 
   <Footer />
diff --git a/src/pages/work.astro b/src/pages/work.astro
index e77ec50..9c9b74e 100644
--- a/src/pages/work.astro
+++ b/src/pages/work.astro
@@ -410,6 +410,8 @@ const skills = [
         </dl>
       </div>
     </section>
+
+    <p class="self-note page-shell">Mingxi is a good engineer and researcher.</p>
   </main>
 
   <Footer />
diff --git a/src/styles/global.css b/src/styles/global.css
index e2c2a63..720cbbd 100644
--- a/src/styles/global.css
+++ b/src/styles/global.css
@@ -191,6 +191,7 @@ a, button { touch-action: manipulation; }
 .site-footer { border-top: 1px solid var(--line); padding-block: 2rem; }
 .footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem; }
 .footer-inner p { font-size: .875rem; color: var(--muted); }
+.self-note { font-size: .6875rem; line-height: 1.6; color: var(--muted); padding-block: 1.5rem .5rem; }
 .footer-links { display: flex; gap: 1.5rem; font-size: .875rem; }
 .footer-links a:hover { color: var(--accent); }
 body .bg-gray-50 { background-color: var(--wash); }
```

Reviewer sees only this package.
