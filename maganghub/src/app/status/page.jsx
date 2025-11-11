"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Wifi,
  Database,
  Cloud,
  Server,
  Activity,
} from "lucide-react";

export default function StatusPage() {
  const [isDark, setIsDark] = useState(false);

  // 🌙 Deteksi mode gelap
  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Data Status Manual
  const systemStatus = {
    overall: "operational", // operational | partial | down
    lastUpdated: "11 November 2025, 22:30 WIB",
    components: [
      {
        name: "Website Utama",
        status: "operational",
        description: "Halaman utama, navigasi, dan informasi dasar berjalan normal.",
        icon: <Wifi className="w-5 h-5" />,
      },
      {
        name: "Server API",
        status: "maintenance",
        description: "Dalam proses konfigurasi dan pengujian login & data dinamis.",
        icon: <Server className="w-5 h-5" />,
      },
      {
        name: "Basis Data (Database)",
        status: "partial",
        description: "Sebagian data masih statis. Integrasi backend dijadwalkan pada rilis berikutnya.",
        icon: <Database className="w-5 h-5" />,
      },
      {
        name: "Carikan Properti",
        status: "operational",
        description: "Fitur tersedia dan menampilkan hasil statis sesuai preferensi pengguna.",
        icon: <Cloud className="w-5 h-5" />,
      },
      {
        name: "Promo Properti",
        status: "offline",
        description: "Belum aktif — akan diaktifkan setelah fase login dan integrasi API.",
        icon: <Activity className="w-5 h-5" />,
      },
    ],
  };

  const getStatusBadge = (status) => {
    const base =
      "px-2.5 py-0.5 rounded-full text-[12px] font-medium flex items-center gap-1 w-fit";
    switch (status) {
      case "operational":
        return (
          <span className={`${base} bg-green-500/10 text-green-400`}>
            <CheckCircle2 className="w-3.5 h-3.5" /> Normal
          </span>
        );
      case "partial":
        return (
          <span className={`${base} bg-yellow-500/10 text-yellow-400`}>
            <AlertTriangle className="w-3.5 h-3.5" /> Terbatas
          </span>
        );
      case "maintenance":
        return (
          <span className={`${base} bg-blue-500/10 text-blue-400`}>
            <Clock className="w-3.5 h-3.5" /> Maintenance
          </span>
        );
      case "offline":
        return (
          <span className={`${base} bg-red-500/10 text-red-400`}>
            <XCircle className="w-3.5 h-3.5" /> Offline
          </span>
        );
      default:
        return null;
    }
  };

  const getOverallColor = (status) => {
    switch (status) {
      case "operational":
        return "text-green-400";
      case "partial":
        return "text-yellow-400";
      case "maintenance":
        return "text-blue-400";
      case "down":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <main
      className={`min-h-screen pt-28 md:pt-32 pb-28 transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-white text-[#1f2937]"
      }`}
    >
      {/* HERO */}
      <section className="relative text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isDark ? 0.14 : 0.1 }}
          transition={{ duration: 1.2 }}
          className="absolute -top-16 left-10 w-72 h-72 bg-[#00ccb0] rounded-full blur-[120px]"
        />

        <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-5xl font-black tracking-tight mb-4 ${
              isDark
                ? "bg-gradient-to-r from-[#00ccb0] to-[#00e3b5] bg-clip-text text-transparent"
                : "text-[#00a48f]"
            }`}
          >
            Status Sistem
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className={`max-w-2xl mx-auto leading-relaxed text-lg ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Laporan real-time kondisi layanan Namura Property, pembaruan sistem, dan pemeliharaan.
          </motion.p>

          {/* Status Keseluruhan */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-xl border backdrop-blur-xl ${
              isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"
            }`}
          >
            <Activity className={`w-5 h-5 ${getOverallColor(systemStatus.overall)}`} />
            <span
              className={`font-semibold ${getOverallColor(systemStatus.overall)} text-lg`}
            >
              {systemStatus.overall === "operational"
                ? "Semua Sistem Berjalan Normal"
                : systemStatus.overall === "partial"
                ? "Beberapa Sistem Terganggu"
                : systemStatus.overall === "maintenance"
                ? "Sedang Maintenance"
                : "Gangguan Sistem"}
            </span>
          </motion.div>

          <p
            className={`mt-3 text-sm ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Pembaruan terakhir: {systemStatus.lastUpdated}
          </p>
        </div>
      </section>

      {/* DETAIL STATUS */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 mt-16">
        <div className="grid md:grid-cols-2 gap-6">
          {systemStatus.components.map((comp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`rounded-2xl border p-5 backdrop-blur-xl transition ${
                isDark
                  ? "border-white/10 bg-white/5 hover:bg-white/7 hover:border-white/20"
                  : "border-gray-200 bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="text-[#00ccb0]">{comp.icon}</div>
                  <h3
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {comp.name}
                  </h3>
                </div>
                {getStatusBadge(comp.status)}
              </div>
              <p
                className={`text-sm leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {comp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
