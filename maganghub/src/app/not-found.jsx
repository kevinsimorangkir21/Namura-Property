"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFoundPage() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("id");

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const loadLang = () => setLang(localStorage.getItem("lang") || "id");
    loadLang();
    window.addEventListener("languageChange", loadLang);
    return () => window.removeEventListener("languageChange", loadLang);
  }, []);

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center text-center px-6 transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-white text-gray-800"
      }`}
    >
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[6rem] font-black bg-gradient-to-r from-[#00ccb0] to-[#00e3b5] bg-clip-text text-transparent"
      >
        404
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl font-semibold mb-3"
      >
        {lang === "id" ? "Halaman Tidak Ditemukan" : "Page Not Found"}
      </motion.h2>
      <p className={`max-w-md mb-8 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        {lang === "id"
          ? "Halaman yang kamu cari tidak tersedia atau telah dipindahkan."
          : "The page you’re looking for doesn’t exist or may have been moved."}
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00ccb0] text-black font-semibold hover:opacity-90"
        >
          <Home className="w-4 h-4" /> {lang === "id" ? "Kembali ke Beranda" : "Back to Home"}
        </Link>
        <Link
          href="/listing"
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border font-semibold transition ${
            isDark
              ? "border-[#00ccb0] text-[#00ccb0] hover:bg-white/5"
              : "border-[#00a48f] text-[#00a48f] hover:bg-[#00ccb0]/10"
          }`}
        >
          <Search className="w-4 h-4" /> {lang === "id" ? "Cari Properti" : "Find Property"}
        </Link>
      </div>
    </main>
  );
}
