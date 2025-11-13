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

import { articlesEN } from "@/data/articlesEN";

export default function ArtikelDetailEN({ params }) {
  const slug = decodeURIComponent(params.slug);
  const [isDark, setIsDark] = useState(false);
  const [copied, setCopied] = useState(false);

  /* THEME LISTENER */
  useEffect(() => {
    const updateDark = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    updateDark();

    const obs = new MutationObserver(updateDark);
    obs.observe(document.documentElement, { attributes: true });
    return () => obs.disconnect();
  }, []);

  /* GET ARTICLE */
  const index = articlesEN.findIndex((a) => a.slug === slug);
  const article = articlesEN[index];

  if (!article) return notFound();

  const prev = articlesEN[index - 1];
  const next = articlesEN[index + 1];

  /* SHARE FUNCTIONS */
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWA = () => {
    const text = `${article.title}\n${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const shareTwitter = () => {
    const text = `${article.title} — ${window.location.href}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  /* TRANSLATIONS */
  const t = {
    back: "Back to Articles",
    shareWA: "Share via WhatsApp",
    shareTW: "Share on Twitter",
    copy: "Copy Link",
    copied: "Copied!",
    prev: "Previous Article",
    next: "Next Article",
  };

  return (
    <main
      className={`min-h-screen pt-28 md:pt-32 pb-28 transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-white text-[#1f2937]"
      }`}
    >
      <section className="max-w-4xl mx-auto px-6 md:px-8">

        {/* BACK */}
        <Link
          href="/en/articles"
          className={`inline-flex items-center gap-2 mb-10 text-sm font-semibold hover:opacity-80 transition ${
            isDark ? "text-[#00ccb0]" : "text-[#009e8a]"
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> {t.back}
        </Link>

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] font-medium mb-4 ${
              isDark ? "bg-[#00ccb0]/10 text-[#00ccb0]" : "bg-[#00ccb0]/15 text-[#008e7b]"
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" /> {article.category}
          </span>

          <h1
            className={`text-3xl md:text-4xl font-extrabold leading-tight mb-3 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {article.title}
          </h1>

          {/* Date + Read time */}
          <div
            className={`flex gap-6 text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {article.read}
            </span>
          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className={`rounded-2xl overflow-hidden border my-10 shadow-lg ${
            isDark ? "border-white/10" : "border-gray-200"
          }`}
        >
          <motion.img
            src={article.image}
            className="w-full h-[380px] object-cover"
            initial={{ scale: 1.03 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        {/* CONTENT */}
        <article
          className={`prose max-w-none leading-relaxed ${
            isDark ? "prose-invert prose-p:text-gray-300" : "prose-p:text-gray-700"
          }`}
        >
          {article.content.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </article>

        {/* SHARE SECTION */}
        <div
          className={`mt-12 flex flex-wrap gap-4 border-t pt-8 ${
            isDark ? "border-white/10" : "border-gray-200"
          }`}
        >
          <button
            onClick={shareWA}
            className="flex items-center gap-2 px-4 py-2 rounded-lg 
              bg-[#00ccb0] text-white font-medium hover:bg-[#00b39c] transition"
          >
            <MessageCircle className="w-4 h-4" /> {t.shareWA}
          </button>

          <button
            onClick={shareTwitter}
            className="flex items-center gap-2 px-4 py-2 rounded-lg 
              border border-gray-300 dark:border-white/20
              font-medium hover:bg-gray-100 dark:hover:bg-white/10 transition"
          >
            <Twitter className="w-4 h-4 text-sky-400" /> {t.shareTW}
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-lg 
              border border-gray-300 dark:border-white/20
              font-medium hover:bg-gray-100 dark:hover:bg-white/10 transition"
          >
            <Copy className="w-4 h-4" /> {copied ? t.copied : t.copy}
          </button>
        </div>

        {/* PREV/NEXT */}
        <div
          className={`mt-16 flex justify-between gap-4 border-t pt-10 ${
            isDark ? "border-white/10" : "border-gray-200"
          }`}
        >
          {prev ? (
            <Link
              href={`/en/artikel/${prev.slug}`}
              className="flex items-center gap-2 px-4 py-3 rounded-xl
              border border-gray-300 dark:border-white/10 
              hover:bg-gray-100 dark:hover:bg-white/10 transition text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> {t.prev}
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/en/artikel/${next.slug}`}
              className="flex items-center gap-2 px-4 py-3 rounded-xl
              border border-gray-300 dark:border-white/10 
              hover:bg-gray-100 dark:hover:bg-white/10 transition text-sm font-medium"
            >
              {t.next} <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </main>
  );
}
