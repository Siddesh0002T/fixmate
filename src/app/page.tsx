import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features"
import HowFixMateWorks from "@/components/HowFixMateWorks";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import { image } from "framer-motion/client";
import { SubHero } from "@/components/SubHero";

export default function Home() {
  return (
    <div className="">
  
      <Navbar/>
     <Hero/>
     <Features/>
     <SubHero/>
     <HowFixMateWorks/>
     <GetStarted/>
     <Footer/>
    </div>
  );
}

