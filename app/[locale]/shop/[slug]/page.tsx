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
import { ShareButton }       from '@/components/storefront/ShareButton';
import { getProductBySlug, getProductImages }  from '@/actions/products';
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
  ];

  const name = isBn && product.name_bn ? product.name_bn : product.name_en;
  const desc = isBn && product.description_bn ? product.description_bn : product.description_en;
  const waUrl = productOrderUrl(product.name_en, product.price, locale);

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Header />

      <main className="pt-14 md:pt-24 pb-32 md:pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <Link
            href={`/${locale}/shop`}
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-bengal-kajal/50 hover:text-bengal-sindoor mb-6 md:mb-10 transition-colors font-sans-en"
          >
            <ArrowLeft size={14} strokeWidth={2} /> {t('back')}
          </Link>

          {/* Product grid layout */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">

            {/* Left: Image Gallery (Scrollable on desktop, snap carousel on mobile) */}
            <div className="w-full lg:w-3/5 xl:w-2/3">
              <div className="flex overflow-x-auto lg:flex-col gap-4 lg:gap-6 pb-4 lg:pb-0 snap-x snap-mandatory scrollbar-none -mx-4 px-4 lg:mx-0 lg:px-0">
                {allImages.map((img, i) => (
                  <div 
                    key={img.id} 
                    className="relative shrink-0 snap-start w-[85vw] sm:w-[60vw] lg:w-full aspect-[3/4] lg:aspect-[4/5] rounded-2xl lg:rounded-3xl overflow-hidden bg-bengal-mati shadow-md"
                  >
                    <Image
                      src={img.image_url}
                      alt={img.alt_en || name}
                      fill
                      priority={i === 0}
                      className="object-cover"
                      sizes="(max-width: 1024px) 85vw, 66vw"
                    />
                    {i === 0 && product.is_featured && (
                      <div className="absolute top-4 left-4 z-10">
                        <BengalBadge variant="kansa">{isBn ? 'ফিচার্ড' : 'Featured'}</BengalBadge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Mobile image indicator dots */}
              {allImages.length > 1 && (
                <div className="flex lg:hidden justify-center gap-1.5 mt-2">
                  {allImages.map((_, i) => (
                    <div key={i} className={`h-1 rounded-full ${i === 0 ? 'w-5 bg-bengal-sindoor' : 'w-1.5 bg-bengal-kajal/20'}`} />
                  ))}
                </div>
              )}
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

              {/* Attributes Layout (Fabric, Sizes, Colors) */}
              <div className="flex flex-col gap-4 mb-8">
                {product.fabric && (
                  <div className="flex items-start gap-4">
                    <span className="text-[10px] tracking-widest uppercase text-bengal-kajal/50 font-sans-en w-20 shrink-0 pt-1">Fabric</span>
                    <span className={`text-sm text-bengal-kajal/90 ${isBn ? 'font-bengali' : 'font-sans-en'}`}>{product.fabric}</span>
                  </div>
                )}
                {product.sizes && (
                  <div className="flex items-start gap-4">
                    <span className="text-[10px] tracking-widest uppercase text-bengal-kajal/50 font-sans-en w-20 shrink-0 pt-1">Sizes</span>
                    <span className={`text-sm text-bengal-kajal/90 ${isBn ? 'font-bengali' : 'font-sans-en'}`}>{product.sizes}</span>
                  </div>
                )}
                {product.colors && (
                  <div className="flex items-start gap-4">
                    <span className="text-[10px] tracking-widest uppercase text-bengal-kajal/50 font-sans-en w-20 shrink-0 pt-1">Colors</span>
                    <span className={`text-sm text-bengal-kajal/90 ${isBn ? 'font-bengali' : 'font-sans-en'}`}>{product.colors}</span>
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
              <div className="flex flex-col gap-3 mb-4">
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                  <BengalButton variant="whatsapp" size="touch" isBengali={isBn} className="w-full text-base">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2.5 flex-shrink-0 inline">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {t('whatsapp_order')}
                  </BengalButton>
                </a>
                
                <ShareButton />
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
                    <p className={`text-xs text-bengal-kajal font-medium ${isBn ? 'font-bengali' : ''}`}>Dry Clean Only</p>
                  </div>
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
