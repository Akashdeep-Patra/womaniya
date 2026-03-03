ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "carousel_images" jsonb DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "collections" ADD COLUMN IF NOT EXISTS "carousel_images" jsonb DEFAULT '[]'::jsonb;--> statement-breakpoint
UPDATE "categories" SET "carousel_images" = jsonb_build_array("hero_image_url") WHERE "hero_image_url" IS NOT NULL AND "hero_image_url" != '' AND ("carousel_images" IS NULL OR "carousel_images" = '[]'::jsonb);--> statement-breakpoint
UPDATE "collections" SET "carousel_images" = jsonb_build_array("hero_image_url") WHERE "hero_image_url" IS NOT NULL AND "hero_image_url" != '' AND ("carousel_images" IS NULL OR "carousel_images" = '[]'::jsonb);
