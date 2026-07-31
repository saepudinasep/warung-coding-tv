import Link from 'next/link';

const stats = [
  { num: '12K+', label: 'Pasangan Bahagia' },
  { num: '50+', label: 'Desain Premium' },
  { num: '500K+', label: 'Tamu Diundang' },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg-pattern" />
      <div className="hero-ornament" />

      <div className="hero-content">
        <p className="hero-eyebrow">Undangan Digital Premium</p>
        <h1>
          Ceritakan Cinta
          <br />
          dengan <em>Elegan</em>
          <br />& Berkesan
        </h1>
        <p className="hero-sub">
          Undangan pernikahan digital yang indah, personal, dan mudah dibagikan. Pilih dari 50+
          desain eksklusif, kirim ke tamu via WhatsApp, dan pantau RSVP secara real-time.
        </p>
        <div className="hero-actions">
          <Link href="/daftar" className="btn-gold">
            Buat Undangan Sekarang ›
          </Link>
          <a href="#tema" className="btn-outline-ivory">
            Lihat Demo Tema
          </a>
        </div>
        <div className="hero-stats">
          {stats.map((s) => (
            <div key={s.label}>
              <span className="hero-stat-num">{s.num}</span>
              <span className="hero-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="envelope-wrap">
          <div className="card-peek">
            <div className="card-peek-inner">
              <div className="card-peek-flowers">🌸</div>
              <div className="card-peek-ornament" />
              <div className="card-peek-name">
                <em
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    fontSize: 15,
                    color: '#0D1B2A',
                  }}
                >
                  Rizky &amp; Salsabila
                </em>
              </div>
              <div className="card-peek-date">Sabtu, 14 Februari 2026</div>
              <div className="card-peek-ornament" />
              <p
                style={{
                  fontSize: 9,
                  color: '#9C8A7A',
                  textAlign: 'center',
                  letterSpacing: '0.08em',
                }}
              >
                Mengundang kehadiran Anda
              </p>
            </div>
          </div>
          <div className="envelope">
            <div className="envelope-flap" />
            <div className="env-bottom-left" />
            <div className="env-bottom-right" />
            <div className="envelope-body" />
            <div className="env-seal">W</div>
          </div>
        </div>
      </div>
    </section>
  );
}
