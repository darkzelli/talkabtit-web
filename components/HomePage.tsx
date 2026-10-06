import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Customize from "@/components/Customize";
import HowItWorks from "@/components/HowItWorks";
import WatchParties from "@/components/WatchParties";
import Tools from "@/components/Tools";
import Closing from "@/components/Closing";
import Footer from "@/components/Footer";

// The full marketing site. Currently parked behind the coming-soon splash — to
// bring it back, render <HomePage /> from app/page.tsx (see the note there).
export default function HomePage() {
  return (
    <>
      <div className="glow" />
      <Nav />
      <main>
        <Hero />
        <Features />
        <WatchParties />
        <Customize />
        <HowItWorks />
        <Tools />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
