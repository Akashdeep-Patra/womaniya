import { setRequestLocale }   from 'next-intl/server';
import { getTranslations }    from 'next-intl/server';
import type { Metadata }      from 'next';

import { Header }             from '@/components/layout/Header';
import { Footer }             from '@/components/layout/Footer';
import { BottomNav }          from '@/components/layout/BottomNav';
import { WhatsAppSection }    from '@/components/storefront/WhatsAppSection';
import { AlponaDivider }      from '@/components/illustrations/AlponaDivider';
import { PaisleyCluster }     from '@/components/illustrations/PaisleyCluster';
import { JamdaniMotif }       from '@/components/illustrations/JamdaniMotif';
import { KanthaStitch }       from '@/components/illustrations/KanthaStitch';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title:       t('title'),
    description: t('intro'),
    alternates: {
      canonical: `/${locale}/about`,
      languages: { en: '/en/about', bn: '/bn/about' },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t  = await getTranslations({ locale, namespace: 'about' });
  const ts = await getTranslations({ locale, namespace: 'story' });
  const tp = await getTranslations({ locale, namespace: 'process' });
  const isBn = locale === 'bn';

  const stats = [
    { num: t('stat_1_num'), label: t('stat_1_label') },
    { num: t('stat_2_num'), label: t('stat_2_label') },
    { num: t('stat_3_num'), label: t('stat_3_label') },
  ];

  const steps = [
    { num: '01', title: tp('step_1'), desc: tp('step_1_desc') },
    { num: '02', title: tp('step_2'), desc: tp('step_2_desc') },
    { num: '03', title: tp('step_3'), desc: tp('step_3_desc') },
    { num: '04', title: tp('step_4'), desc: tp('step_4_desc') },
  ];

  return (
    <>
      <Header />

      <main className="pt-28 md:pt-32 pb-32 md:pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Badge */}
          <p className="text-[10px] tracking-[0.3em] uppercase text-bengal-kansa font-sans-en mb-4">
            {t('badge')}
          </p>

          {/* Title */}
          <h1 className={`font-editorial text-4xl md:text-6xl text-bengal-kajal mb-6 leading-tight ${isBn ? 'font-bengali-serif' : ''}`}>
            {t('title')}
          </h1>

          <AlponaDivider width={240} className="mb-10 opacity-60" />

          {/* Body */}
          <div className={`space-y-6 text-bengal-kajal/70 text-base md:text-lg leading-relaxed max-w-3xl ${isBn ? 'font-bengali' : ''}`}>
            <p>{t('intro')}</p>
            <p>{t('body_1')}</p>
            <p>{t('body_2')}</p>
            <p>{t('body_3')}</p>
          </div>

          {/* Closing quote */}
          <blockquote className={`font-editorial text-bengal-kansa text-xl md:text-2xl italic border-l-2 border-bengal-kansa/40 pl-6 mt-10 mb-12 ${isBn ? 'font-bengali-serif' : ''}`}>
            &ldquo;{t('closing')}&rdquo;
          </blockquote>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-16">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-editorial text-4xl md:text-5xl text-bengal-sindoor">{s.num}</p>
                <p className={`text-bengal-kajal/50 text-xs tracking-wide mt-1 ${isBn ? 'font-bengali text-sm' : 'font-sans-en uppercase'}`}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Decorative divider */}
          <div className="relative py-12">
            <div className="absolute inset-0 flex items-center justify-center">
              <JamdaniMotif className="w-full h-full" opacity={0.06} />
            </div>
            <div className="relative flex justify-center">
              <PaisleyCluster size={80} color="#C5A059" className="opacity-30" />
            </div>
          </div>

          {/* Story section */}
          <div className="mb-16">
            <p className="text-[10px] tracking-[0.3em] uppercase text-bengal-kansa font-sans-en mb-4">
              {ts('title')}
            </p>
            <p className={`text-bengal-kajal/70 text-base md:text-lg leading-relaxed max-w-3xl ${isBn ? 'font-bengali' : ''}`}>
              {ts('body')}
            </p>
          </div>

          {/* Process steps */}
          <div className="mb-16">
            <p className="text-[10px] tracking-[0.3em] uppercase text-bengal-kansa font-sans-en mb-6">
              {tp('badge')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map((step) => (
                <div key={step.num} className="border border-bengal-kansa/15 rounded-2xl p-6">
                  <span className="font-editorial text-2xl text-bengal-kansa/30">{step.num}</span>
                  <h3 className={`font-editorial text-lg text-bengal-kajal mt-2 mb-2 ${isBn ? 'font-bengali-serif' : ''}`}>
                    {step.title}
                  </h3>
                  <p className={`text-bengal-kajal/60 text-sm leading-relaxed ${isBn ? 'font-bengali' : ''}`}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <KanthaStitch color="#C5A059" width={280} rows={2} className="mx-auto opacity-25 mb-8" />
        </div>

        <WhatsAppSection />
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}
