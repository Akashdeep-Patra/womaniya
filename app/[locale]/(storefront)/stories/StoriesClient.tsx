'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, BookOpen, Feather } from 'lucide-react';
import { AbstractThreadIcon } from '@/components/illustrations/AbstractThreadIcon';

const FALLBACK_BGS = [
  'bg-gradient-to-br from-primary/10 via-primary/5 to-transparent',
  'bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent',
  'bg-gradient-to-br from-accent/10 via-accent/5 to-transparent',
];

export function StoriesClient({ 
  stories, 
  locale, 
  isBn 
}: { 
  stories: any[], 
  locale: string, 
  isBn: boolean 
}) {
  if (stories.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground/50 bg-card rounded-3xl border border-border/50">
        <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
        {isBn ? 'কোনো গল্প পাওয়া যায়নি।' : 'No stories found.'}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {stories.map((story, i) => {
        const title = isBn && story.title_bn ? story.title_bn : story.title_en;
        const fallbackBg = FALLBACK_BGS[i % FALLBACK_BGS.length];
        const coverImage = ((story.images as string[] | null) ?? [])[0] || story.hero_image_url || null;

        return (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
            className="group relative flex flex-col h-full"
          >
            <Link prefetch={true} href={`/${locale}/stories/${story.slug}`} className="flex flex-col h-full p-6 sm:p-8 rounded-[2.5rem] bg-card/40 hover:bg-card/60 border border-border/50 hover:border-primary/20 shadow-sm hover:shadow-xl transition-all duration-700 overflow-hidden backdrop-blur-sm">
              
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute -top-16 -right-16 text-muted-foreground/3 group-hover:text-primary/5 transition-colors duration-700 pointer-events-none transform group-hover:scale-110 group-hover:rotate-12">
                <AbstractThreadIcon size={240} />
              </div>

              {/* Top Header */}
              <div className="flex items-center justify-between mb-8 z-10 relative">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-background/80 border border-border/50 shadow-sm group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-500">
                  <Feather size={24} className="text-foreground/80 group-hover:text-primary transition-colors" />
                </div>
                <span className="font-editorial text-4xl text-muted-foreground/20 group-hover:text-primary/20 transition-colors duration-500 font-bold">
                  {(i + 1).toString().padStart(2, '0')}
                </span>
              </div>

              {/* Image Asset */}
              <div className={`relative w-full aspect-4/3 rounded-3xl overflow-hidden shadow-inner mb-8 ${coverImage ? 'bg-muted' : fallbackBg} z-10`}>
                {coverImage ? (
                  <Image
                    src={coverImage}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <BookOpen className="w-16 h-16 text-primary" />
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Content */}
              <div className="relative grow flex flex-col justify-end z-10">
                <h2 className={`text-2xl md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors duration-500 mb-6 leading-tight ${isBn ? 'font-bengali-serif' : 'font-editorial'}`}>
                  {title}
                </h2>
                
                {/* Call to action footer */}
                <div className="mt-auto pt-6 border-t border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {[1,2].map(dot => (
                       <div key={dot} className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary/60 transition-colors duration-500" style={{ transitionDelay: `${dot * 100}ms` }} />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-500">
                     <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                       {isBn ? 'গল্পটি পড়ুন' : 'Read Story'}
                     </span>
                     <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 border border-transparent group-hover:border-primary/20 transition-all duration-500">
                       <ArrowUpRight className="w-4 h-4 group-hover:rotate-12 transition-transform duration-500" />
                     </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}