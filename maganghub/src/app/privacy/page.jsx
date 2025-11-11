"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, Lock, FileText, BookText } from "lucide-react";

export default function PrivacyPage() {
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
      className={`min-h-screen pt-28 md:pt-32 pb-28 transition-colors duration-500 relative overflow-hidden ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-white text-[#1f2937]"
      }`}
    >
      {/* ✨ Background Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isDark ? 0.12 : 0.08 }}
        transition={{ duration: 1.5 }}
        className="absolute top-28 left-10 w-96 h-96 bg-[#00ccb0] rounded-full blur-[140px]"
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
            <ShieldCheck className="w-14 h-14 drop-shadow-[0_0_20px_rgba(0,204,176,0.5)]" />
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
            {lang === "id" ? "Kebijakan Privasi" : "Privacy Policy"}
          </motion.h1>

          <p
            className={`max-w-2xl text-sm md:text-base leading-relaxed ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {lang === "id"
              ? "Kami menghargai privasi Anda dan berkomitmen untuk melindungi informasi pribadi Anda sesuai dengan standar keamanan digital yang berlaku."
              : "We value your privacy and are committed to protecting your personal data in accordance with current digital security standards."}
          </p>
        </div>

        {/* 📄 Content Section */}
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
            {/* Data Collected */}
            <div>
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#00ccb0]" />
                {lang === "id" ? "1. Data yang Dikumpulkan" : "1. Data Collected"}
              </h2>
              <p
                className={`${
                  isDark ? "text-gray-300" : "text-gray-700"
                } text-sm md:text-base`}
              >
                {lang === "id"
                  ? "Kami dapat mengumpulkan informasi seperti nama, email, nomor telepon, serta data aktivitas pengguna untuk analisis performa situs dan peningkatan layanan."
                  : "We may collect details such as your name, email, phone number, and user activity data for site performance analysis and service improvement."}
              </p>
            </div>

            {/* Use of Data */}
            <div>
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <BookText className="w-5 h-5 text-[#00ccb0]" />
                {lang === "id" ? "2. Penggunaan Data" : "2. Use of Data"}
              </h2>
              <p
                className={`${
                  isDark ? "text-gray-300" : "text-gray-700"
                } text-sm md:text-base`}
              >
                {lang === "id"
                  ? "Data Anda digunakan untuk personalisasi pengalaman pengguna, komunikasi terkait properti, dan peningkatan fitur platform."
                  : "Your data is used for personalizing user experience, property-related communication, and improving platform features."}
              </p>
            </div>

            {/* Data Security */}
            <div>
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#00ccb0]" />
                {lang === "id" ? "3. Keamanan Data" : "3. Data Security"}
              </h2>
              <p
                className={`${
                  isDark ? "text-gray-300" : "text-gray-700"
                } text-sm md:text-base`}
              >
                {lang === "id"
                  ? "Kami menerapkan langkah keamanan teknis dan administratif untuk mencegah akses tidak sah terhadap data Anda, termasuk enkripsi dan kontrol akses."
                  : "We implement technical and administrative security measures, including encryption and access control, to prevent unauthorized data access."}
              </p>
            </div>

            {/* Sharing Policy */}
            <div>
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#00ccb0]" />
                {lang === "id" ? "4. Berbagi Informasi" : "4. Information Sharing"}
              </h2>
              <p
                className={`${
                  isDark ? "text-gray-300" : "text-gray-700"
                } text-sm md:text-base`}
              >
                {lang === "id"
                  ? "Kami tidak membagikan data pribadi Anda kepada pihak ketiga tanpa izin, kecuali diwajibkan oleh hukum."
                  : "We do not share your personal data with third parties without consent, except when required by law."}
              </p>
            </div>
          </section>
        </motion.div>

        {/* 🔗 Footer Navigation */}
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
            href="/disclaimer"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border font-medium transition ${
              isDark
                ? "border-[#00ccb0]/40 text-[#00ccb0] hover:bg-white/5"
                : "border-[#00ccb0]/50 text-[#00a48f] hover:bg-[#00ccb0]/10"
            }`}
          >
            <FileText className="w-4 h-4" />
            {lang === "id" ? "Disclaimer" : "Disclaimer"}
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
