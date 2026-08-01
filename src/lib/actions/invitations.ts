'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export type InvitationActionState = { error?: string } | undefined;

async function requireCustomer() {
  const session = await auth();
  if (session?.user?.userType !== 'customer') {
    throw new Error('Akses ditolak — halaman ini khusus pelanggan yang sudah masuk.');
  }
  return session.user.id;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function generateUniqueSlug(groomName: string, brideName: string) {
  const base = slugify(`${groomName}-${brideName}`) || 'undangan';
  let slug = base;
  let attempt = 0;

  while (await prisma.invitation.findUnique({ where: { slug } })) {
    attempt += 1;
    slug = `${base}-${attempt + 1}`;
  }

  return slug;
}

/**
 * Cari Order milik customer yang masih punya slot invitation kosong.
 * Kalau tidak ada, buat Order baru pakai paket Gratis secara otomatis
 * (instan aktif, tanpa perlu payment gateway — itu integrasi terpisah
 * yang belum dibangun). Paket berbayar (Premium/Duo) baru bisa dipilih
 * setelah task "Integrasi payment gateway" selesai.
 */
async function findOrCreateAvailableOrder(customerId: string) {
  const orders = await prisma.order.findMany({
    where: { customerId, status: 'PAID' },
    include: { package: true, invitations: { select: { id: true } } },
    orderBy: { createdAt: 'desc' },
  });

  const withRoom = orders.find((o) => o.invitations.length < o.package.maxInvitation);
  if (withRoom) {
    return withRoom;
  }

  const hasAnyOrder = orders.length > 0;
  if (hasAnyOrder) {
    throw new Error(
      'Kuota undangan pada paket Anda sudah penuh. Upgrade ke paket Premium/Duo akan tersedia setelah fitur pembayaran aktif.',
    );
  }

  const freePackage = await prisma.package.findFirst({ where: { price: 0, isActive: true } });
  if (!freePackage) {
    throw new Error('Paket gratis tidak tersedia saat ini. Hubungi admin.');
  }

  const order = await prisma.order.create({
    data: {
      customerId,
      packageId: freePackage.id,
      status: 'PAID',
      totalAmount: 0,
    },
    include: { package: true, invitations: { select: { id: true } } },
  });

  return order;
}

function readInvitationForm(formData: FormData) {
  const groomName = String(formData.get('groomName') ?? '').trim();
  const brideName = String(formData.get('brideName') ?? '').trim();
  const eventDateRaw = String(formData.get('eventDate') ?? '');
  const location = String(formData.get('location') ?? '').trim();
  const templateId = String(formData.get('templateId') ?? '').trim();

  if (groomName.length < 2 || brideName.length < 2) {
    throw new Error('Nama mempelai wajib diisi.');
  }
  if (!eventDateRaw) {
    throw new Error('Tanggal acara wajib diisi.');
  }
  const eventDate = new Date(eventDateRaw);
  if (Number.isNaN(eventDate.getTime())) {
    throw new Error('Format tanggal tidak valid.');
  }
  if (!templateId) {
    throw new Error('Pilih salah satu tema terlebih dahulu.');
  }

  return { groomName, brideName, eventDate, location: location || null, templateId };
}

export async function createInvitation(
  _prevState: InvitationActionState,
  formData: FormData,
): Promise<InvitationActionState> {
  const customerId = await requireCustomer();

  let data: ReturnType<typeof readInvitationForm>;
  try {
    data = readInvitationForm(formData);
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Data tidak valid.' };
  }

  const template = await prisma.template.findUnique({ where: { id: data.templateId } });
  if (!template || !template.isActive) {
    return { error: 'Tema yang dipilih tidak tersedia.' };
  }

  let order;
  try {
    order = await findOrCreateAvailableOrder(customerId);
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Gagal menyiapkan order.' };
  }

  const slug = await generateUniqueSlug(data.groomName, data.brideName);
  const expiresAt = order.package.activeDays
    ? new Date(Date.now() + order.package.activeDays * 24 * 60 * 60 * 1000)
    : null;

  try {
    await prisma.invitation.create({
      data: {
        orderId: order.id,
        templateId: template.id,
        slug,
        groomName: data.groomName,
        brideName: data.brideName,
        eventDate: data.eventDate,
        location: data.location,
        expiresAt,
      },
    });
  } catch {
    return { error: 'Gagal menyimpan undangan. Coba lagi.' };
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function updateInvitation(
  id: string,
  _prevState: InvitationActionState,
  formData: FormData,
): Promise<InvitationActionState> {
  const customerId = await requireCustomer();

  const existing = await prisma.invitation.findUnique({
    where: { id },
    include: { order: true },
  });
  if (!existing || existing.order.customerId !== customerId) {
    return { error: 'Undangan tidak ditemukan.' };
  }

  let data: ReturnType<typeof readInvitationForm>;
  try {
    data = readInvitationForm(formData);
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Data tidak valid.' };
  }

  const template = await prisma.template.findUnique({ where: { id: data.templateId } });
  if (!template || !template.isActive) {
    return { error: 'Tema yang dipilih tidak tersedia.' };
  }

  try {
    await prisma.invitation.update({
      where: { id },
      data: {
        templateId: template.id,
        groomName: data.groomName,
        brideName: data.brideName,
        eventDate: data.eventDate,
        location: data.location,
      },
    });
  } catch {
    return { error: 'Gagal menyimpan perubahan. Coba lagi.' };
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}
