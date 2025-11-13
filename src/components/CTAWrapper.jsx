"use client";

import { useEffect, useState } from "react";
import CTAID from "@/components/ui/id/CTA";
import CTAEN from "@/components/ui/en/CTA";

export default function CTAWrapper() {
  const [lang, setLang] = useState("id");

  useEffect(() => {
    const saved = localStorage.getItem("lang") || "id";
    setLang(saved);

    const update = () => setLang(localStorage.getItem("lang") || "id");
    window.addEventListener("languageChange", update);
    return () => window.removeEventListener("languageChange", update);
  }, []);

  return lang === "en" ? <CTAEN /> : <CTAID />;
}
