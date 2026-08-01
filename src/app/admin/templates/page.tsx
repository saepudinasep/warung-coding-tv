import type { Metadata } from 'next';
import Link from 'next/link';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { toggleTemplateActive } from '@/lib/actions/templates';

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

  const templates = await prisma.template.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Template</h1>
          <p>{templates.length} tema undangan</p>
        </div>
        <Link href="/admin/templates/new" className="btn-admin btn-admin-primary">
          + Tambah Template
        </Link>
      </div>

      {templates.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            Belum ada template. Klik &ldquo;+ Tambah Template&rdquo; untuk membuat yang pertama.
          </div>
        </div>
      ) : (
        <div className="template-grid">
          {templates.map((t) => (
            <div className="template-card" key={t.id}>
              <div className="template-card-thumb">
                <img src={t.thumbnail} alt={t.name} loading="lazy" />
                <div className="template-card-badges">
                  {t.isPremium && <span className="badge-premium">Premium</span>}
                  {!t.isActive && <span className="badge-inactive">Nonaktif</span>}
                </div>
              </div>
              <div className="template-card-body">
                <div className="template-card-name">{t.name}</div>
                <div className="template-card-meta">{t.category}</div>
                <div className="template-card-actions">
                  <Link href={`/admin/templates/${t.id}/edit`}>Edit</Link>
                  <form action={toggleTemplateActive.bind(null, t.id, !t.isActive)}>
                    <button type="submit">{t.isActive ? 'Nonaktifkan' : 'Aktifkan'}</button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
