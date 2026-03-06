# Womaniya — Setup, Deployment & Integration Guide

## Table of Contents
- [Local Development](#local-development)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [Image Storage](#image-storage)
- [Authentication](#authentication)
- [Internationalization](#internationalization)
- [WhatsApp Integration](#whatsapp-integration)
- [SEO & Marketing Integrations](#seo--marketing-integrations)
- [Deployment](#deployment)
- [Performance](#performance)
- [Caching & Invalidation](#caching--invalidation)
- [Admin Panel Guide](#admin-panel-guide)
- [Troubleshooting](#troubleshooting)

---

## Local Development

### Prerequisites
- Node.js 20+
- pnpm (`npm install -g pnpm`)
- Vercel CLI (`pnpm add -g vercel`) — for pulling env vars

### First-time setup

```bash
# 1. Clone
git clone https://github.com/Akashdeep-Patra/womaniya.git
cd womaniya

# 2. Install
pnpm install

# 3. Pull environment variables from Vercel
vercel link          # Links to your Vercel project
vercel env pull .env.local

# 4. Run migrations (first time only)
pnpm db:migrate

# 5. Start dev server
pnpm dev
```

- Storefront: [localhost:5001/en](http://localhost:5001/en)
- Admin: [localhost:5001/en/admin/login](http://localhost:5001/en/admin/login)

---

## Environment Variables

Set in Vercel Dashboard → Settings → Environment Variables.

### Auto-added by Vercel Storage

| Variable | Source |
|---|---|
| `POSTGRES_URL` | Vercel Postgres (Neon) |
| `POSTGRES_URL_NON_POOLING` | Vercel Postgres |
| `POSTGRES_USER` | Vercel Postgres |
| `POSTGRES_PASSWORD` | Vercel Postgres |
| `POSTGRES_HOST` | Vercel Postgres |
| `POSTGRES_DATABASE` | Vercel Postgres |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob |

### Required — set manually

| Variable | Description | Example |
|---|---|---|
| `AUTH_SECRET` | NextAuth JWT secret | `openssl rand -base64 32` |
| `ADMIN_EMAIL` | Admin login email | `admin@womaniya.in` |
| `ADMIN_PASSWORD` | Admin login password | Use a strong password |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number (country code, no +) | `919143161829` |
| `NEXT_PUBLIC_APP_URL` | Live site URL | `https://womaniyakolkata.in` |

### Rate Limiting (recommended)

| Variable | Description |
|---|---|
| `UPSTASH_REDIS_REST_URL` | Upstash Redis URL |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis token |

Get these free at [upstash.com](https://upstash.com) — protects login and upload endpoints from brute force.

### Optional — Marketing Integrations

| Variable | Description |
|---|---|
| `GOOGLE_SITE_VERIFICATION` | Google Search Console verification code |
| `BING_SITE_VERIFICATION` | Bing Webmaster Tools verification code |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID (e.g. `G-XXXXXXXXXX`) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta/Facebook Pixel ID (e.g. `1234567890123456`) |

---

## Database

### Schema

Defined in `db/schema.ts`. Tables: `products`, `product_images`, `categories`, `collections`, `collection_products`, `campaigns`, `banners`, `pages`, `page_sections`, `testimonials`, `media_assets`, `settings`, `activity_log`, `admins`.

Status enums defined in `db/enums.ts` — products use `draft | published`, collections use `draft | scheduled | live | archived`, etc.

### Migration Workflow

Womaniya uses **file-based migrations**, not `db:push`. Every schema change creates a versioned SQL file that's committed to git and applied automatically on Vercel deploy.

```
Schema change flow:

  1. Edit db/schema.ts
  2. pnpm db:generate     → creates SQL in drizzle/
  3. git add drizzle/
  4. git push             → Vercel runs migrations → builds app
```

### Commands

```bash
pnpm db:generate    # Generate migration files after schema changes
pnpm db:migrate     # Apply migrations locally
pnpm db:studio      # Visual DB browser (Drizzle Studio)
pnpm db:push        # Direct schema push — DEV ONLY, no migration file
pnpm db:seed        # Seed sample products, categories, etc.
```

> **Never use `db:push` in production.** It bypasses migration history.

### How auto-migration works on deploy

`package.json` has:
```json
"vercel-build": "tsc --noEmit && next build"
```

The `scripts/migrate.ts` runs before build, connecting to Postgres and applying any unapplied SQL files from `drizzle/`. Safe to run multiple times — Drizzle tracks applied migrations in `__drizzle_migrations`.

---

## Image Storage

Product images and media are stored in **Vercel Blob** (public, no auth needed to render).

### Upload flow
1. Admin picks file → `CameraUpload` component compresses to WebP client-side
2. Uploads to `POST /api/upload` → stored in Vercel Blob
3. URL saved in `product_images` or `media_assets` table

### Image optimization
- Client-side WebP conversion before upload (`browser-image-compression`)
- Next.js `<Image>` serves optimized formats with `minimumCacheTTL: 1 year`
- Remote patterns configured in `next.config.ts` for `*.public.blob.vercel-storage.com`

---

## Authentication

Admin-only auth via **NextAuth v5** credentials provider.

- No user registration — credentials are set via env vars (`ADMIN_EMAIL`, `ADMIN_PASSWORD`)
- JWT session stored in HTTP-only cookie
- `proxy.ts` protects all `/admin` routes (redirects to login if no session)
- Rate limited via Upstash Redis (if configured)

### To change the admin password
Update `ADMIN_PASSWORD` in Vercel → Settings → Environment Variables → Redeploy.

### Multi-admin support
The `admins` table in the database supports multiple admins with bcrypt-hashed passwords. The env var credentials act as the root admin.

---

## Internationalization

### How it works

- Locales: `en` (English), `bn` (Bengali)
- Route structure: `/[locale]/...` (e.g. `/en/shop`, `/bn/shop`)
- Translation files: `messages/en.json`, `messages/bn.json`
- Library: `next-intl` v4

### Adding a new translation

1. Add to both JSON files:
```json
// messages/en.json
{ "shop": { "new_arrival": "New Arrival" } }

// messages/bn.json
{ "shop": { "new_arrival": "নতুন আগমন" } }
```

2. Use in components:
```tsx
// Server component
const t = await getTranslations({ locale, namespace: 'shop' });
<p>{t('new_arrival')}</p>

// Client component
const t = useTranslations('shop');
<p>{t('new_arrival')}</p>
```

### Content overrides
Admins can override any translation key from the admin panel (Admin → Site Copy) without deploying code. Overrides are stored in the `content_overrides` table and take precedence over JSON files.

---

## WhatsApp Integration

WhatsApp is the primary ordering channel. The integration is in `lib/whatsapp.ts`.

### How it works
- **Product page** — "Order on WhatsApp" button sends pre-filled message with product name, price, selected size/color, SKU, and page URL
- **Floating button** — Context-aware on every page (product view, shop browsing, category, about)
- **Bilingual messages** — English or Bengali based on current locale

### Configuration
Set `NEXT_PUBLIC_WHATSAPP_NUMBER` env var (format: country code + number, no `+`).

Example: `919143161829` for +91 91431 61829

### Message templates
All templates are in `lib/whatsapp.ts`. Each function generates a contextual message:
- `productOrderUrl()` — ordering a specific product
- `productViewUrl()` — enquiring about a product
- `shopBrowsingUrl()` — browsing the shop (optionally with category)
- `categoryEnquiryUrl()` — asking about a category
- `aboutPageUrl()` — general enquiry from the about page
- `generalEnquiryUrl()` — fallback for any page

---

## SEO & Marketing Integrations

### Already built-in (no setup needed)

| Feature | Details |
|---|---|
| **Sitemap** | Dynamic `sitemap.xml` with all products, categories, collections, campaigns, stories. Includes `alternates` for both locales. |
| **Robots.txt** | Blocks `/admin` and `/api`. Points to sitemap. |
| **Open Graph** | Per-page OG title, description, images. Dynamic OG image generation for products and stories. |
| **Twitter Cards** | `summary_large_image` on all pages. |
| **JSON-LD** | Organization, Store (with address, geo, hours), WebSite (with SearchAction), Product (on product pages), BreadcrumbList. |
| **Canonical URLs** | Set on all pages with `alternates.languages` for hreflang. |
| **Vercel Analytics** | Built-in, auto-tracks page views and web vitals. |
| **Vercel Speed Insights** | Real user metrics (FCP, LCP, CLS, INP). |

### Google Search Console (free)

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your domain, choose "URL prefix" method
3. Copy the meta tag verification code (just the content value)
4. Set `GOOGLE_SITE_VERIFICATION` env var in Vercel → Redeploy
5. Verify in Search Console, then submit your sitemap: `https://womaniyakolkata.in/sitemap.xml`

### Bing Webmaster Tools (free)

1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Import from Google Search Console (easiest) or add manually
3. Set `BING_SITE_VERIFICATION` env var → Redeploy

### Google Analytics 4 (free)

1. Go to [analytics.google.com](https://analytics.google.com) → Create property
2. Get your Measurement ID (`G-XXXXXXXXXX`)
3. Set `NEXT_PUBLIC_GA_ID` env var → Redeploy
4. The app uses `@next/third-parties` (already in dependencies) for optimized loading

> **Note:** GA4 integration code is ready in the codebase — just needs the env var to activate.

### Meta Pixel / Facebook Pixel (free)

Track visitors for Instagram/Facebook retargeting. Free to set up — you only pay if you run ads.

1. Go to [business.facebook.com](https://business.facebook.com) → Events Manager → Create Pixel
2. Copy the Pixel ID (numeric, e.g. `1234567890123456`)
3. Set `NEXT_PUBLIC_META_PIXEL_ID` env var → Redeploy

**What it tracks:**
- `PageView` — every page visit
- `ViewContent` — product page views
- `Contact` — WhatsApp order clicks

### Pinterest Rich Pins (free)

Your site already has the required Open Graph tags. To enable Rich Pins:

1. Go to [developers.pinterest.com/tools/url-debugger](https://developers.pinterest.com/tools/url-debugger/)
2. Enter any product URL (e.g. `https://womaniyakolkata.in/en/shop/your-product`)
3. Click "Validate" — Pinterest will auto-detect your OG tags
4. Apply for Rich Pins (usually approved instantly for fashion/e-commerce)

---

## Deployment

### Vercel (recommended)

The project is configured for Vercel deployment with automatic migrations.

```bash
# First deploy
vercel --prod

# Subsequent — just push to main
git push origin main    # Vercel auto-deploys
```

### Build command
Vercel runs `tsc --noEmit && next build` which type-checks and builds the app.

### Custom domain

1. Vercel Dashboard → Project → Domains → Add domain
2. Point DNS to Vercel (they provide the records)
3. Update `NEXT_PUBLIC_APP_URL` env var to your domain
4. Redeploy

---

## Performance

### Data caching

All storefront read queries are cached with `unstable_cache` (60-second TTL + tag-based invalidation):

| Query | Cache Tag |
|---|---|
| `getFeaturedProducts()` | `products` |
| `getPublishedCategories()` | `categories` |
| `getFeaturedCollections()` | `collections` |
| `getPublishedTestimonials()` | `testimonials` |
| `getAllBanners()` | `banners` |
| `getAllCampaigns()` | `campaigns` |
| `getAllPages()` | `pages` |
| `getSettings()` | `settings` |

Every admin mutation calls `revalidateTag()` to bust the relevant cache instantly.

### Bundle optimization

- `optimizePackageImports` for lucide-react, framer-motion, radix-ui, sonner, cmdk, lenis, zod
- Dynamic imports for below-fold homepage sections
- Lenis smooth scroll lazy-loaded on desktop only (skipped on mobile)
- Image cache TTL set to 1 year

---

## Caching & Invalidation

### How it works

```
User visits homepage
  → unstable_cache checks if data exists and is < 60s old
    → YES: return cached data instantly (~5ms)
    → NO: query Postgres, cache result, return (~200-500ms)

Admin updates a product
  → updateProduct() server action
    → revalidateTag('products')  ← busts the cache
    → revalidatePath('/')        ← busts page cache
  → Next visitor gets fresh data

New deployment
  → Fresh server instance, no stale cache carryover
  → First request hits DB, subsequent requests serve from cache
```

### Worst case for stale data
60 seconds (the `revalidate` TTL). If someone edits the database directly (bypassing the admin panel), data refreshes within 60s via stale-while-revalidate.

---

## Admin Panel Guide

### Accessing
URL: `/en/admin/login` — login with `ADMIN_EMAIL` + `ADMIN_PASSWORD` env vars.

### Entities

| Entity | Features |
|---|---|
| **Products** | Name (EN/BN), price, SKU, sizes, colors, stock status, category, images, featured flag |
| **Categories** | Name (EN/BN), description, carousel images, SEO fields, sort order |
| **Collections** | Name (EN/BN), launch date, featured flag, linked products, lifecycle status |
| **Campaigns** | Name (EN/BN), date range, announcement text, CTA URL |
| **Banners** | Placement (hero/inline), images, title, subtitle, CTA, linked to campaign/collection/category |
| **Pages** | Static pages + Stories (editorial), with sortable sections |
| **Testimonials** | Quote (EN/BN), author, source, rating |
| **Media Library** | Upload, tag, delete, copy URL, edit alt text |
| **Site Copy** | Override any translation key without deploying |
| **Settings** | WhatsApp number, site-wide configuration |

### Keyboard shortcuts
- `Cmd+K` / `Ctrl+K` — Open command palette (quick navigation)

---

## Troubleshooting

| Problem | Solution |
|---|---|
| `MISSING_MESSAGE` in build logs | Expected — next-intl logs this when env not fully connected. Not an error. |
| Admin login fails | Check `ADMIN_EMAIL` and `ADMIN_PASSWORD` env vars match exactly. |
| Images not showing | Verify `BLOB_READ_WRITE_TOKEN` is set. Check image hostname in `next.config.ts`. |
| DB migration fails on deploy | Run `pnpm db:studio` locally to inspect. Check `POSTGRES_URL` env var. |
| `Either connection url or host required` | Run `vercel env pull .env.local` to refresh local env vars. |
| WhatsApp button not working | Check `NEXT_PUBLIC_WHATSAPP_NUMBER` format — digits only, no `+` or spaces. |
| Bengali fonts not loading | Bengali fonts use `display: 'optional'` — they may not render on slow connections. This is intentional to prevent layout shift. |
| Stale data after admin edit | Cache invalidates instantly via `revalidateTag()`. If data is stale, hard-refresh or wait 60s. |
| Build fails with type errors | Run `pnpm exec tsc --noEmit` locally to see specific errors. |
