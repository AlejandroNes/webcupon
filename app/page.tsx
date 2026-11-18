import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/navigation/BottomNav";
import { HeroSection } from "@/components/home/HeroSection";
import { PrizesSection } from "@/components/home/PrizesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { PlansSection } from "@/components/home/PlansSection";
import { WinnersSection } from "@/components/home/WinnersSection";
import { FaqSection } from "@/components/home/FaqSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PrizesSection />
        <HowItWorksSection />
        <PlansSection />
        <WinnersSection />
        <FaqSection />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
