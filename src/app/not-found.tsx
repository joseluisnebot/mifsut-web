// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-dvh grid place-items-center p-8 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Página no encontrada</h1>
        <p className="opacity-80">La ruta que buscas no existe o cambió.</p>
        <Link href="/" className="inline-block rounded-2xl px-6 py-3 border border-white/15 hover:border-white/40 transition">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
