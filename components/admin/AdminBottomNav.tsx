'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PlusCircle, List } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminBottomNav({ locale }: { locale: string }) {
  const pathname = usePathname();

  const links = [
    { href: `/${locale}/admin`,           label: 'Home',    Icon: Home       },
    { href: `/${locale}/admin/add`,       label: 'Add',     Icon: PlusCircle },
    { href: `/${locale}/admin/products`,  label: 'Products',Icon: List       },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-bengal-kajal border-t border-bengal-kansa/20 pb-safe">
      <div className="grid grid-cols-3 h-[3.5rem]">
        {links.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link prefetch={true}
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 min-h-[44px]',
                'text-[10px] tracking-wider uppercase font-medium transition-colors',
                active
                  ? 'text-bengal-kansa'
                  : 'text-bengal-kori/50 hover:text-bengal-kori'
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
