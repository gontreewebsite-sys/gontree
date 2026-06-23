"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/app/components/Navbar";
import { useAuth } from "@/app/hooks/useAuth";
import { AuthModal } from "@/app/components/AuthModal";

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

/* ============ DATA ============ */
const products: ProductStore = {
  newArrival: [
    {
      id: 1,
      name: "GO.NTREE Polo Pique Zipper Almighty",
      disc: 55,
      oldPrice: "Rp 300.000",
      newPrice: "Rp 135.000",
      cat: "New Arrival",
      photos: ["🥼", "👕", "📦", "🏷️", "👤", "🧵"],
      colors: [
        { name: "Hitam", hex: "#1a1a1a" },
        { name: "Putih", hex: "#e8e8e8" },
        { name: "Navy", hex: "#1a2a4a" },
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      specs: "<strong>Bahan:</strong> Polo pique premium 220gsm<br><strong>Fit:</strong> Regular fit, cocok semua postur<br><strong>Detail:</strong> Zipper depan, kerah polo<br><strong>Pengiriman:</strong> Senin–Sabtu pukul 16.00",
    },
    {
      id: 2,
      name: "GO.NTREE Tshirt Boxyfit Redline Divio",
      disc: 54,
      oldPrice: "Rp 250.000",
      newPrice: "Rp 115.000",
      cat: "New Arrival",
      photos: ["👔", "🔴", "📸", "🏷️", "👤", "📐"],
      colors: [
        { name: "Putih", hex: "#e8e8e8" },
        { name: "Merah", hex: "#c0392b" },
      ],
      sizes: ["M", "L", "XL"],
      specs: "<strong>Bahan:</strong> Cotton combed 30s<br><strong>Fit:</strong> Boxyfit oversize<br><strong>Detail:</strong> Sablon redline premium, unisex<br><strong>Pengiriman:</strong> Senin–Sabtu pukul 16.00",
    },
    {
      id: 3,
      name: "GO.NTREE Longsleeve BoxyFit Premium",
      disc: 60,
      oldPrice: "Rp 300.000",
      newPrice: "Rp 120.000",
      cat: "New Arrival",
      photos: ["🧥", "🪡", "📦", "🏷️", "👤", "📏"],
      colors: [
        { name: "Hitam", hex: "#1a1a1a" },
        { name: "Cream", hex: "#f0e6cc" },
      ],
      sizes: ["M", "L", "XL", "XXL"],
      specs: "<strong>Bahan:</strong> Cotton fleece 280gsm<br><strong>Fit:</strong> Boxyfit longsleeve<br><strong>Detail:</strong> Jahitan double-stitch premium<br><strong>Pengiriman:</strong> Senin–Sabtu pukul 16.00",
    },
    {
      id: 4,
      name: "GO.NTREE Hoodie BoxyFit Redline Club",
      disc: 52,
      oldPrice: "Rp 500.000",
      newPrice: "Rp 238.000",
      cat: "New Arrival",
      photos: ["🧤", "🔵", "🪢", "🏷️", "👤", "📐"],
      colors: [
        { name: "Abu", hex: "#888" },
        { name: "Hitam", hex: "#1a1a1a" },
        { name: "Biru", hex: "#1a4fa0" },
      ],
      sizes: ["M", "L", "XL", "XXL"],
      specs: "<strong>Bahan:</strong> Fleece tebal 300gsm<br><strong>Fit:</strong> Boxyfit hoodie<br><strong>Detail:</strong> Kantong depan, tali adjustable, patch redline<br><strong>Pengiriman:</strong> Senin–Sabtu pukul 16.00",
    },
  ],
  bestSeller: [
    {
      id: 5,
      name: "GO.NTREE Polo Longsleeve BoxyFit Signature",
      disc: 60,
      oldPrice: "Rp 300.000",
      newPrice: "Rp 120.000",
      cat: "Best Seller",
      photos: ["🧣", "🪢", "📦", "🏷️", "👤", "📏"],
      colors: [
        { name: "Hitam", hex: "#1a1a1a" },
        { name: "Benhur", hex: "#1a4fa0" },
      ],
      sizes: ["S", "M", "L", "XL"],
      specs: "<strong>Bahan:</strong> Polo pique premium<br><strong>Fit:</strong> Boxyfit longsleeve signature<br><strong>Detail:</strong> Best seller edisi signature 2025<br><strong>Pengiriman:</strong> Senin–Sabtu pukul 16.00",
    },
    {
      id: 6,
      name: "GO.NTREE Hoodie BoxyFit Valcrest",
      disc: 52,
      oldPrice: "Rp 500.000",
      newPrice: "Rp 238.000",
      cat: "Best Seller",
      photos: ["🧤", "🔵", "🪡", "🏷️", "👤", "📐"],
      colors: [
        { name: "Abu", hex: "#888" },
        { name: "Hitam", hex: "#1a1a1a" },
        { name: "Benhur", hex: "#1a4fa0" },
      ],
      sizes: ["M", "L", "XL", "XXL"],
      specs: "<strong>Bahan:</strong> Soft cotton fleece 280gsm<br><strong>Fit:</strong> Unisex reguler fit<br><strong>Detail:</strong> Valcrest signature series, kualitas jahitan terbaik<br><strong>Pengiriman:</strong> Senin–Sabtu pukul 16.00",
    },
    {
      id: 7,
      name: "GO.NTREE Tshirt Boxyfit Starclub",
      disc: 54,
      oldPrice: "Rp 250.000",
      newPrice: "Rp 115.000",
      cat: "Best Seller",
      photos: ["⭐", "🌟", "📦", "🏷️", "👤", "📸"],
      colors: [
        { name: "Hitam", hex: "#1a1a1a" },
        { name: "Putih", hex: "#e8e8e8" },
      ],
      sizes: ["M", "L", "XL"],
      specs: "<strong>Bahan:</strong> Cotton combed 30s<br><strong>Fit:</strong> Boxyfit oversize<br><strong>Detail:</strong> Grafis bintang depan-belakang, Starclub series<br><strong>Pengiriman:</strong> Senin–Sabtu pukul 16.00",
    },
    {
      id: 8,
      name: "GO.NTREE Longsleeve BoxyFit Premium II",
      disc: 60,
      oldPrice: "Rp 300.000",
      newPrice: "Rp 120.000",
      cat: "Best Seller",
      photos: ["🧥", "🪡", "📦", "🏷️", "👤", "📏"],
      colors: [
        { name: "Hitam", hex: "#1a1a1a" },
        { name: "Putih", hex: "#e8e8e8" },
        { name: "Army", hex: "#4a5240" },
      ],
      sizes: ["M", "L", "XL", "XXL"],
      specs: "<strong>Bahan:</strong> Cotton fleece 280gsm<br><strong>Fit:</strong> Boxyfit longsleeve<br><strong>Detail:</strong> Premium II edition, 3 pilihan warna<br><strong>Pengiriman:</strong> Senin–Sabtu pukul 16.00",
    },
  ],
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

/* ============ HERO ============ */
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
          New Collection 2025
        </div>
        <h1 className="font-['Bebas_Neue'] text-[60px] leading-[0.95] text-white mb-2 max-sm:text-[38px]">
          NEW
          <br />
          <em className="font-['Playfair_Display'] italic text-[#4ecdc4] text-[46px] font-normal max-sm:text-[30px]">
            Collection
          </em>
        </h1>
        <p className="text-gray-400 text-xs mb-5 leading-relaxed">
          Style premium untuk tampilan terbaik setiap hari. Koleksi terbaru kini hadir.
        </p>
        <button className="inline-flex items-center gap-2 bg-[#2a9d8e] text-white px-[22px] py-2.5 text-[11px] font-bold tracking-[1.5px] uppercase cursor-pointer border-none hover:bg-[#1f7a6e] transition-colors">
          Shop Now <i className="ti ti-arrow-right text-[13px]" />
        </button>
      </div>
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 max-[420px]:hidden">
        <div className="w-[90px] h-[90px] rounded-full border-2 border-[#2a9d8e] flex flex-col items-center justify-center max-sm:w-16 max-sm:h-16">
          <span className="font-['Bebas_Neue'] text-[30px] leading-none text-[#2a9d8e] max-sm:text-xl">
            60%
          </span>
          <span className="text-[9px] tracking-[2px] text-gray-400">OFF</span>
        </div>
        <div className="text-gray-500 text-[9px] tracking-[2px] uppercase mt-1">
          Mid Year Sale
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
  { icon: "ti-shirt", color: "#6c63ff", label: "Longsleeve" },
  { icon: "ti-hoodie", color: "#e76f51", label: "Hoodie" },
  { icon: "ti-cap", color: "#333", label: "Cap" },
  { icon: "ti-pants", color: "#264653", label: "Celana" },
  { icon: "ti-scissors", color: "#e63946", label: "Croptee" },
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

/* ============ PRODUCT CARD ============ */
function ProductCard({ product, onClick }: { product: Product; onClick: (id: number) => void }) {
  return (
    <div className="cursor-pointer group relative" onClick={() => onClick(product.id)}>
      <div className="aspect-[3/4] overflow-hidden bg-gray-50 mb-2 relative">
        <div className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <IconImg emoji={product.photos[0]} />
        </div>
        <span className="absolute top-[7px] left-[7px] bg-[#2a9d8e] text-white text-[9px] font-bold px-1.5 py-0.5 tracking-[0.5px]">
          {product.disc}%
        </span>
      </div>
      <div className="text-[11px] font-semibold text-gray-900 mb-0.5 leading-snug truncate max-sm:text-[10px]">
        {product.name}
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-gray-400 line-through">{product.oldPrice}</span>
        <span className="text-[12px] font-bold text-[#2a9d8e]">{product.newPrice}</span>
      </div>
    </div>
  );
}

/* ============ PRODUCT MODAL ============ */
function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const [thumbIdx, setThumbIdx] = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const [qty, setQty] = useState(1);
  
  useEffect(() => {
    if (product) {
      setThumbIdx(0);
      setActiveColor(0);
      setActiveSize(0);
      setQty(1);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 bg-black/55 z-[200] flex items-end justify-center animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-[680px] max-h-[92vh] overflow-y-auto rounded-t-2xl animate-slide-up max-sm:max-h-[95vh] max-sm:rounded-t-xl">
        <div className="flex items-center justify-between px-4.5 py-3.5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <span className="font-['Bebas_Neue'] text-base tracking-[0.5px] text-gray-900">
            {product.name}
          </span>
          <button
            onClick={onClose}
            className="bg-transparent border border-gray-200 rounded-full w-[30px] h-[30px] cursor-pointer flex items-center justify-center text-gray-500 hover:border-gray-400 transition-colors"
            aria-label="Tutup"
          >
            <i className="ti ti-x text-[15px]" />
          </button>
        </div>

        <div className="p-4 pb-6">
          <div className="grid gap-2.5 mb-3.5" style={{ gridTemplateColumns: "60px 1fr" }}>
            <div className="flex flex-col gap-1.5">
              {product.photos.map((ph, i) => (
                <button
                  key={i}
                  onClick={() => setThumbIdx(i)}
                  className={`w-[58px] h-[58px] bg-gray-50 flex items-center justify-center cursor-pointer rounded transition-colors border ${
                    i === thumbIdx ? "border-[#2a9d8e]" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <ThumbIconImg emoji={ph} size="20px" />
                </button>
              ))}
            </div>
            <div className="bg-gray-50 rounded flex items-center justify-center aspect-[3/4] text-[#2a9d8e]">
              <i className={`ti ${EMOJI_ICON_MAP[product.photos[thumbIdx]] ?? "ti-photo"} text-[64px]`} />
            </div>
          </div>

          <div className="flex gap-1.5 mb-2.5 flex-wrap">
            <span className="text-[10px] px-2 py-0.5 rounded font-bold tracking-[0.5px] bg-[#e1f5ee] text-[#0f6e56]">
              Ada Stok
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded font-bold tracking-[0.5px] bg-gray-100 text-gray-500">
              {product.cat}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded font-bold tracking-[0.5px] bg-gray-100 text-gray-500">
              {product.disc}% OFF
            </span>
          </div>

          <div className="text-[15px] font-bold text-gray-900 mb-2 leading-snug">{product.name}</div>
          <div className="text-xs text-gray-400 line-through mb-0.5">{product.oldPrice}</div>
          <div className="text-[22px] font-bold text-[#2a9d8e] mb-3.5">{product.newPrice}</div>

          <div className="text-[10px] font-bold tracking-[1.5px] text-gray-400 uppercase mb-2">Warna</div>
          <div className="flex gap-2.5 mb-4 flex-wrap">
            {product.colors.map((c, i) => (
              <div key={i} className="flex flex-col items-center gap-5 cursor-pointer">
                <div className="relative">
                  <div
                    onClick={() => setActiveColor(i)}
                    className={`w-[30px] h-[30px] rounded-full border-2 transition-all ${
                      i === activeColor ? "border-[#2a9d8e] shadow-[0_0_0_2px_white_inset]" : "border-transparent"
                    }`}
                    style={{ background: c.hex }}
                    title={c.name}
                  />
                  <span className="absolute -bottom-[18px] left-1/2 -translate-x-1/2 text-[9px] text-gray-500 whitespace-nowrap">
                    {c.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-[10px] font-bold tracking-[1.5px] text-gray-400 uppercase mb-2 mt-5">Ukuran</div>
          <div className="flex gap-1.5 mb-4 flex-wrap">
            {product.sizes.map((s, i) => (
              <button
                key={s}
                onClick={() => setActiveSize(i)}
                className={`px-3.5 py-1.5 border rounded text-xs font-semibold cursor-pointer transition-all font-['Inter'] ${
                  i === activeSize
                    ? "bg-[#2a9d8e] text-white border-[#2a9d8e]"
                    : "border-gray-300 text-gray-600 bg-white hover:border-[#2a9d8e] hover:text-[#2a9d8e]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="text-[10px] font-bold tracking-[1.5px] text-gray-400 uppercase mb-2">Jumlah</div>
          <div className="flex items-center gap-2.5 mb-4.5">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-8 h-8 border border-gray-300 rounded bg-white text-gray-600 cursor-pointer flex items-center justify-center hover:border-[#2a9d8e] transition-colors"
            >
              <i className="ti ti-minus" />
            </button>
            <span className="text-[15px] font-semibold min-w-[24px] text-center text-gray-900">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-8 h-8 border border-gray-300 rounded bg-white text-gray-600 cursor-pointer flex items-center justify-center hover:border-[#2a9d8e] transition-colors"
            >
              <i className="ti ti-plus" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3.5">
            <button className="py-[11px] border-[1.5px] border-[#2a9d8e] rounded bg-white text-[#2a9d8e] text-xs font-bold tracking-wide uppercase cursor-pointer hover:bg-[#e1f5ee] transition-colors font-['Inter']">
              <i className="ti ti-shopping-bag text-[13px] mr-1" />
              Keranjang
            </button>
            <button className="py-[11px] border-none rounded bg-[#2a9d8e] text-white text-xs font-bold tracking-wide uppercase cursor-pointer hover:bg-[#1f7a6e] transition-colors font-['Inter']">
              <i className="ti ti-bolt text-[13px] mr-1" />
              Beli Sekarang
            </button>
          </div>

          <div
            className="border-t border-gray-100 pt-3 text-xs text-gray-500 leading-[1.8]"
            dangerouslySetInnerHTML={{ __html: product.specs }}
          />
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
      {/* Profile popup — sama persis dengan di Navbar */}
      {profileOpen && user && (
        <div
          className="fixed inset-0 bg-black/50 z-[300] flex items-center justify-center animate-fade-in px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setProfileOpen(false); }}
        >
          <div className="bg-white w-full max-w-[360px] rounded-xl overflow-hidden animate-slide-up">
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
                  {(profile?.full_name ?? user.email ?? "U")[0].toUpperCase()}
                </div>
              )}
              <div className="text-center">
                <div className="font-bold text-gray-900 text-base">{profile?.full_name ?? "Pengguna"}</div>
                <div className="text-xs text-gray-400 mt-0.5">{user.email}</div>
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
                        {(profile?.full_name ?? user.email ?? "U")[0].toUpperCase()}
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

  const allProducts = [...products.newArrival, ...products.bestSeller];

  const openModal = (id: number) => {
    const found = allProducts.find((p) => p.id === id) ?? null;
    setSelectedProduct(found);
  };

  return (
    <>
      <div className="bg-[#2a9d8e] text-white text-center py-2 px-3 text-[12px] font-semibold tracking-[1.5px]">
        MID YEAR SALE &nbsp;|&nbsp; DISC. UP TO 60% OFF &nbsp;|&nbsp; SHOP NOW
      </div>

      <Navbar />

      <main className="font-['Inter'] bg-white text-gray-900 text-sm overflow-x-hidden pb-16 md:pb-0">
        <h2 className="sr-only">GO.NTREE shop</h2>

        <Hero />
        <Categories />

        <hr className="border-none border-t border-gray-100 mx-6 max-sm:mx-3.5" />

        <section className="px-6 py-5 max-sm:px-3.5 max-sm:py-4.5">
          <div className="flex items-baseline justify-between mb-3.5">
            <div className="font-['Bebas_Neue'] text-[22px] tracking-wide text-gray-900 flex items-center gap-2 max-sm:text-lg">
              NEW ARRIVAL{" "}
              <span className="font-['Playfair_Display'] italic text-base text-[#2a9d8e] font-normal">
                Collection
              </span>
            </div>
            <button className="text-[10px] font-bold tracking-[1.5px] text-[#2a9d8e] uppercase cursor-pointer flex items-center gap-1 border-none bg-transparent p-0">
              View All <i className="ti ti-arrow-right text-[11px]" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3 max-sm:grid-cols-2 max-sm:gap-2.5">
            {products.newArrival.map((p) => (
              <ProductCard key={p.id} product={p} onClick={openModal} />
            ))}
          </div>
        </section>

        <CollectionBanner />

        <hr className="border-none border-t border-gray-100 mx-6 max-sm:mx-3.5" />

        <section className="px-6 pt-4.5 pb-5 max-sm:px-3.5 max-sm:py-4.5">
          <div className="flex items-baseline justify-between mb-3.5">
            <div className="font-['Bebas_Neue'] text-[22px] tracking-wide text-gray-900 flex items-center gap-2 max-sm:text-lg">
              BEST SELLER{" "}
              <span className="font-['Playfair_Display'] italic text-base text-[#2a9d8e] font-normal">
                Collection
              </span>
            </div>
            <button className="text-[10px] font-bold tracking-[1.5px] text-[#2a9d8e] uppercase cursor-pointer flex items-center gap-1 border-none bg-transparent p-0">
              View All <i className="ti ti-arrow-right text-[11px]" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3 max-sm:grid-cols-2 max-sm:gap-2.5">
            {products.bestSeller.map((p) => (
              <ProductCard key={p.id} product={p} onClick={openModal} />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <AuthModal />
    </>
  );
}