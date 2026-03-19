'use client';

import { motion }            from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { KanthaStitch }      from '@/components/illustrations/KanthaStitch';
import { ZariThread }        from '@/components/illustrations/ZariThread';

export function GlimpsesSection() {
  const t    = useTranslations('how_made');
  const isBn = useLocale() === 'bn';

  const steps = [
    { n: t('step_1_n'), title: t('step_1_title'), body: t('step_1_body') },
    { n: t('step_2_n'), title: t('step_2_title'), body: t('step_2_body') },
    { n: t('step_3_n'), title: t('step_3_title'), body: t('step_3_body') },
    { n: t('step_4_n'), title: t('step_4_title'), body: t('step_4_body') },
  ];

  return (
    <section id="glimpses" className="bg-background text-foreground py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <p className="text-primary text-[10px] tracking-[0.3em] uppercase mb-4 font-sans-en">
            {t('badge')}
          </p>
          <h2 className={`font-editorial text-4xl md:text-5xl lg:text-6xl leading-tight max-w-2xl ${isBn ? 'font-bengali-serif' : 'italic'}`}>
            {t('title')}
          </h2>
        </motion.div>

        {/* Timeline weaving down */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Thread for desktop */}
          <div className="absolute left-[27px] md:left-1/2 top-4 bottom-4 w-px bg-border -translate-x-1/2 hidden md:block" />

          <div className="space-y-12 md:space-y-24">
            {steps.map(({ n, title, body }, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Decorative Node */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-card border border-border items-center justify-center z-10 shadow-sm">
                    <span className="font-editorial text-xl text-primary">{n}</span>
                  </div>

                  {/* Mobile Node */}
                  <div className="flex md:hidden w-12 h-12 rounded-full border border-border items-center justify-center shrink-0 bg-card">
                    <span className="font-editorial text-lg text-primary">{n}</span>
                  </div>

                  <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <h3 className={`font-editorial text-2xl md:text-3xl text-foreground mb-4 ${isBn ? 'font-bengali-serif' : ''}`}>
                      {title}
                    </h3>
                    <p className={`text-muted-foreground text-base md:text-lg leading-relaxed max-w-sm ${isEven ? 'md:ml-auto' : ''} ${isBn ? 'font-bengali' : 'font-sans-en font-light'}`}>
                      {body}
                    </p>
                  </div>

                  {/* Empty div for balancing grid on desktop */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <KanthaStitch color="var(--primary)" width={220} rows={2} className="opacity-40" />
        </div>
      </div>
    </section>
  );
}
