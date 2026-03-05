import { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { products, categories, collections, campaigns, pages } from '@/db/schema';
import { eq, or } from 'drizzle-orm';
import { routing } from '@/i18n/routing';
import { VISIBLE_LIFECYCLE_STATUSES } from '@/db/enums';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://womaniya.in';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allProducts = await db.query.products.findMany({
    where: eq(products.status, 'published'),
    columns: { slug: true, updated_at: true },
  });

  const allCategories = await db.query.categories.findMany({
    where: eq(categories.status, 'published'),
    columns: { slug: true, updated_at: true },
  });

  const allCollections = await db.query.collections.findMany({
    where: or(...VISIBLE_LIFECYCLE_STATUSES.map((s) => eq(collections.status, s))),
    columns: { slug: true, updated_at: true },
  });

  const allCampaigns = await db.query.campaigns.findMany({
    where: or(...VISIBLE_LIFECYCLE_STATUSES.map((s) => eq(campaigns.status, s))),
    columns: { slug: true, updated_at: true },
  });

  const allPages = await db.query.pages.findMany({
    where: eq(pages.status, 'published'),
    columns: { slug: true, updated_at: true },
  });

  const sitemapEntries: MetadataRoute.Sitemap = [];

  const locales = routing.locales;

  // Static routes
  const staticRoutes = ['', '/shop', '/stories'];

  for (const route of staticRoutes) {
    sitemapEntries.push({
      url: `${baseUrl}/en${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [locale, `${baseUrl}/${locale}${route}`])
        ),
      },
    });
  }

  // Dynamic products
  for (const product of allProducts) {
    sitemapEntries.push({
      url: `${baseUrl}/en/shop/${product.slug}`,
      lastModified: product.updated_at || new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [locale, `${baseUrl}/${locale}/shop/${product.slug}`])
        ),
      },
    });
  }

  // Dynamic categories
  for (const category of allCategories) {
    sitemapEntries.push({
      url: `${baseUrl}/en/category/${category.slug}`,
      lastModified: category.updated_at || new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [locale, `${baseUrl}/${locale}/category/${category.slug}`])
        ),
      },
    });
  }

  // Dynamic collections
  for (const collection of allCollections) {
    sitemapEntries.push({
      url: `${baseUrl}/en/collection/${collection.slug}`,
      lastModified: collection.updated_at || new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [locale, `${baseUrl}/${locale}/collection/${collection.slug}`])
        ),
      },
    });
  }

  // Dynamic campaigns
  for (const campaign of allCampaigns) {
    sitemapEntries.push({
      url: `${baseUrl}/en/campaign/${campaign.slug}`,
      lastModified: campaign.updated_at || new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [locale, `${baseUrl}/${locale}/campaign/${campaign.slug}`])
        ),
      },
    });
  }

  // Dynamic pages
  for (const page of allPages) {
    sitemapEntries.push({
      url: `${baseUrl}/en/pages/${page.slug}`,
      lastModified: page.updated_at || new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [locale, `${baseUrl}/${locale}/pages/${page.slug}`])
        ),
      },
    });
  }

  return sitemapEntries;
}
