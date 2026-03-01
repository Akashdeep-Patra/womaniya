import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';

type Props = { params: Promise<{ locale: string; slug: string }> };

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

  return (
    <div className="min-h-screen bg-bengal-cream pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {collection.hero_image_url && (
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <Image src={collection.hero_image_url} alt={collection.name_en} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h1 className="text-4xl md:text-6xl font-editorial text-white">{locale === 'bn' ? collection.name_bn || collection.name_en : collection.name_en}</h1>
            </div>
          </div>
        )}
        
        {!collection.hero_image_url && (
          <h1 className="text-4xl md:text-6xl font-editorial text-bengal-kajal mb-8 text-center">
            {locale === 'bn' ? collection.name_bn || collection.name_en : collection.name_en}
          </h1>
        )}

        <p className="text-center max-w-2xl mx-auto mb-12 text-bengal-kajal/70 font-sans-en">
          {locale === 'bn' ? collection.description_bn || collection.description_en : collection.description_en}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => (
            <Link key={p.id} href={`/${locale}/shop/${p.slug}`} className="group">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-bengal-mati mb-3">
                <Image src={p.image_url} alt={p.name_en} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="font-medium text-bengal-kajal">{locale === 'bn' ? p.name_bn || p.name_en : p.name_en}</h3>
              <p className="text-bengal-sindoor font-editorial">₹{p.price}</p>
            </Link>
          ))}
          {products.length === 0 && (
            <div className="col-span-full py-24 text-center text-bengal-kajal/50">
              No products available in this collection yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}