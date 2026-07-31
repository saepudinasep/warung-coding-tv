'use client';

import { useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function CustomerLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn('customer-credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError('Email atau password salah.');
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <Link href="/" className="login-logo">
          Warung Coding TV<span>.</span>
        </Link>
        <p className="login-sub">Masuk ke akun Anda</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <p className="login-sub" style={{ marginTop: 20, marginBottom: 0 }}>
          Belum punya akun?{' '}
          <Link href="/daftar" style={{ color: 'var(--navy)', fontWeight: 500 }}>
            Daftar gratis
          </Link>
        </p>

        <Link href="/" className="login-back">
          ← Kembali ke beranda
        </Link>
      </div>
    </div>
  );
}
