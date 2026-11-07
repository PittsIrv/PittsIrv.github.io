# CSP build check and a fixed poker-variant order (T-0037 follow-ups)

## CSP build check
- `npm run build` now ends with `node scripts/check-csp.mjs`. The build fails when a built page has no policy, has more than one, or has one that differs from the layout's.
- The policy is defined once, in `src/csp.mjs`. The layout and the check both import it, so they cannot drift apart.
- Pages the check skips:
  - Redirect pages: a meta refresh and no script.
  - `/admin`: it has its own policy.
- The check reads `PUBLIC_STANDIN_URL` the way the build does, so it expects the same MeeTwo API origin.
- Tested:
  - The real build passes, with 9 pages checked.
  - Removing the policy from one page fails the build.
  - A build made with one API address and checked against another fails, and names the page.

## Poker-variant order
- `/personal` read the collection in whatever order the file system returned. The order inside each group changed from build to build.
- Variants are now sorted by file name within each group (Original, Learned). This is the order of the folder, `src/content/poker-games/`, and it is also exactly the order the live site showed before this change. So nothing visible changes on today's build.
- The sort compares plain strings rather than using a locale, so the result does not depend on the machine.
- A new variant appears in file-name order. There is no order field to fill in.
