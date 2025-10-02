"use client";
import { useEffect, useState } from "react";

type StatusIndicator = "none" | "minor" | "major" | "critical" | "maintenance";
type ProviderItem = {
  provider: string;
  indicator: StatusIndicator;
  description: string;
  updated_at: string;
  human_url: string;
};
type Snapshot = { at: string; providers: ProviderItem[] };

function dotClass(ind: StatusIndicator) {
  switch (ind) {
    case "none": return "bg-green-500";
    case "minor": return "bg-yellow-400";
    case "maintenance": return "bg-blue-400";
    case "major": return "bg-orange-500";
    case "critical": return "bg-red-500";
    default: return "bg-neutral-500";
  }
}

export default function AIStatusClient() {
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const es = new EventSource("/api/ai-status");
    es.onmessage = (ev) => {
      try {
        setSnap(JSON.parse(ev.data) as Snapshot);
      } catch { /* ignore keepalive */ }
    };
    es.onerror = () => setErr("Conexión con el stream perdida. Reintentando…");
    return () => es.close();
  }, []);

  if (err) return <p className="text-red-400">{err}</p>;
  if (!snap) return <p className="opacity-70">Cargando estado de proveedores…</p>;

  return (
    <div className="space-y-3">
      <p className="text-sm opacity-60">Actualizado: {new Date(snap.at).toLocaleString()}</p>
      <ul className="grid gap-3 md:grid-cols-3">
        {snap.providers.map((p) => (
          <li key={p.provider} className="rounded-2xl border border-white/10 p-4">
            <div className="flex items-center gap-2">
              <span className={`inline-block h-2.5 w-2.5 rounded-full ${dotClass(p.indicator)}`} />
              <a
                href={p.human_url}
                target="_blank"
                rel="noreferrer"
                className="font-semibold capitalize hover:underline underline-offset-4"
                title={p.description}
              >
                {p.provider}
              </a>
            </div>
            <p className="mt-2 opacity-80 text-sm">{p.description}</p>
            <p className="mt-1 opacity-60 text-xs">Últ. actualización: {new Date(p.updated_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
      <p className="opacity-60 text-xs">Fuente: status pages públicas de cada proveedor.</p>
    </div>
  );
}
