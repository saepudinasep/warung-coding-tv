'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const navItems = [
  { href: '/admin', label: 'Dashboard', adminOnly: false },
  { href: '/admin/customers', label: 'Pelanggan', adminOnly: false },
  { href: '/admin/orders', label: 'Pesanan', adminOnly: false },
  { href: '/admin/templates', label: 'Template', adminOnly: true },
];

export default function AdminNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role;

  return (
    <nav className="admin-nav">
      {navItems
        .filter((item) => !item.adminOnly || role === 'ADMIN')
        .map((item) => {
          const isActive =
            item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive ? 'active' : ''}
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          );
        })}
    </nav>
  );
}
