"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShieldCheck,
  FileCheck2,
  Scale,
  Landmark,
  Users,
  Handshake,
  Building2,
  BadgeCheck,
  Clock,
  MapPinned,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Tentang() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("id");

  // 🌙 Dark mode detector
  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // 🌐 Language detector
  useEffect(() => {
    const loadLang = () => setLang(localStorage.getItem("lang") || "id");
    loadLang();
    window.addEventListener("languageChange", loadLang);
    return () => window.removeEventListener("languageChange", loadLang);
  }, []);

  return (
    <main
      className={`min-h-screen pt-28 md:pt-32 pb-28 transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-white text-[#1f2937]"
      }`}
    >
      {/* HERO */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isDark ? 0.16 : 0.1 }}
          transition={{ duration: 1.2 }}
          className="absolute -top-16 left-10 w-72 h-72 bg-[#00bca6] rounded-full blur-[120px]"
        />

        <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className={`text-4xl md:text-5xl font-black tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {lang === "id" ? "Tentang Namura Property" : "About Namura Property"}
          </motion.h1>

          <div className="relative mt-3">
            <span className="block h-[3px] w-28 rounded-full bg-[#00ccb0]" />
            <span className="absolute top-1/2 -translate-y-1/2 h-4 w-28 rounded-full bg-[#00ccb0] blur-[12px] opacity-30" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className={`max-w-3xl leading-relaxed text-[1.075rem] mt-6 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {lang === "id"
              ? "Namura Property berkomitmen menghadirkan pengalaman transaksi yang aman, transparan, dan patuh regulasi. Kami mempertemukan penjual, pembeli, serta institusi pembiayaan melalui proses yang terstandarisasi dan terverifikasi."
              : "Namura Property is committed to delivering a secure, transparent, and regulation-compliant property transaction experience — connecting sellers, buyers, and financial institutions through standardized and verified processes."}
          </motion.p>

          {/* Badges */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: <ShieldCheck />, id: "Audit Keamanan", en: "Security Audit" },
              { icon: <FileCheck2 />, id: "Dokumen Valid", en: "Verified Documents" },
              { icon: <Scale />, id: "Patuh Regulasi", en: "Regulatory Compliance" },
              { icon: <Landmark />, id: "Mitra Notaris", en: "Notary Partners" },
              { icon: <BadgeCheck />, id: "Listing Terverifikasi", en: "Verified Listings" },
              { icon: <Users />, id: "Konsultan Berpengalaman", en: "Experienced Consultants" },
            ].map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-[12px] transition ${
                  isDark
                    ? "bg-white/5 border-white/10 text-gray-200"
                    : "bg-gray-50 border-gray-200 text-gray-700"
                }`}
              >
                <span className="text-[#00ccb0]">{b.icon}</span>
                {lang === "id" ? b.id : b.en}
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap gap-3">
            <CTA href="/listing" isDark={isDark}>
              {lang === "id" ? "Lihat Listing" : "View Listings"}
            </CTA>
            <CTA href="https://wa.me/6281234567890" outline isDark={isDark}>
              {lang === "id" ? "Hubungi Konsultan" : "Contact Consultant"}
            </CTA>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <Section title={lang === "id" ? "Nilai Inti Kami" : "Our Core Values"} isDark={isDark}>
        <div className="grid md:grid-cols-3 gap-6">
          <Card
            isDark={isDark}
            icon={<ShieldCheck className="w-6 h-6 text-[#00ccb0]" />}
            title={lang === "id" ? "Kepercayaan" : "Trust"}
          >
            {lang === "id"
              ? "Kami memastikan setiap proses membangun rasa aman dengan verifikasi penjual dan data faktual."
              : "We ensure every process builds trust through seller verification and factual data presentation."}
          </Card>
          <Card
            isDark={isDark}
            icon={<FileCheck2 className="w-6 h-6 text-[#00ccb0]" />}
            title={lang === "id" ? "Transparansi" : "Transparency"}
          >
            {lang === "id"
              ? "Informasi properti disajikan apa adanya — termasuk legalitas, spesifikasi, dan riwayat dokumen."
              : "All property information is presented clearly — including legality, specifications, and document history."}
          </Card>
          <Card
            isDark={isDark}
            icon={<Scale className="w-6 h-6 text-[#00ccb0]" />}
            title={lang === "id" ? "Kepatuhan Regulasi" : "Regulatory Compliance"}
          >
            {lang === "id"
              ? "Kami bermitra dengan PPAT/Notaris serta mematuhi peraturan perpajakan & perizinan yang berlaku."
              : "We work with certified notaries and comply with current tax and legal regulations."}
          </Card>
        </div>
      </Section>

      {/* Services */}
      <Section title={lang === "id" ? "Layanan Utama" : "Main Services"} isDark={isDark}>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Building2 className="w-6 h-6 text-[#00ccb0]" />,
              id: "Pencarian & Listing",
              en: "Search & Listing",
              descId: "Eksplorasi listing terverifikasi berdasarkan lokasi, harga, dan tipe.",
              descEn: "Explore verified listings by location, price, and property type.",
            },
            {
              icon: <Handshake className="w-6 h-6 text-[#00ccb0]" />,
              id: "Konsultasi Transaksi",
              en: "Transaction Consulting",
              descId: "Pendampingan negosiasi dan strategi penawaran terbaik.",
              descEn: "Guidance on negotiation and offer strategy.",
            },
            {
              icon: <Landmark className="w-6 h-6 text-[#00ccb0]" />,
              id: "Legal & Notarial",
              en: "Legal & Notarial",
              descId: "Koordinasi dokumen, sertifikat, AJB, dan perpajakan.",
              descEn: "Coordinate documents, certificates, sale deeds, and tax matters.",
            },
            {
              icon: <MapPinned className="w-6 h-6 text-[#00ccb0]" />,
              id: "Survey & Due Diligence",
              en: "Survey & Due Diligence",
              descId: "Pengecekan lokasi, lingkungan, dan kondisi fisik properti.",
              descEn: "Inspect location, surroundings, and physical condition.",
            },
          ].map((s, i) => (
            <Card key={i} icon={s.icon} title={lang === "id" ? s.id : s.en} isDark={isDark}>
              {lang === "id" ? s.descId : s.descEn}
            </Card>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section
        title={lang === "id" ? "Perjalanan & Tonggak Pencapaian" : "Journey & Milestones"}
        isDark={isDark}
      >
        <Timeline isDark={isDark} lang={lang} />
      </Section>
    </main>
  );
}

/* ---------------- Shared Components ---------------- */

function Section({ title, children, isDark }) {
  return (
    <section className="relative mt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <h2
          className={`text-2xl md:text-3xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h2>
        <div className="relative mt-3 mb-6">
          <span className="block h-[3px] w-24 rounded-full bg-[#00ccb0]" />
          <span className="absolute top-1/2 -translate-y-1/2 h-4 w-24 rounded-full bg-[#00ccb0] blur-[12px] opacity-30" />
        </div>
        {children}
      </div>
    </section>
  );
}

function Card({ icon, title, children, isDark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className={`rounded-2xl border p-6 transition backdrop-blur-xl ${
        isDark
          ? "border-white/10 bg-white/5 hover:bg-white/7 hover:border-white/20"
          : "border-gray-200 bg-gray-50 hover:bg-gray-100"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">{icon}</div>
        <div>
          <h3 className={`font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
            {title}
          </h3>
          <p className={`text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            {children}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function Timeline({ isDark, lang }) {
  const items =
    lang === "id"
      ? [
          { year: "2022", title: "Fondasi & Validasi Pasar", desc: "Riset kebutuhan pengguna & standar verifikasi awal." },
          { year: "2023", title: "Kemitraan Legal", desc: "Kolaborasi dengan PPAT/Notaris & konsultan pajak." },
          { year: "2024", title: "Standarisasi Kualitas", desc: "Verifikasi dokumen & pedoman foto properti." },
          { year: "2025", title: "Skala & Keamanan", desc: "Audit internal dan enkripsi data berkelanjutan." },
        ]
      : [
          { year: "2022", title: "Foundation & Market Validation", desc: "User research & early verification standards." },
          { year: "2023", title: "Legal Partnership", desc: "Collaborations with notaries & tax advisors." },
          { year: "2024", title: "Quality Standardization", desc: "Document verification & photo guidelines." },
          { year: "2025", title: "Scaling & Security", desc: "Internal audits and continuous data encryption." },
        ];

  return (
    <div className="relative">
      <div
        className={`hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px ${
          isDark ? "bg-white/10" : "bg-gray-200"
        }`}
      />
      <div className="space-y-8 md:space-y-12">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="grid md:grid-cols-2 gap-6 md:gap-10 items-start"
          >
            <div className={`md:text-right ${i % 2 === 1 ? "md:order-2" : ""}`}>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] border ${
                  isDark
                    ? "bg-white/5 border-white/10 text-gray-300"
                    : "bg-gray-50 border-gray-200 text-gray-700"
                }`}
              >
                <Clock className="w-4 h-4 text-[#00ccb0]" />
                {it.year}
              </div>
              <h3
                className={`mt-3 font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
              >
                {it.title}
              </h3>
              <p
                className={`text-sm mt-1 leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {it.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CTA({ href, children, outline = false, isDark }) {
  return outline ? (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border font-semibold text-sm transition ${
        isDark
          ? "border-[#00ccb0] text-[#00ccb0] hover:bg-white/5"
          : "border-[#00a48f] text-[#00a48f] hover:bg-[#00ccb0]/10"
      }`}
    >
      {children} <ArrowRight className="w-4 h-4" />
    </Link>
  ) : (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00ccb0] text-black hover:opacity-90 transition font-semibold text-sm"
    >
      {children} <ArrowRight className="w-4 h-4" />
    </Link>
  );
}
