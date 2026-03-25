import type { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: "elmeuinstitut.com — Plataforma para institutos | MIFSUT",
  description: "Plataforma educativa para institutos: herramientas específicas para ESO, Batxillerat y FP. Desplegada en Cloudflare Pages con dominio propio.",
};

const TOOLS = [
  { etapa: "ESO", name: "Generador de actividades", desc: "Actividades adaptadas al nivel del grupo con objetivos curriculares." },
  { etapa: "Batxillerat", name: "Preparación selectividad", desc: "Preguntas y esquemas de repaso para las pruebas de acceso." },
  { etapa: "FP", name: "Casos prácticos", desc: "Situaciones de trabajo reales para trabajar competencias profesionales." },
  { etapa: "Todos", name: "Programación didáctica", desc: "Estructura de unidades didácticas con competencias, criterios y actividades." },
];

const STACK = [
  { name: "HTML + CSS + JS", role: "Frontend estático" },
  { name: "Cloudflare Pages", role: "Hosting global, coste cero" },
  { name: "Claude API", role: "Generación de contenido educativo" },
];

export default function ElMeuInstitutPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10">

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs px-2.5 py-1 rounded-full border font-medium text-sky-400 bg-sky-500/10 border-sky-500/20">
            Web
          </span>
          <span className="text-xs text-neutral-500">En producción</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text mb-3">
          elmeuinstitut.com
        </h1>
        <p className="text-neutral-400 leading-relaxed">
          Plataforma educativa para institutos de secundaria. Herramientas con IA específicas
          para cada etapa: ESO, Batxillerat y Formación Profesional. Diseñada para el contexto
          educativo catalán/valenciano.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="https://elmeuinstitut.com"
            target="_blank"
            className="rounded-xl px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition"
          >
            Ver plataforma →
          </Link>
        </div>
      </header>

      {/* Herramientas por etapa */}
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Herramientas por etapa</h2>
        <div className="space-y-4">
          {TOOLS.map((t) => (
            <div key={t.name} className="border-l-2 border-indigo-500/30 pl-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 font-medium">{t.etapa}</span>
                <span className="text-sm font-semibold text-white">{t.name}</span>
              </div>
              <p className="text-sm text-neutral-500">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Stack técnico</h2>
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
      </section>

      {/* Relación con lamevaescola */}
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">Ecosistema educativo</h2>
        <p className="text-neutral-400 text-sm leading-relaxed">
          elmeuinstitut.com y lamevaescola.com son dos plataformas complementarias del mismo
          ecosistema: una orientada al docente individual, la otra al contexto del instituto.
          Ambas usan el mismo stack y comparten filosofía de diseño.
        </p>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.04] p-6">
        <h2 className="text-xl font-semibold mb-2">¿Quieres algo similar para tu centro?</h2>
        <p className="text-neutral-400 text-sm mb-4">
          Puedo adaptar la plataforma a las necesidades específicas de tu instituto o red de centros.
        </p>
        <p className="text-sm font-semibold text-indigo-300">hola@mifsut.com</p>
      </section>

    </main>
  );
}
