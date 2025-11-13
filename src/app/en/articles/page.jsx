"use client";

// FULL ENGLISH VERSION

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

export default function ArticlesPageEN() {
  const [isDark, setIsDark] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Theme detection
  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);

    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, { attributes: true });
    return () => obs.disconnect();
  }, []);

  // English content
  const content = {
    title: "Property Articles & Insights",
    desc: "Get the latest information, tips, and trends in Indonesia’s property market.",
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
          "Eco-friendly developments are becoming a major focus across Indonesia.",
      },
      {
        slug: "digital-mortgage-housing-finance",
        title: "Digital Mortgages: How Technology Simplifies Home Financing",
        category: "Finance",
        date: "Nov 8, 2025",
        read: "4 min read",
        image: "/kpr.png",
        excerpt:
          "Banks now offer online mortgage applications with streamlined processes.",
      },
      {
        slug: "tod-property-value-increase-2025",
        title: "Property Values in TOD Areas Rise by 12% This Semester",
        category: "Market Update",
        date: "Nov 6, 2025",
        read: "6 min read",
        image: "/TOD.png",
        excerpt:
          "Transit-oriented areas are attracting both investors and home seekers.",
      },
      {
        slug: "how-to-sell-house-fast-digital",
        title: "Tips to Sell Your House Quickly in the Digital Era",
        category: "Guide",
        date: "Nov 4, 2025",
        read: "3 min read",
        image: "/pasar.png",
        excerpt:
          "Listing alone isn’t enough — digital marketing is now essential.",
      },
      {
        slug: "property-market-2025-stable",
        title: "Property Market 2025: Stable but Selective",
        category: "Market Update",
        date: "Nov 2, 2025",
        read: "4 min read",
        image: "/news/market-stable.png",
        excerpt:
          "The market remains steady, but investors are more selective.",
      },
      {
        slug: "modular-homes-innovation",
        title: "Modular Home Innovation: Fast & Efficient Housing Solution",
        category: "Tech",
        date: "Oct 30, 2025",
        read: "5 min read",
        image: "/inovasi.png",
        excerpt:
          "Modular homes gain traction due to fast construction and flexibility.",
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
        isDark ? "bg-[#0b0f15] text-white" : "bg-white text-gray-900"
      }`}
    >
      <section className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1
            className={`text-4xl md:text-5xl font-black mb-4 ${
              isDark
                ? "bg-gradient-to-r from-[#01907a] to-[#00d6b9] bg-clip-text text-transparent"
                : "text-[#00a48f]"
            }`}
          >
            {content.title}
          </h1>
          <p className={`max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {content.desc}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentArticles.map((a, i) => (
            <motion.div
              key={a.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`group rounded-2xl overflow-hidden border transition ${
                isDark
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-white border-gray-200 hover:shadow-lg hover:border-[#00ccb0]/30"
              }`}
            >
              <div className="h-44 overflow-hidden">
                <img src={a.image} className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>

              <div className="p-5">
                <div className="flex justify-between mb-3">
                  <span
                    className={`text-[12px] px-3 py-1 rounded-full ${
                      isDark ? "bg-[#00ccb0]/10 text-[#00ccb0]" : "bg-[#00ccb0]/15 text-[#009c89]"
                    }`}
                  >
                    {a.category}
                  </span>

                  <span className={`flex items-center gap-2 text-[12px] ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    <Calendar className="w-3.5 h-3.5" /> {a.date}
                  </span>
                </div>

                <h3
                  className={`font-semibold text-lg mb-2 ${
                    isDark ? "text-gray-100 group-hover:text-[#00ccb0]" : "text-gray-900 group-hover:text-[#00a48f]"
                  }`}
                >
                  {a.title}
                </h3>

                <p className={`text-sm line-clamp-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {a.excerpt}
                </p>

                <div className="mt-4 flex justify-between text-[13px]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {a.read}
                  </span>

                  <Link href={`/en/articles/${a.slug}`} className={`inline-flex items-center gap-1 ${isDark ? "text-[#00ccb0]" : "text-[#00a48f]"}`}>
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
