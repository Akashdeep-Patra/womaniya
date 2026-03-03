ALTER TABLE "banners" ADD COLUMN IF NOT EXISTS "images" jsonb DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "images" jsonb DEFAULT '[]'::jsonb;--> statement-breakpoint
UPDATE "banners" SET "images" = CASE
  WHEN "image_url_mobile" IS NOT NULL AND "image_url_mobile" != '' THEN jsonb_build_array("image_url", "image_url_mobile")
  WHEN "image_url" IS NOT NULL AND "image_url" != '' THEN jsonb_build_array("image_url")
  ELSE '[]'::jsonb
END WHERE ("images" IS NULL OR "images" = '[]'::jsonb);--> statement-breakpoint
UPDATE "pages" SET "images" = jsonb_build_array("hero_image_url") WHERE "hero_image_url" IS NOT NULL AND "hero_image_url" != '' AND ("images" IS NULL OR "images" = '[]'::jsonb);
