'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { KanthaStitch } from '@/components/illustrations/KanthaStitch';

export function ManifestoSection() {
  const t = useTranslations('manifesto');
  const params = useParams();
  const locale = params.locale as string;
  const isBn = locale === 'bn';

  return (
    <section className="relative py-24 md:py-36 bg-card text-card-foreground overflow-hidden border-y border-border">
      {/* Subtle radial glow — uses semantic tokens so it works in both themes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 px-6 md:px-12 max-w-4xl mx-auto text-center">
        {/* Decorative vertical line */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex justify-center mb-10 origin-top"
        >
          <div className="w-px h-14 bg-linear-to-b from-primary/50 to-transparent" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className={`text-3xl md:text-5xl lg:text-6xl leading-[1.15] md:leading-[1.1] mb-8 md:mb-10 ${isBn ? 'font-bengali-serif' : 'font-editorial italic'}`}
        >
          &ldquo;{t('title')}&rdquo;
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <KanthaStitch color="var(--primary)" width={180} rows={2} className="opacity-30" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`text-base md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12 ${isBn ? 'font-bengali' : 'font-sans-en font-light'}`}
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link prefetch={true}
            href={`/${locale}#story`}
            className="inline-flex items-center gap-4 text-[10px] tracking-[0.25em] uppercase text-primary hover:text-foreground transition-colors duration-300 font-sans-en font-medium group"
          >
            <span className="w-8 h-px bg-primary/40 group-hover:bg-foreground/40 group-hover:w-12 transition-all duration-300" />
            {t('cta')}
            <span className="w-8 h-px bg-primary/40 group-hover:bg-foreground/40 group-hover:w-12 transition-all duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
