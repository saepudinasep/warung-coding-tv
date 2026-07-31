import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Pesanan',
};

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});
const rupiahFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

const statusTabs = [
  { value: undefined, label: 'Semua' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'PAID', label: 'Paid' },
  { value: 'EXPIRED', label: 'Expired' },
  { value: 'CANCELLED', label: 'Cancelled' },
] as const;

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const activeStatus = statusTabs.some((t) => t.value === status) ? status : undefined;

  const orders = await prisma.order.findMany({
    where: activeStatus ? { status: activeStatus as never } : undefined,
    include: { customer: true, package: true },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Pesanan</h1>
          <p>{orders.length} order</p>
        </div>
      </div>

      <div className="admin-filter-tabs">
        {statusTabs.map((tab) => (
          <Link
            key={tab.label}
            href={tab.value ? `/admin/orders?status=${tab.value}` : '/admin/orders'}
            className={activeStatus === tab.value ? 'active' : ''}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="admin-card">
        {orders.length === 0 ? (
          <div className="admin-empty">Belum ada order dengan status ini.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Pelanggan</th>
                <th>Paket</th>
                <th>Total</th>
                <th>Status</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>
                    <Link href={`/admin/orders/${o.id}`} style={{ textDecoration: 'none' }}>
                      <div className="admin-table-name">{o.customer.name}</div>
                      <div className="admin-table-sub">{o.customer.email}</div>
                    </Link>
                  </td>
                  <td>{o.package.name}</td>
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
