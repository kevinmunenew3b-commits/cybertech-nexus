import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ProfinderSection from '@/components/ProfinderSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import MatrixRain from '@/components/MatrixRain';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Matrix rain background */}
      <MatrixRain />
      {/* Scanline effect overlay */}
      <div className="scanline" />
      
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProfinderSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
