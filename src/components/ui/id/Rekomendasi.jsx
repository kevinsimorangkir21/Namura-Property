"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { BedDouble, Bath, Ruler, ChevronLeft, ChevronRight } from "lucide-react";
import { propertiesData } from "@/data/propertiesData";
import Link from "next/link";
import { slugify } from "@/utils/slugify";
import { getLocalizedText } from "@/utils/getLocalizedText";

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const normalize = (v) => (!v || v === "-" ? "—" : v);

export default function Rekomendasi() {
  const [items, setItems] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const ref = useRef(null);

  // Load property list
  useEffect(() => {
    const premium = propertiesData.filter((p) => p.premium);
    const nonPremium = propertiesData.filter((p) => !p.premium);
    const final = [...premium, ...shuffle(nonPremium)].slice(0, 8);
    setItems(final);
  }, []);

  // Theme detection
  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);

    const obs = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    obs.observe(document.documentElement, { attributes: true });
    return () => obs.disconnect();
  }, []);

  const loading = useMemo(() => items.length === 0, [items]);
  const scrollLeft = () => ref.current?.scrollBy({ left: -350, behavior: "smooth" });
  const scrollRight = () => ref.current?.scrollBy({ left: 350, behavior: "smooth" });

  return (
    <section
      className={`relative overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-white text-[#1f2937]"
      } py-11`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
          <div>
            <h2 className={`text-[28px] md:text-[34px] font-bold tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
              Rekomendasi Sesuai Pencarianmu
            </h2>

            <p className={`text-sm md:text-base mt-1 max-w-lg ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              Pilihan properti yang dikurasi berdasarkan preferensi pencarianmu dan tren area terkait.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/listing">
              <button
                className={`px-3 py-2 rounded-lg border text-sm font-medium transition ${
                  isDark
                    ? "border-white/15 bg-white/5 hover:bg-white/10 text-white"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100 bg-white"
                }`}
              >
                Lihat Selengkapnya
              </button>
            </Link>

            <button
              onClick={scrollLeft}
              className={`w-9 h-9 flex items-center justify-center rounded-full border transition ${
                isDark ? "border-white/20 bg-white/5 hover:bg-white/10"
                       : "border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-600"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={scrollRight}
              className={`w-9 h-9 flex items-center justify-center rounded-full border transition ${
                isDark ? "border-white/20 bg-white/5 hover:bg-white/10"
                       : "border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-600"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Property Scroll */}
        <div ref={ref} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x">
          {(loading ? Array.from({ length: 8 }) : items).map((p, i) => (
            <motion.div
              key={p?.id ?? i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.05 }}
              className={`min-w-[280px] snap-start rounded-2xl overflow-hidden border transition-all cursor-pointer ${
                isDark
                  ? "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/7 hover:shadow-[0_0_25px_-6px_rgba(0,255,255,.35)]"
                  : "bg-white border-gray-200 hover:border-teal-300 hover:shadow-[0_6px_25px_-8px_rgba(0,200,180,0.3)]"
              }`}
            >
              <div className="relative w-full h-[180px]">
                {p?.img ? (
                  <img src={p.img} className="w-full h-full object-cover opacity-95" />
                ) : (
                  <div className={`${isDark ? "bg-white/10" : "bg-gray-200"} w-full h-full animate-pulse`} />
                )}
              </div>

              <div className="p-4">
                <div className="text-[17px] font-bold text-[#00ccb0] mb-1">
                  {p?.price ?? "Rp —"}
                </div>

                <div className={`${isDark ? "text-gray-200" : "text-gray-800"} font-semibold text-[14px] mb-1 line-clamp-2`}>
                  {getLocalizedText(p?.title, "id")}
                </div>

                <div className={`${isDark ? "text-gray-400" : "text-gray-500"} text-[12px] mb-3 line-clamp-1`}>
                  {getLocalizedText(p?.address ?? p?.location, "id")}
                </div>

                <div className={`${isDark ? "text-gray-400/85" : "text-gray-600"} text-[12px] flex items-center gap-3`}>
                  <span className="inline-flex items-center gap-1.5">
                    <BedDouble className="w-4 h-4" /> {normalize(p?.details?.kamarTidur)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Bath className="w-4 h-4" /> {normalize(p?.details?.kamarMandi)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Ruler className="w-4 h-4" /> {normalize(p?.details?.luasTanah)}
                  </span>
                </div>

                {p?.id && (
                  <Link href={`/listing/${p.id}-${slugify(getLocalizedText(p?.title, "id"))}`}>
                    <div className="mt-3 text-[#00ccb0] text-[12px] hover:underline">
                      Lihat Detail →
                    </div>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
