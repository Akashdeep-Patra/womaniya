'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations('locale');
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;

  const handleSwitch = () => {
    const nextLocale = locale === 'en' ? 'bn' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={handleSwitch}
      className={cn(
        'min-h-[44px] min-w-[44px] flex items-center justify-center',
        'text-xs tracking-widest uppercase font-medium',
        'border border-bengal-kansa/40 rounded-sm px-3',
        'hover:border-bengal-kansa hover:text-bengal-sindoor',
        'transition-colors duration-200',
        locale === 'bn' ? 'font-bengali text-sm' : '',
        className
      )}
      aria-label="Switch language"
    >
      {t('switch_to')}
    </button>
  );
}
