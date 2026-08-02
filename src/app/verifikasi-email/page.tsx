import type { Metadata } from 'next';
import Link from 'next/link';
import { verifyEmailToken } from '@/lib/actions/verification';

export const metadata: Metadata = {
  title: 'Verifikasi Email',
  robots: { index: false, follow: false },
};

const content = {
  success: {
    title: 'Email Terverifikasi ✓',
    desc: 'Terima kasih, email Anda sudah berhasil diverifikasi. Sekarang Anda bisa membuat undangan gratis dari dashboard.',
    cta: 'Ke Dashboard',
    href: '/dashboard',
  },
  invalid: {
    title: 'Link Tidak Valid',
    desc: 'Link verifikasi ini tidak ditemukan atau sudah pernah dipakai. Minta link baru dari dashboard Anda.',
    cta: 'Ke Dashboard',
    href: '/dashboard',
  },
  expired: {
    title: 'Link Kedaluwarsa',
    desc: 'Link verifikasi ini sudah lewat masa berlaku (24 jam). Minta link baru dari dashboard Anda.',
    cta: 'Ke Dashboard',
    href: '/dashboard',
  },
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  const result = token ? await verifyEmailToken(token) : { status: 'invalid' as const };
  const c = content[result.status];

  return (
    <div className="login-page">
      <div className="login-card" style={{ textAlign: 'center' }}>
        <Link href="/" className="login-logo" style={{ justifyContent: 'center' }}>
          Warung Coding TV<span>.</span>
        </Link>
        <h1
          style={{
            fontFamily: 'var(--font-display), serif',
            fontSize: 20,
            color: 'var(--navy)',
            margin: '20px 0 10px',
          }}
        >
          {c.title}
        </h1>
        <p className="login-sub" style={{ marginBottom: 24 }}>
          {c.desc}
        </p>
        <Link
          href={c.href}
          className="btn-admin btn-admin-primary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {c.cta}
        </Link>
      </div>
    </div>
  );
}
