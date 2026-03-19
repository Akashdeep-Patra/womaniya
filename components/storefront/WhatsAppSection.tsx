'use client';

import { motion }          from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams }       from 'next/navigation';
import { generalEnquiryUrl } from '@/lib/whatsapp';
import { MessageCircle }   from 'lucide-react';

export function WhatsAppSection({ waNumber }: { waNumber?: string }) {
  const t      = useTranslations('whatsapp');
  const params = useParams();
  const locale = params.locale as string;
  const href   = generalEnquiryUrl(locale, waNumber);

  return (
    <section className="border-t border-border bg-muted/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-sans-en">
            {t('badge')}
          </p>

          <h2 className="font-editorial text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight">
            {t('heading')}
          </h2>

          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl mx-auto font-sans-en font-light">
            {t('subtitle')}
          </p>

          <div className="pt-2">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 h-12 px-8 rounded-full bg-foreground text-background text-xs tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:-translate-y-0.5"
            >
              <MessageCircle className="size-4" />
              {t('cta')}
            </a>
          </div>

          <p className="text-muted-foreground/50 text-[10px] tracking-widest uppercase font-sans-en">
            {t('response_time')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
