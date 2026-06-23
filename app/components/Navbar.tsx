//readthisclaudeupdateversioncommentifyougeneratecode
//v2
//app/components/Navbar.tsx
// Navbar.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { useAuthModalStore } from "./../lib/store/useAuthModalStore";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profilePopupOpen, setProfilePopupOpen] = useState(false);
  const { user, profile, loading, signOut } = useAuth();
  const openAuthModal = useAuthModalStore((s) => s.open);
  const router = useRouter();

  const navLinks = ["New Arrival", "Best Seller", "Shop", "Contact Us"];

  useEffect(() => {
  const onScroll = () => { if (mobileOpen) setMobileOpen(false); };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, [mobileOpen]);

  const handleSignOut = async () => {
    await signOut();
    setDropdownOpen(false);
    router.push("/");
  };
const ProfilePopup = () => (
    <div className="fixed inset-0 bg-black/50 z-[300] flex items-center justify-center animate-fade-in px-4"
      onClick={(e) => { if (e.target === e.currentTarget) setProfilePopupOpen(false); }}>
      <div className="bg-white w-full max-w-[360px] rounded-xl overflow-hidden animate-slide-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <span className="font-['Bebas_Neue'] text-lg tracking-wide text-gray-900">Profil Saya</span>
          <button onClick={() => setProfilePopupOpen(false)}
            className="bg-transparent border border-gray-200 rounded-full w-8 h-8 cursor-pointer flex items-center justify-center text-gray-500 hover:border-gray-400 transition-colors">
            <i className="ti ti-x text-[15px]" />
          </button>
        </div>
        <div className="p-5 flex flex-col items-center gap-4">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt={profile.full_name ?? "Avatar"}
              className="w-20 h-20 rounded-full object-cover border-4 border-[#2a9d8e]" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#2a9d8e] flex items-center justify-center text-white text-[32px] font-bold">
              {(profile?.full_name ?? user?.email ?? "U")[0].toUpperCase()}
            </div>
          )}
          <div className="text-center">
            <div className="font-bold text-gray-900 text-base">{profile?.full_name ?? "Pengguna"}</div>
            <div className="text-xs text-gray-400 mt-0.5">{user?.email}</div>
            <span className={`mt-2 inline-block text-[9px] font-bold tracking-[0.5px] px-2 py-0.5 rounded-full ${
              profile?.role === "owner" ? "bg-[#fff3cd] text-[#856404]"
              : profile?.role === "admin" ? "bg-[#cfe2ff] text-[#084298]"
              : "bg-[#e1f5ee] text-[#0f6e56]"}`}>
              {profile?.role?.toUpperCase() ?? "PEMBELI"}
            </span>
          </div>
          <div className="w-full border-t border-gray-100 pt-4 flex flex-col gap-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Member sejak</span>
              <span className="text-gray-700 font-medium">
                {profile?.created_at ? new Date(profile.created_at).toLocaleDateString("id-ID", { year: "numeric", month: "long" }) : "-"}
              </span>
            </div>
          </div>
          <button onClick={() => { setProfilePopupOpen(false); handleSignOut(); }}
            className="w-full py-2.5 border border-red-200 text-red-500 text-xs font-bold uppercase rounded cursor-pointer hover:bg-red-50 transition-colors bg-transparent flex items-center justify-center gap-2">
            <i className="ti ti-logout text-[13px]" /> Keluar
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <nav className="flex items-center justify-between px-6 h-14 border-b border-gray-100 bg-white sticky top-0 z-[100]">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-2 no-underline">
          <span className="font-['Bebas_Neue'] text-[18px] text-gray-900 tracking-wider">
            GO.NTREE
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-5 list-none">
          {navLinks.map((link) => (
            <li key={link}>
              <Link
                href="#"
                className="no-underline text-gray-600 text-xs font-medium tracking-wide hover:text-[#2a9d8e] transition-colors"
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-3 text-gray-600">
          {/* Hamburger (mobile) — animasi X ↔ ☰ */}
          <button
            className="md:hidden bg-transparent border-none cursor-pointer text-gray-600 p-1 w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            <span
              className={`block h-[1.5px] bg-gray-700 rounded-full transition-all duration-300 origin-center ${
                mobileOpen ? "w-5 translate-y-[6.5px] rotate-45" : "w-5"
              }`}
            />
            <span
              className={`block h-[1.5px] bg-gray-700 rounded-full transition-all duration-300 ${
                mobileOpen ? "w-0 opacity-0" : "w-3.5 ml-[-6px]"
              }`}
            />
            <span
              className={`block h-[1.5px] bg-gray-700 rounded-full transition-all duration-300 origin-center ${
                mobileOpen ? "w-5 -translate-y-[6.5px] -rotate-45" : "w-5"
              }`}
            />
          </button>

          <i className="ti ti-search text-[17px] cursor-pointer hover:text-[#2a9d8e] transition-colors hidden md:block" />
          <i className="ti ti-heart text-[17px] cursor-pointer hover:text-[#2a9d8e] transition-colors hidden md:block" />
          <i className="ti ti-shopping-bag text-[17px] cursor-pointer hover:text-[#2a9d8e] transition-colors hidden md:block" />

          {/* Auth — desktop only */}
          {!loading && (
            <div className="relative hidden md:block">
              {user ? (
                <>
                  <button
                    onClick={() => setDropdownOpen((v) => !v)}
                    className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer p-0"
                    aria-label="Akun"
                  >
                    {profile?.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt={profile.full_name ?? "Avatar"}
                        className="w-8 h-8 rounded-full object-cover border-2 border-[#2a9d8e]"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#2a9d8e] flex items-center justify-center text-white text-[13px] font-bold">
                        {(profile?.full_name ?? user.email ?? "U")[0].toUpperCase()}
                      </div>
                    )}
                    <i className={`ti ti-chevron-down text-[11px] text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {dropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-[49]" onClick={() => setDropdownOpen(false)} />
                      <div className="absolute right-0 top-[calc(100%+8px)] w-[220px] bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                        <div className="px-4 py-3.5 border-b border-gray-100">
                          <div className="text-[12px] font-bold text-gray-900 truncate">
                            {profile?.full_name ?? "Pengguna"}
                          </div>
                          <div className="text-[10px] text-gray-400 truncate mt-0.5">
                            {user.email}
                          </div>
                          <span className={`mt-1.5 inline-block text-[9px] font-bold tracking-[0.5px] px-2 py-0.5 rounded-full ${
                            profile?.role === "owner"
                              ? "bg-[#fff3cd] text-[#856404]"
                              : profile?.role === "admin"
                              ? "bg-[#cfe2ff] text-[#084298]"
                              : "bg-[#e1f5ee] text-[#0f6e56]"
                          }`}>
                            {profile?.role?.toUpperCase() ?? "PEMBELI"}
                          </span>
                        </div>
                        <div className="py-1">
                          <button onClick={() => { setDropdownOpen(false); setProfilePopupOpen(true); }}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[12px] text-gray-700 hover:bg-gray-50 hover:text-[#2a9d8e] bg-transparent border-none cursor-pointer text-left transition-colors">
                            <i className="ti ti-user text-[14px]" /> Profil Saya
                          </button>
                          <Link href="#" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-[12px] text-gray-700 hover:bg-gray-50 hover:text-[#2a9d8e] no-underline transition-colors">
                            <i className="ti ti-receipt text-[14px]" /> Pesanan Saya
                          </Link>
                          {(profile?.role === "owner" || profile?.role === "admin") && (
                            <Link href="/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-[12px] text-gray-700 hover:bg-gray-50 hover:text-[#2a9d8e] no-underline transition-colors">
                              <i className="ti ti-layout-dashboard text-[14px]" /> Dashboard Admin
                            </Link>
                          )}
                        </div>
                        <div className="border-t border-gray-100 py-1">
                          <button onClick={handleSignOut} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[12px] text-red-500 hover:bg-red-50 bg-transparent border-none cursor-pointer text-left transition-colors">
                            <i className="ti ti-logout text-[14px]" /> Keluar
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <button
                  onClick={() => openAuthModal("login")}
                  className="hidden md:flex items-center gap-1.5 bg-[#2a9d8e] text-white text-[11px] font-bold tracking-[1px] uppercase px-3.5 py-2 border-none cursor-pointer hover:bg-[#1f7a6e] transition-colors"
                >
                  <i className="ti ti-user text-[13px]" />
                  Login
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Nav — animasi slide down + fade per item */}
      <div
        className={`md:hidden sticky top-14 z-9 bg-white border-b border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {navLinks.map((link, i) => (
          <Link
            key={link}
            href="#"
            onClick={() => setMobileOpen(false)}
            className="flex items-center px-6 py-3 no-underline text-gray-600 text-sm font-semibold border-b border-gray-50 hover:text-[#2a9d8e] hover:bg-gray-50 transition-all duration-200"
            style={{
              transitionDelay: mobileOpen ? `${i * 40}ms` : "0ms",
              transform: mobileOpen ? "translateX(0)" : "translateX(-8px)",
              opacity: mobileOpen ? 1 : 0,
            }}
          >
            {link}
          </Link>
        ))}
{!loading && user && (
  <button
    onClick={() => { setMobileOpen(false); setProfilePopupOpen(true); }}
    className="flex items-center w-full px-6 py-3 bg-transparent border-none text-left text-gray-700 text-sm font-semibold border-b border-gray-50 transition-all duration-200 cursor-pointer gap-3"
    style={{
      transitionDelay: mobileOpen ? `${navLinks.length * 40}ms` : "0ms",
      transform: mobileOpen ? "translateX(0)" : "translateX(-8px)",
      opacity: mobileOpen ? 1 : 0,
    }}
  >
    {profile?.avatar_url ? (
      <img src={profile.avatar_url} alt="" className="w-6 h-6 rounded-full object-cover border border-[#2a9d8e]" />
    ) : (
      <div className="w-6 h-6 rounded-full bg-[#2a9d8e] flex items-center justify-center text-white text-[11px] font-bold">
        {(profile?.full_name ?? user.email ?? "U")[0].toUpperCase()}
      </div>
    )}
    {profile?.full_name ?? user.email}
  </button>
)}
        {!loading && !user && (
          <button
            onClick={() => {
              setMobileOpen(false);
              openAuthModal("login");
            }}
            className="flex items-center w-full px-6 py-3 bg-transparent border-none text-left text-[#2a9d8e] text-sm font-bold border-b border-gray-50 transition-all duration-200 cursor-pointer"
            style={{
              transitionDelay: mobileOpen ? `${navLinks.length * 40}ms` : "0ms",
              transform: mobileOpen ? "translateX(0)" : "translateX(-8px)",
              opacity: mobileOpen ? 1 : 0,
            }}
          >
            <i className="ti ti-user mr-2" />
            Login / Daftar
          </button>
        )}
      </div>
    {profilePopupOpen && <ProfilePopup />}
    </>
  );
}