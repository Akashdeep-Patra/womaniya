'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[LocaleError]', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <svg width="56" height="56" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6">
        <circle cx="50" cy="50" r="46" fill="#C0392B" />
        <path d="M 19 36 C 16 34, 14 37, 15 40 C 16 42, 19 42, 20 40 L 34 72 C 35 74, 36 74, 37 72 L 47 40 C 48 38, 49 38, 50 40 L 60 72 C 61 74, 62 74, 63 72 L 76 28 C 77 24, 80 22, 82 24 C 84 26, 83 30, 80 31 C 77 32, 75 30, 76 28" fill="none" stroke="#FBF8F1" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="48" cy="30" r="3" fill="#D4A843" />
      </svg>

      <h1 className="text-2xl font-semibold text-foreground">Something went wrong</h1>
      <p className="text-muted-foreground mt-2 max-w-md">
        We hit an unexpected error loading this page. You can try again or head back home.
      </p>
      {error.digest && (
        <p className="text-xs text-muted-foreground/60 mt-1">Error ID: {error.digest}</p>
      )}

      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={reset}
          className="px-6 py-3 bg-foreground text-background text-xs tracking-widest uppercase font-medium rounded-full hover:bg-primary transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
