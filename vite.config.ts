import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { ALL_ROUTES, SITE_URL } from './src/fleet'

/**
 * Emits dist/sitemap.xml (every generated fleet route) and
 * dist/robots.txt at build time, straight from the same fleet data
 * the app renders — the sitemap can never drift from the real pages.
 */
function fleetSeoFiles(): Plugin {
  let outDir = 'dist'
  return {
    name: 'fleet-seo-files',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const urls = ALL_ROUTES.map(
        (r) => `  <url><loc>${SITE_URL}${r.path}</loc></url>`,
      ).join('\n')
      const sitemap =
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
      writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap)
      writeFileSync(
        resolve(outDir, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), fleetSeoFiles()],
})
