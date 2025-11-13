"use client";
import { motion } from "framer-motion";

export default function ImpactEN() {
  const stats = [
    { label: "Units Sold", value: "312+" },
    { label: "Active Project Locations", value: "5" },
    { label: "Investors Joined", value: "120+" },
    { label: "Customer Satisfaction", value: "98%" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0b0f15] text-white py-24 md:py-28">

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-5 md:mb-6 bg-linear-to-r from-[#01907a] to-[#00d6b9] bg-clip-text text-transparent">
          Performance & Growth
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg mb-14 md:mb-16">
          Achievement data that reflects trust and quality toward Namura Property.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-7">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-white/7 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/12 hover:scale-[1.03] transition-all backdrop-blur-xl shadow-sm"
            >
              <div className="text-2xl md:text-3xl font-extrabold text-[#00ccb0]">
                {item.value}
              </div>

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
