import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import CustomerSignOutButton from '@/components/CustomerSignOutButton';
import AddGuestForm from '@/components/AddGuestForm';
import GuestImportBox from '@/components/GuestImportBox';
import CopyLinkButton from '@/components/CopyLinkButton';
import DeleteGuestButton from '@/components/DeleteGuestButton';
import { generateQrDataUrl } from '@/lib/qrcode';

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
    title: invitation ? `Tamu — ${invitation.groomName} & ${invitation.brideName}` : 'Kelola Tamu',
    robots: { index: false, follow: false },
  };
}

const rsvpLabel: Record<string, string> = {
  PENDING: 'Menunggu',
  ATTENDING: 'Hadir',
  NOT_ATTENDING: 'Tidak Hadir',
};

export default async function GuestListPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const { id } = await params;

  const invitation = await prisma.invitation.findUnique({
    where: { id },
    include: {
      order: true,
      guests: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!invitation || invitation.order.customerId !== session?.user?.id) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const totalGuests = invitation.guests.reduce((sum, g) => sum + g.guestCount, 0);
  const attending = invitation.guests.filter((g) => g.rsvpStatus === 'ATTENDING').length;

  const guestLinks = invitation.guests.map((g) => ({
    guest: g,
    link: `${siteUrl}/${invitation.slug}?to=${g.slug}`,
  }));
  const qrDataUrls = await Promise.all(guestLinks.map((gl) => generateQrDataUrl(gl.link)));

  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <span className="admin-topbar-logo">
          Warung Coding TV<span>.</span>
        </span>
        <CustomerSignOutButton />
      </div>
      <div className="admin-content" style={{ maxWidth: 820 }}>
        <Link href={`/dashboard/undangan/${invitation.id}/edit`} className="admin-back-link">
          ← Kembali ke undangan
        </Link>

        <div className="admin-page-header">
          <div>
            <h1>Kelola Tamu</h1>
            <p>
              {invitation.groomName} &amp; {invitation.brideName} — {invitation.guests.length} tamu
              terdaftar ({totalGuests} orang), {attending} sudah konfirmasi hadir
            </p>
          </div>
        </div>

        <AddGuestForm invitationId={invitation.id} />
        <GuestImportBox invitationId={invitation.id} />

        <div className="admin-card">
          {invitation.guests.length === 0 ? (
            <div className="admin-empty">
              Belum ada tamu. Tambah manual atau import dari Excel/CSV di atas.
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>WhatsApp</th>
                  <th>Jumlah</th>
                  <th>RSVP</th>
                  <th>Link</th>
                  <th>QR Code</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {guestLinks.map(({ guest: g, link }, i) => (
                  <tr key={g.id}>
                    <td className="admin-table-name">{g.name}</td>
                    <td>{g.phone}</td>
                    <td>{g.guestCount}</td>
                    <td>
                      <span className={`status-badge ${g.rsvpStatus}`}>
                        {rsvpLabel[g.rsvpStatus] ?? g.rsvpStatus}
                      </span>
                    </td>
                    <td>
                      <CopyLinkButton link={link} />
                    </td>
                    <td>
                      <a
                        href={qrDataUrls[i]}
                        download={`qr-${g.slug}.png`}
                        title="Klik untuk download QR Code"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={qrDataUrls[i]}
                          alt={`QR code untuk ${g.name}`}
                          width={40}
                          height={40}
                          style={{ borderRadius: 4, border: '1px solid var(--border-navy)' }}
                        />
                      </a>
                    </td>
                    <td>
                      <DeleteGuestButton guestId={g.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
