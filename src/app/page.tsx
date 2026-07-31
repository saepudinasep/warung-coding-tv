import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyUs from '@/components/WhyUs';
import HowItWorks from '@/components/HowItWorks';
import ThemeGallery from '@/components/ThemeGallery';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <ThemeGallery />
        <HowItWorks />
        {/* Section berikutnya (Fitur detail, Harga, dst) menyusul di task selanjutnya */}
      </main>
    </>
  );
}
