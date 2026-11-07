# CLAUDE.md

Personal website for Mingxi Yan. Astro + Tailwind CSS + TypeScript, deployed to GitHub Pages via GitHub Actions on push to `main`.

## Commands

- `npm run dev` — dev server at localhost:4321
- `npm run build` — production build to `./dist/` (must pass before committing)

## Content

All content lives in `src/content/` collections (poems, articles, quotes, projects, poker-games), except the projects gallery, which reads `src/data/projects.json` (see `docs/projects-gallery.md`); schemas in `src/content/config.ts`. Pages are in `src/pages/`, shared layout in `src/layouts/Layout.astro`.

# Shared layout: nav, labels, MeeTwo button (T-0035, PR 1 of 4)

## Intent
First build step of the site redesign (direction B, picked by the Router on 2026-11-07; see `2026-11-07-site-design-directions.md`). Fix what every page shares: Projects reachable from the nav, no template details, and a MeeTwo button that never covers text.

## Decisions
- **Projects added to the nav** (Router). Order: Projects, Work, Personal, About; nav text one step larger and in ink rather than grey.
- **"Personal" kept as a label** (Claude, small). It is not a noun, but the page mixes poker variants, writing, quotes and interests; a replacement word would be new wording for Mingxi to choose. Flagged to the Router.
- **Section labels (`.eyebrow`) become small sentence-case sans** (Router: retire template details). The tracked monospace capitals are gone everywhere that class is used. Page-level Tailwind caps headings are handled in each page's own PR.
- **Home "01 / 02 / 03" numbering removed** (Router). The three items are not a sequence.
- **Footer: "↗" only on external links** (Claude, small). Email and Resume (PDF) lose the arrow; GitHub and LinkedIn keep it.
- **MeeTwo button placement** (Claude, small; Router asked that it cover nothing). The button stays on every page and stays fixed, but sits where there is no text:
  - below 1200 px wide, in a reserved slot at the right end of the sticky nav bar (the nav is padded so links never run under it); the chat panel opens from there;
  - from 1200 px, bottom-right in the side gutter as the round "M" mark (the gutter is at least 64 px there);
  - from 1440 px, with its "Ask MeeTwo" label (the gutter fits the full button).
  The mobile `padding-bottom` that made room for the old bottom button is removed.

## Intuitions and rejected alternatives
- A bottom-right button with extra page padding only protects the last screen; anything fixed over the text column covers text while scrolling. Only the nav bar and the side gutter are free of text.
- A full-width bottom bar on phones was rejected: it also covers text and takes more screen than the nav slot.

## How to verify
- Open any page at a laptop width (1280 px): nav reads Projects, Work, Personal, About; the "M" button sits in the right margin, clear of the text, at the bottom.
- Narrow the window below 1200 px or open on a phone: the "M" button sits at the top right inside the nav bar; tap it and the chat opens; Escape or × closes it.
- Home: section labels are plain small text; no 01/02/03.

## Revisit when
The site's content width changes (`.page-shell` max-width or padding), since the breakpoints depend on the gutter width.

```diff
diff --git a/src/components/Footer.astro b/src/components/Footer.astro
index f7c1ac9..0e3801a 100644
--- a/src/components/Footer.astro
+++ b/src/components/Footer.astro
@@ -2,5 +2,5 @@
 const currentYear = new Date().getFullYear();
 ---
 <footer class="site-footer">
-  <div class="page-shell footer-inner"><p>© {currentYear} Mingxi Yan</p><div class="footer-links"><a href="mailto:mingxiy66@gmail.com">Email ↗</a><a href="https://github.com/PittsIrv" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/mingxi-yan-0b9581272" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="/resume.pdf">Resume ↗</a></div></div>
+  <div class="page-shell footer-inner"><p>© {currentYear} Mingxi Yan</p><div class="footer-links"><a href="mailto:mingxiy66@gmail.com">Email</a><a href="https://github.com/PittsIrv" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/mingxi-yan-0b9581272" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="/resume.pdf">Resume (PDF)</a></div></div>
 </footer>
diff --git a/src/components/MeeTwoLauncher.astro b/src/components/MeeTwoLauncher.astro
index 71ab838..b7a3492 100644
--- a/src/components/MeeTwoLauncher.astro
+++ b/src/components/MeeTwoLauncher.astro
@@ -43,8 +43,21 @@ const url = import.meta.env.PUBLIC_STANDIN_URL;
 </script>
 
 <style is:global>
-  #meetwo-launcher { position: fixed; right: 1rem; bottom: 1rem; z-index: 50; display: flex; flex-direction: column; align-items: flex-end; }
-  #meetwo-launcher .ml-fab { display: inline-flex; align-items: center; gap: .5rem; height: 2.75rem; padding: 0 1rem 0 .5rem; border: 1px solid #000; background: #fff; color: #000; font: 500 .875rem/1 var(--font-sans, system-ui, sans-serif); box-shadow: 0 2px 10px rgb(0 0 0 / .12); cursor: pointer; }
+  /* Placement keeps the button off the text column: in the nav bar's reserved right slot below 1200px, in the side gutter above it (mark only), with its label once the gutter fits it. */
+  #meetwo-launcher { position: fixed; z-index: 60; top: .5rem; right: clamp(1.25rem, 4vw, 3rem); display: flex; flex-direction: column; align-items: flex-end; }
+  body:has(#meetwo-launcher) .nav-inner { padding-right: calc(clamp(1.25rem, 4vw, 3rem) + 3.5rem); }
+  #meetwo-launcher .ml-label { display: none; }
+  #meetwo-launcher .ml-fab { padding: 0 .5rem; }
+  @media (min-width: 641px) { #meetwo-launcher { top: 1.0625rem; } }
+  @media (min-width: 1200px) {
+    #meetwo-launcher { top: auto; bottom: 1rem; right: 1rem; }
+    body:has(#meetwo-launcher) .nav-inner { padding-right: clamp(1.25rem, 4vw, 3rem); }
+  }
+  @media (min-width: 1440px) {
+    #meetwo-launcher .ml-label { display: inline; }
+    #meetwo-launcher .ml-fab { padding: 0 1rem 0 .5rem; }
+  }
+  #meetwo-launcher .ml-fab { display: inline-flex; align-items: center; gap: .5rem; height: 2.75rem; border: 1px solid #000; background: #fff; color: #000; font: 500 .875rem/1 var(--font-sans, system-ui, sans-serif); box-shadow: 0 2px 10px rgb(0 0 0 / .12); cursor: pointer; }
   #meetwo-launcher .ml-fab[hidden], #meetwo-launcher #meetwo-panel[hidden] { display: none; }
   #meetwo-launcher .ml-fab:hover { background: #000; color: #fff; }
   #meetwo-launcher .ml-mark { display: grid; place-items: center; width: 1.75rem; height: 1.75rem; border-radius: 50%; background: #000; color: #fff; font-family: var(--font-serif, serif); font-size: .9375rem; }
@@ -54,11 +67,4 @@ const url = import.meta.env.PUBLIC_STANDIN_URL;
   #meetwo-panel .ml-close { border: 0; background: none; font-size: 1.5rem; line-height: 1; padding: .25rem .5rem; cursor: pointer; }
   #meetwo-panel .ml-body { overflow-y: auto; padding: 0 .75rem .75rem; }
   #meetwo-panel .meetwo-chat { margin-top: .75rem; }
-  /* Small screens: the button shrinks to its mark and the page keeps room below its content. */
-  @media (max-width: 640px) {
-    #meetwo-launcher { right: .75rem; bottom: .75rem; }
-    #meetwo-launcher .ml-fab { padding: 0 .5rem; }
-    #meetwo-launcher .ml-label { display: none; }
-    body { padding-bottom: 4rem; }
-  }
 </style>
diff --git a/src/components/Navigation.astro b/src/components/Navigation.astro
index 90d2a5e..8fac1f7 100644
--- a/src/components/Navigation.astro
+++ b/src/components/Navigation.astro
@@ -1,6 +1,6 @@
 ---
 const currentPath = Astro.url.pathname.replace(/\/$/, '') || '/';
-const navItems = [{ href: '/work', label: 'Work' }, { href: '/personal', label: 'Personal' }, { href: '/about', label: 'About' }];
+const navItems = [{ href: '/projects', label: 'Projects' }, { href: '/work', label: 'Work' }, { href: '/personal', label: 'Personal' }, { href: '/about', label: 'About' }];
 ---
 <a class="skip-link" href="#main-content">Skip to content</a>
 <nav class="site-nav" aria-label="Main navigation">
diff --git a/src/pages/index.astro b/src/pages/index.astro
index 0b105ed..53863b2 100644
--- a/src/pages/index.astro
+++ b/src/pages/index.astro
@@ -35,7 +35,7 @@ const entries = [
       <div class="note-grid">
         {entries.map(entry => (
           <details class="explore-note" id={`note-${entry.number}`}>
-            <summary><span class="note-top"><span class="eyebrow">{entry.kind}</span><span class="note-number">{entry.number}</span></span><h3>{entry.title}</h3><p>{entry.text}</p><span class="note-prompt"><span class="when-closed">Details</span><span class="when-open">Close</span><span class="note-plus" aria-hidden="true">+</span></span></summary>
+            <summary><span class="note-top"><span class="eyebrow">{entry.kind}</span></span><h3>{entry.title}</h3><p>{entry.text}</p><span class="note-prompt"><span class="when-closed">Details</span><span class="when-open">Close</span><span class="note-plus" aria-hidden="true">+</span></span></summary>
             <div class="note-detail"><p>{entry.detail}</p><a class="text-link" href={entry.href}>{entry.link} ↗</a></div>
           </details>
         ))}
diff --git a/src/styles/global.css b/src/styles/global.css
index 720cbbd..adaeeb5 100644
--- a/src/styles/global.css
+++ b/src/styles/global.css
@@ -142,11 +142,12 @@ a, button { touch-action: manipulation; }
 .nav-inner { min-height: 78px; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; }
 .site-wordmark { font-family: var(--font-serif); font-size: 1.4rem; font-weight: 600; letter-spacing: -.04em; }
 .site-wordmark span { color: var(--accent); }
-.nav-links { display: flex; align-items: center; gap: 2rem; font-size: .875rem; }
-.nav-links a { padding-block: .6rem; color: var(--muted); }
+.nav-links { display: flex; align-items: center; gap: 2rem; font-size: .9375rem; }
+.nav-links a { padding-block: .6rem; color: var(--ink); }
 .nav-links a[aria-current='page'] { color: var(--accent); box-shadow: 0 1px var(--accent); }
 .nav-links a:hover, .intro-links a:hover { color: var(--accent); }
-.eyebrow { font: 500 .75rem/1.6 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .075em; text-transform: uppercase; color: var(--muted); }
+/* Section labels: small sentence-case sans, not tracked caps. */
+.eyebrow { font-family: var(--font-sans); font-size: .875rem; font-weight: 600; line-height: 1.6; color: var(--muted); }
 .home-intro { display: grid; grid-template-columns: minmax(0, 1fr) 235px; gap: 5rem; padding-top: 5.4rem; padding-bottom: 4.6rem; }
 .ink-dot { color: var(--accent); padding-inline: .5rem; }
 .home-intro h1 { font-size: clamp(4rem, 9vw, 7.5rem); font-weight: 450; line-height: 1; letter-spacing: -.055em; margin: 1.4rem 0 2rem; }
@@ -176,7 +177,6 @@ a, button { touch-action: manipulation; }
 .explore-note summary::-webkit-details-marker { display: none; }
 .explore-note summary:hover { background: var(--wash); }
 .note-top { display: flex; align-items: start; justify-content: space-between; gap: .65rem; }
-.note-number { font: .75rem/1.6 ui-monospace, monospace; color: var(--accent); }
 .explore-note h3 { font-size: 1.55rem; font-weight: 450; line-height: 1.2; letter-spacing: -.025em; margin: 1.5rem 0 1rem; }
 .explore-note summary p { font-size: .95rem; color: var(--muted); line-height: 1.7; }
 .note-prompt { display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 1.8rem; font-size: .875rem; color: var(--accent); }
```

Reviewer sees only this package.
