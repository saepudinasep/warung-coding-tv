import FadeUp from './FadeUp';

const features = [
  {
    icon: '🔗',
    title: 'Link & QR Code Unik',
    desc: 'Setiap tamu mendapat link dan QR Code personal dengan namanya tersebut di undangan.',
  },
  {
    icon: '📊',
    title: 'Dashboard CRM Tamu',
    desc: 'Kelola seluruh daftar tamu, status RSVP, dan blast WhatsApp dari satu dashboard intuitif.',
  },
  {
    icon: '💬',
    title: 'WhatsApp Blast Massal',
    desc: 'Kirim undangan ke ratusan tamu sekaligus dengan pesan personal otomatis.',
  },
  {
    icon: '🎵',
    title: 'Musik Latar',
    desc: 'Upload lagu favorit atau pilih dari koleksi musik kami untuk mengiringi undangan digital Anda.',
  },
  {
    icon: '📸',
    title: 'Galeri Foto & Video',
    desc: 'Tampilkan foto prewedding dan video kenangan tak terbatas langsung di undangan.',
  },
  {
    icon: '🗺️',
    title: 'Peta Interaktif',
    desc: 'Integrasi Google Maps agar tamu mudah menemukan lokasi akad dan resepsi Anda.',
  },
  {
    icon: '🎁',
    title: 'Kirim Kado Digital',
    desc: 'Terima transfer cashless atau hadiah dari tamu langsung melalui halaman undangan.',
  },
  {
    icon: '💝',
    title: 'Ucapan & Doa Tamu',
    desc: 'Buku tamu digital yang menyimpan semua ucapan dan doa dari orang-orang terkasih.',
  },
  {
    icon: '📺',
    title: 'Link Live Streaming',
    desc: 'Sertakan link live streaming agar tamu yang jauh tetap bisa menyaksikan pernikahan Anda.',
  },
];

export default function FeatureList() {
  return (
    <section className="features-section">
      <div className="section-header section-header-center">
        <div className="section-label">Fitur Lengkap</div>
        <h2 className="section-title">
          Semua yang Anda Butuhkan
          <br />
          <em>dalam Satu Platform</em>
        </h2>
      </div>

      <FadeUp className="features-grid">
        {features.map((f) => (
          <div className="feature-item" key={f.title}>
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-content">
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </FadeUp>
    </section>
  );
}
