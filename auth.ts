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
    authorized({ auth }) {
      return !!auth;
    },
  },
});
