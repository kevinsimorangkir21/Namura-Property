"use client";

import React, { useEffect, useMemo, useState } from "react";

// 🔹 Format Rupiah
const currency = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Math.round(v || 0));

// 🔹 Rumus Cicilan (amortisasi)
function monthlyPayment(principal, annualRate, years) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export default function PindahTenorPage() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("id");

  // Input fields
  const [initialLoan, setInitialLoan] = useState(500000000); // total pinjaman awal
  const [rate, setRate] = useState(8.5); // bunga tahunan %
  const [oldYears, setOldYears] = useState(20);
  const [yearsPaid, setYearsPaid] = useState(5);
  const [newYears, setNewYears] = useState(15);

  // 🔸 Deteksi dark mode
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

  // 🔸 Deteksi bahasa global (navbar)
  useEffect(() => {
    const loadLang = () => setLang(localStorage.getItem("lang") || "id");
    loadLang();
    window.addEventListener("languageChange", loadLang);
    return () => window.removeEventListener("languageChange", loadLang);
  }, []);

  // 🔹 Hitung sisa pinjaman setelah beberapa tahun berjalan
  const remainingPrincipal = useMemo(() => {
    const r = rate / 100 / 12;
    const n = oldYears * 12;
    const m = monthlyPayment(initialLoan, rate, oldYears);
    const paidMonths = yearsPaid * 12;
    const remaining = initialLoan * Math.pow(1 + r, paidMonths) - 
      (m * (Math.pow(1 + r, paidMonths) - 1)) / r;
    return Math.max(0, remaining);
  }, [initialLoan, rate, oldYears, yearsPaid]);

  // 🔹 Hitung cicilan baru (setelah ubah tenor)
  const oldMonthly = monthlyPayment(initialLoan, rate, oldYears);
  const newMonthly = monthlyPayment(remainingPrincipal, rate, newYears);

  const oldTotal = oldMonthly * oldYears * 12;
  const newTotal = newMonthly * newYears * 12 + (oldMonthly * yearsPaid * 12);

  const saving = oldTotal - newTotal;

  // 🔸 Bilingual text
  const t = {
    id: {
      title: "Simulasi Pindah Tenor KPR",
      subtitle:
        "Hitung ulang cicilan Anda jika tenor diperpendek atau diperpanjang.",
      initialLoan: "Jumlah Pinjaman Awal (Rp)",
      rate: "Suku Bunga Tahunan (%)",
      oldYears: "Tenor Awal (Tahun)",
      yearsPaid: "Sudah Berjalan (Tahun)",
      newYears: "Tenor Baru (Tahun)",
      oldMonthly: "Cicilan Lama",
      newMonthly: "Cicilan Baru",
      remain: "Sisa Pokok Pinjaman",
      saving: "Selisih Total Pembayaran",
      note: "Catatan: simulasi tidak termasuk biaya penalti atau administrasi.",
    },
    en: {
      title: "KPR Tenor Adjustment Simulator",
      subtitle:
        "Recalculate your monthly payments if you shorten or extend your mortgage term.",
      initialLoan: "Initial Loan Amount (Rp)",
      rate: "Annual Interest Rate (%)",
      oldYears: "Original Tenor (Years)",
      yearsPaid: "Years Paid",
      newYears: "New Tenor (Years)",
      oldMonthly: "Old Monthly Payment",
      newMonthly: "New Monthly Payment",
      remain: "Remaining Principal",
      saving: "Total Payment Difference",
      note: "Note: Simulation excludes penalties or admin fees.",
    },
  }[lang];

  return (
    <main
      className={`min-h-screen pt-28 pb-28 transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <header className="mb-10">
          <h1
            className={`text-3xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t.title}
          </h1>
          <p
            className={`mt-2 text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t.subtitle}
          </p>
        </header>

        {/* Input form */}
        <div className="grid md:grid-cols-3 gap-6">
          <div
            className={`rounded-2xl border p-5 ${
              isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
            }`}
          >
            <label className="block text-sm mb-1 font-medium">{t.initialLoan}</label>
            <input
              type="number"
              value={initialLoan}
              onChange={(e) => setInitialLoan(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg mb-3 border"
            />

            <label className="block text-sm mb-1 font-medium">{t.rate}</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg mb-3 border"
            />

            <label className="block text-sm mb-1 font-medium">{t.oldYears}</label>
            <input
              type="number"
              value={oldYears}
              onChange={(e) => setOldYears(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg mb-3 border"
            />

            <label className="block text-sm mb-1 font-medium">{t.yearsPaid}</label>
            <input
              type="number"
              value={yearsPaid}
              onChange={(e) => setYearsPaid(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg mb-3 border"
            />

            <label className="block text-sm mb-1 font-medium">{t.newYears}</label>
            <input
              type="number"
              value={newYears}
              onChange={(e) => setNewYears(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg mb-3 border"
            />
          </div>

          {/* Output */}
          <div
            className={`md:col-span-2 rounded-2xl border p-5 ${
              isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
            }`}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <Stat label={t.remain} value={currency(remainingPrincipal)} />
              <Stat label={t.oldMonthly} value={currency(oldMonthly)} />
              <Stat
                label={t.newMonthly}
                value={currency(newMonthly)}
                highlight
              />
              <Stat
                label={t.saving}
                value={
                  saving >= 0
                    ? `${currency(saving)} (lebih hemat)`
                    : `${currency(Math.abs(saving))} (lebih mahal)`
                }
                color={saving >= 0 ? "text-green-500" : "text-red-500"}
              />
            </div>

            <p className="mt-6 text-xs text-gray-500 italic">{t.note}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

// 🔹 Komponen Statistik
function Stat({ label, value, highlight, color }) {
  return (
    <div
      className={`rounded-xl p-4 border ${
        highlight
          ? "bg-[#00ccb0]/10 border-[#00ccb0]/30 text-[#00ccb0]"
          : "border-gray-300"
      }`}
    >
      <div className="text-xs opacity-70 mb-1">{label}</div>
      <div className={`text-lg font-semibold ${color || ""}`}>{value}</div>
    </div>
  );
}
