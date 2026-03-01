/**
 * proxy.ts — Next.js 16 renamed `middleware.ts` to `proxy.ts`.
 * Handles locale detection and routing via next-intl.
 * Default export is still supported in Next.js 16.
 */
import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlProxy = createMiddleware(routing);

// Named export — Next.js 16 preferred pattern
export function proxy(request: NextRequest) {
  return intlProxy(request);
}

export const config = {
  matcher: [
    // Match everything except API routes, static files, and Next.js internals
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
