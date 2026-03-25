import type { Metadata } from "next";
import Link from "next/link";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Estación meteorológica Waveshare — ESP32-S3 + LVGL | MIFSUT",
  description: "Estación meteorológica con ESP32-S3, pantalla táctil 7 pulgadas, sensor DHT11 interior y datos exteriores de Open-Meteo API. UI con LVGL, OTA y WiFi. Funcionando en Vinaròs.",
};

const HARDWARE = [
  { item: "Placa", spec: "Waveshare ESP32-S3-Touch-LCD-7 (800×480, táctil GT911)" },
  { item: "Sensor interior", spec: "DHT11 en GPIO6 via RMT (temperatura y humedad)" },
  { item: "Datos exteriores", spec: "Open-Meteo API (Vinaròs 40.471°N, 0.4746°E)" },
  { item: "Conectividad", spec: "WiFi 192.168.1.225, OTA via ElegantOTA v3" },
  { item: "Alimentación", spec: "USB-C, funcionamiento 24/7" },
];

const STACK = [
  { name: "PlatformIO + Arduino", role: "Framework de desarrollo" },
  { name: "LVGL 8.3.x", role: "UI gráfica (fondo oscuro 0x0D1B2A)" },
  { name: "Open-Meteo API", role: "Previsión meteorológica exterior gratuita" },
  { name: "ElegantOTA v3", role: "Actualización firmware por WiFi" },
  { name: "DHT11 + RMT", role: "Sensor temperatura/humedad interior" },
];

const FIXES = [
  "CH422G registro salida: 0x38 (no 0x24) — crítico para inicializar pantalla",
  "pclk_hz: 8 MHz — evita contención con PSRAM",
  "DHT11 via RMT en lugar de Adafruit — evita desplazamiento horizontal en pantalla",
  "HSA_OVERRIDE_GFX_VERSION para fix del shift de display",
  "pad_all=0 en screen object — evita banda negra en bordes",
];

export default function WaveshareWeatherPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10">

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs px-2.5 py-1 rounded-full border font-medium text-green-400 bg-green-500/10 border-green-500/20">
            Hardware / IoT
          </span>
          <span className="text-xs text-neutral-500">Funcionando en Vinaròs</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text mb-3">
          Estación meteorológica Waveshare
        </h1>
        <p className="text-neutral-400 leading-relaxed">
          Estación meteorológica con pantalla táctil 7&quot; en ESP32-S3. Sensor DHT11 para
          temperatura y humedad interior, datos de previsión exterior de Open-Meteo API
          y actualización de firmware OTA por WiFi.
        </p>
        <div className="mt-4">
          <Link
            href="https://github.com/joseluisnebot/waveshare-weather-station"
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
                <td className="py-2.5 text-neutral-400 pr-4 font-medium w-36">{h.item}</td>
                <td className="py-2.5 text-neutral-500">{h.spec}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

      {/* Fixes técnicos */}
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Fixes técnicos aplicados</h2>
        <p className="text-sm text-neutral-500 mb-4">
          El ESP32-S3 con pantalla RGB tiene varias particularidades no documentadas.
          Estos son los problemas encontrados y resueltos:
        </p>
        <ol className="space-y-3">
          {FIXES.map((fix, i) => (
            <li key={i} className="flex gap-3 text-sm text-neutral-400">
              <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs flex items-center justify-center font-bold">
                {i + 1}
              </span>
              {fix}
            </li>
          ))}
        </ol>
      </section>

      {/* OTA */}
      <section className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">Actualización OTA</h2>
        <p className="text-sm text-neutral-500 mb-3">
          El firmware se actualiza sin cables vía ElegantOTA v3. Solo hay que compilar en
          PlatformIO y subir el <code className="text-indigo-300">.bin</code> al endpoint HTTP del dispositivo.
        </p>
        <div className="bg-black/30 rounded-xl p-4 font-mono text-xs text-neutral-400">
          <div>URL: http://192.168.1.225/ota/upload</div>
          <div>Usuario: admin | Contraseña: ota1234</div>
          <div className="mt-2 text-neutral-600"># IMPORTANTE: apagar y encender tras OTA</div>
          <div className="text-neutral-600"># El reset SW no reinicializa el panel RGB</div>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.04] p-6">
        <h2 className="text-xl font-semibold mb-2">¿Mismo hardware para otro proyecto?</h2>
        <p className="text-neutral-400 text-sm mb-4">
          El Waveshare ESP32-S3-Touch-LCD-7 es una plataforma potente para dashboards industriales,
          paneles de control o cualquier aplicación embedded con UI táctil. También lo uso en el
          controlador de riego.
        </p>
        <a
          href="mailto:hola@mifsut.com"
          className="inline-block rounded-xl px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition"
        >
          Hablemos →
        </a>
      </section>

    </main>
  );
}
