import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos",
  description: "Términos y condiciones de uso del sitio web mifsut.com.",
};

export default function Terminos() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-12">
        <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">Legal</p>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Términos de <span className="gradient-text">uso</span>
        </h1>
        <p className="text-neutral-400">Última actualización: julio de 2026</p>
      </header>

      <div className="space-y-8 text-neutral-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-3">Objeto</h2>
          <p>
            mifsut.com es un sitio web de carácter informativo que presenta el portfolio de proyectos de
            Jose Luis Nebot en el ámbito de la inteligencia artificial, la automatización y el IoT. El acceso
            y uso del sitio implica la aceptación de estos términos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Propiedad intelectual</h2>
          <p>
            Los contenidos, textos, diseños y proyectos mostrados son titularidad de Jose Luis Nebot, salvo
            que se indique lo contrario. No se autoriza su reproducción con fines comerciales sin
            consentimiento previo. Las marcas y logotipos de terceros que puedan aparecer pertenecen a sus
            respectivos titulares.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Uso del sitio</h2>
          <p>
            La información se ofrece con fines divulgativos y de presentación de trabajo. No constituye una
            oferta contractual ni una garantía de resultados. Los proyectos descritos reflejan trabajos
            reales, pero sus características pueden evolucionar con el tiempo.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Enlaces externos</h2>
          <p>
            Este sitio puede contener enlaces a webs de terceros. No nos hacemos responsables del contenido
            ni de las políticas de privacidad de esos sitios externos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Legislación aplicable</h2>
          <p>
            Estos términos se rigen por la legislación española. Para cualquier cuestión relacionada con el
            sitio, puedes escribir a <span className="text-indigo-400">hola@mifsut.com</span>.
          </p>
        </section>
      </div>
    </main>
  );
}
