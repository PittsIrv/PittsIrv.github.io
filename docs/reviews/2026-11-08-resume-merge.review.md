# Independent review — 2026-11-08 16:03

## gemini-3.1-pro-preview

1. Correctness risks:
- **Privacy and consistency risk with the hosted resume.** The live site exposes a phone number and hosts an outdated resume that lacks the newly added AlpSoft experience. Evidence: `public/resume.pdf is an older version (no AlpSoft, no projects) and shows a phone number on the public site.`
- **Undocumented data structure modifications.** `src/data/work.json` is heavily modified, but if the Astro application strictly validates it, structural changes (like dropping `compact: true` or placing `"id": "alpsoft"` at the end) could unexpectedly break the build or page generation. Evidence: `All content lives in src/content/ collections... except the projects gallery, which reads src/data/projects.json`

2. Hidden assumptions:
- **UI scalability for dense lists.** The design assumes the site's layout can gracefully render a massive increase in tags and a heavily expanded 7-group skills list without breaking mobile views or looking cluttered. Evidence: `Seven skills groups in a two-column grid leaves the last row half full; accepted over a 30-item "Backend & infrastructure" group.`
- **Cohesiveness of a dual-persona summary.** Concatenating two completely distinct professional profiles into a single introduction assumes readers (like recruiters) will understand the dual narrative rather than finding it unfocused. Evidence: `"intro": "AI engineering and research: agents... Software engineering: full-stack web apps..."`

3. Design decisions you would challenge, and the alternative you would weigh:
- **Leaving the outdated PDF live.** Refusing to touch `public/resume.pdf` because it's "Mingxi's call" actively harms the user by leaving PII (phone number) and missing job history public. Alternative: Temporarily remove or comment out the PDF download link in the UI until Mingxi provides the updated file. Evidence: `public/resume.pdf not replaced | Rule | Replacing it is Mingxi's call.`
- **Defaulting to old site wording for conflicts.** Keeping the site's old titles when the two new resumes conflict (e.g., "Enterview" vs "Enterview.ai") means the title might not align with the newly merged bullets. Alternative: Default to the most recently updated resume's wording, or block the commit to prompt the user to resolve it first. Evidence: `Conflicting facts not changed (list below) | Rule | The brief: where the resumes disagree, stop and report.`

4. What a skeptical PI or senior engineer would ask first:
- Did the CI build (`npm run build`) actually pass after modifying `work.json`, given that the file isn't documented as part of the schema? Evidence: `npm run build — production build to ./dist/ (must pass before committing)`
- Are we inadvertently making the candidate look unfocused by unioning highly targeted resumes, defeating the strategic purpose of having tailored resumes in the first place? Evidence: `If two experience are framing differently, combine all the skills from my different resume.`

5. Documentation gaps:
- `CLAUDE.md` explicitly lists `src/data/projects.json` as the only JSON data exception, completely failing to document `src/data/work.json`, its schema, or how the Astro templates consume it. Evidence: `All content lives in src/content/ collections... except the projects gallery, which reads src/data/projects.json`.

6. What is done well:
- The decision record is outstanding; the exhaustive line-by-line mapping of every changed bullet and tag to its source resume makes reviewing and verifying the complex merge incredibly easy. Evidence: `Mapping (every changed line → source)`

**Verdict:** 
Ship with fixes. The content merge meticulously follows the author's instructions to union the resumes, and the decision record is a masterclass in traceability and communicating blockers. However, the undocumented nature of `work.json` creates a maintenance blind spot, and deliberately leaving an outdated resume with a phone number live on the site is an unacceptable privacy and professional risk. Hide the PDF download link until a new file is provided, update `CLAUDE.md` to document `work.json`, and ship.

_usage: {"promptTokenCount": 8409, "candidatesTokenCount": 889, "totalTokenCount": 14391, "promptTokensDetails": [{"modality": "TEXT", "tokenCount": 8409}], "thoughtsTokenCount": 5093, "serviceTier": "standard"}_
