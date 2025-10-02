// src/app/page.tsx
import AIStatusInline from "@/components/AIStatusInLine";

export const runtime = "edge";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      {/* HERO */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">MIFSUT</h1>
        <p className="mx-auto max-w-2xl text-lg md:text-xl opacity-80">
          Blueprints de automatización con IA y nubes modernas.{" "}
          Next.js + Cloudflare Pages listos para crecer.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a
            href="#contacto"
            className="rounded-2xl px-6 py-3 text-base font-medium border border-white/15 hover:border-white/40 transition"
          >
            Empezar ahora
          </a>
          <a
            href="/blueprints"
            className="rounded-2xl px-6 py-3 text-base font-medium border border-white/15 hover:border-white/40 transition"
          >
            Ver blueprints
          </a>
          <a
            href="/live"
            className="rounded-2xl px-6 py-3 text-base font-medium border border-white/15 hover:border-white/40 transition"
          >
            Live
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mt-16 grid gap-4 md:grid-cols-3">
        {[
          { t: "Rápido", d: "Builds ligeras, static + edge donde conviene." },
          { t: "Escalable", d: "Infra serverless con Cloudflare alrededor." },
          { t: "Listo para SEO", d: "Metadatos, sitemap y robots configurables." },
        ].map((f) => (
          <div key={f.t} className="rounded-2xl border border-white/10 p-5 hover:border-white/30 transition">
            <h3 className="text-xl font-semibold mb-1">{f.t}</h3>
            <p className="opacity-80">{f.d}</p>
          </div>
        ))}
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="mt-20 space-y-3 text-center">
        <h2 className="text-2xl font-semibold">¿Hablamos?</h2>
        <p className="opacity-80">Escríbenos y te montamos tu flujo en días.</p>
        <a
          href="mailto:hola@mifsut.com"
          className="inline-block rounded-2xl px-6 py-3 border border-white/15 hover:border-white/40 transition"
        >
          hola@mifsut.com
        </a>
      </section>

      {/* ESTADO IA — sutil, sin borde, justo antes del footer */}
      <section className="mt-16">
        <AIStatusInline />
        <p className="mt-2 text-xs opacity-60 text-center">
          Detalle en <a className="underline underline-offset-4" href="/live">/live</a>.
        </p>
      </section>
    </main>
  );
}
