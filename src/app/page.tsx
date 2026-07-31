import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyUs from '@/components/WhyUs';
import HowItWorks from '@/components/HowItWorks';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <HowItWorks />
        {/* Section berikutnya (Tema, Fitur detail, Harga, dst) menyusul di task selanjutnya */}
      </main>
    </>
  );
}
