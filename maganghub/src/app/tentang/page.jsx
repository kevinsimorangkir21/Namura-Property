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

  // 🌙 Deteksi mode aktif
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
            Tentang Namura Property
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
            Namura Property berkomitmen menghadirkan pengalaman transaksi yang aman,
            transparan, dan patuh regulasi. Kami mempertemukan penjual, pembeli,
            serta institusi pembiayaan melalui proses yang terstandarisasi dan terverifikasi.
          </motion.p>

          {/* Badges */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: <ShieldCheck className="w-4 h-4" />, label: "Audit Keamanan Berkala" },
              { icon: <FileCheck2 className="w-4 h-4" />, label: "Dokumen Tervalidasi" },
              { icon: <Scale className="w-4 h-4" />, label: "Patuh Regulasi" },
              { icon: <Landmark className="w-4 h-4" />, label: "Mitra Notaris/PPAT" },
              { icon: <BadgeCheck className="w-4 h-4" />, label: "Listing Terverifikasi" },
              { icon: <Users className="w-4 h-4" />, label: "Konsultan Berpengalaman" },
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
                {b.label}
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap gap-3">
            <CTA href="/listing" isDark={isDark}>
              Lihat Listing
            </CTA>
            <CTA href="https://wa.me/6281234567890" outline isDark={isDark}>
              Hubungi Konsultan
            </CTA>
          </div>
        </div>
      </section>

      {/* SECTION */}
      <Section title="Nilai Inti Kami" isDark={isDark}>
        <div className="grid md:grid-cols-3 gap-6">
          <Card
            isDark={isDark}
            icon={<ShieldCheck className="w-6 h-6 text-[#00ccb0]" />}
            title="Kepercayaan"
          >
            Seluruh proses diarahkan untuk membangun rasa aman bagi semua pihak —
            melalui verifikasi penjual, penyajian data faktual, dan kontrol kualitas berlapis.
          </Card>
          <Card
            isDark={isDark}
            icon={<FileCheck2 className="w-6 h-6 text-[#00ccb0]" />}
            title="Transparansi"
          >
            Informasi properti ditampilkan apa adanya, termasuk status legalitas,
            spesifikasi, serta riwayat dokumen agar keputusan didasari data yang jelas.
          </Card>
          <Card
            isDark={isDark}
            icon={<Scale className="w-6 h-6 text-[#00ccb0]" />}
            title="Kepatuhan Regulasi"
          >
            Bermitra dengan PPAT/Notaris, mematuhi ketentuan perpajakan & perizinan—
            transaksi berjalan sesuai hukum yang berlaku.
          </Card>
        </div>
      </Section>

      {/* Layanan Utama */}
      <Section title="Layanan Utama" isDark={isDark}>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Building2 className="w-6 h-6 text-[#00ccb0]" />,
              title: "Pencarian & Listing",
              desc: "Eksplorasi listing terverifikasi berdasar lokasi, harga, tipe, dan preferensi.",
            },
            {
              icon: <Handshake className="w-6 h-6 text-[#00ccb0]" />,
              title: "Konsultasi Transaksi",
              desc: "Pendampingan negosiasi, komparasi harga pasar, hingga strategi penawaran.",
            },
            {
              icon: <Landmark className="w-6 h-6 text-[#00ccb0]" />,
              title: "Legal & Notarial",
              desc: "Koordinasi dokumen, cek sertifikat, AJB, balik nama, roya, hingga pajak.",
            },
            {
              icon: <MapPinned className="w-6 h-6 text-[#00ccb0]" />,
              title: "Survey & Due Diligence",
              desc: "Penjadwalan survey lapangan/virtual, pengecekan lingkungan & akses.",
            },
          ].map((s, i) => (
            <Card key={i} icon={s.icon} title={s.title} isDark={isDark}>
              {s.desc}
            </Card>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section title="Perjalanan & Tonggak Pencapaian" isDark={isDark}>
        <Timeline isDark={isDark} />
      </Section>
    </main>
  );
}

/* ========== Reusable Components ========== */

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
          <h3
            className={`font-semibold mb-1 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-sm leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {children}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function Timeline({ isDark }) {
  const items = [
    {
      year: "2022",
      title: "Fondasi & Validasi Pasar",
      desc: "Riset kebutuhan pengguna dan pelaku industri; standar verifikasi listing; kerangka kepatuhan awal.",
    },
    {
      year: "2023",
      title: "Kemitraan Legal",
      desc: "Kolaborasi dengan jaringan PPAT/Notaris & konsultan pajak untuk menjaga kepastian hukum transaksi.",
    },
    {
      year: "2024",
      title: "Standarisasi Kualitas",
      desc: "Kebijakan verifikasi dokumen; pedoman foto; kontrol mutu onboarding penjual.",
    },
    {
      year: "2025",
      title: "Skala & Keamanan",
      desc: "Audit internal, enkripsi data, dan monitoring kepatuhan berkesinambungan.",
    },
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
                className={`mt-3 font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
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

            <div className={`relative ${i % 2 === 1 ? "md:order-1" : ""}`}>
              <div className="hidden md:block absolute left-[-1.1rem] top-2 w-2.5 h-2.5 rounded-full bg-[#00ccb0] shadow-[0_0_24px_rgba(0,204,176,0.5)]" />
              <div
                className={`rounded-2xl border p-5 transition backdrop-blur-xl ${
                  isDark
                    ? "border-white/10 bg-white/5"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Standar operasional dan protokol verifikasi dikembangkan untuk
                  menjaga keandalan sistem dan kepastian hukum.
                </p>
              </div>
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
