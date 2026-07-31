import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Template',
};

export default function TemplatesPage() {
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
