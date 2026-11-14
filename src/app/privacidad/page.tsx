import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacidad",
  description: "Política de privacidad de mifsut.com: qué datos se recogen, con qué fin y qué derechos tienes.",
};

export default function Privacidad() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-12">
        <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">Legal</p>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Política de <span className="gradient-text">privacidad</span>
        </h1>
        <p className="text-neutral-400">Última actualización: noviembre de 2026</p>
      </header>

      <div className="space-y-8 text-neutral-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-3">Responsable</h2>
          <p>
            El responsable de este sitio web (mifsut.com) es Jose Luis Nebot. Para cualquier cuestión
            relacionada con tus datos, puedes escribir a <span className="text-indigo-400">hola@mifsut.com</span>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Qué datos se recogen</h2>
          <p>
            Solo los que tú facilitas voluntariamente:
          </p>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li>
              <strong className="text-white">Si escribes a la dirección de contacto:</strong> tu nombre y tu
              correo electrónico, con el único fin de responderte.
            </li>
            <li>
              <strong className="text-white">Si reservas plaza o pides un arreglo desde una herramienta
              (clasificador CRA o comprobador DMARC):</strong> tu correo, el nombre de tu empresa y el producto
              o dominio que indiques, además del resultado de la herramienta. Se usan únicamente para
              escribirte sobre esa solicitud. La base legal es tu consentimiento, que das al marcar la casilla
              del formulario. No se pide ningún pago ni dato bancario.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Uso de las herramientas sin dejar datos</h2>
          <p>
            Puedes usar el clasificador CRA y el comprobador DMARC sin registrarte. De cada uso se anota solo
            una cifra anónima para saber si las herramientas sirven: el tipo de resultado (por ejemplo,
            «producto por defecto» o «sin DMARC») y, según la herramienta, el papel y el tamaño de empresa que
            hayas marcado o el proveedor de correo detectado. No se guarda el dominio consultado, ni el
            resto de respuestas, ni tu dirección IP. El comprobador DMARC consulta registros públicos de DNS a través del
            servicio de resolución de Cloudflare.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Dónde se guardan y con quién se comparten</h2>
          <p>
            Las solicitudes se guardan en una base de datos de Cloudflare (D1) ubicada en Europa occidental.
            Cloudflare actúa como encargado del tratamiento. Los datos no se venden ni se ceden a terceros.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Cookies y analítica</h2>
          <p>
            Este sitio no utiliza cookies de seguimiento ni publicidad. El alojamiento se realiza en
            Cloudflare Pages, que puede procesar datos técnicos mínimos (como la dirección IP) con fines de
            seguridad y funcionamiento del servicio, conforme a su propia política de privacidad.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Conservación</h2>
          <p>
            Los correos que envíes se conservan el tiempo necesario para atender tu consulta y gestionar,
            en su caso, una posible colaboración. Las reservas y solicitudes hechas desde las herramientas se
            conservan como máximo 12 meses si no llegan a convertirse en un servicio contratado. Puedes
            solicitar su eliminación en cualquier momento.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Tus derechos</h2>
          <p>
            Tienes derecho a acceder a tus datos, rectificarlos, suprimirlos, oponerte a su tratamiento y
            solicitar su portabilidad, y a retirar tu consentimiento cuando quieras. Para ejercerlos, escribe a{" "}
            <span className="text-indigo-400">hola@mifsut.com</span>. Si consideras que tus datos no se han
            tratado correctamente, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).
          </p>
        </section>
      </div>
    </main>
  );
}
