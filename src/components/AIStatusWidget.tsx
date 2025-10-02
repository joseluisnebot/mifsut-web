// src/components/AIStatusWidget.tsx
"use client";

import { useEffect, useState } from "react";

type StatusIndicator = "none" | "minor" | "major" | "critical" | "maintenance";
type ProviderItem = {
  provider: string;
  indicator: StatusIndicator;
  description: string;
  updated_at: string;
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

export default function AIStatusWidget() {
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const es = new EventSource("/api/ai-status");
    es.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data) as Snapshot;
        setSnap(data);
      } catch {
        /* keepalive u otros mensajes: ignorar */
      }
    };
    es.onerror = () => setErr("Conexión con el stream perdida. Reintentando…");
    return () => es.close();
  }, []);

  if (err) return <p className="text-red-400">{err}</p>;
  if (!snap) return <p className="opacity-70">Cargando estado IA…</p>;

  return (
    <div className="space-y-2">
      <ul className="flex flex-wrap items-center justify-center gap-3">
        {snap.providers.map((p) => (
          <li key={p.provider} className="flex items-center gap-2">
            <span
              className={`inline-block h-2.5 w-2.5 rounded-full ${dotClass(p.indicator)}`}
              title={p.description}
              aria-label={p.indicator}
            />
            <span className="capitalize">{p.provider}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs opacity-60 text-center">
        Últ. actualización: {new Date(snap.at).toLocaleTimeString()}
      </p>
    </div>
  );
}
