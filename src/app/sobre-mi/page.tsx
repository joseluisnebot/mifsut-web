import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Sobre mí — Jose Luis Nebot | MIFSUT",
  description: "Soy Jose Luis Nebot. Construyo plataformas web con IA, sistemas embebidos con ESP32 y pipelines de automatización. Basado en Vinaròs.",
};

const AREAS = [
  {
    icon: "🤖",
    title: "IA y automatización",
    desc: "Agentes Python que scrapen, enriquecen datos, generan contenido audiovisual y lo publican solos. LLMs locales con Ollama para mantener el coste en cero.",
  },
  {
    icon: "☁️",
    title: "Cloudflare stack",
    desc: "Pages, D1, R2, Workers, Access. Deploy global serverless sin gestión de servidores. Todo el stack de tresycuarto.com corre aquí.",
  },
  {
    icon: "📡",
    title: "Hardware / IoT",
    desc: "ESP32-S3 con pantalla táctil LVGL, sensores, RS-485 Modbus y OTA. Mismo chip en la estación meteorológica y el controlador de riego.",
  },
  {
    icon: "🐧",
    title: "Linux e infraestructura",
    desc: "Proxmox con VMs y CTs, Cloudflare Tunnel, Wazuh SIEM, ISOs Ubuntu con Autoinstall y LUKS. Servidor en casa 24/7.",
  },
];

export default function SobreMi() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">

      <header className="mb-12">
        <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">Sobre mí</p>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Jose Luis Nebot
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed">
          Construyo cosas que funcionan solas. Desde plataformas web gestionadas por agentes IA
          hasta controladores industriales con pantalla táctil. Todo desplegado en producción,
          con infraestructura propia y coste operativo mínimo.
        </p>
      </header>

      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-8">
        <p className="text-neutral-400 leading-relaxed mb-4">
          Basado en Vinaròs (Castellón). Llevo años construyendo sistemas de automatización
          e infraestructura: empezando por la seguridad corporativa y derivando hacia la IA,
          el IoT y las plataformas de contenido.
        </p>
        <p className="text-neutral-400 leading-relaxed">
          Me gusta la idea de que una plataforma pueda funcionar de forma completamente autónoma:
          que scrape, enriquezca, genere contenido y lo distribuya sin intervención manual.
          <strong className="text-white"> tresycuarto.com</strong> es el ejemplo más completo
          de eso hasta ahora.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Áreas de trabajo</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {AREAS.map((a) => (
            <div key={a.title} className="rounded-2xl border border-white/7 bg-white/[0.02] p-5">
              <div className="text-2xl mb-3">{a.icon}</div>
              <h3 className="font-semibold mb-1.5">{a.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.04] p-6">
        <h2 className="text-lg font-semibold mb-2">¿Hablamos?</h2>
        <p className="text-neutral-400 text-sm mb-4">
          Si tienes un proyecto interesante o quieres colaborar en algo, escríbeme.
        </p>
        <a
          href="mailto:hola@mifsut.com"
          className="inline-block rounded-xl px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition"
        >
          hola@mifsut.com →
        </a>
      </section>

    </main>
  );
}
