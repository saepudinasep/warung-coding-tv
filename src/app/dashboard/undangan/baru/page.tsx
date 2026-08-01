import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { createInvitation } from '@/lib/actions/invitations';
import InvitationForm from '@/components/InvitationForm';
import CustomerSignOutButton from '@/components/CustomerSignOutButton';

export const metadata: Metadata = {
  title: 'Buat Undangan Baru',
  robots: { index: false, follow: false },
};

export default async function NewInvitationPage() {
  const templates = await prisma.template.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, thumbnail: true },
  });

  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <span className="admin-topbar-logo">
          Warung Coding TV<span>.</span>
        </span>
        <CustomerSignOutButton />
      </div>
      <div className="admin-content" style={{ maxWidth: 720 }}>
        <h1>Buat Undangan Baru</h1>
        <p style={{ marginBottom: 28 }}>
          Isi detail acara Anda dan pilih tema. Undangan akan langsung aktif setelah disimpan.
        </p>
        <InvitationForm
          action={createInvitation}
          templates={templates}
          submitLabel="Buat Undangan"
        />
      </div>
    </div>
  );
}
