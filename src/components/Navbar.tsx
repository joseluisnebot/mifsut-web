"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl bg-[#0f0f12]/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-lg tracking-tight gradient-text">MIFSUT</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm text-neutral-400">
          <Link href="/blueprints" className="hover:text-white transition">Proyectos</Link>
          <Link href="/live" className="hover:text-white transition">Estado IA</Link>
          <Link href="/sobre-mi" className="hover:text-white transition">Sobre mí</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/colaboracion"
            className="text-sm px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition"
          >
            Colaborar →
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 text-neutral-400" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#0f0f12] px-6 py-4 flex flex-col gap-4 text-sm">
          <Link href="/blueprints" onClick={() => setOpen(false)} className="text-neutral-300 hover:text-white">Proyectos</Link>
          <Link href="/live" onClick={() => setOpen(false)} className="text-neutral-300 hover:text-white">Estado IA</Link>
          <Link href="/sobre-mi" onClick={() => setOpen(false)} className="text-neutral-300 hover:text-white">Sobre mí</Link>
          <Link href="/colaboracion" onClick={() => setOpen(false)} className="mt-2 text-center px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium">
            Colaborar →
          </Link>
        </div>
      )}
    </header>
  );
}
