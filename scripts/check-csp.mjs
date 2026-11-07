// Fails the build when a built page has no Content-Security-Policy meta, more than one,
// or one that differs from the layout's policy. Redirect pages (a meta refresh and a link only)
// and /admin (its own, separate policy) are skipped.
// Usage: node scripts/check-csp.mjs [distDir]   (reads PUBLIC_STANDIN_URL like the build does)
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { loadEnv } from 'vite';
import { buildCsp } from '../src/csp.mjs';
import config from '../astro.config.mjs';

const dist = process.argv[2] ?? 'dist';
const expected = buildCsp(loadEnv('production', process.cwd(), 'PUBLIC_').PUBLIC_STANDIN_URL, config.site);

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return name.endsWith('.html') ? [path] : [];
  });
}

const problems = [];
let checked = 0;
for (const file of htmlFiles(dist)) {
  const page = relative(dist, file).split(sep).join('/');
  if (page.startsWith('admin/')) continue;
  const html = readFileSync(file, 'utf8');
  if (/<meta http-equiv="refresh"/i.test(html) && !/<script/i.test(html)) continue;
  checked++;
  const policies = [...html.matchAll(/<meta\b[^>]*>/gi)]
    .map((m) => m[0])
    .filter((tag) => /http-equiv=["']?Content-Security-Policy/i.test(tag))
    .map((tag) => (tag.match(/content="([^"]*)"/i)?.[1] ?? '').replaceAll('&#39;', "'"));
  if (policies.length !== 1) problems.push(`${page}: ${policies.length} CSP meta tags`);
  else if (policies[0] !== expected) problems.push(`${page}: CSP differs from the layout's\n  got:      ${policies[0]}\n  expected: ${expected}`);
}

if (problems.length) {
  console.error(`CSP check failed:\n${problems.join('\n')}`);
  process.exit(1);
}
console.log(`CSP check: ${checked} pages carry the layout's policy.`);
