CREATE TABLE IF NOT EXISTS "content_overrides" (
  "id" serial PRIMARY KEY NOT NULL,
  "locale" text NOT NULL,
  "namespace" text NOT NULL,
  "key" text NOT NULL,
  "value" text NOT NULL,
  "updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "content_overrides_locale_ns_key"
  ON "content_overrides" ("locale", "namespace", "key");
