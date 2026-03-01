import { notFound }          from 'next/navigation';
import Image                 from 'next/image';
import Link                  from 'next/link';
import { setRequestLocale }  from 'next-intl/server';
import { getTranslations }   from 'next-intl/server';
import { Header }            from '@/components/layout/Header';
import { Footer }            from '@/components/layout/Footer';
import { BottomNav }         from '@/components/layout/BottomNav';
import { BengalButton }      from '@/components/bengal';
import { BengalBadge }       from '@/components/bengal';
import { getProductBySlug }  from '@/actions/products';
import type { Metadata }     from 'next';
import { ArrowLeft }         from 'lucide-react';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  let product;
  try { product = await getProductBySlug(slug); } catch { /* dev */ }
  if (!product) return { title: 'Product Not Found' };

  const name = locale === 'bn' && product.name_bn ? product.name_bn : product.name_en;
  return {
    title:       name,
    description: product.description_en ?? `${name} — Authentic Bengali Handloom`,
    openGraph: {
      images: [product.image_url],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t    = await getTranslations({ locale, namespace: 'product' });
  const isBn = locale === 'bn';

  let product;
  try { product = await getProductBySlug(slug); } catch { /* dev */ }
  if (!product) notFound();

  const name = isBn && product.name_bn ? product.name_bn : product.name_en;
  const desc = isBn && product.description_bn ? product.description_bn : product.description_en;

  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in buying "${product.name_en}" (₹${product.price}) from Womania.`
  );
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  // JSON-LD Product schema
  const jsonLd = {
    '@context':   'https://schema.org',
    '@type':      'Product',
    name:         product.name_en,
    image:        product.image_url,
    description:  product.description_en ?? '',
    offers: {
      '@type':        'Offer',
      price:          product.price,
      priceCurrency:  'INR',
      availability:   'https://schema.org/InStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="pt-14 md:pt-16 pb-24 md:pb-12 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* Back link */}
          <Link
            href={`/${locale}/shop`}
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-bengal-kajal/60 hover:text-bengal-sindoor mt-6 mb-6 transition-colors"
          >
            <ArrowLeft size={14} />
            {t('back')}
          </Link>

          {/* Product grid — stacked mobile, side-by-side desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

            {/* Image */}
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-bengal-mati" data-cursor-expand>
              <Image
                src={product.image_url}
                alt={name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {product.is_featured && (
                <div className="absolute top-3 left-3">
                  <BengalBadge variant="kansa">{isBn ? 'ফিচার্ড' : 'Featured'}</BengalBadge>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <BengalBadge variant="mati" className="self-start mb-4">
                {product.category}
              </BengalBadge>

              <h1 className={`font-editorial text-3xl md:text-4xl text-bengal-kajal mb-4 leading-snug ${isBn ? 'font-bengali-serif' : ''}`}>
                {name}
              </h1>

              <p className="font-editorial text-bengal-sindoor text-3xl mb-6">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </p>

              {desc && (
                <p className={`text-bengal-kajal/70 text-sm leading-relaxed mb-8 ${isBn ? 'font-bengali' : ''}`}>
                  {desc}
                </p>
              )}

              {/* Tags */}
              <div className="flex gap-2 mb-8">
                <BengalBadge variant="kansa">{t('handwoven')}</BengalBadge>
                <BengalBadge variant="kansa">{t('authentic')}</BengalBadge>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <BengalButton variant="primary" size="touch" isBengali={isBn}>
                    {t('whatsapp_order')}
                  </BengalButton>
                </a>
              </div>

              {/* Divider + meta */}
              <div className="h-px bg-bengal-kansa/25 mt-8 mb-6" />
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="tracking-widest uppercase text-bengal-kajal/40 mb-1">{t('category')}</p>
                  <p className="font-medium">{product.category}</p>
                </div>
                <div>
                  <p className="tracking-widest uppercase text-bengal-kajal/40 mb-1">{t('price')}</p>
                  <p className="font-medium font-editorial text-bengal-sindoor">
                    ₹{Number(product.price).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
