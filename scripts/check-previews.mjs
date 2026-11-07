// Fails the build when a built page lacks a title, a description, or an Open Graph/Twitter image
// (the image tag must be present and the file must exist in the build). Redirect pages and /admin are skipped.
// Usage: node scripts/check-previews.mjs [distDir]
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const dist = process.argv[2] ?? 'dist';
const htmlFiles = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  if (statSync(path).isDirectory()) return htmlFiles(path);
  return name.endsWith('.html') ? [path] : [];
});
// Reads the content of the first <meta> whose attr equals key, whatever the attribute order.
const meta = (html, attr, key) => {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const attrs = Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1].toLowerCase(), m[2]]));
    if (attrs[attr] === key && attrs.content?.trim()) return attrs.content.trim();
  }
};

const problems = [];
let checked = 0;
for (const file of htmlFiles(dist)) {
  const page = relative(dist, file).split(sep).join('/');
  if (page.startsWith('admin/')) continue;
  const html = readFileSync(file, 'utf8');
  if (/<meta http-equiv="refresh"/i.test(html) && !/<script/i.test(html)) continue;
  checked++;
  if (!html.match(/<title>([^<]+)<\/title>/)?.[1]?.trim()) problems.push(`${page}: no title`);
  if (!meta(html, 'name', 'description')) problems.push(`${page}: no meta description`);
  for (const [attr, key] of [['property', 'og:image'], ['property', 'twitter:image']]) {
    const url = meta(html, attr, key);
    if (!url) { problems.push(`${page}: no ${key}`); continue; }
    if (!existsSync(join(dist, new URL(url).pathname))) problems.push(`${page}: ${key} file missing (${url})`);
  }
  // A page with its own committed image must use it (guards the layout's fallback against a wrong working directory).
  const slug = page.replace(/(^|\/)index\.html$/, '').replace(/\//g, '-') || 'home';
  const own = `public/og/${slug}.png`;
  if (existsSync(own) && !meta(html, 'property', 'og:image')?.endsWith(`/og/${slug}.png`)) problems.push(`${page}: ${own} exists but og:image does not use it`);
}
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log(`Preview check: ${checked} pages have a title, description and preview image.`);
