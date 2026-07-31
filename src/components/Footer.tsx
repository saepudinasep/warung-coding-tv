import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            Warung Coding TV<span>.</span>
          </Link>
          <p>
            Platform undangan digital pernikahan premium Indonesia. Cantik, personal, dan mudah
            dibagikan untuk hari paling istimewa dalam hidup Anda.
          </p>
        </div>
        <div className="footer-col">
          <h4>Produk</h4>
          <ul>
            <li>
              <a href="#tema">Tema Undangan</a>
            </li>
            <li>
              <a href="#fitur">Fitur Lengkap</a>
            </li>
            <li>
              <a href="#harga">Paket Harga</a>
            </li>
            <li>
              <a href="#cara-kerja">Cara Kerja</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Akun</h4>
          <ul>
            <li>
              <Link href="/masuk">Masuk</Link>
            </li>
            <li>
              <Link href="/daftar">Daftar Gratis</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Bantuan</h4>
          <ul>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
            <li>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                Kontak WhatsApp
              </a>
            </li>
            <li>
              <Link href="/syarat-ketentuan">Syarat &amp; Ketentuan</Link>
            </li>
            <li>
              <Link href="/kebijakan-privasi">Kebijakan Privasi</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">
          © 2026 <span>Warung Coding TV</span>. Semua hak dilindungi. Dibuat dengan ♡ untuk setiap
          pasangan Indonesia.
        </p>
        <div className="footer-social">
          <a href="#" aria-label="Instagram">
            ✦
          </a>
          <a href="#" aria-label="TikTok">
            ▲
          </a>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            ◆
          </a>
        </div>
      </div>
    </footer>
  );
}
