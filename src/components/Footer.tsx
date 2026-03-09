import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <span className="font-bold text-lg gradient-text">MIFSUT</span>
          <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
            Automatización empresarial con IA. Blueprints, agentes y cloud moderno.
          </p>
          <p className="mt-4 text-xs text-neutral-600">hola@mifsut.com</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">Producto</p>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li><Link href="/soluciones" className="hover:text-white transition">Soluciones</Link></li>
            <li><Link href="/blueprints" className="hover:text-white transition">Blueprints</Link></li>
            <li><Link href="/live" className="hover:text-white transition">Estado IA</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">Empresa</p>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li><Link href="/empresa" className="hover:text-white transition">Sobre nosotros</Link></li>
            <li><a href="mailto:hola@mifsut.com" className="hover:text-white transition">Contacto</a></li>
            <li><a href="mailto:ventas@mifsut.com" className="hover:text-white transition">Ventas</a></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">Legal</p>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li><Link href="/privacidad" className="hover:text-white transition">Privacidad</Link></li>
            <li><Link href="/terminos" className="hover:text-white transition">Términos</Link></li>
            <li><Link href="/sitemap.xml" className="hover:text-white transition">Sitemap</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-5 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-600 gap-2">
          <p>© {new Date().getFullYear()} MIFSUT. Todos los derechos reservados.</p>
          <p>Construido con Next.js · Desplegado en Cloudflare Edge</p>
        </div>
      </div>
    </footer>
  );
}
