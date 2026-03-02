'use client';

import { motion }          from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams }       from 'next/navigation';
import Link                from 'next/link';
import { AlponaDivider }   from '@/components/illustrations/AlponaDivider';
import { PaisleyCluster }  from '@/components/illustrations/PaisleyCluster';
import { JamdaniMotif }    from '@/components/illustrations/JamdaniMotif';
import { BengalButton }    from '@/components/bengal';
import { BengalBadge }     from '@/components/bengal';

export function AboutSection() {
  const t      = useTranslations('about');
  const ts     = useTranslations('story');
  const params = useParams();
  const locale = params.locale as string;
  const isBn   = locale === 'bn';

  return (
    <section id="story" className="bg-bengal-kajal text-bengal-kori overflow-hidden">
      {/* Decorative top border */}
      <div className="h-px bg-linear-to-r from-transparent via-bengal-kansa/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-28">

        {/* Mobile layout */}
        <div className="md:hidden space-y-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={{ hidden:{ opacity:0, y:28 }, show:{ opacity:1, y:0, transition:{ duration:0.7, ease:"easeOut" } } }}
          >
            <BengalBadge variant="kansa" className="mb-5">
              {t('badge')}
            </BengalBadge>
            <h2 className={`font-editorial text-3xl leading-tight mb-6 ${isBn ? 'font-bengali-serif' : ''}`}>
              {t('title')}
            </h2>
            <div className={`space-y-4 text-bengal-kori/70 text-sm leading-relaxed ${isBn ? 'font-bengali' : ''}`}>
              <p>{t('intro')}</p>
              <p>{t('body_1')}</p>
              <p>{t('body_2')}</p>
              <p>{t('body_3')}</p>
            </div>
            <p className={`font-editorial text-bengal-kansa text-lg mt-6 italic ${isBn ? 'font-bengali-serif' : ''}`}>
              &quot;{t('closing')}&quot;
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-3 gap-4"
          >
            {[
              { num: t('stat_1_num'), label: t('stat_1_label') },
              { num: t('stat_2_num'), label: t('stat_2_label') },
              { num: t('stat_3_num'), label: t('stat_3_label') },
            ].map((s, i) => (
              <motion.div key={i} variants={{ hidden:{ opacity:0, y:28 }, show:{ opacity:1, y:0, transition:{ duration:0.7, ease:"easeOut" } } }} className="text-center">
                <p className="font-editorial text-3xl text-bengal-kansa">{s.num}</p>
                <p className={`text-[10px] text-bengal-kori/50 tracking-wide mt-1 ${isBn ? 'font-bengali text-xs' : 'font-sans-en'}`}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <Link href={`/${locale}/about`}>
            <BengalButton variant="zari" size="touch" isBengali={isBn}>
              {ts('cta')}
            </BengalButton>
          </Link>
        </div>

        {/* Desktop layout — editorial split */}
        <div className="hidden md:grid grid-cols-2 gap-16 items-center">

          {/* Left — decorative art panel */}
          <motion.div
            initial={{ opacity:0, x:-32 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
            className="relative"
          >
            {/* Jamdani pattern tile */}
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-bengal-kajal border border-bengal-kansa/20">
              <JamdaniMotif
                className="absolute inset-0 w-full h-full"
                opacity={0.12}
              />

              {/* Central alpona */}
              <div className="absolute inset-0 flex items-center justify-center">
                <AlponaDivider color="#C5A059" width={300} className="rotate-90 scale-y-[2]" />
              </div>

              {/* Floating stat cards */}
              {[
                { num: t('stat_1_num'), label: t('stat_1_label'), pos: 'top-8 left-8' },
                { num: t('stat_2_num'), label: t('stat_2_label'), pos: 'top-8 right-8' },
                { num: t('stat_3_num'), label: t('stat_3_label'), pos: 'bottom-8 left-1/2 -translate-x-1/2' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`absolute ${s.pos} bg-bengal-kori/10 backdrop-blur-sm border border-bengal-kansa/25 rounded-2xl px-5 py-4 text-center`}
                >
                  <p className="font-editorial text-4xl text-bengal-kansa leading-none">{s.num}</p>
                  <p className="text-[10px] text-bengal-kori/50 tracking-widest uppercase mt-1 font-sans-en">{s.label}</p>
                </motion.div>
              ))}

              {/* Paisley decorations */}
              <PaisleyCluster className="absolute bottom-12 right-4 opacity-20" size={70} color="#C5A059" />
              <PaisleyCluster className="absolute top-12 left-4 opacity-15 rotate-180" size={55} color="#C5A059" />
            </div>
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial={{ opacity:0, x:32 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
            className="space-y-6"
          >
            <BengalBadge variant="kansa">
              {t('badge')}
            </BengalBadge>

            <h2 className={`font-editorial text-4xl xl:text-5xl leading-tight ${isBn ? 'font-bengali-serif' : ''}`}>
              {t('title')}
            </h2>

            <AlponaDivider color="#C5A059" width={200} className="opacity-60" />

            <div className={`space-y-4 text-bengal-kori/65 text-base leading-relaxed ${isBn ? 'font-bengali' : ''}`}>
              <p>{t('intro')}</p>
              <p>{t('body_1')}</p>
              <p>{t('body_3')}</p>
            </div>

            <p className={`font-editorial text-bengal-kansa text-xl italic border-l-2 border-bengal-kansa/40 pl-4 ${isBn ? 'font-bengali-serif' : ''}`}>
              &quot;{t('closing')}&quot;
            </p>

            <Link href={`/${locale}/about`}>
              <BengalButton variant="zari" size="lg" isBengali={isBn} className="mt-2">
                {ts('cta')} →
              </BengalButton>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
