import FadeUp from './FadeUp';

const steps = [
  {
    icon: '📝',
    title: 'Daftar & Isi Data Acara',
    desc: 'Buat akun gratis, masukkan nama pengantin, tanggal, dan venue pernikahan Anda.',
  },
  {
    icon: '🎨',
    title: 'Pilih & Kustomisasi Tema',
    desc: 'Pilih dari 50+ tema premium. Sesuaikan warna, foto, dan musik sesuai selera.',
  },
  {
    icon: '📋',
    title: 'Tambah Daftar Tamu',
    desc: 'Import kontak atau tambah manual. Atur nama & nomor WhatsApp untuk blast personal.',
  },
  {
    icon: '📤',
    title: 'Kirim & Pantau RSVP',
    desc: 'Blast ke semua tamu via WhatsApp dan pantau konfirmasi kehadiran secara real-time.',
  },
];

export default function HowItWorks() {
  return (
    <section className="how-section" id="cara-kerja">
      <div className="section-header section-header-center">
        <div className="section-label">Cara Kerja</div>
        <h2 className="section-title">
          Undangan Siap dalam
          <br />
          <em>4 Langkah Mudah</em>
        </h2>
      </div>

      <FadeUp className="how-steps">
        {steps.map((s, i) => (
          <div className="how-step" key={s.title}>
            <div className="how-step-num">{i + 1}</div>
            <div className="how-step-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </FadeUp>
    </section>
  );
}
