import type { Metadata } from "next";
import Link from "next/link";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "tresycuarto.com — Plataforma de ocio con agentes IA | MIFSUT",
  description:
    "Caso de uso real: plataforma de tardeo en España gestionada por agentes IA. Scraping semanal de eventos, generación automática de vídeos TikTok/Reels y newsletter. Stack: Next.js 15 + Cloudflare + Python + Ollama.",
};

const STACK = [
  { name: "Next.js 15.5 + TypeScript", role: "Frontend & SSG" },
  { name: "Cloudflare Pages", role: "Hosting (coste cero)" },
  { name: "Cloudflare D1", role: "Base de datos SQLite edge" },
  { name: "Cloudflare R2", role: "Almacenamiento de media" },
  { name: "Python 3 + Pillow + ffmpeg", role: "Generación de vídeos TikTok" },
  { name: "BeautifulSoup + requests", role: "Scraping de portales turísticos" },
  { name: "Ollama (local)", role: "Inferencia IA sin coste de API" },
  { name: "qwen2.5-coder:7b", role: "Extracción estructurada de eventos (JSON)" },
  { name: "mistral:7b", role: "Generación de descripciones y hashtags" },
  { name: "nomic-embed-text", role: "Embeddings para deduplicación semántica" },
  { name: "Listmonk", role: "Email marketing autohospedado" },
  { name: "n8n", role: "Orquestación de flujos y crons" },
];

const AGENTS = [
  {
    name: "scraper_eventos.py",
    desc: "Extrae eventos de 12 portales turísticos oficiales cada lunes a las 04:17h. Geocodifica con Nominatim (OSM), deduplica semánticamente con cosine similarity ≥ 0.92 y enriquece descripciones vacías.",
    model: "qwen2.5-coder:7b + mistral:7b + nomic-embed-text",
    cron: "Lunes 04:17h",
  },
  {
    name: "tiktok_generator.py",
    desc: "Genera vídeos MP4 1080×1920 (formato Reels/TikTok) para cada evento relevante. Incluye mapa OSM, paleta de color según tipo de evento, música royalty-free y hashtags generados por IA.",
    model: "mistral:7b (hashtags)",
    cron: "Manual / bajo demanda",
  },
  {
    name: "preview_newsletter.py",
    desc: "Genera una previsualización HTML de la newsletter semanal con los mejores eventos de cada ciudad. Mejora automáticamente las descripciones cortas antes del envío.",
    model: "mistral:7b (descripciones)",
    cron: "Previo al envío semanal",
  },
];

const METRICS = [
  { label: "Portales scrapeados", value: "12" },
  { label: "Eventos en DB (primer run)", value: "903" },
  { label: "Ciudades cubiertas", value: "20+" },
  { label: "Vídeos Semana Santa 2026", value: "22" },
  { label: "Coste infraestructura / mes", value: "~0 €" },
  { label: "Horas de gestión manual", value: "0" },
];

const SOURCES = [
  "andalucia.org", "agendaunica.cordoba.es", "jerez.es",
  "turismocastillayleon.com", "salamanca.es", "turismoregiondemurcia.es",
  "turismocastillalamancha.es", "toledo.es", "comunitatvalenciana.com",
  "visitvalencia.com", "datos.madrid.es (JSON API)", "spain.info",
];

export default function TresyCuartoPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10">

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs px-2.5 py-1 rounded-full border font-medium text-amber-400 bg-amber-500/10 border-amber-500/20">
            Proyecto
          </span>
          <span className="text-xs text-neutral-500">Caso de uso real</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text mb-3">
          tresycuarto.com
        </h1>
        <p className="text-neutral-400 leading-relaxed">
          Plataforma de tardeo y ocio de media tarde en España. Gestionada íntegramente por
          agentes IA: sin redacción manual, sin gestión de contenido, con coste operativo cero.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="https://tresycuarto.com"
            target="_blank"
            className="rounded-xl px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition"
          >
            Ver plataforma →
          </Link>
          <Link
            href="https://github.com/joseluisnebot/tresycuarto.com"
            target="_blank"
            className="rounded-xl px-4 py-2 text-sm font-semibold border border-white/10 hover:border-indigo-500/30 transition"
          >
            Código fuente
          </Link>
        </div>
      </header>

      {/* Métricas */}
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Resultados</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {METRICS.map((m) => (
            <div key={m.label} className="text-center">
              <p className="text-2xl font-bold gradient-text">{m.value}</p>
              <p className="text-xs text-neutral-500 mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Qué es */}
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">El reto</h2>
        <p className="text-neutral-400 leading-relaxed mb-3">
          Crear una plataforma de contenido sobre ocio local en España con <strong className="text-white">coste de operación cero</strong>:
          sin editores, sin community managers, sin agencias de contenido.
        </p>
        <p className="text-neutral-400 leading-relaxed">
          La solución: una cadena de agentes IA que descubren eventos, los enriquecen,
          generan contenido audiovisual y gestionan la comunicación con la audiencia —
          todo de forma autónoma, corriendo en infraestructura propia.
        </p>
      </section>

      {/* Agentes */}
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Agentes IA</h2>
        <div className="space-y-5">
          {AGENTS.map((a) => (
            <div key={a.name} className="border-l-2 border-indigo-500/30 pl-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <code className="text-sm font-mono text-indigo-300">{a.name}</code>
                <span className="text-xs text-neutral-600 shrink-0">{a.cron}</span>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed mb-1">{a.desc}</p>
              <p className="text-xs text-neutral-600">Modelo: {a.model}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Stack técnico</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              {STACK.map((s) => (
                <tr key={s.name} className="border-b border-white/5 last:border-0">
                  <td className="py-2.5 font-mono text-indigo-300 pr-4">{s.name}</td>
                  <td className="py-2.5 text-neutral-500">{s.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Fuentes de datos */}
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">Fuentes de datos integradas</h2>
        <div className="flex flex-wrap gap-2">
          {SOURCES.map((s) => (
            <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-neutral-400">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Pipeline */}
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Pipeline de automatización</h2>
        <ol className="space-y-3">
          {[
            "Cron lunes 04:17h → scraper arranca y visita 12 portales turísticos",
            "Ollama (qwen2.5-coder:7b) extrae eventos estructurados como JSON desde HTML",
            "Nominatim geocodifica cada evento (lat/lon gratis, sin API key)",
            "nomic-embed-text genera embeddings → cosine similarity elimina duplicados",
            "mistral:7b enriquece descripciones vacías o demasiado cortas",
            "Eventos insertados en Cloudflare D1 vía REST API",
            "tiktok_generator.py genera vídeo MP4 por evento: mapa OSM + música + hashtags IA",
            "preview_newsletter.py genera HTML para revisión antes del envío",
            "Listmonk envía la newsletter semanal a suscriptores",
          ].map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-neutral-400">
              <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs flex items-center justify-center font-bold">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.04] p-6">
        <h2 className="text-xl font-semibold mb-2">¿Quieres algo así para tu negocio?</h2>
        <p className="text-neutral-400 text-sm mb-4">
          Diseñamos y desplegamos tu plataforma de contenido automatizada: desde el scraping
          de datos hasta la publicación en redes sociales, sin intervención manual.
        </p>
        <a
          href="mailto:ventas@mifsut.com"
          className="inline-block rounded-xl px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition"
        >
          Hablemos →
        </a>
      </section>

    </main>
  );
}
