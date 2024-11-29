import Navbar from "@/components/Navbar";
import Features from "@/components/Features"
import HowFixMateWorks from "@/components/HowFixMateWorks";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import { SubHero } from "@/components/SubHero";
import { GlobeDemo } from "@/components/GlobeDemo";
import Services from "@/components/Services";
import AboutFixMate from "@/components/AboutFixMate";
import Contact from "@/components/Contact";

export default function About() {
  return (
    <div className="">
      <Navbar/>
<br />
<br />

<Contact/>
<Services/>
<AboutFixMate/>
     <Features/>
     <SubHero/>
     <HowFixMateWorks/>
     <GlobeDemo/>
     <GetStarted/>
     <Footer/>
    </div>
  );
}

