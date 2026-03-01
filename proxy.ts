/**
 * proxy.ts — Next.js 16 renamed `middleware.ts` to `proxy.ts`.
 * Handles locale detection (next-intl) and auth (admin-only protection).
 */
import createMiddleware from 'next-intl/middleware';
import { auth } from '@/auth';
import { routing } from './i18n/routing';

const intlProxy = createMiddleware(routing);

// Auth runs first; authorized callback only protects /admin (excl. login).
// Landing, shop, etc. are public.
export const proxy = auth((req) => intlProxy(req));

export const config = {
  matcher: [
    // Match everything except API routes, static files, and Next.js internals
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
