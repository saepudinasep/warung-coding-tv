import Link from 'next/link';
import FadeUp from './FadeUp';

type Theme = {
  name: string;
  sub: string;
  category?: string;
  icon: string;
  badge?: string;
  gradient: string;
  nameColor: string;
  subColor: string;
  dividerColor: string;
  italic?: boolean;
  nameSize: number;
};

// Data dummy — nanti diganti query ke tabel Template (lihat prisma/schema.prisma)
const themes: Theme[] = [
  {
    name: 'Ivory Garden',
    sub: 'Rustic Botanical',
    category: 'Floral Elegant',
    icon: '🌿',
    badge: 'Populer',
    gradient: 'linear-gradient(160deg, #FAF7F2, #E8D5C4)',
    nameColor: '#5C4A3A',
    subColor: '#9C8A7A',
    dividerColor: '#C9997A',
    italic: true,
    nameSize: 28,
  },
  {
    name: 'Midnight Gold',
    sub: 'Luxury Dark',
    category: 'Premium',
    icon: '',
    badge: 'Baru',
    gradient: 'linear-gradient(160deg, #0D1B2A, #1E2F42)',
    nameColor: '#C9A96E',
    subColor: 'rgba(201,169,110,0.55)',
    dividerColor: '#C9A96E',
    nameSize: 22,
  },
  {
    name: 'Warm Bloom',
    sub: 'Warm Romantic',
    icon: '🌹',
    gradient: 'linear-gradient(160deg, #F5EDD8, #EAD8B8)',
    nameColor: '#5C3A1E',
    subColor: '#9C7050',
    dividerColor: '#9C7050',
    italic: true,
    nameSize: 24,
  },
  {
    name: 'Langit Malam',
    sub: 'Adat Modern',
    icon: '🌙',
    badge: 'Adat',
    gradient: 'linear-gradient(160deg, #1A1A2E, #16213E)',
    nameColor: '#E8C5B0',
    subColor: 'rgba(232,197,176,0.5)',
    dividerColor: 'rgba(232,197,176,0.4)',
    italic: true,
    nameSize: 20,
  },
  {
    name: 'Sand & Stone',
    sub: 'Minimalist Earthy',
    icon: '🏺',
    gradient: 'linear-gradient(160deg, #F9F1E7, #EDE0CC)',
    nameColor: '#3E3124',
    subColor: '#786250',
    dividerColor: '#786250',
    italic: true,
    nameSize: 26,
  },
  {
    name: 'Violet Dream',
    sub: 'Modern Ethereal',
    icon: '💜',
    badge: 'Baru',
    gradient: 'linear-gradient(160deg, #2D1B3D, #1A0D26)',
    nameColor: '#D4A5D4',
    subColor: 'rgba(212,165,212,0.5)',
    dividerColor: '#D4A5D4',
    italic: true,
    nameSize: 22,
  },
  {
    name: 'Sage Minimal',
    sub: 'Modern Simple',
    icon: '🪴',
    gradient: 'linear-gradient(160deg, #F0EBE1, #E4D5BF)',
    nameColor: '#4A3728',
    subColor: '#7A6050',
    dividerColor: '#7A6050',
    italic: true,
    nameSize: 22,
  },
  {
    name: 'Batik Klasik',
    sub: 'Nusantara',
    icon: '🏵️',
    badge: 'Adat',
    gradient: 'linear-gradient(160deg, #1C1408, #2E2010)',
    nameColor: '#C9A96E',
    subColor: 'rgba(201,169,110,0.4)',
    dividerColor: '#C9A96E',
    nameSize: 22,
  },
];

export default function ThemeGallery() {
  return (
    <section className="themes-section" id="tema">
      <div className="section-header section-header-center">
        <div className="section-label">Koleksi Tema</div>
        <h2 className="section-title">
          Pilihan Desain untuk <em>Setiap Pasangan</em>
        </h2>
        <p className="section-sub">Temukan tema yang paling merepresentasikan kisah cinta Anda.</p>
      </div>

      <FadeUp className="themes-scroll">
        {themes.map((t) => (
          <div className="theme-card" key={t.name}>
            <div className="theme-card-img" style={{ background: t.gradient }}>
              {t.icon && <div className="tc-badge">{t.icon}</div>}
              <div
                className="tc-name-display"
                style={{
                  color: t.nameColor,
                  fontSize: t.nameSize,
                  fontStyle: t.italic ? 'italic' : 'normal',
                  fontWeight: t.italic ? 400 : 600,
                }}
              >
                {t.name}
              </div>
              <div
                className="tc-divider"
                style={{ width: 44, height: 1, background: t.dividerColor }}
              />
              <div
                className="tc-sub"
                style={{
                  color: t.subColor,
                  fontSize: 9,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                {t.sub}
              </div>
              {t.category && (
                <div
                  className="tc-date"
                  style={{
                    color: t.subColor,
                    fontSize: 9,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {t.category}
                </div>
              )}
            </div>
            <div className="theme-label">
              {t.name}
              {t.badge && <span className="theme-badge">{t.badge}</span>}
            </div>
          </div>
        ))}
      </FadeUp>

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
