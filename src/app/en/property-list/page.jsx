"use client";

import Link from "next/link";
import { slugify } from "@/utils/slugify";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Home,
  Building2,
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Bath,
  Ruler,
} from "lucide-react";

import { propertiesData } from "@/data/propertiesData";

// Utility: Auto height based on type
const IMG_H_BY_TYPE = (type) => {
  const t = (type || "").toLowerCase();
  if (t.includes("apart")) return 240;
  if (t.includes("town")) return 220;
  if (t.includes("house")) return 220;
  return 190;
};

export default function ListingEN() {
  const [isDark, setIsDark] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedType, setSelectedType] = useState("All Types");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  /* 🌙 Detect dark mode */
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

  /* 🔤 English labels */
  const t = {
    title: "Property Listings",
    searchPlaceholder: "Search title, address, or location...",
    reset: "Reset",
    noResult: "No matching results",
    suggestion: "Try changing keywords or reset filters.",
    resetFilter: "Reset Filter",
    prev: "Previous",
    next: "Next",
    page: "Page",
    of: "of",
    allLoc: "All Locations",
    allType: "All Types",
    viewDetail: "View Details",
  };

  /* 🏙️ Build filter options */
  const locations = useMemo(
    () => [t.allLoc, ...Array.from(new Set(propertiesData.map((p) => p.location)))],
    []
  );

  const types = useMemo(
    () => [
      t.allType,
      ...Array.from(
        new Set(
          propertiesData.map((p) =>
            typeof p.type === "object" ? p.type.en : p.type
          )
        )
      ),
    ],
    []
  );

  /* 🔎 Filtering logic */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return propertiesData.filter((p) => {
      const title = typeof p.title === "object" ? p.title.en : p.title;
      const desc = typeof p.desc === "object" ? p.desc.en : p.desc;
      const type = typeof p.type === "object" ? p.type.en : p.type;

      const matchText =
        title?.toLowerCase().includes(q) ||
        desc?.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q) ||
        (p.address ?? "").toLowerCase().includes(q);

      const matchLoc = selectedLocation === t.allLoc || p.location === selectedLocation;
      const matchType = selectedType === t.allType || type === selectedType;

      return matchText && matchLoc && matchType;
    });
  }, [search, selectedLocation, selectedType]);

  useEffect(() => setCurrentPage(1), [search, selectedLocation, selectedType]);

  /* 📄 Pagination */
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const currentItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilter = () => {
    setSearch("");
    setSelectedLocation(t.allLoc);
    setSelectedType(t.allType);
  };

  return (
    <main
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-white text-gray-900"
      } pt-28 pb-24`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black">{t.title}</h1>
            <div className="mt-2 h-1 w-28 rounded-full bg-gradient-to-r from-[#03a893] to-[#00e0c8] opacity-70" />
          </div>

          {/* Search */}
          <div className="relative w-full md:w-[420px]">
            <Search
              className={`absolute left-3 top-3.5 w-5 h-5 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-10 pr-24 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 
                focus:ring-[#00ccb0] transition-all ${
                  isDark
                    ? "bg-white/8 border-white/10 text-gray-100 placeholder:text-gray-400"
                    : "bg-gray-50 border-gray-300 text-gray-800 placeholder:text-gray-500"
                }`}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className={`absolute right-2 top-2 px-3 py-1.5 text-xs rounded-lg border transition ${
                  isDark
                    ? "bg-white/5 hover:bg-white/10 border-white/10 text-gray-200"
                    : "bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-600"
                }`}
              >
                {t.reset}
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {/* Location Filter */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className={`px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#00ccb0] ${
              isDark
                ? "bg-white/8 border-white/10 text-gray-100"
                : "bg-gray-50 border-gray-300 text-gray-800"
            }`}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className={`px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#00ccb0] ${
              isDark
                ? "bg-white/8 border-white/10 text-gray-100"
                : "bg-gray-50 border-gray-300 text-gray-800"
            }`}
          >
            {types.map((tp) => (
              <option key={tp} value={tp}>
                {tp}
              </option>
            ))}
          </select>

          {/* Reset Button */}
          {(search || selectedLocation !== t.allLoc || selectedType !== t.allType) && (
            <button
              onClick={resetFilter}
              className={`px-4 py-3 rounded-xl border transition ${
                isDark
                  ? "bg-white/5 border-white/10 text-gray-200 hover:bg-white/10"
                  : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {t.reset}
            </button>
          )}
        </div>

        {/* Cards */}
        {currentItems.length === 0 ? (
          <div className="text-center py-20">
            <div className={`text-lg font-semibold ${isDark ? "text-gray-200" : "text-gray-700"}`}>
              {t.noResult}
            </div>
            <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t.suggestion}
            </p>
            <button
              onClick={resetFilter}
              className="mt-5 px-4 py-2 rounded-lg border border-[#00bba4] text-[#00ccb0] hover:bg-[#00ccb0]/10 transition text-sm font-semibold"
            >
              {t.resetFilter}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((p, i) => {
              const title = typeof p.title === "object" ? p.title.en : p.title;
              const desc = typeof p.desc === "object" ? p.desc.en : p.desc;
              const type = typeof p.type === "object" ? p.type.en : p.type;
              const imgH = IMG_H_BY_TYPE(type);

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`relative rounded-2xl overflow-hidden border transition-all ${
                    isDark
                      ? "bg-white/6 border-white/10 hover:bg-white/[0.10] hover:border-white/20"
                      : "bg-white border-gray-200 hover:border-[#00ccb0]/40 hover:shadow-[0_8px_25px_-10px_rgba(0,200,180,0.25)]"
                  }`}
                >
                  {p.premium && (
                    <span className="absolute top-3 right-3 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[11px] font-semibold px-2 py-1 rounded-full shadow">
                      Premium
                    </span>
                  )}

                  <div className="w-full overflow-hidden" style={{ height: imgH }}>
                    <img src={p.img} alt={title} className="w-full h-full object-cover opacity-95" />
                  </div>

                  <div className="p-5">
                    <div
                      className={`flex items-center gap-2 text-[11px] mb-2 ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border ${
                          isDark
                            ? "bg-white/10 border-white/10"
                            : "bg-gray-100 border-gray-300 text-gray-700"
                        }`}
                      >
                        <Home className="w-3.5 h-3.5" /> {type}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border ${
                          isDark
                            ? "bg-white/10 border-white/10"
                            : "bg-gray-100 border-gray-300 text-gray-700"
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5" /> {p.location}
                      </span>
                    </div>

                    <h3
                      className={`font-semibold leading-snug line-clamp-2 ${
                        isDark ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      {title}
                    </h3>

                    <p
                      className={`text-[13px] mt-1 line-clamp-2 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {desc}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[#00ccb0] font-bold">{p.price}</span>

                      <Link href={`en/property-list/${p.id}-${slugify(title)}`}>
                        <button className="px-4 py-2 rounded-lg border border-[#00ccb0] text-[#00ccb0] hover:bg-[#00ccb0]/10 transition text-sm font-semibold inline-flex items-center gap-2">
                          {t.viewDetail} <Building2 className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {filtered.length > itemsPerPage && (
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition ${
                  currentPage === 1
                    ? "text-gray-500 border-gray-300 cursor-not-allowed"
                    : "text-[#00ccb0] border-[#00ccb0] hover:bg-[#00ccb0]/10"
                }`}
              >
                <ArrowLeft className="w-4 h-4" /> {t.prev}
              </button>

              {[...Array(totalPages).keys()].map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p + 1)}
                  className={`px-4 py-2 rounded-lg border font-medium transition ${
                    currentPage === p + 1
                      ? "bg-[#00ccb0]/20 text-[#00ccb0] border-[#00ccb0] shadow"
                      : isDark
                      ? "border-white/10 hover:bg-white/5 text-gray-300"
                      : "border-gray-300 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {p + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition ${
                  currentPage === totalPages
                    ? "text-gray-500 border-gray-300 cursor-not-allowed"
                    : "text-[#00ccb0] border-[#00ccb0] hover:bg-[#00ccb0]/10"
                }`}
              >
                {t.next} <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t.page} <span className="font-semibold">{currentPage}</span> {t.of}{" "}
              <span className="font-semibold">{totalPages}</span>
            </p>
          </div>
        )}
      </div>

      {/* Glow */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: isDark ? 0.12 : 0.08 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute right-10 bottom-10 w-96 h-96 bg-[#00bca6] rounded-full blur-[120px]"
      />
    </main>
  );
}
