# Womaniya — Developer Setup & Deployment Guide

## Stack at a Glance

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, React 19) |
| Styling | Tailwind CSS v4 + custom Bengal design tokens |
| UI Components | shadcn/ui + custom Bengal component library |
| i18n | next-intl v4 — English (`/en`) + Bengali (`/bn`) |
| Database | Drizzle ORM + Vercel Postgres (Neon) |
| Image Storage | Vercel Blob |
| Auth | NextAuth v5 (credentials — admin only) |
| Validation | Zod (server actions) |
| Animations | Framer Motion + Lenis smooth scroll |
| Package Manager | pnpm |

---

## Local Development

### Prerequisites
- Node.js 20+
- pnpm (`npm install -g pnpm`)
- Vercel CLI (`pnpm add -g vercel`)

### First-time setup

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/womaniya.git
cd womaniya

# 2. Install dependencies
pnpm install

# 3. Pull environment variables from Vercel (after project is linked)
vercel link
vercel env pull .env.local

# 4. Start dev server
pnpm dev
```

Visit `http://localhost:3000/en` — storefront
Visit `http://localhost:3000/en/admin/login` — admin panel

---

## Environment Variables

These are set in Vercel dashboard → Settings → Environment Variables.

### Auto-added by Vercel (when you connect Storage)

| Variable | Source |
|---|---|
| `POSTGRES_URL` | Vercel Postgres |
| `POSTGRES_URL_NON_POOLING` | Vercel Postgres |
| `POSTGRES_PRISMA_URL` | Vercel Postgres |
| `POSTGRES_USER` | Vercel Postgres |
| `POSTGRES_PASSWORD` | Vercel Postgres |
| `POSTGRES_HOST` | Vercel Postgres |
| `POSTGRES_DATABASE` | Vercel Postgres |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob |

### Set manually

| Variable | Description | Example |
|---|---|---|
| `AUTH_SECRET` | Random 32-char secret for NextAuth JWT | `openssl rand -base64 32` |
| `ADMIN_EMAIL` | Admin login email | `admin@womaniya.in` |
| `ADMIN_PASSWORD` | Admin login password | `StrongPassword123` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number with country code, no + | `919143161829` |
| `NEXT_PUBLIC_APP_URL` | Live site URL (add after first deploy) | `https://womaniya.vercel.app` |

---

## Database

### Schema
Defined in [`db/schema.ts`](db/schema.ts). Single `products` table:

```
products
├── id             serial PRIMARY KEY
├── slug           text UNIQUE          ← SEO-friendly URL
├── name_en        text NOT NULL        ← English name
├── name_bn        text                 ← Bengali name
├── description_en text
├── description_bn text
├── price          numeric(10,2)
├── category       text                 ← Jamdani | Tant | Ikkat | Ajrakh | Blouse | Ready to Wear
├── sizes          text                 ← comma-separated sizes (S, M, L, XL)
├── colors         text                 ← comma-separated colors
├── fabric         text                 ← fabric type (Chanderi, Silk, Cotton, etc.)
├── image_url      text                 ← Vercel Blob URL
├── is_featured    boolean default false
└── created_at     timestamp default now()
```

### Migration Workflow

Womaniya uses **file-based migrations** (not `db:push`). This means:
1. Every schema change creates a versioned SQL file
2. Files are committed to git
3. Migrations run **automatically** on every Vercel deploy

```
Schema change flow:
  Edit db/schema.ts
       ↓
  pnpm db:generate    ← creates new SQL file in drizzle/
       ↓
  git add drizzle/ && git commit
       ↓
  git push            ← Vercel deploys → auto-runs migrations → builds app
```

### Commands

```bash
# Generate migration files after schema changes
pnpm db:generate

# Apply migrations manually (local)
pnpm db:migrate

# Visual DB browser (useful for debugging)
pnpm db:studio

# Direct schema push — dev only, skips migration files
pnpm db:push
```

> **Never use `db:push` in production.** It skips migration history and can cause data loss.

### How auto-migration works on Vercel

`package.json` has a `vercel-build` script:
```json
"vercel-build": "tsx scripts/migrate.ts && next build"
```

Vercel detects this and runs it instead of `next build`. The migrate script:
1. Connects to Postgres using `POSTGRES_URL`
2. Checks `__drizzle_migrations` table (managed by Drizzle)
3. Applies any SQL files in `drizzle/` that haven't been applied yet
4. Safe to run multiple times — already-applied migrations are skipped

---

## Validation

All server actions in [`actions/products.ts`](actions/products.ts) validate input with **Zod** before touching the database:

| Field | Rule |
|---|---|
| `name_en` | Required, 2–120 chars |
| `name_bn` | Optional, max 120 chars |
| `price` | Required, positive number, max 999,999 |
| `category` | Must be one of: Jamdani, Tant, Ikkat, Ajrakh, Blouse, Ready to Wear |
| `description_en/bn` | Optional, max 1,000 chars |
| `id` (delete) | Must be positive integer |

Validation errors are thrown and caught by the admin form's `try/catch`, then displayed as a toast notification.

---

## i18n — Translations

Translation files live in [`messages/`](messages/):
- [`messages/en.json`](messages/en.json) — English
- [`messages/bn.json`](messages/bn.json) — Bengali

### Adding a new string

1. Add to both `en.json` and `bn.json`:
```json
// en.json
{ "shop": { "new_arrival": "New Arrival" } }

// bn.json
{ "shop": { "new_arrival": "নতুন আগমন" } }
```

2. Use in a **server component**:
```tsx
const t = await getTranslations({ locale, namespace: 'shop' });
<p>{t('new_arrival')}</p>
```

3. Use in a **client component**:
```tsx
const t = useTranslations('shop');
<p>{t('new_arrival')}</p>
```

---

## Image Storage (Vercel Blob)

Product photos are uploaded to Vercel Blob via:
1. **Admin camera flow** → `CameraUpload` component → `POST /api/upload` → Blob
2. **Server action** → `uploadImageToBlob()` in [`actions/upload.ts`](actions/upload.ts)

Images are stored as:
```
products/{timestamp}-{filename}
```

All blobs are **public** (required for `<Image>` to render them without auth).

---

## Admin Panel

URL: `/en/admin/login` (or `/bn/admin/login`)

Protected by NextAuth v5 credentials provider. Credentials are set via env vars — there is no user table in the database.

### Admin flow
```
Login with ADMIN_EMAIL + ADMIN_PASSWORD
    ↓
JWT session issued (stored in cookie)
    ↓
app/[locale]/admin/layout.tsx checks session on every request
    ↓
Redirects to /admin/login if session missing/expired
```

### To change the admin password
Update `ADMIN_PASSWORD` in Vercel dashboard → Settings → Environment Variables → Redeploy.

---

## Deployment

### First deploy
```bash
vercel --prod
```

### Every subsequent deploy (after code changes)
```bash
git add .
git commit -m "feat: your change"
git push origin main   # Vercel auto-deploys
```

### After schema changes
```bash
pnpm db:generate       # creates new SQL migration file
git add drizzle/
git commit -m "db: add new column"
git push               # Vercel runs migration automatically before build
```

---

## Custom Domain (Optional)

In Vercel dashboard → your project → **Domains**:
1. Add your domain (e.g. `womaniya.in`)
2. Point your domain's DNS to Vercel (they give you the records)
3. After adding, update `NEXT_PUBLIC_APP_URL` env var to `https://womaniya.in`
4. Redeploy: `git commit --allow-empty -m "chore: update app url" && git push`

---

## Adding a New Product Category

1. Update `db/schema.ts` comment (the category column is plain text — no enum constraint, so no migration needed for new categories)
2. Add to `CATEGORIES` array in [`actions/products.ts`](actions/products.ts) (Zod enum)
3. Add to `CATEGORIES` array in [`components/admin/ProductForm.tsx`](components/admin/ProductForm.tsx)
4. Add to `CATEGORIES` array in [`components/storefront/CategoryFilter.tsx`](components/storefront/CategoryFilter.tsx)
5. Add translations to `messages/en.json` and `messages/bn.json`

---

## Troubleshooting

| Error | Fix |
|---|---|
| `MISSING_MESSAGE` in build logs | Expected — next-intl logs this when env not connected; not a real error |
| `ENVIRONMENT_FALLBACK` | Expected — @vercel/postgres logs this locally without DB; harmless |
| Admin login fails | Check `ADMIN_EMAIL` + `ADMIN_PASSWORD` env vars match exactly |
| Images not showing | Check `BLOB_READ_WRITE_TOKEN` is set; ensure image hostname is in `next.config.ts` |
| DB migration fails on deploy | Run `pnpm db:studio` locally to inspect DB state |
| `Either connection url or host required` | Run `vercel env pull .env.local` to refresh local env |
