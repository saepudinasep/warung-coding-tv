import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { updateInvitation } from '@/lib/actions/invitations';
import InvitationForm from '@/components/InvitationForm';
import CustomerSignOutButton from '@/components/CustomerSignOutButton';
import MediaUploader from '@/components/MediaUploader';

function toDatetimeLocal(date: Date) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const invitation = await prisma.invitation.findUnique({
    where: { id },
    select: { groomName: true, brideName: true },
  });
  return {
    title: invitation
      ? `Edit — ${invitation.groomName} & ${invitation.brideName}`
      : 'Edit Undangan',
    robots: { index: false, follow: false },
  };
}

export default async function EditInvitationPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const { id } = await params;

  const invitation = await prisma.invitation.findUnique({
    where: { id },
    include: { order: true, media: { orderBy: { order: 'asc' } } },
  });

  if (!invitation || invitation.order.customerId !== session?.user?.id) {
    notFound();
  }

  const templates = await prisma.template.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, thumbnail: true },
  });

  const boundUpdate = updateInvitation.bind(null, invitation.id);

  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <span className="admin-topbar-logo">
          Warung Coding TV<span>.</span>
        </span>
        <CustomerSignOutButton />
      </div>
      <div className="admin-content" style={{ maxWidth: 720 }}>
        <h1>Edit Undangan</h1>
        <p style={{ marginBottom: 28 }}>
          {invitation.groomName} &amp; {invitation.brideName}
        </p>
        <InvitationForm
          action={boundUpdate}
          templates={templates}
          submitLabel="Simpan Perubahan"
          initial={{
            groomName: invitation.groomName,
            brideName: invitation.brideName,
            eventDate: toDatetimeLocal(invitation.eventDate),
            location: invitation.location ?? '',
            templateId: invitation.templateId,
          }}
        />

        <div style={{ marginTop: 48, maxWidth: 640 }}>
          <h2
            style={{
              fontFamily: 'var(--font-display), serif',
              fontSize: 20,
              color: 'var(--navy)',
              marginBottom: 8,
            }}
          >
            Galeri Foto &amp; Video
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-mid)', marginBottom: 20 }}>
            Foto dan video ini akan tampil di halaman undangan Anda.
          </p>
          <MediaUploader
            invitationId={invitation.id}
            initialMedia={invitation.media
              .filter((m) => m.type === 'PHOTO' || m.type === 'VIDEO')
              .map((m) => ({ id: m.id, type: m.type as 'PHOTO' | 'VIDEO', url: m.url }))}
          />
        </div>
      </div>
    </div>
  );
}
