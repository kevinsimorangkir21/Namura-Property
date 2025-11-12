"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search as SearchIcon,
  Moon,
  Sun,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { propertiesData } from "@/data/propertiesData";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState("id");
  const [showSearch, setShowSearch] = useState(false);

  // === INIT THEME ===
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark =
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // === LANGUAGE ===
  useEffect(() => {
    const saved = localStorage.getItem("lang") || "id";
    setLang(saved);
  }, []);

  const toggleLang = () => {
  const nl = lang === "id" ? "en" : "id";
  setLang(nl);
  localStorage.setItem("lang", nl);
  window.dispatchEvent(new Event("languageChange")); // 👈 kirim event ke seluruh halaman
};


  // === USER ===
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(saved);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // === SCROLL ===
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // === TRANSLATION ===
  const t = {
    id: {
      home: "Beranda",
      listing: "Listing",
      dev: "Panduan",
      about: "Tentang",
      contact: "Kontak",
      login: "Masuk",
      out: "Keluar",
      post: "Pasang Iklan",
      article: "Artikel",
    },
    en: {
      home: "Home",
      listing: "Listing",
      dev: "Guides",
      about: "About",
      contact: "Contact",
      login: "Login",
      out: "Logout",
      post: "Post Listing",
      article: "Articles",
    },
  }[lang];

  const navLinks = [
    { href: "/", label: t.home },
    { href: "/artikel", label: t.article },
    { href: "/listing", label: t.listing },
    { href: "/panduan", label: t.dev },
    { href: "/tentang", label: t.about },
    { href: "/contact", label: t.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl border-b border-black/20 dark:border-white/10 shadow-sm"
          : "border-b border-transparent"
      } ${isDark ? "bg-[#0b0f15]/80" : "bg-white/80"}`}
    >
      {/* === TOP BAR === */}
      <div className="border-b border-black/20 dark:border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-2">
          <div className="flex items-center gap-2">
            {/* Language Button */}
            <button
              onClick={toggleLang}
              className={`px-2.5 py-1 rounded-md border text-xs font-semibold transition-colors duration-200
                ${
                  isDark
                    ? "bg-white/5 border-white/10 text-gray-100 hover:bg-white/10"
                    : "bg-gray-50 border-black/20 text-gray-800 hover:bg-gray-100"
                }`}
            >
              {lang.toUpperCase()}
            </button>

            {/* Theme Button */}
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9, rotate: 15 }}
              className={`px-2.5 py-1 rounded-md border text-xs font-semibold transition-colors duration-200
                ${
                  isDark
                    ? "bg-white/5 border-white/10 text-gray-100 hover:bg-white/10"
                    : "bg-gray-50 border-black/20 text-gray-800 hover:bg-gray-100"
                }`}
            >
              {isDark ? "🌙" : "☀️"}
            </motion.button>
          </div>

          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              onClick={() => setShowSearch(true)}
              className={`p-2 rounded-md border transition-colors duration-200
                ${
                  isDark
                    ? "bg-white/5 border-white/10 text-gray-200 hover:bg-white/10"
                    : "bg-gray-50 border-black/20 text-gray-700 hover:bg-gray-100"
                }`}
            >
              <SearchIcon className="w-4 h-4" />
            </button>

            {/* Login Button (Desktop only) */}
            {!user ? (
              <Link
                href="/login"
                className={`hidden sm:inline-flex px-4 py-1.5 rounded-lg border text-sm font-semibold transition
                  ${
                    isDark
                      ? "border-[#00ccb0] text-[#00ccb0] hover:bg-[#00ccb0]/10"
                      : "border-[#009e8e] text-[#009e8e] hover:bg-[#009e8e]/10"
                  }`}
              >
                {t.login}
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg border text-xs transition
                border-black/20 hover:bg-gray-100 text-gray-700
                dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/5 flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" /> {t.out}
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className={`ml-1 sm:hidden px-2 py-1.5 rounded-lg border transition
                ${
                  isDark
                    ? "bg-white/5 border-white/10 text-gray-200 hover:bg-white/10"
                    : "bg-gray-50 border-black/20 text-gray-700 hover:bg-gray-100"
                }`}
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* === MAIN BAR === */}
      <div className="border-t border-black/20 dark:border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.img
              src={isDark ? "/NP TP S.svg" : "/NP TP G S.svg"}
              alt="Namura Logo"
              className="w-9 h-9 transition-all duration-300 group-hover:scale-105"
              whileHover={{ rotate: 6 }}
            />
            <span className="font-semibold text-lg group-hover:text-[#00ccb0] transition">
              Namura Property
            </span>
          </Link>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative transition ${
                    active
                      ? "text-[#00ccb0]"
                      : "text-gray-700 dark:text-gray-300 hover:text-[#00ccb0]"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="activeMain"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#00ccb0] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Post Button (Desktop only) */}
          <button
            disabled
            className={`hidden md:inline-flex relative px-4 py-2 rounded-xl border text-sm font-semibold cursor-not-allowed transition
              ${
                isDark
                  ? "border-gray-600 text-gray-400 bg-gray-800/50"
                  : "border-black/20 text-gray-500 bg-gray-100"
              }`}
          >
            {t.post}
            <span className="absolute top-[-8px] right-[-8px] text-[10px] bg-yellow-500 text-black px-1.5 py-[1px] rounded-md font-semibold">
              Coming Soon
            </span>
          </button>
        </div>
      </div>

      {/* === MOBILE DROPDOWN === */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className={`md:hidden border-t border-black/20 dark:border-white/10 backdrop-blur-md ${
              isDark ? "bg-[#0b0f15]/95" : "bg-white/95"
            }`}
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition ${
                    pathname === link.href
                      ? "text-[#00ccb0] bg-white/5 dark:bg-white/5"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* LOGIN + POST Buttons for Mobile */}
              <div className="mt-4 flex flex-col gap-2 border-t border-black/20 dark:border-white/10 pt-4">
                {!user ? (
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className={`w-full text-center px-4 py-2 rounded-lg border text-sm font-semibold transition ${
                      isDark
                        ? "border-[#00ccb0] text-[#00ccb0] hover:bg-[#00ccb0]/10"
                        : "border-[#009e8e] text-[#009e8e] hover:bg-[#009e8e]/10"
                    }`}
                  >
                    {t.login}
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="w-full text-center px-4 py-2 rounded-lg border text-sm font-semibold transition border-black/20 text-gray-700 hover:bg-gray-100 dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/5"
                  >
                    {t.out}
                  </button>
                )}

                <button
                  disabled
                  className={`relative w-full px-4 py-2 rounded-xl border text-sm font-semibold cursor-not-allowed transition
                    ${
                      isDark
                        ? "border-gray-600 text-gray-400 bg-gray-800/50"
                        : "border-black/20 text-gray-500 bg-gray-100"
                    }`}
                >
                  {t.post}
                  <span className="absolute top-[-8px] right-[-8px] text-[10px] bg-yellow-500 text-black px-1.5 py-[1px] rounded-md font-semibold">
                    Coming Soon
                  </span>
                </button>
              </div>

              {/* Bottom Utility Buttons */}
              <div className="border-t border-black/20 dark:border-white/10 mt-4 pt-3 flex justify-between">
                <button
                  onClick={toggleLang}
                  className={`px-3 py-1.5 rounded-md border text-xs font-semibold transition ${
                    isDark
                      ? "bg-white/5 border-white/10 text-gray-100 hover:bg-white/10"
                      : "bg-gray-50 border-black/20 text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>

                <motion.button
                  onClick={toggleTheme}
                  whileTap={{ scale: 0.9 }}
                  className={`px-3 py-1.5 rounded-md border text-xs font-semibold transition ${
                    isDark
                      ? "bg-white/5 border-white/10 text-gray-100 hover:bg-white/10"
                      : "bg-gray-50 border-black/20 text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
