import type { Metadata } from "next";
import ClasificadorCRA from "@/components/herramientas/ClasificadorCRA";

export const metadata: Metadata = {
  title: "Clasificador CRA: ¿le aplica a tu producto el Reglamento de Ciberresiliencia?",
  description:
    "Test gratuito de 7 preguntas: averigua si el Reglamento de Ciberresiliencia (CRA) se aplica a tu producto conectado, en qué clase cae y qué tienes que hacer antes de diciembre de 2027.",
  alternates: { canonical: "/cra/" },
};

const FAQ = [
  {
    p: "¿Qué es el Reglamento de Ciberresiliencia (CRA)?",
    r: "Es el Reglamento (UE) 2024/2847. Obliga a que todo producto con elementos digitales que se venda en la Unión Europea (aparatos conectados y programas) cumpla unos requisitos mínimos de ciberseguridad durante toda su vida útil. Sin cumplirlo no podrá llevar el marcado CE.",
  },
  {
    p: "¿Cuándo empieza a aplicarse?",
    r: "En dos fases. Desde el 11 de septiembre de 2026 los fabricantes deben avisar de las vulnerabilidades explotadas activamente y de los incidentes graves, también en productos que ya estaban vendidos. Desde el 11 de diciembre de 2027 se aplica entero: un producto sin conformidad no se puede vender.",
  },
  {
    p: "Soy una empresa pequeña, ¿también me afecta?",
    r: "Sí. No hay exención por tamaño. Las microempresas y pequeñas empresas tienen un formato simplificado de documentación técnica y no se les multa por incumplir el plazo de 24 horas de la alerta temprana, pero el resto de obligaciones son las mismas.",
  },
  {
    p: "¿Qué es un SBOM?",
    r: "La lista de componentes de software que lleva tu producto: librerías, sistema operativo, firmware de terceros. El CRA obliga a tenerla en formato legible por máquina para poder saber, cuando se publica una vulnerabilidad, si tu producto está afectado.",
  },
  {
    p: "¿Este test sustituye a un abogado o a un organismo notificado?",
    r: "No. Da una orientación a partir de tus respuestas, con los anexos III y IV del reglamento. Los casos dudosos, sobre todo si tu producto podría ser «importante» o «crítico», conviene confirmarlos.",
  },
];

export default function CRA() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10 print:mb-6">
        <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">Herramienta gratuita</p>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          ¿Le aplica el CRA <span className="gradient-text">a tu producto?</span>
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed">
          Siete preguntas, dos minutos. Te decimos si el Reglamento de Ciberresiliencia se aplica a tu producto
          conectado, en qué clase cae y qué tienes que tener hecho. Sin registro.
        </p>
      </header>

      <ClasificadorCRA />

      <section className="mt-16 print:hidden">
        <h2 className="text-xl font-semibold mb-6">Preguntas frecuentes</h2>
        <div className="space-y-6">
          {FAQ.map((f) => (
            <div key={f.p}>
              <h3 className="font-semibold mb-1.5">{f.p}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{f.r}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-neutral-500">
          Texto oficial:{" "}
          <a
            href="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32024R2847"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            Reglamento (UE) 2024/2847 en EUR-Lex
          </a>
          .
        </p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({
              "@type": "Question",
              name: f.p,
              acceptedAnswer: { "@type": "Answer", text: f.r },
            })),
          }),
        }}
      />
    </main>
  );
}
