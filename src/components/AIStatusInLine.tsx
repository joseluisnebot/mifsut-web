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

export default function AIStatusInline() {
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const es = new EventSource("/api/ai-status");
    es.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data) as Snapshot;
        setSnap(data);
      } catch { /* ignore keepalive */ }
    };
    es.onerror = () => setErr("Conexión perdida. Reintentando…");
    return () => es.close();
  }, []);

  if (err) return <p className="text-red-400 text-center">{err}</p>;
  if (!snap) return <p className="opacity-70 text-center">Cargando estado IA…</p>;

  return (
    <div className="text-center opacity-80">
      <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
        {snap.providers.map((p) => (
          <li key={p.provider} className="flex items-center gap-2">
            <span
              className={`inline-block h-2 w-2 rounded-full ${dotClass(p.indicator)}`}
              title={p.description}
              aria-label={p.indicator}
            />
            <a
              href={p.human_url}
              target="_blank"
              rel="noreferrer"
              className="capitalize hover:underline underline-offset-4"
              title={p.description}
            >
              {p.provider}
            </a>
          </li>
        ))}
      </ul>
      <p className="text-xs opacity-60 mt-1">
        Actualizado: {new Date(snap.at).toLocaleTimeString()}
      </p>
    </div>
  );
}
