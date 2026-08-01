'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export type TemplateActionState = { error?: string } | undefined;

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.userType !== 'admin' || session.user.role !== 'ADMIN') {
    throw new Error('Akses ditolak — halaman ini khusus role ADMIN.');
  }
}

function readTemplateForm(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim();
  const category = String(formData.get('category') ?? '').trim();
  const thumbnail = String(formData.get('thumbnail') ?? '').trim();
  const previewUrl = String(formData.get('previewUrl') ?? '').trim();
  const isPremium = formData.get('isPremium') === 'on';

  if (name.length < 2) {
    throw new Error('Nama tema minimal 2 karakter.');
  }
  if (category.length < 2) {
    throw new Error('Kategori wajib diisi.');
  }
  if (!thumbnail) {
    throw new Error('URL thumbnail wajib diisi.');
  }

  return { name, category, thumbnail, previewUrl: previewUrl || null, isPremium };
}

export async function createTemplate(
  _prevState: TemplateActionState,
  formData: FormData,
): Promise<TemplateActionState> {
  await requireAdmin();

  let data: ReturnType<typeof readTemplateForm>;
  try {
    data = readTemplateForm(formData);
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Data tidak valid.' };
  }

  try {
    await prisma.template.create({ data: { ...data, isActive: true } });
  } catch {
    return { error: 'Gagal menyimpan template. Coba lagi.' };
  }

  // redirect() harus di LUAR try/catch di atas — ia melempar sinyal khusus
  // (NEXT_REDIRECT) yang tidak boleh tertangkap sebagai error biasa.
  revalidatePath('/admin/templates');
  redirect('/admin/templates');
}

export async function updateTemplate(
  id: string,
  _prevState: TemplateActionState,
  formData: FormData,
): Promise<TemplateActionState> {
  await requireAdmin();

  let data: ReturnType<typeof readTemplateForm>;
  try {
    data = readTemplateForm(formData);
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Data tidak valid.' };
  }

  try {
    await prisma.template.update({ where: { id }, data });
  } catch {
    return { error: 'Gagal menyimpan perubahan. Coba lagi.' };
  }

  revalidatePath('/admin/templates');
  redirect('/admin/templates');
}

export async function toggleTemplateActive(id: string, nextValue: boolean) {
  await requireAdmin();

  await prisma.template.update({
    where: { id },
    data: { isActive: nextValue },
  });

  revalidatePath('/admin/templates');
}
