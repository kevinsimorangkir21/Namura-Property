"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeroID() {
  const [isDark, setIsDark] = useState(false);

  // THEME DETECTION
  useEffect(() => {
    const detect = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    detect();
    const obs = new MutationObserver(detect);
    obs.observe(document.documentElement, { attributes: true });
    return () => obs.disconnect();
  }, []);

  const quickActions = [
    { label: "Daftar Properti", icon: "/HouseSearch.svg", link: null },
    { label: "Pasang Iklan Properti", icon: "/Ads.svg", link: null },
    { label: "Agen Properti", icon: "/Agent.svg", link: null },
    { label: "Promo Properti", icon: "/Promo.svg", link: null },
    { label: "Kalkulator KPR", icon: "/KalkulatorKPR.svg", link: "/kpr-id" },
    { label: "Pindah KPR", icon: "/PindahKPR.svg", link: "/pindah-tenor" },
    { label: "Forum Tanya Jawab", icon: "/TanyaForum.svg", link: null },
    { label: "Kemitraan", icon: "/Mores.svg", link: null },
  ];

  const bannerSrc = "/BannerID.png";

  return (
    <section
      className={`relative overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-white text-[#1f2937]"
      } pt-10 md:pt-10 pb-10`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* BANNER */}
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
          <img src={bannerSrc} alt="Banner" className="w-full object-cover" />
        </motion.div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 mb-6">
          {quickActions.map((item, i) => {
            const isComingSoon = !item.link;

            const content = (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`relative flex flex-col items-center justify-center rounded-2xl py-3 md:py-4 transition-all ${
                  isComingSoon
                    ? isDark
                      ? "bg-white/5 border border-white/10 opacity-40 cursor-not-allowed"
                      : "bg-gray-100 border border-gray-200 opacity-60 cursor-not-allowed"
                    : isDark
                    ? "bg-white/8 border border-white/10 hover:bg-white/12 cursor-pointer"
                    : "bg-gray-50 border border-gray-200 hover:bg-gray-100 cursor-pointer"
                } hover:scale-[1.03]`}
              >
                {isComingSoon && (
                  <span className="absolute -top-1 right-1 text-[9px] font-semibold px-2 py-[2px] rounded-full bg-yellow-400 text-black shadow-sm">
                    Segera
                  </span>
                )}

                <img src={item.icon} className="w-10 h-10 mb-2 opacity-90" />

                <span
                  className={`text-[10px] md:text-[11px] font-medium text-center leading-tight ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {item.label}
                </span>
              </motion.div>
            );

            return item.link ? (
              <Link key={i} href={item.link}>
                {content}
              </Link>
            ) : (
              <div key={i}>{content}</div>
            );
          })}
        </div>
      </div>

      {/* AMBIENT EFFECT */}
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
