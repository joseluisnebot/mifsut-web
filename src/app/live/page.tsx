// src/app/live/page.tsx
import AIStatusClient from "@/components/AIStatusClient";

export const runtime = "edge";

export default function LivePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
        Estado de proveedores IA
      </h1>
      <p className="opacity-80 mb-6">
        Datos en tiempo (casi) real vía Server-Sent Events (SSE). Actualiza cada 30 s.
      </p>
      <div className="rounded-2xl border border-white/10 p-5">
        <AIStatusClient />
      </div>
    </main>
  );
}
