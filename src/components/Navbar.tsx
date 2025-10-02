// src/components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="font-semibold tracking-tight">MIFSUT</Link>
        <nav className="flex gap-5 text-sm opacity-90">
          <Link href="/blueprints" className="hover:opacity-100 transition">Blueprints</Link>
          <Link href="/live" className="hover:opacity-100 transition">Live</Link>
          <a href="#contacto" className="hover:opacity-100 transition">Contacto</a>
        </nav>
      </div>
    </header>
  );
}
