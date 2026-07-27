import "./globals.css";
import type { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "MIFSUT — Jose Luis Nebot · Proyectos de IA, IoT y automatización", template: "%s | MIFSUT" },
  description: "Portfolio de Jose Luis Nebot: plataformas web con IA, sistemas IoT con ESP32, automatización con Python y Cloudflare. Proyectos reales en producción.",
  metadataBase: new URL("https://mifsut.com"),
  applicationName: "MIFSUT",
  keywords: ["IA", "IoT", "ESP32", "Next.js", "Cloudflare", "automatización", "Python", "portfolio"],
  authors: [{ name: "Jose Luis Nebot" }],
  icons: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  openGraph: {
    type: "website",
    url: "https://mifsut.com",
    siteName: "MIFSUT",
    title: "MIFSUT — Jose Luis Nebot · Proyectos de IA, IoT y automatización",
    description: "Portfolio de Jose Luis Nebot: plataformas web con IA, sistemas IoT con ESP32, automatización con Python y Cloudflare.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MIFSUT — Jose Luis Nebot · Proyectos de IA, IoT y automatización",
    description: "Portfolio de proyectos reales: IA, IoT, ESP32, Cloudflare, Python.",
  },
};

export const viewport: Viewport = { themeColor: "#0f0f12" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-dvh bg-[#0f0f12] text-neutral-50 antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
