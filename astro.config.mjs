// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://PittsIrv.github.io',
  // Uncomment the line below if deploying to a repo that isn't <username>.github.io
  // base: '/your-repo-name',
  redirects: {
    '/academic': '/work',
    '/poker': '/personal',
    '/writing': '/personal',
    '/misc': '/personal',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
