import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan',
  description: 'Syarat dan ketentuan penggunaan layanan undangan digital Warung Coding TV.',
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="static-page">
        <div className="static-page-inner">
          <h1>Syarat &amp; Ketentuan</h1>
          <p className="updated-at">Terakhir diperbarui: Juli 2026</p>

          <p>
            Dengan menggunakan layanan Warung Coding TV, Anda dianggap telah membaca, memahami, dan
            menyetujui seluruh syarat dan ketentuan berikut.
          </p>

          <h2>1. Layanan</h2>
          <p>
            Warung Coding TV menyediakan platform pembuatan undangan pernikahan digital beserta
            fitur pendukung seperti RSVP, WhatsApp blast, galeri foto/video, dan manajemen tamu.
            Layanan tersedia dalam paket Gratis, Premium, dan Duo sebagaimana dijelaskan di halaman
            harga.
          </p>

          <h2>2. Akun Pengguna</h2>
          <p>
            Anda bertanggung jawab menjaga kerahasiaan email dan kata sandi akun Anda. Segala
            aktivitas yang terjadi melalui akun Anda menjadi tanggung jawab Anda sepenuhnya.
          </p>

          <h2>3. Pembayaran</h2>
          <p>
            Paket berbayar (Premium dan Duo) dikenakan biaya satu kali sesuai harga yang berlaku
            saat transaksi dilakukan. Pembayaran yang sudah berhasil tidak dapat dikembalikan
            (non-refundable), kecuali terjadi kegagalan sistem yang menyebabkan layanan tidak dapat
            diakses sama sekali.
          </p>

          <h2>4. Konten Pengguna</h2>
          <p>
            Anda bertanggung jawab penuh atas konten yang diunggah (foto, video, teks, musik) ke
            dalam undangan Anda, termasuk memastikan konten tersebut tidak melanggar hak cipta pihak
            lain atau ketentuan hukum yang berlaku di Indonesia.
          </p>

          <h2>5. Penggunaan yang Dilarang</h2>
          <ul>
            <li>Menggunakan layanan untuk mengirim spam atau konten yang menyesatkan</li>
            <li>Mengunggah konten yang melanggar hukum, SARA, atau kekerasan</li>
            <li>Mencoba mengakses sistem atau data pengguna lain tanpa izin</li>
          </ul>

          <h2>6. Batasan Tanggung Jawab</h2>
          <p>
            Warung Coding TV berupaya menjaga ketersediaan layanan secara maksimal, namun tidak
            bertanggung jawab atas kerugian yang timbul akibat gangguan teknis di luar kendali kami,
            termasuk namun tidak terbatas pada gangguan penyedia layanan pihak ketiga.
          </p>

          <h2>7. Perubahan Ketentuan</h2>
          <p>
            Kami dapat memperbarui syarat dan ketentuan ini sewaktu-waktu. Perubahan akan
            diinformasikan melalui halaman ini dan berlaku efektif sejak tanggal publikasi.
          </p>

          <h2>8. Kontak</h2>
          <p>
            Pertanyaan terkait syarat dan ketentuan ini dapat disampaikan melalui kontak WhatsApp
            yang tersedia di footer situs.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
