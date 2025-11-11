"use client";

import Hero from "@/components/Hero";
import Impact from "@/components/Impact";
import Recomendation from "@/components/Recomendation";
import News from "@/components/News";
import Steps from "@/components/Steps";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-[#0b0f15] text-white">
      <Hero />           {/* big */}
      <Recomendation />  {/* py-20 */}
      <News />           {/* py-20 */}
      <Steps />          {/* py-20 */}
      <CTA />            {/* py-20 */}
    </div>
  );
}
