"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function ChangelogEN() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const updates = [
    {
        version: "v0.0.2",
        date: "13 Nov 2025",
        changes: [
          "Minor bug fixes in navigation system",
          "Improved page load speed",
          "Optimized display on mobile devices",
          "Fixed multilingual feature",
        ],
    },
    {
      version: "v0.0.1",
      date: "12 Nov 2025",
      changes: [
        "Initial release of Namura Property platform",
        "Added property listings & agent directory",
        "Mortgage calculator module",
        "Articles & property guides page",
      ],
    },
  ];

  return (
    <main
      className={`min-h-screen pt-28 pb-20 transition-colors duration-500 ${
        isDark ? "bg-[#0b0f15] text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* Back */}
        <Link
          href="/en/changelog"
          className={`inline-flex items-center gap-2 mb-8 text-sm font-medium ${
            isDark ? "text-[#00ccb0]" : "text-[#009e86]"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-4xl md:text-5xl font-black mb-10 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Changelog & Updates
        </motion.h1>

        {/* List */}
        <div className="space-y-10">
          {updates.map((u, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl p-6 border ${
                isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-bold">{u.version}</h2>
                <span className="flex items-center gap-2 text-sm opacity-80">
                  <Calendar className="w-4 h-4" />
                  {u.date}
                </span>
              </div>

              <ul className="space-y-2 mt-4">
                {u.changes.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#00ccb0] shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
