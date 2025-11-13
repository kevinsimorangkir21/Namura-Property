"use client";

import Hero from "@/components/ui/en/HeroEN";
import Recommendation from "@/components/ui/en/Recommendation";
import News from "@/components/ui/en/News";
import Steps from "@/components/ui/en/Steps";
import CTA from "@/components/ui/en/CTA";
import FooterWrapper from "@/components/FooterWrapper";

export default function HomeEN() {
  return (
    <div className="bg-[#0b0f15] text-white">
      <Hero />
      <Recommendation />
      <News />
      <Steps />
      <CTA />
    </div>
  );
}
