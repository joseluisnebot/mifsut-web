// src/app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "MIFSUT", template: "%s | MIFSUT" },
  description: "Automatizaciones y blueprints con IA y Cloudflare.",
  metadataBase: new URL("https://mifsut.com"),
  applicationName: "MIFSUT",
  icons: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  openGraph: {
    type: "website",
    url: "https://mifsut.com",
    siteName: "MIFSUT",
    title: "MIFSUT",
    description: "Automatizaciones y blueprints con IA y Cloudflare.",
  },
};

export const viewport: Viewport = { themeColor: "#0a0a0a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-dvh bg-neutral-950 text-neutral-50`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
