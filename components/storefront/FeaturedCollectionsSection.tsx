'use client';

import Link          from 'next/link';
import Image         from 'next/image';
import { motion }    from 'framer-motion';
import { useParams } from 'next/navigation';
import type { Collection } from '@/db/schema';
import { useTranslations } from 'next-intl';
import { AlponaCorner } from '@/components/illustrations/AlponaCorner';

interface Props {
  collections: Collection[];
  isCompact?: boolean;
}

export function FeaturedCollectionsSection({ collections, isCompact = false }: Props) {
  const params = useParams();
  const locale = params.locale as string;
  const isBn   = locale === 'bn';
  const t      = useTranslations('nav'); // using nav for 'collections' translation

  if (!collections || collections.length === 0) return null;

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-background">
      <div className="px-4 sm:px-6 max-w-7xl mx-auto mb-12 md:mb-16 flex flex-col items-center text-center">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] tracking-[0.28em] uppercase text-accent mb-3 font-sans-en"
        >
          {isBn ? 'কিউরেটেড কালেকশন' : 'Curated Edits'}
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`font-editorial text-3xl md:text-5xl text-foreground ${isBn ? 'font-bengali-serif' : ''}`}
        >
          {t('collections')}
        </motion.h2>
      </div>

      <div className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {(isCompact ? collections.slice(0, 3) : collections).map((collection, i) => {
            const name = isBn && collection.name_bn ? collection.name_bn : collection.name_en;
            const desc = isBn && collection.description_bn ? collection.description_bn : collection.description_en;
            const imgs = (collection.carousel_images as string[] | null) ?? [];
            const displayImage = imgs[0] ?? null;

            return (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group flex flex-col ${i === 1 ? 'md:mt-12 lg:mt-24' : ''} ${i === 2 ? 'md:hidden lg:flex' : ''}`}
              >
                <Link href={`/${locale}/collection/${collection.slug}`} prefetch={true} className="block relative aspect-4/5 rounded-4xl overflow-hidden bg-muted mb-8 border-[6px] border-background shadow-sm hover:shadow-md transition-shadow duration-500 ring-1 ring-border/50">
                  {/* Inner editorial border */}
                  <div className="absolute inset-3 z-20 border border-bengal-kansa/30 rounded-[1.25rem] pointer-events-none mix-blend-overlay" />
                  
                  {/* Decorative Corners */}
                  <AlponaCorner className="absolute top-4 left-4 z-20 opacity-60 rotate-0" size={32} color="#F9F6F0" />
                  <AlponaCorner className="absolute top-4 right-4 z-20 opacity-60 rotate-90" size={32} color="#F9F6F0" />
                  <AlponaCorner className="absolute bottom-4 right-4 z-20 opacity-60 rotate-180" size={32} color="#F9F6F0" />
                  <AlponaCorner className="absolute bottom-4 left-4 z-20 opacity-60 -rotate-90" size={32} color="#F9F6F0" />

                  {displayImage ? (
                    <Image
                      src={displayImage}
                      alt={name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-bengal-dust/40 flex items-center justify-center">
                      <div className="absolute inset-0 opacity-[0.05] bg-noise" />
                      <span className="text-bengal-kajal/30 font-editorial text-3xl italic">{name}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                </Link>
                
                <div className="text-center px-4">
                  <h3 className={`text-2xl text-foreground mb-3 group-hover:text-primary transition-colors ${isBn ? 'font-bengali-serif' : 'font-editorial italic'}`}>
                    {name}
                  </h3>
                  {desc && (
                    <p className={`text-muted-foreground text-sm line-clamp-3 leading-relaxed ${isBn ? 'font-bengali' : 'font-sans-en font-light'}`}>
                      {desc}
                    </p>
                  )}
                  <Link prefetch={true} 
                    href={`/${locale}/collection/${collection.slug}`}
                    prefetch={true}
                    className="inline-block mt-6 text-[10px] tracking-widest uppercase text-muted-foreground group-hover:text-primary transition-colors font-sans-en pb-1 border-b border-border group-hover:border-primary/50"
                  >
                    {isBn ? 'সংগ্রহ দেখো' : 'Explore Edit'}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {isCompact && collections.length > 3 && (
          <div className="mt-16 flex justify-center">
            <Link prefetch={true} 
              href={`/${locale}/collections`}
              prefetch={true}
              className="px-8 py-3 rounded-full border border-primary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300 text-xs tracking-widest uppercase font-sans-en"
            >
              {isBn ? 'সব সংগ্রহ' : 'View All Collections'}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
