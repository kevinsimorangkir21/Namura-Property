"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Tag, Building2, Percent, ArrowRight, Gift } from "lucide-react";

export default function PropertyPromotionsPage() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("id");

  // 🌓 Deteksi Mode Gelap
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  // 🌐 Deteksi Bahasa
  useEffect(() => {
    const loadLang = () => setLang(localStorage.getItem("lang") || "id");
    loadLang();
    window.addEventListener("languageChange", loadLang);
    return () => window.removeEventListener("languageChange", loadLang);
  }, []);

  const promos = [
    {
      title_id: "Diskon Biaya Iklan 50%",
      title_en: "50% Off Advertising Fee",
      desc_id:
        "Promosi khusus untuk agen dan developer baru! Dapatkan potongan biaya pasang iklan hingga 50% di Namura Property.",
      desc_en:
        "Special offer for new agents and developers! Get up to 50% off advertising fees on Namura Property.",
      tag: "Limited Offer",
      image: "/promo/iklan50.png",
    },
    {
      title_id: "Bunga KPR Spesial 4.5% dari Bank Mandiri",
      title_en: "Special KPR Interest 4.5% by Bank Mandiri",
      desc_id:
        "Nikmati suku bunga rendah untuk pembelian properti baru melalui program kerja sama Namura x Bank Mandiri.",
      desc_en:
        "Enjoy a low interest rate for new property purchases via the Namura x Bank Mandiri partnership program.",
      tag: "KPR Promo",
      image: "/promo/kpr-mandiri.png",
    },
    {
      title_id: "Gratis Desain Banner Iklan",
      title_en: "Free Ad Banner Design",
      desc_id:
        "Upload properti kamu dan dapatkan layanan desain banner iklan gratis selama periode promo.",
      desc_en:
        "Upload your property and get a free ad banner design during the promo period.",
      tag: "Marketing Support",
      image: "/promo/banner-free.png",
    },
  ];

  return (
    <main
      className={`min-h-screen pt-28 md:pt-32 pb-28 transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-white text-[#1f2937]"
      }`}
    >
      {/* HERO */}
      <section className="relative text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isDark ? 0.14 : 0.1 }}
          transition={{ duration: 1.2 }}
          className="absolute -top-16 left-10 w-72 h-72 bg-[#00ccb0] rounded-full blur-[120px]"
        />

        <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-5xl font-black tracking-tight mb-4 ${
              isDark
                ? "bg-gradient-to-r from-[#00ccb0] to-[#00e3b5] bg-clip-text text-transparent"
                : "text-[#00a48f]"
            }`}
          >
            {lang === "id" ? "Promo Properti" : "Property Promotions"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className={`max-w-2xl mx-auto leading-relaxed text-lg ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {lang === "id"
              ? "Temukan berbagai promo menarik dari developer, agen, dan bank rekanan Namura Property."
              : "Discover exciting promotions from developers, agents, and partner banks through Namura Property."}
          </motion.p>
        </div>
      </section>

      {/* PROMO GRID */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {promos.map((promo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className={`rounded-2xl border overflow-hidden group transition-all cursor-pointer ${
              isDark
                ? "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                : "border-gray-200 bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <div className="relative w-full h-44 overflow-hidden">
              <img
                src={promo.image}
                alt={promo.title_id}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-3 py-1 text-[11px] font-semibold rounded-full bg-[#00ccb0]/90 text-black shadow">
                {promo.tag}
              </div>
            </div>

            <div className="p-5">
              <h3
                className={`font-semibold text-lg mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {lang === "id" ? promo.title_id : promo.title_en}
              </h3>
              <p
                className={`text-sm leading-relaxed mb-4 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {lang === "id" ? promo.desc_id : promo.desc_en}
              </p>

              <button
                disabled
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium text-sm ${
                  isDark
                    ? "bg-white/10 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Gift className="w-4 h-4" />
                {lang === "id" ? "Segera Hadir" : "Coming Soon"}
              </button>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 mt-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-sm ${
            isDark
              ? "border border-[#00ccb0] text-[#00ccb0] hover:bg-white/5"
              : "border border-[#00a48f] text-[#00a48f] hover:bg-[#00ccb0]/10"
          }`}
        >
          <Tag className="w-4 h-4" />
          {lang === "id"
            ? "Ajukan Promo atau Kerja Sama"
            : "Submit Your Promotion or Partnership"}
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </section>
    </main>
  );
}
