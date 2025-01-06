import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './features/FeaturesSection';
import UseCasesSection from './use-cases/UseCasesSection';
import { GetStartedSection } from './GetStartedSection';
import CtaSection from './CtaSection';
import Footer from './Footer';  // Changed to default import

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <UseCasesSection />
      <GetStartedSection />
      <CtaSection />
      <Footer />
    </div>
  );
}