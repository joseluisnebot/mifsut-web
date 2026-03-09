import "./globals.css";
import type { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "MIFSUT — Automatización empresarial con IA", template: "%s | MIFSUT" },
  description: "Blueprints, agentes y infraestructura cloud para automatizar operaciones empresariales con IA. Construido sobre n8n, Cloudflare y modelos de lenguaje de última generación.",
  metadataBase: new URL("https://mifsut.com"),
  applicationName: "MIFSUT",
  keywords: ["automatización empresarial", "IA", "n8n", "Cloudflare", "blueprints", "agentes IA", "infraestructura cloud"],
  authors: [{ name: "MIFSUT" }],
  icons: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  openGraph: {
    type: "website",
    url: "https://mifsut.com",
    siteName: "MIFSUT",
    title: "MIFSUT — Automatización empresarial con IA",
    description: "Blueprints, agentes y infraestructura cloud para automatizar operaciones empresariales con IA.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MIFSUT — Automatización empresarial con IA",
    description: "Blueprints, agentes y infraestructura cloud para automatizar operaciones con IA.",
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
