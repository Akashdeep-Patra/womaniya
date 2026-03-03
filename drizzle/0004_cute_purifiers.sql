ALTER TABLE "banners" ALTER COLUMN "image_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "banners" ADD COLUMN "images" jsonb DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "carousel_images" jsonb DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "collections" ADD COLUMN "carousel_images" jsonb DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "pages" ADD COLUMN "images" jsonb DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "sizes" jsonb DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "colors" jsonb DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "fabric" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "weight" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "care_instructions" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "origin" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "sku" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "stock_status" text DEFAULT 'in_stock' NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "delivery_info" text;