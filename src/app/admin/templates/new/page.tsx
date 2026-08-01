import type { Metadata } from 'next';
import { auth } from '@/auth';
import { createTemplate } from '@/lib/actions/templates';
import TemplateForm from '@/components/TemplateForm';

export const metadata: Metadata = {
  title: 'Tambah Template',
};

export default async function NewTemplatePage() {
  const session = await auth();

  if (session?.user?.role !== 'ADMIN') {
    return (
      <div className="admin-card">
        <div className="admin-empty">
          Halaman ini khusus role <strong>ADMIN</strong>.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Tambah Template</h1>
          <p>Tema baru akan langsung aktif dan tampil di landing page setelah disimpan.</p>
        </div>
      </div>
      <TemplateForm action={createTemplate} submitLabel="Simpan Template" />
    </div>
  );
}
