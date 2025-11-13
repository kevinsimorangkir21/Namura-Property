"use client";

import { useEffect, useState } from "react";
import RecomID from "@/components/ui/id/Rekomendasi";
import RecomEN from "@/components/ui/en/Recommendation";

export default function RecommendationWrapper() {
  const [lang, setLang] = useState("id");

  useEffect(() => {
    const saved = localStorage.getItem("lang") || "id";
    setLang(saved);

    const update = () => setLang(localStorage.getItem("lang") || "id");
    window.addEventListener("languageChange", update);
    return () => window.removeEventListener("languageChange", update);
  }, []);

  return lang === "en" ? <RecomEN /> : <RecomID />;
}
