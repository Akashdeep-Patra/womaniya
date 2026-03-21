'use client';

import { motion }                    from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { KanthaStitch }              from '@/components/illustrations/KanthaStitch';

type StepKey = 'step_1' | 'step_2' | 'step_3' | 'step_4';

const STEPS: { key: StepKey; nKey: `${StepKey}_n`; titleKey: `${StepKey}_title`; bodyKey: `${StepKey}_body` }[] = [
  { key: 'step_1', nKey: 'step_1_n', titleKey: 'step_1_title', bodyKey: 'step_1_body' },
  { key: 'step_2', nKey: 'step_2_n', titleKey: 'step_2_title', bodyKey: 'step_2_body' },
  { key: 'step_3', nKey: 'step_3_n', titleKey: 'step_3_title', bodyKey: 'step_3_body' },
  { key: 'step_4', nKey: 'step_4_n', titleKey: 'step_4_title', bodyKey: 'step_4_body' },
];

export function HowMadeSection() {
  const t     = useTranslations('how_made');
  const locale = useLocale();
  const isBn  = locale === 'bn';

  return (
    <section id="how-made" className="w-full bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-18"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-sans-en mb-5">
            {t('badge')}
          </p>
          <h2 className={`font-editorial text-3xl md:text-4xl xl:text-5xl leading-tight max-w-xl ${isBn ? 'font-bengali-serif' : ''}`}>
            {t('title')}
          </h2>
          <div className="mt-6">
            <KanthaStitch color="var(--primary)" width={120} rows={2} className="opacity-30" />
          </div>
        </motion.div>

        {/* ── Steps grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <span className="font-editorial text-4xl md:text-5xl text-primary/25 leading-none select-none">
                  {t(step.nKey)}
                </span>
                <span className="flex-1 h-px bg-border" />
              </div>

              <h3 className={`font-editorial text-xl md:text-2xl text-foreground leading-snug ${isBn ? 'font-bengali-serif' : ''}`}>
                {t(step.titleKey)}
              </h3>

              <p className={`text-sm md:text-[15px] text-muted-foreground leading-relaxed ${isBn ? 'font-bengali' : 'font-sans-en font-light'}`}>
                {t(step.bodyKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
