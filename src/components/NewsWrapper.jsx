"use client";

import { useEffect, useState } from "react";
import NewsID from "@/components/ui/id/Berita";
import NewsEN from "@/components/ui/en/News";

export default function NewsWrapper() {
  const [lang, setLang] = useState("id");

  useEffect(() => {
    const saved = localStorage.getItem("lang") || "id";
    setLang(saved);

    const update = () => setLang(localStorage.getItem("lang") || "id");
    window.addEventListener("languageChange", update);
    return () => window.removeEventListener("languageChange", update);
  }, []);

  return lang === "en" ? <NewsEN /> : <NewsID />;
}
