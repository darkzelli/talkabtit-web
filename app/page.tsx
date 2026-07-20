import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Premium from "@/components/Premium";
import HowItWorks from "@/components/HowItWorks";
import Closing from "@/components/Closing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="glow" />
      <Nav />
      <Hero />
      <Features />
      <Premium />
      <HowItWorks />
      <Closing />
      <Footer />
    </>
  );
}
