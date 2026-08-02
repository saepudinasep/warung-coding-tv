import type { Metadata } from 'next';
import Link from 'next/link';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import CustomerSignOutButton from '@/components/CustomerSignOutButton';
import VerificationBanner from '@/components/VerificationBanner';

export const metadata: Metadata = {
  title: 'Dashboard Saya',
  robots: { index: false, follow: false },
};

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export default async function DashboardPage() {
  const session = await auth();

  const customer = await prisma.customer.findUnique({
    where: { id: session?.user?.id },
    select: { emailVerified: true },
  });

  const invitations = await prisma.invitation.findMany({
    where: { order: { customerId: session?.user?.id } },
    include: { template: true, order: { include: { package: true } } },
    orderBy: { createdAt: 'desc' },
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
        <h1>Selamat datang, {session?.user?.name}</h1>
        <p style={{ marginBottom: 24 }}>{session?.user?.email}</p>

        {!customer?.emailVerified && <VerificationBanner />}

        <div style={{ marginTop: 24 }}>
          {invitations.length === 0 ? (
            <div className="dashboard-empty">
              <p>Anda belum punya undangan. Yuk buat yang pertama — gratis untuk mulai.</p>
              <Link href="/dashboard/undangan/baru" className="btn-admin btn-admin-primary">
                + Buat Undangan Pertama
              </Link>
            </div>
          ) : (
            <>
              {invitations.map((inv) => (
                <div className="dashboard-invite-card" key={inv.id}>
                  <div className="dashboard-invite-thumb">
                    <img src={inv.template.thumbnail} alt={inv.template.name} loading="lazy" />
                  </div>
                  <div className="dashboard-invite-body">
                    <div className="dashboard-invite-names">
                      {inv.groomName} &amp; {inv.brideName}
                    </div>
                    <div className="dashboard-invite-meta">
                      {dateFormatter.format(inv.eventDate)}
                    </div>
                    {inv.location && <div className="dashboard-invite-meta">{inv.location}</div>}
                    <div className="dashboard-invite-meta">
                      Tema: {inv.template.name} · Paket: {inv.order.package.name}
                    </div>
                    <div className="dashboard-invite-actions">
                      <Link
                        href={`/${inv.slug}`}
                        target="_blank"
                        className="btn-admin btn-admin-primary"
                      >
                        Lihat Undangan
                      </Link>
                      <Link
                        href={`/dashboard/undangan/${inv.id}/edit`}
                        className="btn-admin btn-admin-secondary"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              <Link href="/dashboard/undangan/baru" className="btn-admin btn-admin-primary">
                + Buat Undangan Baru
              </Link>
            </>
          )}
        </div>

        <p style={{ marginTop: 40, fontSize: 13, color: 'var(--text-muted)' }}>
          Manajemen tamu, RSVP, dan halaman publik undangan menyusul di task berikutnya.
        </p>
      </div>
    </div>
  );
}
