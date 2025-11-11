"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Steps() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("id");

  // 🌙 Deteksi mode aktif (dark/light)
  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // 🌐 Deteksi bahasa aktif
  useEffect(() => {
    const loadLang = () => setLang(localStorage.getItem("lang") || "id");
    loadLang();
    window.addEventListener("languageChange", loadLang);
    return () => window.removeEventListener("languageChange", loadLang);
  }, []);

  // ✍️ Data langkah & teks bilingual
  const content = {
    id: {
      title: "Cara Memulai Bersama Namura Property",
      desc: "Panduan ringkas dari mulai menemukan properti, konsultasi, sampai transaksimu selesai.",
      steps: [
        {
          num: 1,
          title: "Temukan Unit",
          desc: "Cari properti yang sesuai kebutuhanmu dengan filter kategori, lokasi, dan harga.",
        },
        {
          num: 2,
          title: "Hubungi Tim Ahli",
          desc: "Konsultasi, klarifikasi kebutuhan, negosiasi, hingga jadwal site visit dipandu langsung.",
        },
        {
          num: 3,
          title: "Deal & Proses KPR",
          desc: "Mulai proses pembelian atau pengajuan KPR dengan lebih terarah & minim ribet.",
        },
      ],
    },
    en: {
      title: "How to Get Started with Namura Property",
      desc: "A quick guide from finding the right property to consultation and completing your transaction.",
      steps: [
        {
          num: 1,
          title: "Find a Property",
          desc: "Search for properties that match your needs by category, location, and price.",
        },
        {
          num: 2,
          title: "Contact Our Experts",
          desc: "Consult, clarify your needs, negotiate, and schedule a site visit with our team’s help.",
        },
        {
          num: 3,
          title: "Deal & Mortgage Process",
          desc: "Start the buying or mortgage process in a more guided and hassle-free way.",
        },
      ],
    },
  }[lang];

  return (
    <section
      className={`relative overflow-hidden py-28 transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-[#ffffff] text-[#1f2937]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-6 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {content.title}
        </h2>

        <p
          className={`max-w-2xl mx-auto mb-16 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {content.desc}
        </p>

        {/* === Steps === */}
        <div className="grid md:grid-cols-3 gap-10">
          {content.steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative group rounded-2xl p-8 transition-all duration-300 ${
                isDark
                  ? "bg-white/6 border border-white/10 backdrop-blur-xl hover:border-white/20 hover:bg-white/[0.09]"
                  : "bg-gray-50 border border-gray-200 hover:border-[#00ccb0]/40 hover:shadow-[0_8px_25px_-10px_rgba(0,200,180,0.25)]"
              }`}
            >
              {/* Nomor */}
              <div
                className={`absolute -top-7 left-6 w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-extrabold shadow-lg ${
                  isDark
                    ? "bg-[#00ccb0] shadow-[0_0_50px_rgba(0,203,178,0.4)]"
                    : "bg-[#00ccb0] shadow-[0_0_35px_rgba(0,203,178,0.25)]"
                }`}
              >
                {s.num}
              </div>

              <h3
                className={`mt-8 text-xl font-semibold ${
                  isDark ? "text-gray-100" : "text-gray-800"
                }`}
              >
                {s.title}
              </h3>

              <p
                className={`mt-3 leading-relaxed ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* === Ambient Background === */}
      {isDark ? (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 1.8 }}
          className="absolute left-10 bottom-10 w-72 h-72 bg-[#00ccb0] rounded-full blur-[130px]"
        />
      ) : (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.08 }}
          transition={{ duration: 1.8 }}
          className="absolute left-10 bottom-10 w-72 h-72 bg-[#00ccb0] rounded-full blur-[160px]"
        />
      )}
    </section>
  );
}
