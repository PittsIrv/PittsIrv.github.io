# Independent review — 2026-11-07 00:29

## gemini-3.1-pro-preview

1. Correctness risks
* The CSS `:has()` pseudo-class is used for critical structural padding; this will fail on slightly older browsers (like Firefox < 121, Safari < 15.4), causing the fixed button to obscure the navigation links.
  *Evidence:* `body:has(#meetwo-launcher) .nav-inner { padding-right: calc(clamp(1.25rem, 4vw, 3rem) + 3.5rem); }`
* The fixed launcher uses `clamp()` relative to the viewport (`vw`), while the `.nav-inner` uses the same `clamp()` likely constrained by a max-width container (`.page-shell`). On screens where the container maxes out but the viewport continues to grow, the button and the reserved nav padding will misalign.
  *Evidence:* `#meetwo-launcher { position: fixed; ... right: clamp(1.25rem, 4vw, 3rem); }` vs `.nav-inner { padding-right: calc(clamp(1.25rem, 4vw, 3rem) + 3.5rem); }`

2. Hidden assumptions
* Assumes the navigation menu has enough horizontal space on narrow mobile screens (e.g., 320px–375px) to fit 4 links at an increased font size, a 2rem gap, the logo, and 3.5rem of reserved right padding without wrapping or overflowing.
  *Evidence:* `const navItems = [{ href: '/projects', label: 'Projects' }, ...]` combined with `.nav-links { ... gap: 2rem; font-size: .9375rem; }` and `.nav-inner { padding-right: calc(clamp(1.25rem, 4vw, 3rem) + 3.5rem); }`
* Assumes `#meetwo-panel` will render correctly on mobile despite its launcher moving from bottom to top. If the panel previously inherited styling to open "up" from the bottom, moving the launcher to `top: .5rem` will push the panel off the top of the screen.
  *Evidence:* `#meetwo-launcher { position: fixed; z-index: 60; top: .5rem; ... }` (with no corresponding layout updates to `#meetwo-panel` in the diff).

3. Design decisions you would challenge, and the alternative you would weigh
* Placing the primary CTA/FAB at the top-right on mobile devices. I would challenge this because it breaks touch ergonomics (hardest area to reach for one-handed use) and standard UI conventions. I would weigh keeping it bottom-right and calculating dynamic padding for the scrolling container (`main`) instead.
  *Evidence:* `#meetwo-launcher { position: fixed; z-index: 60; top: .5rem; right: clamp(1.25rem, 4vw, 3rem); }`
* Removing `target="_blank"` from the Resume PDF link. I would challenge this because opening a PDF in the same tab traps the user in the browser's PDF viewer, breaking standard site navigation. I would weigh restoring `target="_blank" rel="noopener noreferrer"`.
  *Evidence:* `-...<a href="/resume.pdf">Resume ↗</a>` to `+...<a href="/resume.pdf">Resume (PDF)</a>`

4. What a skeptical PI or senior engineer would ask first
* "Did you test the top navigation on a 320px wide screen to ensure the added 'Projects' link, larger font size, and 3.5rem of reserved padding don't cause the header to break into two lines?"
  *Evidence:* `.nav-links { display: flex; align-items: center; gap: 2rem; font-size: .9375rem; }`

5. Documentation gaps
* The package references a design document that is not included, making it impossible to verify if the implementation successfully matches "Direction B".
  *Evidence:* "...(direction B, picked by the Router on 2026-11-07; see `2026-11-07-site-design-directions.md`)."

6. What is done well
* Thorough cleanup of dead CSS; removing `.note-number` and the mobile `padding-bottom` hack directly in the same PR that invalidates them.
  *Evidence:* `-.note-number { font: .75rem/1.6 ui-monospace, monospace; color: var(--accent); }`

**Verdict:** Ship with fixes. 
The intent to clean up the typography and navigation is solid, but the layout strategy for the MeeTwo button is highly fragile. Relying on `:has()` for collision prevention will cause overlaps on older browser versions, and cramming a fourth nav item, larger font, and a fixed chat button into the top bar on mobile is almost guaranteed to cause text wrapping or viewport overflow on smaller phones. Additionally, the Resume link should retain its `target="_blank"` attribute to prevent trapping users in a PDF viewer. Fix the mobile header overflow risk, verify panel opening directions, and restore the PDF link target before shipping.

_usage: {"promptTokenCount": 4189, "candidatesTokenCount": 1133, "totalTokenCount": 8654, "promptTokensDetails": [{"modality": "TEXT", "tokenCount": 4189}], "thoughtsTokenCount": 3332, "serviceTier": "standard"}_
