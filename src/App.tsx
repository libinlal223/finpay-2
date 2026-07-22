import { useEffect, useState } from 'react';
import { useScroll } from 'framer-motion';
import FinPaySettlementsSection from './components/FinPaySettlementsSection';
import FinPayExchangeServicesSection from './components/FinPayExchangeServicesSection';
import FinPayCollectionSettlementSection from './components/FinPayCollectionSettlementSection';
import FinPayMultiCurrencyExchangeSection from './components/FinPayMultiCurrencyExchangeSection';
import FinPayBusinessSolutionsSection from './components/FinPayBusinessSolutionsSection';
import FinPayOperationalSupportSection from './components/FinPayOperationalSupportSection';
import FinPayContactSection from './components/FinPayContactSection';
import GlobalPaymentsMap from './components/GlobalPaymentsMap';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import Subpage from './components/Subpage';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import Navbar from './components/Navbar';
import CryptoMarketSection from './components/CryptoMarketSection';
import ScrollVideoScene from './components/ScrollVideoScene';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#home');

  useEffect(() => {
    const handleHash = () => {
      setCurrentRoute(window.location.hash || '#home');
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const isSubpage = ['#docs', '#security', '#privacy', '#terms', '#support'].includes(currentRoute);

  const { scrollYProgress } = useScroll();



  if (isSubpage) {
    return <Subpage route={currentRoute} />;
  }

  return (
    <div className="bg-[#050505] text-white w-full" style={{ overflowX: 'clip' }}>
      {/* Spotlight Navigation Bar */}
      <Navbar scrollYProgress={scrollYProgress} />

      {/* Sections Wrapper (Home target) */}
      <div id="home" className="w-full relative z-10">
        
        {/* ── Scroll Video Scene: Sections 1–5 as one pinned scroll-driven experience ── */}
        <ScrollVideoScene />

        {/* Section 06: Live Crypto Market Rates */}
        <CryptoMarketSection />

      </div>

      {/* Main Website Flow (Sections 6+) */}
      <div className="relative z-20 w-full bg-black pointer-events-auto">
        {/* About Section Group */}
        <div id="about" className="w-full">
          <FinPaySettlementsSection />
          <WhyChooseUsSection />
        </div>

        {/* Services Section Group */}
        <div id="services" className="w-full">
          <FinPayExchangeServicesSection />
          <FinPayCollectionSettlementSection />
          <FinPayMultiCurrencyExchangeSection />
        </div>

        {/* Solutions Section Group */}
        <div id="solutions" className="w-full">
          <FinPayBusinessSolutionsSection />
          <FinPayOperationalSupportSection />
          <FinPayContactSection />
          <GlobalPaymentsMap />
        </div>

        {/* FAQ Section Group */}
        <div id="faq" className="w-full">
          <FAQSection />
        </div>

        <Footer />
      </div>
    </div>
  );
}
