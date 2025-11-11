"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import { propertiesData } from "@/data/propertiesData";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState("id");
  const [q, setQ] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef(null);

  // 🌗 INIT THEME
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark =
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  // 🌙 TOGGLE THEME
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // 🌐 LANGUAGE
  useEffect(() => {
    const saved = localStorage.getItem("lang") || "id";
    setLang(saved);
  }, []);
  const toggleLang = () => {
    const nl = lang === "id" ? "en" : "id";
    setLang(nl);
    localStorage.setItem("lang", nl);
  };

  // 👤 USER
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(saved);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // 🧭 SCROLL
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      searchPH: "Cari judul properti…",
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
      searchPH: "Search property title…",
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

  // 🔍 SEARCH LOGIC
  const suggestions = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return propertiesData
      .filter((p) => p.title.toLowerCase().includes(s))
      .slice(0, 8);
  }, [q]);

  useEffect(() => {
    if (showSearch) {
      const id = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(id);
    }
  }, [showSearch]);

  const slugify = (s) =>
    (s || "")
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  const dynamicStyle = {
    background: "var(--background)",
    color: "var(--foreground)",
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled
          ? "backdrop-blur-xl border-b border-gray-200 dark:border-[#1f2630] shadow-sm"
          : "border-b border-gray-100 dark:border-[#1f2630]"
      }`}
      style={dynamicStyle}
    >
      {/* === TOP BAR === */}
      <div className="w-full transition-colors duration-300" style={dynamicStyle}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-2">
          {/* Left Controls */}
          <div className="flex items-center gap-2">
            {/* Language Button */}
            <button
              onClick={toggleLang}
              className="px-2.5 py-1 rounded-md border text-xs font-semibold transition-colors duration-200
                bg-gray-50 border-gray-300 text-gray-800 hover:bg-gray-100
                dark:bg-white/5 dark:border-white/15 dark:text-gray-100 dark:hover:bg-white/10 shadow-sm"
            >
              {lang.toUpperCase()}
            </button>

            {/* Theme Button */}
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9, rotate: 15 }}
              className="px-2.5 py-1 rounded-md border text-xs font-semibold transition-colors duration-200
                bg-gray-50 border-gray-300 text-gray-800 hover:bg-gray-100
                dark:bg-white/5 dark:border-white/15 dark:text-gray-100 dark:hover:bg-white/10 shadow-sm"
            >
              {isDark ? "🌙" : "☀️"}
            </motion.button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-md border transition-colors duration-200
                bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100
                dark:bg-white/5 dark:border-white/15 dark:text-gray-200 dark:hover:bg-white/10 shadow-sm"
            >
              <SearchIcon className="w-4 h-4" />
            </button>

            {/* Login Button */}
            <Link
              href="/login"
              className={`hidden sm:inline-flex px-4 py-1.5 rounded-lg border text-sm font-semibold transition ${
                isDark
                  ? "border-[#00ccb0] text-[#00ccb0] hover:bg-[#00ccb0]/10"
                  : "border-[#009e8e] text-[#009e8e] hover:bg-[#009e8e]/10"
              }`}
            >
              {t.login}
            </Link>

            {user && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg border text-xs transition
                border-gray-300 hover:bg-gray-100 text-gray-700
                dark:border-white/15 dark:text-gray-200 dark:hover:bg-white/5"
              >
                {t.out}
              </button>
            )}

            {/* Mobile Menu */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="ml-1 sm:hidden px-2 py-1.5 rounded-lg border transition
                bg-gray-50 border-gray-300 hover:bg-gray-100 text-gray-700
                dark:bg-white/5 dark:border-white/15 dark:text-gray-200 dark:hover:bg-white/10 shadow-sm"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* === MAIN BAR === */}
      <div
        className="w-full border-t border-gray-200 dark:border-[#1f2630] transition-colors duration-300"
        style={dynamicStyle}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-3">
          {/* Adaptive Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.img
              src={isDark ? "/NP TP S.svg" : "/NP TP G S.svg"}
              alt="Namura Logo"
              className="w-9 h-9 transition-all duration-300"
              whileHover={{ rotate: 10, scale: 1.05 }}
            />
            <span className="font-semibold text-lg group-hover:text-[#01bba4] transition">
              Namura Property
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative transition ${
                    active
                      ? "text-[#01bba4]"
                      : "text-gray-700 dark:text-gray-300 hover:text-[#00ccb0]"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="activeMain"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#01bba4] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Pasang Iklan */}
          <button
            disabled
            className={`hidden md:inline-flex relative px-4 py-2 rounded-xl border text-sm font-semibold cursor-not-allowed transition ${
              isDark
                ? "border-gray-600 text-gray-400 bg-gray-800/50"
                : "border-gray-300 text-gray-500 bg-gray-100"
            }`}
          >
            {t.post}
            <span className="absolute top-[-8px] right-[-8px] text-[10px] bg-yellow-500 text-black px-1.5 py-[1px] rounded-md font-semibold">
              Coming Soon
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
