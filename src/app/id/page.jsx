"use client";

import Navbar from "@/components/ui/id/NavbarID";
import Hero from "@/components/ui/id/HeroID";
import Rekomendasi from "@/components/ui/id/Rekomendasi";
import Berita from "@/components/ui/id/Berita";
import Langkah from "@/components/ui/id/Langkah";
import CTA from "@/components/ui/id/CTA";

export default function HomeID() {
  return (
    <div className="bg-[#0b0f15] text-white">
      <Hero />
      <Rekomendasi />
      <Berita />
      <Langkah />
      <CTA />
    </div>
  );
}
