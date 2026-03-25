import type { Metadata } from "next";
import Link from "next/link";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "lamevaescola.com — Herramientas para docentes | MIFSUT",
  description: "Plataforma con 9 herramientas de aula para docentes: generador de rúbricas, exámenes, planes de lección y más. Desplegada en Cloudflare Pages con newsletter vía Brevo.",
};

const TOOLS = [
  { name: "Generador de rúbricas", desc: "Crea rúbricas de evaluación personalizadas por materia, nivel y criterios." },
  { name: "Generador de exámenes", desc: "Exámenes tipo test o respuesta corta a partir de un tema o texto." },
  { name: "Plan de lección", desc: "Estructura completa de sesión: objetivos, actividades, materiales y evaluación." },
  { name: "Adaptación curricular", desc: "Adapta cualquier contenido al nivel y necesidades del alumno." },
  { name: "Feedback personalizado", desc: "Genera comentarios de evaluación individualizados para el alumno." },
  { name: "Actividades de refuerzo", desc: "Ejercicios de refuerzo o ampliación según el perfil del grupo." },
  { name: "Carta a familias", desc: "Redacta comunicaciones formales para enviar a las familias." },
  { name: "Proyecto interdisciplinar", desc: "Propuesta de proyecto colaborativo vinculando varias materias." },
  { name: "Diario de aula", desc: "Plantilla de registro diario de actividades, incidencias y observaciones." },
];

const STACK = [
  { name: "HTML + CSS + JS", role: "Frontend estático (sin framework)" },
  { name: "Cloudflare Pages", role: "Hosting global, coste cero" },
  { name: "Brevo", role: "Newsletter y email transaccional" },
  { name: "Claude API", role: "Generación de contenido educativo con IA" },
];

export default function LaMevaEscolaPage() {
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
          lamevaescola.com
        </h1>
        <p className="text-neutral-400 leading-relaxed">
          Plataforma de herramientas para docentes: 9 utilidades de aula generadas con IA.
          Rúbricas, exámenes, planes de lección y más, accesibles desde cualquier dispositivo
          sin registro obligatorio.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="https://lamevaescola.com"
            target="_blank"
            className="rounded-xl px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition"
          >
            Ver plataforma →
          </Link>
          <Link
            href="https://github.com/joseluisnebot/lamevaescola"
            target="_blank"
            className="rounded-xl px-4 py-2 text-sm font-semibold border border-white/10 hover:border-indigo-500/30 transition"
          >
            Código fuente
          </Link>
        </div>
      </header>

      {/* Herramientas */}
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">9 herramientas de aula</h2>
        <div className="space-y-3">
          {TOOLS.map((t) => (
            <div key={t.name} className="flex gap-3 text-sm">
              <span className="text-indigo-400 shrink-0 mt-0.5">→</span>
              <div>
                <span className="text-white font-medium">{t.name}</span>
                <span className="text-neutral-500"> — {t.desc}</span>
              </div>
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

      {/* Por qué */}
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">Por qué existe</h2>
        <p className="text-neutral-400 text-sm leading-relaxed mb-3">
          Los docentes dedican horas semanales a preparar materiales que podrían generarse en
          segundos con IA. lamevaescola.com pone esas herramientas en una web limpia,
          sin registro ni fricción, lista para usar en clase.
        </p>
        <p className="text-neutral-400 text-sm leading-relaxed">
          La plataforma está diseñada para el contexto educativo catalán/valenciano,
          con interfaz multilingüe y enfoque en etapas ESO, Batxillerat y FP.
        </p>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.04] p-6">
        <h2 className="text-xl font-semibold mb-2">¿Tienes un proyecto educativo con IA?</h2>
        <p className="text-neutral-400 text-sm mb-4">
          Si quieres construir herramientas similares para tu centro o plataforma, hablemos.
        </p>
        <a
          href="mailto:hola@mifsut.com"
          className="inline-block rounded-xl px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition"
        >
          Hablemos →
        </a>
      </section>

    </main>
  );
}
