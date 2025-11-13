"use client";

import { useEffect, useState } from "react";

export default function FooterEN() {
  const [isDark, setIsDark] = useState(false);
  const [status, setStatus] = useState("Online");

  // THEME WATCHER
  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const t = {
    desc: "A modern property portal to help you find your ideal home easily and quickly.",
    address: "South Jakarta, Indonesia",
    nav: ["Home", "Featured", "Articles", "Find Agent", "Contact"],
    navTitle: "Navigation",
    socialTitle: "Connect",
    socialDesc: "Follow Namura Property for updates.",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
    disclaimer: "Disclaimer",
    cookies: "Cookie Policy",
    changelog: "Changelog",
    status: "Site Status",
    online: "Online",
    rights: "All rights reserved.",
  };

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
              src={isDark ? "/NP TP G S.svg" : "/NP TP G S.svg"}
              alt="Namura Property"
              className="w-9 h-9"
            />
            <span className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              Namura Property
            </span>
          </div>

          <p className="text-sm leading-relaxed">{t.desc}</p>

          <p className="text-sm mt-4">
            <strong className={isDark ? "text-white" : "text-gray-900"}>Address:</strong>{" "}
            {t.address}
          </p>

          {/* Changelog */}
          <div className="mt-5 flex items-center gap-3 text-sm">
            <a
              href="en/changelog"
              className={`inline-flex items-center gap-1 font-medium transition-colors ${
                isDark ? "text-[#00ccb0]" : "text-[#009e8e]"
              }`}
            >
              <i className="bi bi-journal-text"></i> {t.changelog}
            </a>

            <span className="text-gray-500">•</span>

            <a
              href="/en/status"
              className={`inline-flex items-center gap-1 font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <i className="bi bi-circle-fill text-green-400 text-[10px]"></i> {t.status}: {t.online}
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

        {/* Social */}
        <div>
          <h4 className={`font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>{t.socialTitle}</h4>
          <p className="text-sm mb-4">{t.socialDesc}</p>

          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/namurapropertyy/"
              target="_blank"
              className={`w-9 h-9 flex items-center justify-center rounded-full border ${
                isDark
                  ? "border-white/10 text-gray-300"
                  : "border-gray-300 text-gray-700"
              }`}
            >
              <i className="bi bi-instagram text-lg"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Legal */}
      <div className="mt-10 flex flex-wrap gap-6 text-sm justify-center">
        <a href="/en/terms" className="hover:text-[#00ccb0]">{t.terms}</a>
        <a href="/en/privacy" className="hover:text-[#00ccb0]">{t.privacy}</a>
        <a href="/en/disclaimer" className="hover:text-[#00ccb0]">{t.disclaimer}</a>
        <a href="/en/cookies" className="hover:text-[#00ccb0]">{t.cookies}</a>
      </div>

      <div
        className={`mt-12 pt-6 border-t text-center text-sm ${
          isDark ? "border-white/10" : "border-gray-200"
        }`}
      >
        © 2025{" "}
        <strong className={isDark ? "text-white" : "text-gray-900"}>Namura Property</strong>.{" "}
        {t.rights}
      </div>
    </footer>
  );
}
