// src/app/api/ai-status/route.ts
export const runtime = "edge";

type Provider =
  | "openai"
  | "anthropic"
  | "stability"
  | "huggingface"
  | "replicate";

type StatusIndicator = "none" | "minor" | "major" | "critical" | "maintenance";

type ProviderInfo = {
  name: Provider;
  base: string;      // dominio de la status page
  humanUrl: string;  // url para abrir en navegador
};

const PROVIDERS: ProviderInfo[] = [
  { name: "openai",      base: "https://status.openai.com",       humanUrl: "https://status.openai.com" },
  { name: "anthropic",   base: "https://status.anthropic.com",    humanUrl: "https://status.anthropic.com" },
  { name: "stability",   base: "https://status.stability.ai",     humanUrl: "https://status.stability.ai" },
  { name: "huggingface", base: "https://status.huggingface.co",   humanUrl: "https://status.huggingface.co" },
  { name: "replicate",   base: "https://status.replicate.com",    humanUrl: "https://status.replicate.com" },
];

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36";

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { accept: "application/json", "user-agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}

function mapComponentIndicator(components: Array<{ status?: string }>): StatusIndicator {
  let hasMajor = false;
  let hasMinor = false;
  let hasMaint = false;
  for (const c of components) {
    const s = (c.status ?? "").toLowerCase();
    if (s === "major_outage") hasMajor = true;
    else if (s === "partial_outage" || s === "degraded_performance") hasMinor = true;
    else if (s === "under_maintenance") hasMaint = true;
  }
  if (hasMajor) return "major";
  if (hasMinor) return "minor";
  if (hasMaint) return "maintenance";
  return "none";
}

async function getOne(p: ProviderInfo) {
  // 1) Intento principal: /summary.json
  try {
    const j = await fetchJSON<{
      status?: { indicator?: StatusIndicator; description?: string };
      page?: { updated_at?: string };
    }>(`${p.base}/api/v2/summary.json`);

    return {
      provider: p.name,
      indicator: (j.status?.indicator as StatusIndicator) ?? "none",
      description: j.status?.description ?? "OK",
      updated_at: j.page?.updated_at ?? new Date().toISOString(),
      human_url: p.humanUrl,
    };
  } catch {
    // 2) Fallback: /components.json (+ posibles incidentes sin resolver)
    try {
      const comps = await fetchJSON<{ components: Array<{ name?: string; status?: string }> }>(
        `${p.base}/api/v2/components.json`
      );
      let desc = "Todos operativos";
      const indicator = mapComponentIndicator(comps.components ?? []);

      if (indicator !== "none") {
        try {
          const inc = await fetchJSON<{ incidents: Array<{ name?: string }> }>(
            `${p.base}/api/v2/incidents/unresolved.json`
          );
          const names = (inc.incidents ?? []).map((i) => i.name).filter(Boolean).slice(0, 2);
          desc = names.length ? `Incidencias: ${names.join(" · ")}` : "Degradación parcial";
        } catch {
          desc = "Degradación parcial";
        }
      }

      return {
        provider: p.name,
        indicator,
        description: desc,
        updated_at: new Date().toISOString(),
        human_url: p.humanUrl,
      };
    } catch {
      // 3) Último recurso: no podemos consultar -> no alarmar en rojo
      return {
        provider: p.name,
        indicator: "minor" as StatusIndicator,
        description: "No disponible — abre la status page",
        updated_at: new Date().toISOString(),
        human_url: p.humanUrl,
      };
    }
  }
}

async function getSnapshot() {
  const results = await Promise.allSettled(PROVIDERS.map(getOne));
  return {
    at: new Date().toISOString(),
    providers: results.map((r, i) =>
      r.status === "fulfilled"
        ? r.value
        : {
            provider: PROVIDERS[i].name,
            indicator: "minor" as StatusIndicator,
            description: "No disponible — abre la status page",
            updated_at: new Date().toISOString(),
            human_url: PROVIDERS[i].humanUrl,
          }
    ),
  };
}

export async function GET() {
  const enc = new TextEncoder();
  let intervalId: ReturnType<typeof setInterval> | undefined;
  let keepAliveId: ReturnType<typeof setInterval> | undefined;

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: unknown) => controller.enqueue(enc.encode(`data: ${JSON.stringify(data)}\n\n`));

      try { send(await getSnapshot()); } catch {}

      intervalId = setInterval(async () => {
        try { send(await getSnapshot()); } catch {}
      }, 30_000);

      keepAliveId = setInterval(() => {
        controller.enqueue(enc.encode(`: keepalive\n\n`));
      }, 15_000);
    },
    cancel() {
      if (intervalId) clearInterval(intervalId);
      if (keepAliveId) clearInterval(keepAliveId);
    },
  });

  return new Response(stream, {
    headers: { "content-type": "text/event-stream; charset=utf-8", "cache-control": "no-store" },
  });
}
