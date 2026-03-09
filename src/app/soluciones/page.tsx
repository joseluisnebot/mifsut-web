import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Soluciones — Automatización empresarial con IA",
  description: "Blueprints de n8n, agentes IA, infraestructura Cloudflare y consultoría de implantación para empresas que quieren operar más rápido con menos equipo.",
};

const PLANS = [
  {
    name: "Blueprint",
    price: "Desde 490€",
    desc: "Un workflow listo para tu caso de uso específico.",
    features: [
      "Blueprint personalizado en n8n",
      "Documentación de instalación",
      "Variables de entorno configuradas",
      "1 mes de soporte por email",
    ],
    cta: "Solicitar",
    highlight: false,
  },
  {
    name: "Operaciones",
    price: "Desde 2.900€/mes",
    desc: "Automatización continua de tu operación con soporte activo.",
    features: [
      "Hasta 5 blueprints activos",
      "Agente IA dedicado al proceso",
      "Monitorización y alertas 24/7",
      "Soporte prioritario",
      "Reunión mensual de revisión",
    ],
    cta: "Hablar con ventas",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "A medida",
    desc: "Implantación completa para operaciones complejas y equipos grandes.",
    features: [
      "Blueprints ilimitados",
      "Integración con sistemas existentes",
      "Infraestructura cloud dedicada",
      "SLA garantizado",
      "Equipo técnico asignado",
    ],
    cta: "Contactar",
    highlight: false,
  },
];

const STACK = [
  { name: "n8n", desc: "Orquestación de workflows" },
  { name: "Cloudflare", desc: "Edge computing global" },
  { name: "Claude / GPT-4", desc: "Modelos de lenguaje" },
  { name: "Wazuh", desc: "SIEM y seguridad" },
  { name: "Listmonk", desc: "Email marketing" },
  { name: "Proxmox", desc: "Infraestructura on-premise" },
];

export default function Soluciones() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">Soluciones</p>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5">
          Automatización que se<br />
          <span className="gradient-text">paga sola</span>
        </h1>
        <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Analizamos tu proceso, diseñamos la automatización y la implantamos.
          Tú te centras en hacer crecer tu negocio.
        </p>
      </div>

      {/* Planes */}
      <div className="grid gap-6 md:grid-cols-3 mb-24">
        {PLANS.map((p) => (
          <div
            key={p.name}
            className={`rounded-2xl p-7 flex flex-col ${
              p.highlight
                ? "gradient-border bg-indigo-500/5"
                : "border border-white/7 bg-white/[0.02]"
            }`}
          >
            {p.highlight && (
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
                ★ Más popular
              </span>
            )}
            <h3 className="text-xl font-bold mb-1">{p.name}</h3>
            <p className="text-2xl font-extrabold gradient-text mb-2">{p.price}</p>
            <p className="text-sm text-neutral-500 mb-6 leading-relaxed">{p.desc}</p>
            <ul className="space-y-2.5 flex-1 mb-8">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-neutral-400">
                  <span className="text-indigo-400 mt-0.5">✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href="mailto:ventas@mifsut.com"
              className={`text-center rounded-xl py-3 font-semibold text-sm transition ${
                p.highlight
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                  : "border border-white/10 hover:border-indigo-500/40 text-neutral-300 hover:text-white"
              }`}
            >
              {p.cta} →
            </a>
          </div>
        ))}
      </div>

      {/* Stack */}
      <div className="border-t border-white/5 pt-16">
        <p className="text-center text-xs uppercase tracking-widest text-neutral-600 mb-8">Tecnologías que usamos</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STACK.map((s) => (
            <div key={s.name} className="rounded-xl border border-white/7 bg-white/[0.02] p-4 text-center">
              <p className="font-semibold text-sm mb-1">{s.name}</p>
              <p className="text-xs text-neutral-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
