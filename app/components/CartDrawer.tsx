"use client";

import { useCartStore } from "../lib/store/useCartStore";

const EMOJI_ICON_MAP: Record<string, string> = {
  "🥼": "ti-shirt", "👕": "ti-shirt", "🧥": "ti-shirt-sport", "🧤": "ti-hoodie",
  "🧣": "ti-hoodie", "👔": "ti-shirt-filled", "🔴": "ti-circle-filled",
  "🔵": "ti-circle-filled", "📦": "ti-package", "🏷️": "ti-tag", "👤": "ti-user",
  "🧵": "ti-needle-thread", "🪡": "ti-needle-thread", "📏": "ti-ruler-2",
  "📐": "ti-ruler-2", "📸": "ti-camera", "⭐": "ti-star", "🌟": "ti-star-filled",
  "🪢": "ti-tag",
};

function fmt(n: number) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export function CartDrawer({
  open,
  onClose,
  onCheckout,
}: {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}) {
  const { items, removeItem, updateQty, total } = useCartStore();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/55 z-[250] flex justify-end animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white w-full max-w-[380px] h-full flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <span className="font-['Bebas_Neue'] text-lg tracking-wide text-gray-900">
            Keranjang ({items.length})
          </span>
          <button
            onClick={onClose}
            className="bg-gray-50 border border-gray-200 rounded-full w-8 h-8 cursor-pointer flex items-center justify-center text-gray-500 hover:border-gray-300 transition-colors"
          >
            <i className="ti ti-x text-[15px]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400 px-6 text-center">
              <i className="ti ti-shopping-bag-x text-[40px]" />
              <p className="text-xs">Keranjang kamu masih kosong</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {items.map((item) => (
                <div key={item.cartKey} className="flex gap-3 px-5 py-4 border-b border-gray-50">
                  <div className="w-16 h-16 bg-gray-50 rounded flex items-center justify-center flex-shrink-0 text-[#2a9d8e]">
                    <i className={`ti ${EMOJI_ICON_MAP[item.photo] ?? "ti-photo"} text-[26px]`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-semibold text-gray-900 leading-snug truncate">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">
                      {item.color} · {item.size}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[12px] font-bold text-[#2a9d8e]">{fmt(item.price)}</span>
                      <div className="flex items-center gap-2 bg-gray-50 rounded-md p-0.5">
                        <button
                          onClick={() => updateQty(item.cartKey, item.qty - 1)}
                          className="w-6 h-6 rounded bg-white border border-gray-200 text-gray-600 cursor-pointer flex items-center justify-center hover:border-[#2a9d8e] hover:text-[#2a9d8e] transition-colors"
                        >
                          <i className="ti ti-minus text-[11px]" />
                        </button>
                        <span className="text-[12px] font-bold min-w-[16px] text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.cartKey, item.qty + 1)}
                          className="w-6 h-6 rounded bg-white border border-gray-200 text-gray-600 cursor-pointer flex items-center justify-center hover:border-[#2a9d8e] hover:text-[#2a9d8e] transition-colors"
                        >
                          <i className="ti ti-plus text-[11px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.cartKey)}
                    className="text-gray-300 hover:text-red-500 transition-colors bg-transparent border-none cursor-pointer self-start"
                  >
                    <i className="ti ti-trash text-[15px]" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="flex-shrink-0 border-t border-gray-100 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500">Subtotal</span>
              <span className="text-[16px] font-bold text-gray-900">{fmt(total())}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-3 border-none rounded-lg bg-[#2a9d8e] text-white text-[12px] font-bold tracking-wide uppercase cursor-pointer hover:bg-[#1f7a6e] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
            >
              <i className="ti ti-receipt-2 text-[14px]" /> Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}