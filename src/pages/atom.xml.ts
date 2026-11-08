import type { APIRoute } from 'astro';
import { atomXml } from '../lib/feed';

export const GET: APIRoute = async ({ site }) =>
  new Response(await atomXml(site!), { headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' } });
