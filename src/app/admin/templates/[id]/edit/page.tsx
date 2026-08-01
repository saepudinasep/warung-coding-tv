import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { updateTemplate } from '@/lib/actions/templates';
import TemplateForm from '@/components/TemplateForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const template = await prisma.template.findUnique({ where: { id }, select: { name: true } });
  return { title: template ? `Edit — ${template.name}` : 'Edit Template' };
}

export default async function EditTemplatePage({ params }: { params: Promise<{ id: string }> }) {
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

  const { id } = await params;
  const template = await prisma.template.findUnique({ where: { id } });

  if (!template) {
    notFound();
  }

  const boundUpdate = updateTemplate.bind(null, template.id);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Edit Template</h1>
          <p>{template.name}</p>
        </div>
      </div>
      <TemplateForm
        action={boundUpdate}
        submitLabel="Simpan Perubahan"
        initial={{
          name: template.name,
          category: template.category,
          thumbnail: template.thumbnail,
          previewUrl: template.previewUrl ?? '',
          isPremium: template.isPremium,
        }}
      />
    </div>
  );
}
