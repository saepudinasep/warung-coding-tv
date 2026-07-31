import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* Section berikutnya (Why Us, Tema, Fitur, Harga, dst) menyusul di task selanjutnya */}
      </main>
    </>
  );
}
