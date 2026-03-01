'use server';

import { db } from '@/lib/db';
import { products, categories, collections, campaigns, pages } from '@/db/schema';
import { eq, sql, and, gte, lte, desc } from 'drizzle-orm';

export type DashboardStats = {
  totalProducts: number;
  publishedProducts: number;
  draftProducts: number;
  totalCategories: number;
  totalCollections: number;
  liveCampaigns: number;
  totalPages: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const [prodRows] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(products);
  const [pubRows] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(products)
    .where(eq(products.status, 'published'));
  const [draftRows] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(products)
    .where(eq(products.status, 'draft'));
  const [catRows] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(categories);
  const [colRows] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(collections);
  const [campRows] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(campaigns)
    .where(eq(campaigns.status, 'live'));
  const [pageRows] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(pages);

  return {
    totalProducts:    prodRows.count,
    publishedProducts: pubRows.count,
    draftProducts:    draftRows.count,
    totalCategories:  catRows.count,
    totalCollections: colRows.count,
    liveCampaigns:    campRows.count,
    totalPages:       pageRows.count,
  };
}

export async function getRecentProducts(limit = 5) {
  return db.query.products.findMany({
    orderBy: (p, { desc }) => [desc(p.created_at)],
    limit,
  });
}

export async function getUpcomingCollections(limit = 3) {
  const now = new Date();
  return db.query.collections.findMany({
    where: (c, { and, gte, eq }) =>
      and(eq(c.status, 'scheduled'), gte(c.launch_date, now)),
    orderBy: (c, { asc }) => [asc(c.launch_date)],
    limit,
  });
}

export async function getLiveCampaigns(limit = 3) {
  return db.query.campaigns.findMany({
    where: (c, { eq }) => eq(c.status, 'live'),
    orderBy: (c, { desc }) => [desc(c.starts_at)],
    limit,
  });
}
