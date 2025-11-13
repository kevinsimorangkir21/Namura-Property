"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const [isDark, setIsDark] = useState(false);

  // 🌗 Sync tema dengan <html class="dark">
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

  return (
    <main
      className={`min-h-screen flex items-center justify-center px-6 transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`w-full max-w-md rounded-2xl shadow-xl border backdrop-blur-sm p-8 transition ${
          isDark
            ? "bg-[#10151d] border-white/10"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className={`text-3xl font-black mb-2 ${
              isDark
                ? "bg-gradient-to-r from-[#01907a] to-[#00d6b9] bg-clip-text text-transparent"
                : "text-[#00a48f]"
            }`}
          >
            Daftar Akun
          </h1>
          <p
            className={`text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Buat akun baru untuk mulai mengakses layanan Namura Property.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Nama Lengkap */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#00ccb0] focus:outline-none transition ${
                isDark
                  ? "bg-[#0b0f15] border-white/10 text-white placeholder-gray-500"
                  : "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-400"
              }`}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="email@contoh.com"
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#00ccb0] focus:outline-none transition ${
                isDark
                  ? "bg-[#0b0f15] border-white/10 text-white placeholder-gray-500"
                  : "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-400"
              }`}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Kata Sandi
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#00ccb0] focus:outline-none transition ${
                isDark
                  ? "bg-[#0b0f15] border-white/10 text-white placeholder-gray-500"
                  : "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-400"
              }`}
              required
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full py-2.5 bg-[#00ccb0] hover:bg-[#01bba4] text-black font-semibold rounded-lg shadow-sm transition duration-300"
          >
            Daftar Sekarang
          </motion.button>
        </form>

        {/* Garis Pembatas */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span
              className={`w-full border-t ${
                isDark ? "border-white/10" : "border-gray-300"
              }`}
            />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span
              className={`px-3 ${
                isDark ? "bg-[#10151d] text-gray-400" : "bg-white text-gray-500"
              }`}
            >
              atau
            </span>
          </div>
        </div>

        {/* Google Register */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border font-medium transition ${
            isDark
              ? "bg-[#0b0f15] border-white/10 text-gray-200 hover:bg-white/10"
              : "bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200"
          }`}
        >
          <FcGoogle className="w-5 h-5" />
          Daftar dengan Google
        </motion.button>

        {/* Footer link */}
        <p
          className={`text-sm text-center mt-6 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Sudah memiliki akun?{" "}
          <Link
            href="/login"
            className="text-[#00ccb0] font-medium hover:underline hover:text-[#00e2c8]"
          >
            Masuk disini
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
