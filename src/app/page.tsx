import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyUs from '@/components/WhyUs';
import HowItWorks from '@/components/HowItWorks';
import ThemeGallery from '@/components/ThemeGallery';
import FeatureList from '@/components/FeatureList';
import WhatsAppCta from '@/components/WhatsAppCta';
import Pricing from '@/components/Pricing';

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
        <WhatsAppCta />
        <Pricing />
        {/* Section berikutnya (testimoni, footer) menyusul di task selanjutnya */}
      </main>
    </>
  );
}
