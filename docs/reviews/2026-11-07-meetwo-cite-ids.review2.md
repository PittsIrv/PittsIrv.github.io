# Independent review — 2026-11-07 03:31

## gemini-3.1-pro-preview

1. **Correctness risks**
   - Silently dropping validly formatted citation IDs that exceed 64 characters could cause the backend to lose context for a specific turn rather than surfacing an integration error. Evidence: `if (id !== null && id.length > 0 && id.length <= MAX_ID) ids.push(id);`

2. **Hidden assumptions**
   - The design assumes that if the backend ever returns more than 20 citations, it is perfectly safe for the client to silently truncate them before reflecting them back in the history. Evidence: `return ids.slice(0, MAX_CITES);`

3. **Design decisions you would challenge, and the alternative you would weigh**
   - Writing a bespoke script with raw assertions and `console.log` for testing. Since the worker correctly noted the environment uses Node 20, I would weigh using Node's built-in native test runner (`node --test scripts/check-meetwo-request.mjs`), which requires zero extra dependencies like Vitest but provides standardized test reporting. Evidence: `"build": "... && node scripts/check-meetwo-request.mjs"`

4. **What a skeptical PI or senior engineer would ask first**
   - If the API limits inputs to 20 IDs of at most 64 characters each, does the API strictly enforce these exact same limits on its own *output*? If it doesn't, this client-side filtering is silently modifying backend state before sending it back. Evidence: `Ids that are not strings or are over 64 characters are dropped; at most 20 are kept`

5. **Documentation gaps**
   - The package was sufficient.

6. **What is done well**
   - Gracefully migrating existing user session data by mapping and filtering on load, ensuring returning visitors are not stuck with a broken widget. Evidence: `const history = s.history.map(toTurn).filter((t: Turn | null): t is Turn => t !== null);`

**Verdict**: Ship. 
The client currently hard-crashes on subsequent turns because it is violating a strict API contract, making this an immediate blocker. The fix correctly normalizes the payload to strings and guarantees the limits are respected, while also introducing a backward-compatible mechanism to heal existing corrupt session storage. While silently dropping data (truncation to 20 / length limit) hides potential future API inconsistencies, it definitively resolves the 400 errors and stops the catastrophic failure loop.

_usage: {"promptTokenCount": 4575, "candidatesTokenCount": 532, "totalTokenCount": 8054, "promptTokensDetails": [{"modality": "TEXT", "tokenCount": 4575}], "thoughtsTokenCount": 2947, "serviceTier": "standard"}_
