import FadeUp from './FadeUp';

// Data dummy — nanti bisa diganti model Testimonial di database kalau perlu dikelola dari CRM
const testimonials = [
  {
    initials: 'AS',
    name: 'Anisa & Syahril',
    city: 'Jakarta — Menikah Maret 2025',
    text: 'Undangannya cantik banget, semua tamu bilang suka. Yang bikin surprised, nama mereka muncul langsung di undangan. Berasa sangat personal!',
  },
  {
    initials: 'RP',
    name: 'Rizal & Putri',
    city: 'Surabaya — Menikah Januari 2025',
    text: 'Fitur WhatsApp blast-nya luar biasa efisien. Dari 312 tamu, semuanya terkirim dalam hitungan menit. Tidak ada yang terlewat sama sekali.',
  },
  {
    initials: 'DN',
    name: 'Dewi & Naufal',
    city: 'Bandung — Menikah November 2024',
    text: 'Dashboard RSVP-nya membantu banget untuk koordinasi dengan catering. Tahu persis berapa yang hadir jauh-jauh hari sebelum acara.',
  },
];

export default function Testimonials() {
  return (
    <section className="testi-section">
      <div className="section-header section-header-center">
        <div className="section-label">Testimoni</div>
        <h2 className="section-title">
          Kata Mereka yang
          <br />
          <em>Sudah Merasakan</em>
        </h2>
      </div>

      <FadeUp className="testi-grid">
        {testimonials.map((t) => (
          <div className="testi-card" key={t.name}>
            <div className="testi-stars">★★★★★</div>
            <p className="testi-text">&ldquo;{t.text}&rdquo;</p>
            <div className="testi-author">
              <div className="testi-avatar">{t.initials}</div>
              <div>
                <div className="testi-name">{t.name}</div>
                <div className="testi-city">{t.city}</div>
              </div>
            </div>
          </div>
        ))}
      </FadeUp>
    </section>
  );
}
