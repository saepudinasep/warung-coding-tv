'use server';

import crypto from 'node:crypto';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { sendVerificationEmail } from '@/lib/email';

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 jam

export type ResendVerificationState =
  { sentEmail: true } | { link: string } | { error: string } | undefined;

/**
 * Generate token verifikasi baru untuk customer yang sedang login, lalu
 * kirim via Resend. Kalau RESEND_API_KEY belum dikonfigurasi (mis. saat
 * development lokal), fallback: link ditampilkan langsung di UI.
 */
export async function resendVerification(): Promise<ResendVerificationState> {
  const session = await auth();
  if (session?.user?.userType !== 'customer') {
    return { error: 'Akses ditolak.' };
  }

  const customer = await prisma.customer.findUnique({ where: { id: session.user.id } });
  if (!customer) {
    return { error: 'Akun tidak ditemukan.' };
  }
  if (customer.emailVerified) {
    return { error: 'Email Anda sudah terverifikasi.' };
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS);

  await prisma.customer.update({
    where: { id: customer.id },
    data: { verificationToken: token, verificationTokenExpiresAt: expiresAt },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const link = `${siteUrl}/verifikasi-email?token=${token}`;

  const { sent } = await sendVerificationEmail(customer.email, customer.name, link);
  if (sent) {
    return { sentEmail: true };
  }

  return { link };
}

export type VerifyEmailResult =
  { status: 'success' } | { status: 'invalid' } | { status: 'expired' };

export async function verifyEmailToken(token: string): Promise<VerifyEmailResult> {
  const customer = await prisma.customer.findUnique({ where: { verificationToken: token } });

  if (!customer) {
    return { status: 'invalid' };
  }

  if (!customer.verificationTokenExpiresAt || customer.verificationTokenExpiresAt < new Date()) {
    return { status: 'expired' };
  }

  await prisma.customer.update({
    where: { id: customer.id },
    data: {
      emailVerified: new Date(),
      verificationToken: null,
      verificationTokenExpiresAt: null,
    },
  });

  return { status: 'success' };
}
