"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  ArrowRight,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getLocalizedText } from "@/utils/getLocalizedText";

export default function ArtikelPage() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // 🌙 Deteksi tema aktif
  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
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

  // ✍️ Konten bilingual
  const content = {
    id: {
      title: "Artikel & Insight Properti",
      desc: "Dapatkan informasi, tips, dan tren terbaru seputar dunia properti Indonesia dari tim Namura Property.",
      readMore: "Baca Selengkapnya",
      prev: "Sebelumnya",
      next: "Selanjutnya",
      articles: [
        {
          slug: "tren-properti-hijau-2025",
          title: "Tren Properti Hijau: Investasi Ramah Lingkungan yang Meningkat di 2025",
          category: "Insight",
          date: "10 Nov 2025",
          read: "5 menit baca",
          image: "/tren.png",
          excerpt:
            "Properti ramah lingkungan kini menjadi fokus utama banyak developer di Indonesia. Pembangunan dengan prinsip sustainability mulai mendominasi proyek perumahan baru.",
        },
        {
          slug: "kpr-digital-teknologi-pembiayaan-rumah",
          title: "KPR Digital: Bagaimana Teknologi Mempermudah Pembiayaan Rumah",
          category: "Finance",
          date: "8 Nov 2025",
          read: "4 menit baca",
          image: "/kpr.png",
          excerpt:
            "Bank mulai meluncurkan fitur pengajuan KPR online dengan proses cepat dan transparan. Pelajari cara memanfaatkannya untuk mendapatkan hunian impianmu.",
        },
        {
          slug: "nilai-properti-tod-naik-2025",
          title: "Nilai Properti Kawasan TOD Naik hingga 12% di Semester Ini",
          category: "Market Update",
          date: "6 Nov 2025",
          read: "6 menit baca",
          image: "/TOD.png",
          excerpt:
            "Kawasan yang terintegrasi transportasi publik terus mengalami peningkatan minat investor dan pembeli rumah pertama.",
        },
        {
          slug: "tips-jual-rumah-cepat-digital",
          title: "Tips Menjual Rumah Cepat di Era Digital",
          category: "Panduan",
          date: "4 Nov 2025",
          read: "3 menit baca",
          image: "/news/sell-fast.png",
          excerpt:
            "Memasarkan rumah kini tak cukup hanya pasang iklan. Gunakan strategi digital marketing dan analisis harga pasar agar cepat terjual.",
        },
        {
          slug: "pasar-properti-2025-stabil",
          title: "Pasar Properti 2025: Stabil, tapi Selektif",
          category: "Market Update",
          date: "2 Nov 2025",
          read: "4 menit baca",
          image: "/pasar.png",
          excerpt:
            "Pasar properti nasional menunjukkan stabilitas, namun investor kini lebih berhati-hati dalam memilih sektor dengan potensi jangka panjang.",
        },
        {
          slug: "inovasi-rumah-modular",
          title: "Inovasi Rumah Modular: Solusi Hunian Cepat & Efisien",
          category: "Tech",
          date: "30 Okt 2025",
          read: "5 menit baca",
          image: "/inovasi.png",
          excerpt:
            "Konsep rumah modular semakin diminati karena kecepatan pembangunan dan fleksibilitas desain yang tinggi.",
        },
      ],
    },
    en: {
      title: "Property Articles & Insights",
      desc: "Get the latest information, tips, and trends in Indonesia’s property world from the Namura Property team.",
      readMore: "Read More",
      prev: "Previous",
      next: "Next",
      articles: [
        {
          slug: "green-property-trends-2025",
          title: "Green Property Trends: Eco-Friendly Investments Rise in 2025",
          category: "Insight",
          date: "Nov 10, 2025",
          read: "5 min read",
          image: "/tren.png",
          excerpt:
            "Eco-friendly property development is becoming a main focus for many developers in Indonesia, emphasizing sustainability in new housing projects.",
        },
        {
          slug: "digital-mortgage-housing-finance",
          title: "Digital Mortgages: How Technology Simplifies Home Financing",
          category: "Finance",
          date: "Nov 8, 2025",
          read: "4 min read",
          image: "/kpr.png",
          excerpt:
            "Banks are introducing online mortgage applications with faster and more transparent processes. Learn how to use them for your dream home.",
        },
        {
          slug: "tod-property-value-increase-2025",
          title: "TOD Area Property Values Rise Up to 12% This Semester",
          category: "Market Update",
          date: "Nov 6, 2025",
          read: "6 min read",
          image: "/TOD.png",
          excerpt:
            "Transit-oriented areas continue to attract both investors and first-time homebuyers thanks to improved accessibility.",
        },
        {
          slug: "how-to-sell-house-fast-digital",
          title: "Tips to Sell Your House Quickly in the Digital Era",
          category: "Guides",
          date: "Nov 4, 2025",
          read: "3 min read",
          image: "/pasar.png",
          excerpt:
            "Simply listing your house isn’t enough. Use digital marketing, good photography, and market analysis to sell faster.",
        },
        {
          slug: "property-market-2025-stable",
          title: "Property Market 2025: Stable but Selective",
          category: "Market Update",
          date: "Nov 2, 2025",
          read: "4 min read",
          image: "/news/market-stable.png",
          excerpt:
            "Indonesia’s property market remains stable, but investors are more selective in choosing long-term potential sectors.",
        },
        {
          slug: "modular-homes-innovation",
          title: "Modular Home Innovation: Fast & Efficient Housing Solution",
          category: "Tech",
          date: "Oct 30, 2025",
          read: "5 min read",
          image: "/inovasi.png",
          excerpt:
            "Modular homes are gaining popularity for their speed of construction and flexible design.",
        },
      ],
    },
  }[lang];

  const articles = content.articles;
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentArticles = articles.slice(indexOfFirst, indexOfLast);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main
      className={`min-h-screen pt-28 pb-28 transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-[#ffffff] text-[#1f2937]"
      }`}
    >
      <section className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
            className={`max-w-2xl mx-auto leading-relaxed ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {content.desc}
          </p>
        </motion.div>

        {/* GRID ARTIKEL */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentArticles.map((a, i) => (
            <motion.div
              key={a.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`group rounded-2xl overflow-hidden border transition-all duration-300 ${
                isDark
                  ? "bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20"
                  : "bg-white border-gray-200 hover:shadow-lg hover:border-[#00ccb0]/30"
              }`}
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[12px] px-3 py-1 rounded-full font-medium ${
                      isDark
                        ? "bg-[#00ccb0]/10 text-[#00ccb0]"
                        : "bg-[#00ccb0]/15 text-[#009c89]"
                    }`}
                  >
                    {a.category}
                  </span>
                  <div
                    className={`flex items-center gap-2 text-[12px] ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    {a.date}
                  </div>
                </div>

                <h3
                  className={`font-semibold text-lg leading-snug mb-2 transition ${
                    isDark
                      ? "text-gray-100 group-hover:text-[#00ccb0]"
                      : "text-gray-900 group-hover:text-[#00a48f]"
                  }`}
                >
                  {a.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed line-clamp-3 mb-4 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {a.excerpt}
                </p>

                <div
                  className={`flex items-center justify-between text-[13px] ${
                    isDark ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {a.read}
                  </span>
                  <Link
                    href={`/artikel/${a.slug}`}
                    className={`inline-flex items-center gap-1 font-medium transition ${
                      isDark
                        ? "text-[#00ccb0] hover:text-[#00e2c8]"
                        : "text-[#00a48f] hover:text-[#00917f]"
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

        {/* PAGINATION */}
        <div className="mt-16 flex justify-center items-center gap-3 flex-wrap">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
              currentPage === 1
                ? isDark
                  ? "text-gray-600 border-white/10"
                  : "text-gray-400 border-gray-200 cursor-not-allowed"
                : isDark
                ? "text-[#00ccb0] border-[#00ccb0] hover:bg-[#00ccb0]/10"
                : "text-[#00a48f] border-[#00a48f] hover:bg-[#00ccb0]/10"
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> {content.prev}
          </button>

          {Array.from({ length: Math.ceil(articles.length / itemsPerPage) }).map(
            (_, i) => (
              <button
                key={i}
                onClick={() => changePage(i + 1)}
                className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                  currentPage === i + 1
                    ? "bg-[#00ccb0]/20 text-[#00ccb0] border-[#00ccb0]"
                    : isDark
                    ? "text-gray-400 border-white/10 hover:border-[#00ccb0] hover:text-[#00ccb0]"
                    : "text-gray-600 border-gray-300 hover:border-[#00a48f] hover:text-[#00a48f]"
                }`}
              >
                {i + 1}
              </button>
            )
          )}

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
              currentPage === totalPages
                ? isDark
                  ? "text-gray-600 border-white/10"
                  : "text-gray-400 border-gray-200 cursor-not-allowed"
                : isDark
                ? "text-[#00ccb0] border-[#00ccb0] hover:bg-[#00ccb0]/10"
                : "text-[#00a48f] border-[#00a48f] hover:bg-[#00ccb0]/10"
            }`}
          >
            {content.next} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </main>
  );
}
