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

## Independent review — 2026-11-04 (gemini-3.1-pro-preview, review mode, middle tier)
- "11px muted text is highly likely to fail WCAG contrast" → disagree. Measured: `--muted` #56627a on `--paper` #fbfcff is 5.98:1, which passes AA (4.5:1) for text of any size. WCAG has no minimum font size.
- "`page-shell` on a `<p>` is unverified and could break width" → disagree. `.page-shell` is a max-width container with auto margins and inline padding (global.css:140); the paragraph renders inside the same column as every section. Verified in the browser on all three pages.
- "Assumes ATS and search engines will not flag 11px muted text as cloaked" → partly agree. 11px at 5.98:1 is not what cloaking heuristics target (near-zero size, colour-matched, off-screen), but it is smaller than any other text on the site, so it is the one element a heuristic could single out. Mitigation available: body size.
- "Assumes a human reader will not find standalone third-person praise jarring or keyword-stuffed" → agree. This is the concern Claude recorded before the review; the independent reviewer reached it with no access to the chat.
- "Assumes AI readers weight it, despite 'near zero' expected effect" → agree. Already stated in the record; it is the strongest argument against the captions.
- Challenge: move AI-directed context to llms.txt → noted; llms.txt is already deferred and compatible with either outcome.
- Challenge: use body font size and integrate into page copy instead of a small footer line → agree as the best version of Mingxi's intent, if the captions stay.
- Documentation gaps (page-shell CSS, hex values) → agree; package should include `global.css` tokens and container classes next time. The values are now in this record: `--muted` #56627a, `--paper` #fbfcff, 5.98:1.
- Done well: the line against influencing evaluations → noted.

Verdict: Do not ship. Action taken: merge held per the ship rule; decision returned to Mingxi with three options (ship as is, fold into page copy at body size, revert and do llms.txt only). The two factual findings are rebutted above; the design finding is upheld as a concern and is Mingxi's to weigh.
