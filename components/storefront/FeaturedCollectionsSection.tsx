'use client';

import Link          from 'next/link';
import Image         from 'next/image';
import { motion }    from 'framer-motion';
import { useParams } from 'next/navigation';
import type { Collection } from '@/db/schema';
import { useTranslations } from 'next-intl';

interface Props {
  collections: Collection[];
}

export function FeaturedCollectionsSection({ collections }: Props) {
  const params = useParams();
  const locale = params.locale as string;
  const isBn   = locale === 'bn';
  const t      = useTranslations('nav'); // using nav for 'collections' translation

  if (!collections || collections.length === 0) return null;

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-bengal-kori">
      <div className="px-4 sm:px-6 max-w-7xl mx-auto mb-12 md:mb-16 flex flex-col items-center text-center">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] tracking-[0.28em] uppercase text-bengal-kansa mb-3 font-sans-en"
        >
          {isBn ? 'কিউরেটেড কালেকশন' : 'Curated Edits'}
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`font-editorial text-3xl md:text-5xl text-bengal-kajal ${isBn ? 'font-bengali-serif' : ''}`}
        >
          {t('collections')}
        </motion.h2>
      </div>

      <div className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {collections.slice(0, 3).map((collection, i) => {
            const name = isBn && collection.name_bn ? collection.name_bn : collection.name_en;
            const desc = isBn && collection.description_bn ? collection.description_bn : collection.description_en;
            
            return (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group flex flex-col ${i === 1 ? 'md:mt-12 lg:mt-24' : ''} ${i === 2 ? 'md:hidden lg:flex' : ''}`}
              >
                <Link href={`/${locale}/collection/${collection.slug}`} className="block relative aspect-[4/5] rounded-t-full overflow-hidden bg-bengal-mati mb-6">
                  {collection.hero_image_url ? (
                    <Image
                      src={collection.hero_image_url}
                      alt={name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-bengal-dust/30 flex items-center justify-center">
                      <span className="text-bengal-kansa/40 font-editorial text-2xl italic">{name}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
                </Link>
                
                <div className="text-center px-4">
                  <h3 className={`text-2xl text-bengal-kajal mb-3 group-hover:text-bengal-sindoor transition-colors ${isBn ? 'font-bengali-serif' : 'font-editorial italic'}`}>
                    {name}
                  </h3>
                  {desc && (
                    <p className={`text-bengal-kajal/60 text-sm line-clamp-3 leading-relaxed ${isBn ? 'font-bengali' : 'font-sans-en font-light'}`}>
                      {desc}
                    </p>
                  )}
                  <Link 
                    href={`/${locale}/collection/${collection.slug}`}
                    className="inline-block mt-6 text-[10px] tracking-widest uppercase text-bengal-kajal/40 group-hover:text-bengal-sindoor transition-colors font-sans-en pb-1 border-b border-bengal-kansa/30 group-hover:border-bengal-sindoor/50"
                  >
                    {isBn ? 'সংগ্রহ দেখো' : 'Explore Edit'}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {collections.length > 3 && (
          <div className="mt-16 flex justify-center">
            <Link 
              href={`/${locale}/collections`}
              className="px-8 py-3 rounded-full border border-bengal-kansa text-bengal-kajal hover:bg-bengal-kansa hover:text-bengal-kori transition-colors duration-300 text-xs tracking-widest uppercase font-sans-en"
            >
              {isBn ? 'সব সংগ্রহ' : 'View All Collections'}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
