"use client";

import { useEffect, useState } from "react";
import StepsID from "@/components/ui/id/Langkah";
import StepsEN from "@/components/ui/en/Steps";

export default function StepsWrapper() {
  const [lang, setLang] = useState("id");

  useEffect(() => {
    const saved = localStorage.getItem("lang") || "id";
    setLang(saved);

    const update = () => setLang(localStorage.getItem("lang") || "id");
    window.addEventListener("languageChange", update);
    return () => window.removeEventListener("languageChange", update);
  }, []);

  return lang === "en" ? <StepsEN /> : <StepsID />;
}
