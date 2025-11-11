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

const articles = [
  {
    id: 1,
    slug: "tren-properti-hijau-2025",
    title:
      "Tren Properti Hijau: Investasi Ramah Lingkungan yang Meningkat di 2025",
    category: "Insight",
    date: "10 Nov 2025",
    read: "5 min read",
    image: "/news/eco-house.png",
    content: `
Properti ramah lingkungan kini menjadi fokus utama banyak developer di Indonesia.
Kesadaran masyarakat terhadap pentingnya efisiensi energi dan konsep *green building* meningkat pesat.

**Manfaat Investasi Properti Hijau**
- Nilai jual lebih stabil
- Tagihan energi lebih hemat
- Ramah lingkungan & berkelanjutan

Kini, lebih dari 60% proyek baru di Jabodetabek mulai mengadopsi konsep hijau — transformasi besar industri properti nasional.
`,
  },
  {
    id: 2,
    slug: "kpr-digital-teknologi-pembiayaan-rumah",
    title:
      "KPR Digital: Bagaimana Teknologi Mempermudah Pembiayaan Rumah",
    category: "Finance",
    date: "8 Nov 2025",
    read: "4 min read",
    image: "/news/kpr-digital.png",
    content: `
Perbankan kini semakin terbuka terhadap transformasi digital, termasuk dalam layanan Kredit Pemilikan Rumah (KPR).
Dengan hadirnya sistem KPR digital, pengajuan rumah kini bisa dilakukan dari rumah.

**Keunggulan KPR Digital:**
1. Proses cepat dan transparan.
2. Simulasi bunga real-time.
3. Verifikasi dokumen online.
`,
  },
  {
    id: 3,
    slug: "nilai-properti-tod-naik-2025",
    title: "Nilai Properti Kawasan TOD Naik hingga 12% di Semester Ini",
    category: "Insight",
    date: "6 Nov 2025",
    read: "6 min read",
    image: "/news/tod-growth.png",
    content: `
Kawasan TOD (Transit Oriented Development) menjadi magnet baru bagi investor properti.
Dekat stasiun LRT dan MRT, kawasan ini mencatat kenaikan harga lahan 12% hanya dalam enam bulan terakhir.
`,
  },
];

export default function ArtikelDetail({ params }) {
  const slug = decodeURIComponent(params.slug);
  const index = articles.findIndex((a) => a.slug === slug);
  const article = articles[index];
  if (!article) return notFound();

  const prevArticle = articles[index - 1];
  const nextArticle = articles[index + 1];

  const [isDark, setIsDark] = useState(false);
  const [copied, setCopied] = useState(false);

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

  return (
    <main
      className={`min-h-screen pt-28 md:pt-32 pb-28 transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-[#ffffff] text-[#1f2937]"
      }`}
    >
      <section className="max-w-4xl mx-auto px-6 md:px-8 relative z-10">
        {/* Back Button */}
        <Link
          href="/artikel"
          className={`inline-flex items-center gap-2 mb-8 text-sm font-medium transition ${
            isDark
              ? "text-[#00ccb0] hover:text-[#00e2c8]"
              : "text-[#00a48f] hover:text-[#008b78]"
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Artikel
        </Link>

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] font-medium mb-3 ${
              isDark
                ? "bg-[#00ccb0]/10 text-[#00ccb0]"
                : "bg-[#00ccb0]/15 text-[#009a86]"
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" /> {article.category}
          </span>

          <h1
            className={`text-3xl md:text-4xl font-bold leading-tight mb-3 ${
              isDark ? "text-gray-100" : "text-gray-900"
            }`}
          >
            {article.title}
          </h1>

          <div
            className={`flex flex-wrap items-center gap-4 text-[13px] ${
              isDark ? "text-gray-400" : "text-gray-600"
            } mb-8`}
          >
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {article.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.read}
            </span>
          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className={`rounded-2xl overflow-hidden border mb-10 ${
            isDark ? "border-white/10" : "border-gray-200 shadow-md"
          }`}
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-[380px] object-cover"
          />
        </motion.div>

        {/* CONTENT */}
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`prose leading-relaxed ${
            isDark
              ? "prose-invert prose-p:text-gray-300 prose-strong:text-white"
              : "prose-p:text-gray-700 prose-strong:text-gray-900"
          }`}
        >
          {article.content.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </motion.article>

        {/* SHARE */}
        <div
          className={`mt-10 flex flex-wrap gap-3 border-t pt-6 ${
            isDark ? "border-white/10" : "border-gray-200"
          }`}
        >
          <button
            onClick={shareWA}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition border ${
              isDark
                ? "bg-[#00bfa5]/10 border-[#00ccb0] text-[#00ccb0] hover:bg-[#00ccb0]/20"
                : "bg-[#00ccb0]/10 border-[#00a48f] text-[#009a86] hover:bg-[#00ccb0]/15"
            }`}
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </button>
          <button
            onClick={shareTwitter}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition border ${
              isDark
                ? "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                : "bg-gray-100 border-gray-300 hover:bg-gray-200 text-gray-800"
            }`}
          >
            <Twitter className="w-4 h-4 text-sky-400" /> Twitter
          </button>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition border ${
              isDark
                ? "bg-white/5 border-white/10 hover:bg-white/10"
                : "bg-gray-100 border-gray-300 hover:bg-gray-200"
            }`}
          >
            <Copy className="w-4 h-4" /> {copied ? "Disalin!" : "Salin Tautan"}
          </button>
        </div>

        {/* NEXT / PREV */}
        <div
          className={`mt-16 flex justify-between border-t pt-8 ${
            isDark ? "border-white/10" : "border-gray-200"
          }`}
        >
          {prevArticle ? (
            <Link
              href={`/artikel/${prevArticle.slug}`}
              className={`flex items-center gap-2 text-sm transition ${
                isDark
                  ? "text-gray-300 hover:text-[#00ccb0]"
                  : "text-gray-700 hover:text-[#00a48f]"
              }`}
            >
              <ArrowLeft className="w-4 h-4" /> {prevArticle.title}
            </Link>
          ) : (
            <div />
          )}

          {nextArticle ? (
            <Link
              href={`/artikel/${nextArticle.slug}`}
              className={`flex items-center gap-2 text-sm transition ${
                isDark
                  ? "text-gray-300 hover:text-[#00ccb0]"
                  : "text-gray-700 hover:text-[#00a48f]"
              }`}
            >
              {nextArticle.title} <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      {/* Ambient light */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: isDark ? 0.12 : 0.08 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute right-10 bottom-10 w-96 h-96 bg-[#00bca6] rounded-full blur-[120px]"
      />
    </main>
  );
}
