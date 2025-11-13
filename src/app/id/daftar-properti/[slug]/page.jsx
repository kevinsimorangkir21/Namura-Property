"use client";

import { notFound } from "next/navigation";
import { propertiesData } from "@/data/propertiesData";
import { slugify } from "@/utils/slugify";
import { MapPin, Home, Phone, User, Building2 } from "lucide-react";

export default function PropertyDetailID({ params }) {
  const slug = params.slug;

  const prop = propertiesData.find(
    (p) => `${p.id}-${slugify(p.title.id)}` === slug
  );

  if (!prop) return notFound();

  const details = prop.details.id;

  return (
    <div className="pt-28 pb-24 px-6 max-w-6xl mx-auto text-white">
      {/* Title */}
      <h1 className="text-4xl font-black">{prop.title.id}</h1>
      <p className="mt-3 text-gray-300">{prop.desc.id}</p>

      {/* Main Image */}
      <div className="mt-8 rounded-2xl overflow-hidden">
        <img
          src={prop.img}
          alt={prop.title.id}
          className="w-full object-cover"
        />
      </div>

      {/* Badges */}
      <div className="flex items-center gap-3 mt-6">
        {prop.premium && (
          <span className="px-3 py-1 rounded-full bg-yellow-500 text-black font-medium">
            Premium
          </span>
        )}

        <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20">
          <Home size={16} />
          {prop.type.id}
        </span>

        <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20">
          <MapPin size={16} />
          {prop.location}
        </span>
      </div>

      {/* Price */}
      <div className="mt-6 text-3xl font-bold text-[#00ccb0]">
        {prop.price}
      </div>

      {/* Property Details */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 border border-white/10 p-6 rounded-2xl">
        {Object.entries(details).map(([key, value]) => (
          <div key={key} className="flex justify-between border-b border-white/10 py-2">
            <span className="capitalize text-gray-400">
              {key.replace(/([A-Z])/g, " $1")}
            </span>
            <span className="font-medium text-gray-200">{value}</span>
          </div>
        ))}
      </div>

      {/* Company & Consultant */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Company */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Building2 size={20} /> Info Perusahaan
          </h2>

          <p className="text-lg font-semibold">{prop.company.name}</p>

          <div className="mt-2">
            <p className="text-gray-400">Telepon:</p>
            <a
              href={`tel:${prop.company.phone}`}
              className="text-[#00ccb0] font-medium"
            >
              {prop.company.phone}
            </a>
          </div>
        </div>

        {/* Consultant */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <User size={20} /> Konsultan Properti
          </h2>

          <div className="flex items-center gap-4">
            <img
              src={prop.consultant.photo}
              alt={prop.consultant.name}
              className="w-16 h-16 rounded-full object-cover border border-white/20"
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
