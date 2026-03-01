'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { BengalBadge } from '@/components/bengal';
import { AlponaDivider } from '@/components/illustrations/AlponaDivider';
import { MapPin, Sparkles, Palette, Package } from 'lucide-react';

const steps = [
  { key: 'step_1', icon: MapPin, num: '01' },
  { key: 'step_2', icon: Sparkles, num: '02' },
  { key: 'step_3', icon: Palette, num: '03' },
  { key: 'step_4', icon: Package, num: '04' },
] as const;

export function ProcessSection() {
  const t = useTranslations('process');
  const params = useParams();
  const isBn = params.locale === 'bn';

  return (
    <section className="px-4 sm:px-6 py-16 md:py-24 bg-bengal-kori">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-20"
        >
          <BengalBadge variant="kajal" className="mb-4">
            {t('badge')}
          </BengalBadge>
          <h2 className={`font-editorial text-3xl md:text-4xl xl:text-5xl text-bengal-kajal mb-3 ${isBn ? 'font-bengali-serif' : ''}`}>
            {t('title')}
          </h2>
          <AlponaDivider className="mx-auto my-4" width={200} />
          <p className={`text-bengal-kajal/60 text-base md:text-lg max-w-2xl mx-auto ${isBn ? 'font-bengali' : ''}`}>
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map(({ key, icon: Icon, num }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative"
            >
              <div className="bg-bengal-mati/50 rounded-2xl p-6 md:p-8 border border-bengal-kansa/20 h-full flex flex-col">
                <span className="font-editorial text-4xl text-bengal-kansa/40 mb-4">{num}</span>
                <div className="w-12 h-12 rounded-xl bg-bengal-kansa/15 flex items-center justify-center text-bengal-kansa mb-4">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className={`font-editorial text-xl text-bengal-kajal mb-3 ${isBn ? 'font-bengali-serif' : ''}`}>
                  {t(key)}
                </h3>
                <p className={`text-bengal-kajal/65 text-sm leading-relaxed flex-1 ${isBn ? 'font-bengali' : ''}`}>
                  {t(`${key}_desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
