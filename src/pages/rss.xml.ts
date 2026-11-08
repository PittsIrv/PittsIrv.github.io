import type { APIRoute } from 'astro';
import { rssXml } from '../lib/feed';

export const GET: APIRoute = async ({ site }) =>
  new Response(await rssXml(site!), { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
