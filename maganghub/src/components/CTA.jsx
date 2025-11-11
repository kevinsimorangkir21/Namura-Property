"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CTA() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("id");

  // 🔍 Deteksi tema aktif
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

  // 🌐 Deteksi bahasa aktif (sinkron dengan navbar)
  useEffect(() => {
    const loadLang = () => setLang(localStorage.getItem("lang") || "id");
    loadLang();
    window.addEventListener("languageChange", loadLang);
    return () => window.removeEventListener("languageChange", loadLang);
  }, []);

  // 🔤 Teks bilingual
  const text = {
    id: {
      title: "Semua Bisa Mulai Sekarang",
      desc: "Kami percaya setiap orang berhak mendapatkan akses properti yang aman, transparan dan terpercaya. Mulai temukan unit idealmu atau pasang listing terbaikmu hari ini.",
      post: "Pasang Iklan Properti",
      search: "Cari Properti",
    },
    en: {
      title: "Everyone Can Start Now",
      desc: "We believe everyone deserves access to safe, transparent, and trusted property options. Start finding your ideal unit or list your best property today.",
      post: "Post Your Property",
      search: "Find Properties",
    },
  }[lang];

  return (
    <section
      className={`relative overflow-hidden py-32 transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-[#ffffff] text-[#1f2937]"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`text-4xl md:text-5xl font-black tracking-tight mb-6 ${
            isDark
              ? "bg-gradient-to-r from-[#01907a] to-[#00d6b9] bg-clip-text text-transparent"
              : "bg-gradient-to-r from-[#00a48f] to-[#00d6b9] bg-clip-text text-transparent"
          }`}
        >
          {text.title}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className={`max-w-2xl mx-auto text-lg leading-relaxed mb-10 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {text.desc}
        </motion.p>

        {/* Buttons */}
        <div className="flex justify-center gap-5 flex-wrap">
          {/* Primary Button */}
          <motion.div whileHover={{ scale: 1.04 }}>
            <Link
              href="/iklan/pasang"
              className={`px-7 py-3 rounded-xl font-semibold transition duration-200 ${
                isDark
                  ? "bg-[#008579] hover:bg-[#016e65] text-white"
                  : "bg-[#00ccb0] hover:bg-[#00b09d] text-white shadow-[0_4px_14px_-4px_rgba(0,200,180,0.3)]"
              }`}
            >
              {text.post}
            </Link>
          </motion.div>

          {/* Secondary Button */}
          <motion.div whileHover={{ scale: 1.04 }}>
            <Link
              href="/listing"
              className={`px-7 py-3 rounded-xl border font-semibold transition duration-200 ${
                isDark
                  ? "border-[#00ccb0] text-[#00ccb0] hover:bg-white/5"
                  : "border-[#00ccb0] text-[#00a590] hover:bg-[#00ccb0]/10 hover:text-[#007f70]"
              }`}
            >
              {text.search}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Ambient Glow */}
      {isDark ? (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.15 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8 }}
          className="absolute -right-32 top-10 w-[380px] h-[380px] bg-[#00bca6] rounded-full blur-[135px]"
        />
      ) : (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8 }}
          className="absolute -right-32 top-10 w-[380px] h-[380px] bg-[#00ccb0] rounded-full blur-[160px]"
        />
      )}
    </section>
  );
}
