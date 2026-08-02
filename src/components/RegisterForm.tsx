'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? 'Terjadi kesalahan, coba lagi.');
      setLoading(false);
      return;
    }

    const result = await signIn('customer-credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      // Registrasi sukses tapi auto-login gagal — arahkan ke halaman masuk manual.
      router.push('/masuk');
      return;
    }

    router.push('/dashboard');
    router.refresh();
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <Link href="/" className="login-logo">
          Warung Coding TV<span>.</span>
        </Link>
        <p className="login-sub">Daftar gratis, buat undangan pertama Anda</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="name">Nama Lengkap</label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="login-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="nama@gmail.com"
              pattern="^[^\s@]+@gmail\.com$"
              title="Gunakan alamat email @gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
              Wajib pakai alamat @gmail.com.
            </p>
          </div>
          <div className="login-field">
            <label htmlFor="phone">Nomor WhatsApp</label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="08xxxxxxxxxx"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Memproses...' : 'Daftar Gratis'}
          </button>
        </form>

        <p className="login-sub" style={{ marginTop: 20, marginBottom: 0 }}>
          Sudah punya akun?{' '}
          <Link href="/masuk" style={{ color: 'var(--navy)', fontWeight: 500 }}>
            Masuk
          </Link>
        </p>

        <Link href="/" className="login-back">
          ← Kembali ke beranda
        </Link>
      </div>
    </div>
  );
}
