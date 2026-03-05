-- Migration: Convert text columns to proper Postgres ENUM types
-- This ensures the database enforces valid values at the DB level,
-- and Drizzle ORM can infer TypeScript union types from the schema.

-- 1. Create the enum types
DO $$ BEGIN
  CREATE TYPE "simple_status" AS ENUM ('draft', 'published', 'archived');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "lifecycle_status" AS ENUM ('draft', 'scheduled', 'live', 'ended', 'archived');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "stock_status" AS ENUM ('in_stock', 'low_stock', 'made_to_order', 'out_of_stock');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "banner_placement" AS ENUM ('hero', 'sidebar', 'inline', 'category_hero', 'collection_hero');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "page_type" AS ENUM ('static', 'story', 'landing');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "section_type" AS ENUM ('hero', 'richtext', 'image_text', 'product_grid', 'quote', 'cta', 'gallery', 'testimonial');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "image_text_layout" AS ENUM ('image_left', 'image_right');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "testimonial_source" AS ENUM ('anecdotal', 'google', 'instagram', 'facebook', 'whatsapp', 'email', 'youtube', 'trustpilot');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- 2. Convert text columns → enum columns
-- Must drop default, alter type, then re-add default (Postgres can't auto-cast defaults)

-- categories.status
ALTER TABLE "categories" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "categories" ALTER COLUMN "status" TYPE "simple_status" USING "status"::"simple_status";
ALTER TABLE "categories" ALTER COLUMN "status" SET DEFAULT 'draft';

-- products.status
ALTER TABLE "products" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "products" ALTER COLUMN "status" TYPE "simple_status" USING "status"::"simple_status";
ALTER TABLE "products" ALTER COLUMN "status" SET DEFAULT 'published';

-- products.stock_status
ALTER TABLE "products" ALTER COLUMN "stock_status" DROP DEFAULT;
ALTER TABLE "products" ALTER COLUMN "stock_status" TYPE "stock_status" USING "stock_status"::"stock_status";
ALTER TABLE "products" ALTER COLUMN "stock_status" SET DEFAULT 'in_stock';

-- collections.status
ALTER TABLE "collections" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "collections" ALTER COLUMN "status" TYPE "lifecycle_status" USING "status"::"lifecycle_status";
ALTER TABLE "collections" ALTER COLUMN "status" SET DEFAULT 'draft';

-- campaigns.status
ALTER TABLE "campaigns" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "campaigns" ALTER COLUMN "status" TYPE "lifecycle_status" USING "status"::"lifecycle_status";
ALTER TABLE "campaigns" ALTER COLUMN "status" SET DEFAULT 'draft';

-- banners.placement
ALTER TABLE "banners" ALTER COLUMN "placement" TYPE "banner_placement" USING "placement"::"banner_placement";

-- banners.status
ALTER TABLE "banners" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "banners" ALTER COLUMN "status" TYPE "simple_status" USING "status"::"simple_status";
ALTER TABLE "banners" ALTER COLUMN "status" SET DEFAULT 'draft';

-- pages.page_type
ALTER TABLE "pages" ALTER COLUMN "page_type" DROP DEFAULT;
ALTER TABLE "pages" ALTER COLUMN "page_type" TYPE "page_type" USING "page_type"::"page_type";
ALTER TABLE "pages" ALTER COLUMN "page_type" SET DEFAULT 'static';

-- pages.status
ALTER TABLE "pages" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "pages" ALTER COLUMN "status" TYPE "simple_status" USING "status"::"simple_status";
ALTER TABLE "pages" ALTER COLUMN "status" SET DEFAULT 'draft';

-- page_sections.section_type (no default to worry about)
ALTER TABLE "page_sections" ALTER COLUMN "section_type" TYPE "section_type" USING "section_type"::"section_type";

-- testimonials.source
ALTER TABLE "testimonials" ALTER COLUMN "source" DROP DEFAULT;
ALTER TABLE "testimonials" ALTER COLUMN "source" TYPE "testimonial_source" USING "source"::"testimonial_source";
ALTER TABLE "testimonials" ALTER COLUMN "source" SET DEFAULT 'anecdotal';

-- testimonials.status
ALTER TABLE "testimonials" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "testimonials" ALTER COLUMN "status" TYPE "simple_status" USING "status"::"simple_status";
ALTER TABLE "testimonials" ALTER COLUMN "status" SET DEFAULT 'published';
