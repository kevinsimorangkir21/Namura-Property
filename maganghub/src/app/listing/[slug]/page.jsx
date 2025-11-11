"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { propertiesData } from "@/data/propertiesData";
import { MapPin, Home, ArrowRight, Building2 } from "lucide-react";

function parseIdFromSlug(slug) {
  if (!slug) return null;
  const idPart = String(slug).split("-")[0];
  const id = parseInt(idPart, 10);
  return Number.isNaN(id) ? null : id;
}

const slugify = (s) =>
  (s || "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const formatIDR = (num) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Math.round(num || 0));

const getProvince = (locationStr) => (locationStr || "").split(",")[0].trim();

export default function PropertyDetail({ params }) {
  const [isDark, setIsDark] = useState(false);

  // detect theme
  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const id = parseIdFromSlug(params.slug);
  const prop = propertiesData.find((p) => p.id === id);
  if (!prop) return notFound();

  const parsePrice = useMemo(() => {
    const digits = (prop.price || "").replace(/[^\d]/g, "");
    return Number(digits || 0);
  }, [prop.price]);

  const [price, setPrice] = useState(parsePrice || 0);
  const [dpPercent, setDpPercent] = useState(20);
  const [years, setYears] = useState(15);
  const [interest, setInterest] = useState(5);

  const dpAmount = (dpPercent / 100) * price;
  const principal = Math.max(price - dpAmount, 0);
  const r = interest / 100 / 12;
  const n = years * 12;
  const monthly =
    r > 0 ? principal * (r / (1 - Math.pow(1 + r, -n))) : principal / Math.max(n, 1);

  const specEntries = Object.entries(prop.details || {});
  const currentProvince = getProvince(prop.location);

  const relatedHybrid = useMemo(() => {
    const sameTypeSameProv = propertiesData.filter(
      (p) =>
        p.id !== prop.id &&
        p.type === prop.type &&
        getProvince(p.location) === currentProvince
    );

    if (sameTypeSameProv.length > 0) return sameTypeSameProv.slice(0, 4);

    const sameType = propertiesData.filter((p) => p.id !== prop.id && p.type === prop.type);
    if (sameType.length > 0) return sameType.slice(0, 4);

    const others = propertiesData.filter((p) => p.id !== prop.id);
    return others.slice(0, 4);
  }, [prop.id, prop.type, currentProvince]);

  return (
    <main
      className={`min-h-screen pt-24 pb-28 transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-[#ffffff] text-[#1f2937]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header visual */}
        <div
          className={`w-full rounded-2xl sm:rounded-3xl overflow-hidden border mb-10 ${
            isDark ? "border-white/10" : "border-gray-200 shadow-md"
          }`}
        >
          <img
            src={prop.img}
            alt={prop.title}
            className="w-full h-[240px] sm:h-[320px] md:h-[400px] object-cover"
          />
        </div>

        {/* Title */}
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight ${
            isDark
              ? "bg-gradient-to-r from-[#01907a] to-[#00d6b9] bg-clip-text text-transparent"
              : "text-gray-900"
          }`}
        >
          {prop.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3 mb-8 text-[12px] sm:text-[13px]">
          {[
            { icon: <Home className="w-4 h-4" />, text: prop.type },
            { icon: <MapPin className="w-4 h-4" />, text: prop.location },
          ].map((tag, i) => (
            <span
              key={i}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border ${
                isDark
                  ? "bg-white/10 border-white/10"
                  : "bg-gray-100 border-gray-300 text-gray-700"
              }`}
            >
              {tag.icon} {tag.text}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t pt-8 mb-10 ${
            isDark ? "border-white/10" : "border-gray-200"
          }`}
        >
          <div>
            <div className="text-[#00ccb0] font-black text-2xl sm:text-3xl">{prop.price}</div>
            {prop.perMeter && (
              <div className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Per m²: {prop.perMeter}
              </div>
            )}
          </div>

          <a
            href={`https://wa.me/${prop.consultant?.whatsapp?.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
              `Halo, saya tertarik dengan properti: ${prop.title} (${prop.price}).`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`group w-full sm:w-auto text-center px-6 py-3 rounded-xl border font-semibold inline-flex items-center justify-center gap-3 transition ${
              isDark
                ? "border-[#00ccb0] text-[#00ccb0] hover:bg-white/5"
                : "border-[#00a48f] text-[#00a48f] hover:bg-[#00ccb0]/10"
            }`}
          >
            Hubungi Konsultan
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </a>
        </div>

        {/* Company + Consultant */}
        <div className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company */}
          <div
            className={`rounded-2xl p-5 sm:p-6 border ${
              isDark
                ? "bg-white/8 border-white/10"
                : "bg-gray-50 border-gray-200 shadow-sm"
            }`}
          >
            <h3 className="text-lg font-semibold text-[#00ccb0] mb-2">
              Informasi Perusahaan
            </h3>
            <div className={isDark ? "text-gray-200" : "text-gray-800"}>
              {prop.company?.name || "-"}
            </div>
            {prop.company?.website && (
              <a
                href={prop.company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#00ccb0] hover:underline break-all"
              >
                {prop.company.website}
              </a>
            )}
            {prop.company?.phone && (
              <div className={`text-sm mt-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Telp: {prop.company.phone}
              </div>
            )}
          </div>

          {/* Consultant */}
          <div
            className={`rounded-2xl p-5 sm:p-6 flex items-center gap-4 flex-col sm:flex-row text-center sm:text-left border ${
              isDark
                ? "bg-white/8 border-white/10"
                : "bg-gray-50 border-gray-200 shadow-sm"
            }`}
          >
            {prop.consultant?.photo && (
              <img
                src={prop.consultant.photo}
                alt={prop.consultant.name}
                className="w-16 h-16 rounded-xl object-cover border border-[#00ccb0]/20"
              />
            )}
            <div>
              <h3 className="text-lg font-semibold text-[#00ccb0] mb-1">
                Konsultan Penanggung Jawab
              </h3>
              <div className={isDark ? "text-gray-200" : "text-gray-800"}>
                {prop.consultant?.name || "-"}
              </div>
              {prop.consultant?.whatsapp && (
                <a
                  href={`https://wa.me/${prop.consultant.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Halo, saya tertarik dengan properti: ${prop.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sm text-[#00ccb0] hover:underline"
                >
                  Chat langsung WA →
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Detail Properti */}
        <section className="mb-14">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Detail Properti</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {specEntries.map(([label, value]) => (
              <div
                key={label}
                className={`rounded-xl p-4 border transition ${
                  isDark
                    ? "bg-white/8 border-white/10 hover:bg-white/12"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <div className={`text-[12px] uppercase mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {label.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}
                </div>
                <div className={isDark ? "text-gray-100" : "text-gray-800"}>{value || "-"}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        {prop.gallery && prop.gallery.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Gallery Foto Properti</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {prop.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl overflow-hidden border transition-transform duration-200 ${
                    isDark
                      ? "border-white/10 hover:border-[#00ccb0]/50 hover:scale-[1.02]"
                      : "border-gray-200 hover:border-[#00ccb0]/50 hover:scale-[1.02]"
                  }`}
                >
                  <img src={img} alt={`Foto ${idx + 1}`} className="w-full h-56 object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Simulasi KPR */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Simulasi Cicilan KPR</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Input */}
            <div
              className={`md:col-span-2 rounded-2xl p-4 sm:p-5 border ${
                isDark
                  ? "bg-white/8 border-white/10"
                  : "bg-gray-50 border-gray-200 shadow-sm"
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  ["Harga Properti (Rp)", price.toLocaleString("id-ID"), (v) => setPrice(Number(v.replace(/[^\d]/g, "")))],
                  ["Uang Muka (%)", dpPercent, (v) => setDpPercent(Number(v))],
                  ["Jangka Waktu (tahun)", years, (v) => setYears(Number(v))],
                  ["Suku Bunga (%/tahun)", interest, (v) => setInterest(Number(v))],
                ].map(([label, value, handler], i) => (
                  <div key={i}>
                    <label className={`block text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {label}
                    </label>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => handler(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#00ccb0] ${
                        isDark
                          ? "bg-white/10 border-white/10 text-gray-100"
                          : "bg-white border-gray-300 text-gray-800"
                      }`}
                    />
                    {i === 1 && (
                      <div className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        ≈ {formatIDR(dpAmount)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Output */}
            <div
              className={`rounded-2xl p-5 border ${
                isDark
                  ? "bg-white/8 border-white/10"
                  : "bg-gray-50 border-gray-200 shadow-sm"
              }`}
            >
              <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Jumlah Angsuran / bulan
              </div>
              <div className="text-2xl font-extrabold text-[#00ccb0] mt-1">{formatIDR(monthly)}</div>
              <div className={`mt-4 space-y-1 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                <div>Pokok pinjaman: <span className="font-medium">{formatIDR(principal)}</span></div>
                <div>Tenor: <span className="font-medium">{years} tahun</span> ({years * 12} bulan)</div>
                <div>Bunga efektif: <span className="font-medium">{interest}% / tahun</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Rekomendasi Serupa</h2>
          {relatedHybrid.length === 0 ? (
            <div className={isDark ? "text-gray-400" : "text-gray-600"}>Belum ada properti serupa.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedHybrid.map((p) => (
                <div
                  key={p.id}
                  className={`rounded-2xl overflow-hidden border transition-all ${
                    isDark
                      ? "bg-white/8 border-white/10 hover:bg-white/12"
                      : "bg-white border-gray-200 hover:shadow-[0_8px_25px_-10px_rgba(0,200,180,0.25)]"
                  }`}
                >
                  <div className="w-full h-40 overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <div
                      className={`flex flex-wrap gap-1 text-[10px] mb-2 ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border ${
                          isDark
                            ? "bg-white/10 border-white/10"
                            : "bg-gray-100 border-gray-300 text-gray-700"
                        }`}
                      >
                        <Home className="w-3 h-3" /> {p.type}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border ${
                          isDark
                            ? "bg-white/10 border-white/10"
                            : "bg-gray-100 border-gray-300 text-gray-700"
                        }`}
                      >
                        <MapPin className="w-3 h-3" /> {p.location}
                      </span>
                    </div>
                    <div className={isDark ? "text-gray-100" : "text-gray-800"}>{p.title}</div>
                    <div className="text-[#00ccb0] font-bold text-sm mt-1">{p.price}</div>
                    <div className="mt-3 flex justify-end">
                      <Link href={`/listing/${p.id}-${slugify(p.title)}`}>
                        <button className="px-3 py-2 rounded-lg border border-[#00ccb0] text-[#00ccb0] hover:bg-[#00ccb0]/10 transition text-xs font-semibold inline-flex items-center gap-1">
                          Lihat Detail
                          <Building2 className="w-3.5 h-3.5" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
