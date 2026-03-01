'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Home, ShoppingBag, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;

  const links = [
    { href: `/${locale}`,      label: t('home'),  Icon: Home        },
    { href: `/${locale}/shop`, label: t('shop'),  Icon: ShoppingBag },
    { href: `/${locale}#story`,label: t('story'), Icon: BookOpen    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-bengal-kori border-t border-bengal-kansa/25 pb-safe">
      <div className="grid grid-cols-3 h-[3.5rem]">
        {links.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 min-h-[44px]',
                'text-[10px] tracking-wider uppercase font-medium transition-colors',
                active
                  ? 'text-bengal-sindoor'
                  : 'text-bengal-kajal/60 hover:text-bengal-kajal'
              )}
            >
              <Icon size={18} strokeWidth={active ? 2 : 1.5} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
