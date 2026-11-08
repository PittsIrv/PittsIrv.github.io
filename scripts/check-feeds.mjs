// Fails the build when a feed is missing or lists a different number of pieces than the built poem and article pages,
// or when a built piece's link is absent from a feed. Usage: node scripts/check-feeds.mjs [distDir]
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2] ?? 'dist';
const pages = ['poems', 'articles'].flatMap((dir) =>
  existsSync(join(dist, dir)) ? readdirSync(join(dist, dir)).filter((n) => existsSync(join(dist, dir, n, 'index.html'))).map((n) => `/${dir}/${n}/`) : []);
const problems = [];
for (const [file, open] of [['rss.xml', '<item>'], ['atom.xml', '<entry>']]) {
  if (!existsSync(join(dist, file))) { problems.push(`${file}: missing`); continue; }
  const xml = readFileSync(join(dist, file), 'utf8');
  const n = xml.split(open).length - 1;
  if (n !== pages.length) problems.push(`${file}: ${n} entries for ${pages.length} pages`);
  for (const p of pages) if (!xml.includes(`${p}</`) && !xml.includes(`${p}"`)) problems.push(`${file}: ${p} not listed`);
}
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log(`Feed check: rss.xml and atom.xml list all ${pages.length} poems and articles.`);
