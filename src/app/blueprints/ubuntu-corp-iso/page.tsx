import type { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: "ISO corporativa Ubuntu 24.04 — Autoinstall + LUKS | MIFSUT",
  description: "ISO Ubuntu Desktop 24.04 para despliegue corporativo 100% automático: USB → instalación sin intervención. LUKS dm_crypt, 7 idiomas, NetworkManager, drivers Nvidia.",
};

const FEATURES = [
  { icon: "🔐", title: "LUKS dm_crypt", desc: "Cifrado de disco completo en todos los equipos sin intervención del usuario. Implementación con dm_crypt explícito (no lvm+luks, que falla sin TPM2)." },
  { icon: "🌍", title: "7 idiomas", desc: "user-data independiente para es, en_gb, en_us, fr, de, pt, it, nl. El instalador detecta y usa el correcto según la ISO seleccionada." },
  { icon: "📡", title: "NetworkManager", desc: "Renderer NetworkManager (no systemd-networkd) — crítico para que el WiFi funcione en el escritorio tras la instalación." },
  { icon: "🎮", title: "Drivers Nvidia", desc: "Detección e instalación automática del driver Nvidia en first-boot mediante script postinstall." },
  { icon: "⚡", title: "Zero-touch", desc: "El usuario solo conecta el USB, arranca y al finalizar tiene un equipo corporativo listo para usar. Cero preguntas durante la instalación." },
  { icon: "🔄", title: "BIOS + UEFI", desc: "ISO híbrida booteable tanto en BIOS legacy como en UEFI. Compatible con cualquier hardware corporativo." },
];

const STACK = [
  { name: "Ubuntu 24.04 LTS", role: "Base del sistema" },
  { name: "Subiquity Autoinstall", role: "Motor de instalación desatendida" },
  { name: "LUKS dm_crypt", role: "Cifrado de disco completo" },
  { name: "xorriso", role: "Generación de ISO híbrida UEFI+BIOS" },
  { name: "Bash", role: "Scripts de build y first-boot" },
  { name: "cloud-init", role: "Configuración post-instalación" },
];

const BUILD_STEPS = [
  "Descargar ISO base Ubuntu 24.04 Desktop",
  "Inyectar user-data con configuración Autoinstall (LUKS, usuario, red)",
  "Añadir scripts de first-boot (drivers Nvidia, hardening)",
  "Reempaquetar con xorriso generando ISO híbrida UEFI+BIOS",
  "Grabar en USB y arrancar en el equipo destino",
];

export default function UbuntuCorpIsoPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10">

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs px-2.5 py-1 rounded-full border font-medium text-violet-400 bg-violet-500/10 border-violet-500/20">
            Infraestructura
          </span>
          <span className="text-xs text-neutral-500">Probado en hardware real</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text mb-3">
          ISO corporativa Ubuntu 24.04
        </h1>
        <p className="text-neutral-400 leading-relaxed">
          ISO Ubuntu Desktop 24.04 para despliegue corporativo 100% automático.
          El empleado conecta el USB, arranca, y en ~20 minutos tiene un equipo
          con cifrado LUKS, usuario configurado y drivers instalados. Sin preguntas,
          sin técnico presente.
        </p>
        <div className="mt-4">
          <Link
            href="https://github.com/joseluisnebot/ubuntu-desktop-autoinstall"
            target="_blank"
            className="rounded-xl px-4 py-2 text-sm font-semibold border border-white/10 hover:border-indigo-500/30 transition"
          >
            Código fuente →
          </Link>
        </div>
      </header>

      {/* Features */}
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Características</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.title}>
              <div className="flex items-center gap-2 mb-1">
                <span>{f.icon}</span>
                <span className="font-medium text-sm text-white">{f.title}</span>
              </div>
              <p className="text-sm text-neutral-500 leading-relaxed pl-6">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Build process */}
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Proceso de generación</h2>
        <ol className="space-y-3">
          {BUILD_STEPS.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-neutral-400">
              <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs flex items-center justify-center font-bold">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
        <div className="mt-5 bg-black/30 rounded-xl p-4 font-mono text-xs text-neutral-400">
          <div className="text-neutral-600 mb-1"># Generar ISO</div>
          <div>cd ~/corp-iso-v2</div>
          <div>bash build-iso.sh</div>
        </div>
      </section>

      {/* Stack */}
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Stack técnico</h2>
        <table className="w-full text-sm">
          <tbody>
            {STACK.map((s) => (
              <tr key={s.name} className="border-b border-white/5 last:border-0">
                <td className="py-2.5 font-mono text-indigo-300 pr-4">{s.name}</td>
                <td className="py-2.5 text-neutral-500">{s.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Nota técnica LUKS */}
      <section className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-5 mb-6">
        <h3 className="text-sm font-semibold text-amber-300 mb-2">Nota técnica: LUKS sin TPM2</h3>
        <p className="text-sm text-neutral-400 leading-relaxed">
          Ubuntu Autoinstall soporta <code className="text-indigo-300">lvm+luks</code> pero
          falla en hardware sin TPM2. La solución es usar <code className="text-indigo-300">dm_crypt</code>{" "}
          explícito en el user-data, que funciona en cualquier BIOS y no requiere chip de seguridad dedicado.
        </p>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.04] p-6">
        <h2 className="text-xl font-semibold mb-2">¿Necesitas esto para tu empresa?</h2>
        <p className="text-neutral-400 text-sm mb-4">
          Puedo adaptar la ISO a las necesidades específicas de tu organización: naming,
          usuarios, software preinstalado, configuración de red corporativa y agente de gestión.
        </p>
        <p className="text-sm font-semibold text-indigo-300">hola@mifsut.com</p>
      </section>

    </main>
  );
}
