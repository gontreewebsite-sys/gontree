"use client";

import { useState } from "react";
import { useAuthModalStore } from "./../lib/store/useAuthModalStore";
import { useAuth } from "@/app/hooks/useAuth";

export function AuthModal() {
  const { isOpen, mode, close, setMode } = useAuthModalStore();
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setError(null);
    setRegistered(false);
  };

  const handleClose = () => {
    resetForm();
    close();
  };

  const switchMode = (next: "login" | "register") => {
    resetForm();
    setMode(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (mode === "login") {
        await signInWithEmail(email, password);
        handleClose();
      } else {
        if (!fullName.trim()) throw new Error("Nama lengkap wajib diisi");
        await signUpWithEmail(email, password, fullName.trim());
        setRegistered(true); // ← tampilkan pesan sukses, JANGAN close
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal login dengan Google");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/55 z-[300] flex items-center justify-center animate-fade-in px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="bg-white w-full max-w-[400px] rounded-xl overflow-hidden animate-slide-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <span className="font-['Bebas_Neue'] text-lg tracking-wide text-gray-900">
            {mode === "login" ? "Masuk ke GO.NTREE" : "Daftar Akun Baru"}
          </span>
          <button
            onClick={handleClose}
            className="bg-transparent border border-gray-200 rounded-full w-8 h-8 cursor-pointer flex items-center justify-center text-gray-500 hover:border-gray-400 transition-colors"
            aria-label="Tutup"
          >
            <i className="ti ti-x text-[15px]" />
          </button>
        </div>
        {registered ? (
          <div className="p-6 flex flex-col items-center gap-4 text-center">
            <div className="w-14 h-14 rounded-full bg-[#e1f5ee] flex items-center justify-center">
              <i className="ti ti-mail-check text-[28px] text-[#2a9d8e]" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm mb-1">Cek kotak masuk email kamu!</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Kami mengirimkan link konfirmasi ke{" "}
                <span className="font-semibold text-gray-700">{email}</span>.
                Klik link tersebut untuk mengaktifkan akun.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="mt-1 py-2.5 px-6 bg-[#2a9d8e] text-white text-xs font-bold tracking-wide uppercase rounded cursor-pointer hover:bg-[#1f7a6e] transition-colors"
            >
              Oke, Mengerti
            </button>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-3">
          {mode === "register" && (
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold tracking-[0.5px] text-gray-500 uppercase">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#2a9d8e] transition-colors"
                placeholder="Nama kamu"
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold tracking-[0.5px] text-gray-500 uppercase">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#2a9d8e] transition-colors"
              placeholder="nama@email.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold tracking-[0.5px] text-gray-500 uppercase">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#2a9d8e] transition-colors"
              placeholder="Minimal 6 karakter"
            />
          </div>

          {error && (
            <div className="text-xs text-red-500 bg-red-50 border border-red-100 rounded px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 py-2.5 bg-[#2a9d8e] text-white text-xs font-bold tracking-wide uppercase rounded cursor-pointer hover:bg-[#1f7a6e] transition-colors disabled:opacity-60"
          >
            {submitting
              ? "Memproses..."
              : mode === "login"
              ? "Masuk"
              : "Daftar"}
          </button>

          <div className="flex items-center gap-2 my-1">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[10px] text-gray-400 uppercase tracking-wide">atau</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            className="py-2.5 border border-gray-300 rounded text-xs font-semibold text-gray-700 cursor-pointer hover:border-gray-400 transition-colors flex items-center justify-center gap-2"
          >
            <i className="ti ti-brand-google text-[15px]" />
            Lanjutkan dengan Google
          </button>

          <p className="text-center text-xs text-gray-500 mt-1">
            {mode === "login" ? (
              <>
                Belum punya akun?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("register")}
                  className="text-[#2a9d8e] font-semibold bg-transparent border-none cursor-pointer p-0"
                >
                  Daftar di sini
                </button>
              </>
            ) : (
              <>
                Sudah punya akun?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="text-[#2a9d8e] font-semibold bg-transparent border-none cursor-pointer p-0"
                >
                  Masuk di sini
                </button>
              </>
            )}
          </p>
        </form>
        )} {/* end registered ternary */}
      </div>
      </div>
  );
}