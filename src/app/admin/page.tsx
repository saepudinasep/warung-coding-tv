import type { Metadata } from 'next';
import { auth } from '@/auth';
import SignOutButton from '@/components/SignOutButton';

export const metadata: Metadata = {
  title: 'Dashboard Admin',
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const session = await auth();

  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <span className="admin-topbar-logo">
          Warung Coding TV<span>.</span> CRM
        </span>
        <SignOutButton />
      </div>
      <div className="admin-content">
        <h1>Selamat datang, {session?.user?.name}</h1>
        <p>{session?.user?.email}</p>
        <span className="admin-badge">{session?.user?.role}</span>
        <p style={{ marginTop: 32 }}>
          Dashboard CRM (daftar customer, order, dan pembayaran) menyusul di task berikutnya.
        </p>
      </div>
    </div>
  );
}
