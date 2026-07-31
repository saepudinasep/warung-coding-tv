import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Pelanggan',
};

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';

  const customers = await prisma.customer.findMany({
    where: query
      ? {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { email: { contains: query, mode: 'insensitive' } },
            { phone: { contains: query } },
          ],
        }
      : undefined,
    orderBy: { createdAt: 'desc' },
    include: {
      orders: { select: { id: true } },
    },
    take: 50,
  });

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Pelanggan</h1>
          <p>
            {customers.length} pelanggan
            {query && ` — hasil pencarian "${query}"`}
          </p>
        </div>
        <form className="admin-search" action="/admin/customers">
          <input
            type="text"
            name="q"
            placeholder="Cari nama, email, atau HP..."
            defaultValue={query}
          />
          <button type="submit">Cari</button>
          {query && (
            <Link href="/admin/customers" className="admin-search-clear">
              Reset
            </Link>
          )}
        </form>
      </div>

      <div className="admin-card">
        {customers.length === 0 ? (
          <div className="admin-empty">
            {query
              ? `Tidak ada pelanggan yang cocok dengan "${query}".`
              : 'Belum ada pelanggan yang mendaftar.'}
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Kontak</th>
                <th>Jumlah Order</th>
                <th>Bergabung</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td>
                    <Link href={`/admin/customers/${c.id}`} style={{ textDecoration: 'none' }}>
                      <div className="admin-table-name">{c.name}</div>
                    </Link>
                  </td>
                  <td>
                    <div>{c.email}</div>
                    <div className="admin-table-sub">{c.phone}</div>
                  </td>
                  <td>{c.orders.length}</td>
                  <td>{dateFormatter.format(c.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
