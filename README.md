# Womaniya — Authentic Bengali Handlooms

A premium bilingual (English + Bengali) e-commerce storefront and admin platform for authentic handwoven sarees, blouses and artisan fashion. Built with a slow-craft editorial aesthetic, WhatsApp-first ordering, and a full-featured CMS.

**Live:** [womaniyakolkata.in](https://womaniyakolkata.in)

---

## Features

### Storefront
- **Bilingual UI** — English (`/en`) and Bengali (`/bn`) with `next-intl`, locale-aware routing
- **Editorial homepage** — Hero collage, heritage ticker, featured collections, artisan voices, manifesto
- **Product catalog** — Categories, collections, campaigns with carousel images, filters, rich detail pages
- **WhatsApp ordering** — Context-aware pre-filled messages (product name, price, size, color, page URL)
- **Smooth scroll** — Lenis on desktop, native on mobile
- **Dark mode** — System-aware theme switching

### Admin Panel (`/admin`)
- **Dashboard** — KPI stats, recent products, live campaigns, quick actions
- **Full CRUD** — Products, Categories, Collections, Campaigns, Banners, Pages, Stories, Testimonials
- **Media library** — Upload, tag, copy URL, delete with metadata editing
- **Site copy editor** — Override any translation key from the admin panel
- **Activity log** — Track all admin mutations with entity icons and timestamps
- **Command palette** — `Cmd+K` quick navigation with responsive bottom sheet on mobile
- **Entity-aware notifications** — Toasts with per-entity icons (Product created, Banner deleted, etc.)

### SEO & Marketing
- Dynamic `sitemap.xml` with all products, categories, collections, campaigns, stories
- `robots.txt` blocking `/admin` and `/api`
- Per-page Open Graph + Twitter Card metadata with dynamic OG images
- JSON-LD structured data (Organization, Store, WebSite, Product, BreadcrumbList)
- Google/Bing site verification ready (env vars)

### Performance
- Server-side data caching with `unstable_cache` + tag-based invalidation
- Dynamic imports for below-fold sections
- Image optimization with 1-year cache TTL
- `optimizePackageImports` for lucide-react, framer-motion, radix-ui, etc.
- Vercel Analytics + Speed Insights

### Security
- Content Security Policy headers (X-Frame-Options, HSTS, etc.)
- Upstash rate limiting on auth + uploads
- Server-side Zod validation on all mutations
- NextAuth v5 JWT sessions with credentials provider

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15.5 (App Router, React 19, Turbopack) |
| Styling | Tailwind CSS v4 + Bengal design tokens |
| Components | shadcn/ui + Radix UI + custom Bengal library |
| i18n | next-intl v4 (EN + BN) |
| Database | Neon Postgres (via Vercel Postgres) |
| ORM | Drizzle ORM with file-based migrations |
| Storage | Vercel Blob (public, WebP auto-conversion) |
| Auth | NextAuth v5 beta (credentials) |
| Animations | Framer Motion v12 + Lenis |
| Validation | Zod |
| Rate Limiting | Upstash Redis |

---

## Quick Start

```bash
# Clone & install
git clone https://github.com/Akashdeep-Patra/womaniya.git
cd womaniya
pnpm install

# Pull env vars from Vercel (requires vercel CLI)
vercel link
vercel env pull .env.local

# Run dev server
pnpm dev
```

Open [localhost:5001/en](http://localhost:5001/en) (storefront) or [localhost:5001/en/admin/login](http://localhost:5001/en/admin/login) (admin).

See **[SETUP.md](SETUP.md)** for detailed environment setup, database migrations, deployment, and integrations.

---

## Project Structure

```
womaniya/
├── actions/              # Server actions (CRUD, uploads, auth)
├── app/
│   ├── [locale]/
│   │   ├── (storefront)/ # Public pages (home, shop, categories, etc.)
│   │   └── admin/        # Admin panel (dashboard, forms, tables)
│   ├── api/              # API routes (upload, auth, cron, web-vitals)
│   ├── sitemap.ts        # Dynamic sitemap generation
│   └── robots.ts         # robots.txt
├── components/
│   ├── admin/            # Dashboard, forms, tables, command palette
│   ├── bengal/           # BengalButton, BengalBadge, BengalCard, BengalInput
│   ├── illustrations/    # JamdaniMotif, AlponaDivider, PaisleyCluster, etc.
│   ├── layout/           # Header, Footer, BottomNav, WhatsAppFloat
│   ├── storefront/       # HeroSection, ShopGrid, CategoriesSection, etc.
│   ├── providers/        # ThemeProvider, NextIntlProvider, Lenis, Toaster
│   └── ui/               # shadcn/ui primitives
├── db/
│   ├── schema.ts         # Drizzle schema (all tables)
│   └── enums.ts          # Status enums (product, collection, campaign, etc.)
├── drizzle/              # SQL migration files (auto-generated)
├── i18n/                 # next-intl routing & request config
├── lib/                  # Utilities (db, whatsapp, notify, logger, etc.)
├── messages/             # en.json + bn.json translation dictionaries
├── public/               # Static assets, Instagram images
├── scripts/              # migrate.ts, seed.ts, cleanup-db.ts
├── proxy.ts              # Next.js proxy (auth + intl middleware)
└── auth.ts               # NextAuth v5 configuration
```

---

## Database Schema

```
products            categories          collections
├── id              ├── id              ├── id
├── slug            ├── slug            ├── slug
├── name_en/bn      ├── name_en/bn      ├── name_en/bn
├── description     ├── description     ├── description
├── price           ├── carousel_images ├── launch_date
├── category        ├── status          ├── is_featured
├── sizes/colors    ├── sort_order      ├── status
├── stock_status    └── seo_*           └── seo_*
├── is_featured
├── image_url       campaigns           banners
├── sku             ├── id              ├── id
└── status          ├── slug            ├── placement
                    ├── name_en/bn      ├── images
product_images      ├── starts_at       ├── title_en/bn
├── product_id      ├── ends_at         ├── cta_url
├── url             ├── status          ├── status
├── alt_text        └── announcement_*  └── sort_order
└── sort_order
                    pages               testimonials
media_assets        ├── id              ├── id
├── id              ├── slug            ├── quote_en/bn
├── url             ├── title_en/bn     ├── author_name
├── filename        ├── page_type       ├── source
├── alt_text        ├── status          ├── rating
└── tags            └── sections[]      └── status

settings            activity_log        admins
├── key             ├── entity_type     ├── email
└── value           ├── action          └── password_hash
                    ├── entity_name
                    └── is_read
```

---

## Scripts

```bash
pnpm dev              # Start dev server (port 5001, Turbopack)
pnpm build            # Type-check + production build
pnpm lint             # ESLint
pnpm db:generate      # Generate migration SQL from schema changes
pnpm db:migrate       # Run migrations locally
pnpm db:push          # Push schema directly (dev only)
pnpm db:studio        # Open Drizzle Studio (visual DB browser)
pnpm db:seed          # Seed sample data
pnpm analyze          # Bundle analysis (ANALYZE=true)
```

---

## License

All rights reserved. Womaniya 2025.
