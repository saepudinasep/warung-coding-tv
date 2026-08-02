import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import CountdownTimer from '@/components/CountdownTimer';

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
const timeFormatter = new Intl.DateTimeFormat('id-ID', {
  hour: '2-digit',
  minute: '2-digit',
});

async function getInvitation(slug: string) {
  return prisma.invitation.findUnique({
    where: { slug },
    include: { template: true, media: { orderBy: { order: 'asc' } } },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const invitation = await getInvitation(slug);

  if (!invitation || !invitation.isActive) {
    return { title: 'Undangan Tidak Ditemukan' };
  }

  const title = `${invitation.groomName} & ${invitation.brideName}`;
  const description = `${dateFormatter.format(invitation.eventDate)}${
    invitation.location ? ` — ${invitation.location}` : ''
  }. Undangan digital dari Warung Coding TV.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [{ url: invitation.template.thumbnail }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function InvitationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const invitation = await getInvitation(slug);

  if (!invitation || !invitation.isActive) {
    notFound();
  }

  const mapsQuery = invitation.location
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(invitation.location)}`
    : null;

  return (
    <div className="invite-page">
      <section className="invite-hero">
        <p className="invite-eyebrow">The Wedding Of</p>
        <h1 className="invite-names">
          {invitation.groomName}
          <span className="amp">&amp;</span>
          {invitation.brideName}
        </h1>
        <div className="invite-ornament" />
        <p className="invite-date">
          {dateFormatter.format(invitation.eventDate)} ·{' '}
          {timeFormatter.format(invitation.eventDate)} WIB
        </p>
        <CountdownTimer eventDate={invitation.eventDate.toISOString()} />
        <div className="invite-scroll-hint">Scroll ↓</div>
      </section>

      <div className="invite-cover">
        <Image
          src={invitation.template.thumbnail}
          alt={invitation.template.name}
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>

      <section className="invite-section">
        <p className="invite-section-label">Detail Acara</p>
        <h2 className="invite-section-title">Kami Menantikan Kehadiran Anda</h2>

        <div className="invite-detail-card">
          <h3>Tanggal &amp; Waktu</h3>
          <p>
            {dateFormatter.format(invitation.eventDate)}
            <br />
            Pukul {timeFormatter.format(invitation.eventDate)} WIB
          </p>
        </div>

        {invitation.location && (
          <div className="invite-detail-card">
            <h3>Lokasi</h3>
            <p>{invitation.location}</p>
            {mapsQuery && (
              <a
                href={mapsQuery}
                target="_blank"
                rel="noopener noreferrer"
                className="invite-maps-link"
              >
                Buka di Google Maps →
              </a>
            )}
          </div>
        )}
      </section>

      {invitation.media.length > 0 && (
        <section className="invite-section">
          <p className="invite-section-label">Galeri</p>
          <h2 className="invite-section-title">Kenangan Kami</h2>
          <div className="media-grid">
            {invitation.media.map((m) =>
              m.type === 'VIDEO' ? (
                <div className="media-item" key={m.id}>
                  <video src={m.url} controls playsInline />
                </div>
              ) : (
                <div className="media-item" key={m.id}>
                  <Image src={m.url} alt="" fill sizes="120px" style={{ objectFit: 'cover' }} />
                </div>
              ),
            )}
          </div>
        </section>
      )}

      <footer className="invite-footer">
        <p>
          Dibuat dengan ♡ menggunakan <Link href="/">Warung Coding TV</Link>
        </p>
      </footer>
    </div>
  );
}
