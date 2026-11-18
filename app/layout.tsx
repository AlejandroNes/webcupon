import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Premiazo | Promociones, Premios y Sorteos",
  description:
    "Descubre increíbles premios, participa y vive la emoción de ganar con Premiazo.",
};

export const viewport: Viewport = {
  themeColor: "#3E1799",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${outfit.variable} h-full antialiased`} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-full bg-[#F8F7FC] text-[#171126] flex flex-col selection:bg-[#6C3AE8]/20 selection:text-[#5424BD]"
      >
        {children}
      </body>
    </html>
  );
}
