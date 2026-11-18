# Broward Appliance Services — Landing Page Fleet

A data-driven landing page **system** for Top Speed Appliance, built for
**browardapplianceservice.com** (primary) and **browardappliancepros.com**.

One data source (`src/fleet.ts`) generates the entire fleet:

| Page type | Count | Example route |
| --- | --- | --- |
| Hub, services index, areas index, booking, system index | 5 | `/`, `/services`, `/areas-served`, `/book`, `/system` |
| Service pages | 10 | `/refrigerator-repair` |
| City pages | 16 | `/appliance-repair-coral-springs` |
| Service × city landing pages | 160 | `/refrigerator-repair-coral-springs` |
| **Total generated routes** | **191** | all listed in the in-app `/system` index |

## How it works

- **Routing** — real URL paths via the History API; a route map is generated
  from the same fleet data, and `vercel.json` rewrites everything except
  assets/sitemap/robots to the SPA entry.
- **SEO** — every route gets a unique title + meta description + canonical
  from `seoFor()` in `src/fleet.ts`. A Vite plugin emits `dist/sitemap.xml`
  (all 191 routes) and `dist/robots.txt` at build time from the same data,
  so the sitemap cannot drift from the real pages.
- **Booking** — the booking form (on `/book` and embedded on service, city
  and combo pages) really submits into Top Speed Service OS using the same
  Speedy booking intake as the Total Home Appliance Repair company site's
  live form: `POST https://top-speed-service-os.vercel.app/api/v1/speedy/book`
  with the field-for-field payload `customer{name, phone}`, city, zip,
  appliance (service name), issue, preferredWindow, source `WEB_FORM`,
  via `browardapplianceservice.com`, the landing `page` path, and
  first-touch attribution (utmSource/utmMedium/utmCampaign +
  gclid/fbclid/msclkid) captured from the URL. On success the customer
  sees the Service OS reference code; on failure the UI falls back
  honestly to phone/email. A human Service Setter confirms every booking
  by phone before dispatch.
- **System Index** (`/system`) — admin-style dashboard listing every
  generated page with its type, title and URL, with search + type filters.

## Honesty rules (enforced in content, audited in source)

- No prices or dollar amounts anywhere — pricing is confirmed by the setter
  at booking time.
- No business hours, street addresses, ratings, review counts, technician
  counts, guarantees, or licensing/insurance claims.
- Only contact facts: phone **954-931-7997**, email
  **service@topspeedappliance.net**.

## Develop

```bash
npm install
npm run dev     # local dev server
npm run build   # tsc + vite build → dist/ (incl. sitemap.xml, robots.txt)
npm run preview # serve the production build locally
```

Design: deep teal + amber, Space Grotesk / Inter, custom pin-and-bolt logo.
