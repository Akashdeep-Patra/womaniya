'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { KanthaStitch } from '@/components/illustrations/KanthaStitch';
import { JamdaniDiamond } from '@/components/illustrations/JamdaniDiamond';

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
            className="text-[10px] tracking-[0.28em] uppercase text-accent mb-4 font-sans-en"
          >
            {t('title')}
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-2xl md:text-4xl text-foreground max-w-2xl mx-auto leading-relaxed ${isBn ? 'font-bengali-serif' : 'font-editorial italic'}`}
          >
            {t('subtitle')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-8 lg:gap-12 mt-12 md:mt-24">
          {voices.map((voice, i) => {
            const yOffset = i === 1 ? 'lg:translate-y-16' : i === 2 ? 'lg:-translate-y-8' : '';
            const rotate = i === 0 ? '-rotate-1' : i === 1 ? 'rotate-2' : '-rotate-2';

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
                className={`relative p-8 md:p-10 border border-border/50 rounded-sm bg-card shadow-sm hover:shadow-md ring-1 ring-border/20 ${yOffset} ${rotate} transform transition-all hover:rotate-0 hover:-translate-y-2 duration-500`}
              >
                {/* Vintage paper texture overlay */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-noise" />

                {/* Stitched Header */}
                <div className="absolute top-4 left-0 right-0 flex justify-center opacity-60">
                  {i % 2 === 0 ? <KanthaStitch width={120} rows={2} color="#8A1C14" /> : <JamdaniDiamond size={24} color="#C5A059" />}
                </div>
                
                <div className="relative z-10 flex flex-col h-full pt-6">
                  {/* Decorative Quote Mark */}
                  <div className="text-accent/30 text-5xl font-editorial leading-none mb-4 pointer-events-none text-center">
                    &ldquo;
                  </div>
                  
                  <p className={`text-lg md:text-xl text-foreground/85 mb-10 grow leading-loose text-center ${isBn ? 'font-bengali' : 'font-editorial italic tracking-wide'}`}>
                    {voice.quote}
                  </p>
                  
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-[1.5px] bg-primary/40" />
                    <span className={`text-[11px] tracking-[0.25em] uppercase text-muted-foreground font-semibold ${isBn ? 'font-bengali' : 'font-sans-en'}`}>
                      {voice.author}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
