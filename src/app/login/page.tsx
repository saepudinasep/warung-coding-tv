import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Masuk',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--ivory)]">
      <p className="text-[var(--text-mid)]">Halaman login — menyusul di task berikutnya.</p>
    </main>
  );
}
