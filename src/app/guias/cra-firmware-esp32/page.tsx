import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CRA para firmware ESP32 y PLC: qué tienes que tener y cuándo",
  description:
    "Guía práctica para fabricantes pequeños de equipos conectados con firmware propio: plazos del Reglamento de Ciberresiliencia, SBOM, vulnerabilidades, actualizaciones y notificación a ENISA.",
  alternates: { canonical: "/guias/cra-firmware-esp32/" },
};

const PASOS = [
  {
    t: "1. Saber si te aplica y en qué clase caes",
    c: [
      "El CRA (Reglamento UE 2024/2847) se aplica a casi cualquier producto con elementos digitales que se venda en la UE: una pasarela con ESP32, un sensor con firmware propio o un módulo de control. No hay exención por tamaño.",
      "La mayoría de productos son «por defecto» y el propio fabricante evalúa su conformidad. Algunos son «importantes» (clase I o II, anexo III) o «críticos» (anexo IV) y tienen un camino más exigente. Los equipos de automatización industrial son un caso a revisar con cuidado: la clasificación depende del uso previsto. Mira el texto vigente del anexo III en EUR-Lex, no una copia de la propuesta de 2022.",
    ],
  },
  {
    t: "2. Una lista de componentes (SBOM) de tu firmware",
    c: [
      "El anexo I, parte II, te obliga a identificar y documentar los componentes del producto, con una lista de materiales de software en formato legible por máquina que cubra, como mínimo, las dependencias de primer nivel.",
      "En un proyecto ESP32 eso es: el núcleo (ESP-IDF o Arduino-ESP32) y su versión, el compilador, y cada librería. Para poder hacerlo, tus versiones tienen que estar fijadas. Si tu platformio.ini dice `lib_deps = PubSubClient` sin versión, hoy no sabes qué llevas dentro: fija `@2.8.0` o un hash de commit. Es el cambio más barato y el que más te va a servir.",
    ],
  },
  {
    t: "3. Un canal para recibir avisos y un proceso para tratarlos",
    c: [
      "Tienes que tener una política de divulgación coordinada de vulnerabilidades y un punto de contacto público. Con un buzón de correo y un fichero /.well-known/security.txt (RFC 9116) en tu web ya tienes la base.",
      "Cuando salga una vulnerabilidad en un componente de tu lista, alguien debe mirar si te afecta. Sin SBOM no puedes hacerlo; con SBOM es cruzar tu lista con las bases públicas (NVD, avisos de ESP-IDF, CISA).",
    ],
  },
  {
    t: "4. Actualizaciones de seguridad durante el periodo de soporte",
    c: [
      "El producto debe poder recibir actualizaciones de seguridad y tú debes ofrecerlas, sin coste, durante el periodo de soporte. Por regla general, mínimo cinco años, salvo que el producto vaya a usarse menos tiempo.",
      "En un ESP32 esto es diseño: arranque seguro, memoria flash cifrada si el modelo de amenazas lo pide, y actualización OTA con la firma del firmware verificada en el dispositivo. Una suma de control que viaja en la misma orden que el binario comprueba que no se corrompió, pero no quién lo firmó.",
    ],
  },
  {
    t: "5. Notificar vulnerabilidades explotadas",
    c: [
      "Desde el 11 de septiembre de 2026, si sabes que una vulnerabilidad de tu producto se está explotando, debes avisar: alerta temprana en 24 horas, notificación en 72 horas e informe final más adelante. Se hace por la plataforma única de notificación de ENISA y el CSIRT que corresponda.",
      "Aunque seas pequeño, prepara ya la plantilla: quién avisa, con qué datos y dónde se guarda el registro.",
    ],
  },
  {
    t: "6. Expediente técnico y marcado CE",
    c: [
      "Antes de vender: documentación técnica (descripción, evaluación de riesgos, SBOM, pruebas), declaración UE de conformidad y marcado CE. Se aplica entero desde el 11 de diciembre de 2027.",
    ],
  },
];

export default function Guia() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">Guía · CRA</p>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          CRA para tu firmware ESP32 o PLC: <span className="gradient-text">qué tener y cuándo</span>
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed">
          Para fabricantes pequeños con firmware propio. Seis pasos, en orden de coste: los primeros son casi
          gratis y te ahorran trabajo en los siguientes.
        </p>
      </header>

      <div className="space-y-10">
        {PASOS.map((p) => (
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
        <h2 className="text-lg font-semibold mb-2">Primer paso, ahora mismo</h2>
        <p className="text-neutral-400 leading-relaxed mb-4">
          Averigua si te aplica y en qué clase caes con el clasificador gratuito (siete preguntas, sin registro).
        </p>
        <Link href="/cra/" className="underline hover:text-white">
          Abrir el clasificador CRA
        </Link>
      </section>

      <p className="mt-10 text-sm text-neutral-500 leading-relaxed">
        Esto es una guía de orientación, no asesoramiento jurídico. Aún se están publicando las normas
        armonizadas: contrasta los puntos dudosos con el{" "}
        <a
          href="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32024R2847"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          texto oficial en EUR-Lex
        </a>
        .
      </p>
    </main>
  );
}
