import {
  pgTable,
  serial,
  text,
  numeric,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id:             serial('id').primaryKey(),
  slug:           text('slug').unique().notNull(),
  name_en:        text('name_en').notNull(),
  name_bn:        text('name_bn'),
  description_en: text('description_en'),
  description_bn: text('description_bn'),
  price:          numeric('price', { precision: 10, scale: 2 }).notNull(),
  category:       text('category').notNull(),  // 'Jamdani' | 'Silk' | 'Tant' | 'Ready to Wear'
  image_url:      text('image_url').notNull(),
  is_featured:    boolean('is_featured').default(false),
  created_at:     timestamp('created_at').defaultNow(),
});

export type Product    = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
