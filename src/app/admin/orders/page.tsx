import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pesanan',
};

export default function OrdersPage() {
  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Pesanan</h1>
          <p>Menyusul di task berikutnya — Dashboard CRM: daftar order &amp; pembayaran.</p>
        </div>
      </div>
      <div className="admin-card">
        <div className="admin-empty">Belum tersedia.</div>
      </div>
    </div>
  );
}
