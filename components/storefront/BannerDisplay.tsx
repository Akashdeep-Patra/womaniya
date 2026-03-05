import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlponaCorner } from '@/components/illustrations/AlponaCorner';
import { cn } from '@/lib/utils';

export function BannerDisplay({ banner, locale, className = '' }: { banner: any, locale: string, className?: string }) {
  if (!banner || banner.status !== 'published') return null;

  const isBn = locale === 'bn';
  const title = isBn && banner.title_bn ? banner.title_bn : banner.title_en;
  const subtitle = isBn && banner.subtitle_bn ? banner.subtitle_bn : banner.subtitle_en;
  const ctaText = isBn && banner.cta_text_bn ? banner.cta_text_bn : banner.cta_text_en;
  
  const desktopImage = ((banner.images as string[] | null) ?? [])[0] || banner.image_url;
  const mobileImage = ((banner.images as string[] | null) ?? [])[1] || banner.image_url_mobile || desktopImage;

  if (!desktopImage) return null;

  let targetUrl = banner.cta_url;
  if (targetUrl && !targetUrl.startsWith('http')) {
    if (!targetUrl.startsWith(`/${locale}`)) {
      targetUrl = targetUrl.startsWith('/') ? `/${locale}${targetUrl}` : `/${locale}/${targetUrl}`;
    }
  }

  const isSidebar = banner.placement === 'sidebar';
  const isInline = banner.placement === 'inline';

  const Content = () => (
    <div className={cn(
      "group relative overflow-hidden bg-card text-card-foreground border border-border/50 shadow-md hover:shadow-lg transition-all duration-500",
      isSidebar ? "flex flex-col rounded-3xl" : "flex flex-col md:flex-row rounded-[2rem]",
      className
    )}>
      {/* IMAGE SIDE */}
      <div className={cn(
        "relative overflow-hidden shrink-0 bg-muted/30",
        isSidebar ? "w-full aspect-[4/5]" : "w-full md:w-[45%] lg:w-[50%] aspect-[4/5] md:aspect-auto",
        !isSidebar && "md:border-r border-border/30"
      )}>
        <div className="absolute inset-0 block md:hidden">
          <Image src={mobileImage} alt={title || 'Banner'} fill className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div className="absolute inset-0 hidden md:block">
          <Image src={desktopImage} alt={title || 'Banner'} fill className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]" sizes="(max-width: 1200px) 50vw, 33vw" />
        </div>
        
        {/* Editorial border overlay over image */}
        <div className="absolute inset-3 z-20 border border-background/20 rounded-[1.25rem] pointer-events-none mix-blend-overlay hidden md:block" />
        <AlponaCorner className="absolute top-4 left-4 z-20 opacity-40 rotate-0 hidden md:block" size={32} color="#F9F6F0" />
        <AlponaCorner className="absolute top-4 right-4 z-20 opacity-40 rotate-90 hidden md:block" size={32} color="#F9F6F0" />
        <AlponaCorner className="absolute bottom-4 right-4 z-20 opacity-40 rotate-180 hidden md:block" size={32} color="#F9F6F0" />
        <AlponaCorner className="absolute bottom-4 left-4 z-20 opacity-40 -rotate-90 hidden md:block" size={32} color="#F9F6F0" />
      </div>

      {/* TEXT SIDE */}
      <div className={cn(
        "flex flex-col justify-center relative z-10",
        isSidebar ? "p-6 md:p-8 items-center text-center" : "p-8 md:p-12 lg:p-16 xl:p-20 items-center md:items-start text-center md:text-left flex-1"
      )}>
        <span className={cn(
          "text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-accent font-sans-en",
          isInline ? "mb-3" : "mb-5 md:mb-6"
        )}>
          {isBn ? 'কিউরেটেড এডিট' : 'Curated Edit'}
        </span>
        
        {title && (
          <h2 className={cn(
            "text-foreground",
            isBn ? 'font-bengali-serif' : 'font-editorial italic',
            isSidebar || isInline ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl lg:text-5xl leading-tight"
          )}>
            {title}
          </h2>
        )}
        
        {title && subtitle && (
          <div className={cn(
            "w-12 h-px bg-primary/30",
            isSidebar || isInline ? "my-4 md:my-5" : "my-5 md:my-6",
            !isSidebar ? "mx-auto md:mx-0" : "mx-auto"
          )} />
        )}
        
        {subtitle && (
          <p className={cn(
            "text-muted-foreground",
            isBn ? 'font-bengali' : 'font-sans-en font-light',
            isSidebar || isInline ? "text-sm" : "text-base md:text-lg leading-relaxed max-w-md",
            "mb-6 md:mb-8"
          )}>
            {subtitle}
          </p>
        )}
        
        {ctaText && (
          <Button asChild variant="default" className="rounded-full shadow-sm" size={isInline || isSidebar ? "sm" : "default"}>
            <span className={cn(
              "font-sans-en uppercase pointer-events-auto",
              isBn ? 'text-[11px] font-bengali tracking-wider' : 'text-[10px] font-semibold tracking-[0.2em]'
            )}>
              {ctaText}
            </span>
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full h-full">
      {targetUrl ? (
        <Link href={targetUrl} prefetch={true} className="block w-full h-full outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-[2rem]">
          <Content />
        </Link>
      ) : (
        <div className="w-full h-full">
          <Content />
        </div>
      )}
    </div>
  );
}