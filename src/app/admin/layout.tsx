import type { Metadata } from 'next';
import { auth } from '@/auth';
import AdminSidebar from '@/components/AdminSidebar';

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
      <AdminSidebar userName={session?.user?.name} userRole={session?.user?.role} />
      <main className="admin-main">{children}</main>
    </div>
  );
}
