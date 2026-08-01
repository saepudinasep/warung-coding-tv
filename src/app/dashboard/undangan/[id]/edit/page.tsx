import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { updateInvitation } from '@/lib/actions/invitations';
import InvitationForm from '@/components/InvitationForm';
import CustomerSignOutButton from '@/components/CustomerSignOutButton';

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
    include: { order: true },
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
      </div>
    </div>
  );
}
