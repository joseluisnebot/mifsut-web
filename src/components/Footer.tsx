import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-14 grid gap-10 md:grid-cols-3">
        <div className="md:col-span-1">
          <span className="font-bold text-lg gradient-text">MIFSUT</span>
          <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
            Portfolio de proyectos de IA, automatización e IoT.
          </p>
          <p className="mt-4 text-xs text-neutral-500 font-medium">hola@mifsut.com</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">Proyectos</p>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li><Link href="/blueprints" className="hover:text-white transition">Ver todos</Link></li>
            <li><Link href="/sobre-mi" className="hover:text-white transition">Sobre mí</Link></li>
            <li><Link href="/colaboracion" className="hover:text-white transition">Colaborar</Link></li>
            <li><Link href="/live" className="hover:text-white transition">Estado IA</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">Contacto</p>
          <p className="text-sm text-neutral-400">hola@mifsut.com</p>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-5 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-600 gap-2">
          <p>© {new Date().getFullYear()} Jose Luis Nebot · MIFSUT</p>
          <p>Next.js · Cloudflare Pages</p>
        </div>
      </div>
    </footer>
  );
}
