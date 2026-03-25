import type { Metadata } from "next";
import Link from "next/link";
import AIStatusInline from "@/components/AIStatusInLine";
import { blueprints } from "@/data/blueprints";


export const metadata: Metadata = {
  title: "MIFSUT — Proyectos de IA, automatización e IoT",
  description: "Portfolio de Jose Luis Nebot: plataformas web con IA, sistemas IoT con ESP32, automatización con Python y Cloudflare. Proyectos reales en producción.",
};

const STACK = [
  { icon: "🐍", label: "Python" },
  { icon: "▲", label: "Next.js" },
  { icon: "☁️", label: "Cloudflare" },
  { icon: "🤖", label: "LLMs / Ollama" },
  { icon: "📡", label: "ESP32 / LVGL" },
  { icon: "🗄️", label: "Modbus RS-485" },
  { icon: "📷", label: "Google Places API" },
  { icon: "📧", label: "Brevo / Listmonk" },
];

const CATEGORY_ORDER = ["IA + Web", "Web", "Hardware / IoT", "Infraestructura"];

function groupByCategory(items: typeof blueprints) {
  const map: Record<string, typeof blueprints> = {};
  for (const bp of items) {
    if (!map[bp.category]) map[bp.category] = [];
    map[bp.category].push(bp);
  }
  return CATEGORY_ORDER.map((cat) => ({ cat, items: map[cat] ?? [] })).filter((g) => g.items.length > 0);
}

export default function Home() {
  const groups = groupByCategory(blueprints);

  return (
    <main className="relative overflow-hidden">
      <div className="hero-glow" />

      {/* HERO */}
      <section className="relative mx-auto max-w-4xl px-6 pt-24 pb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs text-indigo-300 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Proyectos en producción
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.08] mb-5">
          Construyendo con IA,<br />
          <span className="gradient-text">hardware y código.</span>
        </h1>

        <p className="max-w-2xl text-lg text-neutral-400 mb-8 leading-relaxed">
          Soy Jose Luis Nebot. Diseño y despliego plataformas web, agentes de automatización
          y sistemas embebidos con pantalla táctil. Todo funcionando en producción, con coste
          mínimo y sin gestión manual.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/blueprints"
            className="rounded-xl px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition shadow-lg shadow-indigo-500/20"
          >
            Ver proyectos →
          </Link>
          <Link
            href="/colaboracion"
            className="rounded-xl px-6 py-3 border border-white/10 hover:border-indigo-500/40 text-neutral-300 hover:text-white font-medium transition"
          >
            Colaborar
          </Link>
        </div>
      </section>

      {/* STACK */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-4xl px-6 py-8 flex flex-wrap gap-5 items-center justify-center">
          {STACK.map((s) => (
            <span key={s.label} className="flex items-center gap-2 text-sm text-neutral-500">
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </span>
          ))}
        </div>
      </section>

      {/* PROYECTOS */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-10">Proyectos</p>

        <div className="space-y-12">
          {groups.map(({ cat, items }) => (
            <div key={cat}>
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-5">{cat}</p>
              <div className="grid gap-4 md:grid-cols-2">
                {items.map((bp) => (
                  <Link
                    key={bp.slug}
                    href={bp.href}
                    className="group rounded-2xl border border-white/7 bg-white/[0.02] p-6 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition"
                  >
                    <h3 className="font-semibold text-white mb-2 group-hover:text-indigo-300 transition">{bp.title}</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">{bp.summary}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {bp.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-neutral-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ESTADO IA */}
      <section className="border-t border-white/5 mx-auto max-w-4xl px-6 py-12 text-center">
        <AIStatusInline />
        <p className="mt-2 text-xs text-neutral-600">
          Estado de la infraestructura IA en tiempo real ·{" "}
          <a className="underline underline-offset-4 hover:text-neutral-400" href="/live">Ver detalle</a>
        </p>
      </section>
    </main>
  );
}
