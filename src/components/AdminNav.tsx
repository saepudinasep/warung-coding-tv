'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/customers', label: 'Pelanggan' },
  { href: '/admin/orders', label: 'Pesanan' },
  { href: '/admin/templates', label: 'Template' },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="admin-nav">
      {navItems.map((item) => {
        const isActive =
          item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} className={isActive ? 'active' : ''}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
