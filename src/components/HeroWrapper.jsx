"use client";

import { useEffect, useState } from "react";
import HeroID from "@/components/ui/id/HeroID";
import HeroEN from "@/components/ui/en/HeroEN";

export default function HeroWrapper() {
  const [lang, setLang] = useState("id");

  useEffect(() => {
    const saved = localStorage.getItem("lang") || "id";
    setLang(saved);

    const update = () => setLang(localStorage.getItem("lang") || "id");
    window.addEventListener("languageChange", update);
    return () => window.removeEventListener("languageChange", update);
  }, []);

  return lang === "en" ? <HeroEN /> : <HeroID />;
}
