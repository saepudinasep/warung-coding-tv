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
      const isOnAdmin = request.nextUrl.pathname.startsWith('/admin');
      return isOnAdmin ? isLoggedIn : true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
