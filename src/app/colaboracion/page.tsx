import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Colaboración — MIFSUT",
  description: "Disponible para colaborar en proyectos de IA, automatización, IoT y plataformas web. Si tienes algo interesante, hablemos.",
};

const INTERESES = [
  {
    icon: "🤖",
    title: "Proyectos de IA",
    desc: "Agentes autónomos, generación de contenido, enriquecimiento de datos, RAG. Especialmente si resuelven un problema real con coste operativo bajo.",
  },
  {
    icon: "📡",
    title: "IoT y hardware",
    desc: "ESP32, pantallas táctiles LVGL, Modbus, sensores industriales. Me interesan los proyectos donde el hardware y el software se encuentran.",
  },
  {
    icon: "☁️",
    title: "Plataformas web",
    desc: "Stack Cloudflare (Pages, D1, R2, Workers), Next.js. Plataformas que escalen sin infra costosa.",
  },
  {
    icon: "🔧",
    title: "Automatización",
    desc: "Pipelines Python, scraping, procesamiento de datos, publicación automática. Si hay un proceso manual repetitivo, probablemente se puede automatizar.",
  },
];

export default function Colaboracion() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">

      <header className="mb-12">
        <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">Colaboración</p>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          ¿Tienes algo<br />
          <span className="gradient-text">interesante en mente?</span>
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed">
          Estoy abierto a colaborar en proyectos que me parezcan técnicamente
          interesantes o que resuelvan un problema real. Sin burocracia, directo al grano.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Qué me interesa</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {INTERESES.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/7 bg-white/[0.02] p-5">
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="font-semibold mb-1.5">{item.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-8">
        <h2 className="text-lg font-semibold mb-3">Cómo trabajo</h2>
        <ul className="space-y-3 text-sm text-neutral-400">
          <li className="flex gap-3">
            <span className="text-indigo-400 shrink-0">→</span>
            Prefiero proyectos donde pueda ver el resultado en producción, no prototipos eternos.
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-400 shrink-0">→</span>
            Me gusta el stack Cloudflare + Python, pero me adapto si el proyecto lo justifica.
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-400 shrink-0">→</span>
            Trabajo con infraestructura propia (Proxmox en casa): sin costes de servidor para prototipos.
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-400 shrink-0">→</span>
            Documentación y código limpio desde el primer día, no como tarea pendiente.
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.04] p-6">
        <h2 className="text-lg font-semibold mb-2">Escríbeme</h2>
        <p className="text-neutral-400 text-sm mb-4">
          Cuéntame qué tienes en mente. Si me parece interesante, respondemos enseguida.
        </p>
        <p className="text-sm font-semibold text-indigo-300">hola@mifsut.com</p>
      </section>

    </main>
  );
}
