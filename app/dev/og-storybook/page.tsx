export const dynamic = 'force-dynamic';

import { db } from '@/lib/db';
import OgGrid from './OgGrid';

type SlugCard = {
  name: string;
  path: string;
  description: string;
};

export default async function OgStorybookPage() {
  // Fetch one real slug from each content type in parallel
  const [product, storyPage, collection, campaign, category, staticPage] =
    await Promise.all([
      db.query.products.findFirst({
        where: (p, { eq }) => eq(p.status, 'published'),
        columns: { slug: true, name_en: true },
      }),
      db.query.pages.findFirst({
        where: (p, { and, eq }) =>
          and(eq(p.page_type, 'story'), eq(p.status, 'published')),
        columns: { slug: true, title_en: true },
      }),
      db.query.collections.findFirst({
        where: (c, { eq }) => eq(c.status, 'live'),
        columns: { slug: true, name_en: true },
      }),
      db.query.campaigns.findFirst({
        where: (c, { eq }) => eq(c.status, 'live'),
        columns: { slug: true, name_en: true },
      }),
      db.query.categories.findFirst({
        where: (c, { eq }) => eq(c.status, 'published'),
        columns: { slug: true, name_en: true },
      }),
      db.query.pages.findFirst({
        where: (p, { and, eq }) =>
          and(eq(p.page_type, 'static'), eq(p.status, 'published')),
        columns: { slug: true, title_en: true },
      }),
    ]);

  // Static cards — always present
  const staticCards: SlugCard[] = [
    {
      name:        'Root opengraph',
      path:        '/opengraph-image',
      description: 'Site root (app/opengraph-image.tsx)',
    },
    {
      name:        'Home (locale)',
      path:        '/en/opengraph-image',
      description: 'Storefront home (app/[locale]/(storefront)/opengraph-image.tsx)',
    },
    {
      name:        'Shop index',
      path:        '/en/shop/opengraph-image',
      description: 'Shop listing page',
    },
    {
      name:        'Stories index',
      path:        '/en/stories/opengraph-image',
      description: 'Stories listing page',
    },
    {
      name:        'Collections index',
      path:        '/en/collections/opengraph-image',
      description: 'Collections listing page',
    },
    {
      name:        'Campaigns index',
      path:        '/en/campaigns/opengraph-image',
      description: 'Campaigns listing page',
    },
    {
      name:        'Categories index',
      path:        '/en/categories/opengraph-image',
      description: 'Categories listing page',
    },
    {
      name:        'About',
      path:        '/en/about/opengraph-image',
      description: 'About page',
    },
  ];

  // Dynamic cards — only when real slugs exist in the DB
  const dynamicCards: SlugCard[] = [
    ...(product
      ? [
          {
            name:        `Product — ${product.name_en}`,
            path:        `/en/shop/${product.slug}/opengraph-image`,
            description: 'Product card with image + price',
          },
        ]
      : []),
    ...(storyPage
      ? [
          {
            name:        `Story — ${storyPage.title_en}`,
            path:        `/en/stories/${storyPage.slug}/opengraph-image`,
            description: 'Story page with cover image',
          },
        ]
      : []),
    ...(collection
      ? [
          {
            name:        `Collection — ${collection.name_en}`,
            path:        `/en/collection/${collection.slug}/opengraph-image`,
            description: 'Collection with carousel image',
          },
        ]
      : []),
    ...(campaign
      ? [
          {
            name:        `Campaign — ${campaign.name_en}`,
            path:        `/en/campaign/${campaign.slug}/opengraph-image`,
            description: 'Live campaign card',
          },
        ]
      : []),
    ...(category
      ? [
          {
            name:        `Category — ${category.name_en}`,
            path:        `/en/category/${category.slug}/opengraph-image`,
            description: 'Category card',
          },
        ]
      : []),
    ...(staticPage
      ? [
          {
            name:        `Page — ${staticPage.title_en}`,
            path:        `/en/pages/${staticPage.slug}/opengraph-image`,
            description: 'Generic static page',
          },
        ]
      : []),
  ];

  const allCards = [...staticCards, ...dynamicCards];

  return (
    <div
      style={{
        background:  '#0D0D0D',
        minHeight:   '100vh',
        padding:     '48px 32px 80px',
        fontFamily:  'system-ui, -apple-system, sans-serif',
      }}
    >
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>

        {/* ── Page header ─────────────────────────────────────────────── */}
        <div style={{ marginBottom: 56 }}>
          <div
            style={{
              display:    'flex',
              alignItems: 'center',
              gap:        12,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width:          36,
                height:         36,
                borderRadius:   '50%',
                background:     '#C0392B',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                color:          '#F9F6F0',
                fontWeight:     700,
                fontSize:       18,
                flexShrink:     0,
              }}
            >
              W
            </div>
            <span
              style={{
                color:         '#C5A059',
                fontWeight:    700,
                letterSpacing: '0.18em',
                fontSize:      12,
                textTransform: 'uppercase',
              }}
            >
              Womaniya — Dev Tools
            </span>
          </div>

          <h1
            style={{
              color:      '#F9F6F0',
              fontSize:   38,
              fontWeight: 700,
              margin:     '0 0 10px 0',
            }}
          >
            OG Card Storybook
          </h1>
          <p style={{ color: '#555', fontSize: 14, margin: 0 }}>
            {allCards.length} cards&nbsp;&middot;&nbsp;1200&times;630 px each&nbsp;&middot;&nbsp;
            Images are discovered by fetching each page&apos;s HTML and extracting the{' '}
            <code
              style={{
                background:    '#1a1a1a',
                color:         '#C5A059',
                padding:       '2px 6px',
                borderRadius:  4,
                fontSize:      12,
              }}
            >
              og:image
            </code>{' '}
            meta tag URL.
          </p>
        </div>

        {/* ── Card grid — client component handles URL discovery ───────── */}
        <OgGrid cards={allCards} />
      </div>
    </div>
  );
}
