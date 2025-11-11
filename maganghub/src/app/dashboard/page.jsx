"use client";
import { Users, Building2, CheckCircle, ShieldAlert, ReceiptText, Activity, Server, Wifi, Database } from "lucide-react";

export default function DashboardHome() {

  const admin = {
    nama: "Admin Namura",
    statusVerifikasi: true, 
    keterangan: "Akun telah diverifikasi sebagai Admin dan memiliki akses penuh manajemen platform."
  };

  const stats = [
    { label: "Listing Aktif", value: "128", icon: Building2, color:"blue", desc:"Properti sedang tayang" },
    { label: "Transaksi Berjalan", value: "14", icon: ReceiptText, color:"green", desc:"Dalam proses nego / akad" },
    { label: "Total Pengguna", value: "7.921", icon: Users, color:"yellow", desc:"Seluruh akun terdaftar" },
  ];

  const activityToday = [
    { label:"Listing Baru Masuk", value:"+ 3" },
    { label:"Request Update Data", value:"8" },
    { label:"Report Masalah Listing", value:"1" },
  ];

  const systemStatus = [
    { label:"API Property", icon:Server, status:"Normal" },
    { label:"Database I/O", icon:Database, status:"Stabil" },
    { label:"Network Ops", icon:Wifi, status:"Normal" },
  ];

  return (
    <div className="space-y-12">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold mb-2 tracking-tight">
          Selamat Datang, {admin.nama} 👋
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl">
          Pantau performa operasional, aktivitas user dan kontrol kualitas data listing yang sedang tayang.
        </p>
      </div>

      {/* Verifikasi Admin */}
      <div className={`p-5 rounded-xl border flex items-start gap-4 ${
        admin.statusVerifikasi
        ? "border-teal-300 bg-teal-50 dark:bg-teal-900/20"
        : "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20"
      }`}>
        <div className={`p-3 rounded-full ${
          admin.statusVerifikasi
          ? "bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400"
          : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400"
        }`}>
          {admin.statusVerifikasi ? <CheckCircle className="w-6 h-6"/> : <ShieldAlert className="w-6 h-6"/>}
        </div>

        <div>
          <h4 className={`font-semibold ${
            admin.statusVerifikasi ? "text-teal-700 dark:text-teal-300" : "text-yellow-700 dark:text-yellow-300"
          }`}>
            {admin.statusVerifikasi ? "Akun Admin Terverifikasi ✅" : "Akun Admin Belum Terverifikasi ⚠️"}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{admin.keterangan}</p>
        </div>
      </div>

      {/* Statistik Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item,i)=>(
          <div key={i} className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#141a23] shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${
                item.color==="blue"
                ?"bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                :item.color==="green"
                ?"bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400"
                :"bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
              }`}>
                <item.icon className="w-6 h-6"/>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                <h3 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-100">{item.value}</h3>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Activity Today */}
      <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#141a23] shadow">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Activity className="w-5 h-5 text-teal-500"/> Aktivitas Hari Ini</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {activityToday.map((a,i)=>(
            <div key={i} className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 flex flex-col items-center">
              <span className="text-lg font-bold text-teal-500">{a.value}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{a.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#141a23] shadow">
        <h3 className="text-lg font-semibold mb-4">Status Sistem</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {systemStatus.map((s,i)=>(
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-white/5">
              <s.icon className="w-5 h-5 text-teal-500"/>
              <div>
                <p className="text-sm">{s.label}</p>
                <p className="text-[11px] text-teal-400">{s.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
