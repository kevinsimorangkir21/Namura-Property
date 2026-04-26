'use client'

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BookText, FileText, ShieldCheck, ScrollText } from "lucide-react";

export default function TermsClient() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("id");

  // 🌙 Dark mode detection
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  // 🌐 Language detection
  useEffect(() => {
    const loadLang = () => setLang(localStorage.getItem("lang") || "id");
    loadLang();
    window.addEventListener("languageChange", loadLang);
    return () => window.removeEventListener("languageChange", loadLang);
  }, []);

  return (
    <main
      className={`min-h-screen pt-28 md:pt-32 pb-28 relative overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-white text-[#1f2937]"
      }`}
    >
      {/* ✨ Background Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isDark ? 0.12 : 0.08 }}
        transition={{ duration: 1.5 }}
        className="absolute top-24 left-0 w-96 h-96 bg-[#00ccb0] rounded-full blur-[140px]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isDark ? 0.10 : 0.06 }}
        transition={{ duration: 1.8 }}
        className="absolute bottom-0 right-0 w-[480px] h-[480px] bg-[#00ccb0] rounded-full blur-[160px]"
      />

      {/* 🧭 Header */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="mb-4 text-[#00ccb0]"
          >
            <ScrollText className="w-14 h-14 drop-shadow-[0_0_20px_rgba(0,204,176,0.5)]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-4xl md:text-5xl font-black tracking-tight mb-4 ${
              isDark
                ? "bg-gradient-to-r from-[#00ccb0] to-[#00e3b5] bg-clip-text text-transparent"
                : "text-[#00a48f]"
            }`}
          >
            {lang === "id" ? "Syarat & Ketentuan" : "Terms & Conditions"}
          </motion.h1>

          <p
            className={`max-w-2xl text-sm md:text-base ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {lang === "id"
              ? "Dengan menggunakan layanan Namura Property, Anda dianggap telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan yang berlaku."
              : "By using Namura Property services, you agree to all terms and conditions."}
          </p>
        </div>

        {/* 📜 Content */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`rounded-3xl border backdrop-blur-xl p-8 md:p-10 max-w-4xl mx-auto ${
            isDark
              ? "border-white/10 bg-white/5"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          <section className="space-y-8">
            <div>
              <h2 className="flex items-center gap-2 font-semibold">
                <BookText className="w-5 h-5 text-[#00ccb0]" />
                {lang === "id" ? "Penggunaan Situs" : "Use of Website"}
              </h2>
              <p className="text-sm">
                {lang === "id"
                  ? "Tidak boleh digunakan untuk aktivitas ilegal."
                  : "Cannot be used for illegal activities."}
              </p>
            </div>

            <div>
              <h2 className="flex items-center gap-2 font-semibold">
                <FileText className="w-5 h-5 text-[#00ccb0]" />
                {lang === "id" ? "Hak Cipta" : "Copyright"}
              </h2>
              <p className="text-sm">
                {lang === "id"
                  ? "Semua konten dilindungi hukum."
                  : "All content is protected by law."}
              </p>
            </div>

            <div>
              <h2 className="flex items-center gap-2 font-semibold">
                <ShieldCheck className="w-5 h-5 text-[#00ccb0]" />
                {lang === "id" ? "Tanggung Jawab" : "Responsibility"}
              </h2>
              <p className="text-sm">
                {lang === "id"
                  ? "Pengguna bertanggung jawab atas akun."
                  : "Users are responsible for their accounts."}
              </p>
            </div>
          </section>
        </motion.div>

        {/* 🔗 Footer */}
        <div className="mt-10 flex justify-center gap-3">
          <Link href="/" className="text-[#00ccb0]">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}