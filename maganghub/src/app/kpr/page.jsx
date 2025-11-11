"use client";

import React, { useEffect, useMemo, useState } from "react";

// 🔹 Data 10 Bank Besar Indonesia
const BANKS = [
  { id: "mandiri", name: "Mandiri", annual: 8.25, maxTenor: 25 },
  { id: "bri", name: "BRI", annual: 8.50, maxTenor: 25 },
  { id: "bca", name: "BCA", annual: 8.75, maxTenor: 25 },
  { id: "btn", name: "BTN", annual: 9.00, maxTenor: 30 },
  { id: "bni", name: "BNI", annual: 8.40, maxTenor: 25 },
  { id: "bsi", name: "BSI (Syariah)", annual: 7.50, maxTenor: 20 },
  { id: "cimb", name: "CIMB Niaga", annual: 9.25, maxTenor: 20 },
  { id: "ocbc", name: "OCBC NISP", annual: 8.60, maxTenor: 25 },
  { id: "permata", name: "Permata", annual: 8.90, maxTenor: 25 },
  { id: "danamon", name: "Danamon", annual: 9.10, maxTenor: 25 },
];

// 🔹 Format Rupiah
const currency = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Math.round(v || 0));

// 🔹 Rumus Cicilan (Amortisasi)
function monthlyPayment(principal, annualRate, years) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

// 🔹 Halaman Kalkulator
export default function KprPerBankPage() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("id");

  const [bankId, setBankId] = useState(BANKS[0].id);
  const [price, setPrice] = useState(1000000000);
  const [dpPercent, setDpPercent] = useState(20);
  const [dpAmountOverride, setDpAmountOverride] = useState("");
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(BANKS[0].annual);

  // 🔸 Deteksi Dark Mode
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

  // 🔸 Deteksi Bahasa (dari Navbar)
  useEffect(() => {
    const loadLang = () => setLang(localStorage.getItem("lang") || "id");
    loadLang();
    window.addEventListener("languageChange", loadLang);
    return () => window.removeEventListener("languageChange", loadLang);
  }, []);

  // 🔸 Ubah rate & tenor saat bank berganti
  useEffect(() => {
    const bank = BANKS.find((x) => x.id === bankId);
    if (bank) {
      setRate(bank.annual);
      if (years > bank.maxTenor) setYears(bank.maxTenor);
    }
  }, [bankId]);

  // 🔸 Perhitungan dasar
  const dpAmount = useMemo(() => {
    if (dpAmountOverride && Number(dpAmountOverride) > 0)
      return Number(dpAmountOverride);
    return (price * dpPercent) / 100;
  }, [price, dpPercent, dpAmountOverride]);

  const principal = Math.max(0, price - dpAmount);
  const monthly = monthlyPayment(principal, rate, years);
  const totalPaid = monthly * years * 12 + dpAmount;
  const totalInterest = totalPaid - price;

  // 🔸 Perbandingan semua bank
  const comparison = useMemo(() => {
    return BANKS.map((b) => ({
      ...b,
      monthly: monthlyPayment(principal, b.annual, years),
    })).sort((a, b) => a.monthly - b.monthly);
  }, [principal, years]);

  // 🔸 Bilingual Text
  const t = {
    id: {
      title: "Kalkulator KPR per Bank",
      subtitle:
        "Simulasikan cicilan berdasarkan suku bunga dan tenor masing-masing bank.",
      price: "Harga Properti (Rp)",
      dpPercent: "Uang Muka (%)",
      dpAmount: "Uang Muka (Rp)",
      tenor: "Tenor (Tahun)",
      rate: "Suku Bunga Tahunan (%)",
      monthly: "Cicilan per Bulan",
      principal: "Pokok Pinjaman",
      totalInterest: "Total Bunga",
      totalPaid: "Total Pembayaran",
      compare: "Perbandingan Bank",
    },
    en: {
      title: "Mortgage Calculator per Bank",
      subtitle:
        "Simulate monthly installments for each bank's interest rate and tenor.",
      price: "Property Price (Rp)",
      dpPercent: "Down Payment (%)",
      dpAmount: "Down Payment (Rp)",
      tenor: "Loan Term (Years)",
      rate: "Annual Interest Rate (%)",
      monthly: "Monthly Payment",
      principal: "Loan Principal",
      totalInterest: "Total Interest",
      totalPaid: "Total Payment",
      compare: "Bank Comparison",
    },
  }[lang];

  return (
    <main
      className={`min-h-screen pt-28 pb-28 transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <header className="mb-8">
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

        {/* Kontainer Utama */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Input Form */}
          <div
            className={`rounded-2xl border p-5 ${
              isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
            }`}
          >
            <label className="block text-sm mb-1 font-medium">Bank</label>
            <select
              value={bankId}
              onChange={(e) => setBankId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg mb-3 border"
            >
              {BANKS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} — {b.annual}% (max {b.maxTenor}y)
                </option>
              ))}
            </select>

            <label className="block text-sm mb-1 font-medium">{t.price}</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg mb-3 border"
            />

            <label className="block text-sm mb-1 font-medium">{t.dpPercent}</label>
            <input
              type="number"
              value={dpPercent}
              onChange={(e) => setDpPercent(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg mb-3 border"
            />

            <label className="block text-sm mb-1 font-medium">{t.dpAmount}</label>
            <input
              type="number"
              placeholder="override (opsional)"
              value={dpAmountOverride}
              onChange={(e) => setDpAmountOverride(e.target.value)}
              className="w-full px-3 py-2 rounded-lg mb-3 border"
            />

            <label className="block text-sm mb-1 font-medium">{t.tenor}</label>
            <input
              type="range"
              min="1"
              max={BANKS.find((x) => x.id === bankId).maxTenor}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full mb-2"
            />
            <p className="text-xs mb-3">
              {years} {lang === "id" ? "tahun" : "years"}
            </p>

            <label className="block text-sm mb-1 font-medium">{t.rate}</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg mb-3 border"
            />
          </div>

          {/* Output */}
          <div
            className={`md:col-span-2 rounded-2xl border p-5 ${
              isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
            }`}
          >
            <div className="grid md:grid-cols-3 gap-4">
              <Stat label={t.principal} value={currency(principal)} />
              <Stat
                label={t.monthly}
                value={currency(monthly)}
                highlight
              />
              <Stat label={t.totalInterest} value={currency(totalInterest)} />
              <Stat label={t.totalPaid} value={currency(totalPaid)} />
            </div>

            <h3 className="mt-8 mb-3 font-semibold">{t.compare}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    <th className="text-left pb-2">Bank</th>
                    <th className="text-left pb-2">Rate</th>
                    <th className="text-left pb-2">{t.monthly}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((b) => (
                    <tr key={b.id}>
                      <td className="py-2">{b.name}</td>
                      <td className="py-2">{b.annual}%</td>
                      <td className="py-2 font-medium">{currency(b.monthly)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-gray-500 italic">
              {lang === "id"
                ? "Perhitungan hanya simulasi. Konsultasikan ke bank terkait untuk angka final."
                : "Estimates only. Consult your bank for final figures."}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

// 🔹 Komponen Kecil: Kotak Statistik
function Stat({ label, value, highlight }) {
  return (
    <div
      className={`rounded-xl p-4 border ${
        highlight
          ? "bg-[#00ccb0]/10 border-[#00ccb0]/30 text-[#00ccb0]"
          : "border-gray-300"
      }`}
    >
      <div className="text-xs opacity-70 mb-1">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}
