import type { Metadata } from "next";
import Link from "next/link";
import AIStatusInline from "@/components/AIStatusInLine";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "MIFSUT — Automatización empresarial con IA",
  description: "Blueprints de n8n, agentes IA y infraestructura Cloudflare para automatizar operaciones de empresa. Reduce costes operativos y escala sin contratar.",
};

const METRICS = [
  { value: "50+", label: "Blueprints publicados" },
  { value: "99.9%", label: "Uptime en edge global" },
  { value: "10×", label: "Reducción de tiempo operativo" },
  { value: "0→1", label: "De idea a producción en días" },
];

const SERVICES = [
  {
    icon: "⚡",
    title: "Blueprints de automatización",
    desc: "Workflows de n8n listos para instalar. Seguridad, notificaciones, scrapers, integraciones IA. Descarga e implanta en minutos.",
  },
  {
    icon: "🤖",
    title: "Agentes IA personalizados",
    desc: "Agentes que monitorizan, enriquecen datos, generan contenido y toman decisiones. Construidos sobre LLMs de última generación.",
  },
  {
    icon: "☁️",
    title: "Infraestructura Cloudflare",
    desc: "Workers, Pages, D1, R2. Stack serverless sin gestión de servidores. Deploy global en segundos desde tu repositorio.",
  },
  {
    icon: "🔒",
    title: "Seguridad y monitorización",
    desc: "SIEM con Wazuh, alertas CVSS, Zero Trust con Cloudflare Access. Seguridad empresarial sin equipo de seguridad dedicado.",
  },
  {
    icon: "📊",
    title: "Data pipelines",
    desc: "Extracción, enriquecimiento y carga de datos desde APIs, webs y sensores. Pipelines que se ejecutan solos.",
  },
  {
    icon: "🚀",
    title: "Consultoría de implantación",
    desc: "Te acompañamos desde el diseño hasta producción. Entregamos resultados medibles, no PowerPoints.",
  },
];

const USECASES = [
  { sector: "Seguridad TI", case: "Alertas de vulnerabilidades críticas en Telegram antes de que llegue el informe semanal." },
  { sector: "E-commerce", case: "Pipeline de enriquecimiento de catálogo con descripciones IA y categorización automática." },
  { sector: "Inmobiliario", case: "Scraper + agente que extrae, enriquece y publica fichas de locales con fotos e info de contacto." },
  { sector: "Marketing", case: "Automatización de campañas email con segmentación IA y envío en el momento óptimo." },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Glow de fondo */}
      <div className="hero-glow" />

      {/* HERO */}
      <section className="relative mx-auto max-w-6xl px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs text-indigo-300 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Plataforma de automatización empresarial con IA
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
          Automatiza tu empresa.<br />
          <span className="gradient-text">Escala con IA.</span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed">
          Blueprints de n8n, agentes inteligentes e infraestructura cloud que reducen
          tu carga operativa un 90% sin aumentar el equipo.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:ventas@mifsut.com"
            className="rounded-xl px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition shadow-lg shadow-indigo-500/20"
          >
            Hablar con ventas →
          </a>
          <Link
            href="/blueprints"
            className="rounded-xl px-7 py-3.5 border border-white/10 hover:border-indigo-500/40 text-neutral-300 hover:text-white font-medium text-base transition"
          >
            Explorar blueprints
          </Link>
        </div>

        <p className="mt-6 text-xs text-neutral-600">Sin contratos de permanencia · Soporte en español · Implantación en días</p>
      </section>

      {/* MÉTRICAS */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {METRICS.map((m) => (
            <div key={m.label}>
              <p className="text-4xl font-extrabold gradient-text">{m.value}</p>
              <p className="mt-1 text-sm text-neutral-500">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">Qué hacemos</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Todo lo que necesitas<br />para operar con IA
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Desde un blueprint listo en minutos hasta una implantación completa a medida.
            Sin burocracia, sin vendor lock-in.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.title} className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition group">
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-300 transition">{s.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CASOS DE USO */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">Casos de uso</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Resultados reales, no promesas
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {USECASES.map((u) => (
              <div key={u.sector} className="gradient-border rounded-2xl p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">{u.sector}</p>
                <p className="text-neutral-300 leading-relaxed">{u.case}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLUEPRINTS CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">Blueprints</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Empieza hoy, no en semanas
          </h2>
          <p className="text-neutral-400 max-w-lg mx-auto">
            Descarga un workflow, impórtalo en n8n y tenlo funcionando en tu entorno
            antes de comer.
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/blueprints"
            className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 font-medium transition"
          >
            Ver catálogo de blueprints →
          </Link>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl gradient-border p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">
            ¿Listo para automatizar<br />tu operación?
          </h2>
          <p className="text-neutral-400 max-w-lg mx-auto mb-8 text-lg">
            Cuéntanos qué proceso quieres automatizar.
            Te proponemos una solución en 48 horas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:ventas@mifsut.com"
              className="rounded-xl px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition shadow-lg shadow-indigo-500/20"
            >
              Hablar con un experto →
            </a>
            <a
              href="mailto:hola@mifsut.com"
              className="rounded-xl px-8 py-4 border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white font-medium transition"
            >
              hola@mifsut.com
            </a>
          </div>
        </div>
      </section>

      {/* ESTADO IA */}
      <section className="mx-auto max-w-6xl px-6 pb-16 text-center">
        <AIStatusInline />
        <p className="mt-2 text-xs text-neutral-600">
          Infraestructura IA monitorizando en tiempo real ·{" "}
          <a className="underline underline-offset-4 hover:text-neutral-400" href="/live">Ver estado completo</a>
        </p>
      </section>
    </main>
  );
}
