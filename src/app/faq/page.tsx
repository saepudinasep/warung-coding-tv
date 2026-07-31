import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Pertanyaan yang sering diajukan seputar undangan digital Warung Coding TV — legalitas, masa aktif paket, WhatsApp blast, keamanan data, dan lainnya.',
};

const faqs = [
  {
    q: 'Apakah undangan digital ini legal dan bisa dipakai untuk acara resmi?',
    a: 'Ya. Undangan digital semakin umum digunakan di Indonesia, baik untuk acara akad, resepsi, maupun sekadar informasi acara ke kerabat. Anda tetap bebas mencetak undangan fisik terpisah jika diperlukan untuk keperluan adat tertentu.',
  },
  {
    q: 'Berapa lama undangan saya aktif setelah dibuat?',
    a: 'Paket Gratis aktif selama 14 hari. Paket Premium dan Duo aktif selamanya — Anda bisa mengakses dan membagikan undangan kapan pun setelah pembayaran berhasil.',
  },
  {
    q: 'Bagaimana cara mengirim undangan ke tamu lewat WhatsApp?',
    a: 'Setelah undangan Anda aktif, tambahkan daftar tamu (nama dan nomor WhatsApp) di dashboard CRM. Sistem akan otomatis membuat link personal untuk setiap tamu dan mengirimkannya lewat fitur WhatsApp Blast.',
  },
  {
    q: 'Apakah saya bisa mengganti tema setelah undangan dibuat?',
    a: 'Bisa. Anda dapat mengganti tema kapan saja dari dashboard selama undangan masih aktif, tanpa kehilangan data tamu maupun RSVP yang sudah masuk.',
  },
  {
    q: 'Apakah data tamu dan RSVP saya aman?',
    a: 'Data disimpan di database terenkripsi dan hanya dapat diakses oleh akun Anda. Kami tidak membagikan data tamu Anda ke pihak ketiga mana pun. Selengkapnya bisa dibaca di Kebijakan Privasi kami.',
  },
  {
    q: 'Bagaimana jika saya butuh dua undangan terpisah, misalnya akad dan resepsi?',
    a: 'Gunakan Paket Duo — Anda mendapat 2 undangan digital premium dalam satu akun, masing-masing dengan dashboard tamu dan WhatsApp blast terpisah.',
  },
  {
    q: 'Apakah ada biaya tambahan setelah membeli paket?',
    a: 'Tidak ada. Harga yang tertera adalah pembayaran satu kali (kecuali paket Gratis yang memang tanpa biaya) tanpa biaya berlangganan bulanan.',
  },
];

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="static-page">
        <div className="static-page-inner">
          <h1>Pertanyaan yang Sering Diajukan</h1>
          <p className="updated-at">Terakhir diperbarui: Juli 2026</p>

          {faqs.map((f) => (
            <div className="faq-item" key={f.q}>
              <h2>{f.q}</h2>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
