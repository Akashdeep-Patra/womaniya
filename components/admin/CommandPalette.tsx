'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getNavGroups } from '@/lib/admin-nav';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale: string;
};

export function CommandPalette({ open, onOpenChange, locale }: CommandPaletteProps) {
  const router = useRouter();
  const navGroups = useMemo(() => getNavGroups(locale), [locale]);

  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!openRef.current);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onOpenChange]);

  function handleSelect(href: string) {
    onOpenChange(false);
    router.push(href);
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search pages..." />
      <CommandList>
        <CommandEmpty>No pages found.</CommandEmpty>
        {navGroups.map((group, gi) => {
          const heading = group.title || (gi === 0 ? 'General' : 'Other');
          return (
            <CommandGroup key={gi} heading={heading}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.href}
                  value={item.label}
                  onSelect={() => handleSelect(item.href)}
                >
                  <item.icon size={16} strokeWidth={1.5} />
                  <span>{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          );
        })}
      </CommandList>
    </CommandDialog>
  );
}
