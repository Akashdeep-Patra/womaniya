'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { KanthaStitch } from '@/components/illustrations/KanthaStitch';
import { JamdaniDiamond } from '@/components/illustrations/JamdaniDiamond';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/db/schema';

const SOURCE_STYLES: Record<string, { label: string; className: string }> = {
  anecdotal:  { label: 'Verified',    className: 'bg-accent/10 text-accent border-accent/20' },
  google:     { label: 'Google',      className: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  instagram:  { label: 'Instagram',   className: 'bg-pink-500/10 text-pink-400 border-pink-500/20' },
  facebook:   { label: 'Facebook',    className: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
  whatsapp:   { label: 'WhatsApp',    className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  email:      { label: 'Email',       className: 'bg-foreground/5 text-foreground/50 border-foreground/10' },
  youtube:    { label: 'YouTube',     className: 'bg-red-500/10 text-red-400 border-red-500/20' },
  trustpilot: { label: 'Trustpilot',  className: 'bg-green-500/10 text-green-400 border-green-500/20' },
};

type ArtisanVoicesSectionProps = {
  testimonials?: Testimonial[];
};

export function ArtisanVoicesSection({ testimonials }: ArtisanVoicesSectionProps) {
  const t = useTranslations('voices');
  const params = useParams();
  const locale = params.locale as string;
  const isBn = locale === 'bn';

  const fallbackVoices: Pick<Testimonial, 'id' | 'quote_en' | 'quote_bn' | 'author_name' | 'author_title' | 'source' | 'rating' | 'author_image_url' | 'source_url'>[] = [
    { id: -1, quote_en: t('quote_1'), quote_bn: null, author_name: t('author_1'), author_title: null, source: 'anecdotal', rating: null, author_image_url: null, source_url: null },
    { id: -2, quote_en: t('quote_2'), quote_bn: null, author_name: t('author_2'), author_title: null, source: 'anecdotal', rating: 5, author_image_url: null, source_url: null },
    { id: -3, quote_en: t('quote_3'), quote_bn: null, author_name: t('author_3'), author_title: null, source: 'anecdotal', rating: null, author_image_url: null, source_url: null },
  ];

  const voices = (testimonials && testimonials.length > 0) ? testimonials : fallbackVoices;

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
            const quote = isBn && voice.quote_bn ? voice.quote_bn : voice.quote_en;
            const sourceConfig = SOURCE_STYLES[voice.source] ?? SOURCE_STYLES.anecdotal;

            return (
              <motion.div
                key={voice.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
                className={`relative p-8 md:p-10 border border-border/50 rounded-sm bg-card shadow-sm hover:shadow-md ring-1 ring-border/20 ${yOffset} ${rotate} transform transition-all hover:rotate-0 hover:-translate-y-2 duration-500`}
              >
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-noise" />

                <div className="absolute top-4 left-0 right-0 flex justify-center opacity-60">
                  {i % 2 === 0 ? <KanthaStitch width={120} rows={2} color="#8A1C14" /> : <JamdaniDiamond size={24} color="#C5A059" />}
                </div>
                
                <div className="relative z-10 flex flex-col h-full pt-6">
                  {/* Source Badge */}
                  <div className="flex justify-center mb-3">
                    <span className={cn(
                      'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-semibold tracking-[0.15em] uppercase border',
                      sourceConfig.className,
                    )}>
                      {sourceConfig.label}
                    </span>
                  </div>

                  <div className="text-accent/30 text-5xl font-editorial leading-none mb-4 pointer-events-none text-center">
                    &ldquo;
                  </div>
                  
                  <p className={`text-lg md:text-xl text-foreground/85 mb-6 grow leading-loose text-center ${isBn ? 'font-bengali' : 'font-editorial italic tracking-wide'}`}>
                    {quote}
                  </p>

                  {/* Star Rating */}
                  {voice.rating && voice.rating > 0 && (
                    <div className="flex justify-center gap-0.5 mb-6">
                      {Array.from({ length: voice.rating }).map((_, si) => (
                        <Star key={si} size={14} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  )}
                  
                  <div className="flex flex-col items-center gap-3">
                    {voice.author_image_url && (
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-border/50 mb-1">
                        <img src={voice.author_image_url} alt={voice.author_name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="w-12 h-[1.5px] bg-primary/40" />
                    <span className={`text-[11px] tracking-[0.25em] uppercase text-muted-foreground font-semibold ${isBn ? 'font-bengali' : 'font-sans-en'}`}>
                      {voice.author_name}
                    </span>
                    {voice.author_title && (
                      <span className={`text-[10px] tracking-[0.15em] uppercase text-muted-foreground/60 -mt-2 ${isBn ? 'font-bengali' : 'font-sans-en'}`}>
                        {voice.author_title}
                      </span>
                    )}
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
