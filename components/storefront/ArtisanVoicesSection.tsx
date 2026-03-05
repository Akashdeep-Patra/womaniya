'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { KanthaStitch } from '@/components/illustrations/KanthaStitch';
import { JamdaniDiamond } from '@/components/illustrations/JamdaniDiamond';
import {
  Star,
  BadgeCheck,
  Chrome,
  Instagram,
  Facebook,
  MessageCircle,
  Mail,
  Youtube,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/db/schema';
import type { TestimonialSource } from '@/db/enums';

type SourceConfig = {
  icon: LucideIcon;
  label: string;
  className: string;
};

const SOURCE_CONFIG: Record<TestimonialSource, SourceConfig> = {
  anecdotal:  { icon: BadgeCheck,     label: 'Verified',    className: 'bg-accent/10 text-accent border-accent/20' },
  google:     { icon: Chrome,         label: 'Google',      className: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  instagram:  { icon: Instagram,      label: 'Instagram',   className: 'bg-pink-500/10 text-pink-500 border-pink-500/20' },
  facebook:   { icon: Facebook,       label: 'Facebook',    className: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' },
  whatsapp:   { icon: MessageCircle,  label: 'WhatsApp',    className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
  email:      { icon: Mail,           label: 'Email',       className: 'bg-foreground/5 text-foreground/50 border-foreground/10' },
  youtube:    { icon: Youtube,        label: 'YouTube',     className: 'bg-red-500/10 text-red-500 border-red-500/20' },
  trustpilot: { icon: ShieldCheck,    label: 'Trustpilot',  className: 'bg-green-500/10 text-green-500 border-green-500/20' },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9, rotateX: 15 },
  visible: (custom: { rotation: number, yOffset: number }) => ({
    opacity: 1,
    y: custom.yOffset,
    scale: 1,
    rotate: custom.rotation,
    rotateX: 0,
    transition: { type: 'spring' as const, stiffness: 80, damping: 20 },
  }),
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
    { id: -2, quote_en: t('quote_2'), quote_bn: null, author_name: t('author_2'), author_title: null, source: 'google', rating: 5, author_image_url: null, source_url: null },
    { id: -3, quote_en: t('quote_3'), quote_bn: null, author_name: t('author_3'), author_title: null, source: 'anecdotal', rating: null, author_image_url: null, source_url: null },
    { id: -4, quote_en: t('quote_1'), quote_bn: null, author_name: 'Customer', author_title: null, source: 'instagram', rating: 5, author_image_url: null, source_url: null },
    { id: -5, quote_en: t('quote_2'), quote_bn: null, author_name: 'Customer', author_title: null, source: 'google', rating: 5, author_image_url: null, source_url: null },
    { id: -6, quote_en: t('quote_3'), quote_bn: null, author_name: 'Customer', author_title: null, source: 'whatsapp', rating: 5, author_image_url: null, source_url: null },
  ];

  const voices = (testimonials && testimonials.length > 0) ? testimonials : fallbackVoices;

  return (
    <section className="py-24 md:py-40 relative overflow-hidden bg-background">
      {/* Pastel 3D Space Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-bengal-dust/10" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-[100px] opacity-70" />
        <div className="absolute top-1/4 -right-20 w-[30rem] h-[30rem] bg-secondary/10 rounded-full mix-blend-multiply filter blur-[120px] opacity-70" />
        <div className="absolute -bottom-40 left-1/3 w-[40rem] h-[40rem] bg-accent/5 rounded-full mix-blend-multiply filter blur-[140px] opacity-60" />
      </div>

      <div className="px-4 sm:px-6 max-w-[1400px] mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-20 md:mb-32">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-[10px] tracking-[0.28em] uppercase text-accent mb-4 font-sans-en"
          >
            {t('title')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
            className={cn(
              'text-3xl md:text-5xl lg:text-6xl text-foreground max-w-3xl mx-auto leading-tight',
              isBn ? 'font-bengali-serif' : 'font-editorial italic',
            )}
          >
            {t('subtitle')}
          </motion.h2>
        </div>

        {/* Scattered Testimonial grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 pb-20"
        >
          {voices.map((voice, i) => {
            const quote = isBn && voice.quote_bn ? voice.quote_bn : voice.quote_en;
            const sourceConfig = SOURCE_CONFIG[voice.source as TestimonialSource] ?? SOURCE_CONFIG.anecdotal;
            const SourceIcon = sourceConfig.icon;

            // Generate scattered look properties based on index
            const isEven = i % 2 === 0;
            const isThird = i % 3 === 0;
            // More organic rotations between -4 and 4 degrees
            const baseRotation = (i * 13) % 9 - 4; 
            // Staggered Y offsets to break the grid
            const yOffset = (i % 3) * 30 + (isEven ? -15 : 15);

            return (
              <motion.article
                key={voice.id}
                custom={{ rotation: baseRotation, yOffset }}
                variants={cardVariants}
                whileHover={{
                  scale: 1.04,
                  rotate: 0,
                  y: yOffset - 15,
                  zIndex: 20,
                  transition: { type: 'spring', stiffness: 400, damping: 25 }
                }}
                className={cn(
                  'group relative flex flex-col rounded-[2rem] border border-border/30 bg-background/80 backdrop-blur-xl p-8 md:p-10 lg:p-12',
                  'shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
                  'hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)]',
                  'cursor-pointer group-hover:will-change-transform'
                )}
              >
                {/* Decorative textile motif */}
                <div className="absolute top-6 left-0 right-0 flex justify-center opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none">
                  {i % 2 === 0
                    ? <KanthaStitch width={140} rows={2} color="#8A1C14" />
                    : <JamdaniDiamond size={28} color="#C5A059" />}
                </div>

                <div className="relative z-10 flex flex-col h-full pt-2">
                  {/* Source badge with icon */}
                  <div className="flex justify-center mb-6">
                    <span className={cn(
                      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full',
                      'text-[9px] md:text-[10px] font-semibold tracking-[0.15em] uppercase border',
                      sourceConfig.className,
                      'transition-colors duration-300'
                    )}>
                      <SourceIcon size={12} strokeWidth={2.5} />
                      {sourceConfig.label}
                    </span>
                  </div>

                  {/* Opening quote mark */}
                  <div className="text-accent/20 group-hover:text-accent/30 transition-colors duration-500 text-6xl md:text-7xl font-editorial leading-none mb-2 pointer-events-none text-center select-none" aria-hidden>
                    &ldquo;
                  </div>

                  {/* Quote text */}
                  <blockquote className={cn(
                    'text-lg md:text-xl lg:text-2xl text-foreground/80 group-hover:text-foreground transition-colors duration-300 mb-8 grow leading-relaxed text-center',
                    isBn ? 'font-bengali' : 'font-editorial italic tracking-wide',
                  )}>
                    {quote}
                  </blockquote>

                  {/* Star rating */}
                  {voice.rating != null && voice.rating > 0 && (
                    <div className="flex justify-center gap-1 mb-8">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <motion.div
                          key={si}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + (si * 0.1), type: 'spring' }}
                        >
                          <Star
                            size={14}
                            className={cn(
                              si < voice.rating!
                                ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                                : 'fill-transparent text-border',
                            )}
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Author info */}
                  <footer className="flex flex-col items-center gap-4 mt-auto">
                    {voice.author_image_url && (
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-border/50 ring-4 ring-background shadow-sm">
                        <img
                          src={voice.author_image_url}
                          alt={voice.author_name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="w-8 h-px bg-primary/20 group-hover:bg-primary/40 transition-colors duration-500" />
                    <cite className="not-italic text-center">
                      <span className={cn(
                        'block text-[11px] md:text-xs tracking-[0.25em] uppercase text-muted-foreground group-hover:text-foreground font-semibold transition-colors duration-300',
                        isBn ? 'font-bengali' : 'font-sans-en',
                      )}>
                        {voice.author_name}
                      </span>
                      {voice.author_title && (
                        <span className={cn(
                          'block text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-muted-foreground/50 mt-1.5',
                          isBn ? 'font-bengali' : 'font-sans-en',
                        )}>
                          {voice.author_title}
                        </span>
                      )}
                    </cite>
                  </footer>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
