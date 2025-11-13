"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ShieldCheck, BookText } from "lucide-react";

export default function DisclaimerPage() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("id");

  // 🌙 Deteksi Mode Gelap
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  // 🌐 Deteksi Bahasa
  useEffect(() => {
    const loadLang = () => setLang(localStorage.getItem("lang") || "id");
    loadLang();
    window.addEventListener("languageChange", loadLang);
    return () => window.removeEventListener("languageChange", loadLang);
  }, []);

  return (
    <main
      className={`min-h-screen pt-28 md:pt-32 pb-28 transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-white text-[#1f2937]"
      } relative overflow-hidden`}
    >
      {/* ✨ Background Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isDark ? 0.12 : 0.08 }}
        transition={{ duration: 1.5 }}
        className="absolute top-32 left-0 w-96 h-96 bg-[#00ccb0] rounded-full blur-[140px]"
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
            initial={{ y: 0 }}
            animate={{ y: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="mb-4 text-[#00ccb0]"
          >
            <AlertTriangle className="w-14 h-14 drop-shadow-[0_0_20px_rgba(0,204,176,0.5)]" />
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
            {lang === "id" ? "Pernyataan Penyangkalan" : "Disclaimer"}
          </motion.h1>

          <p
            className={`max-w-2xl text-sm md:text-base leading-relaxed ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {lang === "id"
              ? "Kami berkomitmen untuk menyajikan informasi yang akurat, namun Namura Property tidak bertanggung jawab atas kesalahan atau ketidakakuratan informasi yang berasal dari pihak ketiga."
              : "We strive to provide accurate information, but Namura Property is not responsible for errors or inaccuracies in third-party data."}
          </p>
        </div>

        {/* 📑 Konten */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`rounded-3xl border backdrop-blur-xl p-8 md:p-10 max-w-4xl mx-auto ${
            isDark
              ? "border-white/10 bg-white/5 hover:bg-white/7"
              : "border-gray-200 bg-gray-50 hover:bg-gray-100"
          } transition-all`}
        >
          <section className="space-y-8 leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                {lang === "id" ? "1. Informasi Properti" : "1. Property Information"}
              </h2>
              <p
                className={`${
                  isDark ? "text-gray-300" : "text-gray-700"
                } text-sm md:text-base`}
              >
                {lang === "id"
                  ? "Data dan foto properti di situs ini disediakan oleh pemilik, agen, atau mitra pihak ketiga. Namura Property tidak menjamin akurasi, kelengkapan, atau keaslian data tersebut."
                  : "Property data and images on this site are provided by owners, agents, or third-party partners. Namura Property does not guarantee the accuracy, completeness, or authenticity of such information."}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                {lang === "id" ? "2. Tanggung Jawab Pengguna" : "2. User Responsibility"}
              </h2>
              <p
                className={`${
                  isDark ? "text-gray-300" : "text-gray-700"
                } text-sm md:text-base`}
              >
                {lang === "id"
                  ? "Pengguna diharapkan melakukan verifikasi langsung terhadap semua informasi sebelum melakukan keputusan transaksi, kunjungan, atau pembayaran terkait properti."
                  : "Users are encouraged to verify all information directly before making any property-related transaction, visit, or payment decisions."}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                {lang === "id" ? "3. Batasan Tanggung Jawab" : "3. Limitation of Liability"}
              </h2>
              <p
                className={`${
                  isDark ? "text-gray-300" : "text-gray-700"
                } text-sm md:text-base`}
              >
                {lang === "id"
                  ? "Namura Property tidak bertanggung jawab atas kerugian atau kerusakan yang timbul akibat penggunaan informasi di situs ini, baik secara langsung maupun tidak langsung."
                  : "Namura Property shall not be held liable for any loss or damage resulting from the use of information on this website, directly or indirectly."}
              </p>
            </div>
          </section>
        </motion.div>

        {/* 🔗 Footer Navigasi */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 flex flex-wrap gap-3 justify-center text-sm"
        >
          <Link
            href="/terms"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border font-medium transition ${
              isDark
                ? "border-[#00ccb0]/40 text-[#00ccb0] hover:bg-white/5"
                : "border-[#00ccb0]/50 text-[#00a48f] hover:bg-[#00ccb0]/10"
            }`}
          >
            <BookText className="w-4 h-4" />
            {lang === "id" ? "Syarat & Ketentuan" : "Terms & Conditions"}
          </Link>

          <Link
            href="/privacy"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border font-medium transition ${
              isDark
                ? "border-[#00ccb0]/40 text-[#00ccb0] hover:bg-white/5"
                : "border-[#00ccb0]/50 text-[#00a48f] hover:bg-[#00ccb0]/10"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            {lang === "id" ? "Kebijakan Privasi" : "Privacy Policy"}
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
