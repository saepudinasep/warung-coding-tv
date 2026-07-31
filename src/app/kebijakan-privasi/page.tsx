import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi',
  description:
    'Kebijakan privasi Warung Coding TV — bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda serta data tamu undangan Anda.',
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="static-page">
        <div className="static-page-inner">
          <h1>Kebijakan Privasi</h1>
          <p className="updated-at">Terakhir diperbarui: Juli 2026</p>

          <p>
            Kebijakan ini menjelaskan bagaimana Warung Coding TV mengumpulkan, menggunakan, dan
            melindungi data Anda serta data tamu yang Anda undang.
          </p>

          <h2>1. Data yang Kami Kumpulkan</h2>
          <ul>
            <li>Data akun: nama, email, dan nomor telepon pelanggan</li>
            <li>Data undangan: nama mempelai, tanggal &amp; lokasi acara, foto, video, musik</li>
            <li>Data tamu: nama dan nomor WhatsApp yang Anda masukkan untuk keperluan blast</li>
            <li>Data RSVP dan ucapan yang dikirim tamu melalui halaman undangan</li>
            <li>Data transaksi pembayaran dari penyedia payment gateway</li>
          </ul>

          <h2>2. Penggunaan Data</h2>
          <p>Data yang dikumpulkan digunakan untuk:</p>
          <ul>
            <li>Menampilkan dan mengoperasikan halaman undangan Anda</li>
            <li>Mengirim undangan personal ke tamu melalui WhatsApp Blast</li>
            <li>Memproses pembayaran paket yang Anda pilih</li>
            <li>Memberikan dukungan pelanggan bila dibutuhkan</li>
          </ul>

          <h2>3. Berbagi Data ke Pihak Ketiga</h2>
          <p>
            Kami tidak menjual atau membagikan data pribadi Anda maupun tamu Anda kepada pihak
            ketiga untuk kepentingan pemasaran. Data hanya diteruskan ke penyedia layanan yang
            diperlukan untuk operasional, seperti penyedia payment gateway (untuk pembayaran) dan
            penyedia API WhatsApp (untuk pengiriman blast).
          </p>

          <h2>4. Penyimpanan &amp; Keamanan Data</h2>
          <p>
            Data disimpan pada infrastruktur database terenkripsi. Kami menerapkan langkah-langkah
            keamanan standar industri untuk mencegah akses tidak sah, namun tidak ada sistem yang
            sepenuhnya bebas risiko — Anda disarankan menjaga kerahasiaan kata sandi akun Anda.
          </p>

          <h2>5. Hak Anda atas Data</h2>
          <p>
            Anda berhak meminta salinan, koreksi, atau penghapusan data pribadi Anda dan data tamu
            yang Anda kelola, dengan menghubungi kami melalui kontak WhatsApp yang tersedia di
            footer situs.
          </p>

          <h2>6. Retensi Data</h2>
          <p>
            Data undangan dan tamu disimpan selama akun Anda aktif. Untuk paket Gratis yang telah
            melewati masa aktif 14 hari, data dapat dihapus setelah periode tertentu kecuali Anda
            melakukan upgrade ke paket berbayar.
          </p>

          <h2>7. Perubahan Kebijakan</h2>
          <p>
            Kebijakan privasi ini dapat diperbarui sewaktu-waktu. Perubahan signifikan akan
            diinformasikan melalui halaman ini.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
