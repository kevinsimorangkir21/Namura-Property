"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

import { articlesEN } from "@/data/articlesEN";

export default function News() {
  const [isDark, setIsDark] = useState(false);

  // Detect theme
  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Ambil 4 artikel terbaru
  const latestNews = articlesEN.slice(0, 4);

  const content = {
    title: "News & Insights",
    desc: "The latest updates on property, economy and market trends in Indonesia.",
    button: "View All News →",
  };

  return (
    <section
      className={`relative overflow-hidden py-28 transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-white text-[#1f2937]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2
              className={`text-4xl font-black tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {content.title}
            </h2>

            <p
              className={`text-sm mt-2 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {content.desc}
            </p>
          </div>

          <Link
            href="/en/articles"
            className={`px-4 py-2 rounded-lg border text-sm font-semibold transition ${
              isDark
                ? "border-[#00bba4] text-[#00ccb0] hover:bg-white/5"
                : "border-[#00ccb0] text-[#00bba4] hover:bg-[#00ccb0]/10"
            }`}
          >
            {content.button}
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {latestNews.map((item, i) => (
            <Link key={i} href={`/en/arrticle/${item.slug}`}>
              <motion.div
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
                  src={item.image}
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

                  <div className="text-[12px] text-gray-500">{item.date}</div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Glow */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: isDark ? 0.15 : 0.08 }}
        transition={{ duration: 1.6 }}
        className={`absolute -right-20 bottom-10 w-[380px] h-[380px] rounded-full blur-[150px] ${
          isDark ? "bg-[#00bba4]" : "bg-[#00ccb0]"
        }`}
      />
    </section>
  );
}
