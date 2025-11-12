"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  ArrowRight,
  Building2,
} from "lucide-react";

export default function Contact() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("id");

  // 🌙 Deteksi mode dark/light
  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // 🌐 Deteksi bahasa
  useEffect(() => {
    const loadLang = () => setLang(localStorage.getItem("lang") || "id");
    loadLang();
    window.addEventListener("languageChange", loadLang);
    return () => window.removeEventListener("languageChange", loadLang);
  }, []);

  return (
    <main
      className={`min-h-screen pt-28 md:pt-32 pb-28 transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-white text-[#1f2937]"
      }`}
    >
      {/* HERO */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isDark ? 0.18 : 0.1 }}
          transition={{ duration: 1.4 }}
          className="absolute -top-14 right-10 w-72 h-72 bg-[#00bca6] rounded-full blur-[120px]"
        />

        <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-5xl font-black tracking-tight mb-5 ${
              isDark
                ? "bg-gradient-to-r from-[#01907a] to-[#00d6b9] bg-clip-text text-transparent"
                : "text-[#00a48f]"
            }`}
          >
            {lang === "id" ? "Hubungi Kami" : "Contact Us"}
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
              ? "Silakan hubungi tim kami untuk bantuan, klarifikasi, atau dukungan terkait informasi listing, proses transaksi, dan kerja sama."
              : "Feel free to reach out to our team for assistance, clarification, or support related to listings, transactions, and partnerships."}
          </motion.p>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 mt-20 grid md:grid-cols-3 gap-7">
        <Card
          icon={<Mail className="w-6 h-6 text-[#00ccb0]" />}
          title={lang === "id" ? "Email Resmi" : "Official Email"}
          isDark={isDark}
        >
          namurapropertyy@gmail.com
        </Card>

        <Card
          icon={<Phone className="w-6 h-6 text-[#00ccb0]" />}
          title={lang === "id" ? "Tim Support" : "Support Team"}
          isDark={isDark}
        >
          +62 822-8251-2619
        </Card>

        <Card
          icon={<MessageSquare className="w-6 h-6 text-[#00ccb0]" />}
          title="WhatsApp"
          isDark={isDark}
        >
          +62 822-8251-2619
        </Card>
      </section>

      {/* ADDRESS */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 mt-16 text-center">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border mb-3 ${
            isDark
              ? "bg-white/5 border-white/10 text-gray-300"
              : "bg-gray-50 border-gray-200 text-gray-600"
          }`}
        >
          <Building2 className="w-4 h-4 text-[#00ccb0]" />
          {lang === "id" ? "Kantor Operasional" : "Operational Office"}
        </div>
        <h3 className={`font-semibold text-xl mb-3 ${isDark ? "text-gray-200" : "text-gray-900"}`}>
          Bandar Lampung
        </h3>
        <p
          className={`text-sm max-w-sm mx-auto leading-relaxed ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Jl. Bunga Merak No. 03 Perumnas Way Kandis<br />
          Bandar Lampung – Indonesia
        </p>
      </section>

      {/* MAP PREVIEW */}
      <section
        className={`max-w-5xl mx-auto px-6 md:px-8 mt-16 grid md:grid-cols-2 gap-6 items-center rounded-2xl border p-5 ${
          isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
        }`}
      >
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-[#00ccb0] mb-2">
            <MapPin className="w-5 h-5" /> {lang === "id" ? "Peta & Arah" : "Map & Directions"}
          </h3>
          <p
            className={`text-sm mb-4 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {lang === "id"
              ? "Lihat lokasi kantor kami di Google Maps dan atur rute terbaik menuju lokasi."
              : "View our office location on Google Maps and plan your best route."}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.google.com/maps/place/Rumah+Kevins/@-5.3608898,105.2819202,849m/data=!3m2!1e3!4b1!4m6!3m5!1s0x2e40c583fc7fc6cd:0x6484f62c5d1dcea0!8m2!3d-5.3608952!4d105.2867911!16s%2Fg%2F11f7s_9mxy?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00ccb0] text-black hover:opacity-90 transition font-semibold text-sm"
            >
              {lang === "id" ? "Buka Google Maps" : "Open Google Maps"}{" "}
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://wa.me/6282282512619?text=Halo%20Namura%20Property%2C%20saya%20ingin%20atur%20janji%20kunjungan%20ke%20kantor."
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border font-semibold text-sm transition ${
                isDark
                  ? "border-[#00ccb0] text-[#00ccb0] hover:bg-white/5"
                  : "border-[#00a48f] text-[#00a48f] hover:bg-[#00ccb0]/10"
              }`}
            >
              {lang === "id" ? "Atur Janji via WA" : "Schedule via WhatsApp"}{" "}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div
          className={`rounded-2xl overflow-hidden border h-[260px] md:h-[280px] shadow-[0_0_20px_rgba(0,204,176,0.15)] ${
            isDark ? "border-white/10" : "border-gray-200"
          }`}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.0406044748653!2d105.2819202!3d-5.3608952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40c583fc7fc6cd%3A0x6484f62c5d1dcea0!2sRumah%20Kevins!5e0!3m2!1sid!2sid!4v1731310000000!5m2!1sid!2sid"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          ></iframe>
        </div>
      </section>
    </main>
  );
}

/* ====================== Card Component ====================== */
function Card({ icon, title, children, isDark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className={`rounded-2xl border p-5 text-center backdrop-blur-xl transition ${
        isDark
          ? "border-white/10 bg-white/5 hover:bg-white/7 hover:border-white/20"
          : "border-gray-200 bg-gray-50 hover:bg-gray-100"
      }`}
    >
      <div className="flex justify-center mb-3">{icon}</div>
      <h3 className={`font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{title}</h3>
      <div className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>{children}</div>
    </motion.div>
  );
}
