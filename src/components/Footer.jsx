"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [isDark, setIsDark] = useState(false);
  const [status, setStatus] = useState("Online");
  const [lang, setLang] = useState("id");

  // === TEMA ===
  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // === STATUS SIMULASI ===
  useEffect(() => {
    const timeout = setTimeout(() => setStatus("Online"), 600);
    return () => clearTimeout(timeout);
  }, []);

  // === BAHASA ===
  useEffect(() => {
    const loadLang = () => setLang(localStorage.getItem("lang") || "id");
    loadLang();
    window.addEventListener("languageChange", loadLang);
    return () => window.removeEventListener("languageChange", loadLang);
  }, []);

  const t = {
    id: {
      desc: "Portal properti modern untuk memudahkan kamu menemukan hunian terbaik masa kini.",
      address: "JL Bunga Merak No. 03 Perumnas Way Kandis, Bandar Lampung, Indonesia",
      nav: ["Beranda", "Rekomendasi", "Artikel", "Cari Agen", "Kontak"],
      navTitle: "Navigasi",
      socialTitle: "Terhubung",
      socialDesc: "Ikuti update terbaru dari Namura Property.",
      terms: "Syarat & Ketentuan",
      privacy: "Kebijakan Privasi",
      disclaimer: "Disclaimer",
      cookies: "Kebijakan Cookie",
      changelog: "Catatan Versi",
      status: "Status Situs",
      online: "Online",
      version: "Versi",
      rights: "Hak cipta dilindungi.",
    },
    en: {
      desc: "A modern property portal to help you find your ideal home easily and quickly.",
      address: "South Jakarta, Indonesia",
      nav: ["Home", "Featured", "Articles", "Find Agent", "Contact"],
      navTitle: "Navigation",
      socialTitle: "Connect",
      socialDesc: "Follow Namura Property for the latest updates.",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      disclaimer: "Disclaimer",
      cookies: "Cookie Policy",
      changelog: "Changelog",
      status: "Site Status",
      online: "Online",
      version: "Version",
      rights: "All rights reserved.",
    },
  }[lang];

  const version = "v0.0.1";

  return (
    <footer
      className={`relative overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-gray-400" : "bg-[#ffffff] text-gray-600"
      } pt-20 pb-12 border-t ${isDark ? "border-white/10" : "border-gray-200"}`}
    >
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <img
              src={isDark ? "/NP TP S.svg" : "/NP TP Light.svg"}
              alt="Namura Property"
              className="w-9 h-9"
            />
            <span className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              Namura Property
            </span>
          </div>

          <p className="text-sm leading-relaxed">{t.desc}</p>

          <p className="text-sm mt-4">
            <strong className={isDark ? "text-white" : "text-gray-900"}>Alamat:</strong> {t.address}
          </p>

          {/* Changelog & Status */}
          <div className="mt-5 flex items-center gap-3 text-sm">
            <a
              href="/changelog"
              className={`inline-flex items-center gap-1 font-medium transition-colors ${
                isDark
                  ? "text-[#00ccb0] hover:text-[#00b9a0]"
                  : "text-[#00a48f] hover:text-[#008579]"
              }`}
            >
              <i className="bi bi-journal-text"></i> {t.changelog}
            </a>

            <span className="text-gray-500">•</span>

            <a
              href="/status"
              className={`inline-flex items-center gap-1 font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              } hover:text-[#00ccb0] transition-colors`}
            >
              <i
                className={`bi bi-circle-fill text-[10px] ${
                  status === "Online" ? "text-green-400" : "text-red-500"
                }`}
              ></i>{" "}
              {t.status}: {t.online}
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className={`font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
            {t.navTitle}
          </h4>
          <ul className="space-y-2 text-sm">
            {t.nav.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className={`hover:text-[#00ccb0] transition-colors ${
                    isDark ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className={`font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
            {t.socialTitle}
          </h4>
          <p className="text-sm mb-4">{t.socialDesc}</p>
          <div className="flex gap-4">
            {[
              { icon: "instagram", url: "https://www.instagram.com/namurapropertyy/" },
            ].map(({ icon, url }) => (
              <a
                key={icon}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300 ${
                  isDark
                    ? "border-white/10 hover:bg-[#00ccb0]/20 hover:border-[#00ccb0] text-gray-300 hover:text-[#00ccb0]"
                    : "border-gray-300 hover:bg-[#00ccb0]/10 hover:border-[#00ccb0] text-gray-700 hover:text-[#00a48f]"
                }`}
              >
                <i className={`bi bi-${icon} text-lg`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Legal Links */}
      <div
        className={`mt-10 flex flex-wrap gap-6 text-sm justify-center text-center ${
          isDark ? "text-gray-500" : "text-gray-600"
        }`}
      >
        <a href="/terms" className="hover:text-[#00ccb0] transition-colors">
          {t.terms}
        </a>
        <a href="/privacy" className="hover:text-[#00ccb0] transition-colors">
          {t.privacy}
        </a>
        <a href="/disclaimer" className="hover:text-[#00ccb0] transition-colors">
          {t.disclaimer}
        </a>
        <a href="/cookies" className="hover:text-[#00ccb0] transition-colors">
          {t.cookies}
        </a>
      </div>

      {/* Footer Bottom */}
      <div
        className={`mt-12 pt-6 border-t text-center text-sm ${
          isDark ? "border-white/10 text-gray-500" : "border-gray-200 text-gray-500"
        }`}
      >
        © 2025{" "}
        <strong className={isDark ? "text-white" : "text-gray-900"}>Namura Property</strong>.{" "}
        {t.rights}
      </div>
    </footer>
  );
}
