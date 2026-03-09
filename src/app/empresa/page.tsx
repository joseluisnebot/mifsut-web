import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Empresa — Quiénes somos",
  description: "MIFSUT es una empresa especializada en automatización empresarial con IA, infraestructura Cloudflare y workflows de n8n.",
};

const VALUES = [
  { icon: "⚡", title: "Velocidad", desc: "De la idea a producción en días, no en meses. Sin burocracia ni procesos interminables." },
  { icon: "🎯", title: "Resultados", desc: "Medimos el impacto de cada automatización. Sin métricas reales, no hay éxito." },
  { icon: "🔓", title: "Sin lock-in", desc: "Todo lo que construimos usa tecnología abierta. Tu operación es tuya, no nuestra." },
  { icon: "🤝", title: "Transparencia", desc: "Sabes en todo momento qué estamos haciendo, por qué y cuánto cuesta." },
];

export default function Empresa() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <div className="mb-16">
        <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">Empresa</p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Hacemos que la IA<br />
          <span className="gradient-text">trabaje para ti</span>
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
          MIFSUT nace de la convicción de que cualquier empresa, sin importar su tamaño,
          puede operar con la eficiencia de una big tech. Solo necesita las herramientas correctas
          y alguien que las implante bien.
        </p>
      </div>

      <div className="prose prose-neutral prose-invert max-w-none mb-16 text-neutral-400 leading-relaxed space-y-4">
        <p>
          Llevamos años construyendo infraestructura de automatización: pipelines de datos,
          agentes IA, integraciones entre sistemas y plataformas serverless sobre Cloudflare.
          Lo que antes requería un equipo de ingeniería ahora es un blueprint de n8n.
        </p>
        <p>
          Trabajamos con empresas que quieren mover más rápido: reducir el tiempo
          dedicado a tareas repetitivas, detectar problemas antes de que impacten al cliente
          y escalar operaciones sin escalar plantilla.
        </p>
        <p>
          No somos una consultora tradicional. Entregamos código funcionando en producción,
          documentado y mantenible. Si en 30 días no ves el resultado prometido, te devolvemos
          el dinero.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 mb-16">
        {VALUES.map((v) => (
          <div key={v.title} className="rounded-2xl border border-white/7 bg-white/[0.02] p-6">
            <div className="text-2xl mb-3">{v.icon}</div>
            <h3 className="font-semibold mb-2">{v.title}</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl gradient-border p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">¿Hablamos?</h2>
        <p className="text-neutral-400 mb-6 text-sm">Cuéntanos tu proceso. Te decimos en 24h si podemos automatizarlo y cuánto cuesta.</p>
        <a
          href="mailto:ventas@mifsut.com"
          className="inline-block rounded-xl px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition"
        >
          ventas@mifsut.com →
        </a>
      </div>
    </main>
  );
}
