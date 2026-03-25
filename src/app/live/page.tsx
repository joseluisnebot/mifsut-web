import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Estado IA — MIFSUT",
  description: "Estado de los principales proveedores de IA usados en los proyectos.",
};

const PROVIDERS = [
  { name: "Anthropic (Claude)", url: "https://status.anthropic.com", desc: "LLM principal" },
  { name: "OpenAI", url: "https://status.openai.com", desc: "GPT-4 / embeddings" },
  { name: "Google AI", url: "https://status.cloud.google.com", desc: "Gemini / Places API" },
  { name: "Cloudflare", url: "https://www.cloudflarestatus.com", desc: "Pages, D1, R2, Workers" },
  { name: "Brevo", url: "https://status.brevo.com", desc: "Email transaccional" },
];

export default function LivePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">Infraestructura</p>
      <h1 className="text-3xl font-extrabold tracking-tight mb-3">Estado de proveedores</h1>
      <p className="text-neutral-500 mb-10 text-sm">
        Estado oficial de los servicios usados en los proyectos.
      </p>

      <div className="space-y-3">
        {PROVIDERS.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-2xl border border-white/7 bg-white/[0.02] px-5 py-4 hover:border-indigo-500/30 transition group"
          >
            <div>
              <p className="font-medium group-hover:text-indigo-300 transition">{p.name}</p>
              <p className="text-xs text-neutral-600 mt-0.5">{p.desc}</p>
            </div>
            <span className="text-xs text-neutral-600 group-hover:text-neutral-400">Ver estado →</span>
          </a>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="/" className="text-sm text-neutral-600 hover:text-neutral-400 transition">
          ← Volver a proyectos
        </Link>
      </div>
    </main>
  );
}
