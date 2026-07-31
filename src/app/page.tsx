import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyUs from '@/components/WhyUs';
import HowItWorks from '@/components/HowItWorks';
import ThemeGallery from '@/components/ThemeGallery';
import FeatureList from '@/components/FeatureList';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <ThemeGallery />
        <HowItWorks />
        <FeatureList />
        {/* Section berikutnya (Harga, testimoni, footer) menyusul di task selanjutnya */}
      </main>
    </>
  );
}
