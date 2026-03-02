import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import { EmptyState } from '@/components/storefront/EmptyState';
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

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: category.hero_image_url ? [category.hero_image_url] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: category.hero_image_url ? [category.hero_image_url] : undefined,
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

  return (
    <div className="min-h-screen bg-bengal-cream pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {category.hero_image_url && (
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <Image src={category.hero_image_url} alt={category.name_en} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h1 className="text-4xl md:text-6xl font-editorial text-white">{locale === 'bn' ? category.name_bn || category.name_en : category.name_en}</h1>
            </div>
          </div>
        )}
        
        {!category.hero_image_url && (
          <h1 className="text-4xl md:text-6xl font-editorial text-bengal-kajal mb-8 text-center">
            {locale === 'bn' ? category.name_bn || category.name_en : category.name_en}
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
              <Link key={p.id} href={`/${locale}/shop/${p.slug}`} className="group">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-bengal-mati mb-3">
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