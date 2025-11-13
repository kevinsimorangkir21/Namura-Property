"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function LanguageToggle({ onChange }) {
  const [lang, setLang] = useState("id");

  // Ambil bahasa tersimpan saat reload
  useEffect(() => {
    const saved = localStorage.getItem("lang") || "id";
    setLang(saved);

    // kirim ke parent
    onChange?.(saved);
  }, []);

  // Toggle bahasa
  const toggleLang = () => {
    const nextLang = lang === "id" ? "en" : "id";

    setLang(nextLang);
    localStorage.setItem("lang", nextLang);

    // Kirim ke parent bila ada
    onChange?.(nextLang);

    // PENTING: Notifikasi ke semua komponen
    window.dispatchEvent(new Event("languageChange"));
  };

  return (
    <motion.button
      onClick={toggleLang}
      whileTap={{ scale: 0.9 }}
      className="relative flex items-center justify-center w-12 h-7 rounded-full border border-black/20 dark:border-white/10 bg-gray-100 dark:bg-white/10 transition-all"
    >
      {/* Slider */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`absolute w-6 h-6 rounded-full bg-white dark:bg-[#00ccb0] shadow-md ${
          lang === "id" ? "left-[2px]" : "right-[2px]"
        }`}
      />

      {/* ID */}
      <span
        className={`absolute left-1 text-[10px] font-semibold ${
          lang === "id" ? "text-black dark:text-white" : "text-gray-400"
        }`}
      >
        ID
      </span>

      {/* EN */}
      <span
        className={`absolute right-1 text-[10px] font-semibold ${
          lang === "en" ? "text-black dark:text-white" : "text-gray-400"
        }`}
      >
        EN
      </span>
    </motion.button>
  );
}
