# Independent review — 2026-11-07 18:20

## gemini-3.1-pro-preview

1. Correctness risks
- The Markdown excerpt generator strips brackets but leaves parentheses and URLs intact, meaning `[Link Text](https://example.com)` becomes `Link Text(https://example.com)`, which will leak raw URLs into the `<meta name="description">`. Evidence: `const plain = text.replace(/[#*_>`\[\]]/g, '').replace(/\s+/g, ' ').trim();`
- The build checker parses HTML meta tags using a brittle regular expression that assumes attributes appear in a specific order (e.g., `name=` before `content=`); it will fail to detect valid tags written as `<meta content="..." property="og:image">`. Evidence: `const meta = (html, attr, key) => html.match(new RegExp(\`<meta\\b[^>]*${attr}="${key}"[^>]*content="([^"]*)"\`, 'i'))?.[1]?.trim();`
- The `generate-og.mjs` script only reads flat directories for articles and poems; if a Markdown file is nested in a subdirectory, it will be skipped by the image generator but the Layout component will still expect a dashed preview image name, causing a build failure. Evidence: `readdirSync(\`src/content/${dir}\`).filter((n) => n.endsWith('.md'))`

2. Hidden assumptions
- The preview checker assumes `Astro.site` is correctly configured and does not contain a base path; if the site is deployed to a subpath (e.g., `https://domain.com/portfolio/`), `new URL(url).pathname` will include the base path and `existsSync` will look in `dist/portfolio/og/...` and fail. Evidence: `if (!existsSync(join(dist, new URL(url).pathname)))`
- The image generator assumes the developer is using macOS with Google Chrome installed in the default application directory. Evidence: `const chrome = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';`

3. Design decisions you would challenge, and the alternative you would weigh
- Committing generated 1200x630 PNG files to the Git repository. Over time, this bloats the repository size significantly. Alternative: Generate images automatically during the build process using a lightweight, CI-friendly library like `satori` and `@resvg/resvg-js`, eliminating the need for a full Chrome binary in GitHub Actions and keeping the repo clean. Evidence: "...the PNGs are committed because the build should not need Chrome."
- Using regex to extract metadata from compiled HTML in the build checker. Alternative: Parse the HTML properly using a lightweight tool like `cheerio` in the validation script, or validate the metadata at the component level during the Astro build via an integration. Evidence: `html.match(/<title>([^<]+)<\/title>/)`

4. What a skeptical PI or senior engineer would ask first
- If `poem.body` contains frontmatter because Astro passes the raw file body, is the excerpt function accidentally publishing YAML data into the SEO description?
- How do we handle URLs with trailing slashes or query parameters, given `Astro.url.pathname` is manipulated manually to create the slug for the image file?
- Are we sure headless Chrome rendering captures the web font accurately within the 3000ms virtual time budget without a network wait for the local file?

5. Documentation gaps
- The package does not explicitly document in `CLAUDE.md` or a developer onboarding file that adding new content requires running a manual script, nor does it document how non-Mac users should configure `CHROME_PATH` to avoid script crashes. 

6. What is done well
- The inclusion of a strict build-time checker (`check-previews.mjs`) that fails the build rather than letting pages ship with missing metadata.
- CSS updates for accessibility (e.g., `--faint`) were handled elegantly without requiring sprawling DOM edits.
- Perfecting Lighthouse and axe-core scores to 100/0 across both mobile and desktop.

Verdict: Ship with fixes.
The accessibility and layout updates are solid, but the fragile regex used for both Markdown excerpt generation and HTML parsing introduces immediate risks. The excerpt generator will likely leak raw Markdown URLs into the meta descriptions, and the build checker will break if Astro's HTML minification/generation alters attribute order. Fix the excerpt logic to handle Markdown links properly and update the HTML validation script to be robust against attribute reordering before shipping.

_usage: {"promptTokenCount": 6916, "candidatesTokenCount": 966, "totalTokenCount": 10424, "promptTokensDetails": [{"modality": "TEXT", "tokenCount": 6916}], "thoughtsTokenCount": 2542, "serviceTier": "standard"}_
