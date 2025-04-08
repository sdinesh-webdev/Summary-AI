import HeroSection from "@/components/Home/hero-section";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import DemoSection from "@/components/Home/demo-section";
import HowItWorksSection from "@/components/common/how-it-works-section";
import PricingSection from "@/components/common/pricing-section";
import CTASection from "@/components/common/cta-section";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 w-full h-full">
        <BackgroundGradientAnimation />
      </div>
      <div className="relative z-10">
        <HeroSection />
        <DemoSection />
        <HowItWorksSection />
        <PricingSection />
        <CTASection />
      </div>
    </div>
  );
}
