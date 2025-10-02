// src/app/blueprints/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Blueprints",
  description: "Catálogo de automatizaciones y plantillas listas para usar.",
};

type Item = {
  slug: string;
  title: string;
  tagline: string;
  status: "Disponible";
};

const items: Item[] = [
  {
    slug: "cvss-ubuntu-telegram",
    title: "CVSS Ubuntu → Telegram",
    tagline:
      "Avisos de seguridad de Ubuntu filtrados por CVSS y enviados a Telegram.",
    status: "Disponible",
  },
];

export default function Blueprints() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
        Blueprints
      </h1>
      <p className="opacity-80 mb-10 max-w-2xl">
        Plantillas y flujos listos para clonar y adaptar a tu proyecto.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {items.map((b) => (
          <article
            key={b.slug}
            className="rounded-2xl border border-white/10 p-5 hover:border-white/30 transition"
          >
            <h3 className="text-xl font-semibold">{b.title}</h3>
            <p className="opacity-80 mt-1">{b.tagline}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs px-2 py-1 rounded-full border border-white/15 opacity-80">
                {b.status}
              </span>
              <Link
                href={`/blueprints/${b.slug}`}
                className="text-sm underline underline-offset-4 hover:no-underline"
              >
                Ver detalle
              </Link>
            </div>
          </article>
        ))}
      </div>

      <p className="opacity-70 text-sm mt-8">
        ¿Quieres uno a medida?{" "}
        <a
          href="mailto:hola@mifsut.com"
          className="underline underline-offset-4"
        >
          Escríbenos
        </a>
        .
      </p>
    </main>
  );
}
