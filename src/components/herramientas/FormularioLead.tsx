"use client";
import Link from "next/link";
import { useState } from "react";

type Props = {
  herramienta: "cra" | "dmarc";
  boton: string;
  // Campo propio de cada herramienta (producto o dominio) y datos que acompañan a la solicitud
  campo: { nombre: "producto" | "dominio"; etiqueta: string; ejemplo: string; valor?: string };
  extra?: Record<string, string>;
  hecho: string;
};

const ERRORES: Record<string, string> = {
  email: "Revisa el correo: no parece válido.",
  consentimiento: "Marca la casilla para que podamos escribirte.",
  tope: "Hemos recibido demasiadas solicitudes hoy. Prueba mañana o escribe a hola@mifsut.com.",
};

export default function FormularioLead({ herramienta, boton, campo, extra, hecho }: Props) {
  const [estado, setEstado] = useState<"reposo" | "enviando" | "hecho">("reposo");
  const [error, setError] = useState("");

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setEstado("enviando");
    setError("");
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          herramienta,
          email: f.get("email"),
          empresa: f.get("empresa"),
          [campo.nombre]: f.get(campo.nombre),
          consentimiento: f.get("consentimiento") === "on",
          web: f.get("web"),
          ...extra,
        }),
      });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.ok) return setEstado("hecho");
      setError(ERRORES[d.error] ?? "No se ha podido enviar. Prueba otra vez o escribe a hola@mifsut.com.");
    } catch {
      setError("No se ha podido enviar. Comprueba la conexión y prueba otra vez.");
    }
    setEstado("reposo");
  }

  if (estado === "hecho")
    return (
      <p role="status" className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
        {hecho}
      </p>
    );

  const input =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-indigo-500/60 focus:outline-none";

  return (
    <form onSubmit={enviar} className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="block text-sm text-neutral-400">
          Correo de empresa
          <input name="email" type="email" required autoComplete="email" placeholder="tu@empresa.com" className={`${input} mt-1`} />
        </label>
        <label className="block text-sm text-neutral-400">
          Empresa
          <input name="empresa" type="text" maxLength={120} autoComplete="organization" placeholder="Nombre de la empresa" className={`${input} mt-1`} />
        </label>
      </div>
      <label className="block text-sm text-neutral-400">
        {campo.etiqueta}
        <input name={campo.nombre} type="text" maxLength={200} defaultValue={campo.valor} placeholder={campo.ejemplo} className={`${input} mt-1`} />
      </label>
      {/* Campo trampa para robots: oculto a personas y a lectores de pantalla */}
      <input name="web" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <label className="flex items-start gap-2 text-xs text-neutral-500">
        <input name="consentimiento" type="checkbox" required className="mt-0.5 accent-indigo-500" />
        <span>
          Acepto que MIFSUT me escriba a este correo sobre esta solicitud. Sin publicidad de terceros.{" "}
          <Link href="/privacidad" className="underline hover:text-white">Privacidad</Link>.
        </span>
      </label>
      {error && <p role="alert" className="text-sm text-rose-300">{error}</p>}
      <button
        type="submit"
        disabled={estado === "enviando"}
        className="rounded-xl px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold transition"
      >
        {estado === "enviando" ? "Enviando…" : boton}
      </button>
    </form>
  );
}
