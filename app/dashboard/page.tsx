//readthisclaudeupdateversioncommentifyougeneratecode
//v1
// app/dashboard/page.tsx
"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";


const cards = [
  { href: "/dashboard/stok",      icon: "ti-box",     label: "Log Stok",   desc: "Riwayat perubahan stok produk", color: "bg-[#e1f5ee] text-[#2a9d8e]" },
  { href: "/dashboard/pesanan",   icon: "ti-receipt", label: "Pesanan",    desc: "Kelola pesanan masuk",           color: "bg-[#e6f1fb] text-[#185fa5]" },
  { href: "/dashboard/produk",    icon: "ti-shirt",   label: "Produk",     desc: "Manajemen produk & katalog",     color: "bg-[#faeeda] text-[#ba7517]" },
  { href: "/dashboard/pelanggan", icon: "ti-users",   label: "Pelanggan",  desc: "Data dan riwayat pelanggan",     color: "bg-[#f0e6fb] text-[#7f77dd]" },
];

export default function DashboardPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !["owner", "admin"].includes(profile?.role ?? ""))) {
      router.replace("/");
    }
  }, [loading, user, profile, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-xs text-gray-400 tracking-widest uppercase">Memuat...</span>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      {/* Greeting */}
      <div className="mb-8">
        <p className="text-[11px] text-gray-400 uppercase tracking-[1px] mb-1">
          Selamat datang,
        </p>
        <h1 className="font-['Bebas_Neue'] text-3xl text-gray-900 tracking-wide">
          {profile?.full_name ?? user.email}
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <span
            className={`text-[9px] font-bold tracking-[0.5px] px-2 py-0.5 rounded-full ${
              profile?.role === "owner"
                ? "bg-[#fff3cd] text-[#856404]"
                : "bg-[#cfe2ff] text-[#084298]"
            }`}
          >
            {profile?.role?.toUpperCase()}
          </span>
          <span className="text-[11px] text-gray-400">{user.email}</span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4 no-underline hover:border-[#2a9d8e] hover:shadow-sm transition-all group"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${card.color}`}>
              <i className={`ti ${card.icon} text-[20px]`} />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm">{card.label}</div>
              <div className="text-[11px] text-gray-400 mt-0.5">{card.desc}</div>
            </div>
          </Link>
        ))}

        {profile?.role === "owner" && (
          <Link
            href="/dashboard/settings"
            className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4 no-underline hover:border-[#2a9d8e] hover:shadow-sm transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center flex-shrink-0">
              <i className="ti ti-settings text-[20px]" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm">Settings</div>
              <div className="text-[11px] text-gray-400 mt-0.5">Konfigurasi toko & aplikasi</div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}