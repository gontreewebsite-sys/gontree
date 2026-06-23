# GO.NTREE — Next.js + TypeScript + Tailwind CSS

## Stack
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v3**
- **Tabler Icons** (via CDN webfont)
- **Google Fonts**: Inter, Bebas Neue, Playfair Display

## Struktur Folder
```
gontree/
├── app/
│   ├── layout.tsx        # Root layout (fonts, metadata, icons CDN)
│   ├── globals.css       # Global styles + animasi modal
│   └── page.tsx          # Halaman utama (Home)
├── components/
│   ├── Navbar.tsx        # Navbar sticky + mobile hamburger
│   ├── Hero.tsx          # Hero banner dengan badge diskon
│   ├── Categories.tsx    # Scroll kategori horizontal
│   ├── ProductCard.tsx   # Card produk + badge diskon
│   ├── CollectionBanner.tsx  # Banner best seller
│   ├── ProductModal.tsx  # Modal detail produk (bottom sheet)
│   ├── BottomNav.tsx     # Bottom navigation mobile
│   └── GontreeLogo.tsx   # SVG Logo
├── data/
│   └── products.ts       # Data produk (New Arrival & Best Seller)
├── types/
│   └── index.ts          # TypeScript interfaces
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── package.json
```

## Cara Menjalankan

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build production
npm run build
npm start
```

Buka [http://localhost:3000](http://localhost:3000)

## Fitur
- ✅ Announcement bar
- ✅ Navbar sticky + mobile hamburger menu
- ✅ Hero section dengan badge diskon
- ✅ Scroll kategori horizontal
- ✅ Grid produk New Arrival & Best Seller
- ✅ Modal detail produk (bottom sheet) dengan:
  - Galeri foto / thumbnail
  - Pilihan warna & ukuran
  - Quantity counter
  - Tombol Keranjang & Beli Sekarang
  - Spesifikasi produk
- ✅ Bottom navigation mobile dengan badge notifikasi
- ✅ Fully responsive (mobile-first)
- ✅ TypeScript strict mode
- ✅ Animasi modal fade + slide up
# gontree
