'use client';

import { motion }          from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { AbstractThreadIcon } from '@/components/illustrations/AbstractThreadIcon';
import { AbstractConnectionIcon } from '@/components/illustrations/AbstractConnectionIcon';
import { AbstractBloomIcon } from '@/components/illustrations/AbstractBloomIcon';
import { AbstractDrapeIcon } from '@/components/illustrations/AbstractDrapeIcon';
import { AlponaDivider }            from '@/components/illustrations/AlponaDivider';
import { AlponaBackdrop, JamdaniBackdrop }          from '@/components/illustrations/SectionBackdrop';

const keys  = ['handwoven', 'artisan', 'conscious', 'heritage'] as const;
const icons = [AbstractThreadIcon, AbstractConnectionIcon, AbstractBloomIcon, AbstractDrapeIcon];

export function FeaturesSection() {
  const t      = useTranslations('features');
  const locale = useLocale();
  const isBn   = locale === 'bn';

  return (
    <section className="relative px-4 sm:px-6 py-20 md:py-32 w-full mx-auto overflow-hidden bg-background">
      {/* Intricate decorative background */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-center overflow-hidden">
        <div className="relative w-[150vw] sm:w-[120vw] md:w-[100vw] max-w-[3000px] h-[150%] -top-[25%] left-1/2 -translate-x-1/2">
          <JamdaniBackdrop className="text-foreground object-cover w-full h-full opacity-[0.4]" />
        </div>
      </div>
      
      {/* Soft fade masks so the background doesn't abruptly end or interfere with content */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 right-0 h-[20vh] bg-linear-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[20vh] bg-linear-to-t from-background to-transparent" />
        <div className="absolute top-0 bottom-0 left-0 w-[15vw] max-w-[200px] bg-linear-to-r from-background to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-[15vw] max-w-[200px] bg-linear-to-l from-background to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 px-4 sm:px-6 py-20 md:py-32 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16 md:mb-24 flex flex-col items-center"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-accent font-sans-en mb-6 block">
            {t('title')}
          </span>
          <h2 className={`font-editorial text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 max-w-2xl leading-tight ${isBn ? 'font-bengali-serif' : ''}`}>
            {isBn ? 'ধীরে তৈরি, যত্নে বোনা।' : 'Crafted slowly, woven with intention.'}
          </h2>
          <AlponaDivider className="mx-auto text-primary opacity-60" width={260} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-16 md:mt-24">
          {keys.map((key, i) => {
            const Icon = icons[i];

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
                className="group relative flex flex-col justify-between p-8 sm:p-10 md:p-12 rounded-[2.5rem] bg-card/40 hover:bg-card/60 border border-border/50 hover:border-primary/20 shadow-sm hover:shadow-xl transition-all duration-700 overflow-hidden backdrop-blur-sm"
              >
                {/* Subtle animated background gradient on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Watermark of the abstract icon */}
                <div className="absolute -bottom-16 -right-16 text-muted-foreground/[0.03] group-hover:text-primary/[0.05] transition-colors duration-700 pointer-events-none transform group-hover:scale-110 group-hover:-rotate-6">
                  <Icon size={320} />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Top Header: Badge/Number and Small Icon */}
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-background/80 border border-border/50 shadow-sm group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-500">
                      <Icon size={32} className="text-foreground/80 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="font-editorial text-5xl text-muted-foreground/20 group-hover:text-primary/20 transition-colors duration-500 font-bold">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative flex-grow">
                    <h3 className={`text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-foreground group-hover:text-primary transition-colors duration-500 ${isBn ? 'font-bengali' : 'font-editorial tracking-wide'}`}>
                      {t(key)}
                    </h3>
                    
                    <p className={`text-muted-foreground text-base md:text-lg leading-relaxed max-w-[90%] ${isBn ? 'font-bengali' : 'font-sans-en font-light'}`}>
                      {t(`${key}_desc`)}
                    </p>
                  </div>
                  
                  {/* Bottom decorative interaction */}
                  <div className="mt-12 pt-6 border-t border-border/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {[1,2,3].map(dot => (
                         <div key={dot} className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary/60 transition-colors duration-500" style={{ transitionDelay: `${dot * 100}ms` }} />
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-500">
                       <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                         {isBn ? 'আরও জানুন' : 'Discover'}
                       </span>
                       <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-500">
                         <ArrowUpRight className="w-5 h-5 group-hover:rotate-12 transition-transform duration-500" />
                       </div>
                    </div>
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
