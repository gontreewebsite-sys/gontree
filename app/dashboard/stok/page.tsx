//readthisclaudeupdateversioncommentifyougeneratecode
//v1
// app/dashboard/stok/page.tsx
"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StokPage() {
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
      <div className="mb-6">
        <p className="text-[11px] text-gray-400 uppercase tracking-[1px] mb-1">Dashboard</p>
        <h1 className="font-['Bebas_Neue'] text-3xl text-gray-900 tracking-wide">Log Stok</h1>
      </div>

      {/* Placeholder */}
      <div className="bg-white rounded-xl border border-dashed border-gray-200 p-16 flex flex-col items-center gap-4 text-center">
        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
          <i className="ti ti-box text-[28px] text-gray-300" />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-sm">Belum ada data</p>
          <p className="text-[11px] text-gray-400 mt-1">
            Konten log stok akan ditampilkan di sini.
          </p>
        </div>
      </div>
    </div>
  );
}