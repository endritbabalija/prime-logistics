import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import TrackingSection from '@/components/TrackingSection';
import ContactSection from '@/components/ContactSection';
import ShippingCalculator from '@/components/ShippingCalculator';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <ShippingCalculator />
        <TrackingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
