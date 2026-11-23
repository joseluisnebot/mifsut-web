import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SECURE: ayuda de hasta 30.000 € para cumplir el CRA (guía para pymes)",
  description:
    "Qué es la ayuda SECURE, quién puede pedirla, qué cubre, qué plazos hay y cómo preparar la solicitud si fabricas equipos con firmware.",
  alternates: { canonical: "/guias/secure-cra-ayuda/" },
};

const BLOQUES = [
  {
    t: "Qué es",
    c: [
      "SECURE es un proyecto europeo (programa Digital Europa, con el Centro Europeo de Competencia en Ciberseguridad) que reparte dinero a pymes para que cumplan el Reglamento de Ciberresiliencia (CRA).",
      "La segunda convocatoria se abrió el 1 de octubre de 2026 con 11,5 millones de euros. Se esperan unos 380 proyectos. La primera, de 5 millones, se cerró en marzo de 2026.",
    ],
  },
  {
    t: "Cuánto da",
    c: [
      "Hasta 30.000 € por proyecto, con una cofinanciación del 50 %. Es decir: tú pagas la otra mitad. Para un proyecto de 10.000 € de trabajo, la ayuda sería de 5.000 €.",
      "La duración máxima del proyecto es de unos 180 días naturales. Hay que planificar el trabajo para que quepa.",
    ],
  },
  {
    t: "Quién puede pedirla",
    c: [
      "Una sola entidad legal que cumpla la definición europea de pyme (micro, pequeña o mediana) y esté constituida en un país de la UE o del EEE.",
      "Solo se puede presentar una propuesta. Y no se puede mezclar con otra ayuda europea para el mismo trabajo.",
    ],
  },
  {
    t: "Qué cubre",
    c: [
      "Según las fuentes que hemos revisado: trabajo de cumplimiento (auditorías, apoyo a la certificación, redacción de políticas), pruebas del producto (análisis de vulnerabilidades, pruebas de intrusión), mejoras de seguridad en producción, gestión de riesgos y de incidentes, formación, y servicios profesionales necesarios.",
      "Para un fabricante con firmware, los encajes más claros son: la lista de componentes (SBOM) y el proceso de avisos de vulnerabilidades, las pruebas de seguridad del producto, la actualización firmada (OTA) y el expediente técnico.",
    ],
  },
  {
    t: "Plazos: lo que sabemos y lo que no",
    c: [
      "Las fuentes que hemos podido leer (la agencia pública holandesa RVO y una web independiente sobre el CRA) dan como cierre el 11 de diciembre de 2026. Hay una nota posterior que habla de ampliarlo al 29 de enero de 2027, pero no hemos podido contrastarla en la web oficial del proyecto.",
      "Consejo: da por bueno el 11 de diciembre y confirma la fecha en la web oficial de SECURE antes de empezar. Si se amplía, mejor; si no, no pierdes la ayuda.",
      "Cobrar la ayuda llega después de la resolución. Cuenta con que el dinero tarda: no dependas de él para pagar el trabajo.",
    ],
  },
  {
    t: "Cómo preparar la solicitud",
    c: [
      "1. Lista tus productos con firmware y averigua en qué clase del CRA caen (el clasificador de abajo te da una primera idea).",
      "2. Decide qué trabajo quieres que cubra la ayuda y ponle presupuesto: SBOM y proceso de vulnerabilidades, pruebas, actualización firmada, expediente.",
      "3. Pide presupuesto a quien vaya a hacerlo. Las bases oficiales mandan sobre esta guía: léelas antes de comprometer nada.",
      "4. Reúne los datos de tu empresa que acrediten que eres pyme y que estás en la UE o el EEE.",
    ],
  },
];

export default function Guia() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">Guía · CRA · Ayudas</p>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          SECURE: hasta <span className="gradient-text">30.000 €</span> para cumplir el CRA
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed">
          Una ayuda europea que paga la mitad del trabajo de cumplimiento del CRA a pymes. Aquí tienes qué cubre, qué plazos hay
          y cómo preparar la solicitud.
        </p>
      </header>

      <div className="space-y-10">
        {BLOQUES.map((p) => (
          <section key={p.t}>
            <h2 className="text-xl font-semibold mb-3">{p.t}</h2>
            {p.c.map((x) => (
              <p key={x} className="text-neutral-400 leading-relaxed mb-3">
                {x}
              </p>
            ))}
          </section>
        ))}
      </div>

      <section className="mt-14 rounded-xl border border-neutral-800 p-6">
        <h2 className="text-lg font-semibold mb-2">Empieza por saber dónde estás</h2>
        <p className="text-neutral-400 leading-relaxed mb-4">
          El clasificador gratuito (siete preguntas, sin registro) te dice si el CRA te afecta y en qué clase. Y si lo que
          quieres es ordenar el trabajo, mira la <Link href="/guias/cra-firmware-esp32/" className="underline hover:text-white">guía de seis pasos para firmware</Link>.
        </p>
        <Link href="/cra/" className="underline hover:text-white">
          Abrir el clasificador CRA
        </Link>
      </section>

      <p className="mt-10 text-sm text-neutral-500 leading-relaxed">
        Guía de orientación, no asesoramiento jurídico ni garantía de ayuda. mifsut.com no está vinculada al proyecto SECURE. Las
        condiciones oficiales están en la web de SECURE y en la convocatoria; léelas antes de solicitar.
      </p>
    </main>
  );
}
