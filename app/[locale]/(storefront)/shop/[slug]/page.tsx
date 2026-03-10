import { notFound }          from 'next/navigation';
import Link                  from 'next/link';
import { setRequestLocale }  from 'next-intl/server';
import { getTranslations }   from 'next-intl/server';
import type { Metadata }     from 'next';
import { ArrowLeft, Shield, Sparkles, Hand, Clock } from 'lucide-react';

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
    },
    twitter: {
      card: 'summary_large_image',
      title: name,
      description,
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

  const allImages = [
    { id: 'primary', image_url: product.image_url, alt_en: product.name_en },
    ...additionalImages
  ].filter(img => img && img.image_url && typeof img.image_url === 'string' && img.image_url.trim() !== '');

  const name = isBn && product.name_bn ? product.name_bn : product.name_en;
  const desc = isBn && product.description_bn ? product.description_bn : product.description_en;
  const waNumber = await getSetting('whatsapp_number', '919143161829');

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://womaniyakolkata.in';

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
      availability:  product.stock_status === 'out_of_stock'
        ? 'https://schema.org/OutOfStock'
        : 'https://schema.org/InStock',
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: `${baseUrl}/${locale}/shop` },
      { '@type': 'ListItem', position: 3, name: name, item: `${baseUrl}/${locale}/shop/${slug}` },
    ],
  };

  // Collect product attributes for display
  const attributes: { label: string; value: string }[] = [];
  if (product.fabric) attributes.push({ label: isBn ? 'কাপড়' : 'Fabric', value: product.fabric });
  if (product.weight) attributes.push({ label: isBn ? 'ওজন' : 'Weight', value: product.weight });
  if (product.origin) attributes.push({ label: isBn ? 'উৎপত্তি' : 'Origin', value: product.origin });

  const stockLabel = product.stock_status === 'in_stock'
    ? (isBn ? 'স্টকে আছে' : 'In Stock')
    : product.stock_status === 'low_stock'
    ? (isBn ? 'সীমিত স্টক' : 'Low Stock')
    : product.stock_status === 'made_to_order'
    ? (isBn ? 'অর্ডার অনুযায়ী' : 'Made to Order')
    : (isBn ? 'স্টক নেই' : 'Out of Stock');

  const stockColor = product.stock_status === 'in_stock'
    ? 'text-emerald-600 dark:text-emerald-400'
    : product.stock_status === 'low_stock'
    ? 'text-amber-600 dark:text-amber-400'
    : product.stock_status === 'made_to_order'
    ? 'text-accent'
    : 'text-destructive';

  return (
    <>
      <WhatsAppContextSetter context={{ type: 'product', name, price: product.price, sku: product.sku }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, '\\u003c') }} />

      <main id="main-content" className="pt-14 md:pt-20 pb-32 md:pb-16 min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="py-4 md:py-6">
            <Link
              prefetch={true}
              href={`/${locale}/shop`}
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors font-sans-en group"
            >
              <ArrowLeft size={14} strokeWidth={2} className="group-hover:-translate-x-0.5 transition-transform" />
              {t('back')}
            </Link>
          </nav>

          {/* ── Product Layout ── */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-start">

            {/* ── Left: Image Gallery ── */}
            <div className="w-full lg:w-3/5 xl:w-[58%]">
              <ProductImageCarousel
                images={allImages.map(img => img.image_url)}
                productName={name}
              />
            </div>

            {/* ── Right: Product Details (sticky on desktop) ── */}
            <div className="w-full lg:w-2/5 xl:w-[42%] lg:sticky lg:top-20 flex flex-col">

              {/* Category + Stock */}
              <div className="flex items-center gap-2.5 mb-4">
                {product.category && (
                  <BengalBadge variant="mati" isBengali={isBn}>{product.category}</BengalBadge>
                )}
                <span className={`text-[10px] tracking-widest uppercase font-sans-en font-medium ${stockColor}`}>
                  {stockLabel}
                </span>
              </div>

              {/* Product Name */}
              <h1 className={`font-editorial text-2xl sm:text-3xl lg:text-4xl text-foreground mb-3 leading-[1.1] ${isBn ? 'font-bengali-serif' : ''}`}>
                {name}
              </h1>

              {/* Price */}
              <p className="font-editorial text-primary text-2xl sm:text-3xl mb-1">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </p>
              <p className="text-[10px] tracking-widest uppercase text-muted-foreground font-sans-en mb-5">
                {isBn ? 'সকল কর সহ' : 'Inclusive of all taxes'}
              </p>

              <AlponaDivider width={140} className="mb-6 opacity-50" />

              {/* Description */}
              {desc && (
                <div className="mb-6">
                  <p className={`text-muted-foreground text-sm md:text-[15px] leading-relaxed ${isBn ? 'font-bengali' : ''}`}>
                    {desc}
                  </p>
                </div>
              )}

              {/* Attributes Grid */}
              {(attributes.length > 0 || product.sku) && (
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-6 py-4 px-4 bg-muted/40 rounded-2xl border border-border/50">
                  {product.sku && (
                    <div>
                      <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-sans-en block mb-0.5">SKU</span>
                      <span className="text-sm text-foreground font-sans-en font-mono">{product.sku}</span>
                    </div>
                  )}
                  {attributes.map((attr) => (
                    <div key={attr.label}>
                      <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-sans-en block mb-0.5">{attr.label}</span>
                      <span className={`text-sm text-foreground ${isBn ? 'font-bengali' : 'font-sans-en'}`}>{attr.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Order Section */}
              <div className="mb-6">
                <ProductOrderSection product={product} locale={locale} isBn={isBn} waNumber={waNumber} />
              </div>

              {/* Response Time */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <Clock size={12} className="text-muted-foreground" />
                <p className="text-muted-foreground text-[10px] tracking-[0.18em] uppercase font-sans-en">
                  {isBn ? 'সাধারণত ১ ঘণ্টার মধ্যে উত্তর' : 'Usually replies within 1 hour'}
                </p>
              </div>

              <KanthaStitch color="currentColor" width={240} rows={1} className="mx-auto mb-6 opacity-20 text-border" />

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/40">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Shield size={16} strokeWidth={1.5} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground font-sans-en leading-tight">{t('authentic')}</p>
                    <p className={`text-xs text-foreground font-medium leading-tight ${isBn ? 'font-bengali' : ''}`}>{t('handwoven')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/40">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Hand size={16} strokeWidth={1.5} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground font-sans-en leading-tight">{t('care')}</p>
                    <p className={`text-xs text-foreground font-medium leading-tight ${isBn ? 'font-bengali' : ''}`}>{product.care_instructions || (isBn ? 'ড্রাই ক্লিন' : 'Dry Clean Only')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/40">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Sparkles size={16} strokeWidth={1.5} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground font-sans-en leading-tight">
                      {isBn ? 'মানের নিশ্চয়তা' : 'Quality'}
                    </p>
                    <p className={`text-xs text-foreground font-medium leading-tight ${isBn ? 'font-bengali' : ''}`}>{t('artisan_made')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/40">
                  <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.3 5.3 0 00-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground font-sans-en leading-tight">
                      {isBn ? 'যোগাযোগ' : 'Support'}
                    </p>
                    <p className={`text-xs text-foreground font-medium leading-tight ${isBn ? 'font-bengali' : ''}`}>
                      {isBn ? 'WhatsApp সাপোর্ট' : 'WhatsApp Support'}
                    </p>
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
