// RSS 2.0 and Atom documents for the poems and articles, built from the same list as the site.
import { getWriting } from './writing';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const NAME = 'Mingxi Yan: writing';

const need = (site: URL | undefined): URL => {
  if (!site) throw new Error('Set `site` in astro.config.mjs: the feeds need absolute links.');
  return site;
};

export async function rssXml(siteUrl: URL | undefined): Promise<string> {
  const site = need(siteUrl);
  const items = await getWriting();
  const home = new URL('/personal#writing', site).href;
  const built = new Date().toUTCString();
  const body = items.map((w) => {
    const link = new URL(w.url, site).href;
    return `    <item>
      <title>${esc(w.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>${w.time ? `\n      <pubDate>${new Date(w.time).toUTCString()}</pubDate>` : ''}
      <description>${esc(w.summary)}</description>
    </item>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${NAME}</title>
    <link>${home}</link>
    <description>${NAME}</description>
    <language>en</language>
    <lastBuildDate>${built}</lastBuildDate>
    <atom:link href="${new URL('/rss.xml', site).href}" rel="self" type="application/rss+xml" />
${body}
  </channel>
</rss>
`;
}

export async function atomXml(siteUrl: URL | undefined): Promise<string> {
  const site = need(siteUrl);
  const items = await getWriting();
  const newest = Math.max(0, ...items.map((w) => w.time));
  const updated = new Date(newest || Date.now()).toISOString();
  const body = items.map((w) => {
    const link = new URL(w.url, site).href;
    return `  <entry>
    <title>${esc(w.title)}</title>
    <link href="${link}" />
    <id>${link}</id>
    <updated>${new Date(w.time || newest || Date.now()).toISOString()}</updated>
    <summary>${esc(w.summary)}</summary>
  </entry>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${NAME}</title>
  <link href="${new URL('/personal#writing', site).href}" />
  <link href="${new URL('/atom.xml', site).href}" rel="self" type="application/atom+xml" />
  <id>${new URL('/', site).href}</id>
  <updated>${updated}</updated>
  <author><name>Mingxi Yan</name></author>
${body}
</feed>
`;
}
