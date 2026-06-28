"use client";

import { useState } from "react";
import { useCartStore } from "../lib/store/useCartStore";

type Phase = "form" | "processing" | "success";

const shippingOptions = [
  { id: "reguler", name: "Reguler", eta: "2-3 hari", price: 12000, icon: "ti-truck" },
  { id: "express", name: "Express", eta: "1 hari", price: 25000, icon: "ti-bolt" },
  { id: "cod", name: "COD (Bayar di tempat)", eta: "1-2 hari", price: 0, icon: "ti-cash" },
];

const paymentOptions = [
  { id: "midtrans_qris", name: "QRIS (Midtrans)", icon: "ti-qrcode" },
  { id: "midtrans_va", name: "Virtual Account (Midtrans)", icon: "ti-building-bank" },
  { id: "midtrans_ewallet", name: "GoPay / ShopeePay (Midtrans)", icon: "ti-wallet" },
];

function fmt(n: number) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export function CheckoutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, total, clear } = useCartStore();

  const [phase, setPhase] = useState<Phase>("form");
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    full: "",
    city: "",
    postal: "",
  });
  const [shipping, setShipping] = useState(shippingOptions[0]);
  const [payment, setPayment] = useState(paymentOptions[0]);
  const [orderId, setOrderId] = useState("");

  if (!open) return null;

  const reset = () => {
    setPhase("form");
    setAddress({ name: "", phone: "", full: "", city: "", postal: "" });
    setShipping(shippingOptions[0]);
    setPayment(paymentOptions[0]);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const grandTotal = total() + shipping.price;

  const submitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setPhase("processing");
    // Simulasi call ke Midtrans Snap API (dummy)
    setOrderId(`ORD-${Date.now().toString().slice(-8)}`);
    setTimeout(() => {
      setPhase("success");
      clear();
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[260] flex items-end justify-center animate-fade-in backdrop-blur-[2px]"
      onClick={(e) => { if (e.target === e.currentTarget && phase !== "processing") handleClose(); }}
    >
      <div className="bg-white w-full max-w-[480px] max-h-[92vh] flex flex-col overflow-hidden rounded-t-xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <span className="font-['Bebas_Neue'] text-[16px] tracking-[0.5px] text-gray-900">
            {phase === "form" && "Checkout"}
            {phase === "processing" && "Memproses..."}
            {phase === "success" && "Pesanan Berhasil"}
          </span>
          {phase === "form" && (
            <button
              onClick={handleClose}
              className="bg-gray-50 border border-gray-200 rounded-full w-8 h-8 cursor-pointer flex items-center justify-center text-gray-500 hover:border-gray-300 transition-colors"
            >
              <i className="ti ti-x text-[15px]" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* PHASE: FORM (alamat + jasa kirim + payment jadi satu) */}
          {phase === "form" && (
            <form id="checkout-form" onSubmit={submitOrder} className="flex flex-col gap-5 p-5">
              {/* Alamat Pengiriman */}
              <div>
                <div className="text-[10px] font-bold tracking-[1.5px] text-gray-400 uppercase mb-2.5 flex items-center gap-1.5">
                  <i className="ti ti-map-pin text-[13px]" /> Alamat Pengiriman
                </div>
                <div className="flex flex-col gap-2.5">
                  <div className="grid grid-cols-2 gap-2.5">
                    <input
                      required
                      value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#2a9d8e] transition-colors"
                      placeholder="Nama penerima"
                    />
                    <input
                      required
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#2a9d8e] transition-colors"
                      placeholder="No. HP"
                    />
                  </div>
                  <textarea
                    required
                    rows={2}
                    value={address.full}
                    onChange={(e) => setAddress({ ...address, full: e.target.value })}
                    className="border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#2a9d8e] transition-colors resize-none"
                    placeholder="Alamat lengkap (jalan, no rumah, RT/RW, kecamatan)"
                  />
                  <div className="grid grid-cols-2 gap-2.5">
                    <input
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#2a9d8e] transition-colors"
                      placeholder="Kota/Kecamatan"
                    />
                    <input
                      required
                      value={address.postal}
                      onChange={(e) => setAddress({ ...address, postal: e.target.value })}
                      className="border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#2a9d8e] transition-colors"
                      placeholder="Kode pos"
                    />
                  </div>
                </div>
              </div>

              {/* Jasa Kirim */}
              <div>
                <div className="text-[10px] font-bold tracking-[1.5px] text-gray-400 uppercase mb-2.5 flex items-center gap-1.5">
                  <i className="ti ti-truck text-[13px]" /> Jasa Kirim
                </div>
                <div className="flex flex-col gap-2">
                  {shippingOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setShipping(opt)}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all text-left bg-white ${
                        shipping.id === opt.id ? "border-[#2a9d8e] bg-[#f0faf8]" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-[#2a9d8e] flex-shrink-0">
                        <i className={`ti ${opt.icon} text-[16px]`} />
                      </div>
                      <div className="flex-1">
                        <div className="text-[12px] font-bold text-gray-900">{opt.name}</div>
                        <div className="text-[10px] text-gray-400">Estimasi {opt.eta}</div>
                      </div>
                      <div className="text-[12px] font-bold text-gray-900">
                        {opt.price === 0 ? "Gratis" : fmt(opt.price)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Metode Pembayaran */}
              <div>
                <div className="text-[10px] font-bold tracking-[1.5px] text-gray-400 uppercase mb-2.5 flex items-center gap-1.5">
                  <i className="ti ti-credit-card text-[13px]" /> Metode Pembayaran
                </div>
                <div className="flex flex-col gap-2">
                  {paymentOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPayment(opt)}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all text-left bg-white ${
                        payment.id === opt.id ? "border-[#2a9d8e] bg-[#f0faf8]" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <i className={`ti ${opt.icon} text-[18px] text-[#2a9d8e]`} />
                      <span className="text-[12px] font-semibold text-gray-800">{opt.name}</span>
                      {payment.id === opt.id && (
                        <i className="ti ti-circle-check-filled text-[16px] text-[#2a9d8e] ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
                  <i className="ti ti-info-circle text-[12px]" /> Simulasi — belum terhubung ke Midtrans Snap sungguhan.
                </p>
              </div>

              {/* Ringkasan */}
              <div className="bg-gray-50 rounded-lg p-3.5">
                <div className="text-[10px] font-bold tracking-[1.5px] text-gray-400 uppercase mb-2">Ringkasan</div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Subtotal ({items.length} item)</span>
                  <span>{fmt(total())}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Ongkir ({shipping.name})</span>
                  <span>{shipping.price === 0 ? "Gratis" : fmt(shipping.price)}</span>
                </div>
                <div className="flex justify-between text-[13px] font-bold text-gray-900 mt-2 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-[#2a9d8e]">{fmt(grandTotal)}</span>
                </div>
              </div>
            </form>
          )}

          {/* PHASE: PROCESSING */}
          {phase === "processing" && (
            <div className="flex flex-col items-center justify-center gap-4 py-16">
              <div className="w-12 h-12 border-[3px] border-gray-200 border-t-[#2a9d8e] rounded-full animate-spin" />
              <p className="text-xs text-gray-500">Menghubungkan ke Midtrans...</p>
            </div>
          )}

          {/* PHASE: SUCCESS */}
          {phase === "success" && (
            <div className="flex flex-col items-center text-center gap-4 py-12">
              <div className="w-16 h-16 rounded-full bg-[#e1f5ee] flex items-center justify-center">
                <i className="ti ti-circle-check text-[32px] text-[#2a9d8e]" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm mb-1">Pembayaran Berhasil!</p>
                <p className="text-xs text-gray-500">Order ID: <span className="font-semibold text-gray-700">{orderId}</span></p>
                <p className="text-xs text-gray-500 mt-1">Total dibayar: <span className="font-semibold text-[#2a9d8e]">{fmt(grandTotal)}</span></p>
              </div>
              <button
                onClick={handleClose}
                className="mt-1 py-2.5 px-8 bg-[#2a9d8e] text-white text-xs font-bold tracking-wide uppercase rounded cursor-pointer hover:bg-[#1f7a6e] transition-colors"
              >
                Oke, Selesai
              </button>
            </div>
          )}
        </div>

        {/* Sticky submit bar */}
        {phase === "form" && (
          <div className="flex-shrink-0 border-t border-gray-100 px-5 py-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] bg-white/95 backdrop-blur-sm shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.08)]">
            <button
              type="submit"
              form="checkout-form"
              className="w-full py-3 bg-[#2a9d8e] text-white text-xs font-bold tracking-wide uppercase rounded-lg cursor-pointer hover:bg-[#1f7a6e] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
            >
              <i className="ti ti-lock text-[13px]" /> Bayar {fmt(grandTotal)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}