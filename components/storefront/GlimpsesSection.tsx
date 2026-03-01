'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { BengalBadge } from '@/components/bengal';
import { AlponaDivider } from '@/components/illustrations/AlponaDivider';

const items = [
  { key: 'item_1', img: '/hero-placeholder.svg' },
  { key: 'item_2', img: '/hero-offset-placeholder.svg' },
  { key: 'item_3', img: '/hero-placeholder.svg' },
  { key: 'item_4', img: '/hero-offset-placeholder.svg' },
] as const;

export function GlimpsesSection() {
  const t = useTranslations('glimpses');
  const params = useParams();
  const isBn = params.locale === 'bn';

  return (
    <section className="bg-bengal-cream px-4 sm:px-6 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <BengalBadge variant="kansa" className="mb-4">
            {t('badge')}
          </BengalBadge>
          <h2 className={`font-editorial text-3xl md:text-4xl xl:text-5xl text-bengal-kajal mb-3 ${isBn ? 'font-bengali-serif' : ''}`}>
            {t('title')}
          </h2>
          <AlponaDivider className="mx-auto my-4" width={220} />
          <p className={`text-bengal-kajal/60 text-base md:text-lg max-w-2xl mx-auto ${isBn ? 'font-bengali' : ''}`}>
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {items.map(({ key, img }, i) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-bengal-mati border border-bengal-kansa/15">
                <Image
                  src={img}
                  alt={t(`${key}_title`)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-bengal-kajal/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <h3 className={`font-editorial text-xl md:text-2xl text-bengal-kori mb-2 ${isBn ? 'font-bengali-serif' : ''}`}>
                    {t(`${key}_title`)}
                  </h3>
                  <p className={`text-bengal-kori/80 text-sm leading-relaxed ${isBn ? 'font-bengali' : ''}`}>
                    {t(`${key}_desc`)}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
