import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

const MAX_SIZE_BYTES = 30 * 1024 * 1024; // 30MB — cukup untuk foto & video pendek

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        const session = await auth();
        if (session?.user?.userType !== 'customer') {
          throw new Error('Akses ditolak.');
        }

        const payload = clientPayload
          ? (JSON.parse(clientPayload) as { invitationId?: string })
          : null;
        if (!payload?.invitationId) {
          throw new Error('invitationId wajib dikirim.');
        }

        const invitation = await prisma.invitation.findUnique({
          where: { id: payload.invitationId },
          include: { order: true },
        });
        if (!invitation || invitation.order.customerId !== session.user.id) {
          throw new Error('Undangan tidak ditemukan.');
        }

        return {
          allowedContentTypes: [
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/gif',
            'video/mp4',
            'video/quicktime',
            'video/webm',
          ],
          maximumSizeInBytes: MAX_SIZE_BYTES,
          addRandomSuffix: true,
        };
      },
      // onUploadCompleted (webhook) sengaja tidak dipakai — tidak jalan di
      // localhost dev (Vercel tidak bisa callback ke localhost). Sebagai
      // gantinya, client memanggil server action addMedia() langsung
      // setelah upload() selesai (lihat MediaUploader.tsx), jadi jalan
      // sama persis di lokal maupun production.
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload gagal.' },
      { status: 400 },
    );
  }
}
