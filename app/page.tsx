"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/app/components/Navbar";
import { useAuth } from "@/app/hooks/useAuth";
import { AuthModal } from "@/app/components/AuthModal";
import { CartDrawer } from "@/app/components/CartDrawer";
import { CheckoutModal } from "@/app/components/CheckoutModal";
import { useCartStore } from "@/app/lib/store/useCartStore";
import { Footer } from "@/app/components/Footer";

/* ============ MODAL ANIMATION ============ */
const MODAL_STYLES = `
  @keyframes backdropIn  { from { opacity: 0 } to { opacity: 1 } }
  @keyframes backdropOut { from { opacity: 1 } to { opacity: 0 } }
  @keyframes sheetIn     { from { transform: translateY(100%) } to { transform: translateY(0) } }
  @keyframes sheetOut    { from { transform: translateY(0) } to { transform: translateY(100%) } }
  @keyframes centerIn    { from { opacity: 0; transform: scale(0.96) translateY(8px) } to { opacity: 1; transform: scale(1) translateY(0) } }
  @keyframes centerOut   { from { opacity: 1; transform: scale(1) translateY(0) } to { opacity: 0; transform: scale(0.96) translateY(8px) } }

  .modal-backdrop-in   { animation: backdropIn  220ms ease both }
  .modal-backdrop-out  { animation: backdropOut 200ms ease both }
  .modal-sheet-in      { animation: sheetIn     320ms cubic-bezier(0.32,0.72,0,1) both }
  .modal-sheet-out     { animation: sheetOut    240ms cubic-bezier(0.4,0,1,1)     both }
  .modal-center-in     { animation: centerIn    220ms cubic-bezier(0.32,0.72,0,1) both }
  .modal-center-out    { animation: centerOut   180ms ease both }
`;

/**
 * Hook untuk animasi open/close modal.
 * @param open  — apakah modal seharusnya terbuka
 * @param onExited — callback setelah animasi close selesai
 */
function useModalAnimation(open: boolean, onExited?: () => void) {
  const [mounted, setMounted]   = useState(false);
  const [closing, setClosing]   = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) {
      setClosing(false);
      setMounted(true);
    } else if (mounted) {
      setClosing(true);
      timerRef.current = setTimeout(() => {
        setMounted(false);
        setClosing(false);
        onExited?.();
      }, 240); // durasi animasi keluar
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return { mounted, closing };
}

/* ============ TYPES ============ */
interface ProductColor {
  name: string;
  hex: string;
}

interface Product {
  id: number;
  name: string;
  disc: number;
  oldPrice: string;
  newPrice: string;
  cat: string;
  photos: string[];
  colors: ProductColor[];
  sizes: string[];
  specs: string;
}

interface ProductStore {
  newArrival: Product[];
  bestSeller: Product[];
}

type BottomNavKey = "home" | "pesanan" | "wishlist" | "akun";

function generateDummy(catLabel: "New Arrival" | "Best Seller", startId: number, count: number): Product[] {
  const names = [
    "Polo Pique Zipper Almighty", "Tshirt Boxyfit Redline Divio", "Longsleeve BoxyFit Premium",
    "Hoodie BoxyFit Redline Club", "Polo Longsleeve Signature", "Hoodie BoxyFit Valcrest",
    "Tshirt Boxyfit Starclub", "Longsleeve BoxyFit Premium II", "Jaket Bomber Utility",
    "Crewneck Basic Heavyweight", "Tshirt Oversize Graphic Wave", "Jogger Pants Cargo Pocket",
  ];
  const photoSets = [
    ["🥼","👕","📦","🏷️","👤","🧵"], ["👔","🔴","📸","🏷️","👤","📐"],
    ["🧥","🪡","📦","🏷️","👤","📏"], ["🧤","🔵","🪢","🏷️","👤","📐"],
  ];
  const colorSets: ProductColor[][] = [
    [{ name: "Hitam", hex: "#1a1a1a" }, { name: "Putih", hex: "#e8e8e8" }, { name: "Navy", hex: "#1a2a4a" }],
    [{ name: "Abu", hex: "#888" }, { name: "Hitam", hex: "#1a1a1a" }],
    [{ name: "Putih", hex: "#e8e8e8" }, { name: "Merah", hex: "#c0392b" }],
  ];
  const sizeSets = [["S","M","L","XL"], ["M","L","XL","XXL"], ["S","M","L","XL","XXL"]];

  return Array.from({ length: count }, (_, i) => {
    const disc = 45 + (i % 5) * 3;
    const oldP = 250000 + (i % 6) * 50000;
    const newP = Math.round(oldP * (1 - disc / 100));
    return {
      id: startId + i,
      name: `GO.NTREE ${names[i % names.length]} ${catLabel === "Best Seller" ? "Edition" : ""}`.trim(),
      disc,
      oldPrice: `Rp ${oldP.toLocaleString("id-ID")}`,
      newPrice: `Rp ${newP.toLocaleString("id-ID")}`,
      cat: catLabel,
      photos: photoSets[i % photoSets.length],
      colors: colorSets[i % colorSets.length],
      sizes: sizeSets[i % sizeSets.length],
      specs: "<strong>Bahan:</strong> Cotton combed premium<br><strong>Fit:</strong> Regular/Boxyfit<br><strong>Detail:</strong> Jahitan rapi, sablon/print awet<br><strong>Pengiriman:</strong> Senin–Sabtu pukul 16.00",
    };
  });
}

const products: ProductStore = {
  newArrival: generateDummy("New Arrival", 1, 12),
  bestSeller: generateDummy("Best Seller", 101, 12),
};

/* ============ ICON MAP ============ */
const EMOJI_ICON_MAP: Record<string, string> = {
  "🥼": "ti-shirt",
  "👕": "ti-shirt",
  "🧥": "ti-shirt-sport",
  "🧤": "ti-hoodie",
  "🧣": "ti-hoodie",
  "👔": "ti-shirt-filled",
  "🔴": "ti-circle-filled",
  "🔵": "ti-circle-filled",
  "📦": "ti-package",
  "🏷️": "ti-tag",
  "👤": "ti-user",
  "🧵": "ti-needle-thread",
  "🪡": "ti-needle-thread",
  "📏": "ti-ruler-2",
  "📐": "ti-ruler-2",
  "📸": "ti-camera",
  "⭐": "ti-star",
  "🌟": "ti-star-filled",
  "🪢": "ti-tag",
};

function IconImg({ emoji }: { emoji: string }) {
  const cls = EMOJI_ICON_MAP[emoji] ?? "ti-photo";
  return (
    <div className="flex items-center justify-center w-full h-full text-[#2a9d8e]">
      <i className={`ti ${cls} text-[40px]`} />
    </div>
  );
}

function ThumbIconImg({ emoji, size = "20px" }: { emoji: string; size?: string }) {
  const cls = EMOJI_ICON_MAP[emoji] ?? "ti-photo";
  return (
    <div className="flex items-center justify-center w-full h-full text-[#2a9d8e]">
      <i className={`ti ${cls}`} style={{ fontSize: size }} />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative w-full min-h-[300px] overflow-hidden bg-gradient-to-br from-[#071a18] via-[#0f3330] to-[#071a18] flex items-center">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #2a9d8e 0px, #2a9d8e 1px, transparent 1px, transparent 20px)",
        }}
      />
      <div className="relative z-10 px-10 max-w-[460px]">
        <div className="text-[10px] font-bold tracking-[3px] text-[#2a9d8e] uppercase mb-2.5">
          Brand Lokal · Koleksi Perdana
        </div>
        <h1 className="font-['Bebas_Neue'] text-[52px] leading-[0.95] text-white mb-2 max-sm:text-[34px]">
          DIBUAT
          <br />
          <em className="font-['Playfair_Display'] italic text-[#4ecdc4] text-[40px] font-normal max-sm:text-[26px]">
            dengan niat
          </em>
        </h1>
        <p className="text-gray-400 text-xs mb-5 leading-relaxed">
          GO.NTREE baru mulai — tapi setiap potong dijahit dan dicek satu per satu sebelum dikirim. Bukan brand besar, tapi serius soal kualitas.
        </p>
        <button className="inline-flex items-center gap-2 bg-[#2a9d8e] text-white px-[22px] py-2.5 text-[11px] font-bold tracking-[1.5px] uppercase cursor-pointer border-none hover:bg-[#1f7a6e] transition-colors">
          Lihat Koleksi <i className="ti ti-arrow-right text-[13px]" />
        </button>
      </div>
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 max-[420px]:hidden">
        <div className="w-[90px] h-[90px] rounded-full border-2 border-[#2a9d8e] flex flex-col items-center justify-center text-center max-sm:w-16 max-sm:h-16">
          <i className="ti ti-cut text-[20px] text-[#2a9d8e] mb-0.5" />
          <span className="text-[8px] tracking-[1px] text-gray-400 leading-tight px-1">Handmade<br/>Quality</span>
        </div>
        <div className="text-gray-500 text-[9px] tracking-[2px] uppercase mt-1">
          Made in Indonesia
        </div>
      </div>
    </section>
  );
}

/* ============ CATEGORIES ============ */
const categories = [
  { icon: "ti-sparkles", color: "#2a9d8e", label: "New Arrival" },
  { icon: "ti-star", color: "#f4a261", label: "Best Seller" },
  { icon: "ti-shirt", color: "#4ecdc4", label: "Oversize" },
  { icon: "ti-hoodie", color: "#e76f51", label: "Hoodie" },
];

function Categories() {
  return (
    <div className="px-6 pt-4 pb-2.5 border-b border-gray-100 max-sm:px-3.5">
      <div className="text-[10px] font-bold tracking-[2px] text-gray-400 uppercase mb-2.5">
        Categories
      </div>
      <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((cat) => (
          <div
            key={cat.label}
            className="flex-shrink-0 flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <div className="w-16 h-16 bg-gray-50 rounded border border-gray-200 flex items-center justify-center text-xl transition-colors group-hover:border-[#2a9d8e]">
              <i className={`ti ${cat.icon} text-[22px]`} style={{ color: cat.color }} />
            </div>
            <span className="text-[9px] font-semibold tracking-[0.5px] text-gray-500 text-center">
              {cat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ SOCIAL PROOF ============ */
function SocialProof() {
  const stats = [
    { icon: "ti-shield-check", value: "100%", label: "Original" },
    { icon: "ti-truck-delivery", value: "COD", label: "Bisa Bayar di Tempat" },
    { icon: "ti-replace", value: "Garansi", label: "Komplain Ditanggapi" },
    { icon: "ti-message-circle", value: "Fast", label: "Respon WhatsApp" },
  ];
  return (
    <div className="border-y border-gray-100 bg-gray-50">
      <div className="flex divide-x divide-gray-200">
        {stats.map((s) => (
          <div key={s.label} className="flex-1 flex flex-col items-center gap-0.5 px-2 py-3">
            <i className={`ti ${s.icon} text-[16px] text-[#2a9d8e]`} />
            <span className="font-['Bebas_Neue'] text-[14px] text-gray-900 leading-tight">{s.value}</span>
            <span className="text-[8.5px] font-semibold tracking-[0.3px] text-gray-400 uppercase text-center leading-tight">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ FLASH SALE ============ */
const FLASH_INITIAL = 4;

function FlashSale({
  products,
  onOpen,
  expanded,
  onToggle,
}: {
  products: Product[];
  onOpen: (id: number) => void;
  expanded: boolean;
  onToggle: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState({ h: 5, m: 42, s: 17 });

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 0; m = 0; s = 0; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  const flashProducts = products.map((p) => ({
    ...p,
    flashPrice: `Rp ${Math.round(parseInt(p.newPrice.replace(/\D/g, "")) * 0.85).toLocaleString("id-ID")}`,
  }));

  const visible = expanded ? flashProducts : flashProducts.slice(0, FLASH_INITIAL);

  return (
    <section className="px-6 py-5 max-sm:px-3.5">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="font-['Bebas_Neue'] text-[22px] tracking-wide text-gray-900 flex items-center gap-2 max-sm:text-lg">
            <i className="ti ti-sparkles text-[18px] text-[#2a9d8e]" />
            PROMO PEMBUKAAN
          </div>
          <div className="flex items-center gap-1">
            {[pad(timeLeft.h), pad(timeLeft.m), pad(timeLeft.s)].map((t, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="bg-gray-900 text-white font-['Bebas_Neue'] text-[15px] px-1.5 py-0.5 rounded min-w-[26px] text-center leading-tight">
                  {t}
                </span>
                {i < 2 && <span className="text-gray-400 font-bold text-xs">:</span>}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={onToggle}
          className="text-[10px] font-bold tracking-[1.5px] text-[#2a9d8e] uppercase cursor-pointer flex items-center gap-1 border-none bg-transparent p-0 whitespace-nowrap"
        >
          {expanded ? (
            <>Sembunyikan <i className="ti ti-chevron-up text-[11px]" /></>
          ) : (
            <>View All <i className="ti ti-arrow-right text-[11px]" /></>
          )}
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2.5 max-sm:grid-cols-2 max-sm:gap-2">
        {visible.map((p) => (
          <div key={p.id} className="cursor-pointer group relative" onClick={() => onOpen(p.id)}>
            <div className="aspect-[3/4] overflow-hidden bg-gray-50 mb-1.5 relative">
              <div className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <IconImg emoji={p.photos[0]} />
              </div>
              <span className="absolute top-[6px] left-[6px] bg-[#e63946] text-white text-[8px] font-bold px-1 py-0.5 tracking-[0.5px]">
                FLASH
              </span>
              <div className="absolute bottom-0 left-0 right-0 bg-[#e63946] py-[3px] text-center">
                <span className="text-white text-[8px] font-bold tracking-[0.5px]">HEMAT {p.disc}%</span>
              </div>
            </div>
            <div className="text-[10px] font-semibold text-gray-900 mb-0.5 leading-snug truncate max-sm:text-[9.5px]">{p.name}</div>
            <div className="flex items-center gap-1">
              <span className="text-[9px] text-gray-400 line-through">{p.newPrice}</span>
              <span className="text-[10.5px] font-bold text-[#e63946]">{p.flashPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ LOOKBOOK ============ */
const lookbookItems = [
  { label: "Street Casual", sub: "Polo + Chinos", icon: "ti-shirt", color: "#071a18" },
  { label: "All Black", sub: "Hoodie + Jogger", icon: "ti-hoodie", color: "#1a1a1a" },
  { label: "Clean Fit", sub: "Tshirt + Cargo", icon: "ti-shirt-filled", color: "#264653" },
];

function Lookbook() {
  return (
    <section className="px-6 py-5 max-sm:px-3.5">
      <div className="flex items-baseline justify-between mb-3.5">
        <div className="font-['Bebas_Neue'] text-[22px] tracking-wide text-gray-900 flex items-center gap-2 max-sm:text-lg">
          STYLE{" "}
          <span className="font-['Playfair_Display'] italic text-base text-[#2a9d8e] font-normal">
            Guide
          </span>
        </div>
        <button className="text-[10px] font-bold tracking-[1.5px] text-[#2a9d8e] uppercase cursor-pointer flex items-center gap-1 border-none bg-transparent p-0">
          View All <i className="ti ti-arrow-right text-[11px]" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3 max-sm:gap-2">
        {lookbookItems.map((item) => (
          <div key={item.label} className="cursor-pointer group relative overflow-hidden rounded">
            <div
              className="aspect-[3/4] flex flex-col items-center justify-center relative"
              style={{ background: item.color }}
            >
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, #2a9d8e 0px, #2a9d8e 1px, transparent 1px, transparent 16px)",
                }}
              />
              <i className={`ti ${item.icon} text-[48px] text-[#2a9d8e] opacity-80 group-hover:scale-110 transition-transform duration-300 relative z-10 max-sm:text-[36px]`} />
              <div className="absolute bottom-0 left-0 right-0 p-3 max-sm:p-2">
                <div className="font-['Bebas_Neue'] text-[16px] text-white tracking-wide leading-tight max-sm:text-[13px]">{item.label}</div>
                <div className="text-[9px] text-gray-400 tracking-[0.5px]">{item.sub}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ TESTIMONI ============ */
const reviews = [
  { name: "Rizky A.", loc: "Jakarta", rating: 5, product: "Hoodie BoxyFit Redline", text: "Bahan tebal banget, jahitan rapi. Udah order 3x dan ga pernah kecewa. Recommended!", initial: "R" },
  { name: "Dinda P.", loc: "Surabaya", rating: 5, product: "Polo Pique Zipper", text: "Kualitas setara brand mahal tapi harganya masuk akal. Fitting bagus, warna ga pudar.", initial: "D" },
  { name: "Fajar M.", loc: "Bandung", rating: 5, product: "Tshirt Boxyfit Redline", text: "Oversize-nya pas, ga kegedean. Sering dapet compliment kalau pake ini. Top banget!", initial: "F" },
  { name: "Sinta W.", loc: "Yogyakarta", rating: 4, product: "Longsleeve BoxyFit", text: "Pengiriman cepet, packing aman. Produknya sesuai foto. Bahan adem dan nyaman dipake.", initial: "S" },
];

function Testimoni() {
  return (
    <section className="px-6 py-5 bg-gray-50 max-sm:px-3.5">
      <div className="flex items-baseline justify-between mb-3.5">
        <div className="font-['Bebas_Neue'] text-[22px] tracking-wide text-gray-900 flex items-center gap-2 max-sm:text-lg">
          REVIEW{" "}
          <span className="font-['Playfair_Display'] italic text-base text-[#2a9d8e] font-normal">
            Pelanggan
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <i className="ti ti-star-filled text-[13px] text-[#f4a261]" />
          <span className="text-[12px] font-bold text-gray-900">4.9</span>
          <span className="text-[10px] text-gray-400">(120+ ulasan)</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
        {reviews.map((r) => (
          <div key={r.name} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-9 h-9 rounded-full bg-[#2a9d8e] flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0">
                {r.initial}
              </div>
              <div>
                <div className="text-[12px] font-bold text-gray-900">{r.name}</div>
                <div className="text-[10px] text-gray-400">{r.loc}</div>
              </div>
              <div className="ml-auto flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <i key={i} className="ti ti-star-filled text-[11px] text-[#f4a261]" />
                ))}
              </div>
            </div>
            <div className="text-[10px] font-semibold text-[#2a9d8e] mb-1.5 tracking-[0.3px]">
              {r.product}
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ COLLECTION BANNER ============ */
function CollectionBanner() {
  return (
    <div className="px-6 pb-5 max-sm:px-3.5 max-sm:pb-4.5">
      <div className="bg-[#071a18] relative overflow-hidden flex items-center justify-end h-40 max-sm:h-auto max-sm:min-h-[150px] max-sm:flex-col max-sm:justify-center max-sm:items-stretch max-sm:py-4.5">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #2a9d8e 0px, #2a9d8e 1px, transparent 1px, transparent 18px)",
          }}
        />
        <div className="absolute left-8 top-1/2 -translate-y-1/2 opacity-[0.15] max-sm:hidden">
          <GontreeLogo size={130} />
        </div>
        <div className="relative z-10 pr-8 text-right max-sm:text-left max-sm:px-5">
          <div className="text-[9px] font-bold tracking-[3px] text-[#2a9d8e] uppercase mb-1.5">
            Featured
          </div>
          <div className="font-['Bebas_Neue'] text-[36px] leading-[0.9] text-white max-sm:text-[28px]">
            BEST SELLER
            <br />
            <em className="font-['Playfair_Display'] italic text-[#4ecdc4] text-[28px] font-normal max-sm:text-[22px]">
              Collection
            </em>
          </div>
          <button className="mt-3 inline-flex items-center gap-1.5 border-[1.5px] border-[#2a9d8e] text-[#2a9d8e] px-4 py-[7px] text-[10px] font-bold tracking-[1.5px] uppercase cursor-pointer bg-transparent hover:bg-[#2a9d8e] hover:text-white transition-colors">
            Shop Now <i className="ti ti-arrow-right text-[10px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============ LOGO ============ */
function GontreeLogo({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 200 220" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <g fill="#2a9d8e">
        <path d="M55,40 L75,40 L75,55 Q90,30 115,35 Q140,40 145,65 Q150,90 135,105 L120,120 L100,130 Q75,135 60,120 L50,108 L55,95 Q62,105 78,108 Q95,112 108,100 Q122,88 118,70 Q114,52 98,48 Q82,44 72,58 L72,70 L55,70 Z" />
        <path d="M80,115 L95,115 L88,145 Q86,158 92,162 Q98,165 104,158 L110,145 L125,145 L118,162 Q110,178 95,175 Q78,172 76,158 Z" />
        <circle cx="130" cy="50" r="8" />
      </g>
    </svg>
  );
}

/* ============ PRODUCT CARD — compact variant ============ */
function ProductCard({
  product,
  onClick,
  compact = false,
}: {
  product: Product;
  onClick: (id: number) => void;
  compact?: boolean;
}) {
  return (
    <div className="cursor-pointer group relative" onClick={() => onClick(product.id)}>
      <div className={`overflow-hidden bg-gray-50 mb-1.5 relative ${compact ? "aspect-[3/4]" : "aspect-[3/4] mb-2"}`}>
        <div className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          {compact ? (
            <div className="flex items-center justify-center w-full h-full text-[#2a9d8e]">
              <i className={`ti ${EMOJI_ICON_MAP[product.photos[0]] ?? "ti-photo"} text-[28px]`} />
            </div>
          ) : (
            <IconImg emoji={product.photos[0]} />
          )}
        </div>
        <span
          className={`absolute top-[6px] left-[6px] bg-[#2a9d8e] text-white font-bold px-1 py-0.5 tracking-[0.5px] ${
            compact ? "text-[7.5px]" : "text-[9px] px-1.5"
          }`}
        >
          {product.disc}%
        </span>
      </div>
      <div
        className={`font-semibold text-gray-900 leading-snug truncate ${
          compact ? "text-[9.5px] mb-0.5" : "text-[11px] mb-0.5 max-sm:text-[10px]"
        }`}
      >
        {product.name}
      </div>
      <div className="flex items-center gap-1">
        <span className={`text-gray-400 line-through ${compact ? "text-[8.5px]" : "text-[10px]"}`}>
          {product.oldPrice}
        </span>
        <span className={`font-bold text-[#2a9d8e] ${compact ? "text-[10px]" : "text-[12px]"}`}>
          {product.newPrice}
        </span>
      </div>
    </div>
  );
}

/* ============ INLINE PRODUCT GRID SECTION ============ */
const SECTION_INITIAL = 8; // show 8 cards (2 rows × 4 col) initially

function ProductSection({
  title,
  subtitle,
  items,
  onOpen,
  expanded,
  onToggle,
}: {
  title: string;
  subtitle: string;
  items: Product[];
  onOpen: (id: number) => void;
  expanded: boolean;
  onToggle: () => void;
}) {
  const visible = expanded ? items : items.slice(0, SECTION_INITIAL);

  return (
    <section className="px-6 py-5 max-sm:px-3.5 max-sm:py-4.5">
      <div className="flex items-baseline justify-between mb-3.5">
        <div className="font-['Bebas_Neue'] text-[22px] tracking-wide text-gray-900 flex items-center gap-2 max-sm:text-lg">
          {title}{" "}
          <span className="font-['Playfair_Display'] italic text-base text-[#2a9d8e] font-normal">
            {subtitle}
          </span>
        </div>
        {items.length > SECTION_INITIAL && (
          <button
            onClick={onToggle}
            className="text-[10px] font-bold tracking-[1.5px] text-[#2a9d8e] uppercase cursor-pointer flex items-center gap-1 border-none bg-transparent p-0 whitespace-nowrap"
          >
            {expanded ? (
              <>Sembunyikan <i className="ti ti-chevron-up text-[11px]" /></>
            ) : (
              <>View All <i className="ti ti-arrow-right text-[11px]" /></>
            )}
          </button>
        )}
      </div>

      {/* 4-col grid, compact cards when expanded */}
      <div className="grid grid-cols-4 gap-2.5 max-sm:grid-cols-2 max-sm:gap-2">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} onClick={onOpen} compact={expanded} />
        ))}
      </div>

      {/* Show more / show less pill at bottom when expanded */}
      {expanded && (
        <button
          onClick={onToggle}
          className="mt-4 w-full py-2 border border-gray-200 rounded-lg text-[10px] font-bold tracking-[1.5px] text-gray-400 uppercase cursor-pointer bg-transparent hover:border-[#2a9d8e] hover:text-[#2a9d8e] transition-colors flex items-center justify-center gap-1.5"
        >
          <i className="ti ti-chevron-up text-[11px]" /> Sembunyikan
        </button>
      )}
    </section>
  );
}

/* ============ PRODUCT MODAL ============ */
function ProductModal({ product, onClose, onAddedToCart }: { product: Product | null; onClose: () => void; onAddedToCart: () => void }) {
  const [thumbIdx, setThumbIdx] = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const [qty, setQty] = useState(1);
  const [lastProduct, setLastProduct] = useState<Product | null>(null);

  const { mounted, closing } = useModalAnimation(!!product);

  useEffect(() => {
    if (product) {
      setLastProduct(product);
      setThumbIdx(0);
      setActiveColor(0);
      setActiveSize(0);
      setQty(1);
    }
  }, [product]);

  useEffect(() => {
    if (mounted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mounted]);

  if (!mounted) return null;

  const p = lastProduct!;

  return (
    <div
      className={`fixed inset-0 bg-black/60 z-[200] flex items-end justify-center backdrop-blur-[2px] ${closing ? "modal-backdrop-out" : "modal-backdrop-in"}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`bg-white w-full max-w-[520px] max-h-[92vh] max-sm:max-h-[95vh] flex flex-col overflow-hidden ${closing ? "modal-sheet-out" : "modal-sheet-in"}`}>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <span className="font-['Bebas_Neue'] text-[15px] tracking-[0.5px] text-gray-900 leading-tight">
            {p.name}
          </span>
          <button
            onClick={onClose}
            className="bg-gray-50 border border-gray-200 rounded-full w-8 h-8 flex-shrink-0 cursor-pointer flex items-center justify-center text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors"
            aria-label="Tutup"
          >
            <i className="ti ti-x text-[15px]" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 pb-5">
            {/* Gallery */}
            <div className="grid gap-2.5 mb-4" style={{ gridTemplateColumns: "52px 1fr" }}>
              <div className="flex flex-col gap-1.5 max-h-[280px] overflow-y-auto pr-0.5 scrollbar-hide">
                {p.photos.map((ph, i) => (
                  <button
                    key={i}
                    onClick={() => setThumbIdx(i)}
                    className={`w-[50px] h-[50px] flex-shrink-0 bg-gray-50 flex items-center justify-center cursor-pointer rounded-md transition-all border ${
                      i === thumbIdx
                        ? "border-[#2a9d8e] bg-[#f0faf8] ring-1 ring-[#2a9d8e]/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <ThumbIconImg emoji={ph} size="18px" />
                  </button>
                ))}
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100/70 rounded-lg flex items-center justify-center aspect-square text-[#2a9d8e] relative overflow-hidden border border-gray-100">
                <span className="absolute top-2.5 left-2.5 bg-[#2a9d8e] text-white text-[9px] font-bold px-1.5 py-0.5 rounded tracking-[0.5px]">
                  {p.disc}% OFF
                </span>
                <i className={`ti ${EMOJI_ICON_MAP[p.photos[thumbIdx]] ?? "ti-photo"} text-[56px] opacity-90`} />
                <span className="absolute bottom-2.5 right-2.5 text-[9px] font-semibold text-gray-400 bg-white/80 px-1.5 py-0.5 rounded">
                  {thumbIdx + 1}/{p.photos.length}
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex gap-1.5 mb-3 flex-wrap">
              <span className="text-[10px] px-2 py-0.5 rounded font-bold tracking-[0.5px] bg-[#e1f5ee] text-[#0f6e56] flex items-center gap-1">
                <i className="ti ti-check text-[10px]" /> Ada Stok
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-bold tracking-[0.5px] bg-gray-100 text-gray-500">
                {p.cat}
              </span>
            </div>

            {/* Title & price */}
            <div className="text-[16px] font-bold text-gray-900 mb-2 leading-snug">{p.name}</div>
            <div className="flex items-baseline gap-2.5 mb-4 pb-4 border-b border-gray-100">
              <span className="text-[22px] font-bold text-[#2a9d8e]">{p.newPrice}</span>
              <span className="text-[13px] text-gray-400 line-through">{p.oldPrice}</span>
              <span className="text-[10px] font-bold text-[#e63946] bg-[#fde8e8] px-1.5 py-0.5 rounded">
                -{p.disc}%
              </span>
            </div>

            {/* Color */}
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-bold tracking-[1.5px] text-gray-400 uppercase">Warna</span>
              <span className="text-[11px] font-semibold text-gray-700">{p.colors[activeColor].name}</span>
            </div>
            <div className="flex gap-3 mb-5 flex-wrap">
              {p.colors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setActiveColor(i)}
                  className="flex flex-col items-center gap-1 cursor-pointer bg-transparent border-none p-0"
                  title={c.name}
                >
                  <span
                    className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                      i === activeColor ? "border-[#2a9d8e]" : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-full border border-black/5"
                      style={{ background: c.hex }}
                    />
                  </span>
                </button>
              ))}
            </div>

            {/* Size */}
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] font-bold tracking-[1.5px] text-gray-400 uppercase">Ukuran</span>
              <button className="text-[10px] font-semibold text-[#2a9d8e] flex items-center gap-1 bg-transparent border-none cursor-pointer p-0">
                <i className="ti ti-ruler-2 text-[11px]" /> Panduan Ukuran
              </button>
            </div>
            <div className="flex gap-1.5 mb-5 flex-wrap">
              {p.sizes.map((s, i) => (
                <button
                  key={s}
                  onClick={() => setActiveSize(i)}
                  className={`min-w-[42px] px-3 py-1.5 border rounded text-xs font-semibold cursor-pointer transition-all font-['Inter'] ${
                    i === activeSize
                      ? "bg-[#2a9d8e] text-white border-[#2a9d8e]"
                      : "border-gray-300 text-gray-600 bg-white hover:border-[#2a9d8e] hover:text-[#2a9d8e]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-[10px] font-bold tracking-[1.5px] text-gray-400 uppercase">Jumlah</span>
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 rounded-md bg-white border border-gray-200 text-gray-600 cursor-pointer flex items-center justify-center hover:border-[#2a9d8e] hover:text-[#2a9d8e] transition-colors"
                >
                  <i className="ti ti-minus text-[13px]" />
                </button>
                <span className="text-[14px] font-bold min-w-[20px] text-center text-gray-900">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-7 h-7 rounded-md bg-white border border-gray-200 text-gray-600 cursor-pointer flex items-center justify-center hover:border-[#2a9d8e] hover:text-[#2a9d8e] transition-colors"
                >
                  <i className="ti ti-plus text-[13px]" />
                </button>
              </div>
            </div>

            {/* Specs */}
            <div className="bg-gray-50 rounded-lg p-3.5">
              <div className="text-[10px] font-bold tracking-[1.5px] text-gray-400 uppercase mb-2 flex items-center gap-1.5">
                <i className="ti ti-info-circle text-[12px]" /> Detail Produk
              </div>
              <div
                className="text-[11.5px] text-gray-600 leading-[1.9]"
                dangerouslySetInnerHTML={{ __html: p.specs }}
              />
            </div>
          </div>
        </div>

        {/* Sticky floating action bar */}
        <div className="flex-shrink-0 border-t border-gray-100 bg-white/95 backdrop-blur-sm px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-[1fr_1.4fr] gap-2.5">
            <button
              onClick={() => {
                useCartStore.getState().addItem({
                  id: p.id,
                  name: p.name,
                  price: parseInt(p.newPrice.replace(/\D/g, "")),
                  photo: p.photos[0],
                  color: p.colors[activeColor].name,
                  size: p.sizes[activeSize],
                  qty,
                });
                onAddedToCart();
                onClose();
              }}
              className="py-3 border-[1.5px] border-[#2a9d8e] rounded-lg bg-white text-[#2a9d8e] text-[11.5px] font-bold tracking-wide uppercase cursor-pointer hover:bg-[#e1f5ee] active:scale-[0.98] transition-all font-['Inter'] flex items-center justify-center gap-1.5"
            >
              <i className="ti ti-shopping-bag text-[14px]" />
              Keranjang
            </button>
            <button className="py-3 border-none rounded-lg bg-[#2a9d8e] text-white text-[11.5px] font-bold tracking-wide uppercase cursor-pointer hover:bg-[#1f7a6e] active:scale-[0.98] transition-all font-['Inter'] flex items-center justify-center gap-1.5 shadow-[0_4px_12px_rgba(42,157,142,0.35)]">
              <i className="ti ti-bolt text-[14px]" />
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ BOTTOM NAV ============ */
const navItems: { key: BottomNavKey; icon: string; label: string; badge?: number }[] = [
  { key: "home", icon: "ti-home", label: "Home" },
  { key: "pesanan", icon: "ti-receipt", label: "Pesanan", badge: 2 },
  { key: "wishlist", icon: "ti-heart", label: "Wishlist" },
  { key: "akun", icon: "ti-user", label: "Akun" },
];

function BottomNav() {
  const [active, setActive] = useState<BottomNavKey>("home");
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, profile, loading, signOut } = useAuth();

  const { mounted: profileMounted, closing: profileClosing } = useModalAnimation(profileOpen && !!user);

  const handleAkunClick = () => {
    setActive("akun");
    if (user) setProfileOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
    setProfileOpen(false);
    setActive("home");
  };

  return (
    <>
      {profileMounted && (
        <div
          className={`fixed inset-0 bg-black/50 z-[300] flex items-center justify-center px-4 ${profileClosing ? "modal-backdrop-out" : "modal-backdrop-in"}`}
          onClick={(e) => { if (e.target === e.currentTarget) setProfileOpen(false); }}
        >
          <div className={`bg-white w-full max-w-[360px] rounded-xl overflow-hidden ${profileClosing ? "modal-center-out" : "modal-center-in"}`}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span className="font-['Bebas_Neue'] text-lg tracking-wide text-gray-900">Profil Saya</span>
              <button
                onClick={() => setProfileOpen(false)}
                className="bg-transparent border border-gray-200 rounded-full w-8 h-8 cursor-pointer flex items-center justify-center text-gray-500 hover:border-gray-400 transition-colors"
              >
                <i className="ti ti-x text-[15px]" />
              </button>
            </div>
            <div className="p-5 flex flex-col items-center gap-4">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name ?? "Avatar"}
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#2a9d8e]"
                />
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
                  : "bg-[#e1f5ee] text-[#0f6e56]"
                }`}>
                  {profile?.role?.toUpperCase() ?? "PEMBELI"}
                </span>
              </div>
              <div className="w-full border-t border-gray-100 pt-4 flex flex-col gap-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Member sejak</span>
                  <span className="text-gray-700 font-medium">
                    {profile?.created_at
                      ? new Date(profile.created_at).toLocaleDateString("id-ID", { year: "numeric", month: "long" })
                      : "-"}
                  </span>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full py-2.5 border border-red-200 text-red-500 text-xs font-bold uppercase rounded cursor-pointer hover:bg-red-50 transition-colors bg-transparent flex items-center justify-center gap-2"
              >
                <i className="ti ti-logout text-[13px]" /> Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 pb-safe">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = active === item.key;
            const isAkun = item.key === "akun";
            return (
              <button
                key={item.key}
                onClick={isAkun ? handleAkunClick : () => setActive(item.key)}
                className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 pb-1.5 bg-transparent border-none cursor-pointer relative font-['Inter'] transition-colors ${
                  isActive ? "text-[#2a9d8e]" : "text-gray-400"
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center relative">
                  {isAkun && !loading && user ? (
                    profile?.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt=""
                        className={`w-6 h-6 rounded-full object-cover ${isActive ? "border-2 border-[#2a9d8e]" : "border border-gray-300"}`}
                      />
                    ) : (
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${isActive ? "bg-[#2a9d8e]" : "bg-gray-400"}`}>
                        {(profile?.full_name ?? user?.email ?? "U")[0].toUpperCase()}
                      </div>
                    )
                  ) : (
                    <i className={`ti ${item.icon} text-[22px] leading-none`} />
                  )}
                </div>
                <span className="text-[9.5px] font-semibold tracking-[0.2px] leading-none">{item.label}</span>
                {item.badge && (
                  <span className="absolute top-[3px] right-[22%] bg-[#e63946] text-white text-[8px] font-bold min-w-[14px] h-[14px] rounded-full flex items-center justify-center px-0.5 leading-none">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}

/* ============ MAIN PAGE ============ */
export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const cartCount = useCartStore((s) => s.count());

  const allProducts = [...products.newArrival, ...products.bestSeller];

  const openModal = (id: number) => {
    const found = allProducts.find((p) => p.id === id) ?? null;
    setSelectedProduct(found);
  };

  const toggle = (key: string) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MODAL_STYLES }} />
      <Navbar />

      <main className="font-['Inter'] bg-white text-gray-900 text-sm overflow-x-hidden pb-16 md:pb-0">
        <h2 className="sr-only">GO.NTREE shop</h2>

        <Hero />
        <SocialProof />
        <Categories />

        <hr className="border-none border-t border-gray-100 mx-6 max-sm:mx-3.5" />

        <FlashSale
          products={allProducts}
          onOpen={openModal}
          expanded={!!expanded["flash"]}
          onToggle={() => toggle("flash")}
        />

        <hr className="border-none border-t border-gray-100 mx-6 max-sm:mx-3.5" />

        <ProductSection
          title="NEW ARRIVAL"
          subtitle="Collection"
          items={products.newArrival}
          onOpen={openModal}
          expanded={!!expanded["newArrival"]}
          onToggle={() => toggle("newArrival")}
        />

        <hr className="border-none border-t border-gray-100 mx-6 max-sm:mx-3.5" />
        <Lookbook />
        <CollectionBanner />
        <hr className="border-none border-t border-gray-100 mx-6 max-sm:mx-3.5" />

        <ProductSection
          title="BEST SELLER"
          subtitle="Collection"
          items={products.bestSeller}
          onOpen={openModal}
          expanded={!!expanded["bestSeller"]}
          onToggle={() => toggle("bestSeller")}
        />

        <Testimoni />
      </main>

      <Footer />
      <BottomNav />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddedToCart={() => setCartOpen(true)}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      <AuthModal />

      {/* Floating cart button */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-20 right-4 md:bottom-6 z-40 w-12 h-12 rounded-full bg-[#2a9d8e] text-white shadow-lg flex items-center justify-center cursor-pointer hover:bg-[#1f7a6e] transition-colors"
      >
        <i className="ti ti-shopping-bag text-[20px]" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#e63946] text-white text-[9px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-0.5">
            {cartCount}
          </span>
        )}
      </button>
    </>
  );
}