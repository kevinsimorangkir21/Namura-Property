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

export default function AboutEN() {
  const [isDark, setIsDark] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <main
      className={`min-h-screen pt-28 md:pt-32 pb-28 ${
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
            className="text-4xl md:text-5xl font-black tracking-tight"
          >
            About Namura Property
          </motion.h1>

          <div className="relative mt-3">
            <span className="block h-[3px] w-28 rounded-full bg-[#00ccb0]" />
            <span className="absolute top-1/2 -translate-y-1/2 h-4 w-28 bg-[#00ccb0] blur-[12px] opacity-30" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="max-w-3xl leading-relaxed text-[1.075rem] mt-6"
          >
            Namura Property is committed to delivering a secure, transparent, 
            and regulation-compliant property transaction experience — 
            connecting sellers, buyers, and financial institutions through 
            verified and standardized processes.
          </motion.p>

          {/* BADGES */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: <ShieldCheck />, text: "Security Audit" },
              { icon: <FileCheck2 />, text: "Verified Documents" },
              { icon: <Scale />, text: "Regulatory Compliance" },
              { icon: <Landmark />, text: "Notary Partners" },
              { icon: <BadgeCheck />, text: "Verified Listings" },
              { icon: <Users />, text: "Experienced Consultants" },
            ].map((b, i) => (
              <BadgeEN key={i} icon={b.icon} text={b.text} isDark={isDark} delay={i * 0.05} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-9 flex flex-wrap gap-3">
            <CTA href="/en/listing" isDark={isDark}>View Listings</CTA>
            <CTA href="https://wa.me/6281234567890" outline isDark={isDark}>Contact Consultant</CTA>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <Section title="Our Core Values" isDark={isDark}>
        <div className="grid md:grid-cols-3 gap-6">
          <Card
            isDark={isDark}
            icon={<ShieldCheck className="w-6 h-6 text-[#00ccb0]" />}
            title="Trust"
          >
            We ensure every step builds confidence through seller verification 
            and factual data presentation.
          </Card>

          <Card
            isDark={isDark}
            icon={<FileCheck2 className="w-6 h-6 text-[#00ccb0]" />}
            title="Transparency"
          >
            Property information is presented as it is — including legality, 
            specifications, and document history.
          </Card>

          <Card
            isDark={isDark}
            icon={<Scale className="w-6 h-6 text-[#00ccb0]" />}
            title="Regulatory Compliance"
          >
            We collaborate with certified notaries and comply with current 
            tax and legal regulations.
          </Card>
        </div>
      </Section>

      {/* SERVICES */}
      <Section title="Main Services" isDark={isDark}>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Building2 className="w-6 h-6 text-[#00ccb0]" />,
              title: "Search & Listing",
              desc: "Explore verified listings based on location, price, and property type.",
            },
            {
              icon: <Handshake className="w-6 h-6 text-[#00ccb0]" />,
              title: "Transaction Consulting",
              desc: "Guidance in negotiation and strategy for the best offer.",
            },
            {
              icon: <Landmark className="w-6 h-6 text-[#00ccb0]" />,
              title: "Legal & Notarial",
              desc: "Document coordination, certifications, sale deeds, and tax handling.",
            },
            {
              icon: <MapPinned className="w-6 h-6 text-[#00ccb0]" />,
              title: "Survey & Due Diligence",
              desc: "Inspection of location, surroundings, and physical property condition.",
            },
          ].map((s, i) => (
            <Card key={i} icon={s.icon} title={s.title} isDark={isDark}>
              {s.desc}
            </Card>
          ))}
        </div>
      </Section>

      {/* TIMELINE */}
      <Section title="Journey & Milestones" isDark={isDark}>
        <Timeline
          isDark={isDark}
          items={[
            { year: "2022", title: "Foundation & Market Validation", desc: "User research & early verification standards." },
            { year: "2023", title: "Legal Partnership", desc: "Collaborations with notaries & tax advisors." },
            { year: "2024", title: "Quality Standardization", desc: "Document verification & photo guidelines." },
            { year: "2025", title: "Scaling & Security", desc: "Internal audits and continuous data encryption." },
          ]}
        />
      </Section>
    </main>
  );
}

/* --------------------- COMPONENTS --------------------- */

function BadgeEN({ icon, text, isDark, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-[12px] ${
        isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
      }`}
    >
      <span className="text-[#00ccb0]">{icon}</span>
      {text}
    </motion.div>
  );
}

function Section({ title, children, isDark }) {
  return (
    <section className="relative mt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <h2 className={`text-2xl md:text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          {title}
        </h2>

        <div className="relative mt-3 mb-6">
          <span className="block h-[3px] w-24 rounded-full bg-[#00ccb0]" />
          <span className="absolute top-1/2 -translate-y-1/2 h-4 w-24 bg-[#00ccb0] blur-[12px] opacity-30" />
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
      className={`rounded-2xl border p-6 backdrop-blur-xl ${
        isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">{icon}</div>

        <div>
          <h3 className={`font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
            {title}
          </h3>
          <p className={`text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            {children}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function Timeline({ isDark, items }) {
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
            className="grid md:grid-cols-2 gap-6 md:gap-10"
          >
            <div className={`md:text-right ${i % 2 === 1 ? "md:order-2" : ""}`}>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] border ${
                isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
              }`}>
                <Clock className="w-4 h-4 text-[#00ccb0]" />
                {it.year}
              </div>

              <h3 className={`mt-3 font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                {it.title}
              </h3>

              <p className={`text-sm mt-1 leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                {it.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CTA({ href, children, outline, isDark }) {
  return outline ? (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border font-semibold text-sm ${
        isDark ? "border-[#00ccb0] text-[#00ccb0]" : "border-[#00a48f] text-[#00a48f]"
      }`}
    >
      {children} <ArrowRight className="w-4 h-4" />
    </Link>
  ) : (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00ccb0] text-black font-semibold text-sm"
    >
      {children} <ArrowRight className="w-4 h-4" />
    </Link>
  );
}
