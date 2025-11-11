"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [isDark, setIsDark] = useState(false);
  const [status, setStatus] = useState("Online");

  // 🔍 Deteksi tema aktif
  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // 🟢 Simulasi status website (bisa dihubungkan dengan API status nyata)
  useEffect(() => {
    const timeout = setTimeout(() => setStatus("Online"), 600);
    return () => clearTimeout(timeout);
  }, []);

  const version = "v1.0.3"; // ⚙️ versi web kamu, bisa diambil dari package.json juga

  return (
    <footer
      className={`relative overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-gray-400" : "bg-[#ffffff] text-gray-600"
      } pt-20 pb-12 border-t ${
        isDark ? "border-white/10" : "border-gray-200"
      }`}
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
          <p className="text-sm leading-relaxed">
            Portal properti modern untuk memudahkan kamu menemukan hunian terbaik masa kini.
          </p>

          <p className="text-sm mt-4">
            <strong className={isDark ? "text-white" : "text-gray-900"}>Alamat:</strong>{" "}
            Jakarta Selatan, Indonesia
          </p>

          {/* 🔄 Changelog & Status */}
          <div className="mt-5 flex items-center gap-3 text-sm">
            <a
              href="/changelog"
              className={`inline-flex items-center gap-1 font-medium transition-colors ${
                isDark
                  ? "text-[#00ccb0] hover:text-[#00b9a0]"
                  : "text-[#00a48f] hover:text-[#008579]"
              }`}
            >
              <i className="bi bi-journal-text"></i> Changelog {version}
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
              {status}
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className={`font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
            Navigasi
          </h4>
          <ul className="space-y-2 text-sm">
            {["Home", "Rekomendasi", "Berita", "Cari Agen", "Kontak"].map((item) => (
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
            Terhubung
          </h4>
          <p className="text-sm mb-4">Ikuti update terbaru dari Namura Property.</p>
          <div className="flex gap-4">
            {[
              { icon: "twitter", url: "https://twitter.com" },
              { icon: "linkedin", url: "https://linkedin.com" },
              { icon: "instagram", url: "https://instagram.com" },
              { icon: "youtube", url: "https://youtube.com" },
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
          Terms & Conditions
        </a>
        <a href="/privacy" className="hover:text-[#00ccb0] transition-colors">
          Privacy Policy
        </a>
        <a href="/disclaimer" className="hover:text-[#00ccb0] transition-colors">
          Disclaimer
        </a>
        <a href="/cookies" className="hover:text-[#00ccb0] transition-colors">
          Cookie Policy
        </a>
      </div>

      {/* Footer Bottom */}
      <div
        className={`mt-12 pt-6 border-t text-center text-sm ${
          isDark ? "border-white/10 text-gray-500" : "border-gray-200 text-gray-500"
        }`}
      >
        © 2025{" "}
        <strong className={isDark ? "text-white" : "text-gray-900"}>Namura Property</strong>. All
        rights reserved.
      </div>
    </footer>
  );
}
