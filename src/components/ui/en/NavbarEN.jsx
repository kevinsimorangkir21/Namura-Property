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

export default function NavbarEN() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // INIT THEME
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark =
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleTheme = () => {
    const n = !isDark;
    setIsDark(n);
    localStorage.setItem("theme", n ? "dark" : "light");
    document.documentElement.classList.toggle("dark", n);
  };

  // INIT USER
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(saved);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // SCROLL EFFECT
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // HYDRATION FIX
  useEffect(() => setReady(true), []);
  if (!ready) return null;

  // LINKS — ENGLISH VERSION
  const navLinks = [
    { href: "/en", label: "Home" },
    { href: "/en/listing", label: "Listing" },
    { href: "/en/articles", label: "Articles" },
    { href: "/en/guides", label: "Guides" },
    { href: "/en/about", label: "About" },
    { href: "/en/contact", label: "Contact" },
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

            {/* LANG → SWITCH TO INDONESIA */}
            {/* LANG SWITCH */}
<div className="flex items-center gap-1 text-xs font-semibold">

  <Link
    href="/id"
    className={`
      px-2 py-1 rounded-md border transition
      ${isDark 
        ? "bg-white/5 border-white/10 text-gray-100 hover:bg-white/10"
        : "bg-gray-50 border-black/20 text-gray-800 hover:bg-gray-100"
      }
    `}
  >
    ID
  </Link>

  <span className="opacity-60">-</span>

  <span
    className={`
      px-2 py-1 rounded-md border
      ${isDark 
        ? "bg-[#00ccb0]/20 border-[#00ccb0]/40 text-[#00ccb0]" 
        : "bg-[#009e8e]/20 border-[#009e8e]/40 text-[#009e8e]"
      }
    `}
  >
    ENG
  </span>
</div>


            {/* THEME TOGGLE */}
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9, rotate: 15 }}
              className={`px-2.5 py-1 rounded-md border text-xs font-semibold transition 
              ${
                isDark
                  ? "bg-white/5 border-white/10 text-gray-100 hover:bg-white/10"
                  : "bg-gray-50 border-black/20 text-gray-800 hover:bg-gray-100"
              }`}
            >
              {isDark ? "🌙" : "☀️"}
            </motion.button>
          </div>

          {/* RIGHT TOOLS */}
          <div className="flex items-center gap-2">
            {/* SEARCH */}
            <button
              className={`p-2 rounded-md border transition
              ${
                isDark
                  ? "bg-white/5 border-white/10 text-gray-200 hover:bg-white/10"
                  : "bg-gray-50 border-black/20 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <SearchIcon className="w-4 h-4" />
            </button>

            {/* LOGIN */}
            {!user ? (
              <Link
                href="/en/login"
                className={`hidden sm:inline-flex px-4 py-1.5 rounded-lg border text-sm font-semibold transition 
                ${
                  isDark
                    ? "border-[#00ccb0] text-[#00ccb0] hover:bg-[#00ccb0]/10"
                    : "border-[#009e8e] text-[#009e8e] hover:bg-[#009e8e]/10"
                }`}
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg border text-xs transition 
                border-black/20 hover:bg-gray-100 text-gray-700 
                dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/5 flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
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

      {/* === MAIN NAV === */}
      <div className="border-t border-black/20 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/en" className="flex items-center gap-3 group">
            <motion.img
              src={isDark ? "/NP-TP-S.svg" : "/NP-TP-G-S.svg"}
              className="w-9 h-9 transition-all duration-300 group-hover:scale-105"
              whileHover={{ rotate: 6 }}
            />
            <span className="font-semibold text-lg group-hover:text-[#00ccb0] transition">
              Namura Property
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <nav className="hidden md:flex items-center gap-6 text-[15px] font-medium">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative whitespace-nowrap px-1 transition 
                    ${
                      active
                        ? "text-[#00ccb0]"
                        : "text-gray-700 dark:text-gray-300 hover:text-[#00ccb0]"
                    }`}
                >
                  {l.label}

                  {active && (
                    <motion.span
                      layoutId="activeEN"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#00ccb0] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* POST BUTTON */}
          <button
            disabled
            className={`hidden md:inline-flex relative px-4 py-2 rounded-xl border text-sm font-semibold cursor-not-allowed transition
            ${
              isDark
                ? "border-gray-600 text-gray-400 bg-gray-800/50"
                : "border-black/20 text-gray-500 bg-gray-100"
            }`}
          >
            Post Listing
            <span className="absolute top-[-8px] right-[-8px] text-[10px] bg-yellow-500 text-black px-1.5 py-[1px] rounded-md font-semibold">
              Coming Soon
            </span>
          </button>
        </div>
      </div>

      {/* === MOBILE MENU === */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`md:hidden backdrop-blur-md border-t border-black/20 dark:border-white/10 
            ${isDark ? "bg-[#0b0f15]/95" : "bg-white/95"} px-6 py-4`}
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm transition 
                ${
                  pathname === l.href
                    ? "text-[#00ccb0] bg-white/5 dark:bg-white/5"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
                }`}
              >
                {l.label}
              </Link>
            ))}

            {/* LOGIN */}
            <div className="mt-3">
              {!user ? (
                <Link
                  href="/en/login"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center px-4 py-2 border rounded-lg text-sm 
                  border-[#009e8e] text-[#009e8e] hover:bg-[#009e8e]/10 dark:border-[#00ccb0] dark:text-[#00ccb0] dark:hover:bg-[#00ccb0]/10"
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="block w-full text-center px-4 py-2 border rounded-lg text-sm 
                  border-black/20 text-gray-700 hover:bg-gray-100 
                  dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/5"
                >
                  Logout
                </button>
              )}
            </div>

            {/* POST BUTTON */}
            <button
              disabled
              className="relative mt-3 w-full px-4 py-2 rounded-lg border text-sm font-semibold cursor-not-allowed 
              border-black/20 text-gray-500 bg-gray-100 dark:border-white/10 dark:text-gray-400 dark:bg-gray-800/40"
            >
              Post Listing
              <span className="absolute top-[-8px] right-[-8px] text-[10px] bg-yellow-500 text-black px-1.5 py-[1px] rounded-md font-semibold">
                Coming Soon
              </span>
            </button>

            {/* FOOTER TOOLS */}
            <div className="mt-4 border-t border-black/20 dark:border-white/10 pt-3 flex justify-between">
              <Link
                href="/"
                className={`px-3 py-1.5 rounded-md border text-xs font-semibold transition 
                ${
                  isDark
                    ? "bg-white/5 border-white/10 text-gray-100 hover:bg-white/10"
                    : "bg-gray-50 border-black/20 text-gray-800 hover:bg-gray-100"
                }`}
              >
                ID
              </Link>

              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.9 }}
                className={`px-3 py-1.5 rounded-md border text-xs font-semibold transition 
                ${
                  isDark
                    ? "bg-white/5 border-white/10 text-gray-100 hover:bg-white/10"
                    : "bg-gray-50 border-black/20 text-gray-800 hover:bg-gray-100"
                }`}
              >
                {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
