import { notFound }          from 'next/navigation';
import Image                 from 'next/image';
import Link                  from 'next/link';
import { setRequestLocale }  from 'next-intl/server';
import { getTranslations }   from 'next-intl/server';
import type { Metadata }     from 'next';
import { ArrowLeft }         from 'lucide-react';

import { Header }            from '@/components/layout/Header';
import { Footer }            from '@/components/layout/Footer';
import { BottomNav }         from '@/components/layout/BottomNav';
import { BengalButton }      from '@/components/bengal';
import { BengalBadge }       from '@/components/bengal';
import { AlponaDivider }     from '@/components/illustrations/AlponaDivider';
import { KanthaStitch }      from '@/components/illustrations/KanthaStitch';
import { getProductBySlug }  from '@/actions/products';
import { productOrderUrl }   from '@/lib/whatsapp';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  let product;
  try { product = await getProductBySlug(slug); } catch { /* dev */ }
  if (!product) return { title: 'Product Not Found' };
  const name = locale === 'bn' && product.name_bn ? product.name_bn : product.name_en;
  const description = product.description_en ?? `${name} — Authentic Handloom by Womaniya`;

  return {
    title: name,
    description,
    openGraph: {
      title: name,
      description,
      images: [product.image_url],
    },
    twitter: {
      card: 'summary_large_image',
      title: name,
      description,
      images: [product.image_url],
    },
    alternates: {
      canonical: `/${locale}/shop/${slug}`,
      languages: { en: `/en/shop/${slug}`, bn: `/bn/shop/${slug}` },
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
  const waUrl = productOrderUrl(product.name_en, product.price, locale);

  const jsonLd = {
    '@context':  'https://schema.org',
    '@type':     'Product',
    name:        product.name_en,
    image:       product.image_url,
    description: product.description_en ?? '',
    offers: {
      '@type':       'Offer',
      price:         product.price,
      priceCurrency: 'INR',
      availability:  'https://schema.org/InStock',
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://womaniya.in/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Shop',
        item: `https://womaniya.in/${locale}/shop`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: name,
        item: `https://womaniya.in/${locale}/shop/${slug}`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Header />

      <main className="pt-14 md:pt-16 pb-32 md:pb-16 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* Breadcrumb */}
          <Link
            href={`/${locale}/shop`}
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-bengal-kajal/50 hover:text-bengal-sindoor mt-6 mb-8 transition-colors"
          >
            <ArrowLeft size={16} strokeWidth={2} className="drop-shadow-sm" /> {t('back')}
          </Link>

          {/* Product grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">

            {/* Image */}
            <div className="relative aspect-3/4 rounded-3xl overflow-hidden bg-bengal-mati shadow-xl shadow-bengal-kajal/10" data-cursor-expand>
              <Image
                src={product.image_url}
                alt={name}
                fill priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {product.is_featured && (
                <div className="absolute top-4 left-4">
                  <BengalBadge variant="kansa">{isBn ? 'ফিচার্ড' : 'Featured'}</BengalBadge>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <BengalBadge variant="mati" className="self-start mb-4">{product.category}</BengalBadge>

              <h1 className={`font-editorial text-3xl md:text-4xl text-bengal-kajal mb-3 leading-snug ${isBn ? 'font-bengali-serif' : ''}`}>
                {name}
              </h1>

              <AlponaDivider width={180} className="mb-4" />

              <p className="font-editorial text-bengal-sindoor text-4xl mb-5 leading-none">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </p>

              {desc && (
                <p className={`text-bengal-kajal/65 text-sm leading-relaxed mb-6 ${isBn ? 'font-bengali' : ''}`}>
                  {desc}
                </p>
              )}

              {/* Attribute tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                <BengalBadge variant="sindoor">{t('handwoven')}</BengalBadge>
                <BengalBadge variant="kansa">{t('authentic')}</BengalBadge>
                <BengalBadge variant="mati">{t('artisan_made')}</BengalBadge>
              </div>

              {/* CTA — WhatsApp primary */}
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <BengalButton variant="whatsapp" size="touch" isBengali={isBn} className="mb-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="mr-2 flex-shrink-0 inline">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t('whatsapp_order')}
                </BengalButton>
              </a>

              <p className="text-center text-bengal-kajal/35 text-[10px] tracking-widest uppercase mb-6">
                {isBn ? 'সাধারণত ১ ঘণ্টার মধ্যে উত্তর' : 'Usually replies within 1 hour'}
              </p>

              {/* Kantha stitch divider */}
              <KanthaStitch color="#C5A059" width={300} rows={2} className="mb-5 opacity-60" />

              {/* Product meta */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-xs">
                <div>
                  <p className="tracking-widest uppercase text-bengal-kajal/40 mb-1 font-sans-en">{t('category')}</p>
                  <p className="font-medium text-bengal-kajal">{product.category}</p>
                </div>
                <div>
                  <p className="tracking-widest uppercase text-bengal-kajal/40 mb-1 font-sans-en">{t('price')}</p>
                  <p className="font-editorial text-bengal-sindoor text-base">₹{Number(product.price).toLocaleString('en-IN')}</p>
                </div>
                <div className="col-span-2">
                  <p className="tracking-widest uppercase text-bengal-kajal/40 mb-1 font-sans-en">{t('care')}</p>
                  <p className={`text-bengal-kajal/60 ${isBn ? 'font-bengali' : ''}`}>{t('care_desc')}</p>
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
