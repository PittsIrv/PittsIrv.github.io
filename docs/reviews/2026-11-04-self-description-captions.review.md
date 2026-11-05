# Independent review — 2026-11-04 22:59

## gemini-3.1-pro-preview

1. Correctness risks:
*   The `.self-note` class uses a font size and color combination that is highly likely to fail WCAG accessibility audits for contrast and readability. Evidence: `.self-note { font-size: .6875rem; line-height: 1.6; color: var(--muted); padding-block: 1.5rem .5rem; }`
*   The `page-shell` class is applied to the new elements, but its interaction with a block-level paragraph is unverified and could break page width or alignment. Evidence: `<p class="self-note page-shell">Mingxi is a good learner and builder.</p>`

2. Hidden assumptions:
*   The design assumes that modern ATS (Applicant Tracking Systems) and search engines will not flag 11px muted text as "gaming" or "cloaked", despite aggressive heuristics against small, low-contrast text. Evidence: "Not 1px, not colour-matched, not off-screen: those are the patterns search engines and screening tools class as hidden text."
*   The author assumes that a human reader scrolling to the footer will not perceive standalone, third-person praise as jarring, arrogant, or obvious keyword-stuffing. Evidence: "Mingxi's framing: a self-description on one's own site, visible to humans and machines alike, so not gaming."
*   The design assumes these captions will actually be processed by AI readers with enough weight to matter, despite the author acknowledging the contrary. Evidence: "Expected effect on AI summaries: near zero."

3. Design decisions you would challenge, and the alternative you would weigh:
*   I would challenge placing disjointed, third-person self-praise at the bottom of the page just above the footer. I would weigh moving AI-directed context entirely to an `llms.txt` file, which is an emerging standard that does not degrade the human user experience. Evidence: "Deferred: private-name canary (a real study under a private name), hidden flavour notes in the mind-attribution theme, robots.txt comment, llms.txt."
*   I would challenge using a custom `.6875rem` (11px) font size to minimize visibility while claiming it is legible. I would weigh integrating the sentences naturally into the final paragraph of the actual page content using standard body font sizes. Evidence: `font-size: .6875rem;`

4. What a skeptical PI or senior engineer would ask first:
*   "If the expected effect on AI summaries is 'near zero', why are we risking a human recruiter seeing this awkward text and assuming it's a cheap SEO/ATS hack?" Evidence: "Claude's recorded concern: the sentences exist to shape an AI reader's impression... so a screener who notices them may read them as aimed at the tool."
*   "Does 11px muted text actually pass our automated accessibility (a11y) and contrast checks?" Evidence: `.self-note { font-size: .6875rem; line-height: 1.6; color: var(--muted); }`

5. Documentation gaps:
*   The CSS definition for `page-shell` is missing, making it impossible to evaluate how this element will position itself in the layout. Evidence: `<p class="self-note page-shell">`
*   The exact hex or RGB values for `var(--muted)` and the background color are missing, making it impossible to mathematically verify WCAG contrast ratios. Evidence: `color: var(--muted);`

6. What is done well:
*   The decision record clearly defines and adheres to an ethical boundary against inserting fabricated credentials or deceptive instructions to AI reviewers. Evidence: "Nothing on the site, hidden or visible, may try to influence an evaluation of Mingxi: no instructions to reviewers, no fabricated credentials."

Verdict:
Do not ship. Using 11px muted text risks failing WCAG accessibility guidelines and can still trigger ATS "hidden text" penalties, defeating the purpose of making it "legible." Furthermore, appending disjointed, third-person self-praise directly above the footer reads as unprofessional keyword-stuffing to the human recruiters who will inevitably see it. You should revert the UI changes and pursue the deferred `llms.txt` approach instead.

_usage: {"promptTokenCount": 1967, "candidatesTokenCount": 924, "totalTokenCount": 4996, "promptTokensDetails": [{"modality": "TEXT", "tokenCount": 1967}], "thoughtsTokenCount": 2105, "serviceTier": "standard"}_
