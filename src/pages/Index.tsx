import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ResumeSection from '@/components/ResumeSection';
import CertificatesSection from '@/components/CertificatesSection';
import ProfinderSection from '@/components/ProfinderSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import MatrixRain from '@/components/MatrixRain';
import LoadingScreen from '@/components/LoadingScreen';

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Matrix rain background */}
      <MatrixRain />
      {/* Scanline effect overlay */}
      <div className="scanline" />
      
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ResumeSection />
        <CertificatesSection />
        <ProfinderSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
