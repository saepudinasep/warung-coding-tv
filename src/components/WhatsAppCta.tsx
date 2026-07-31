import Link from 'next/link';

export default function WhatsAppCta() {
  return (
    <div className="wa-cta-section">
      <div className="wa-cta-content">
        <div className="section-label">WhatsApp Blast CRM</div>
        <h2 className="section-title">
          Kirim ke Ratusan Tamu,
          <br />
          <em>Semudah Satu Klik</em>
        </h2>
        <p>
          Cukup upload daftar tamu di dashboard CRM, dan Warung Coding TV akan mengirimkan link
          undangan personal ke setiap nomor WhatsApp secara otomatis — lengkap dengan nama tamu di
          setiap pesan.
        </p>
        <Link href="/daftar" className="btn-primary">
          Coba WhatsApp Blast ›
        </Link>
      </div>

      <div className="wa-mockup" aria-hidden="true">
        <div className="wa-header">
          <div className="wa-avatar">📱</div>
          <div className="wa-header-info">
            <div className="wa-header-name">WhatsApp Blast Warung Coding TV</div>
            <div className="wa-header-status">● Terkirim ke 248 tamu</div>
          </div>
        </div>
        <div className="wa-bubble">
          <div className="wa-bubble-name">Untuk: Ibu Ratna Dewi 💌</div>
          Assalamu&rsquo;alaikum Ibu Ratna, dengan penuh sukacita kami mengundang Ibu untuk hadir di
          pernikahan kami 🌸 Detail acara &amp; RSVP: wct.id/rizky-salsa
          <div className="wa-bubble-time">10:24 ✓✓</div>
        </div>
        <div className="wa-count">
          <strong>248/250</strong>
          tamu sudah menerima undangan
        </div>
      </div>
    </div>
  );
}
