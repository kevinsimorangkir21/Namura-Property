"use client";
import { motion } from "framer-motion";

export default function Impact() {
  const stats = [
    { label: "Unit Terjual", value: "312+" },
    { label: "Lokasi Proyek Aktif", value: "5" },
    { label: "Investor Bergabung", value: "120+" },
    { label: "Konsumen Puas", value: "98%" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0b0f15] text-white py-24 md:py-28">

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-5 md:mb-6 bg-linear-to-r from-[#01907a] to-[#00d6b9] bg-clip-text text-transparent">
          Kinerja & Pertumbuhan
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg mb-14 md:mb-16">
          Data pencapaian yang mencerminkan kualitas dan kepercayaan terhadap Namura Property.
        </p>

        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-4
            gap-4
            md:gap-7
          "
        >
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="
                bg-white/7 border border-white/10
                rounded-2xl p-6 md:p-8
                hover:bg-white/12 hover:scale-[1.03]
                transition-all backdrop-blur-xl shadow-sm
              "
            >
              {/* VALUE */}
              <div className="text-2xl md:text-3xl font-extrabold text-[#00ccb0]">
                {item.value}
              </div>
              
              {/* LABEL */}
              <div className="text-gray-300 text-[11px] md:text-xs mt-1 font-medium">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
