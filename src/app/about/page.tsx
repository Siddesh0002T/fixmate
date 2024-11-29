import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features"
import HowFixMateWorks from "@/components/HowFixMateWorks";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import { SubHero } from "@/components/SubHero";
import { GlobeDemo } from "@/components/GlobeDemo";

export default function About() {
  return (
    <div className="">
      <Navbar/>
<br />
<br />
<br />
<br></br>
<h1 className="text-blue-500">Fuck You Sahil</h1>
     <Features/>
     <SubHero/>
     <HowFixMateWorks/>
     <GlobeDemo/>
     <GetStarted/>
     <Footer/>
    </div>
  );
}

