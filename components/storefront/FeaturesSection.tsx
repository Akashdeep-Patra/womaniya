'use client';

import { motion }          from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams }       from 'next/navigation';
import {
  HandwovenIcon,
  ArtisanIcon,
  ConsciousIcon,
  HeritageIcon,
} from '@/components/illustrations/FeatureIcons';
import { AlponaDivider }            from '@/components/illustrations/AlponaDivider';
import { BengalCard, BengalCardBody } from '@/components/bengal';

const keys  = ['handwoven', 'artisan', 'conscious', 'heritage'] as const;
const icons = [HandwovenIcon, ArtisanIcon, ConsciousIcon, HeritageIcon];

export function FeaturesSection() {
  const t      = useTranslations('features');
  const params = useParams();
  const isBn   = params.locale === 'bn';

  return (
    <section className="relative px-4 sm:px-6 py-20 md:py-32 max-w-[1400px] mx-auto overflow-hidden">
      {/* Intricate decorative background lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-[5%] top-0 bottom-0 w-px bg-bengal-kansa/20" />
        <div className="absolute right-[5%] top-0 bottom-0 w-px bg-bengal-kansa/20" />
        <div className="absolute left-0 right-0 top-[10%] h-px bg-bengal-kansa/20" />
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-bengal-kansa font-sans-en mb-6 block">
            {t('title')}
          </span>
          <h2 className={`font-editorial text-4xl md:text-5xl lg:text-6xl text-bengal-kajal mb-6 max-w-2xl leading-tight ${isBn ? 'font-bengali-serif' : ''}`}>
            Crafted slowly, woven with intention.
          </h2>
          <AlponaDivider className="mx-auto" width={260} />
        </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {keys.map((key, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.12 }}
            >
              <BengalCard variant="bordered" className="h-full">
                <BengalCardBody className="flex flex-col items-center text-center gap-4 py-6 md:py-8">
                  <div className="w-14 h-14 rounded-2xl bg-bengal-mati flex items-center justify-center">
                    <Icon size={42} />
                  </div>
                  <div>
                    <h3 className={`font-semibold text-bengal-kajal text-sm mb-2 ${isBn ? 'font-bengali' : 'font-sans-en'}`}>
                      {t(key)}
                    </h3>
                    <p className={`text-bengal-kajal/55 text-xs leading-relaxed ${isBn ? 'font-bengali' : ''}`}>
                      {t(`${key}_desc`)}
                    </p>
                  </div>
                </BengalCardBody>
              </BengalCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
