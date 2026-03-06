'use client';

import { motion }          from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { AbstractThreadIcon } from '@/components/illustrations/AbstractThreadIcon';
import { AbstractConnectionIcon } from '@/components/illustrations/AbstractConnectionIcon';
import { AbstractBloomIcon } from '@/components/illustrations/AbstractBloomIcon';
import { AbstractDrapeIcon } from '@/components/illustrations/AbstractDrapeIcon';
import { AlponaDivider }            from '@/components/illustrations/AlponaDivider';

const keys  = ['handwoven', 'artisan', 'conscious', 'heritage'] as const;
const icons = [AbstractThreadIcon, AbstractConnectionIcon, AbstractBloomIcon, AbstractDrapeIcon];

export function FeaturesSection() {
  const t      = useTranslations('features');
  const locale = useLocale();
  const isBn   = locale === 'bn';

  return (
    <section className="relative px-4 sm:px-6 py-20 md:py-32 max-w-[1400px] mx-auto overflow-hidden">
      {/* Intricate decorative background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-alpona-grid text-foreground" />
        <div className="absolute left-[5%] top-0 bottom-0 w-px bg-border/50" />
        <div className="absolute right-[5%] top-0 bottom-0 w-px bg-border/50" />
        <div className="absolute left-0 right-0 top-[10%] h-px bg-border/50" />
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-accent font-sans-en mb-6 block">
            {t('title')}
          </span>
          <h2 className={`font-editorial text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 max-w-2xl leading-tight ${isBn ? 'font-bengali-serif' : ''}`}>
            {isBn ? 'ধীরে তৈরি, যত্নে বোনা।' : 'Crafted slowly, woven with intention.'}
          </h2>
          <AlponaDivider className="mx-auto text-primary opacity-60" width={260} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-6 mt-16 md:mt-24">
          {keys.map((key, i) => {
            const Icon = icons[i];

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.15 }}
                className="flex flex-col items-center text-center relative group"
              >
                {/* Organic circular background with subtle float — CSS animation for performance */}
                <div
                  className={`relative w-40 h-40 mb-8 flex items-center justify-center rounded-full bg-muted/40 border border-border shadow-inner group-hover:bg-muted/60 transition-colors duration-500 ${i % 2 === 0 ? 'animate-folk-drift-soft' : 'animate-folk-drift'}`}
                >
                  <Icon size={72} className="text-foreground opacity-90 transition-transform duration-700 group-hover:scale-110" />
                  
                  {/* Decorative concentric dashed ring */}
                  <div className="absolute inset-2 rounded-full border border-dashed border-border/80 rotate-45 group-hover:rotate-90 transition-all duration-1000" />
                </div>

                <div className="max-w-[260px]">
                  <h3 className={`font-semibold text-foreground text-lg md:text-xl mb-3 ${isBn ? 'font-bengali' : 'font-editorial italic tracking-wide'}`}>
                    {t(key)}
                  </h3>
                  <div className="w-10 h-px bg-primary/30 mx-auto mb-4" />
                  <p className={`text-muted-foreground text-sm leading-relaxed ${isBn ? 'font-bengali' : 'font-sans-en font-light'}`}>
                    {t(`${key}_desc`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
