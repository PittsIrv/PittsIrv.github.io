# Independent review — 2026-11-07 18:24

## gemini-3.1-pro-preview

1. Correctness risks
1. The relative file path in the `existsSync` check will resolve incorrectly if the build command is executed from outside the project root directory, resulting in false negatives and serving the fallback image improperly.
   Evidence: `const ownImage = existsSync(\`public/og/\${slug}.png\`);`
2. If Server-Side Rendering (SSR) is ever enabled, this layout will execute at runtime where the `public/` directory does not exist (it is compiled into `dist/`), causing `existsSync` to always fail and fallback to `home.png` in production.
   Evidence: `const ownImage = existsSync(\`public/og/\${slug}.png\`);`

2. Hidden assumptions
1. The build environment's Current Working Directory (CWD) is permanently guaranteed to be the exact folder containing `public/`.
   Evidence: `const ownImage = existsSync(\`public/og/\${slug}.png\`);`
2. The regex string replacement used to generate the slug exactly matches the file naming conventions used inside `scripts/generate-og.mjs`.
   Evidence: `const slug = Astro.url.pathname.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home';`
3. The fallback image `home.png` is permanently guaranteed to exist, as there is no secondary fallback or error handling if it is missing.
   Evidence: `const imageURL = new URL(\`/og/\${ownImage ? slug : 'home'}.png\`, Astro.site).href;`

3. Design decisions you would challenge, and the alternative you would weigh
1. Using Node's raw `fs.existsSync` inside an Astro Layout component to verify static assets. Alternative: I would weigh using Vite's `import.meta.glob('/public/og/*.png')` to resolve available assets via the module graph, which is path-safe, agnostic to CWD, and idiomatic to Astro's build pipeline.
   Evidence: `import { existsSync } from 'node:fs';`
2. Abandoning automated image generation in CI entirely on the premise that "the deploy has no Chrome." Alternative: I would weigh using an HTML-to-SVG/PNG library like Satori (`@vercel/og`), which generates images during the build using a lightweight WebAssembly engine and does not require a headless browser.
   Evidence: `Rejected: generating images during the build, because the deploy has no Chrome.`

4. What a skeptical PI or senior engineer would ask first
1. "Standard GitHub Actions `ubuntu-latest` runners typically *do* have Chrome installed, or can install it trivially via standard actions. Why did we assume we couldn't run `generate-og.mjs` in CI?"
2. "How do we know for sure that `Astro.url.pathname.replace(/\//g, '-')` perfectly aligns with the slug generation logic inside `generate-og.mjs` for deeply nested paths?"

5. Documentation gaps
1. The internal filename generation logic for `scripts/generate-og.mjs` is not provided in the diff or package, making it impossible to verify if the layout's `slug` variable successfully matches the generated PNGs. 

6. What is done well
1. The fallback implementation is highly concise, properly executes during SSG build-time, and cleanly prevents a CI-breaking edge case for CMS users without heavy refactoring.

Verdict:
Ship with fixes. The reliance on a hardcoded relative path (`public/og/`) inside an Astro layout via `node:fs` is highly fragile; it will silently fail (defaulting to the fallback) if the working directory changes during CI, and will break entirely if the project ever adopts SSR. Refactor the file check to use absolute pathing (e.g., resolving from `process.cwd()`) or Vite's `import.meta.glob` before merging.

_usage: {"promptTokenCount": 1258, "candidatesTokenCount": 843, "totalTokenCount": 4699, "promptTokensDetails": [{"modality": "TEXT", "tokenCount": 1258}], "thoughtsTokenCount": 2598, "serviceTier": "standard"}_
