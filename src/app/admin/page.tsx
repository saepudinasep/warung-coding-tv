import { auth } from '@/auth';

export default async function AdminPage() {
  const session = await auth();

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Selamat datang, {session?.user?.name}</h1>
          <p>{session?.user?.email}</p>
        </div>
      </div>
      <p style={{ fontSize: 14, color: 'var(--text-mid)' }}>
        Buka menu <strong>Pelanggan</strong> di sidebar untuk melihat daftar customer dan riwayat
        order mereka.
      </p>
    </div>
  );
}
