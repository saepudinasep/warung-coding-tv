import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyUs from '@/components/WhyUs';
import HowItWorks from '@/components/HowItWorks';
import ThemeGallery from '@/components/ThemeGallery';
import FeatureList from '@/components/FeatureList';
import WhatsAppCta from '@/components/WhatsAppCta';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';

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
        <Testimonials />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
