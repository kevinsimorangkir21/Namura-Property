"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // === LANGUAGE DETECTION (REALTIME) ===
  useEffect(() => {
    const loadLang = () => setLang(localStorage.getItem("lang") || "id");
    loadLang();

    // 🔥 dengarkan event dari Navbar
    window.addEventListener("languageChange", loadLang);

    return () => window.removeEventListener("languageChange", loadLang);
  }, []);

  // === TRANSLATIONS ===
  const quickActions =
    lang === "id"
      ? [
          { label: "Carikan Properti", icon: "/HouseSearch.svg" },
          { label: "Iklankan Properti", icon: "/Ads.svg" },
          { label: "Cari Agen", icon: "/Agent.svg" },
          { label: "Promo Properti", icon: "/Promo.svg" },
          { label: "Kalkulator KPR", icon: "/KalkulatorKPR.svg" },
          { label: "Pindah KPR (Take Over)", icon: "/PindahKPR.svg" },
          { label: "Tanya Forum (Teras123)", icon: "/TanyaForum.svg" },
          { label: "Lainnya", icon: "/Mores.svg" },
        ]
      : [
          { label: "Find Property", icon: "/HouseSearch.svg" },
          { label: "Advertise Property", icon: "/Ads.svg" },
          { label: "Find Agent", icon: "/Agent.svg" },
          { label: "Property Deals", icon: "/Promo.svg" },
          { label: "Mortgage Calculator", icon: "/KalkulatorKPR.svg" },
          { label: "KPR Take Over", icon: "/PindahKPR.svg" },
          { label: "Ask in Forum", icon: "/TanyaForum.svg" },
          { label: "More", icon: "/Mores.svg" },
        ];

  // === BANNER SELECTION ===
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
        isDark ? "bg-[#0b0f15] text-white" : "bg-[#ffffff] text-[#1f2937]"
      } pt-10 md:pt-10 pb-10`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* === BANNER === */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`w-full mb-8 rounded-3xl overflow-hidden border shadow-lg transition-all ${
            isDark
              ? "border-white/10 shadow-[0_0_45px_rgba(0,203,178,0.12)]"
              : "border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
          }`}
        >
          <img
            src={bannerSrc}
            alt={lang === "id" ? "Banner ID" : "Banner EN"}
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* === QUICK ACTIONS === */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 mb-6">
          {quickActions.map((action, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`flex flex-col items-center justify-center rounded-2xl py-3 md:py-4 cursor-pointer transition-all ${
                isDark
                  ? "bg-white/8 border border-white/10 hover:bg-white/12"
                  : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
              } hover:scale-[1.02]`}
            >
              <img
                src={action.icon}
                className={`w-10 h-10 md:w-11 md:h-11 mb-2 ${
                  isDark ? "opacity-90" : "opacity-80"
                }`}
              />
              <span
                className={`text-[10px] md:text-[11px] font-medium leading-tight text-center ${
                  isDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {action.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* === AMBIENT EFFECT === */}
      {isDark ? (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.18 }}
          transition={{ duration: 1.8 }}
          className="absolute right-6 md:right-14 top-20 w-56 h-56 md:w-72 md:h-72 bg-[#00bca6] rounded-full blur-[120px]"
        />
      ) : (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.8 }}
          className="absolute right-6 md:right-14 top-20 w-56 h-56 md:w-72 md:h-72 bg-[#00ccb0] rounded-full blur-[140px]"
        />
      )}
    </section>
  );
}
