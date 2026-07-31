import type { Metadata } from 'next';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'Template',
};

export default async function TemplatesPage() {
  const session = await auth();

  if (session?.user?.role !== 'ADMIN') {
    return (
      <div>
        <div className="admin-page-header">
          <div>
            <h1>Template</h1>
            <p>Akses terbatas</p>
          </div>
        </div>
        <div className="admin-card">
          <div className="admin-empty">
            Halaman ini khusus role <strong>ADMIN</strong>. Hubungi admin kalau kamu butuh akses
            untuk mengelola template undangan.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Template</h1>
          <p>Menyusul di task berikutnya — CRUD template undangan.</p>
        </div>
      </div>
      <div className="admin-card">
        <div className="admin-empty">Belum tersedia.</div>
      </div>
    </div>
  );
}
