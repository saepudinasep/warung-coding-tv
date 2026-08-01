import type { NextAuthConfig } from 'next-auth';

// Config dasar (Edge/Node-safe, tanpa Prisma) — dipakai proxy.ts DAN auth.ts.
// Callback jwt/session di sini cuma menyalin field token, tidak query database,
// jadi aman dipakai proxy.ts (yang butuh cek role/userType saat proteksi route).
// Provider dengan akses database (Credentials + Prisma) ditambahkan terpisah di auth.ts.
export const authConfig = {
  trustHost: true,
  session: { strategy: 'jwt' },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const userType = auth?.user?.userType;
      const path = request.nextUrl.pathname;

      if (path.startsWith('/admin')) {
        if (isLoggedIn && userType === 'admin') return true;
        const loginUrl = new URL('/login', request.nextUrl.origin);
        loginUrl.searchParams.set('callbackUrl', request.nextUrl.href);
        return Response.redirect(loginUrl);
      }
      if (path.startsWith('/dashboard')) {
        if (isLoggedIn && userType === 'customer') return true;
        const loginUrl = new URL('/masuk', request.nextUrl.origin);
        loginUrl.searchParams.set('callbackUrl', request.nextUrl.href);
        return Response.redirect(loginUrl);
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.userType = user.userType;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.userType = token.userType as 'admin' | 'customer';
        session.user.role = token.role as 'ADMIN' | 'STAFF' | undefined;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
