//readthisclaudeupdateversioncommentifyougeneratecode
//v1
// app/dashboard/_components/DashboardNav.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";

const navItems = [
  { href: "/dashboard",           icon: "ti-layout-dashboard", label: "Dashboard" },
  { href: "/dashboard/stok",      icon: "ti-box",              label: "Log Stok"  },
  { href: "/dashboard/pesanan",   icon: "ti-receipt",          label: "Pesanan"   },
  { href: "/dashboard/produk",    icon: "ti-shirt",            label: "Produk"    },
  { href: "/dashboard/pelanggan", icon: "ti-users",            label: "Pelanggan" },
  { href: "/dashboard/settings",  icon: "ti-settings",         label: "Settings", ownerOnly: true },
];

export function DashboardNav() {
  const pathname  = usePathname();
  const router    = useRouter();
  const { user, profile, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const items = navItems.filter((i) => !i.ownerOnly || profile?.role === "owner");

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const avatar = profile?.avatar_url ? (
    <img
      src={profile.avatar_url}
      alt={profile.full_name ?? "avatar"}
      className="w-8 h-8 rounded-full object-cover border-2 border-[#2a9d8e] flex-shrink-0"
    />
  ) : (
    <div className="w-8 h-8 rounded-full bg-[#2a9d8e] flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0">
      {(profile?.full_name ?? user?.email ?? "U")[0].toUpperCase()}
    </div>
  );

  /* ── Sidebar inner content (shared desktop & mobile) ── */
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-14 flex items-center justify-between px-5 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-['Bebas_Neue'] text-[18px] text-gray-900 tracking-wider">
            GO.NTREE
          </span>
          <span className="text-[9px] font-bold tracking-[1px] text-gray-400 uppercase mt-0.5">
            Admin
          </span>
        </div>
        <Link
          href="/"
          className="flex items-center gap-1 text-[11px] font-semibold text-gray-400 hover:text-[#2a9d8e] no-underline transition-colors"
          title="Ke Landing Page"
        >
          <i className="ti ti-home text-[14px]" />
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-3">
        <ul className="list-none flex flex-col gap-0.5">
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-semibold no-underline transition-all ${
                    active
                      ? "bg-[#e1f5ee] text-[#0f6e56]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <i className={`ti ${item.icon} text-[16px] flex-shrink-0`} />
                  {item.label}
                  {active && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2a9d8e]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User */}
      <div className="flex-shrink-0 border-t border-gray-100 p-3">
        <div className="flex items-center gap-2.5 px-2 py-2">
          {avatar}
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-bold text-gray-900 truncate">
              {profile?.full_name ?? "Pengguna"}
            </div>
            <span
              className={`text-[9px] font-bold tracking-[0.5px] px-1.5 py-0.5 rounded-full inline-block mt-0.5 ${
                profile?.role === "owner"
                  ? "bg-[#fff3cd] text-[#856404]"
                  : "bg-[#cfe2ff] text-[#084298]"
              }`}
            >
              {profile?.role?.toUpperCase()}
            </span>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="mt-1 w-full flex items-center gap-2 px-3 py-2 text-[12px] text-red-500 bg-transparent border-none cursor-pointer rounded-lg hover:bg-red-50 transition-colors text-left"
        >
          <i className="ti ti-logout text-[14px]" />
          Keluar
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Mobile top bar ── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-30 h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4">
        <Link
          href="/"
          className="font-['Bebas_Neue'] text-[17px] text-gray-900 tracking-wider no-underline"
        >
          GO.NTREE
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          className="bg-transparent border-none cursor-pointer p-1 w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
          aria-label="Menu"
        >
          <span className={`block h-[1.5px] w-5 bg-gray-700 rounded-full transition-all duration-300 origin-center ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
          <span className={`block h-[1.5px] bg-gray-700 rounded-full transition-all duration-300 ${open ? "w-0 opacity-0" : "w-3.5 -ml-1.5"}`} />
          <span className={`block h-[1.5px] w-5 bg-gray-700 rounded-full transition-all duration-300 origin-center ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
        </button>
      </header>

      {/* ── Mobile backdrop ── */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 h-full w-[220px] bg-white border-r border-gray-100 z-20">
        <SidebarContent />
      </aside>

      {/* ── Mobile drawer ── */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full w-[220px] bg-white border-r border-gray-100 z-40 transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}