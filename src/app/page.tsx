import Hero from "@/components/Hero";
import Features from "@/components/Features"
import HowFixMateWorks from "@/components/HowFixMateWorks";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import { SubHero } from "@/components/SubHero";
import { GlobeDemo } from "@/components/GlobeDemo";

export default function Home() {
  return (
    <div className="">
     <Hero/>
     <Features/>
     <SubHero/>
     <HowFixMateWorks/>
     <GlobeDemo/>
     <GetStarted/>
     <Footer/>
    </div>
  );
}

