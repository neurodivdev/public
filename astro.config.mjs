// @ts-check
import { defineConfig } from 'astro/config';
import { ui, defaultLang } from './src/i18n/ui.ts';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://neurodiv.dev',

  i18n: {
    defaultLocale: defaultLang,
    locales: Object.keys(ui),
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false
    }
  },

  integrations: [sitemap()]
});
