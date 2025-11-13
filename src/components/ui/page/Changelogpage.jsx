"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Clock, Sparkles, CheckCircle2, AlertTriangle } from "lucide-react";

export default function ChangelogPage() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("id");

  /* ----------------------------------------
     DETECT DARK MODE
  ---------------------------------------- */
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

  /* ----------------------------------------
     DETECT LANGUAGE (ID/EN)
  ---------------------------------------- */
  useEffect(() => {
    const loadLang = () => setLang(localStorage.getItem("lang") || "id");

    loadLang();
    window.addEventListener("languageChange", loadLang);

    return () => window.removeEventListener("languageChange", loadLang);
  }, []);

  /* ----------------------------------------
     BILINGUAL CONTENT
  ---------------------------------------- */
  const data = {
    id: {
      title: "Catatan Perubahan",
      subtitle: "Dokumentasi versi dan perkembangan fitur Namura Property.",
      sectionPending: "Dalam Pengembangan",
      changelog: [
        {
          version: "v0.0.1",
          date: "12 November 2025",
          highlights: [
            "Rilis Awal (Beta)",
            "Mode Gelap 🌙",
            "Mode Ganti Bahasa 🌐",
          ],
          details: [
            "Menambahkan tampilan awal website Namura Property.",
            "Fitur Mode Gelap otomatis mendeteksi preferensi sistem pengguna.",
            "Menambahkan opsi pergantian bahasa (🇮🇩 / 🇬🇧).",
            "Menampilkan menu utama: Carikan Properti, Iklankan Properti, Cari Agen, dan Promo Properti.",
            "Menambahkan halaman Panduan, Tentang, dan Kontak.",
          ],
          pending: [
            "Login belum berfungsi (masih statis).",
            "Promo Properti, Tanya Forum, dan menu lainnya belum aktif.",
            "Beberapa fitur interaktif masih dalam tahap pengembangan.",
          ],
        },
      ],
    },

    en: {
      title: "Changelog",
      subtitle:
        "Version history and feature development log for Namura Property.",
      sectionPending: "In Development",
      changelog: [
        {
          version: "v0.0.1",
          date: "November 12, 2025",
          highlights: [
            "Initial Release (Beta)",
            "Dark Mode 🌙",
            "Language Switcher 🌐",
          ],
          details: [
            "Added initial Namura Property website layout.",
            "Dark Mode now detects user’s system theme automatically.",
            "Added bilingual option (🇮🇩 / 🇬🇧).",
            "Introduced main menus: Find Property, Advertise Property, Find Agent, and Property Promo.",
            "Added informational pages: Guide, About, and Contact.",
          ],
          pending: [
            "Login feature not functional yet (static).",
            "Promo Property, Forum, and other menus are not yet available.",
            "Some interactive features are still in development.",
          ],
        },
      ],
    },
  };

  const text = data[lang];
  const changelog = text.changelog;

  /* ----------------------------------------
     RENDER PAGE
  ---------------------------------------- */
  return (
    <main
      className={`min-h-screen pt-28 md:pt-32 pb-28 transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-white text-[#1f2937]"
      }`}
    >
      {/* HERO SECTION */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isDark ? 0.14 : 0.1 }}
          transition={{ duration: 1.2 }}
          className="absolute -top-16 left-10 w-72 h-72 bg-[#00ccb0] rounded-full blur-[120px]"
        />

        <div className="max-w-5xl mx-auto px-6 md:px-8 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-5xl font-black tracking-tight mb-5 ${
              isDark
                ? "bg-gradient-to-r from-[#00ccb0] to-[#00e3b5] bg-clip-text text-transparent"
                : "text-[#00a48f]"
            }`}
          >
            {text.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className={`max-w-2xl mx-auto leading-relaxed text-lg ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {text.subtitle}
          </motion.p>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 mt-20 relative">
        <div
          className={`hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px ${
            isDark ? "bg-white/10" : "bg-gray-200"
          }`}
        />

        <div className="space-y-16 md:space-y-20">
          {changelog.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-6 md:gap-10 items-start relative"
            >
              {/* LEFT SIDE */}
              <div className={`md:text-right ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] border ${
                    isDark
                      ? "bg-white/5 border-white/10 text-gray-300"
                      : "bg-gray-50 border-gray-200 text-gray-700"
                  }`}
                >
                  <Clock className="w-4 h-4 text-[#00ccb0]" /> {log.date}
                </div>

                <h3
                  className={`mt-3 font-semibold text-xl ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {log.version}
                </h3>

                <ul className="mt-3 space-y-1.5">
                  {log.highlights.map((h, idx) => (
                    <li
                      key={idx}
                      className={`flex items-center gap-2 text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-[#00ccb0]" /> {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* RIGHT SIDE */}
              <div className={`relative ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <div className="hidden md:block absolute left-[-1.1rem] top-2 w-2.5 h-2.5 rounded-full bg-[#00ccb0] shadow-[0_0_24px_rgba(0,204,176,0.5)]" />

                <div
                  className={`rounded-2xl border p-5 transition backdrop-blur-xl ${
                    isDark
                      ? "border-white/10 bg-white/5 hover:border-white/20"
                      : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <ul className="space-y-2">
                    {log.details.map((d, j) => (
                      <li
                        key={j}
                        className={`flex items-start gap-2 text-sm leading-relaxed ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#00ccb0]" /> {d}
                      </li>
                    ))}

                    {/* Pending Items */}
                    {log.pending && log.pending.length > 0 && (
                      <>
                        <hr
                          className={`my-3 ${
                            isDark ? "border-white/10" : "border-gray-200"
                          }`}
                        />

                        <p
                          className={`text-xs uppercase font-semibold tracking-wide mb-2 ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {text.sectionPending}
                        </p>

                        {log.pending.map((p, k) => (
                          <li
                            key={k}
                            className={`flex items-start gap-2 text-sm leading-relaxed ${
                              isDark ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            <AlertTriangle className="w-4 h-4 mt-0.5 text-yellow-400" />{" "}
                            {p}
                          </li>
                        ))}
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
