// Copies the pinned Sveltia CMS build (script and its lazy chunks, no source maps)
// from node_modules to public/admin/cms/, served at /admin/cms/.
import { cpSync, rmSync } from 'node:fs';

const from = new URL('../node_modules/@sveltia/cms/dist/', import.meta.url);
const to = new URL('../public/admin/cms/', import.meta.url);
rmSync(to, { recursive: true, force: true });
cpSync(from, to, { recursive: true, filter: src => !src.endsWith('.map') && !src.endsWith('.mjs') });
