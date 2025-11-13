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
  { key: "buy", label: "Buy" },
  { key: "sell", label: "Sell" },
  { key: "mortgage", label: "Mortgage" },
  { key: "legal", label: "Legal" },
  { key: "costs", label: "Costs" },
];

export default function GuidePageEN() {
  const [active, setActive] = useState("buy");
  const [isDark, setIsDark] = useState(false);

  // 🌙 Detect dark mode
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
      className={`min-h-screen pt-28 md:pt-32 pb-28 transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-white text-[#1f2937]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* Heading */}
        <header className="mb-10 md:mb-14">
          <h1
            className={`text-4xl md:text-5xl font-black tracking-tight mb-3 ${
              isDark
                ? "bg-gradient-to-r from-[#01907a] to-[#00d6b9] bg-clip-text text-transparent"
                : "text-[#00a48f]"
            }`}
          >
            Property Guide Center
          </h1>

          <p
            className={`max-w-2xl mt-4 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Everything you need to buy, sell, and finance properties — concise,
            clear, and ready to apply.
          </p>
        </header>

        {/* Tabs */}
        <nav
          className={`relative border-b mb-8 ${
            isDark ? "border-white/10" : "border-gray-200"
          }`}
        >
          <div className="flex gap-2 overflow-auto no-scrollbar pb-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  active === t.key
                    ? "text-[#00ccb0]"
                    : isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {t.label}

                {active === t.key && (
                  <motion.span
                    layoutId="tab-underline-en"
                    className="absolute left-0 right-0 -bottom-[9px] h-[2px] bg-[#00ccb0] rounded-full"
                  />
                )}
              </button>
            ))}
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
          >
            {active === "buy" && <TabBuy isDark={isDark} />}
            {active === "sell" && <TabSell isDark={isDark} />}
            {active === "mortgage" && <TabMortgage isDark={isDark} />}
            {active === "legal" && <TabLegal isDark={isDark} />}
            {active === "costs" && <TabCosts isDark={isDark} />}
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

/* ---------------- Tabs (ENGLISH VERSION) ---------------- */

function TabBuy({ isDark }) {
  const list = [
    "Decide location, type, and price range.",
    "Compare 3–5 listings to understand the market.",
    "Check legality (certificate, IMB/PBG, land/building status).",
    "Schedule a visit: check access, surroundings, flood risk.",
    "Prepare down payment & simulate mortgage if needed.",
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-2" isDark={isDark}>
        <h3 className="text-xl font-bold mb-3">Quick Steps to Buy Property</h3>
        <ListCheck items={list} isDark={isDark} />
        <div className="mt-5 flex gap-3">
          <CTA href="/en/listing" isDark={isDark}>Browse Listings</CTA>
          <CTA href="/en/guide#legal" outline isDark={isDark}>
            Learn Legal Process
          </CTA>
        </div>
      </Card>

      <Card isDark={isDark}>
        <h4 className="text-sm text-gray-400 mb-2">Quick Tip</h4>
        <p className={`text-sm leading-relaxed ${isDark ? "text-gray-200" : "text-gray-800"}`}>
          Focus on access & infrastructure (toll, LRT, schools, hospitals).
        </p>
      </Card>
    </div>
  );
}

function TabSell({ isDark }) {
  const list = [
    "Use bright, sharp photos (8–15).",
    "Write honest descriptions highlighting strengths.",
    "Set a competitive price (check similar listings).",
    "Prepare documents (SHM/HGB, tax receipts, utilities).",
    "Respond quickly to inquiries.",
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-2" isDark={isDark}>
        <h3 className="text-xl font-bold mb-3">How to Sell or Post an Ad</h3>
        <ListCheck items={list} isDark={isDark} />
        <div className="mt-5">
          <CTA href="/en/ads/post" isDark={isDark}>Post Your Listing</CTA>
        </div>
      </Card>

      <Card isDark={isDark}>
        <h4 className="text-sm text-gray-400 mb-2">Pro Tip</h4>
        <p className={`text-sm ${isDark ? "text-gray-200" : "text-gray-800"}`}>
          Keep your listing updated. Accuracy increases visibility.
        </p>
      </Card>
    </div>
  );
}

function TabMortgage({ isDark }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-2" isDark={isDark}>
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="w-5 h-5 text-[#00ccb0]" />
          <h3 className="text-xl font-bold">Mortgage Simulation & Requirements</h3>
        </div>

        <ListCheck
          isDark={isDark}
          items={[
            "Down payment 10–20% (varies by bank).",
            "Installment ratio ideally ≤ 35% of income.",
            "Documents: ID, tax number, payslip, job/business letter.",
            "Tenor 5–30 years, choose fixed rate early.",
          ]}
        />

        <div className="mt-5 flex gap-3">
          <CTA href="/en/mortgage" isDark={isDark}>Open Mortgage Calculator</CTA>
          <CTA href="/en/contact" outline isDark={isDark}>
            Consult with Us
          </CTA>
        </div>
      </Card>

      <Card isDark={isDark}>
        <h4 className="font-semibold mb-2">Quick Formula</h4>
        <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          Estimate payment: Principal = Price − Down Payment.
        </p>
      </Card>
    </div>
  );
}

function TabLegal({ isDark }) {
  const items = [
    { title: "Certificate Types", text: "SHM, HGB, Strata Title. Ensure name matches & no disputes." },
    { title: "Authenticity Check", text: "Verify through BPN/ATR or Notary/PPAT." },
    { title: "Building Permit", text: "Property must have PBG (replaces IMB)." },
    { title: "Taxes & Bills", text: "Ensure property tax and utilities are fully paid." },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-2" isDark={isDark}>
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-[#00ccb0]" />
          <h3 className="text-xl font-bold">Property Legal Checklist</h3>
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
              <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                {it.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <CTA href="/en/contact" isDark={isDark}>
            Need Notary Assistance
          </CTA>
        </div>
      </Card>
    </div>
  );
}

function TabCosts({ isDark }) {
  const biayaList = [
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
          <h3 className="text-xl font-bold">Transaction Cost Summary</h3>
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
