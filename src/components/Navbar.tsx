'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '#tema', label: 'Tema' },
  { href: '#fitur', label: 'Fitur' },
  { href: '#harga', label: 'Harga' },
  { href: '#cara-kerja', label: 'Cara Kerja' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
      <Link href="/" className="nav-logo">
        Warung Coding TV<span>.</span>
      </Link>

      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>

      <div className="nav-actions hidden md:flex">
        <Link href="/masuk" className="btn-ghost">
          Masuk
        </Link>
        <Link href="/daftar" className="btn-primary">
          Buat Undangan
        </Link>
      </div>

      <button
        className="nav-hamburger"
        aria-label="Menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      {menuOpen && (
        <div className="bg-ivory absolute top-full right-0 left-0 flex flex-col gap-1 border-b border-(--border-navy) p-6 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-2 text-[15px] text-(--text-mid)"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="mt-3 flex gap-3">
            <Link href="/masuk" className="btn-ghost">
              Masuk
            </Link>
            <Link href="/daftar" className="btn-primary">
              Buat Undangan
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
