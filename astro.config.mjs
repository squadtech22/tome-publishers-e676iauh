import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://tomepublishers.com',
  // Static by default; only routes that export `prerender = false`
  // (the Resend inquiry endpoint) are rendered on demand.
  output: 'static',
  adapter: vercel(),
  integrations: [
    sitemap({
      // The confirmation page is only meaningful straight after a submission;
      // it should never appear in search results.
      filter: (page) => !page.includes('/inquiry/thank-you'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
