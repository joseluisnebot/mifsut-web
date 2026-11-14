import type { Metadata } from "next";
import ComprobadorDMARC from "@/components/herramientas/ComprobadorDMARC";

export const metadata: Metadata = {
  title: "Comprobador de SPF, DKIM y DMARC: ¿pueden suplantar tu dominio?",
  description:
    "Comprueba gratis si el correo de tu dominio está protegido contra la suplantación: SPF, DKIM y DMARC explicados sin jerga, con lo que falla y cómo se arregla.",
  alternates: { canonical: "/dmarc/" },
};

const FAQ = [
  {
    p: "¿Qué es DMARC?",
    r: "Un registro que publicas en el DNS de tu dominio y que dice a Gmail, Outlook y al resto qué hacer con un correo que dice venir de ti pero no lo demuestra: dejarlo pasar (p=none), mandarlo a spam (p=quarantine) o rechazarlo (p=reject).",
  },
  {
    p: "¿Y SPF y DKIM?",
    r: "Son las dos pruebas en las que se apoya DMARC. SPF es la lista de servidores autorizados a enviar con tu dominio. DKIM es una firma que tu proveedor de correo pone en cada mensaje. Para pasar DMARC basta con que una de las dos sea válida y coincida con tu dominio.",
  },
  {
    p: "¿Por qué mis correos acaban en spam?",
    r: "Una causa frecuente es no tener estas tres piezas bien puestas. Desde 2024 Gmail y Yahoo exigen SPF, DKIM y DMARC a quien envía en volumen, y penalizan a los dominios que no los tienen.",
  },
  {
    p: "¿Puedo poner «p=reject» directamente?",
    r: "No conviene. Si hay algún servicio que envía con tu dominio y no está bien configurado (la web, la facturación, la newsletter), sus correos dejarán de llegar. Lo seguro es empezar en p=none con informes, ver quién envía, corregirlo y subir por etapas.",
  },
  {
    p: "¿Qué datos guardáis de la comprobación?",
    r: "Ninguno que te identifique. La consulta se hace con datos públicos de DNS y solo se anota el resultado (por ejemplo, «sin DMARC») y el proveedor de correo, sin el dominio.",
  },
];

export default function DMARC() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10 print:mb-6">
        <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">Herramienta gratuita</p>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          ¿Pueden enviar correos <span className="gradient-text">en nombre de tu dominio?</span>
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed">
          Escribe tu dominio y revisamos SPF, DKIM y DMARC en unos segundos. Te decimos qué falla, en cristiano.
          Sin registro.
        </p>
      </header>

      <ComprobadorDMARC />

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
