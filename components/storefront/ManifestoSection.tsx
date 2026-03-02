'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export function ManifestoSection() {
  const t = useTranslations('manifesto');
  const params = useParams();
  const locale = params.locale as string;
  const isBn = locale === 'bn';

  return (
    <section className="relative py-24 md:py-40 bg-bengal-kajal text-bengal-kori overflow-hidden flex items-center justify-center min-h-[60vh] md:min-h-[80vh]">
      {/* Background subtle elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-bengal-kansa/40 via-transparent to-transparent opacity-50 mix-blend-overlay" />
      </div>

      <div className="relative z-10 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <div className="w-px h-16 bg-bengal-kansa/50" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-3xl md:text-5xl lg:text-7xl leading-[1.15] md:leading-[1.1] mb-8 md:mb-12 ${isBn ? 'font-bengali-serif' : 'font-editorial italic'}`}
        >
          &ldquo;{t('title')}&rdquo;
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`text-base md:text-xl lg:text-2xl text-bengal-kori/70 max-w-3xl mx-auto leading-relaxed mb-12 ${isBn ? 'font-bengali' : 'font-sans-en font-light'}`}
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link 
            href={`/${locale}#story`}
            className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-bengal-kansa hover:text-white transition-colors duration-300 font-sans-en group"
          >
            <span className="w-8 h-px bg-bengal-kansa group-hover:bg-white transition-colors" />
            {t('cta')}
            <span className="w-8 h-px bg-bengal-kansa group-hover:bg-white transition-colors" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
