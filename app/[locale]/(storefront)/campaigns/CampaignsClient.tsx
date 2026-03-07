'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles, CalendarDays } from 'lucide-react';
import { AbstractThreadIcon } from '@/components/illustrations/AbstractThreadIcon';

const FALLBACK_BGS = [
  'bg-gradient-to-br from-primary/10 via-primary/5 to-transparent',
  'bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent',
  'bg-gradient-to-br from-accent/10 via-accent/5 to-transparent',
];

export function CampaignsClient({ 
  campaigns, 
  locale, 
  isBn 
}: { 
  campaigns: any[], 
  locale: string, 
  isBn: boolean 
}) {
  if (campaigns.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground/50 bg-card rounded-3xl border border-border/50">
        <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-20" />
        {isBn ? 'কোনো ক্যাম্পেইন পাওয়া যায়নি।' : 'No campaigns found.'}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:gap-12">
      {campaigns.map((campaign, i) => {
        const name = isBn && campaign.name_bn ? campaign.name_bn : campaign.name_en;
        const desc = isBn && campaign.description_bn ? campaign.description_bn : campaign.description_en;
        const fallbackBg = FALLBACK_BGS[i % FALLBACK_BGS.length];
        
        let coverImage = null;
        if (campaign.banners && campaign.banners.length > 0) {
          const banner = campaign.banners[0];
          coverImage = ((banner.images as string[] | null) ?? [])[0] || banner.image_url || null;
        }

        return (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
          >
            <Link prefetch={true} href={`/${locale}/campaign/${campaign.slug}`} className="group block h-full">
              <div className="relative flex flex-col md:flex-row p-6 md:p-8 lg:p-10 rounded-[2.5rem] bg-card/40 hover:bg-card/60 border border-border/50 hover:border-primary/20 shadow-sm hover:shadow-xl transition-all duration-700 overflow-hidden backdrop-blur-sm gap-8 md:gap-12 items-center">
                
                {/* Background Decoration */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 text-muted-foreground/3 group-hover:text-primary/5 transition-colors duration-700 pointer-events-none transform group-hover:scale-110 group-hover:-rotate-6">
                  <AbstractThreadIcon size={400} />
                </div>

                {/* Left Side: Image / Asset */}
                <div className={`relative w-full md:w-2/5 aspect-4/3 rounded-4xl overflow-hidden shadow-inner ${coverImage ? 'bg-muted' : fallbackBg} z-10 shrink-0`}>
                  {coverImage ? (
                    <Image
                      src={coverImage}
                      alt={name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                       <Sparkles className="w-20 h-20 text-primary" />
                    </div>
                  )}
                  {/* Image Overlay Gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    {campaign.status === 'live' ? (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/90 backdrop-blur-md text-primary-foreground text-[10px] tracking-widest uppercase font-sans-en font-medium rounded-full shadow-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        Live Now
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-background/80 backdrop-blur-md text-muted-foreground text-[10px] tracking-widest uppercase font-sans-en font-medium rounded-full shadow-sm border border-border/50">
                        <CalendarDays className="w-3 h-3" />
                        Archived
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Side: Content */}
                <div className="relative flex flex-col justify-center grow z-10 py-2 md:py-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-editorial text-4xl text-muted-foreground/20 group-hover:text-primary/20 transition-colors duration-500 font-bold">
                      {(i + 1).toString().padStart(2, '0')}
                    </span>
                    <div className="h-px bg-border/60 grow" />
                  </div>

                  <h2 className={`text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground group-hover:text-primary transition-colors duration-500 mb-6 leading-tight ${isBn ? 'font-bengali-serif' : 'font-editorial'}`}>
                    {name}
                  </h2>
                  
                  {desc && (
                    <p className={`text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mb-8 ${isBn ? 'font-bengali' : 'font-sans-en font-light'}`}>
                      {desc}
                    </p>
                  )}

                  {/* Call to action footer */}
                  <div className="mt-auto pt-8 border-t border-border/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {[1,2,3].map(dot => (
                         <div key={dot} className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary/60 transition-colors duration-500" style={{ transitionDelay: `${dot * 100}ms` }} />
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-500">
                       <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                         {isBn ? 'এক্সপ্লোর করুন' : 'Explore Campaign'}
                       </span>
                       <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 border border-transparent group-hover:border-primary/20 transition-all duration-500">
                         <ArrowUpRight className="w-5 h-5 group-hover:rotate-12 transition-transform duration-500" />
                       </div>
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
