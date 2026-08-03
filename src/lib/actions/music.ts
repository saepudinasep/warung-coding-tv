'use server';

import { revalidatePath } from 'next/cache';
import { del } from '@vercel/blob';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

async function requireOwnedInvitation(invitationId: string) {
  const session = await auth();
  if (session?.user?.userType !== 'customer') {
    throw new Error('Akses ditolak.');
  }

  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId },
    include: { order: true },
  });
  if (!invitation || invitation.order.customerId !== session.user.id) {
    throw new Error('Undangan tidak ditemukan.');
  }

  return invitation;
}

/**
 * Musik latar cuma satu per undangan — dipakai ulang tabel Media (type MUSIC)
 * yang sudah ada di schema, bukan bikin tabel baru. Kalau sudah ada musik
 * sebelumnya, otomatis diganti (record lama + file blob-nya dihapus dulu).
 */
export async function setMusic(invitationId: string, url: string) {
  await requireOwnedInvitation(invitationId);

  const existing = await prisma.media.findFirst({
    where: { invitationId, type: 'MUSIC' },
  });

  if (existing) {
    try {
      await del(existing.url);
    } catch {
      // Lanjut walau gagal hapus file lama di blob storage.
    }
    await prisma.media.delete({ where: { id: existing.id } });
  }

  const media = await prisma.media.create({
    data: { invitationId, type: 'MUSIC', url, order: 0 },
  });

  revalidatePath(`/dashboard/undangan/${invitationId}/edit`);
  revalidatePath('/[slug]', 'page');

  return { id: media.id, url: media.url };
}

export async function removeMusic(invitationId: string) {
  await requireOwnedInvitation(invitationId);

  const existing = await prisma.media.findFirst({
    where: { invitationId, type: 'MUSIC' },
  });
  if (!existing) return;

  try {
    await del(existing.url);
  } catch {
    // Lanjut walau gagal hapus file di blob storage.
  }

  await prisma.media.delete({ where: { id: existing.id } });
  revalidatePath(`/dashboard/undangan/${invitationId}/edit`);
  revalidatePath('/[slug]', 'page');
}
