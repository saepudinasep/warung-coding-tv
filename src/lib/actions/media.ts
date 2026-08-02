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
 * Dipanggil dari client SETELAH file berhasil diunggah langsung ke Vercel
 * Blob (bukan lewat server function kita — supaya tidak kena limit ukuran
 * body 4.5MB di Vercel, terutama untuk file video). Ini cuma menyimpan
 * record-nya ke database.
 */
export async function addMedia(
  invitationId: string,
  url: string,
  contentType: string,
): Promise<{ id: string; type: 'PHOTO' | 'VIDEO'; url: string }> {
  await requireOwnedInvitation(invitationId);

  const type: 'PHOTO' | 'VIDEO' = contentType.startsWith('video/') ? 'VIDEO' : 'PHOTO';
  const count = await prisma.media.count({ where: { invitationId } });

  const media = await prisma.media.create({
    data: { invitationId, type, url, order: count },
  });

  revalidatePath(`/dashboard/undangan/${invitationId}/edit`);
  revalidatePath(`/[slug]`, 'page');

  return { id: media.id, type, url: media.url };
}

export async function deleteMedia(mediaId: string) {
  const session = await auth();
  if (session?.user?.userType !== 'customer') {
    throw new Error('Akses ditolak.');
  }

  const media = await prisma.media.findUnique({
    where: { id: mediaId },
    include: { invitation: { include: { order: true } } },
  });
  if (!media || media.invitation.order.customerId !== session.user.id) {
    throw new Error('Media tidak ditemukan.');
  }

  try {
    await del(media.url);
  } catch {
    // Kalau gagal hapus file di blob storage, tetap lanjut hapus record DB —
    // lebih baik daripada data nyangkut karena error di sisi storage.
  }

  await prisma.media.delete({ where: { id: mediaId } });
  revalidatePath(`/dashboard/undangan/${media.invitationId}/edit`);
}
