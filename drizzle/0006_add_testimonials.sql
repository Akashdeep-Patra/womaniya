CREATE TABLE IF NOT EXISTS "testimonials" (
  "id"               serial PRIMARY KEY NOT NULL,
  "quote_en"         text NOT NULL,
  "quote_bn"         text,
  "author_name"      text NOT NULL,
  "author_title"     text,
  "author_image_url" text,
  "source"           text DEFAULT 'anecdotal' NOT NULL,
  "source_url"       text,
  "rating"           integer,
  "sort_order"       integer DEFAULT 0,
  "status"           text DEFAULT 'published' NOT NULL,
  "created_at"       timestamp DEFAULT now(),
  "updated_at"       timestamp DEFAULT now()
);
