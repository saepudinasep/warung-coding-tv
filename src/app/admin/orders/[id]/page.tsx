import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});
const rupiahFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

async function getOrder(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      customer: true,
      package: true,
      payments: { orderBy: { createdAt: 'desc' } },
    },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    select: { customer: { select: { name: true } } },
  });
  return { title: order ? `Order — ${order.customer.name}` : 'Order' };
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  return (
    <div>
      <Link href="/admin/orders" className="admin-back-link">
        ← Kembali ke daftar pesanan
      </Link>

      <div className="admin-page-header">
        <div>
          <h1>Order #{order.id.slice(-8).toUpperCase()}</h1>
          <p>Dibuat {dateFormatter.format(order.createdAt)}</p>
        </div>
        <span
          className={`status-badge ${order.status}`}
          style={{ fontSize: 13, padding: '5px 14px' }}
        >
          {order.status}
        </span>
      </div>

      <div className="order-detail-grid">
        <div className="order-detail-box">
          <h3>Pelanggan</h3>
          <div className="order-detail-row">
            <span>Nama</span>
            <Link
              href={`/admin/customers/${order.customer.id}`}
              style={{ color: 'var(--navy)', fontWeight: 500 }}
            >
              {order.customer.name}
            </Link>
          </div>
          <div className="order-detail-row">
            <span>Email</span>
            <span>{order.customer.email}</span>
          </div>
          <div className="order-detail-row">
            <span>WhatsApp</span>
            <span>{order.customer.phone}</span>
          </div>
        </div>

        <div className="order-detail-box">
          <h3>Detail Order</h3>
          <div className="order-detail-row">
            <span>Paket</span>
            <span>{order.package.name}</span>
          </div>
          <div className="order-detail-row">
            <span>Total</span>
            <span>{rupiahFormatter.format(order.totalAmount)}</span>
          </div>
          <div className="order-detail-row">
            <span>Status</span>
            <span className={`status-badge ${order.status}`}>{order.status}</span>
          </div>
        </div>
      </div>

      <div className="admin-section-title">Riwayat Pembayaran ({order.payments.length})</div>
      <div className="admin-card">
        {order.payments.length === 0 ? (
          <div className="admin-empty">Belum ada percobaan pembayaran untuk order ini.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Metode</th>
                <th>Jumlah</th>
                <th>Status</th>
                <th>Referensi</th>
                <th>Dibayar</th>
              </tr>
            </thead>
            <tbody>
              {order.payments.map((p) => (
                <tr key={p.id}>
                  <td>{p.method.replace('_', ' ')}</td>
                  <td>{rupiahFormatter.format(p.amount)}</td>
                  <td>
                    <span className={`status-badge ${p.status}`}>{p.status}</span>
                  </td>
                  <td className="admin-table-sub">{p.providerRefId ?? '—'}</td>
                  <td>{p.paidAt ? dateFormatter.format(p.paidAt) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
