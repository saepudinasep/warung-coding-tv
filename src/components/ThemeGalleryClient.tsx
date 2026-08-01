'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import FadeUp from './FadeUp';

type Theme = {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  isPremium: boolean;
};

export default function ThemeGalleryClient({ templates }: { templates: Theme[] }) {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(templates.map((t) => t.category)));
    return ['Semua', ...unique];
  }, [templates]);

  const [active, setActive] = useState('Semua');
  const filtered = active === 'Semua' ? templates : templates.filter((t) => t.category === active);

  return (
    <section className="themes-section" id="tema">
      <div className="section-header section-header-center">
        <div className="section-label">Koleksi Tema</div>
        <h2 className="section-title">
          Pilihan Desain untuk <em>Setiap Pasangan</em>
        </h2>
        <p className="section-sub">Temukan tema yang paling merepresentasikan kisah cinta Anda.</p>
      </div>

      {categories.length > 2 && (
        <div className="theme-filter-tabs">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={active === c ? 'active' : ''}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'rgba(250,247,242,0.5)', fontSize: 14 }}>
          Belum ada tema di kategori ini.
        </p>
      ) : (
        <FadeUp className="themes-scroll">
          {filtered.map((t) => (
            <div className="theme-card" key={t.id}>
              <div className="theme-card-img">
                <img src={t.thumbnail} alt={t.name} loading="lazy" />
              </div>
              <div className="theme-label">
                {t.name}
                {t.isPremium && <span className="theme-badge">Premium</span>}
              </div>
            </div>
          ))}
        </FadeUp>
      )}

      <div className="themes-cta">
        <Link href="/daftar" className="btn-gold">
          Lihat Semua 50+ Tema &amp; Pilih Desain ›
        </Link>
        <p style={{ marginTop: 16, fontSize: 13, fontWeight: 300, color: 'rgba(250,247,242,0.4)' }}>
          Gratis coba 14 hari — tidak perlu kartu kredit
        </p>
      </div>
    </section>
  );
}
