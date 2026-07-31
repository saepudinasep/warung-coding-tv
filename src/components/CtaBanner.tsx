import Link from 'next/link';

export default function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="section-label">Mulai Sekarang</div>
      <h2>
        Wujudkan Undangan
        <br />
        <em>Impian Anda Hari Ini</em>
      </h2>
      <p>
        Bergabung bersama 12.000+ pasangan yang telah mempercayakan undangan digital mereka kepada
        Warung Coding TV.
      </p>
      <div className="cta-actions">
        <Link href="/login" className="btn-gold">
          Buat Undangan Gratis ›
        </Link>
        <a href="#tema" className="btn-outline-ivory">
          Lihat Demo Tema
        </a>
      </div>
    </section>
  );
}
