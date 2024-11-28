import React from "react";
import ShineBorder from "@/components/ui/shine-border";
import { RainbowButton } from "@/components/ui/rainbow-button";

const Hero = () => {
  return (
  <>
  <br /><br /><br />
    <ShineBorder
         className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
         color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
       >
         <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
         Your Trusted Partner for Home Services
         </span>
         <br /><br />
         <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-2xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
         Connect with skilled professionals for all your home maintenance and repair needs. From plumbing to electrical work, we've got you covered.
         </span>
         <br /><br />
         <RainbowButton>Get Started</RainbowButton>
       </ShineBorder>
  </>
  );
};

export default Hero;
