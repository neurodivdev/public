// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://neurodiv.dev',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false
    }
  },
  redirects: {
    '/public/asmr-color-reveal-kids/privacy-policy.html': '/en/asmr-color-reveal-kids/privacy-policy'
  },

  integrations: [sitemap()]
});
