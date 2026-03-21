'use client';

import { useEffect } from 'react';
import { BengalButton } from '@/components/bengal';

export default function HeroAdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Hero admin error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center px-4">
      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Hero Images</p>
      <h2 className="text-2xl font-bold text-foreground">Failed to load hero images</h2>
      <p className="text-muted-foreground text-sm max-w-sm">
        The hero_images table may not exist yet. Run the database migration or try again.
      </p>
      {error.message && (
        <code className="text-xs bg-muted px-3 py-1.5 rounded text-destructive">{error.message}</code>
      )}
      <BengalButton variant="primary" size="sm" onClick={reset}>Try again</BengalButton>
    </div>
  );
}
