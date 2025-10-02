// src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm opacity-70 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} MIFSUT. Todos los derechos reservados.</p>
        <div className="flex gap-4">
          <Link href="/sitemap.xml">Sitemap</Link>
          <Link href="/robots.txt">robots.txt</Link>
        </div>
      </div>
    </footer>
  );
}
