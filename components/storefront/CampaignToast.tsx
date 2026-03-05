'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Megaphone } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Campaign {
  slug: string;
  announcement_text_en: string | null;
  announcement_text_bn: string | null;
  cta_url: string | null;
}

interface CampaignToastProps {
  campaigns: Campaign[];
  isBn: boolean;
  locale: string;
}

export function CampaignToast({ campaigns, isBn, locale }: CampaignToastProps) {
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!campaigns || campaigns.length === 0) return;

    // Find the first campaign that hasn't been dismissed
    const nextCampaign = campaigns.find(c => {
      const dismissed = sessionStorage.getItem(`campaign-toast-dismissed-${c.slug}`);
      return !dismissed;
    });

    if (nextCampaign) {
      setActiveCampaign(nextCampaign);
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setActiveCampaign(null);
    }
  }, [campaigns]);

  const handleDismiss = () => {
    if (!activeCampaign) return;
    
    // Mark current as dismissed
    sessionStorage.setItem(`campaign-toast-dismissed-${activeCampaign.slug}`, 'true');
    setIsVisible(false);
    
    // Check for the next one after the exit animation completes
    setTimeout(() => {
      const next = campaigns.find(c => 
        !sessionStorage.getItem(`campaign-toast-dismissed-${c.slug}`)
      );
      if (next) {
        setActiveCampaign(next);
        setIsVisible(true);
      } else {
        setActiveCampaign(null);
      }
    }, 600); // 500ms for exit animation + 100ms pause
  };

  if (!activeCampaign) return null;

  const text = isBn && activeCampaign.announcement_text_bn ? activeCampaign.announcement_text_bn : activeCampaign.announcement_text_en;
  const href = activeCampaign.cta_url ? activeCampaign.cta_url : `/${locale}/campaigns/${activeCampaign.slug}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="fixed bottom-[84px] md:bottom-6 left-4 right-[72px] md:left-0 md:right-0 z-50 flex md:justify-center pointer-events-none"
        >
          {/* ── Mobile Form Factor: Compact Stacked Card ── */}
          <div className="md:hidden w-full bg-card/95 backdrop-blur-md text-card-foreground border border-border/60 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl p-3 flex flex-col gap-3 pointer-events-auto">
            <div className="flex items-start gap-2.5">
              <Megaphone size={16} className="text-primary shrink-0 mt-0.5" />
              <span className={cn(
                "line-clamp-2",
                isBn ? 'font-bengali text-[13px] leading-tight' : 'font-sans-en font-medium tracking-[0.1em] uppercase text-[9px] leading-[1.4]'
              )}>
                {text}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <Button asChild size="sm" variant="default" className="h-8 rounded-full px-5 w-auto">
                <Link href={href} prefetch={true}>
                  <span className={cn(isBn ? 'font-bengali text-[11px]' : 'font-sans-en tracking-[0.15em] uppercase text-[9px] font-bold')}>
                    {isBn ? 'বিস্তারিত' : 'Explore'}
                  </span>
                </Link>
              </Button>
              <button 
                onClick={handleDismiss} 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-muted/80 text-muted-foreground hover:bg-muted transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* ── Desktop Form Factor: Pill ── */}
          <div className="hidden md:flex bg-card text-card-foreground border border-border shadow-lg rounded-full pl-5 pr-2 py-2 items-center gap-4 max-w-lg w-auto pointer-events-auto">
            <div className="flex items-center gap-2.5 overflow-hidden min-w-0">
              <Megaphone size={16} className="text-primary shrink-0 drop-shadow-sm" strokeWidth={2.5} />
              <span className={cn(
                "truncate",
                isBn ? 'font-bengali text-[13px] mt-0.5' : 'font-sans-en font-medium tracking-[0.1em] uppercase text-xs'
              )}>
                {text}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 shrink-0 ml-4">
              <Button asChild size="xs" variant="default" className="rounded-full h-7 px-4">
                <Link href={href} prefetch={true}>
                  <span className={cn(
                    isBn ? 'font-bengali text-[11px] mt-0.5' : 'font-sans-en tracking-[0.15em] uppercase text-[9px] font-bold'
                  )}>
                    {isBn ? 'বিস্তারিত' : 'Explore'}
                  </span>
                </Link>
              </Button>
              
              <button 
                onClick={handleDismiss}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors touch-manipulation"
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}