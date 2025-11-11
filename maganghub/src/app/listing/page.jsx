"use client";

import Link from "next/link";
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

const slugify = (s) =>
  (s || "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const IMG_H_BY_TYPE = (type) => {
  const t = (type || "").toLowerCase();
  if (t.includes("apart")) return 240;
  if (t.includes("town")) return 220;
  if (t.includes("rumah")) return 220;
  return 190;
};

const toDash = (v) => (!v || v === "-" ? "—" : v);
const normalizeLT = (lt) => {
  if (!lt || lt === "-") return "—";
  const s = String(lt).trim();
  return /m²/i.test(s) ? s : `${s} m²`;
};

export default function ListingProperti() {
  const [isDark, setIsDark] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Semua Lokasi");
  const [selectedType, setSelectedType] = useState("Semua Tipe");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // detect theme
  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const locations = useMemo(
    () => ["Semua Lokasi", ...Array.from(new Set(propertiesData.map((p) => p.location)))],
    []
  );
  const types = useMemo(
    () => ["Semua Tipe", ...Array.from(new Set(propertiesData.map((p) => p.type)))],
    []
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return propertiesData.filter((p) => {
      const matchTitle =
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        (p.address ?? "").toLowerCase().includes(q);
      const matchLoc = selectedLocation === "Semua Lokasi" || p.location === selectedLocation;
      const matchType = selectedType === "Semua Tipe" || p.type === selectedType;
      return matchTitle && matchLoc && matchType;
    });
  }, [search, selectedLocation, selectedType]);

  useEffect(() => setCurrentPage(1), [search, selectedLocation, selectedType]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const resetFilter = () => {
    setSearch("");
    setSelectedLocation("Semua Lokasi");
    setSelectedType("Semua Tipe");
  };

  return (
    <main
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-[#ffffff] text-[#1f2937]"
      } pt-28 pb-24`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h1 className={`text-3xl md:text-4xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>
              Listing Properti
            </h1>
            <div className="mt-2 h-1 w-28 rounded-full bg-gradient-to-r from-[#03a893] to-[#00e0c8] opacity-70" />
          </div>

          <div className="relative w-full md:w-[420px]">
            <Search
              className={`absolute left-3 top-3.5 w-5 h-5 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="Cari judul, alamat, atau lokasi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-10 pr-24 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#00ccb0] transition-all ${
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
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
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
              <option key={loc} value={loc} className="text-gray-900">
                {loc}
              </option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className={`px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#00ccb0] ${
              isDark
                ? "bg-white/8 border-white/10 text-gray-100"
                : "bg-gray-50 border-gray-300 text-gray-800"
            }`}
          >
            {types.map((t) => (
              <option key={t} value={t} className="text-gray-900">
                {t}
              </option>
            ))}
          </select>

          {(search || selectedLocation !== "Semua Lokasi" || selectedType !== "Semua Tipe") && (
            <button
              onClick={resetFilter}
              className={`px-4 py-3 rounded-xl border transition ${
                isDark
                  ? "bg-white/5 border-white/10 text-gray-200 hover:bg-white/10"
                  : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Reset
            </button>
          )}
        </div>

        {/* Cards */}
        {currentItems.length === 0 ? (
          <div className="text-center py-20">
            <div className={`text-lg font-semibold ${isDark ? "text-gray-200" : "text-gray-700"}`}>
              Tidak ada hasil yang cocok
            </div>
            <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Coba ubah kata kunci atau reset filter.
            </p>
            <button
              onClick={resetFilter}
              className="mt-5 px-4 py-2 rounded-lg border border-[#00bba4] text-[#00ccb0] hover:bg-[#00ccb0]/10 transition text-sm font-semibold"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((p, i) => {
              const imgH = IMG_H_BY_TYPE(p.type);
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
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover opacity-95" />
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
                        <Home className="w-3.5 h-3.5" /> {p.type}
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
                      {p.title}
                    </h3>
                    <p
                      className={`text-[13px] mt-1 line-clamp-2 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {p.desc}
                    </p>

                    {/* Meta */}
                    <div
                      className={`mt-3 text-[12px] flex items-center gap-4 ${
                        isDark ? "text-gray-300/90" : "text-gray-600"
                      }`}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <BedDouble className="w-4 h-4" /> {toDash(p.details?.kamarTidur)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Bath className="w-4 h-4" /> {toDash(p.details?.kamarMandi)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Ruler className="w-4 h-4" /> {normalizeLT(p.details?.luasTanah)}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[#00ccb0] font-bold">{p.price}</span>
                      <Link href={`/listing/${p.id}-${slugify(p.title)}`}>
                        <button className="px-4 py-2 rounded-lg border border-[#00ccb0] text-[#00ccb0] hover:bg-[#00ccb0]/10 transition text-sm font-semibold inline-flex items-center gap-2">
                          Lihat Detail <Building2 className="w-4 h-4" />
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
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition ${
                  currentPage === 1
                    ? "text-gray-500 border-gray-300 cursor-not-allowed"
                    : "text-[#00ccb0] border-[#00ccb0] hover:bg-[#00ccb0]/10"
                }`}
              >
                <ArrowLeft className="w-4 h-4" /> Prev
              </button>

              {[...Array(totalPages).keys()].map((p) => (
                <button
                  key={p}
                  onClick={() => changePage(p + 1)}
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
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition ${
                  currentPage === totalPages
                    ? "text-gray-500 border-gray-300 cursor-not-allowed"
                    : "text-[#00ccb0] border-[#00ccb0] hover:bg-[#00ccb0]/10"
                }`}
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Halaman <span className="font-semibold">{currentPage}</span> dari{" "}
              <span className="font-semibold">{totalPages}</span>
            </p>
          </div>
        )}
      </div>

      {/* Ambient */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: isDark ? 0.12 : 0.08 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute right-10 bottom-10 w-96 h-96 bg-[#00bca6] rounded-full blur-[120px]"
      />
    </main>
  );
}
