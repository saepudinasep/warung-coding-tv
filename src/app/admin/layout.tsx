import type { Metadata } from 'next';
import { auth } from '@/auth';
import SignOutButton from '@/components/SignOutButton';
import AdminNav from '@/components/AdminNav';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard Admin',
    template: '%s | Admin — Warung Coding TV',
  },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          Warung Coding TV<span>.</span>
          <div style={{ fontSize: 11, color: 'rgba(250,247,242,0.4)', marginTop: 4 }}>
            CRM Admin
          </div>
        </div>
        <AdminNav />
        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-user">
            <strong>{session?.user?.name}</strong>
            {session?.user?.role}
          </div>
          <SignOutButton />
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
