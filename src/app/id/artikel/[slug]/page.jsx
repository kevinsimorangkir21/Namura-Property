"use client";

import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Newspaper,
  Copy,
  Twitter,
  MessageCircle,
} from "lucide-react";

import { articlesID } from "@/data/articlesID";

export default function ArtikelDetailID({ params }) {
  const slug = decodeURIComponent(params.slug);
  const [isDark, setIsDark] = useState(false);
  const [copied, setCopied] = useState(false);

  // Tema
  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Cari artikel ID saja
  const index = articlesID.findIndex((a) => a.slug === slug);
  const article = articlesID[index];

  if (!article) return notFound();

  const prev = articlesID[index - 1];
  const next = articlesID[index + 1];

  // Share
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWA = () => {
    const text = `${article.title} — ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const shareTwitter = () => {
    const text = `${article.title} — ${window.location.href}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  // UI ID
  const t = {
    back: "Kembali ke Artikel",
    shareWA: "Bagikan via WhatsApp",
    shareTW: "Bagikan di Twitter",
    copy: "Salin Tautan",
    copied: "Disalin!",
    prev: "Artikel Sebelumnya",
    next: "Artikel Selanjutnya",
  };

  return (
    <main
      className={`min-h-screen pt-28 md:pt-32 pb-28 transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-white text-[#1f2937]"
      }`}
    >
      <section className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Back */}
        <Link
          href="/artikel"
          className={`inline-flex items-center gap-2 mb-8 text-sm font-medium ${
            isDark ? "text-[#00ccb0]" : "text-[#00a48f]"
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> {t.back}
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] font-medium mb-3 ${
              isDark ? "bg-[#00ccb0]/10 text-[#00ccb0]" : "bg-[#00ccb0]/15 text-[#009a86]"
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" /> {article.category}
          </span>

          <h1
            className={`text-3xl md:text-4xl font-bold leading-tight mb-3 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {article.title}
          </h1>

          <div
            className={`flex flex-wrap gap-4 text-[13px] ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.read}
            </span>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`rounded-2xl overflow-hidden border my-10 ${
            isDark ? "border-white/10" : "border-gray-200"
          }`}
        >
          <img src={article.image} className="w-full h-[380px] object-cover" />
        </motion.div>

        {/* Content */}
        <article
          className={`prose leading-relaxed ${
            isDark ? "prose-invert prose-p:text-gray-300" : "prose-p:text-gray-700"
          }`}
        >
          {article.content.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </article>

        {/* Share */}
        <div className={`mt-10 flex flex-wrap gap-3 border-t pt-6 ${
          isDark ? "border-white/10" : "border-gray-200"
        }`}>
          <button onClick={shareWA} className="btn-primary">
            <MessageCircle className="w-4 h-4" /> {t.shareWA}
          </button>

          <button onClick={shareTwitter} className="btn-secondary">
            <Twitter className="w-4 h-4 text-sky-400" /> {t.shareTW}
          </button>

          <button onClick={handleCopy} className="btn-secondary">
            <Copy className="w-4 h-4" /> {copied ? t.copied : t.copy}
          </button>
        </div>

        {/* Prev / Next */}
        <div className={`mt-16 flex justify-between border-t pt-8 ${
          isDark ? "border-white/10" : "border-gray-200"
        }`}>
          {prev ? (
            <Link href={`/artikel/${prev.slug}`} className="nav-btn">
              <ArrowLeft className="w-4 h-4" /> {t.prev}
            </Link>
          ) : <div />}

          {next ? (
            <Link href={`/artikel/${next.slug}`} className="nav-btn">
              {t.next} <ArrowRight className="w-4 h-4" />
            </Link>
          ) : <div />}
        </div>
      </section>
    </main>
  );
}
