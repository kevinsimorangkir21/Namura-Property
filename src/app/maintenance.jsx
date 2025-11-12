"use client";
import { motion } from "framer-motion";
import { Wrench, Clock, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MaintenancePage() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("id");

  // 🌙 deteksi mode
  useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  // 🌐 deteksi bahasa
  useEffect(() => {
    const loadLang = () => setLang(localStorage.getItem("lang") || "id");
    loadLang();
    window.addEventListener("languageChange", loadLang);
    return () => window.removeEventListener("languageChange", loadLang);
  }, []);

  return (
    <main
      className={`relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-white text-gray-800"
      }`}
    >
      {/* ambient glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isDark ? 0.15 : 0.1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute top-1/3 -left-32 w-96 h-96 bg-[#00ccb0] rounded-full blur-[160px]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isDark ? 0.12 : 0.08, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#00ccb0] rounded-full blur-[120px]"
      />

      {/* ikon wrench */}
      <motion.div
        initial={{ rotate: 0, scale: 0.9 }}
        animate={{ rotate: [0, -15, 15, 0], scale: [0.9, 1.05, 0.9] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="mb-6 drop-shadow-[0_0_18px_rgba(0,204,176,0.4)]"
      >
        <Wrench className="w-20 h-20 text-[#00ccb0]" />
      </motion.div>

      {/* judul */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-3"
      >
        {lang === "id" ? "Sedang Dalam Pemeliharaan" : "Under Maintenance"}
      </motion.h1>

      {/* deskripsi */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className={`max-w-md mx-auto text-sm md:text-base mb-6 leading-relaxed ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {lang === "id"
          ? "Kami sedang meningkatkan sistem agar pengalaman Anda lebih baik. Mohon tunggu sebentar."
          : "We’re upgrading our systems to serve you better. Please check back shortly."}
      </motion.p>

      {/* status */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className={`inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl border backdrop-blur-xl ${
          isDark
            ? "border-white/10 bg-white/5 text-gray-400"
            : "border-gray-200 bg-gray-50 text-gray-600"
        }`}
      >
        <Clock className="w-4 h-4 text-[#00ccb0]" />
        {lang === "id"
          ? "Estimasi selesai: segera"
          : "Estimated completion: soon"}
      </motion.div>

      {/* tombol */}
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00ccb0] text-black font-semibold hover:opacity-90 transition"
        >
          <RefreshCw className="w-4 h-4" />
          {lang === "id" ? "Muat Ulang" : "Reload"}
        </button>

        <Link
          href="/"
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border font-semibold transition ${
            isDark
              ? "border-[#00ccb0] text-[#00ccb0] hover:bg-white/5"
              : "border-[#00a48f] text-[#00a48f] hover:bg-[#00ccb0]/10"
          }`}
        >
          <Home className="w-4 h-4" />
          {lang === "id" ? "Kembali ke Beranda" : "Back to Home"}
        </Link>
      </div>

      {/* catatan kecil */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-10 text-xs text-gray-500"
      >
        {lang === "id"
          ? "© 2025 Namura Property. Semua hak cipta dilindungi."
          : "© 2025 Namura Property. All rights reserved."}
      </motion.p>
    </main>
  );
}
