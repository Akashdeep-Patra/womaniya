'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#F9F6F0', color: '#2C2C2C' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem', textAlign: 'center' }}>
          <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" fill="#C0392B" />
            <path d="M 19 36 C 16 34, 14 37, 15 40 C 16 42, 19 42, 20 40 L 34 72 C 35 74, 36 74, 37 72 L 47 40 C 48 38, 49 38, 50 40 L 60 72 C 61 74, 62 74, 63 72 L 76 28 C 77 24, 80 22, 82 24 C 84 26, 83 30, 80 31 C 77 32, 75 30, 76 28" fill="none" stroke="#FBF8F1" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="48" cy="30" r="3" fill="#D4A843" />
          </svg>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '1.5rem' }}>Something went wrong</h1>
          <p style={{ color: '#666', marginTop: '0.5rem', maxWidth: '400px' }}>
            We encountered an unexpected error. Our team has been notified.
          </p>
          {error.digest && (
            <p style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.5rem' }}>
              Error ID: {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem 2rem',
              background: '#2C2C2C',
              color: '#F9F6F0',
              border: 'none',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
