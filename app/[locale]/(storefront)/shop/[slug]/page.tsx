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
import { ProductImageCarousel } from '@/components/storefront/ProductImageCarousel';
import { ProductOrderSection }  from '@/components/storefront/ProductOrderSection';
import { getProductBySlug, getProductImages }  from '@/actions/products';
import { getSetting }        from '@/actions/settings';
import { WhatsAppContextSetter } from '@/lib/whatsapp-context';

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
  let additionalImages: Awaited<ReturnType<typeof getProductImages>> = [];
  try { 
    product = await getProductBySlug(slug); 
    if (product) {
      additionalImages = await getProductImages(product.id);
    }
  } catch { /* dev */ }
  
  if (!product) notFound();

  // Combine primary image with additional images
  const allImages = [
    { id: 'primary', image_url: product.image_url, alt_en: product.name_en },
    ...additionalImages
  ].filter(img => img && img.image_url && typeof img.image_url === 'string' && img.image_url.trim() !== '');

  const name = isBn && product.name_bn ? product.name_bn : product.name_en;
  const desc = isBn && product.description_bn ? product.description_bn : product.description_en;
  const waNumber = await getSetting('whatsapp_number', '919143161829');

  const jsonLd = {
    '@context':  'https://schema.org',
    '@type':     'Product',
    name:        product.name_en,
    image:       allImages.map(img => img.image_url),
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
      <WhatsAppContextSetter context={{ type: 'product', name, price: product.price, sku: product.sku }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <main id="main-content" className="pt-14 md:pt-24 pb-32 md:pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <Link prefetch={true}
            href={`/${locale}/shop`}
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-bengal-kajal/50 hover:text-bengal-sindoor mb-6 md:mb-10 transition-colors font-sans-en"
          >
            <ArrowLeft size={14} strokeWidth={2} /> {t('back')}
          </Link>

          {/* Product grid layout */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">

            {/* Left: Image Gallery (Scrollable on desktop, snap carousel on mobile) */}
            <div className="w-full lg:w-3/5 xl:w-2/3">
              <ProductImageCarousel 
                images={allImages.map(img => img.image_url)} 
                productName={name} 
              />
            </div>

            {/* Right: Sticky Product Details */}
            <div className="w-full lg:w-2/5 xl:w-1/3 lg:sticky lg:top-24 flex flex-col pt-2 lg:pt-0">
              <BengalBadge variant="mati" className="self-start mb-4 md:mb-5">{product.category}</BengalBadge>

              <h1 className={`font-editorial text-3xl md:text-5xl text-bengal-kajal mb-4 leading-[1.1] ${isBn ? 'font-bengali-serif' : ''}`}>
                {name}
              </h1>

              <p className="font-editorial text-bengal-sindoor text-3xl md:text-4xl mb-6">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </p>

              <AlponaDivider width={160} className="mb-6 opacity-60" />

              {/* Attributes Layout */}
              <div className="flex flex-col gap-4 mb-8">
                {product.sku && (
                  <div className="flex items-start gap-4 mb-2">
                    <span className="text-[10px] tracking-widest uppercase text-bengal-kajal/50 font-sans-en w-20 shrink-0 pt-1">SKU</span>
                    <span className="text-sm text-bengal-kajal/90 font-sans-en font-mono">{product.sku}</span>
                  </div>
                )}
                {product.fabric && (
                  <div className="flex items-start gap-4">
                    <span className="text-[10px] tracking-widest uppercase text-bengal-kajal/50 font-sans-en w-20 shrink-0 pt-1">Fabric</span>
                    <span className={`text-sm text-bengal-kajal/90 ${isBn ? 'font-bengali' : 'font-sans-en'}`}>{product.fabric}</span>
                  </div>
                )}
                {product.weight && (
                  <div className="flex items-start gap-4">
                    <span className="text-[10px] tracking-widest uppercase text-bengal-kajal/50 font-sans-en w-20 shrink-0 pt-1">Weight</span>
                    <span className={`text-sm text-bengal-kajal/90 ${isBn ? 'font-bengali' : 'font-sans-en'}`}>{product.weight}</span>
                  </div>
                )}
                {product.origin && (
                  <div className="flex items-start gap-4">
                    <span className="text-[10px] tracking-widest uppercase text-bengal-kajal/50 font-sans-en w-20 shrink-0 pt-1">Origin</span>
                    <span className={`text-sm text-bengal-kajal/90 ${isBn ? 'font-bengali' : 'font-sans-en'}`}>{product.origin}</span>
                  </div>
                )}
              </div>

              {desc && (
                <div className="mb-8">
                  <span className="text-[10px] tracking-widest uppercase text-bengal-kajal/50 font-sans-en block mb-3">
                    {t('description')}
                  </span>
                  <p className={`text-bengal-kajal/70 text-sm md:text-base leading-relaxed ${isBn ? 'font-bengali' : ''}`}>
                    {desc}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mb-4">
                <ProductOrderSection product={product} locale={locale} isBn={isBn} waNumber={waNumber} />
              </div>

              <p className="text-center text-bengal-kajal/35 text-[9px] tracking-[0.2em] uppercase mb-10 font-sans-en">
                {isBn ? 'সাধারণত ১ ঘণ্টার মধ্যে উত্তর' : 'Usually replies within 1 hour'}
              </p>

              <KanthaStitch color="#C5A059" width={280} rows={1} className="mx-auto mb-8 opacity-40" />

              {/* Badges / Guarantees */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-bengal-mati flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-bengal-sindoor">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[9px] tracking-widest uppercase text-bengal-kajal/50 font-sans-en mb-0.5">{t('authentic')}</p>
                    <p className={`text-xs text-bengal-kajal font-medium ${isBn ? 'font-bengali' : ''}`}>{t('handwoven')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-bengal-mati flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-bengal-sindoor">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                      <line x1="9" y1="9" x2="9.01" y2="9"/>
                      <line x1="15" y1="9" x2="15.01" y2="9"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[9px] tracking-widest uppercase text-bengal-kajal/50 font-sans-en mb-0.5">{t('care')}</p>
                    <p className={`text-xs text-bengal-kajal font-medium ${isBn ? 'font-bengali' : ''}`}>{product.care_instructions || 'Dry Clean Only'}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}
