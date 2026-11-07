// Renders the 1200x630 link-preview images in public/og/ from the site's own font and colours.
// Needs a local Chrome: CHROME_PATH=/path/to/chrome node scripts/generate-og.mjs
// Optional: pages without their own image use og/home.png. Re-run to give new pages, poems or articles their own; commit the PNGs.
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const chrome = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const font = resolve('node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-normal.woff2');
const out = resolve('public/og');
const work = join(tmpdir(), 'og-render');
mkdirSync(out, { recursive: true });
mkdirSync(work, { recursive: true });

const titleOf = (file) => readFileSync(file, 'utf8').match(/^title:\s*"?(.+?)"?\s*$/m)?.[1];
const slugs = [
  { slug: 'home', title: 'Mingxi Yan', sub: 'AI Systems Engineer' },
  { slug: 'work', title: 'Work' },
  { slug: 'about', title: 'About' },
  { slug: 'projects', title: 'Projects' },
  { slug: 'personal', title: 'Personal' },
  { slug: 'personal-poker', title: "Dealer's Choice" },
  { slug: 'meetwo', title: 'MeeTwo' },
];
for (const [dir, prefix] of [['poems', 'poems'], ['articles', 'articles']]) {
  for (const f of readdirSync(`src/content/${dir}`).filter((n) => n.endsWith('.md'))) {
    slugs.push({ slug: `${prefix}-${f.replace(/\.md$/, '')}`, title: titleOf(`src/content/${dir}/${f}`) });
  }
}

const page = ({ title, sub }) => `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:S;src:url("file://${font}");font-weight:200 900}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#fbfcff;color:#17243c;font-family:S,Georgia,serif;position:relative;overflow:hidden}
.bar{position:absolute;left:80px;top:80px;width:72px;height:6px;background:#244fc2}
.wm{position:absolute;left:80px;top:112px;font-size:34px;font-weight:600;letter-spacing:-.04em}
h1{position:absolute;left:80px;right:80px;bottom:150px;font-size:${title.length > 22 ? 84 : 112}px;font-weight:450;line-height:1.05;letter-spacing:-.045em}
.sub{position:absolute;left:80px;bottom:90px;font-size:34px;color:#56627a;letter-spacing:-.01em}
.rule{position:absolute;left:80px;right:80px;bottom:60px;height:1px;background:#d6deec}
</style><div class="bar"></div><div class="wm">Mingxi Yan.</div><h1>${title.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</h1>${sub ? `<div class="sub">${sub}</div>` : ''}<div class="rule"></div>`;

for (const s of slugs) {
  const html = join(work, `${s.slug}.html`);
  writeFileSync(html, page(s));
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--window-size=1200,630', '--virtual-time-budget=3000', `--screenshot=${join(out, `${s.slug}.png`)}`, `file://${html}`], { stdio: 'ignore' });
  console.log('og', s.slug);
}
rmSync(work, { recursive: true, force: true });
