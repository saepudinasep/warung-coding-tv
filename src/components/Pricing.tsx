import Link from 'next/link';
import FadeUp from './FadeUp';

// Data dummy — nanti diganti query ke tabel Package (lihat prisma/schema.prisma)
const plans = [
  {
    tier: 'Gratis',
    currency: '',
    amount: 'Rp0',
    period: 'Coba 14 hari',
    desc: 'Cocok untuk mencoba dan melihat tampilan undangan sebelum memutuskan.',
    features: [
      '1 Undangan Digital',
      '3 Pilihan Tema Dasar',
      'Aktif 14 Hari',
      'Maks. 30 Tamu',
      'Galeri 5 Foto',
      'RSVP Online',
    ],
    cta: 'Daftar Gratis',
    featured: false,
  },
  {
    tier: 'Premium',
    currency: 'Rp',
    amount: '149K',
    period: 'Bayar sekali, aktif selamanya',
    desc: 'Untuk pasangan yang menginginkan undangan sempurna tanpa batas.',
    features: [
      '1 Undangan Digital Premium',
      '50+ Tema Eksklusif',
      'Aktif Selamanya',
      'Tamu Tidak Terbatas',
      'Galeri Foto & Video Unlimited',
      'WhatsApp Blast CRM',
      'Musik Latar',
      'Kado Digital & Cashless',
      'Link Live Streaming',
      'QR Code Personal Tamu',
    ],
    cta: 'Pilih Premium',
    featured: true,
    badge: '✦ Paling Favorit',
  },
  {
    tier: 'Paket Duo',
    currency: 'Rp',
    amount: '249K',
    period: '2 acara dalam 1 akun',
    desc: 'Untuk akad & resepsi terpisah, atau mengundang dari dua keluarga berbeda.',
    features: [
      '2 Undangan Digital Premium',
      'Semua fitur Premium',
      '2 Dashboard Tamu Terpisah',
      'WhatsApp Blast 2 Acara',
      'Aktif Selamanya',
      'Prioritas Dukungan',
    ],
    cta: 'Pilih Duo',
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section className="pricing-section" id="harga">
      <div className="section-header section-header-center">
        <div className="section-label">Harga</div>
        <h2 className="section-title">
          Investasi Sekali,
          <br />
          <em>Kenangan Selamanya</em>
        </h2>
        <p className="section-sub">
          Pilih paket yang sesuai kebutuhan. Bayar sekali, undangan aktif tanpa batas.
        </p>
      </div>

      <FadeUp className="pricing-grid">
        {plans.map((p) => (
          <div className={`pricing-card${p.featured ? 'featured' : ''}`} key={p.tier}>
            {p.badge && <div className="pricing-featured-badge">{p.badge}</div>}
            <div className="pricing-tier">{p.tier}</div>
            <div className="pricing-price">
              {p.currency && <span className="price-currency">{p.currency}</span>}
              <span className="price-amount">{p.amount}</span>
            </div>
            <div style={{ marginBottom: 28 }}>
              <span className="price-period">{p.period}</span>
            </div>
            <p className="pricing-desc">{p.desc}</p>
            <div className="pricing-divider" />
            <ul className="pricing-features">
              {p.features.map((f) => (
                <li key={f}>
                  <span className="check">✦</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/daftar" className="pricing-card-btn">
              {p.cta}
            </Link>
          </div>
        ))}
      </FadeUp>
    </section>
  );
}
