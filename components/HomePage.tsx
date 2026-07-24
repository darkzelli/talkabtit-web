import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Premium from "@/components/Premium";
import HowItWorks from "@/components/HowItWorks";
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
        <Premium />
        <HowItWorks />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
