import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

// Konvensi Next.js 16: proxy.ts menggantikan middleware.ts (proxy jalan di Node.js runtime).
// Tetap pakai authConfig yang ringan (tanpa Prisma) — cukup untuk cek status login.
const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  matcher: ['/admin/:path*'],
};
