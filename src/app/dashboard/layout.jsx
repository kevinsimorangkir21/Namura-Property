"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  Users,
  ShieldCheck,
  FileSearch,
  ReceiptText,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/**
 * Namura Admin Layout
 * Style A (Corporate Teal) • ID-Formal • CORE-Trusted
 * Fitur:
 * - Toggle Bahasa ID/ENG (localStorage: lang)
 * - Maintenance Mode (localStorage: maintenance)
 * - Notifikasi dropdown
 * - Sidebar collapse
 */

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // UI state
  const [collapsed, setCollapsed] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  // Auth dummy
  const [user, setUser] = useState(null);

  // Global governance
  const [maintenance, setMaintenance] = useState(false);
  const [lang, setLang] = useState("id");

  // === Init global states (lang, maintenance, user) ===
  useEffect(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("userObj") || "null");
      setUser(savedUser || { name: "Admin", role: "admin" });
    } catch {
      setUser({ name: "Admin", role: "admin" });
    }
    const savedLang = localStorage.getItem("lang") || "id";
    setLang(savedLang);
    const savedMaint = localStorage.getItem("maintenance") === "true";
    setMaintenance(savedMaint);
  }, []);

  const toggleLang = () => {
    const nl = lang === "id" ? "en" : "id";
    setLang(nl);
    localStorage.setItem("lang", nl);
  };

  const toggleMaintenance = () => {
    const nm = !maintenance;
    setMaintenance(nm);
    localStorage.setItem("maintenance", nm ? "true" : "false");
  };

  // i18n minimal
  const t = useMemo(() => {
    const ID = {
      brand: "Namura Admin",
      notif: "Notifikasi",
      maint_on: "MAINT",
      maint_off: "LIVE",
      banner: "⚠️ Platform dalam Mode Maintenance (Akses publik dibatasi).",
      sections: [
        {
          title: "Utama",
          items: [
            { href: "/admin", label: "Ikhtisar", icon: LayoutDashboard },
            { href: "/admin/listings", label: "Daftar Listing", icon: Building2 },
            { href: "/admin/inquiries", label: "Pertanyaan/Lead", icon: MessageSquare },
          ],
        },
        {
          title: "Transaksi & Verifikasi",
          items: [
            { href: "/admin/verification", label: "Verifikasi Dokumen", icon: FileSearch },
            { href: "/admin/transactions", label: "Transaksi", icon: ReceiptText },
            { href: "/admin/agents", label: "Agen & Mitra", icon: ShieldCheck },
          ],
        },
        {
          title: "Pengguna & Laporan",
          items: [
            { href: "/admin/users", label: "Pengguna", icon: Users },
            { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
            { href: "/admin/settings", label: "Pengaturan", icon: Settings },
          ],
        },
      ],
      statsHome: [
        { label: "Listing Aktif", value: "128" },
        { label: "Menunggu Verifikasi", value: "9" },
        { label: "Transaksi Berjalan", value: "14" },
        { label: "Agen Terverifikasi", value: "52" },
      ],
      logout: "Keluar",
    };

    const EN = {
      brand: "Namura Admin",
      notif: "Notifications",
      maint_on: "MAINT",
      maint_off: "LIVE",
      banner: "⚠️ Platform is in Maintenance Mode (Public access is limited).",
      sections: [
        {
          title: "General",
          items: [
            { href: "/admin", label: "Overview", icon: LayoutDashboard },
            { href: "/admin/listings", label: "Listings", icon: Building2 },
            { href: "/admin/inquiries", label: "Inquiries/Leads", icon: MessageSquare },
          ],
        },
        {
          title: "Transactions & Verifications",
          items: [
            { href: "/admin/verification", label: "Document Verification", icon: FileSearch },
            { href: "/admin/transactions", label: "Transactions", icon: ReceiptText },
            { href: "/admin/agents", label: "Agents & Partners", icon: ShieldCheck },
          ],
        },
        {
          title: "Users & Reports",
          items: [
            { href: "/admin/users", label: "Users", icon: Users },
            { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
            { href: "/admin/settings", label: "Settings", icon: Settings },
          ],
        },
      ],
      statsHome: [
        { label: "Active Listings", value: "128" },
        { label: "Pending Verification", value: "9" },
        { label: "Ongoing Transactions", value: "14" },
        { label: "Verified Agents", value: "52" },
      ],
      logout: "Logout",
    };

    return lang === "id" ? ID : EN;
  }, [lang]);

  // active title
  const activeTitle = useMemo(() => {
    const current = t.sections.flatMap((s) => s.items).find((i) => i.href === pathname);
    if (current) return current.label;
    if (pathname === "/admin" || pathname === "/admin/") {
      return lang === "id" ? "Ikhtisar" : "Overview";
    }
    return "Admin";
  }, [pathname, t, lang]);

  // sample announcements
  const announcements = useMemo(
    () => [
      {
        id: 1,
        title:
          lang === "id" ? "Verifikasi dokumen baru (4 listing)" : "New documents to verify (4 listings)",
        date: "08 Nov 2025",
      },
      {
        id: 2,
        title:
          lang === "id" ? "Pembayaran tertunda (2 transaksi)" : "Pending payments (2 transactions)",
        date: "08 Nov 2025",
      },
      {
        id: 3,
        title: lang === "id" ? "Agen menunggu persetujuan (3)" : "Agents awaiting approval (3)",
        date: "07 Nov 2025",
      },
    ],
    [lang]
  );

  const handleLogout = () => {
    localStorage.removeItem("userObj");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-[#0b0f15] text-gray-800 dark:text-gray-100">
      {/* SIDEBAR */}
      <aside
        className={`${
          collapsed ? "w-[76px]" : "w-72"
        } sticky top-0 h-screen bg-white dark:bg-[#141a23] border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between shadow-sm transition-all duration-200`}
      >
        <div className="p-4">
          {/* Brand */}
          <div className="flex items-center justify-between mb-4">
            <Link href="/admin" className="flex items-center gap-3">
              <img src="/namura.png" alt="Namura" className="w-8 h-8 rounded" />
              {!collapsed && <span className="font-semibold text-lg">{t.brand}</span>}
            </Link>
            <button
              onClick={() => setCollapsed((v) => !v)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300"
              aria-label="Toggle sidebar"
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          {/* Nav sections */}
          <div className="overflow-y-auto pr-1" style={{ maxHeight: "calc(100vh - 160px)" }}>
            {t.sections.map((sec) => (
              <div key={sec.title} className="mb-4">
                {!collapsed && (
                  <div className="px-2 mb-2 text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {sec.title}
                  </div>
                )}
                <ul className="space-y-1">
                  {sec.items.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                            active
                              ? "bg-[#00ccb0]/10 text-[#00ccb0] border border-[#00ccb0]/30"
                              : "hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
                          } ${collapsed ? "justify-center" : ""}`}
                          title={collapsed ? item.label : undefined}
                        >
                          <item.icon className="w-4 h-4" />
                          {!collapsed && <span>{item.label}</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && <span>{t.logout}</span>}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-5 md:px-8 py-3 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#141a23]/80 backdrop-blur-md">
          <h2 className="font-semibold text-base md:text-lg">{activeTitle}</h2>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Lang Toggle */}
            <button
              onClick={toggleLang}
              className="px-2 py-1 text-xs rounded-lg border border-white/10 dark:border-white/10 hover:bg-white/10 transition"
              aria-label="Toggle Language"
              title="Toggle Language"
            >
              {lang.toUpperCase()}
            </button>

            {/* Maintenance Toggle */}
            <button
              onClick={toggleMaintenance}
              className={`px-2 py-1 text-xs rounded-lg border ${
                maintenance
                  ? "border-red-500 text-red-500 bg-red-500/10"
                  : "border-yellow-400 text-yellow-500 bg-yellow-500/10"
              } hover:brightness-110 transition`}
              aria-label="Maintenance Mode"
              title="Maintenance Mode"
            >
              {maintenance ? t.maint_on : t.maint_off}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotif((v) => !v)}
                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition"
                aria-label={t.notif}
                title={t.notif}
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full" />
              </button>

              {showNotif && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1a1f2b] border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50">
                  <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700">
                    <div className="text-sm font-semibold">{t.notif}</div>
                    {maintenance && (
                      <div className="mt-1 text-[11px] text-red-400">
                        *Broadcast ke publik ditunda selama maintenance.
                      </div>
                    )}
                  </div>
                  <div className="max-h-72 overflow-auto">
                    {announcements.map((n) => (
                      <div
                        key={n.id}
                        className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-white/5 transition"
                      >
                        <div className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                          {n.title}
                        </div>
                        <div className="text-[12px] text-gray-500 dark:text-gray-400">
                          {n.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User */}
            <div className="hidden md:flex items-center gap-3">
              <img
                src="/avatar.jpg"
                alt="Admin"
                className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700"
              />
              <div className="text-sm">
                <div className="font-medium">{user?.name || "Admin"}</div>
                <div className="text-gray-500 dark:text-gray-400 text-[12px]">
                  {user?.role || "admin"}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Maintenance Banner (global) */}
        {maintenance && (
          <div className="w-full text-center py-3 bg-red-600 text-white text-sm font-medium">
            {t.banner}
          </div>
        )}

        {/* CONTENT */}
        <div className="flex-1 p-5 md:p-8 bg-gray-50 dark:bg-[#0b0f15]">
          <div className="max-w-7xl mx-auto">
            {/* Info bar on home */}
            {pathname === "/admin" && (
              <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {t.statsHome.map((s) => (
                  <StatCard key={s.label} label={s.label} value={s.value} />
                ))}
              </div>
            )}

            <div className="bg-white dark:bg-[#141a23] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-5 md:p-6">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- Small UI Parts ---------- */

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 md:border-gray-200 dark:md:border-gray-800 bg-white/60 dark:bg-white/5 backdrop-blur-xl p-4">
      <div className="text-[12px] text-gray-500 dark:text-gray-400">{label}</div>
      <div className="text-2xl font-extrabold text-[#00ccb0]">{value}</div>
    </div>
  );
}
