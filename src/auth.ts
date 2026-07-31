import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { authConfig } from '@/auth.config';

// Versi penuh (Node runtime) — dipakai di route handler & server component.
// Jangan import file ini dari proxy.ts (proteksi route pakai authConfig yang ringan).
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  providers: [
    // Login untuk User (admin/staff) — dipakai di /login
    Credentials({
      id: 'admin-credentials',
      name: 'Admin',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (typeof email !== 'string' || typeof password !== 'string') {
          return null;
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          return null;
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          userType: 'admin' as const,
        };
      },
    }),
    // Login untuk Customer (pelanggan) — dipakai di /masuk
    Credentials({
      id: 'customer-credentials',
      name: 'Customer',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (typeof email !== 'string' || typeof password !== 'string') {
          return null;
        }

        const customer = await prisma.customer.findUnique({ where: { email } });
        if (!customer) {
          return null;
        }

        const isValid = await bcrypt.compare(password, customer.password);
        if (!isValid) {
          return null;
        }

        return {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          userType: 'customer' as const,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
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
});
