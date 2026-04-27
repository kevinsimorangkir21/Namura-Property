"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { RefreshCcw, Home } from "lucide-react";
import { useEffect, useState } from "react";

export default function ErrorPage() {
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
        className="text-[6rem] font-black text-red-500"
      >
        500
      </motion.h1>
      <h2 className="text-xl font-semibold mb-3">
        {lang === "id" ? "Terjadi Kesalahan Sistem" : "Internal Server Error"}
      </h2>
      <p className={`max-w-md mb-8 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        {lang === "id"
          ? "Kami sedang memperbaikinya. Silakan coba beberapa saat lagi."
          : "We’re fixing the issue. Please try again later."}
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00ccb0] text-black font-semibold hover:opacity-90"
        >
          <RefreshCcw className="w-4 h-4" /> {lang === "id" ? "Muat Ulang" : "Reload"}
        </button>
        <Link
          href="/"
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border font-semibold transition ${
            isDark
              ? "border-[#00ccb0] text-[#00ccb0] hover:bg-white/5"
              : "border-[#00a48f] text-[#00a48f] hover:bg-[#00ccb0]/10"
          }`}
        >
          <Home className="w-4 h-4" /> {lang === "id" ? "Beranda" : "Home"}
        </Link>
      </div>
    </main>
  );
}
