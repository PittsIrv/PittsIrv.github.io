// Fails the build when the site editor at /admin could not sign in or is no longer locked down.
// Reads the built page and config from dist/ and the pinned CMS bundle from public/admin/cms/.
// Usage: node scripts/check-admin.mjs [distDir]
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2] ?? 'dist';
const html = readFileSync(join(dist, 'admin/index.html'), 'utf8');
const yml = readFileSync(join(dist, 'admin/config.yml'), 'utf8');
const problems = [];
const need = (ok, msg) => { if (!ok) problems.push(msg); };

// Page is never indexed.
need(/<meta name="robots" content="noindex, nofollow">/.test(html), 'admin/index.html lost its noindex tag');

// Policy: named hosts only, nothing broad, and the GitHub backend's own host is reachable.
const csp = html.match(/http-equiv="Content-Security-Policy" content="([^"]*)"/)?.[1] ?? '';
const dirs = Object.fromEntries(csp.split(';').map((d) => d.trim().split(/\s+/)).filter((d) => d[0]).map(([k, ...v]) => [k, v]));
const allowedHosts = new Set(['https://api.github.com', 'https://www.githubstatus.com', 'https://avatars.githubusercontent.com', 'https://cdn.jsdelivr.net']);
need(csp !== '', 'admin/index.html has no Content-Security-Policy');
need(!/\*|unsafe-eval/.test(csp), 'admin CSP contains a wildcard or unsafe-eval');
need(dirs['script-src']?.join(' ') === "'self' blob:", `admin script-src must be 'self' blob:, got ${dirs['script-src']?.join(' ')}`);
for (const [name, values] of Object.entries(dirs)) {
  for (const v of values.filter((x) => /^https?:/.test(x))) need(allowedHosts.has(v), `admin CSP ${name} lists an unreviewed host ${v}`);
}
need(dirs['connect-src']?.includes('https://api.github.com'), 'admin connect-src must allow https://api.github.com (sign-in and every save)');
need(dirs['img-src']?.includes('https://avatars.githubusercontent.com'), 'admin img-src must allow https://avatars.githubusercontent.com');

// Config: GitHub backend on this site's own repository and branch.
const repo = yml.match(/^\s+repo:\s*(\S+)/m)?.[1];
need(/^\s+name:\s*github\s*$/m.test(yml), 'config.yml backend is not github');
need(/^([^/]+)\/\1\.github\.io$/i.test(repo ?? ''), `config.yml repo "${repo}" is not a user site repository (owner/owner.github.io)`);
need(/^\s+branch:\s*main\s*$/m.test(yml), 'config.yml branch is not main');

// The unusable OAuth button stays hidden, and the selector still matches the pinned bundle's button.
need(html.includes('button[data-label*="GitHub"] { display: none; }'), 'admin page no longer hides the "Sign In with GitHub" (OAuth) button');
const bundle = readFileSync(new URL('../public/admin/cms/sveltia-cms.js', import.meta.url), 'utf8');
need(bundle.includes('Sign In with '), 'CMS bundle no longer has the "Sign In with" label the hide rule targets');
need(bundle.includes('Sign In Using Access Token'), 'CMS bundle no longer offers token sign-in');
need(readdirSync(new URL('../public/admin/cms/', import.meta.url)).includes('chunks'), 'CMS lazy chunks were not copied');

if (problems.length) { console.error(`Admin check failed:\n- ${problems.join('\n- ')}`); process.exit(1); }
console.log('Admin check: noindex, strict CSP with named hosts, GitHub repo/branch, token sign-in only.');
