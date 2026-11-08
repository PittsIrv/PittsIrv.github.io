// One ordered list of poems and articles for the feeds, the previous/next links and the reading time.
import { getCollection } from 'astro:content';
import { excerpt } from './excerpt';

export type Writing = {
  kind: 'poem' | 'article';
  slug: string;
  url: string;
  title: string;
  date: string;
  time: number;
  group: string;
  summary: string;
  minutes?: number;
};

// The site editor stores dates as text ("November 10, 2022"). An unreadable date sorts last and is left out of the feeds' date fields.
export function parseDate(text: string): number {
  const parsed = Date.parse(`${text} 12:00:00 GMT`);
  return Number.isNaN(parsed) ? 0 : parsed;
}

// About 200 words a minute; Chinese and Japanese characters count at about 400 a minute.
export function readingMinutes(markdown: string): number {
  const cjk = (markdown.match(/[぀-ヿ㐀-鿿]/g) ?? []).length;
  const words = markdown.replace(/[぀-ヿ㐀-鿿]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200 + cjk / 400));
}

export async function getWriting(): Promise<Writing[]> {
  const poems = (await getCollection('poems')).filter((p) => !p.data.draft).map((p): Writing => ({
    kind: 'poem', slug: p.slug, url: `/poems/${p.slug}/`, title: p.data.title, date: p.data.date,
    time: parseDate(p.data.date), group: `poem:${p.data.category}`, summary: excerpt(p.body, 300),
  }));
  const articles = (await getCollection('articles')).filter((a) => !a.data.draft).map((a): Writing => ({
    kind: 'article', slug: a.slug, url: `/articles/${a.slug}/`, title: a.data.title, date: a.data.date,
    time: parseDate(a.data.date), group: 'article', summary: excerpt(a.body, 300), minutes: readingMinutes(a.body),
  }));
  return [...poems, ...articles].sort((x, y) => y.time - x.time || x.title.localeCompare(y.title));
}

// Previous is the next older piece in the same group (poems share a category; articles share one group), next is the next newer.
export async function neighbours(kind: Writing['kind'], slug: string) {
  const all = await getWriting();
  const here = all.find((w) => w.kind === kind && w.slug === slug);
  if (!here) return { previous: undefined, next: undefined };
  const group = all.filter((w) => w.group === here.group);
  const i = group.indexOf(here);
  return { previous: group[i + 1], next: group[i - 1] };
}
