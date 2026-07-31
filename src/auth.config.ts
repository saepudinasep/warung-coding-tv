import type { NextAuthConfig } from 'next-auth';

// Config Edge-safe (tanpa Prisma/bcrypt) — dipakai middleware.ts.
// Provider dengan akses database ditambahkan terpisah di auth.ts (Node runtime).
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const userType = auth?.user?.userType;
      const path = request.nextUrl.pathname;

      if (path.startsWith('/admin')) {
        return isLoggedIn && userType === 'admin';
      }
      if (path.startsWith('/dashboard')) {
        return isLoggedIn && userType === 'customer';
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
