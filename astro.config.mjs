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

  redirects: {
    '/asmr-color-reveal-kids': '/calm-color-reveal',
    '/en/asmr-color-reveal-kids': '/en/calm-color-reveal',
    '/en/asmr-color-reveal-kids/privacy-policy': '/en/calm-color-reveal/privacy-policy',
    '/de/asmr-color-reveal-kids': '/de/calm-color-reveal',
    '/de/asmr-color-reveal-kids/datenschutz': '/de/calm-color-reveal/datenschutz',
    '/en/asmr-color-reveal-kids/preregistration': '/en/calm-color-reveal/preregistration',
    '/de/asmr-color-reveal-kids/preregistration': '/de/calm-color-reveal/preregistration',
    '/en/asmr-color-reveal-kids/prereg-terms': '/en/calm-color-reveal/prereg-terms',
    '/de/asmr-color-reveal-kids/prereg-terms': '/de/calm-color-reveal/prereg-terms',
    '/asmr-color-reveal-kids/privacy-policy': '/calm-color-reveal/privacy-policy'
  },

  integrations: [sitemap()]
});
