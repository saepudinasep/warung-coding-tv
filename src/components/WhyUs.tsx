import FadeUp from './FadeUp';

const reasons = [
  {
    icon: '✦',
    title: 'Desain Eksklusif & Premium',
    desc: '50+ tema pilihan dari minimalis modern, florals elegan, hingga motif adat Nusantara. Setiap tema dikurasi oleh desainer profesional.',
  },
  {
    icon: '⚡',
    title: 'Siap Kirim dalam 5 Menit',
    desc: 'Isi data, pilih tema, sesuaikan teks — undangan Anda langsung aktif dan bisa dibagikan via link personal ke semua tamu.',
  },
  {
    icon: '💬',
    title: 'WhatsApp Blast Cerdas',
    desc: 'Kirim undangan personal ke setiap tamu dengan nama yang tersebut langsung. Daftar kontak mudah dikelola lewat dashboard CRM kami.',
  },
  {
    icon: '📊',
    title: 'RSVP & Konfirmasi Real-Time',
    desc: 'Pantau siapa yang hadir, berapa yang belum konfirmasi, dan lacak tamu undangan Anda dari dashboard yang intuitif.',
  },
  {
    icon: '🎵',
    title: 'Musik & Galeri Foto',
    desc: 'Tambahkan musik latar romantis dan galeri foto prewedding terbaik Anda langsung di halaman undangan digital.',
  },
  {
    icon: '♾️',
    title: 'Aktif Selamanya',
    desc: 'Bayar sekali, aktif tanpa batas waktu. Undangan Anda tetap bisa diakses oleh tamu kapan pun mereka ingin mengenang momen.',
  },
];

export default function WhyUs() {
  return (
    <section className="why-section" id="fitur">
      <div className="section-header">
        <div className="section-label">Kenapa Warung Coding TV</div>
        <h2 className="section-title">
          Dibuat untuk Momen
          <br />
          yang <em>Tak Terlupakan</em>
        </h2>
        <p className="section-sub">
          Setiap detail dirancang untuk mencerminkan keindahan hari istimewa Anda.
        </p>
      </div>

      <FadeUp className="why-grid">
        {reasons.map((r) => (
          <div className="why-card" key={r.title}>
            <div className="why-card-icon">{r.icon}</div>
            <h3>{r.title}</h3>
            <p>{r.desc}</p>
            <div className="why-card-accent" />
          </div>
        ))}
      </FadeUp>
    </section>
  );
}
