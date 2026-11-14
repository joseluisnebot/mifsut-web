"use client";
import { useState } from "react";
import FormularioLead from "./FormularioLead";
import { CATEGORIAS, FECHAS, NOMBRE_CLASE, OBLIGACIONES, RUTA, type Clase, type Papel, type Tamano } from "@/data/cra";

type Opcion = { texto: string; ayuda?: string; valor: string };
type Paso = { id: string; pregunta: string; ayuda?: string; opciones: Opcion[] };

const PASOS: Paso[] = [
  {
    id: "conexion",
    pregunta: "¿Tu producto se conecta, directa o indirectamente, a otro dispositivo o a una red?",
    ayuda: "Vale cualquier conexión: wifi, Bluetooth, USB, Ethernet, o una app que habla con un servidor.",
    opciones: [
      { texto: "Sí", valor: "si" },
      { texto: "No, funciona totalmente aislado", valor: "fuera:No tiene ninguna conexión de datos, así que no es un «producto con elementos digitales» a efectos del reglamento." },
    ],
  },
  {
    id: "tipo",
    pregunta: "¿Qué vendes exactamente?",
    opciones: [
      { texto: "Un aparato con electrónica y firmware", valor: "hardware" },
      { texto: "Un programa o una app que el cliente instala", valor: "software" },
      {
        texto: "Solo un servicio en la nube, sin nada que el cliente instale",
        valor: "fuera:Un servicio en la nube puro (SaaS) no es un producto del CRA. Ojo: si esa nube es necesaria para que funcione un aparato o un programa que sí vendes, forma parte de ese producto. Y puede aplicarte la directiva NIS2.",
      },
    ],
  },
  {
    id: "comercial",
    pregunta: "¿Lo vendes o lo ofreces en la Unión Europea como parte de un negocio?",
    ayuda: "Cuenta también si es gratis pero ganas dinero con él: soporte de pago, datos, publicidad.",
    opciones: [
      { texto: "Sí", valor: "si" },
      {
        texto: "No: es de uso interno o un proyecto de código abierto sin actividad comercial",
        valor: "fuera:El reglamento solo se aplica a productos comercializados en la UE en el marco de una actividad comercial. Si algún día lo vendes o lo monetizas, vuelve a hacer el test.",
      },
    ],
  },
  {
    id: "sector",
    pregunta: "¿Está ya regulado por alguna de estas normas?",
    opciones: [
      { texto: "Ninguna de ellas", valor: "si" },
      ...[
        "Producto sanitario o de diagnóstico in vitro",
        "Vehículo de motor o componente homologado",
        "Aviación civil",
        "Equipo marino",
        "Exclusivo para defensa o seguridad nacional",
      ].map((t) => ({
        texto: t,
        valor: "fuera:El CRA excluye los productos que ya tienen su propia norma de ciberseguridad en ese sector. Te aplican los requisitos de esa norma, no los del CRA.",
      })),
    ],
  },
  {
    id: "papel",
    pregunta: "¿Cuál es tu papel?",
    opciones: [
      { texto: "Fabricante", ayuda: "Lo diseño o lo fabrico, o lo vendo con mi marca.", valor: "fabricante" },
      { texto: "Importador", ayuda: "Lo traigo de fuera de la UE con la marca del fabricante.", valor: "importador" },
      { texto: "Distribuidor", ayuda: "Lo revendo sin cambiarlo.", valor: "distribuidor" },
    ],
  },
  { id: "categoria", pregunta: "¿Cuál es la función principal del producto?", ayuda: "Cuenta la función principal, no los componentes que lleva dentro: una báscula con wifi no es un «router».", opciones: [] },
  {
    id: "tamano",
    pregunta: "¿Qué tamaño tiene tu empresa?",
    opciones: [
      { texto: "Microempresa", ayuda: "Menos de 10 personas y hasta 2 M€ de facturación.", valor: "micro" },
      { texto: "Pequeña", ayuda: "Menos de 50 personas y hasta 10 M€.", valor: "pequena" },
      { texto: "Mediana o grande", valor: "mediana-grande" },
    ],
  },
];

type Resultado = { clase: Clase; motivo?: string; papel?: Papel; tamano?: Tamano; categoria?: string };

function registra(r: Resultado) {
  fetch("/api/uso", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ herramienta: "cra", resultado: r.clase, papel: r.papel ?? "", tamano: r.tamano ?? "" }),
  }).catch(() => {});
}

const boton =
  "w-full text-left rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-neutral-200 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition";

export default function ClasificadorCRA() {
  const [paso, setPaso] = useState(0);
  const [parcial, setParcial] = useState<Resultado>({ clase: "defecto" });
  const [resultado, setResultado] = useState<Resultado | null>(null);

  function termina(r: Resultado) {
    setResultado(r);
    registra(r);
  }

  function responde(valor: string) {
    if (valor.startsWith("fuera:")) return termina({ clase: "fuera", motivo: valor.slice(6) });
    const id = PASOS[paso].id;
    const siguiente = { ...parcial };
    if (id === "papel") siguiente.papel = valor as Papel;
    if (id === "tamano") return termina({ ...siguiente, tamano: valor as Tamano });
    setParcial(siguiente);
    setPaso(paso + 1);
  }

  function eligeCategoria(clase: Clase, categoria?: string) {
    setParcial({ ...parcial, clase, categoria });
    setPaso(paso + 1);
  }

  function reinicia() {
    setPaso(0);
    setParcial({ clase: "defecto" });
    setResultado(null);
  }

  if (resultado) return <Informe r={resultado} reinicia={reinicia} />;

  const p = PASOS[paso];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <div className="mb-5 flex items-center justify-between text-xs text-neutral-500">
        <span>Pregunta {paso + 1} de {PASOS.length}</span>
        {paso > 0 && (
          <button onClick={() => setPaso(paso - 1)} className="hover:text-white transition">← Anterior</button>
        )}
      </div>
      <h2 className="text-xl font-semibold mb-2">{p.pregunta}</h2>
      {p.ayuda && <p className="text-sm text-neutral-500 mb-5">{p.ayuda}</p>}

      {p.id !== "categoria" ? (
        <div className="space-y-2 mt-4">
          {p.opciones.map((o) => (
            <button key={o.texto} onClick={() => responde(o.valor)} className={boton}>
              <span className="font-medium">{o.texto}</span>
              {o.ayuda && <span className="block text-xs text-neutral-500 mt-0.5">{o.ayuda}</span>}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-5 mt-4">
          <button onClick={() => eligeCategoria("defecto")} className={`${boton} border-indigo-500/30`}>
            <span className="font-medium">Ninguna de las de abajo</span>
            <span className="block text-xs text-neutral-500 mt-0.5">Es el caso de la mayoría de productos conectados.</span>
          </button>
          {CATEGORIAS.map((g) => (
            <div key={g.titulo}>
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-2">{g.titulo}</p>
              <div className="space-y-2">
                {g.items.map((it) => (
                  <button key={it} onClick={() => eligeCategoria(g.clase, it)} className={boton}>{it}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Informe({ r, reinicia }: { r: Resultado; reinicia: () => void }) {
  const fuera = r.clase === "fuera";
  const papel = r.papel ?? "fabricante";
  const tercero = r.clase === "importante-2" || r.clase === "critico";

  return (
    <div className="space-y-6">
      <section className={`rounded-2xl border p-6 ${fuera ? "border-white/10 bg-white/[0.02]" : "border-indigo-500/30 bg-indigo-500/[0.05]"}`}>
        <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-2">Resultado</p>
        <h2 className="text-2xl font-bold mb-3">{fuera ? "Tu producto queda fuera del CRA" : NOMBRE_CLASE[r.clase]}</h2>
        {fuera ? (
          <p className="text-neutral-300 leading-relaxed">{r.motivo}</p>
        ) : (
          <>
            {r.categoria && <p className="text-sm text-neutral-400 mb-3">Categoría: {r.categoria}.</p>}
            <p className="text-neutral-300 leading-relaxed">
              El Reglamento de Ciberresiliencia se aplica a tu producto. Actúas como <strong>{papel}</strong>.
            </p>
          </>
        )}
      </section>

      {!fuera && (
        <>
          {papel === "fabricante" && (
            <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="font-semibold mb-2">Cómo se demuestra la conformidad</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{RUTA[r.clase as Exclude<Clase, "fuera">]}</p>
            </section>
          )}

          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h3 className="font-semibold mb-3">Lo que tienes que hacer como {papel}</h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              {OBLIGACIONES[papel].map((o) => (
                <li key={o} className="flex gap-3"><span className="text-indigo-400 shrink-0">→</span>{o}</li>
              ))}
            </ul>
            {papel === "fabricante" && r.tamano !== "mediana-grande" && (
              <p className="mt-4 text-sm text-neutral-400 border-t border-white/5 pt-4">
                Por ser {r.tamano === "micro" ? "microempresa" : "pequeña empresa"}: puedes usar el formato simplificado de
                documentación técnica, y no se te multa por incumplir el plazo de 24 horas de la alerta temprana.
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h3 className="font-semibold mb-3">Fechas</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              {FECHAS.map((f) => (
                <li key={f.fecha}><strong className="text-neutral-200">{f.fecha}.</strong> {f.texto}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-neutral-500">Multas de hasta 15 millones de euros o el 2,5 % de la facturación mundial.</p>
          </section>

          {papel === "fabricante" && (
            <section className="rounded-2xl gradient-border p-6 print:hidden">
              <h3 className="text-lg font-semibold mb-2">Te preparamos el expediente: 149 €/mes por producto</h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-2">
                SBOM generado desde tu repositorio o tu firmware, vigilancia diaria de vulnerabilidades en tus componentes,
                evaluación de riesgos, documentación técnica del anexo VII, borrador de la declaración UE de conformidad y
                plantillas de aviso de 24 y 72 horas. Lo elaboran agentes de IA; tú lo revisas y lo firmas.
              </p>
              {tercero && (
                <p className="text-sm text-amber-200/80 mb-2">
                  En tu clase necesitas además un organismo notificado. Eso no lo sustituimos: dejamos listo el expediente que te va a pedir.
                </p>
              )}
              <p className="text-sm text-neutral-500 mb-5">
                El servicio está en preparación y abrirá por orden de reserva. Reservar no cuesta nada ni te compromete: no se pide ningún pago.
              </p>
              <FormularioLead
                herramienta="cra"
                boton="Reservar plaza sin pagar"
                campo={{ nombre: "producto", etiqueta: "Producto (opcional)", ejemplo: "Qué es y con qué está hecho: ESP32, Linux embebido, app móvil…" }}
                extra={{ resultado: r.clase }}
                hecho="Plaza reservada. Te escribiremos a ese correo cuando el servicio abra; hasta entonces no recibirás nada más."
              />
            </section>
          )}
        </>
      )}

      <div className="flex flex-wrap gap-3 print:hidden">
        <button onClick={() => window.print()} className="rounded-xl px-5 py-2.5 border border-white/10 hover:border-indigo-500/40 text-sm text-neutral-300 hover:text-white transition">
          Imprimir o guardar en PDF
        </button>
        <button onClick={reinicia} className="rounded-xl px-5 py-2.5 border border-white/10 hover:border-indigo-500/40 text-sm text-neutral-300 hover:text-white transition">
          Clasificar otro producto
        </button>
      </div>
      <p className="text-xs text-neutral-600 leading-relaxed">
        Resultado orientativo a partir de tus respuestas; no es asesoramiento jurídico. El texto que manda es el Reglamento (UE) 2024/2847.
      </p>
    </div>
  );
}
