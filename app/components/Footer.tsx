"use client";

import { useState } from "react";

type LegalKey = "syarat" | "privasi" | "pengembalian" | "tentang" | null;

function GontreeLogoSmall({ size = 22 }: { size?: number }) {
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

/* ============ KONTEN LEGAL ============ */
const legalContent: Record<
  Exclude<LegalKey, null>,
  { title: string; body: React.ReactNode }
> = {
  syarat: {
    title: "Syarat & Ketentuan",
    body: (
      <>
        <p className="text-[11px] text-gray-400 mb-5">Terakhir diperbarui: [isi tanggal]</p>

        <Section title="1. Tentang Layanan">
          GO.NTREE ("kami") adalah usaha perorangan/UMKM yang menjual produk fashion melalui
          website ini. Dengan mengakses dan melakukan transaksi di website ini, Anda dianggap
          telah membaca, memahami, dan menyetujui seluruh syarat &amp; ketentuan berikut.
        </Section>

        <Section title="2. Pemesanan">
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li>Pesanan dianggap sah setelah pembeli menyelesaikan proses checkout dan/atau pembayaran.</li>
            <li>Kami berhak membatalkan pesanan apabila stok tidak tersedia, dengan pemberitahuan kepada pembeli dan pengembalian dana penuh (untuk pembayaran non-COD).</li>
            <li>Pastikan data alamat dan nomor kontak yang diisi sudah benar. Kami tidak bertanggung jawab atas keterlambatan/kegagalan pengiriman akibat kesalahan data dari pembeli.</li>
          </ul>
        </Section>

        <Section title="3. Harga & Pembayaran">
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li>Seluruh harga tercantum dalam Rupiah (IDR) dan belum termasuk biaya pengiriman, kecuali disebutkan lain.</li>
            <li>Pembayaran online (QRIS, Virtual Account, e-wallet) diproses melalui payment gateway pihak ketiga (Midtrans). Kami tidak menyimpan data kartu/rekening pembeli.</li>
            <li>Untuk pembayaran COD, pembeli wajib membayar tunai kepada kurir saat barang diterima.</li>
            <li>Pesanan dengan status pembayaran "pending" lebih dari 24 jam dapat dibatalkan otomatis.</li>
          </ul>
        </Section>

        <Section title="4. Pengiriman">
          Estimasi waktu pengiriman bersifat perkiraan dan dapat berubah karena faktor di luar
          kendali kami (cuaca, kendala kurir, force majeure).
        </Section>

        <Section title="5. Pengembalian & Pembatalan">
          Ketentuan retur, tukar ukuran, dan refund dijelaskan pada bagian{" "}
          <span className="text-[#2a9d8e] font-semibold">Pengembalian &amp; Refund</span> di footer.
        </Section>

        <Section title="6. Hak Kekayaan Intelektual">
          Seluruh konten di website ini (logo, foto produk, teks, desain) adalah milik
          GO.NTREE dan tidak boleh digunakan ulang tanpa izin tertulis.
        </Section>

        <Section title="7. Perubahan Ketentuan">
          Kami dapat memperbarui Syarat &amp; Ketentuan ini sewaktu-waktu. Perubahan berlaku
          sejak dipublikasikan di halaman ini.
        </Section>

        <Section title="8. Kontak">
          Pertanyaan terkait syarat &amp; ketentuan dapat disampaikan melalui WhatsApp atau
          email yang tercantum di footer.
        </Section>
      </>
    ),
  },
  privasi: {
    title: "Kebijakan Privasi",
    body: (
      <>
        <p className="text-[11px] text-gray-400 mb-5">Terakhir diperbarui: [isi tanggal]</p>

        <p className="mb-4">
          GO.NTREE menghargai privasi setiap pengguna website ini. Kebijakan ini menjelaskan
          data apa yang kami kumpulkan, bagaimana digunakan, dan bagaimana kami melindunginya.
        </p>

        <Section title="1. Data yang Kami Kumpulkan">
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li>Nama, nomor telepon, dan alamat — diperlukan untuk proses pengiriman pesanan.</li>
            <li>Alamat email — untuk konfirmasi akun dan notifikasi pesanan.</li>
            <li>Riwayat transaksi/pesanan di website ini.</li>
            <li>Data teknis dasar (jenis perangkat, browser) untuk keperluan keamanan dan perbaikan layanan.</li>
          </ul>
        </Section>

        <Section title="2. Penggunaan Data">
          Data yang dikumpulkan digunakan untuk memproses &amp; mengirim pesanan, menghubungi
          pembeli terkait status pesanan, dan meningkatkan kualitas layanan. Kami tidak menjual
          atau menyewakan data pribadi pengguna kepada pihak ketiga untuk tujuan pemasaran.
        </Section>

        <Section title="3. Pembagian Data dengan Pihak Ketiga">
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li><span className="font-semibold">Midtrans</span> — sebagai penyedia payment gateway, untuk memproses transaksi pembayaran online secara aman.</li>
            <li><span className="font-semibold">Jasa pengiriman/kurir</span> — untuk keperluan pengantaran barang.</li>
          </ul>
          <p className="mt-2">
            Kami tidak menyimpan data kartu kredit/debit atau rekening bank pembeli — seluruh
            proses pembayaran online ditangani langsung oleh Midtrans sesuai standar keamanan PCI-DSS.
          </p>
        </Section>

        <Section title="4. Keamanan Data">
          Kami menerapkan langkah teknis dan organisasi yang wajar untuk melindungi data
          pengguna dari akses tidak sah, kehilangan, atau penyalahgunaan.
        </Section>

        <Section title="5. Hak Pengguna">
          Pengguna dapat meminta akses, koreksi, atau penghapusan data pribadinya dengan
          menghubungi kami melalui kontak yang tercantum di footer.
        </Section>

        <Section title="6. Perubahan Kebijakan">
          Kebijakan privasi ini dapat diperbarui sewaktu-waktu. Perubahan akan dipublikasikan
          di halaman ini.
        </Section>
      </>
    ),
  },
  pengembalian: {
    title: "Pengembalian & Refund",
    body: (
      <>
        <p className="text-[11px] text-gray-400 mb-5">Terakhir diperbarui: [isi tanggal]</p>

        <Section title="1. Kondisi yang Bisa Diretur/Ditukar">
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li>Barang yang diterima salah ukuran/warna dari yang dipesan (kesalahan dari kami).</li>
            <li>Barang cacat produksi (jahitan lepas, sablon rusak, dll) saat pertama diterima.</li>
            <li>Barang yang dikirim tidak sesuai dengan pesanan.</li>
          </ul>
        </Section>

        <Section title="2. Kondisi yang Tidak Bisa Diretur">
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li>Barang sudah dipakai, dicuci, atau label sudah dilepas.</li>
            <li>Kesalahan ukuran dari pembeli sendiri (disarankan cek panduan ukuran sebelum order).</li>
            <li>Komplain diajukan lebih dari 3 hari setelah barang diterima.</li>
          </ul>
        </Section>

        <Section title="3. Cara Mengajukan Retur">
          <ol className="list-decimal pl-5 flex flex-col gap-1">
            <li>Hubungi kami via WhatsApp dalam waktu maksimal 3x24 jam sejak barang diterima.</li>
            <li>Sertakan nomor pesanan, foto/video produk yang bermasalah, dan keterangan kendala.</li>
            <li>Tim kami akan memverifikasi dan memberikan instruksi pengiriman balik (jika disetujui).</li>
            <li>Biaya pengiriman retur akibat kesalahan/cacat dari kami akan kami tanggung.</li>
          </ol>
        </Section>

        <Section title="4. Proses Refund">
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li>Refund untuk pembayaran online (QRIS/VA/e-wallet via Midtrans) diproses ke metode pembayaran asal, estimasi 3-7 hari kerja setelah retur disetujui dan barang diterima kembali oleh kami.</li>
            <li>Refund untuk COD dilakukan melalui transfer bank sesuai data yang diberikan pembeli.</li>
            <li>Sebagai alternatif refund, pembeli dapat memilih penukaran produk (jika stok tersedia).</li>
          </ul>
        </Section>

        <Section title="5. Pembatalan Pesanan">
          Pembatalan dapat dilakukan sebelum pesanan diproses/dikirim. Untuk pembayaran yang
          sudah masuk, dana akan dikembalikan penuh sesuai metode pembayaran yang digunakan.
        </Section>

        <Section title="6. Kontak Komplain">
          Seluruh proses retur/refund ditangani melalui WhatsApp/email yang tercantum di footer.
        </Section>
      </>
    ),
  },
  tentang: {
    title: "Tentang GO.NTREE",
    body: (
      <>
        <p className="mb-4">
          GO.NTREE adalah brand fashion lokal yang berbasis di Ngawen, Kabupaten Blora, Jawa
          Tengah. Kami memulai usaha ini dengan tujuan sederhana: membuat pakaian berkualitas
          dengan harga yang wajar, dikerjakan dan dikirim langsung oleh tim kecil kami sendiri.
        </p>
        <p className="mb-4">
          Setiap produk yang kami jual diperiksa satu per satu sebelum dikemas — mulai dari
          jahitan, ukuran, hingga kebersihan bahan — supaya setiap pembeli menerima barang
          dengan kondisi terbaik.
        </p>
        <p className="mb-4">
          Sebagai usaha yang baru berjalan, kami sangat terbuka terhadap masukan dan komplain.
          Setiap pesan yang masuk via WhatsApp akan kami balas langsung, bukan melalui sistem
          otomatis.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mt-2">
          <div className="text-[10px] font-bold tracking-[1.5px] text-gray-400 uppercase mb-2">
            Informasi Usaha
          </div>
          <ul className="flex flex-col gap-1.5 text-[12px]">
            <li><span className="text-gray-400">Nama Usaha:</span> GO.NTREE</li>
            <li><span className="text-gray-400">Bentuk Usaha:</span> Perorangan / UMKM</li>
            <li><span className="text-gray-400">Lokasi:</span> Ngawen, Kab. Blora, Jawa Tengah</li>
            <li><span className="text-gray-400">Kontak:</span> lihat footer</li>
          </ul>
        </div>
      </>
    ),
  },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h2 className="font-bold text-gray-900 text-[13px] mb-1.5">{title}</h2>
      <div className="text-[12.5px] text-gray-600 leading-relaxed">{children}</div>
    </div>
  );
}

function LegalModal({ activeKey, onClose }: { activeKey: LegalKey; onClose: () => void }) {
  if (!activeKey) return null;
  const content = legalContent[activeKey];

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[270] flex items-end justify-center animate-fade-in backdrop-blur-[2px]"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white w-full max-w-[560px] max-h-[88vh] flex flex-col overflow-hidden rounded-t-xl">
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <span className="font-['Bebas_Neue'] text-[16px] tracking-[0.5px] text-gray-900">
            {content.title}
          </span>
          <button
            onClick={onClose}
            className="bg-gray-50 border border-gray-200 rounded-full w-8 h-8 cursor-pointer flex items-center justify-center text-gray-500 hover:border-gray-300 transition-colors"
          >
            <i className="ti ti-x text-[15px]" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 text-[13px] text-gray-700">{content.body}</div>
      </div>
    </div>
  );
}

/* ============ FOOTER ============ */
export function Footer() {
  const [activeLegal, setActiveLegal] = useState<LegalKey>(null);
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="bg-[#071a18] text-gray-300 pt-10 pb-6 px-6 max-sm:px-4">
        <div className="max-w-[1100px] mx-auto">
          {/* Top grid */}
          <div className="grid grid-cols-4 gap-8 max-sm:grid-cols-1 max-sm:gap-7 pb-8 border-b border-white/10">
            {/* Brand */}
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <GontreeLogoSmall />
                <span className="font-['Bebas_Neue'] text-[17px] text-white tracking-wider">
                  GO.NTREE
                </span>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed mb-3">
                Brand fashion lokal asal Ngawen, Blora, Jawa Tengah. Setiap produk diproses dan
                dikemas langsung oleh tim kami.
              </p>
              <div className="flex items-center gap-2.5">
                <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#2a9d8e] hover:text-[#2a9d8e] transition-colors">
                  <i className="ti ti-brand-instagram text-[15px]" />
                </a>
                <a href="#" aria-label="TikTok" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#2a9d8e] hover:text-[#2a9d8e] transition-colors">
                  <i className="ti ti-brand-tiktok text-[15px]" />
                </a>
                <a href="#" aria-label="WhatsApp" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#2a9d8e] hover:text-[#2a9d8e] transition-colors">
                  <i className="ti ti-brand-whatsapp text-[15px]" />
                </a>
              </div>
            </div>

            {/* Kontak */}
            <div>
              <div className="text-[10px] font-bold tracking-[1.5px] text-white uppercase mb-3">
                Kontak Kami
              </div>
              <ul className="flex flex-col gap-2.5 text-[11px] text-gray-400">
                <li className="flex items-start gap-2">
                  <i className="ti ti-map-pin text-[14px] text-[#2a9d8e] mt-0.5 flex-shrink-0" />
                  <span>Ngawen, Kab. Blora, Jawa Tengah, Indonesia</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="ti ti-brand-whatsapp text-[14px] text-[#2a9d8e] flex-shrink-0" />
                  <a href="https://wa.me/6280000000000" className="hover:text-[#2a9d8e] transition-colors">
                    +62 8xx-xxxx-xxxx
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <i className="ti ti-mail text-[14px] text-[#2a9d8e] flex-shrink-0" />
                  <a href="mailto:halo@gontree.id" className="hover:text-[#2a9d8e] transition-colors">
                    halo@gontree.id
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <i className="ti ti-clock text-[14px] text-[#2a9d8e] flex-shrink-0" />
                  <span>Senin–Sabtu, 09.00–17.00 WIB</span>
                </li>
              </ul>
            </div>

            {/* Bantuan */}
            <div>
              <div className="text-[10px] font-bold tracking-[1.5px] text-white uppercase mb-3">
                Bantuan
              </div>
              <ul className="flex flex-col gap-2.5 text-[11px] text-gray-400">
                <li>
                  <button onClick={() => setActiveLegal("tentang")} className="hover:text-[#2a9d8e] transition-colors bg-transparent border-none cursor-pointer p-0 text-left">
                    Tentang Kami
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveLegal("pengembalian")} className="hover:text-[#2a9d8e] transition-colors bg-transparent border-none cursor-pointer p-0 text-left">
                    Pengembalian &amp; Refund
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <div className="text-[10px] font-bold tracking-[1.5px] text-white uppercase mb-3">
                Legal
              </div>
              <ul className="flex flex-col gap-2.5 text-[11px] text-gray-400">
                <li>
                  <button onClick={() => setActiveLegal("syarat")} className="hover:text-[#2a9d8e] transition-colors bg-transparent border-none cursor-pointer p-0 text-left">
                    Syarat &amp; Ketentuan
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveLegal("privasi")} className="hover:text-[#2a9d8e] transition-colors bg-transparent border-none cursor-pointer p-0 text-left">
                    Kebijakan Privasi
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Payment methods */}
          <div className="py-6 border-b border-white/10">
            <div className="text-[10px] font-bold tracking-[1.5px] text-white uppercase mb-3">
              Metode Pembayaran
            </div>
            <div className="flex items-center gap-2.5 flex-wrap">
              {["QRIS", "GoPay", "ShopeePay", "BCA VA", "BNI VA", "Mandiri VA", "COD"].map((m) => (
                <span
                  key={m}
                  className="text-[10px] font-semibold text-gray-300 bg-white/5 border border-white/10 rounded px-2.5 py-1.5"
                >
                  {m}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-gray-500 mt-3 flex items-center gap-1.5">
              <i className="ti ti-shield-lock text-[13px] text-[#2a9d8e]" />
              Pembayaran online diproses aman melalui Midtrans Payment Gateway.
            </p>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between pt-5 flex-wrap gap-2 max-sm:flex-col max-sm:items-start">
            <span className="text-[10px] text-gray-500">
              © {year} GO.NTREE. Seluruh hak cipta dilindungi.
            </span>
            <span className="text-[10px] text-gray-500">
              Dikelola oleh perorangan/UMKM — bukan badan hukum resmi.
            </span>
          </div>
        </div>
      </footer>

      <LegalModal activeKey={activeLegal} onClose={() => setActiveLegal(null)} />
    </>
  );
}