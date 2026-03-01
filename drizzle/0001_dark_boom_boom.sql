CREATE TABLE "banners" (
	"id" serial PRIMARY KEY NOT NULL,
	"campaign_id" integer,
	"collection_id" integer,
	"category_id" integer,
	"placement" text NOT NULL,
	"image_url" text NOT NULL,
	"image_url_mobile" text,
	"title_en" text,
	"title_bn" text,
	"subtitle_en" text,
	"subtitle_bn" text,
	"cta_text_en" text,
	"cta_text_bn" text,
	"cta_url" text,
	"sort_order" integer DEFAULT 0,
	"status" text DEFAULT 'draft' NOT NULL,
	"starts_at" timestamp,
	"ends_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "campaigns" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name_en" text NOT NULL,
	"name_bn" text,
	"description_en" text,
	"description_bn" text,
	"starts_at" timestamp,
	"ends_at" timestamp,
	"status" text DEFAULT 'draft' NOT NULL,
	"announcement_text_en" text,
	"announcement_text_bn" text,
	"cta_url" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "campaigns_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name_en" text NOT NULL,
	"name_bn" text,
	"description_en" text,
	"description_bn" text,
	"hero_image_url" text,
	"seo_title_en" text,
	"seo_title_bn" text,
	"seo_description_en" text,
	"seo_description_bn" text,
	"sort_order" integer DEFAULT 0,
	"status" text DEFAULT 'draft' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "collection_products" (
	"collection_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"sort_order" integer DEFAULT 0,
	CONSTRAINT "collection_products_collection_id_product_id_pk" PRIMARY KEY("collection_id","product_id")
);
--> statement-breakpoint
CREATE TABLE "collections" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name_en" text NOT NULL,
	"name_bn" text,
	"description_en" text,
	"description_bn" text,
	"hero_image_url" text,
	"launch_date" timestamp,
	"end_date" timestamp,
	"status" text DEFAULT 'draft' NOT NULL,
	"is_featured" boolean DEFAULT false,
	"seo_title_en" text,
	"seo_title_bn" text,
	"seo_description_en" text,
	"seo_description_bn" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "collections_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "media_assets" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"filename" text NOT NULL,
	"alt_en" text,
	"alt_bn" text,
	"mime_type" text,
	"size_bytes" integer,
	"width" integer,
	"height" integer,
	"tags" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "page_sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"page_id" integer NOT NULL,
	"section_type" text NOT NULL,
	"content_json" jsonb,
	"sort_order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title_en" text NOT NULL,
	"title_bn" text,
	"page_type" text DEFAULT 'static' NOT NULL,
	"hero_image_url" text,
	"status" text DEFAULT 'draft' NOT NULL,
	"published_at" timestamp,
	"seo_title_en" text,
	"seo_title_bn" text,
	"seo_description_en" text,
	"seo_description_bn" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "pages_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "product_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"image_url" text NOT NULL,
	"alt_en" text,
	"alt_bn" text,
	"sort_order" integer DEFAULT 0,
	"is_primary" boolean DEFAULT false
);
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "category_id" integer;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "status" text DEFAULT 'published' NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "seo_title_en" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "seo_description_en" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "updated_at" timestamp DEFAULT now();