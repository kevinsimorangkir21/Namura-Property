"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Phone, MapPin, ArrowRight, Building2 } from "lucide-react";

export default function Contact() {
  return (
    <main className="min-h-screen bg-[#0b0f15] text-white pt-28 md:pt-32 pb-28">
      {/* HERO */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18 }}
          transition={{ duration: 1.4 }}
          className="absolute -top-14 right-10 w-72 h-72 bg-[#00bca6] rounded-full blur-[120px]"
        />

        <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black bg-linear-to-r from-[#01907a] to-[#00d6b9] bg-clip-text text-transparent mb-5"
          >
            Hubungi Kami
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-lg"
          >
            Silakan hubungi tim kami apabila membutuhkan bantuan, klarifikasi, atau dukungan terkait informasi listing, proses transaksi, dan kerja sama.
          </motion.p>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 mt-20 grid md:grid-cols-3 gap-7">
        <Card icon={<Mail className="w-6 h-6 text-[#00ccb0]" />} title="Email Resmi">
          info@namuraproperty.com
        </Card>

        <Card icon={<Phone className="w-6 h-6 text-[#00ccb0]" />} title="Tim Support">
          +62 812-3456-7890
        </Card>

        <Card icon={<MessageSquare className="w-6 h-6 text-[#00ccb0]" />} title="WhatsApp">
          +62 822-8251-2619
        </Card>
      </section>

      {/* ADDRESS */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 mt-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 mb-3">
          <Building2 className="w-4 h-4 text-[#00ccb0]" /> Kantor Operasional
        </div>
        <h3 className="font-semibold text-xl mb-3 text-gray-200">Bandar Lampung</h3>
        <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
          Jl. Zainal Abidin Pagar Alam No. XX, Bandar Lampung<br />Lampung – Indonesia
        </p>
      </section>

      {/* MAP PREVIEW */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 mt-16 grid md:grid-cols-2 gap-6 items-center rounded-2xl border border-white/10 bg-white/5 p-5">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-[#00ccb0] mb-2">
            <MapPin className="w-5 h-5" /> Peta & Arah
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Lihat lokasi kantor kami di Google Maps dan atur rute terbaik menuju lokasi.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.google.com/maps/place/Rumah+Kevins/@-5.3608898,105.2819202,849m/data=!3m2!1e3!4b1!4m6!3m5!1s0x2e40c583fc7fc6cd:0x6484f62c5d1dcea0!8m2!3d-5.3608952!4d105.2867911!16s%2Fg%2F11f7s_9mxy?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00ccb0] text-black hover:opacity-90 transition font-semibold text-sm"
            >
              Buka Google Maps <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://wa.me/6282282512619?text=Halo%20Namura%20Property%2C%20saya%20ingin%20atur%20janji%20kunjungan%20ke%20kantor."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#00ccb0] text-[#00ccb0] hover:bg-[#00ccb0]/10 transition font-semibold text-sm"
            >
              Atur Janji via WA <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10 h-[260px] md:h-[280px] shadow-[0_0_20px_rgba(0,204,176,0.15)]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.0406044748653!2d105.2819202!3d-5.3608952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40c583fc7fc6cd%3A0x6484f62c5d1dcea0!2sRumah%20Kevins!5e0!3m2!1sid!2sid!4v1731310000000!5m2!1sid!2sid"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          ></iframe>
        </div>
      </section>
    </main>
  );
}

/* Card component */
function Card({ icon, title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 hover:bg-white/7 hover:border-white/20 transition text-center"
    >
      <div className="flex justify-center mb-3">{icon}</div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <div className="text-sm text-gray-300">{children}</div>
    </motion.div>
  );
}
