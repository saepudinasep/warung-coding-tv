'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export type GuestActionState = { error?: string } | undefined;

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

function slugify(text: string) {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-') || 'tamu'
  );
}

/**
 * Slug tamu cuma perlu unik DI DALAM satu undangan (lihat
 * @@unique([invitationId, slug]) di schema), beda dari slug undangan yang
 * unik global.
 */
export async function generateUniqueGuestSlug(invitationId: string, name: string) {
  const base = slugify(name);
  let slug = base;
  let attempt = 0;

  while (await prisma.guest.findUnique({ where: { invitationId_slug: { invitationId, slug } } })) {
    attempt += 1;
    slug = `${base}-${attempt + 1}`;
  }

  return slug;
}

export async function addGuest(
  invitationId: string,
  _prevState: GuestActionState,
  formData: FormData,
): Promise<GuestActionState> {
  try {
    await requireOwnedInvitation(invitationId);
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Akses ditolak.' };
  }

  const name = String(formData.get('name') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const guestCountRaw = String(formData.get('guestCount') ?? '1');
  const guestCount = Math.max(1, parseInt(guestCountRaw, 10) || 1);

  if (name.length < 2) {
    return { error: 'Nama tamu wajib diisi.' };
  }
  if (phone.length < 8) {
    return { error: 'Nomor WhatsApp wajib diisi dengan benar.' };
  }

  const slug = await generateUniqueGuestSlug(invitationId, name);

  await prisma.guest.create({
    data: { invitationId, name, phone, guestCount, slug },
  });

  revalidatePath(`/dashboard/undangan/${invitationId}/tamu`);
}

export async function deleteGuest(guestId: string) {
  const session = await auth();
  if (session?.user?.userType !== 'customer') {
    throw new Error('Akses ditolak.');
  }

  const guest = await prisma.guest.findUnique({
    where: { id: guestId },
    include: { invitation: { include: { order: true } } },
  });
  if (!guest || guest.invitation.order.customerId !== session.user.id) {
    throw new Error('Tamu tidak ditemukan.');
  }

  await prisma.guest.delete({ where: { id: guestId } });
  revalidatePath(`/dashboard/undangan/${guest.invitationId}/tamu`);
}
