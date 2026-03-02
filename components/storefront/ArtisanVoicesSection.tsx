'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export function ArtisanVoicesSection() {
  const t = useTranslations('voices');
  const params = useParams();
  const locale = params.locale as string;
  const isBn = locale === 'bn';

  const voices = [
    { quote: t('quote_1'), author: t('author_1') },
    { quote: t('quote_2'), author: t('author_2') },
    { quote: t('quote_3'), author: t('author_3') },
  ];

  return (
    <section className="py-20 md:py-32 bg-bengal-dust/20 relative">
      <div className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.28em] uppercase text-bengal-kansa mb-4 font-sans-en"
          >
            {t('title')}
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-2xl md:text-4xl text-bengal-kajal max-w-2xl mx-auto leading-relaxed ${isBn ? 'font-bengali-serif' : 'font-editorial italic'}`}
          >
            {t('subtitle')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {voices.map((voice, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative p-8 md:p-10 border border-bengal-kansa/20 rounded-3xl bg-bengal-kori/50 backdrop-blur-sm"
            >
              {/* Decorative Quote Mark */}
              <div className="absolute top-6 left-6 text-bengal-kansa/20 text-6xl font-editorial leading-none pointer-events-none">
                &ldquo;
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <p className={`text-lg md:text-xl text-bengal-kajal/80 mb-8 grow leading-relaxed ${isBn ? 'font-bengali' : 'font-sans-en font-light'}`}>
                  {voice.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-bengal-sindoor/40" />
                  <span className={`text-xs tracking-widest uppercase text-bengal-kajal/60 ${isBn ? 'font-bengali' : 'font-sans-en'}`}>
                    {voice.author}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
