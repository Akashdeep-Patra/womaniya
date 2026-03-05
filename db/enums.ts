/**
 * Centralized enum types and UI labels — all derived from Drizzle pgEnum
 * definitions in schema.ts.
 *
 * SINGLE SOURCE OF TRUTH CHAIN:
 *   schema.ts (pgEnum) → enums.ts (re-exports + labels) → actions / forms / UI
 *
 * To add a new enum value:
 *   1. Add it to the pgEnum in schema.ts
 *   2. Add its label here
 *   3. Generate a migration
 */

import {
  simpleStatusEnum,
  lifecycleStatusEnum,
  stockStatusEnum,
  bannerPlacementEnum,
  pageTypeEnum,
  sectionTypeEnum,
  imageTextLayoutEnum,
  testimonialSourceEnum,
} from './schema';

// ─── Re-export enum value arrays (derived from pgEnum.enumValues) ─

export const SIMPLE_STATUSES = simpleStatusEnum.enumValues;
export type SimpleStatus = (typeof SIMPLE_STATUSES)[number];

export const LIFECYCLE_STATUSES = lifecycleStatusEnum.enumValues;
export type LifecycleStatus = (typeof LIFECYCLE_STATUSES)[number];

export type AnyStatus = SimpleStatus | LifecycleStatus;
export const ALL_STATUSES: readonly AnyStatus[] = [
  ...new Set<AnyStatus>([...SIMPLE_STATUSES, ...LIFECYCLE_STATUSES]),
];

export const VISIBLE_SIMPLE_STATUSES: readonly SimpleStatus[] = ['published'] as const;
export const VISIBLE_LIFECYCLE_STATUSES: readonly LifecycleStatus[] = ['live', 'scheduled'] as const;

// ─── Entity-specific aliases ─────────────────────────────────────

export const CATEGORY_STATUSES = SIMPLE_STATUSES;
export type CategoryStatus = SimpleStatus;

export const PRODUCT_STATUSES = SIMPLE_STATUSES;
export type ProductStatus = SimpleStatus;

export const STOCK_STATUSES = stockStatusEnum.enumValues;
export type StockStatus = (typeof STOCK_STATUSES)[number];

export const COLLECTION_STATUSES = LIFECYCLE_STATUSES;
export type CollectionStatus = LifecycleStatus;

export const CAMPAIGN_STATUSES = LIFECYCLE_STATUSES;
export type CampaignStatus = LifecycleStatus;

export const BANNER_STATUSES = SIMPLE_STATUSES;
export type BannerStatus = SimpleStatus;

export const BANNER_PLACEMENTS = bannerPlacementEnum.enumValues;
export type BannerPlacement = (typeof BANNER_PLACEMENTS)[number];

export const PAGE_STATUSES = SIMPLE_STATUSES;
export type PageStatus = SimpleStatus;

export const PAGE_TYPES = pageTypeEnum.enumValues;
export type PageType = (typeof PAGE_TYPES)[number];

export const SECTION_TYPES = sectionTypeEnum.enumValues;
export type SectionType = (typeof SECTION_TYPES)[number];

export const IMAGE_TEXT_LAYOUTS = imageTextLayoutEnum.enumValues;
export type ImageTextLayout = (typeof IMAGE_TEXT_LAYOUTS)[number];

export const TESTIMONIAL_STATUSES = SIMPLE_STATUSES;
export type TestimonialStatus = SimpleStatus;

export const TESTIMONIAL_SOURCES = testimonialSourceEnum.enumValues;
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
