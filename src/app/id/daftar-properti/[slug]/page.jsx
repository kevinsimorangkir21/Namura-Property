"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { propertiesData } from "@/data/propertiesData";
import { slugify } from "@/utils/slugify";
import { MapPin, Home, User, Building2 } from "lucide-react";

export default function PropertyDetailID({ params }) {
  const slug = params.slug;
  const [isDark, setIsDark] = useState(false);

  const prop = propertiesData.find(
    (p) => `${p.id}-${slugify(p.title.id)}` === slug
  );

  if (!prop) return notFound();

  const details = prop.details.id;

  // Detect theme
  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    updateTheme();

    const obs = new MutationObserver(updateTheme);
    obs.observe(document.documentElement, { attributes: true });

    return () => obs.disconnect();
  }, []);

  return (
    <div
      className={`pt-28 pb-24 px-6 max-w-6xl mx-auto transition-colors duration-300 ${
        isDark ? "text-white" : "text-gray-800"
      }`}
    >
      {/* Title */}
      <h1 className="text-4xl font-black">{prop.title.id}</h1>
      <p className={`mt-3 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
        {prop.desc.id}
      </p>

      {/* Main Image */}
      <div className="mt-8 rounded-2xl overflow-hidden">
        <img src={prop.img} className="w-full object-cover" />
      </div>

      {/* Badges */}
      <div className="flex items-center gap-3 mt-6">
        {prop.premium && (
          <span className="px-3 py-1 rounded-full bg-yellow-400 text-black font-medium">
            Premium
          </span>
        )}

        <span
          className={`flex items-center gap-2 px-3 py-1 rounded-full border ${
            isDark
              ? "bg-white/10 border-white/20"
              : "bg-gray-100 border-gray-300 text-gray-700"
          }`}
        >
          <Home size={16} /> {prop.type.id}
        </span>

        <span
          className={`flex items-center gap-2 px-3 py-1 rounded-full border ${
            isDark
              ? "bg-white/10 border-white/20"
              : "bg-gray-100 border-gray-300 text-gray-700"
          }`}
        >
          <MapPin size={16} /> {prop.location}
        </span>
      </div>

      {/* Price */}
      <div className="mt-6 text-3xl font-bold text-[#00ccb0]">
        {prop.price}
      </div>

      {/* Property Details */}
      <div
        className={`mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl border transition ${
          isDark
            ? "bg-white/5 border-white/10"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        {Object.entries(details).map(([key, value]) => (
          <div
            key={key}
            className={`flex justify-between py-2 border-b ${
              isDark ? "border-white/10" : "border-gray-300"
            }`}
          >
            <span className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {key.replace(/([A-Z])/g, " $1")}
            </span>
            <span
              className={`font-medium ${
                isDark ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Company & Consultant */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Company */}
        <div
          className={`p-6 rounded-2xl border transition ${
            isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
          }`}
        >
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Building2 size={20} /> Info Perusahaan
          </h2>

          <p className="text-lg font-semibold">{prop.company.name}</p>

          <div className="mt-2">
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Telepon:
            </p>
            <a
              href={`tel:${prop.company.phone}`}
              className="text-[#00ccb0] font-medium"
            >
              {prop.company.phone}
            </a>
          </div>
        </div>

        {/* Consultant */}
        <div
          className={`p-6 rounded-2xl border transition ${
            isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
          }`}
        >
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <User size={20} /> Konsultan Properti
          </h2>

          <div className="flex items-center gap-4">
            <img
              src={prop.consultant.photo}
              className="w-16 h-16 rounded-full object-cover border border-black/10"
            />
            <div>
              <p className="text-lg font-semibold">{prop.consultant.name}</p>
              <a
                href={`https://wa.me/${prop.consultant.whatsapp}`}
                className="text-[#00ccb0] font-medium"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <h2 className="mt-14 text-2xl font-bold">Galeri</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {prop.gallery.map((img, i) => (
          <div key={i} className="rounded-xl overflow-hidden">
            <img src={img} className="w-full h-40 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
