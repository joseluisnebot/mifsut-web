import type { Metadata } from "next";
import Link from "next/link";
import { blueprints } from "@/data/blueprints";


export const metadata: Metadata = {
  title: "Blueprints — Automatizaciones listas para usar",
  description: "Catálogo de workflows de n8n, scripts Python y agentes IA para automatizar seguridad, datos, marketing e infraestructura. Descarga e instala en minutos.",
};

const CATEGORIES = ["Todos", "Proyectos", "Seguridad", "Data", "Marketing", "IA", "Infraestructura"];

const CATEGORY_COLORS: Record<string, string> = {
  "Proyectos": "text-amber-400 bg-amber-500/10 border-amber-500/20",
  "Seguridad": "text-red-400 bg-red-500/10 border-red-500/20",
  "Data": "text-blue-400 bg-blue-500/10 border-blue-500/20",
  "Marketing": "text-green-400 bg-green-500/10 border-green-500/20",
  "IA": "text-purple-400 bg-purple-500/10 border-purple-500/20",
  "Infraestructura": "text-orange-400 bg-orange-500/10 border-orange-500/20",
};

export default function Blueprints() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      {/* Header */}
      <div className="mb-14">
        <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">Catálogo</p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Blueprints</h1>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Workflows, agentes y scripts listos para instalar. Cada blueprint incluye
          documentación, variables de entorno y guía de implantación.
        </p>
      </div>

      {/* Categorías */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <span
            key={cat}
            className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-neutral-400 cursor-default"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {blueprints.map((b) => (
          <article
            key={b.slug}
            className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 hover:border-indigo-500/30 hover:bg-indigo-500/[0.04] transition flex flex-col group"
          >
            <div className="flex items-start justify-between mb-3">
              <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${CATEGORY_COLORS[b.category] ?? "text-neutral-400 bg-white/5 border-white/10"}`}>
                {b.category}
              </span>
            </div>

            <h3 className="text-base font-semibold mb-2 group-hover:text-indigo-300 transition leading-snug">{b.title}</h3>
            <p className="text-sm text-neutral-500 leading-relaxed flex-1">{b.summary}</p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {b.tags.slice(0, 4).map((t) => (
                <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-neutral-500">{t}</span>
              ))}
            </div>

            <Link
              href={b.href}
              className="mt-5 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition"
            >
              Ver blueprint →
            </Link>
          </article>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 rounded-2xl border border-white/7 bg-white/[0.02] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">¿Necesitas uno a medida?</h3>
          <p className="text-neutral-500 text-sm">Te diseñamos el blueprint exacto para tu proceso. Entregamos en días.</p>
        </div>
        <p className="shrink-0 text-sm font-semibold text-indigo-300">hola@mifsut.com</p>
      </div>
    </main>
  );
}
