# 🪷 Womaniya — Authentic Bengali Handlooms

Womaniya is an elegant, modern e-commerce platform and editorial showcase dedicated to authentic Bengali handwoven sarees—from rich Dhakai Jamdanis to pure Bengal Tant and Silk.

The platform is designed with a premium, slow-craft aesthetic, featuring bilingual support (English and Bengali), smooth scroll animations, and a highly optimized architecture built on cutting-edge web technologies.

![Womaniya Banner](./public/hero-placeholder.svg) *(Placeholder)*

---

## ✨ Features

- **Bilingual Interface (i18n):** Seamlessly switch between English (`/en`) and Bengali (`/bn`) using `next-intl`.
- **Editorial Design System:** Custom Tailwind CSS v4 design tokens (`bengal-kori`, `bengal-kansa`, `bengal-sindoor`) paired with elegant typography.
- **Fluid Animations:** Integrated Framer Motion and Lenis smooth scrolling for a premium browsing experience.
- **Robust Admin Dashboard:** Protected by NextAuth v5, allowing admins to manage products, categories, collections, campaigns, banners, and editorial pages.
- **WhatsApp Integration:** Direct-to-WhatsApp ordering flow mapped to individual products.
- **Performance & SEO:** 
  - Dynamic `sitemap.xml` and `robots.txt`
  - Fully implemented Open Graph (OG) tags and Twitter Cards
  - JSON-LD Structured Data (Product, BreadcrumbList, Organization, WebSite)
  - Vercel Analytics & Speed Insights integrated
- **Security Hardened:** Comprehensive Content Security Policy (CSP) headers, Upstash Rate Limiting on authentication & uploads, and strict file validation.

---

## 🛠 Tech Stack

| Layer             | Technology |
|-------------------|------------|
| **Framework**     | [Next.js 16.1.6](https://nextjs.org/) (App Router, React 19, Turbopack) |
| **Styling**       | [Tailwind CSS v4](https://tailwindcss.com/) + custom tokens |
| **Components**    | [shadcn/ui](https://ui.shadcn.com/) + Radix UI |
| **Internationalization**| [next-intl](https://next-intl-docs.vercel.app/) |
| **Database**      | [Vercel Postgres (Neon)](https://vercel.com/postgres) |
| **ORM**           | [Drizzle ORM](https://orm.drizzle.team/) |
| **Storage**       | [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) |
| **Authentication**| [NextAuth v5](https://authjs.dev/) (Credentials) |
| **Animations**    | [Framer Motion](https://www.framer.com/motion/) + [Lenis](https://lenis.studiofreight.com/) |

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone <repository-url>
cd womaniya
pnpm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory. Check `SETUP.md` for specific configuration details.

```env
# Database (Vercel Postgres)
POSTGRES_URL="..."

# Vercel Blob
BLOB_READ_WRITE_TOKEN="..."

# Authentication (NextAuth)
AUTH_SECRET="..."
ADMIN_EMAIL="admin@womaniya.in"
ADMIN_PASSWORD="securepassword"

# App & Social Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_WHATSAPP_NUMBER="91XXXXXXXXXX"

# Upstash Redis (For Rate Limiting)
UPSTASH_REDIS_REST_URL="..."
UPSTASH_REDIS_REST_TOKEN="..."
```

### 3. Database Setup

Generate and push the Drizzle schema to your Postgres instance:

```bash
pnpm db:generate
pnpm db:push
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application. The default locale is English, which redirects to `/en`.

---

## 📂 Project Structure

```text
womaniya/
├── actions/             # Server actions (DB operations, auth, emails)
├── app/                 # Next.js App Router (pages, API routes, layout)
│   ├── [locale]/        # Localized views (Shop, Home, Admin, Stories)
│   └── api/             # API endpoints (Uploads, Auth)
├── components/          # Reusable UI components
│   ├── admin/           # Admin dashboard shell & tables
│   ├── bengal/          # Custom branded components (Buttons, Badges)
│   ├── illustrations/   # SVGs (Brand Mascot, Alpona, Kantha Stitches)
│   ├── layout/          # Headers, Footers, Cursors, Overlays
│   └── storefront/      # Consumer-facing sections (Hero, Grid, Ticker)
├── db/                  # Drizzle ORM schemas
├── i18n/                # next-intl configuration & routing
├── lib/                 # Utilities (DB connection, rate limits, WhatsApp)
├── messages/            # Localization JSON dictionaries (en.json, bn.json)
└── public/              # Static assets (Placeholders)
```

---

## 🔒 Security & Performance Features

- **Rate Limiting:** Protects `/api/upload` and `/en/admin/login` against abuse using `@upstash/ratelimit`.
- **Upload Validation:** Server-side file type mapping (`image/jpeg`, `image/webp`, etc.) and a strict 5MB size limit.
- **SEO & Social Sharing:** Dynamic OG image generation and metadata resolution for every individual product (`/shop/[slug]`), collection, and editorial page. 

---

## 📜 License

All rights reserved. Womaniya © 2026.
