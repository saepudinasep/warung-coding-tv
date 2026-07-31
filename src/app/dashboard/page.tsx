import type { Metadata } from 'next';
import { auth } from '@/auth';
import CustomerSignOutButton from '@/components/CustomerSignOutButton';

export const metadata: Metadata = {
  title: 'Dashboard Saya',
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <span className="admin-topbar-logo">
          Warung Coding TV<span>.</span>
        </span>
        <CustomerSignOutButton />
      </div>
      <div className="admin-content">
        <h1>Selamat datang, {session?.user?.name}</h1>
        <p>{session?.user?.email}</p>
        <p style={{ marginTop: 32 }}>
          Checkout paket, pilih template, dan builder undangan menyusul di task berikutnya (kategori
          &ldquo;Modul Undangan&rdquo; dan &ldquo;Paket &amp; Pembayaran&rdquo;).
        </p>
      </div>
    </div>
  );
}
