import type { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Controlador de riego FERTICONTROL — ESP32-S3 + Modbus | MIFSUT",
  description: "Sistema de fertirrigación industrial con pantalla táctil 7\", 30 programas, 8 zonas RS-485 Modbus, fases automáticas y watchdog de seguridad. ESP32-S3 + LVGL.",
};

const HARDWARE = [
  { item: "Placa", spec: "Waveshare ESP32-S3-Touch-LCD-7 (800×480, táctil GT911)" },
  { item: "Placa I/O", spec: "ELETECHSUP RS485 Modbus RTU 8DO-4DI-8AI" },
  { item: "Comunicación", spec: "RS-485 Modbus RTU (GPIO 15 TX, GPIO 16 RX, auto TX/RX)" },
  { item: "Salidas", spec: "8 relés 10A/250VAC: bomba, inyector, agitador + 5 sectores" },
  { item: "Entradas", spec: "Feedback bomba, caudalímetro, presostato" },
  { item: "Alimentación", spec: "12V o 24V DC" },
];

const STACK = [
  { name: "PlatformIO + Arduino", role: "Framework de desarrollo (ESP-IDF v5)" },
  { name: "LVGL 8.4", role: "UI táctil con tema oscuro" },
  { name: "ModbusMaster 2.0", role: "Control de relés y lectura de entradas vía RS-485" },
  { name: "ArduinoJson 7", role: "Configuración persistente en JSON" },
  { name: "ElegantOTA v3", role: "Actualización firmware por WiFi" },
  { name: "NTP + POSIX TZ", role: "Reloj en tiempo real (España, cambio automático)" },
];

const PANTALLAS = [
  { name: "Dashboard", desc: "Reloj NTP, badge de estado, indicadores de salidas activas." },
  { name: "Programas", desc: "Lista de 30 programas (8/página), estado ACTIVO/INACTIVO/EN CURSO." },
  { name: "Editor de programa", desc: "Días de semana, hora inicio, duración, fases y sectores." },
  { name: "Control Manual", desc: "Botones por salida con interlocks de seguridad." },
  { name: "Diagnóstico", desc: "Estado real de cada salida: comando enviado vs. feedback Modbus." },
  { name: "Filtros", desc: "Parámetros y secuencia automática de limpieza." },
  { name: "Configuración", desc: "RTC/NTP, watchdog bomba/presostato, ciclo agitador." },
];

const SEGURIDAD = [
  "E-STOP — botón rojo de parada de emergencia con confirmación modal",
  "Watchdog bomba/presostato — para la bomba si no hay presión en tiempo configurado",
  "Interlock inyector — no activa el inyector sin bomba activa",
  "Feedback digital — cada salida tiene confirmación de marcha real",
];

export default function RiegoControllerPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10">

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs px-2.5 py-1 rounded-full border font-medium text-green-400 bg-green-500/10 border-green-500/20">
            Hardware / IoT
          </span>
          <span className="text-xs text-neutral-500">En desarrollo activo</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text mb-3">
          Controlador de riego FERTICONTROL
        </h1>
        <p className="text-neutral-400 leading-relaxed">
          Sistema de fertirrigación industrial con pantalla táctil 7&quot;. 30 programas independientes,
          8 zonas de riego controladas por RS-485 Modbus, fases automáticas de pre-riego /
          abono / post-riego y sistema de seguridad con watchdog y E-STOP.
        </p>
        <div className="mt-4">
          <Link
            href="https://github.com/joseluisnebot/riego-controller"
            target="_blank"
            className="rounded-xl px-4 py-2 text-sm font-semibold border border-white/10 hover:border-indigo-500/30 transition"
          >
            Código fuente →
          </Link>
        </div>
      </header>

      {/* Hardware */}
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Hardware</h2>
        <table className="w-full text-sm">
          <tbody>
            {HARDWARE.map((h) => (
              <tr key={h.item} className="border-b border-white/5 last:border-0">
                <td className="py-2.5 text-neutral-400 font-medium pr-4 w-32 shrink-0">{h.item}</td>
                <td className="py-2.5 text-neutral-500">{h.spec}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Pantallas UI */}
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Pantallas de la UI</h2>
        <div className="space-y-3">
          {PANTALLAS.map((p) => (
            <div key={p.name} className="flex gap-3 text-sm">
              <span className="text-indigo-400 shrink-0 mt-0.5">→</span>
              <div>
                <span className="text-white font-medium">{p.name}</span>
                <span className="text-neutral-500"> — {p.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seguridad */}
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Sistema de seguridad</h2>
        <ol className="space-y-3">
          {SEGURIDAD.map((s, i) => (
            <li key={i} className="flex gap-3 text-sm text-neutral-400">
              <span className="shrink-0 w-6 h-6 rounded-full bg-red-500/20 text-red-300 text-xs flex items-center justify-center font-bold">
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
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

      {/* Estado */}
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">Estado del proyecto</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span className="text-neutral-400">UI completa: todas las pantallas implementadas</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span className="text-neutral-400">Sistema de seguridad: E-STOP, watchdog, interlocks</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span className="text-neutral-400">NTP con zona horaria España (cambio automático)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400">◎</span>
            <span className="text-neutral-400">Motor de ejecución automática de programas (en desarrollo)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400">◎</span>
            <span className="text-neutral-400">Persistencia NVS de los 30 programas en flash</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400">◎</span>
            <span className="text-neutral-400">Conexión Modbus física (stubs implementados)</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.04] p-6">
        <h2 className="text-xl font-semibold mb-2">¿Necesitas un controlador similar?</h2>
        <p className="text-neutral-400 text-sm mb-4">
          Esta arquitectura (ESP32-S3 + LVGL + Modbus) es adaptable a cualquier sistema
          de control industrial que necesite UI táctil y comunicación RS-485.
        </p>
        <p className="text-sm font-semibold text-indigo-300">hola@mifsut.com</p>
      </section>

    </main>
  );
}
