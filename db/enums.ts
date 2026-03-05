/**
 * Centralized enum definitions for all database entities.
 *
 * SINGLE SOURCE OF TRUTH — every action, form, component, and seed script
 * should import from here instead of hardcoding string literals.
 *
 * When adding a new enum value, add it here and it will propagate everywhere.
 */

// ─── Shared status enums ─────────────────────────────────────────

export const SIMPLE_STATUSES = ['draft', 'published', 'archived'] as const;
export type SimpleStatus = (typeof SIMPLE_STATUSES)[number];

export const LIFECYCLE_STATUSES = ['draft', 'scheduled', 'live', 'ended', 'archived'] as const;
export type LifecycleStatus = (typeof LIFECYCLE_STATUSES)[number];

/** All possible status values across all entities (for StatusPill, etc.) */
export const ALL_STATUSES = ['draft', 'published', 'scheduled', 'live', 'ended', 'archived'] as const;
export type AnyStatus = (typeof ALL_STATUSES)[number];

// ─── Helpers: which statuses count as "visible" on the storefront ─

export const VISIBLE_SIMPLE_STATUSES: readonly SimpleStatus[] = ['published'] as const;
export const VISIBLE_LIFECYCLE_STATUSES: readonly LifecycleStatus[] = ['live', 'scheduled'] as const;

// ─── Category ────────────────────────────────────────────────────

export const CATEGORY_STATUSES = SIMPLE_STATUSES;
export type CategoryStatus = SimpleStatus;

// ─── Product ─────────────────────────────────────────────────────

export const PRODUCT_STATUSES = SIMPLE_STATUSES;
export type ProductStatus = SimpleStatus;

export const STOCK_STATUSES = ['in_stock', 'low_stock', 'made_to_order', 'out_of_stock'] as const;
export type StockStatus = (typeof STOCK_STATUSES)[number];

// ─── Collection ──────────────────────────────────────────────────

export const COLLECTION_STATUSES = LIFECYCLE_STATUSES;
export type CollectionStatus = LifecycleStatus;

// ─── Campaign ────────────────────────────────────────────────────

export const CAMPAIGN_STATUSES = LIFECYCLE_STATUSES;
export type CampaignStatus = LifecycleStatus;

// ─── Banner ──────────────────────────────────────────────────────

export const BANNER_STATUSES = SIMPLE_STATUSES;
export type BannerStatus = SimpleStatus;

export const BANNER_PLACEMENTS = ['hero', 'sidebar', 'inline', 'category_hero', 'collection_hero'] as const;
export type BannerPlacement = (typeof BANNER_PLACEMENTS)[number];

// ─── Page ────────────────────────────────────────────────────────

export const PAGE_STATUSES = SIMPLE_STATUSES;
export type PageStatus = SimpleStatus;

export const PAGE_TYPES = ['static', 'story', 'landing'] as const;
export type PageType = (typeof PAGE_TYPES)[number];

// ─── Page Sections ───────────────────────────────────────────────

export const SECTION_TYPES = ['hero', 'richtext', 'image_text', 'product_grid', 'quote', 'cta', 'gallery', 'testimonial'] as const;
export type SectionType = (typeof SECTION_TYPES)[number];

export const IMAGE_TEXT_LAYOUTS = ['image_left', 'image_right'] as const;
export type ImageTextLayout = (typeof IMAGE_TEXT_LAYOUTS)[number];

// ─── Testimonial ─────────────────────────────────────────────────

export const TESTIMONIAL_STATUSES = SIMPLE_STATUSES;
export type TestimonialStatus = SimpleStatus;

export const TESTIMONIAL_SOURCES = ['anecdotal', 'google', 'instagram', 'facebook', 'whatsapp', 'email', 'youtube', 'trustpilot'] as const;
export type TestimonialSource = (typeof TESTIMONIAL_SOURCES)[number];

// ─── UI label maps ───────────────────────────────────────────────

export const STATUS_LABELS: Record<AnyStatus, string> = {
  draft:     'Draft',
  published: 'Published',
  scheduled: 'Scheduled',
  live:      'Live',
  ended:     'Ended',
  archived:  'Archived',
};

export const STOCK_STATUS_LABELS: Record<StockStatus, string> = {
  in_stock:      'In Stock',
  low_stock:     'Low Stock',
  made_to_order: 'Made to Order',
  out_of_stock:  'Out of Stock',
};

export const BANNER_PLACEMENT_LABELS: Record<BannerPlacement, string> = {
  hero:            'Hero (Storefront Top)',
  sidebar:         'Sidebar',
  inline:          'Inline (Middle of page)',
  category_hero:   'Category Hero',
  collection_hero: 'Collection Hero',
};

export const PAGE_TYPE_LABELS: Record<PageType, string> = {
  static:  'Static Page',
  story:   'Story',
  landing: 'Landing Page',
};

export const TESTIMONIAL_SOURCE_LABELS: Record<TestimonialSource, string> = {
  anecdotal:  'Anecdotal (Admin)',
  google:     'Google Reviews',
  instagram:  'Instagram',
  facebook:   'Facebook',
  whatsapp:   'WhatsApp',
  email:      'Email',
  youtube:    'YouTube',
  trustpilot: 'Trustpilot',
};
