'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

export function ShareButton() {
  const t = useTranslations('product');
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
        return;
      } catch (err) {
        // Fallback to copy
      }
    }
    
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={cn(
        'group flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full border transition-all duration-300',
        copied 
          ? 'bg-bengal-kansa/10 border-bengal-kansa/40 text-bengal-kansa'
          : 'bg-transparent border-bengal-kansa/30 hover:border-bengal-kansa/60 text-bengal-kajal/70 hover:text-bengal-kajal'
      )}
    >
      {copied ? (
        <>
          <Check size={16} strokeWidth={2.5} />
          <span className="text-[10px] tracking-widest uppercase font-sans-en font-medium">
            Link Copied
          </span>
        </>
      ) : (
        <>
          <Share2 size={16} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
          <span className="text-[10px] tracking-widest uppercase font-sans-en font-medium">
            {t('share')}
          </span>
        </>
      )}
    </button>
  );
}
