"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Instagram, Circle } from "lucide-react";

export default function FooterEN() {
  const [isDark, setIsDark] = useState(false);

  // THEME WATCHER
  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    check();

    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const t = {
    desc: "A modern property portal designed to help you find your ideal home easily and quickly.",
    address: "Bunga Merak Street No. 03 Perumnas Way Kandis, Bandar Lampung, Indonesia"
    navTitle: "Navigation",
    nav: [
      { name: "Home", link: "/en" },
      { name: "Featured", link: "/en/recommendations" },
      { name: "Articles", link: "/en/articles" },
      { name: "Find Agent", link: "/en/find-agent" },
      { name: "Contact", link: "/en/contact" },
    ],
    socialTitle: "Connect",
    socialDesc: "Follow Namura Property for updates.",
    changelog: "Changelog",
    status: "Site Status",
    online: "Online",
    rights: "All rights reserved.",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
    disclaimer: "Disclaimer",
    cookies: "Cookie Policy",
  };

  return (
    <footer
      className={`relative overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-gray-400" : "bg-white text-gray-600"
      } pt-20 pb-12 border-t ${
        isDark ? "border-white/10" : "border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-3 gap-12">

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <img
              src={isDark ? "/NP TP S.svg" : "/NP TP G S.svg"}
              alt="Namura Property"
              className="w-9 h-9"
            />
            <span
              className={`text-lg font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Namura Property
            </span>
          </div>

          <p className="text-sm leading-relaxed">{t.desc}</p>

          <p className="text-sm mt-4">
            <strong className={isDark ? "text-white" : "text-gray-900"}>
              Address:
            </strong>{" "}
            {t.address}
          </p>

          {/* CHANGELOG + STATUS */}
          <div className="mt-5 flex items-center gap-3 text-sm">
            <Link
              href="/en/changelog"
              className={`inline-flex items-center gap-1 font-medium transition-colors ${
                isDark ? "text-[#00ccb0]" : "text-[#009e8e]"
              }`}
            >
              {t.changelog}
            </Link>

            <span className="text-gray-500">•</span>

            <Link
              href="/en/status"
              className={`inline-flex items-center gap-1 font-medium ${
                isDark ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <Circle className="w-2.5 h-2.5 text-green-400 fill-green-400" />
              {t.status}: {t.online}
            </Link>
          </div>
        </div>

        {/* NAVIGATION */}
        <div>
          <h4
            className={`font-semibold mb-3 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t.navTitle}
          </h4>

          <ul className="space-y-2 text-sm">
            {t.nav.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.link}
                  className={`hover:text-[#00ccb0] transition-colors ${
                    isDark ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h4
            className={`font-semibold mb-3 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t.socialTitle}
          </h4>

          <p className="text-sm mb-4">{t.socialDesc}</p>

          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/namurapropertyy/"
              target="_blank"
              className={`w-9 h-9 flex items-center justify-center rounded-full border transition ${
                isDark
                  ? "border-white/10 text-gray-300 hover:bg-white/10"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* LEGAL LINKS */}
      <div className="mt-10 flex flex-wrap gap-6 text-sm justify-center">
        <Link
          href="/en/terms"
          className="hover:text-[#00ccb0] transition-colors"
        >
          {t.terms}
        </Link>
        <Link
          href="/en/privacy"
          className="hover:text-[#00ccb0] transition-colors"
        >
          {t.privacy}
        </Link>
        <Link
          href="/en/disclaimer"
          className="hover:text-[#00ccb0] transition-colors"
        >
          {t.disclaimer}
        </Link>
        <Link
          href="/en/cookies"
          className="hover:text-[#00ccb0] transition-colors"
        >
          {t.cookies}
        </Link>
      </div>

      {/* COPYRIGHT */}
      <div
        className={`mt-12 pt-6 border-t text-center text-sm ${
          isDark ? "border-white/10" : "border-gray-200"
        }`}
      >
        © 2025{" "}
        <strong className={isDark ? "text-white" : "text-gray-900"}>
          Namura Property
        </strong>
        . {t.rights}
      </div>
    </footer>
  );
}
