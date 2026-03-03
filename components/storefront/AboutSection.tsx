'use client';

import { motion }          from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams }       from 'next/navigation';
import Link                from 'next/link';
import { KanthaStitch }    from '@/components/illustrations/KanthaStitch';

export function AboutSection() {
  const t      = useTranslations('about');
  const ts     = useTranslations('story');
  const params = useParams();
  const locale = params.locale as string;
  const isBn   = locale === 'bn';

  const stats = [
    { num: t('stat_1_num'), label: t('stat_1_label') },
    { num: t('stat_2_num'), label: t('stat_2_label') },
    { num: t('stat_3_num'), label: t('stat_3_label') },
  ];

  return (
    <section id="story" className="relative bg-card text-card-foreground overflow-hidden border-y border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28 lg:py-32">

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-sans-en mb-5">
            {t('badge')}
          </p>
          <h2 className={`font-editorial text-3xl md:text-4xl xl:text-5xl leading-tight max-w-2xl mx-auto ${isBn ? 'font-bengali-serif' : ''}`}>
            {t('title')}
          </h2>
          <div className="flex justify-center mt-6">
            <KanthaStitch color="var(--primary)" width={140} rows={2} className="opacity-30" />
          </div>
        </motion.div>

        {/* ── Body text — two column on desktop ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-14 md:mb-18 text-muted-foreground text-[15px] md:text-base leading-relaxed ${isBn ? 'font-bengali' : 'font-sans-en font-light'}`}
        >
          <div className="space-y-4">
            <p>{t('intro')}</p>
            <p>{t('body_1')}</p>
          </div>
          <div className="space-y-4">
            <p>{t('body_2')}</p>
            <p>{t('body_3')}</p>
          </div>
        </motion.div>

        {/* ── Quote ── */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`relative text-center font-editorial text-xl md:text-2xl lg:text-3xl text-primary italic leading-snug max-w-3xl mx-auto mb-14 md:mb-18 ${isBn ? 'font-bengali-serif' : ''}`}
        >
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-px bg-primary/30" />
          &ldquo;{t('closing')}&rdquo;
        </motion.blockquote>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-3 gap-6 md:gap-10 max-w-md md:max-w-xl mx-auto mb-12 md:mb-14"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-editorial text-3xl md:text-4xl text-foreground leading-none">{s.num}</p>
              <p className={`text-[10px] md:text-xs text-muted-foreground tracking-widest uppercase mt-2 ${isBn ? 'font-bengali tracking-normal text-xs' : 'font-sans-en'}`}>
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── CTA ── */}
        <div className="text-center">
          <Link
            href={`/${locale}/about`}
            className="inline-flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 font-sans-en font-medium group"
          >
            <span className="w-8 h-px bg-border group-hover:bg-foreground group-hover:w-12 transition-all duration-300" />
            {ts('cta')}
            <span className="w-8 h-px bg-border group-hover:bg-foreground group-hover:w-12 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
