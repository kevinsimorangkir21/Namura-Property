"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Wallet,
  FileText,
  Calculator,
} from "lucide-react";

/* ---------------- Tabs ---------------- */
const TABS = [
  { key: "beli", label: { id: "Beli", en: "Buy" } },
  { key: "jual", label: { id: "Jual", en: "Sell" } },
  { key: "kpr", label: { id: "KPR", en: "Mortgage" } },
  { key: "legal", label: { id: "Legal", en: "Legal" } },
  { key: "biaya", label: { id: "Biaya", en: "Costs" } },
];

/* ---------------- Utils ---------------- */
const getLocalized = (text, lang) =>
  typeof text === "string" ? text : text?.[lang] || text?.id || "";

export default function PanduanPage() {
  const [active, setActive] = useState("beli");
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("id");

  // 🌙 Detect theme
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

  // 🌐 Detect language
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
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* Heading */}
        <header className="mb-10 md:mb-14 relative">
          <h1
            className={`text-4xl md:text-5xl font-black tracking-tight mb-3 ${
              isDark
                ? "bg-gradient-to-r from-[#01907a] to-[#00d6b9] bg-clip-text text-transparent"
                : "text-[#00a48f]"
            }`}
          >
            {lang === "id" ? "Pusat Panduan Properti" : "Property Guide Center"}
          </h1>
          <p
            className={`max-w-2xl mt-4 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {lang === "id"
              ? "Semua yang kamu butuhkan untuk membeli, menjual, dan membiayai properti — ringkas, jelas, dan siap dipraktikkan."
              : "Everything you need to buy, sell, and finance properties — concise, clear, and ready to apply."}
          </p>
        </header>

        {/* Tabs */}
        <nav
          className={`relative border-b mb-8 ${
            isDark ? "border-white/10" : "border-gray-200"
          }`}
        >
          <div className="flex gap-2 overflow-auto no-scrollbar pb-1">
            {TABS.map((t) => {
              const isActive = active === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    isActive
                      ? "text-[#00ccb0]"
                      : isDark
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {getLocalized(t.label, lang)}
                  {isActive && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute left-0 right-0 -bottom-[9px] h-[2px] bg-[#00ccb0] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="space-y-8"
          >
            {active === "beli" && <TabBeli isDark={isDark} lang={lang} />}
            {active === "jual" && <TabJual isDark={isDark} lang={lang} />}
            {active === "kpr" && <TabKPR isDark={isDark} lang={lang} />}
            {active === "legal" && <TabLegal isDark={isDark} lang={lang} />}
            {active === "biaya" && <TabBiaya isDark={isDark} lang={lang} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}

/* ---------------- Shared Components ---------------- */

function Card({ children, className = "", isDark }) {
  return (
    <div
      className={`rounded-2xl border backdrop-blur-xl p-5 md:p-6 transition ${
        isDark
          ? "border-white/10 bg-white/5 hover:bg-white/7 hover:border-white/20"
          : "border-gray-200 bg-gray-50 hover:bg-gray-100"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function ListCheck({ items = [], isDark }) {
  return (
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#00ccb0] mt-0.5 shrink-0" />
          <span
            className={`leading-relaxed ${
              isDark ? "text-gray-200" : "text-gray-700"
            }`}
          >
            {it}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CTA({ href, children, outline, isDark }) {
  return outline ? (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border font-semibold text-sm transition ${
        isDark
          ? "border-[#00ccb0] text-[#00ccb0] hover:bg-[#00ccb0]/10"
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

/* ---------------- Tabs ---------------- */

function TabBeli({ isDark, lang }) {
  const list = {
    id: [
      "Tentukan lokasi, tipe, dan kisaran harga.",
      "Bandingkan 3–5 properti untuk memahami harga pasar.",
      "Cek legalitas (sertifikat, IMB/PBG, status bangunan/tanah).",
      "Jadwalkan survei: cek akses, lingkungan, banjir.",
      "Siapkan DP & simulasi cicilan bila ambil KPR.",
    ],
    en: [
      "Decide location, type, and price range.",
      "Compare 3–5 listings to understand the market.",
      "Check legality (certificate, IMB/PBG, land status).",
      "Schedule a visit: check access, surroundings, flood risk.",
      "Prepare down payment & simulate mortgage if needed.",
    ],
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-2" isDark={isDark}>
        <h3 className="text-xl font-bold mb-3">
          {lang === "id" ? "Langkah Cepat Membeli Properti" : "Quick Steps to Buy Property"}
        </h3>
        <ListCheck isDark={isDark} items={list[lang]} />
        <div className="mt-5 flex gap-3">
          <CTA href="/listing" isDark={isDark}>
            {lang === "id" ? "Jelajahi Listing" : "Browse Listings"}
          </CTA>
          <CTA href="/panduan#legal" outline isDark={isDark}>
            {lang === "id" ? "Pelajari Legalitas" : "Learn Legal Process"}
          </CTA>
        </div>
      </Card>

      <Card isDark={isDark}>
        <h4 className={`text-sm mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {lang === "id" ? "Tips Cepat" : "Quick Tip"}
        </h4>
        <p className={`text-sm leading-relaxed ${isDark ? "text-gray-200" : "text-gray-800"}`}>
          {lang === "id"
            ? "Fokus ke akses & infrastruktur (tol, LRT, sekolah, RS)."
            : "Focus on access & infrastructure (toll, LRT, schools, hospitals)."}
        </p>
      </Card>
    </div>
  );
}

function TabJual({ isDark, lang }) {
  const list = {
    id: [
      "Gunakan foto terang & tajam (8–15 foto).",
      "Tulis deskripsi jujur & menonjolkan keunggulan.",
      "Tentukan harga kompetitif (cek listing serupa).",
      "Siapkan dokumen (SHM/HGB, PBB, utilitas).",
      "Respons cepat chat/telepon.",
    ],
    en: [
      "Use bright, sharp photos (8–15).",
      "Write honest descriptions highlighting strengths.",
      "Set a competitive price (check similar listings).",
      "Prepare documents (SHM/HGB, PBB, utilities).",
      "Respond quickly to inquiries.",
    ],
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-2" isDark={isDark}>
        <h3 className="text-xl font-bold mb-3">
          {lang === "id" ? "Panduan Menjual / Pasang Iklan" : "How to Sell or Post an Ad"}
        </h3>
        <ListCheck isDark={isDark} items={list[lang]} />
        <div className="mt-5">
          <CTA href="/iklan/pasang" isDark={isDark}>
            {lang === "id" ? "Pasang Iklan Sekarang" : "Post Your Listing"}
          </CTA>
        </div>
      </Card>

      <Card isDark={isDark}>
        <h4 className="text-sm text-gray-400 mb-2">{lang === "id" ? "Pro Tip" : "Pro Tip"}</h4>
        <p className={`text-sm leading-relaxed ${isDark ? "text-gray-200" : "text-gray-800"}`}>
          {lang === "id"
            ? "Update harga & status. Listing akurat meningkatkan eksposur."
            : "Keep your listing updated. Accuracy increases visibility."}
        </p>
      </Card>
    </div>
  );
}

function TabKPR({ isDark, lang }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-2" isDark={isDark}>
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="w-5 h-5 text-[#00ccb0]" />
          <h3 className="text-xl font-bold">
            {lang === "id" ? "Simulasi KPR & Syarat Umum" : "Mortgage Simulation & Requirements"}
          </h3>
        </div>
        <ListCheck
          isDark={isDark}
          items={
            lang === "id"
              ? [
                  "DP umum 10–20% (tergantung bank).",
                  "Rasio cicilan ideal ≤ 35% dari penghasilan.",
                  "Dokumen: KTP, NPWP, slip gaji, surat kerja/usaha.",
                  "Tenor 5–30 tahun, pilih fixed rate awal.",
                ]
              : [
                  "Down payment 10–20% (varies by bank).",
                  "Installment ratio ideally ≤ 35% of income.",
                  "Documents: ID, tax number, payslip, job/business letter.",
                  "Tenor 5–30 years, choose fixed rate early.",
                ]
          }
        />
        <div className="mt-5 flex gap-3">
          <CTA href="/kpr" isDark={isDark}>
            {lang === "id" ? "Buka Kalkulator KPR" : "Open Mortgage Calculator"}
          </CTA>
          <CTA href="/contact" outline isDark={isDark}>
            {lang === "id" ? "Konsultasi KPR" : "Consult with Us"}
          </CTA>
        </div>
      </Card>

      <Card isDark={isDark}>
        <h4 className="font-semibold mb-2">{lang === "id" ? "Hitung Cepat" : "Quick Formula"}</h4>
        <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          {lang === "id"
            ? "Estimasi cicilan: Pokok = Harga − DP."
            : "Estimate payment: Principal = Price − Down Payment."}
        </p>
      </Card>
    </div>
  );
}

function TabLegal({ isDark, lang }) {
  const items =
    lang === "id"
      ? [
          { title: "Jenis Sertifikat", text: "SHM, HGB, Strata Title. Pastikan nama sesuai & bebas sengketa." },
          { title: "Cek Keaslian", text: "Verifikasi ke BPN/ATR atau Notaris/PPAT." },
          { title: "IMB / PBG", text: "Bangunan wajib punya PBG (pengganti IMB)." },
          { title: "Pajak & Tagihan", text: "Pastikan PBB dan utilitas lunas." },
        ]
      : [
          { title: "Certificate Types", text: "SHM, HGB, Strata Title. Ensure name matches and no disputes." },
          { title: "Authenticity Check", text: "Verify with BPN/ATR or Notary/PPAT." },
          { title: "Building Permit", text: "Buildings must have a valid PBG (replaces IMB)." },
          { title: "Taxes & Bills", text: "Ensure property tax (PBB) and utilities are paid." },
        ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-2" isDark={isDark}>
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-[#00ccb0]" />
          <h3 className="text-xl font-bold">
            {lang === "id" ? "Checklist Legalitas Properti" : "Property Legal Checklist"}
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((it, i) => (
            <div
              key={i}
              className={`rounded-xl border p-4 ${
                isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
              }`}
            >
              <h5 className="font-semibold mb-1">{it.title}</h5>
              <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>{it.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <CTA href="/contact" isDark={isDark}>
            {lang === "id" ? "Butuh Bantuan Notaris" : "Need Notary Assistance"}
          </CTA>
        </div>
      </Card>
    </div>
  );
}

function TabBiaya({ isDark, lang }) {
  const biayaList =
    lang === "id"
      ? [
          { title: "AJB & Balik Nama", detail: "±1–2% dari nilai transaksi." },
          { title: "PPh (Penjual)", detail: "2,5% dari nilai transaksi." },
          { title: "BPHTB (Pembeli)", detail: "5% × (Harga − NPOPTKP daerah)." },
          { title: "Notaris/PPAT", detail: "Bervariasi tergantung wilayah." },
          { title: "Administrasi KPR", detail: "Appraisal, provisi, asuransi." },
        ]
      : [
          { title: "AJB & Name Transfer", detail: "±1–2% of transaction value." },
          { title: "Income Tax (Seller)", detail: "2.5% of transaction value." },
          { title: "BPHTB (Buyer)", detail: "5% × (Price − regional NPOPTKP)." },
          { title: "Notary/PPAT", detail: "Varies depending on region." },
          { title: "Mortgage Admin Fees", detail: "Appraisal, provision, insurance." },
        ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-2" isDark={isDark}>
        <div className="flex items-center gap-2 mb-3">
          <Wallet className="w-5 h-5 text-[#00ccb0]" />
          <h3 className="text-xl font-bold">
            {lang === "id" ? "Ringkasan Biaya Transaksi" : "Transaction Cost Summary"}
          </h3>
        </div>
        <div className="space-y-3">
          {biayaList.map((b, i) => (
            <div
              key={i}
              className={`flex gap-3 rounded-xl border p-4 ${
                isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
              }`}
            >
              <FileText className="w-5 h-5 text-[#00ccb0] mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold">{b.title}</div>
                <div className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  {b.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
