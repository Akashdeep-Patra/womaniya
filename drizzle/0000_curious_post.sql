CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name_en" text NOT NULL,
	"name_bn" text,
	"description_en" text,
	"description_bn" text,
	"price" numeric(10, 2) NOT NULL,
	"category" text NOT NULL,
	"image_url" text NOT NULL,
	"is_featured" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
