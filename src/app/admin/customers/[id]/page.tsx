import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
const rupiahFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

async function getCustomer(id: string) {
  return prisma.customer.findUnique({
    where: { id },
    include: {
      orders: {
        include: { package: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const customer = await prisma.customer.findUnique({ where: { id }, select: { name: true } });
  return { title: customer?.name ?? 'Pelanggan' };
}

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customer = await getCustomer(id);

  if (!customer) {
    notFound();
  }

  const initials = customer.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w: string) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div>
      <Link href="/admin/customers" className="admin-back-link">
        ← Kembali ke daftar pelanggan
      </Link>

      <div className="customer-detail-header">
        <div className="customer-detail-avatar">{initials}</div>
        <h1
          style={{ fontFamily: 'var(--font-display), serif', fontSize: 22, color: 'var(--navy)' }}
        >
          {customer.name}
        </h1>
      </div>
      <div className="customer-detail-meta">
        <span>
          <strong>Email:</strong> {customer.email}
        </span>
        <span>
          <strong>WhatsApp:</strong> {customer.phone}
        </span>
        <span>
          <strong>Bergabung:</strong> {dateFormatter.format(customer.createdAt)}
        </span>
      </div>

      <div className="admin-section-title">Riwayat Order ({customer.orders.length})</div>
      <div className="admin-card">
        {customer.orders.length === 0 ? (
          <div className="admin-empty">Pelanggan ini belum pernah melakukan order.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Paket</th>
                <th>Total</th>
                <th>Status</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {customer.orders.map((o) => (
                <tr key={o.id}>
                  <td className="admin-table-name">{o.package.name}</td>
                  <td>{rupiahFormatter.format(o.totalAmount)}</td>
                  <td>
                    <span className={`status-badge ${o.status}`}>{o.status}</span>
                  </td>
                  <td>{dateFormatter.format(o.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
