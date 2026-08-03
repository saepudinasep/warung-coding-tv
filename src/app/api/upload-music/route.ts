import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

const MAX_SIZE_BYTES = 15 * 1024 * 1024; // 15MB — cukup untuk lagu durasi normal

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
          allowedContentTypes: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/mp4'],
          maximumSizeInBytes: MAX_SIZE_BYTES,
          addRandomSuffix: true,
        };
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload gagal.' },
      { status: 400 },
    );
  }
}
