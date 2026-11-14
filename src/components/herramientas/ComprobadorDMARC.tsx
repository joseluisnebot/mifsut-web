"use client";
import { useState } from "react";
import FormularioLead from "./FormularioLead";

type Aviso = { nivel: "mal" | "ojo" | "bien"; texto: string };
type Informe = {
  dominio: string;
  nivel: "sin-dmarc" | "vigilando" | "parcial" | "protegido";
  proveedor: string | null;
  spf: { registro: string | null };
  dmarc: { registro: string | null };
  avisos: Aviso[];
};

const NIVEL: Record<Informe["nivel"], { titulo: string; texto: string; color: string }> = {
  "sin-dmarc": {
    titulo: "Sin protección",
    texto: "Cualquiera puede enviar correos que parezcan salir de tu dominio, y los que envías tú tienen más papeletas de acabar en spam.",
    color: "border-rose-500/40 bg-rose-500/[0.06]",
  },
  vigilando: {
    titulo: "Solo vigilando",
    texto: "Tienes DMARC, pero en modo observación: los correos falsos con tu dominio se siguen entregando.",
    color: "border-amber-500/40 bg-amber-500/[0.06]",
  },
  parcial: {
    titulo: "A medio camino",
    texto: "Hay protección, pero no completa. Falta cerrar el último paso.",
    color: "border-amber-500/40 bg-amber-500/[0.06]",
  },
  protegido: {
    titulo: "Protegido",
    texto: "Tu dominio rechaza los correos falsos. No necesitas nuestro servicio.",
    color: "border-emerald-500/40 bg-emerald-500/[0.06]",
  },
};

const ICONO = { mal: "✕", ojo: "!", bien: "✓" };
const TONO = { mal: "text-rose-300", ojo: "text-amber-300", bien: "text-emerald-300" };

const ERRORES: Record<string, string> = {
  dominio: "Escribe un dominio válido, por ejemplo: tuempresa.com",
  "no-existe": "Ese dominio no existe. Revisa que esté bien escrito.",
  dns: "No hemos podido consultar el DNS. Prueba otra vez en un momento.",
};

export default function ComprobadorDMARC() {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [informe, setInforme] = useState<Informe | null>(null);

  async function comprueba(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dominio = String(new FormData(e.currentTarget).get("dominio") ?? "");
    setCargando(true);
    setError("");
    setInforme(null);
    try {
      const r = await fetch("/api/dmarc?dominio=" + encodeURIComponent(dominio));
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.ok) setInforme(d);
      else setError(ERRORES[d.error] ?? ERRORES.dns);
    } catch {
      setError(ERRORES.dns);
    }
    setCargando(false);
  }

  return (
    <div className="space-y-6">
      <form onSubmit={comprueba} className="flex flex-col sm:flex-row gap-3 print:hidden">
        <label className="sr-only" htmlFor="dominio">Dominio</label>
        <input
          id="dominio"
          name="dominio"
          type="text"
          required
          inputMode="url"
          autoCapitalize="none"
          autoCorrect="off"
          placeholder="tuempresa.com"
          className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-neutral-600 focus:border-indigo-500/60 focus:outline-none"
        />
        <button type="submit" disabled={cargando} className="rounded-xl px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold transition">
          {cargando ? "Comprobando…" : "Comprobar"}
        </button>
      </form>
      {error && <p role="alert" className="text-sm text-rose-300">{error}</p>}

      {informe && (
        <>
          <section className={`rounded-2xl border p-6 ${NIVEL[informe.nivel].color}`}>
            <p className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">{informe.dominio}</p>
            <h2 className="text-2xl font-bold mb-2">{NIVEL[informe.nivel].titulo}</h2>
            <p className="text-neutral-300 leading-relaxed">{NIVEL[informe.nivel].texto}</p>
            {informe.proveedor && <p className="mt-3 text-sm text-neutral-500">Correo alojado en {informe.proveedor}.</p>}
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h3 className="font-semibold mb-3">Lo que hemos encontrado</h3>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              {informe.avisos.map((a) => (
                <li key={a.texto} className="flex gap-3">
                  <span className={`shrink-0 font-bold ${TONO[a.nivel]}`} aria-hidden="true">{ICONO[a.nivel]}</span>
                  {a.texto}
                </li>
              ))}
            </ul>
            {(informe.spf.registro || informe.dmarc.registro) && (
              <details className="mt-4 text-xs text-neutral-500">
                <summary className="cursor-pointer hover:text-white">Ver los registros DNS</summary>
                {informe.spf.registro && <pre className="mt-2 whitespace-pre-wrap break-all">SPF: {informe.spf.registro}</pre>}
                {informe.dmarc.registro && <pre className="mt-2 whitespace-pre-wrap break-all">DMARC: {informe.dmarc.registro}</pre>}
              </details>
            )}
          </section>

          {informe.nivel !== "protegido" && (
            <section className="rounded-2xl gradient-border p-6 print:hidden">
              <h3 className="text-lg font-semibold mb-2">Te lo dejamos en «p=reject» por 149 €, precio cerrado</h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-2">
                Identificamos todo lo que envía correo con tu dominio (el buzón, la web, la facturación, las newsletters),
                corregimos SPF y DKIM, publicamos DMARC con informes y lo subimos por etapas hasta «p=reject» sin que se
                pierda un solo correo legítimo. Tú solo copias los registros que te damos en tu panel de DNS.
              </p>
              <p className="text-sm text-neutral-500 mb-5">
                Ahora no se paga nada: deja la solicitud y te escribimos con los pasos. El servicio abre por orden de solicitud.
              </p>
              <FormularioLead
                herramienta="dmarc"
                boton="Solicitar el arreglo sin pagar"
                campo={{ nombre: "dominio", etiqueta: "Dominio", ejemplo: "tuempresa.com", valor: informe.dominio }}
                extra={{ resultado: informe.nivel, proveedor: informe.proveedor ?? "" }}
                hecho="Solicitud recibida. Te escribiremos a ese correo con los siguientes pasos; no recibirás nada más."
              />
            </section>
          )}

          <button onClick={() => window.print()} className="rounded-xl px-5 py-2.5 border border-white/10 hover:border-indigo-500/40 text-sm text-neutral-300 hover:text-white transition print:hidden">
            Imprimir o guardar en PDF
          </button>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Comprobación hecha solo con datos públicos de DNS. No enviamos ningún correo ni guardamos el dominio consultado.
          </p>
        </>
      )}
    </div>
  );
}
