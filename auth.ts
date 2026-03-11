import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { db } from '@/lib/db';
import { admins } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { ratelimit } from '@/lib/ratelimit';
import { headers } from 'next/headers';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (ratelimit) {
          const headersList = await headers();
          const ip = headersList.get('x-forwarded-for') ?? '127.0.0.1';
          const { success } = await ratelimit.limit(`login_${ip}`);
          if (!success) throw new Error('Too many requests. Please try again later.');
        }

        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        // 1. Check database first
        const dbAdmins = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
        const adminUser = dbAdmins[0];

        if (adminUser) {
          const isValid = await bcrypt.compare(password, adminUser.password_hash);
          if (isValid) {
            return {
              id:    adminUser.id.toString(),
              email: adminUser.email,
              name:  'Womaniya Admin',
            };
          }
          // If found in DB but wrong password, don't fallback to env
          return null;
        }

        // 2. Fallback to Environment Variables (if no DB user is set up yet)
        const adminEmail    = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (
          email    === adminEmail &&
          password === adminPassword
        ) {
          return {
            id:    'env-1',
            email: adminEmail,
            name:  'Womaniya Admin',
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/en/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    authorized({ auth: session, request }) {
      const { pathname } = request.nextUrl;

      const isAdminRoute = pathname.includes('/admin');
      const isLoginPage  = pathname.includes('/admin/login') || pathname.includes('/admin/forgot-password') || pathname.includes('/admin/reset-password');

      // All public routes, login, forgot-password, and reset-password are accessible
      if (!isAdminRoute || isLoginPage) return true;

      // Admin dashboard/add/products require a valid session
      if (session) return true;

      // Redirect to the locale-correct login page (so /bn/admin → /bn/admin/login)
      const firstSegment = pathname.split('/')[1] ?? 'en';
      const locale = ['en', 'bn'].includes(firstSegment) ? firstSegment : 'en';
      const loginUrl = new URL(`/${locale}/admin/login`, request.nextUrl.origin);
      return Response.redirect(loginUrl);
    },
  },
});

