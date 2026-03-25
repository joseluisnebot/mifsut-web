import type { Metadata } from "next";
import Link from "next/link";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "tresycuarto.com — Plataforma de ocio con agentes IA | MIFSUT",
  description:
    "Caso de uso real: plataforma de tardeo en España gestionada por agentes IA. 63 ciudades, 10.000+ locales, Reels automáticos, newsletter diaria personalizada. Stack: Next.js 15 + Cloudflare + Python + Google Places + edge-tts.",
};

const STACK = [
  { name: "Next.js 15.5 + TypeScript", role: "Frontend & SSG" },
  { name: "Cloudflare Pages", role: "Hosting (coste cero)" },
  { name: "Cloudflare D1", role: "Base de datos SQLite edge" },
  { name: "Cloudflare R2", role: "Almacenamiento de media" },
  { name: "Google Places API (New)", role: "Fotos, ratings, horarios y precio de locales" },
  { name: "OpenStreetMap (Overpass API)", role: "Base de locales: bares, cafés, terrazas" },
  { name: "Python 3 + Pillow + ffmpeg", role: "Generación de vídeos Reels 1080×1920" },
  { name: "edge-tts (Microsoft Neural)", role: "Voz en off para vídeos (es-ES-XimenaNeural)" },
  { name: "Ollama (local) + llama3.2:3b", role: "Validación y filtrado de contenido sin coste" },
  { name: "Brevo", role: "Email transaccional (newsletter diaria)" },
  { name: "Listmonk", role: "Gestión de suscriptores autohospedada" },
  { name: "Instagram Graph API", role: "Publicación automática de Reels" },
];

const AGENTS = [
  {
    name: "scraper_eventos.py",
    desc: "Extrae eventos de portales turísticos oficiales españoles 2 veces al día. Geocodifica coordenadas con Nominatim (OSM) y almacena en D1.",
    model: "Nominatim OSM (geocoding)",
    cron: "03:00 y 15:00 diario",
  },
  {
    name: "enriquecer_ratings.py",
    desc: "Enriquece cada local con Google Places API: foto real, rating, nº reseñas, nivel de precios y horario. Procesa hasta 500 locales/día (dentro del crédito gratuito de $200/mes). Prioriza ciudades de Semana Santa.",
    model: "Google Places API (New)",
    cron: "04:00 diario",
  },
  {
    name: "generar_reels_eventos.py",
    desc: "Genera Reels de eventos próximos en formato 1080×1920. Narra el evento con voz neural, localiza los 5 bares más cercanos con fotos reales y fondo de color aleatorio. Sube a R2 y encola en Instagram automáticamente.",
    model: "edge-tts XimenaNeural + Google Places (fotos)",
    cron: "13:30 diario",
  },
  {
    name: "generar_reels_evergreen.py",
    desc: "Genera Reels 'Top 5 X en Ciudad' (bares, cafés, terrazas) con fotos reales de Google Places y voz neural. Sube a Cloudflare R2 y encola para publicación en Instagram.",
    model: "edge-tts XimenaNeural + Google Places (fotos)",
    cron: "Bajo demanda / semanal",
  },
  {
    name: "instagram_publisher.py",
    desc: "Publica Reels en @somos.tresycuarto vía Instagram Graph API. Lee una cola dinámica (eventos y evergreens) más una cola estática de Semana Santa. Máximo 2 publicaciones/día.",
    model: "Instagram Graph API v19",
    cron: "10:00 y 18:00 diario",
  },
  {
    name: "enviar_newsletter.py",
    desc: "Envía un email diario personalizado a cada suscriptor con hasta 5 eventos de sus ciudades. Solo envía cuando hay eventos programados para ese día. Diseño responsive en paleta crema tresycuarto.",
    model: "Brevo REST API",
    cron: "15:15 diario",
  },
];

const METRICS = [
  { label: "Locales en base de datos", value: "10.000+" },
  { label: "Ciudades cubiertas", value: "63" },
  { label: "Vídeos Semana Santa 2026", value: "22" },
  { label: "Reels publicados (Instagram)", value: "14+" },
  { label: "Coste infraestructura / mes", value: "~0 €" },
  { label: "Horas de gestión manual", value: "0" },
];

const SOURCES = [
  "andalucia.org", "agendaunica.cordoba.es", "jerez.es",
  "turismocastillayleon.com", "turismoregiondemurcia.es",
  "comunitatvalenciana.com", "visitvalencia.com",
  "datos.madrid.es (JSON API)", "spain.info",
  "OpenStreetMap Overpass API", "Google Places API",
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
          <span className="text-xs text-neutral-500">Caso de uso real · En producción</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text mb-3">
          tresycuarto.com
        </h1>
        <p className="text-neutral-400 leading-relaxed">
          Plataforma de tardeo y ocio de media tarde en España. Gestionada íntegramente por
          agentes IA: sin redacción manual, sin community manager, con coste operativo cero.
          63 ciudades, 10.000+ locales enriquecidos con Google Places y Reels publicados
          automáticamente cada día en Instagram.
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
          <Link
            href="https://instagram.com/somos.tresycuarto"
            target="_blank"
            className="rounded-xl px-4 py-2 text-sm font-semibold border border-white/10 hover:border-indigo-500/30 transition"
          >
            @somos.tresycuarto
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
          La solución: una cadena de agentes IA que descubren eventos, enriquecen locales con
          datos reales de Google, generan contenido audiovisual con voz neural y gestionan
          la comunicación con la audiencia — todo de forma autónoma, corriendo en infraestructura propia.
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
              <p className="text-xs text-neutral-600">Tecnología: {a.model}</p>
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
            "Scraper visita portales turísticos oficiales 2x/día → eventos insertados en Cloudflare D1",
            "Geocodificador Nominatim (OSM) asigna coordenadas lat/lon a cada evento",
            "Ollama (llama3.2:3b, local) valida y filtra descripciones de baja calidad sin coste de API",
            "Enriquecedor Google Places obtiene foto real, rating, precio y horario de 500 locales/día",
            "Generador de Reels crea vídeo 1080×1920 con voz neural, fotos reales y paleta aleatoria",
            "Vídeo sube a Cloudflare R2 y se encola automáticamente en instagram_queue.json",
            "Publisher publica 2 Reels/día en @somos.tresycuarto vía Instagram Graph API",
            "Newsletter diaria a las 15:15 envía hasta 5 eventos personalizados por ciudad a cada suscriptor",
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
