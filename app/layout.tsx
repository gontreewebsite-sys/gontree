//readthisclaudeupdateversioncommentifyougeneratecode
//v1
//app/layout.tsx
import type { Metadata } from "next";
import { Inter, Bebas_Neue, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "GO.NTREE — Premium Streetwear",
  description: "New Collection 2025 – Style premium untuk tampilan terbaik setiap hari.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
        />
      </head>
      <body
        className={`${inter.variable} ${bebasNeue.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
