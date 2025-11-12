"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Hero() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("id");

  // === THEME DETECTION ===
  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // === LANGUAGE DETECTION ===
  useEffect(() => {
    const loadLang = () => setLang(localStorage.getItem("lang") || "id");
    loadLang();
    window.addEventListener("languageChange", loadLang);
    return () => window.removeEventListener("languageChange", loadLang);
  }, []);

  // === QUICK ACTIONS ===
  const quickActions =
    lang === "id"
      ? [
          { label: "Daftar Properti", icon: "/HouseSearch.svg", link: null },
          { label: "Pasang Iklan Properti", icon: "/Ads.svg", link: null },
          { label: "Agen Properti", icon: "/Agent.svg", link: null },
          { label: "Promo Properti", icon: "/Promo.svg", link: null },
          { label: "Kalkulator KPR", icon: "/KalkulatorKPR.svg", link: "/kpr" },
          { label: "Pindah KPR", icon: "/PindahKPR.svg", link: "/pindah-tenor" },
          { label: "Forum Tanya Jawab", icon: "/TanyaForum.svg", link: null },
          { label: "Kemitraan", icon: "/Mores.svg", link: null },
        ]
      : [
          { label: "Property Listings", icon: "/HouseSearch.svg", link: null },
          { label: "Advertise Property", icon: "/Ads.svg", link: null },
          { label: "Property Agents", icon: "/Agent.svg", link: null },
          { label: "Property Promotions", icon: "/Promo.svg", link: null },
          { label: "Mortgage Calculator", icon: "/KalkulatorKPR.svg", link: "/kpr" },
          { label: "Mortgage Transfer", icon: "/PindahKPR.svg", link: "/pindah-tenor" },
          { label: "Discussion Forum", icon: "/TanyaForum.svg", link: null },
          { label: "Partnerships", icon: "/Mores.svg", link: null },
        ];

  // === BANNER ===
  const bannerSrc =
    lang === "id"
      ? isDark
        ? "/BannerID.png"
        : "/BannerID.png"
      : isDark
      ? "/BannerENG.png"
      : "/BannerENG.png";

  return (
    <section
      className={`relative overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-white text-[#1f2937]"
      } pt-10 md:pt-10 pb-10`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* === BANNER === */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`w-full mb-8 rounded-3xl overflow-hidden border shadow-lg ${
            isDark
              ? "border-white/10 shadow-[0_0_45px_rgba(0,203,178,0.12)]"
              : "border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
          }`}
        >
          <img src={bannerSrc} alt="Banner" className="w-full h-auto object-cover" />
        </motion.div>

        {/* === QUICK ACTIONS === */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 mb-6">
          {quickActions.map((action, i) => {
            const isComingSoon = !action.link;

            const cardContent = (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`relative flex flex-col items-center justify-center rounded-2xl py-3 md:py-4 cursor-pointer transition-all ${
                  isComingSoon
                    ? isDark
                      ? "bg-white/5 border border-white/10 opacity-40 cursor-not-allowed"
                      : "bg-gray-100 border border-gray-200 opacity-60 cursor-not-allowed"
                    : isDark
                    ? "bg-white/8 border border-white/10 hover:bg-white/12"
                    : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
                } hover:scale-[1.03]`}
              >
                {/* Badge “Coming Soon” */}
                {isComingSoon && (
                  <span className="absolute -top-1 right-1 text-[9px] font-semibold px-2 py-[2px] rounded-full bg-yellow-400 text-black shadow-sm">
                    Coming Soon
                  </span>
                )}

                <img
                  src={action.icon}
                  className={`w-10 h-10 md:w-11 md:h-11 mb-2 ${
                    isDark ? "opacity-90" : "opacity-80"
                  }`}
                />
                <span
                  className={`text-[10px] md:text-[11px] font-medium text-center leading-tight ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {action.label}
                </span>
              </motion.div>
            );

            return isComingSoon ? (
              <div key={i}>{cardContent}</div>
            ) : (
              <Link key={i} href={action.link}>
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>

      {/* === AMBIENT EFFECT === */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: isDark ? 0.18 : 0.1 }}
        transition={{ duration: 1.5 }}
        className={`absolute right-6 md:right-14 top-20 w-56 h-56 md:w-72 md:h-72 rounded-full blur-[130px] ${
          isDark ? "bg-[#00bca6]" : "bg-[#00ccb0]"
        }`}
      />
    </section>
  );
}
