import {
  pgTable,
  pgEnum,
  serial,
  text,
  numeric,
  boolean,
  timestamp,
  integer,
  jsonb,
  primaryKey,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ─── Enum definitions (single source of truth) ──────────────────
// These create real Postgres ENUM types and are the authority for
// all status/type values used across the entire codebase.

export const simpleStatusEnum = pgEnum('simple_status', ['draft', 'published', 'archived']);
export const lifecycleStatusEnum = pgEnum('lifecycle_status', ['draft', 'scheduled', 'live', 'ended', 'archived']);
export const stockStatusEnum = pgEnum('stock_status', ['in_stock', 'low_stock', 'made_to_order', 'out_of_stock']);
export const bannerPlacementEnum = pgEnum('banner_placement', ['hero', 'sidebar', 'inline', 'category_hero', 'collection_hero']);
export const pageTypeEnum = pgEnum('page_type', ['static', 'story', 'landing']);
export const sectionTypeEnum = pgEnum('section_type', ['hero', 'richtext', 'image_text', 'product_grid', 'quote', 'cta', 'gallery', 'testimonial']);
export const imageTextLayoutEnum = pgEnum('image_text_layout', ['image_left', 'image_right']);
export const testimonialSourceEnum = pgEnum('testimonial_source', ['anecdotal', 'google', 'instagram', 'facebook', 'whatsapp', 'email', 'youtube', 'trustpilot']);

// ─── Categories ──────────────────────────────────────────────────
export const categories = pgTable('categories', {
  id:                 serial('id').primaryKey(),
  slug:               text('slug').unique().notNull(),
  name_en:            text('name_en').notNull(),
  name_bn:            text('name_bn'),
  description_en:     text('description_en'),
  description_bn:     text('description_bn'),
  hero_image_url:     text('hero_image_url'),
  carousel_images:    jsonb('carousel_images').$type<string[]>().default([]),
  seo_title_en:       text('seo_title_en'),
  seo_title_bn:       text('seo_title_bn'),
  seo_description_en: text('seo_description_en'),
  seo_description_bn: text('seo_description_bn'),
  sort_order:         integer('sort_order').default(0),
  status:             simpleStatusEnum('status').default('draft').notNull(),
  created_at:         timestamp('created_at').defaultNow(),
  updated_at:         timestamp('updated_at').defaultNow(),
});

export type Category    = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

// ─── Products (extended) ─────────────────────────────────────────
export const products = pgTable('products', {
  id:                 serial('id').primaryKey(),
  slug:               text('slug').unique().notNull(),
  name_en:            text('name_en').notNull(),
  name_bn:            text('name_bn'),
  description_en:     text('description_en'),
  description_bn:     text('description_bn'),
  price:              numeric('price', { precision: 10, scale: 2 }).notNull(),
  category:           text('category').notNull(),
  category_id:        integer('category_id'),
  image_url:          text('image_url').notNull(),
  sizes:              jsonb('sizes').$type<string[]>().default([]),
  colors:             jsonb('colors').$type<string[]>().default([]),
  fabric:             text('fabric'),
  weight:             text('weight'),
  care_instructions:  text('care_instructions'),
  origin:             text('origin'),
  sku:                text('sku'),
  stock_status:       stockStatusEnum('stock_status').default('in_stock').notNull(),
  delivery_info:      text('delivery_info'),
  is_featured:        boolean('is_featured').default(false),
  status:             simpleStatusEnum('status').default('published').notNull(),
  seo_title_en:       text('seo_title_en'),
  seo_title_bn:       text('seo_title_bn'),
  seo_description_en: text('seo_description_en'),
  seo_description_bn: text('seo_description_bn'),
  created_at:         timestamp('created_at').defaultNow(),
  updated_at:         timestamp('updated_at').defaultNow(),
});

export type Product    = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

// ─── Product Images ──────────────────────────────────────────────
export const productImages = pgTable('product_images', {
  id:         serial('id').primaryKey(),
  product_id: integer('product_id').notNull(),
  image_url:  text('image_url').notNull(),
  alt_en:     text('alt_en'),
  alt_bn:     text('alt_bn'),
  sort_order: integer('sort_order').default(0),
  is_primary: boolean('is_primary').default(false),
});

export type ProductImage    = typeof productImages.$inferSelect;
export type NewProductImage = typeof productImages.$inferInsert;

// ─── Collections ─────────────────────────────────────────────────
export const collections = pgTable('collections', {
  id:                 serial('id').primaryKey(),
  slug:               text('slug').unique().notNull(),
  name_en:            text('name_en').notNull(),
  name_bn:            text('name_bn'),
  description_en:     text('description_en'),
  description_bn:     text('description_bn'),
  hero_image_url:     text('hero_image_url'),
  carousel_images:    jsonb('carousel_images').$type<string[]>().default([]),
  launch_date:        timestamp('launch_date'),
  end_date:           timestamp('end_date'),
  status:             lifecycleStatusEnum('status').default('draft').notNull(),
  is_featured:        boolean('is_featured').default(false),
  seo_title_en:       text('seo_title_en'),
  seo_title_bn:       text('seo_title_bn'),
  seo_description_en: text('seo_description_en'),
  seo_description_bn: text('seo_description_bn'),
  created_at:         timestamp('created_at').defaultNow(),
  updated_at:         timestamp('updated_at').defaultNow(),
});

export type Collection    = typeof collections.$inferSelect;
export type NewCollection = typeof collections.$inferInsert;

// ─── Collection ↔ Products (join) ────────────────────────────────
export const collectionProducts = pgTable('collection_products', {
  collection_id: integer('collection_id').notNull(),
  product_id:    integer('product_id').notNull(),
  sort_order:    integer('sort_order').default(0),
}, (t) => [
  primaryKey({ columns: [t.collection_id, t.product_id] }),
]);

export type CollectionProduct    = typeof collectionProducts.$inferSelect;
export type NewCollectionProduct = typeof collectionProducts.$inferInsert;

// ─── Campaigns ───────────────────────────────────────────────────
export const campaigns = pgTable('campaigns', {
  id:                    serial('id').primaryKey(),
  slug:                  text('slug').unique().notNull(),
  name_en:               text('name_en').notNull(),
  name_bn:               text('name_bn'),
  description_en:        text('description_en'),
  description_bn:        text('description_bn'),
  starts_at:             timestamp('starts_at'),
  ends_at:               timestamp('ends_at'),
  status:                lifecycleStatusEnum('status').default('draft').notNull(),
  announcement_text_en:  text('announcement_text_en'),
  announcement_text_bn:  text('announcement_text_bn'),
  cta_url:               text('cta_url'),
  created_at:            timestamp('created_at').defaultNow(),
  updated_at:            timestamp('updated_at').defaultNow(),
});

export type Campaign    = typeof campaigns.$inferSelect;
export type NewCampaign = typeof campaigns.$inferInsert;

// ─── Banners ─────────────────────────────────────────────────────
export const banners = pgTable('banners', {
  id:               serial('id').primaryKey(),
  campaign_id:      integer('campaign_id'),
  collection_id:    integer('collection_id'),
  category_id:      integer('category_id'),
  placement:        bannerPlacementEnum('placement').notNull(),
  images:           jsonb('images').$type<string[]>().default([]),
  image_url:        text('image_url'),
  image_url_mobile: text('image_url_mobile'),
  title_en:         text('title_en'),
  title_bn:         text('title_bn'),
  subtitle_en:      text('subtitle_en'),
  subtitle_bn:      text('subtitle_bn'),
  cta_text_en:      text('cta_text_en'),
  cta_text_bn:      text('cta_text_bn'),
  cta_url:          text('cta_url'),
  sort_order:       integer('sort_order').default(0),
  status:           simpleStatusEnum('status').default('draft').notNull(),
  starts_at:        timestamp('starts_at'),
  ends_at:          timestamp('ends_at'),
  created_at:       timestamp('created_at').defaultNow(),
});

export type Banner    = typeof banners.$inferSelect;
export type NewBanner = typeof banners.$inferInsert;

// ─── Pages ───────────────────────────────────────────────────────
export const pages = pgTable('pages', {
  id:                 serial('id').primaryKey(),
  slug:               text('slug').unique().notNull(),
  title_en:           text('title_en').notNull(),
  title_bn:           text('title_bn'),
  page_type:          pageTypeEnum('page_type').default('static').notNull(),
  images:             jsonb('images').$type<string[]>().default([]),
  hero_image_url:     text('hero_image_url'),
  status:             simpleStatusEnum('status').default('draft').notNull(),
  published_at:       timestamp('published_at'),
  seo_title_en:       text('seo_title_en'),
  seo_title_bn:       text('seo_title_bn'),
  seo_description_en: text('seo_description_en'),
  seo_description_bn: text('seo_description_bn'),
  created_at:         timestamp('created_at').defaultNow(),
  updated_at:         timestamp('updated_at').defaultNow(),
});

export type Page    = typeof pages.$inferSelect;
export type NewPage = typeof pages.$inferInsert;

// ─── Page Sections (block content) ───────────────────────────────
export const pageSections = pgTable('page_sections', {
  id:           serial('id').primaryKey(),
  page_id:      integer('page_id').notNull(),
  section_type: sectionTypeEnum('section_type').notNull(),
  content_json: jsonb('content_json'),
  sort_order:   integer('sort_order').default(0),
});

export type PageSection    = typeof pageSections.$inferSelect;
export type NewPageSection = typeof pageSections.$inferInsert;

// ─── Media Assets ────────────────────────────────────────────────
export const mediaAssets = pgTable('media_assets', {
  id:         serial('id').primaryKey(),
  url:        text('url').notNull(),
  filename:   text('filename').notNull(),
  alt_en:     text('alt_en'),
  alt_bn:     text('alt_bn'),
  mime_type:  text('mime_type'),
  size_bytes: integer('size_bytes'),
  width:      integer('width'),
  height:     integer('height'),
  tags:       text('tags'),
  created_at: timestamp('created_at').defaultNow(),
});

export type MediaAsset    = typeof mediaAssets.$inferSelect;
export type NewMediaAsset = typeof mediaAssets.$inferInsert;

// ─── Relations ───────────────────────────────────────────────────
export const productsRelations = relations(products, ({ one, many }) => ({
  categoryRef: one(categories, {
    fields:    [products.category_id],
    references: [categories.id],
  }),
  images: many(productImages),
  collectionLinks: many(collectionProducts),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
  banners:  many(banners),
}));

export const collectionsRelations = relations(collections, ({ many }) => ({
  productLinks: many(collectionProducts),
  banners:      many(banners),
}));

export const collectionProductsRelations = relations(collectionProducts, ({ one }) => ({
  collection: one(collections, {
    fields:    [collectionProducts.collection_id],
    references: [collections.id],
  }),
  product: one(products, {
    fields:    [collectionProducts.product_id],
    references: [products.id],
  }),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields:    [productImages.product_id],
    references: [products.id],
  }),
}));

export const campaignsRelations = relations(campaigns, ({ many }) => ({
  banners: many(banners),
}));

export const bannersRelations = relations(banners, ({ one }) => ({
  campaign: one(campaigns, {
    fields:    [banners.campaign_id],
    references: [campaigns.id],
  }),
  collection: one(collections, {
    fields:    [banners.collection_id],
    references: [collections.id],
  }),
  category: one(categories, {
    fields:    [banners.category_id],
    references: [categories.id],
  }),
}));

export const pagesRelations = relations(pages, ({ many }) => ({
  sections: many(pageSections),
}));

export const pageSectionsRelations = relations(pageSections, ({ one }) => ({
  page: one(pages, {
    fields:    [pageSections.page_id],
    references: [pages.id],
  }),
}));

// ─── Testimonials ───────────────────────────────────────────────────
export const testimonials = pgTable('testimonials', {
  id:           serial('id').primaryKey(),
  quote_en:     text('quote_en').notNull(),
  quote_bn:     text('quote_bn'),
  author_name:  text('author_name').notNull(),
  author_title: text('author_title'),
  author_image_url: text('author_image_url'),
  source:       testimonialSourceEnum('source').default('anecdotal').notNull(),
  source_url:   text('source_url'),
  rating:       integer('rating'),
  sort_order:   integer('sort_order').default(0),
  status:       simpleStatusEnum('status').default('published').notNull(),
  created_at:   timestamp('created_at').defaultNow(),
  updated_at:   timestamp('updated_at').defaultNow(),
});

export type Testimonial    = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;

// ─── Settings ──────────────────────────────────────────────────────
export const settings = pgTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export type Setting = typeof settings.$inferSelect;
export type NewSetting = typeof settings.$inferInsert;

// ─── Content Overrides ──────────────────────────────────────────────
export const contentOverrides = pgTable('content_overrides', {
  id:         serial('id').primaryKey(),
  locale:     text('locale').notNull(),
  namespace:  text('namespace').notNull(),
  key:        text('key').notNull(),
  value:      text('value').notNull(),
  updated_at: timestamp('updated_at').defaultNow(),
}, (t) => [
  uniqueIndex('content_overrides_locale_ns_key').on(t.locale, t.namespace, t.key),
]);

export type ContentOverride    = typeof contentOverrides.$inferSelect;
export type NewContentOverride = typeof contentOverrides.$inferInsert;

// ─── Activity Log ───────────────────────────────────────────────────
export const activityLog = pgTable('activity_log', {
  id:          serial('id').primaryKey(),
  action:      text('action').notNull(),       // 'created' | 'updated' | 'deleted'
  entity_type: text('entity_type').notNull(),  // 'product' | 'category' | etc.
  entity_id:   integer('entity_id'),
  entity_name: text('entity_name').notNull(),
  details:     text('details'),
  is_read:     boolean('is_read').default(false).notNull(),
  created_at:  timestamp('created_at').defaultNow(),
});

export type ActivityLogEntry    = typeof activityLog.$inferSelect;
export type NewActivityLogEntry = typeof activityLog.$inferInsert;

// ─── Admins ────────────────────────────────────────────────────────
export const admins = pgTable('admins', {
  id:                 serial('id').primaryKey(),
  email:              text('email').unique().notNull(),
  password_hash:      text('password_hash').notNull(),
  reset_token:        text('reset_token'),
  reset_token_expiry: timestamp('reset_token_expiry'),
  created_at:         timestamp('created_at').defaultNow(),
  updated_at:         timestamp('updated_at').defaultNow(),
});

export type Admin    = typeof admins.$inferSelect;
export type NewAdmin = typeof admins.$inferInsert;
