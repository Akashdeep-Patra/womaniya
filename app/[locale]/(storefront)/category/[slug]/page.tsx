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
  const category = await db.query.categories.findFirst({
    where: (c, { eq }) => eq(c.slug, slug),
  });
  if (!category || category.status !== 'published') return { title: 'Not Found' };

  const title = (locale === 'bn' && category.seo_title_bn ? category.seo_title_bn : category.seo_title_en) || 
                (locale === 'bn' && category.name_bn ? category.name_bn : category.name_en);
  const description = (locale === 'bn' && category.seo_description_bn ? category.seo_description_bn : category.seo_description_en) || 
                      (locale === 'bn' && category.description_bn ? category.description_bn : category.description_en) ||
                      `${title} — Authentic Handloom by Womaniya`;
  const imgs = (category.carousel_images as string[] | null) ?? [];
  const ogImage = imgs[0] ?? undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    alternates: {
      canonical: `/${locale}/category/${slug}`,
      languages: { en: `/en/category/${slug}`, bn: `/bn/category/${slug}` },
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const category = await db.query.categories.findFirst({
    where: (c, { eq }) => eq(c.slug, slug),
    with: {
      products: {
        where: (p, { eq }) => eq(p.status, 'published'),
      }
    }
  });

  if (!category || category.status !== 'published') notFound();

  const name = locale === 'bn' ? category.name_bn || category.name_en : category.name_en;
  const allImages = (category.carousel_images as string[] | null) ?? [];
  const hasImages = allImages.length > 0;

  const heroOverlay = (
    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center z-10 pb-12 md:pb-16">
      <h1 className="text-4xl md:text-6xl font-editorial text-white text-center px-4 drop-shadow-lg">
        {name}
      </h1>
    </div>
  );

  return (
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
          {locale === 'bn' ? category.description_bn || category.description_en : category.description_en}
        </p>

        {category.products.length === 0 ? (
          <div className="col-span-full">
            <EmptyState message={locale === 'bn' ? 'এই বিভাগে এখনো কোনো শাড়ি আসেনি।' : 'No products available in this category yet.'} />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {category.products.map(p => (
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
  );
}