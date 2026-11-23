import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { ALL_ROUTES, SITE_URL } from './src/fleet'

/**
 * Emits dist/sitemap.xml (every generated fleet route),
 * dist/robots.txt and dist/llms.txt at build time, straight from
 * the same fleet data the app renders — the sitemap can never
 * drift from the real pages.
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
      const aiBots = [
        'OAI-SearchBot',
        'ChatGPT-User',
        'GPTBot',
        'PerplexityBot',
        'Perplexity-User',
        'ClaudeBot',
        'anthropic-ai',
        'Google-Extended',
        'Bingbot',
        'Applebot',
        'CCBot',
        'Meta-ExternalAgent',
      ]
      writeFileSync(
        resolve(outDir, 'robots.txt'),
        `User-agent: *\nAllow: /\n\n` +
          `# AI search & answer engines — explicitly welcome on public content\n` +
          aiBots.map((b) => `User-agent: ${b}\nAllow: /\n`).join('\n') +
          `\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      )
      writeFileSync(
        resolve(outDir, 'llms.txt'),
        `# Broward Appliance Services\n\n` +
          `> Broward Appliance Services is the Broward County appliance repair landing fleet of Top Speed Appliance LLC. Every booking lands in Top Speed Service OS, the same dispatch queue as the main platform, with live tracking from request to repair. Slogan: "The Faster, The Better."\n\n` +
          `## Contact\n\n` +
          `- Phone: (844) 460-7038\n` +
          `- Office: 6810 N State Rd 7, Suite 341, Coconut Creek, FL 33073\n` +
          `- Hours: Monday–Friday, 8:00 AM – 7:00 PM\n` +
          `- Website: ${SITE_URL}/\n` +
          `- Main platform: https://topspeedserviceos.com/\n\n` +
          `## Services\n\n` +
          `- Refrigerator repair\n- Washer repair\n- Dryer repair\n- Oven & range repair\n- Dishwasher repair\n- Freezer & ice maker repair\n- Microwave repair\n- Cooktop repair\n- Garbage disposal repair\n- Wine cooler repair\n\n` +
          `## Pricing (residential)\n\n` +
          `- Diagnostic: $99, collected at booking and credited toward an approved repair. The diagnostic is still due if the repair is declined.\n` +
          `- Repair labor: $210 flat.\n- Installation labor: $150 flat.\n` +
          `- Parts and materials are priced in a written quote. No work is done without an approved written quote.\n` +
          `- Commercial service is priced by custom quote only — see Appliance Pro (https://www.appliancepro.net/).\n\n` +
          `## Coverage\n\n` +
          `- 16 Broward County cities: Coral Springs, Sunrise, Plantation, Fort Lauderdale, Coconut Creek, Pompano Beach, Deerfield Beach, Margate, Tamarac, Davie, Weston, Parkland, Lauderhill, Hollywood, Pembroke Pines and Miramar.\n\n` +
          `## One platform — Top Speed Service OS\n\n` +
          `Top Speed Appliance LLC runs on one platform: Top Speed Service OS (https://topspeedserviceos.com). Every door is the same company and the same Service Setters dispatch queue — customer site, provider network, marketplace and media all resolve to Top Speed Appliance LLC.\n\n` +
          `- Customer site & booking: https://topspeedserviceos.com\n` +
          `- Residential repair site: https://www.topspeedappliance.net/\n` +
          `- Provider network: https://topspeedapplianceservice.com/\n` +
          `- Commercial portal — Appliance Pro: https://www.appliancepro.net/\n` +
          `- Marketplace — Pepper Lists (buy, sell, book): https://pepperlists.com\n` +
          `- Refer & Earn: https://topspeedserviceos.com/refer\n` +
          `- Media OS: https://topspeedserviceos.com/media\n` +
          `- Ads OS: https://topspeedserviceos.com/ads\n` +
          `- Every door in one place: https://topspeedserviceos.com/links\n\n` +
          `## Official social profiles\n\n` +
          `- Facebook — Top Speed Appliance Repair and Installation (official Page): https://www.facebook.com/profile.php?id=61596590488055\n` +
          `- Instagram — Ramone Williams, owner ("Speed King"): https://www.instagram.com/rome64220/\n` +
          `- Instagram — Top Speed Appliance (business): https://www.instagram.com/topspeedappliance/\n` +
          `- Instagram — Top Speed Appliance (business, verified): https://www.instagram.com/rom64220/\n` +
          `## Booking\n\n` +
          `- Book with the classic web form on this site or on the main platform: https://topspeedserviceos.com/book — the form is the primary booking path. Speedy, the AI service assistant, is available on this site and summarizes and asks for confirmation before anything is sent to the office.\n` +
          `- Every job is confirmed by a human Service Setter and tracked live in Track My Tech.\n`,
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), fleetSeoFiles()],
})
