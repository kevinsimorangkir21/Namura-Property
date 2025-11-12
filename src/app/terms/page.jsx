"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BookText, FileText, ShieldCheck, ScrollText } from "lucide-react";

export default function TermsPage() {
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
            initial={{ y: 0 }}
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
            className={`max-w-2xl text-sm md:text-base leading-relaxed ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {lang === "id"
              ? "Dengan menggunakan layanan Namura Property, Anda dianggap telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan yang berlaku."
              : "By using Namura Property services, you acknowledge that you have read, understood, and agreed to all applicable terms and conditions."}
          </p>
        </div>

        {/* 📜 Content Section */}
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
            {/* Use of Website */}
            <div>
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <BookText className="w-5 h-5 text-[#00ccb0]" />
                {lang === "id" ? "1. Penggunaan Situs" : "1. Use of the Website"}
              </h2>
              <p
                className={`${
                  isDark ? "text-gray-300" : "text-gray-700"
                } text-sm md:text-base`}
              >
                {lang === "id"
                  ? "Pengguna tidak diperkenankan menggunakan situs ini untuk tujuan yang melanggar hukum, menipu, atau mengganggu kenyamanan pengguna lain."
                  : "Users are prohibited from using this site for illegal, deceptive, or disruptive activities affecting other users."}
              </p>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#00ccb0]" />
                {lang === "id" ? "2. Hak Kekayaan Intelektual" : "2. Intellectual Property Rights"}
              </h2>
              <p
                className={`${
                  isDark ? "text-gray-300" : "text-gray-700"
                } text-sm md:text-base`}
              >
                {lang === "id"
                  ? "Seluruh konten dalam situs, termasuk logo, teks, gambar, desain, dan data, merupakan hak milik Namura Property dan dilindungi oleh undang-undang hak cipta. Dilarang menyalin tanpa izin tertulis."
                  : "All content, including logos, text, images, designs, and data, is the property of Namura Property and protected by copyright laws. Reproduction without permission is prohibited."}
              </p>
            </div>

            {/* User Responsibilities */}
            <div>
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#00ccb0]" />
                {lang === "id" ? "3. Tanggung Jawab Pengguna" : "3. User Responsibilities"}
              </h2>
              <p
                className={`${
                  isDark ? "text-gray-300" : "text-gray-700"
                } text-sm md:text-base`}
              >
                {lang === "id"
                  ? "Pengguna bertanggung jawab atas aktivitas yang dilakukan melalui akun atau aksesnya, termasuk memastikan keakuratan data yang diunggah ke sistem."
                  : "Users are responsible for all activities carried out through their accounts or access, including ensuring the accuracy of any data uploaded to the system."}
              </p>
            </div>

            {/* Modifications */}
            <div>
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <ScrollText className="w-5 h-5 text-[#00ccb0]" />
                {lang === "id" ? "4. Perubahan Ketentuan" : "4. Amendments"}
              </h2>
              <p
                className={`${
                  isDark ? "text-gray-300" : "text-gray-700"
                } text-sm md:text-base`}
              >
                {lang === "id"
                  ? "Namura Property berhak mengubah, menambah, atau memperbarui syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan terlebih dahulu."
                  : "Namura Property reserves the right to modify, add, or update these terms at any time without prior notice."}
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
