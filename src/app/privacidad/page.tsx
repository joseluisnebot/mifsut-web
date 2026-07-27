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
        <p className="text-neutral-400">Última actualización: julio de 2026</p>
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
            mifsut.com es un portfolio de proyectos y no dispone de formularios de registro ni de compra.
            Los únicos datos personales que se tratan son los que tú facilitas voluntariamente al escribir
            a la dirección de contacto (tu nombre y tu dirección de correo electrónico), con el único fin de
            responderte.
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
            en su caso, una posible colaboración. Puedes solicitar su eliminación en cualquier momento.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Tus derechos</h2>
          <p>
            Tienes derecho a acceder a tus datos, rectificarlos, suprimirlos, oponerte a su tratamiento y
            solicitar su portabilidad. Para ejercerlos, escribe a{" "}
            <span className="text-indigo-400">hola@mifsut.com</span>. Si consideras que tus datos no se han
            tratado correctamente, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).
          </p>
        </section>
      </div>
    </main>
  );
}
