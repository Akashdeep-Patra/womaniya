import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import { EmptyState } from '@/components/storefront/EmptyState';
import { HeroCarousel } from '@/components/storefront/HeroCarousel';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const collection = await db.query.collections.findFirst({
    where: (c, { eq }) => eq(c.slug, slug),
  });
  if (!collection || collection.status === 'draft' || collection.status === 'archived') return { title: 'Not Found' };

  const title = (locale === 'bn' && collection.seo_title_bn ? collection.seo_title_bn : collection.seo_title_en) || 
                (locale === 'bn' && collection.name_bn ? collection.name_bn : collection.name_en);
  const description = (locale === 'bn' && collection.seo_description_bn ? collection.seo_description_bn : collection.seo_description_en) || 
                      (locale === 'bn' && collection.description_bn ? collection.description_bn : collection.description_en) ||
                      `${title} — Authentic Handloom Collection by Womaniya`;
  const imgs = (collection.carousel_images as string[] | null) ?? [];
  const ogImage = imgs[0] ?? undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `/${locale}/collection/${slug}`,
      languages: { en: `/en/collection/${slug}`, bn: `/bn/collection/${slug}` },
    },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const collection = await db.query.collections.findFirst({
    where: (c, { eq }) => eq(c.slug, slug),
    with: {
      productLinks: {
        orderBy: (pl, { asc }) => [asc(pl.sort_order)],
        with: {
          product: true,
        }
      }
    }
  });

  if (!collection || collection.status === 'draft' || collection.status === 'archived') notFound();

  const products = collection.productLinks.map(pl => pl.product).filter(p => p.status === 'published');

  const name = locale === 'bn' ? collection.name_bn || collection.name_en : collection.name_en;
  const allImages = (collection.carousel_images as string[] | null) ?? [];
  const hasImages = allImages.length > 0;

  const heroOverlay = (
    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center z-10 pb-12 md:pb-16">
      <h1 className="text-4xl md:text-6xl font-editorial text-white text-center px-4 drop-shadow-lg">
        {name}
      </h1>
    </div>
  );

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://womaniya.in/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Collections', item: `https://womaniya.in/${locale}/collections` },
      { '@type': 'ListItem', position: 3, name: collection.name_en, item: `https://womaniya.in/${locale}/collection/${slug}` },
    ],
  };

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.name_en,
    description: collection.description_en ?? `${collection.name_en} — Authentic Handloom Collection by Womaniya`,
    url: `https://womaniya.in/${locale}/collection/${slug}`,
    ...(allImages[0] ? { image: allImages[0] } : {}),
    numberOfItems: products.length,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
    <div className="min-h-screen bg-bengal-cream pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {hasImages && allImages.length > 1 ? (
          <div className="relative w-full h-72 md:h-112 rounded-2xl overflow-hidden mb-8">
            <HeroCarousel
              images={allImages}
              alt={name}
              className="h-full"
              overlay={heroOverlay}
            />
          </div>
        ) : hasImages ? (
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <Image src={allImages[0]} alt={name} fill className="object-cover" />
            {heroOverlay}
          </div>
        ) : (
          <h1 className="text-4xl md:text-6xl font-editorial text-bengal-kajal mb-8 text-center">
            {name}
          </h1>
        )}

        <p className="text-center max-w-2xl mx-auto mb-12 text-bengal-kajal/70 font-sans-en">
          {locale === 'bn' ? collection.description_bn || collection.description_en : collection.description_en}
        </p>

        {products.length === 0 ? (
          <div className="col-span-full">
            <EmptyState message={locale === 'bn' ? 'এই কালেকশনে এখনো কোনো শাড়ি আসেনি।' : 'No products available in this collection yet.'} />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(p => (
              <Link prefetch={true} key={p.id} href={`/${locale}/shop/${p.slug}`} className="group">
                <div className="relative aspect-3/4 rounded-xl overflow-hidden bg-bengal-mati mb-3">
                  <Image src={p.image_url} alt={p.name_en} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="font-medium text-bengal-kajal">{locale === 'bn' ? p.name_bn || p.name_en : p.name_en}</h3>
                <p className="text-bengal-sindoor font-editorial">₹{p.price}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}