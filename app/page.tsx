import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Closing from "@/components/Closing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="glow" />
      <Nav />
      <Hero />
      <Services />
      <Features />
      <HowItWorks />
      <Closing />
      <Footer />
    </>
  );
}
