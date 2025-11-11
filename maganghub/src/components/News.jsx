"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const news = [
  {
    title: "Harga Rumah Suburban Jabodetabek Naik 8.2% dalam 6 Bulan",
    category: "Market Update",
    date: "7 Nov 2025",
    img: "/news/jabodetabek.png",
  },
  {
    title: "Bank Mulai Longgarkan DP KPR untuk Milenial",
    category: "KPR & Finance",
    date: "6 Nov 2025",
    img: "/news/dp-kpr.png",
  },
  {
    title: "Developer Premium Masuk Kawasan Bogor Selatan",
    category: "Investment",
    date: "4 Nov 2025",
    img: "/news/bogor.png",
  },
  {
    title: "Properti Dekat Akses TOD Jadi Incaran Investor",
    category: "Tren Properti",
    date: "2 Nov 2025",
    img: "/news/tod.png",
  },
];

export default function News() {
  const [isDark, setIsDark] = useState(false);

  // 👀 Deteksi mode aktif
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

  return (
    <section
      className={`relative overflow-hidden py-28 transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-[#ffffff] text-[#1f2937]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2
              className={`text-4xl font-black tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Berita & Insight
            </h2>

            <p
              className={`text-sm mt-2 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Update terbaru industri properti, ekonomi & tren pasar Indonesia.
            </p>
          </div>

          <button
            className={`px-4 py-2 rounded-lg border text-sm font-semibold inline-flex items-center gap-2 transition ${
              isDark
                ? "border-[#00bba4] text-[#00ccb0] hover:bg-white/5"
                : "border-[#00ccb0] text-[#00bba4] hover:bg-[#00ccb0]/10"
            }`}
          >
            Lihat Semua Berita →
          </button>
        </div>

        {/* GRID NEWS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {news.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-2xl overflow-hidden border transition-all cursor-pointer ${
                isDark
                  ? "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.08]"
                  : "bg-white border-gray-200 hover:border-[#00ccb0]/40 hover:shadow-[0_8px_25px_-10px_rgba(0,200,180,0.25)]"
              }`}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-40 object-cover opacity-95"
              />

              <div className="p-4">
                <div className="text-[11px] text-[#00ccb0] font-semibold mb-1">
                  {item.category}
                </div>

                <div
                  className={`font-semibold mb-2 line-clamp-2 ${
                    isDark ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {item.title}
                </div>

                <div
                  className={`text-[12px] ${
                    isDark ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  {item.date}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AMBIENT GLOW */}
      {isDark ? (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 1.6 }}
          className="absolute -right-20 bottom-10 w-[380px] h-[380px] bg-[#00bba4] rounded-full blur-[140px]"
        />
      ) : (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.08 }}
          transition={{ duration: 1.6 }}
          className="absolute -right-20 bottom-10 w-[380px] h-[380px] bg-[#00ccb0] rounded-full blur-[160px]"
        />
      )}
    </section>
  );
}
