import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const adminEmail    = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (
          credentials?.email    === adminEmail &&
          credentials?.password === adminPassword
        ) {
          return {
            id:    '1',
            email: adminEmail,
            name:  'Womania Admin',
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
      const isLoginPage  = pathname.includes('/admin/login');

      // All public routes and the login page are always accessible
      if (!isAdminRoute || isLoginPage) return true;

      // Admin dashboard/add/products require a valid session
      if (session) return true;

      // Redirect to the locale-correct login page (so /bn/admin → /bn/admin/login)
      const locale   = pathname.split('/')[1] ?? 'en';
      const loginUrl = new URL(`/${locale}/admin/login`, request.nextUrl.origin);
      return Response.redirect(loginUrl);
    },
  },
});
