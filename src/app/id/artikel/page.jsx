"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ArtikelPageID() {
  const [isDark, setIsDark] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // 🌙 Tema
  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);

    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, { attributes: true });
    return () => obs.disconnect();
  }, []);

  // 📚 Data Artikel Indonesia
  const content = {
    title: "Artikel & Insight Properti",
    desc: "Dapatkan informasi, tips, dan tren terbaru seputar dunia properti Indonesia dari tim Namura Property.",
    readMore: "Baca Selengkapnya",
    prev: "Sebelumnya",
    next: "Selanjutnya",
    articles: [
      {
        slug: "tren-properti-hijau-2025",
        title:
          "Tren Properti Hijau: Investasi Ramah Lingkungan yang Meningkat di 2025",
        category: "Insight",
        date: "10 Nov 2025",
        read: "5 menit baca",
        image: "/tren.png",
        excerpt:
          "Properti ramah lingkungan kini menjadi fokus utama banyak developer di Indonesia.",
      },
      {
        slug: "kpr-digital-teknologi-pembiayaan-rumah",
        title: "KPR Digital: Bagaimana Teknologi Mempermudah Pembiayaan Rumah",
        category: "Finance",
        date: "8 Nov 2025",
        read: "4 menit baca",
        image: "/kpr.png",
        excerpt:
          "Bank meluncurkan fitur pengajuan KPR online dengan proses cepat dan transparan.",
      },
      {
        slug: "nilai-properti-tod-naik-2025",
        title: "Nilai Properti Kawasan TOD Naik hingga 12% di Semester Ini",
        category: "Market Update",
        date: "6 Nov 2025",
        read: "6 menit baca",
        image: "/TOD.png",
        excerpt:
          "Kawasan TOD semakin diminati investor dan pembeli rumah pertama.",
      },
      {
        slug: "tips-jual-rumah-cepat-digital",
        title: "Tips Menjual Rumah Cepat di Era Digital",
        category: "Panduan",
        date: "4 Nov 2025",
        read: "3 menit baca",
        image: "/news/sell-fast.png",
        excerpt:
          "Memasarkan rumah kini tak cukup hanya pasang iklan.",
      },
      {
        slug: "pasar-properti-2025-stabil",
        title: "Pasar Properti 2025: Stabil, tapi Selektif",
        category: "Market Update",
        date: "2 Nov 2025",
        read: "4 menit baca",
        image: "/pasar.png",
        excerpt:
          "Pasar nasional stabil, namun investor kini lebih selektif.",
      },
      {
        slug: "inovasi-rumah-modular",
        title: "Inovasi Rumah Modular: Solusi Hunian Cepat & Efisien",
        category: "Tech",
        date: "30 Okt 2025",
        read: "5 menit baca",
        image: "/inovasi.png",
        excerpt:
          "Rumah modular makin populer karena kecepatan pembangunan.",
      },
    ],
  };

  const articles = content.articles;
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentArticles = articles.slice(indexOfFirst, indexOfLast);

  const changePage = (p) => {
    if (p >= 1 && p <= totalPages) setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main
      className={`min-h-screen pt-28 pb-28 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-white text-[#1f2937]"
      }`}
    >
      <section className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1
            className={`text-4xl md:text-5xl font-black mb-4 ${
              isDark
                ? "bg-gradient-to-r from-[#01907a] to-[#00d6b9] bg-clip-text text-transparent"
                : "text-[#00a48f]"
            }`}
          >
            {content.title}
          </h1>
          <p
            className={`max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {content.desc}
          </p>
        </motion.div>

        {/* Grid Artikel */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentArticles.map((a, i) => (
            <motion.div
              key={a.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`group rounded-2xl overflow-hidden border transition ${
                isDark
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-white border-gray-200 hover:shadow-lg hover:border-[#00ccb0]/30"
              }`}
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={a.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>

              <div className="p-5">
                <div className="flex justify-between mb-3">
                  <span
                    className={`text-[12px] px-3 py-1 rounded-full ${
                      isDark
                        ? "bg-[#00ccb0]/10 text-[#00ccb0]"
                        : "bg-[#00ccb0]/15 text-[#009c89]"
                    }`}
                  >
                    {a.category}
                  </span>

                  <span
                    className={`flex items-center gap-2 text-[12px] ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" /> {a.date}
                  </span>
                </div>

                <h3
                  className={`font-semibold text-lg mb-2 ${
                    isDark
                      ? "text-gray-100 group-hover:text-[#00ccb0]"
                      : "text-gray-900 group-hover:text-[#00a48f]"
                  }`}
                >
                  {a.title}
                </h3>

                <p
                  className={`text-sm line-clamp-3 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {a.excerpt}
                </p>

                <div className="mt-4 flex justify-between text-[13px]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {a.read}
                  </span>

                  <Link
                    href={`/artikel/${a.slug}`}
                    className={`inline-flex items-center gap-1 font-medium ${
                      isDark ? "text-[#00ccb0]" : "text-[#00a48f]"
                    }`}
                  >
                    {content.readMore}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex justify-center items-center gap-3 flex-wrap">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
              currentPage === 1
                ? "opacity-40 cursor-not-allowed"
                : isDark
                ? "border-[#00ccb0] text-[#00ccb0]"
                : "border-[#00a48f] text-[#00a48f]"
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> {content.prev}
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => changePage(i + 1)}
              className={`px-4 py-2 rounded-lg border ${
                currentPage === i + 1
                  ? "bg-[#00ccb0]/20 text-[#00ccb0] border-[#00ccb0]"
                  : isDark
                  ? "border-white/10 text-gray-400"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
              currentPage === totalPages
                ? "opacity-40 cursor-not-allowed"
                : isDark
                ? "border-[#00ccb0] text-[#00ccb0]"
                : "border-[#00a48f] text-[#00a48f]"
            }`}
          >
            {content.next} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </main>
  );
}
