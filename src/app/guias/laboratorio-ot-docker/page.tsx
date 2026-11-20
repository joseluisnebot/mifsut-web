import type { Metadata } from "next";
import Link from "next/link";

const REPO = "https://github.com/joseluisnebot/industrial-protocol-emulator";
const DOCKER_RUN =
  "docker run --rm --name ipe -p 8080:8080 -p 502:502 -p 4840:4840 -p 1883:1883 -p 20000:20000 -p 44818:44818 -p 47808:47808/udp -p 161:161/udp ghcr.io/joseluisnebot/industrial-protocol-emulator:latest";

export const metadata: Metadata = {
  title: "Laboratorio OT en 5 minutos: Modbus, OPC-UA, MQTT, SNMP y BACnet con Docker",
  description:
    "Monta un laboratorio de automatización industrial sin hardware: un contenedor libre que emula Modbus TCP, OPC-UA, MQTT, SNMP y BACnet/IP con panel web, para probar SCADA, HMI, Node-RED o herramientas de seguridad OT.",
  alternates: { canonical: "/guias/laboratorio-ot-docker/" },
};

const PROTOCOLOS = [
  ["Panel web y API", "8080 TCP", "valores en vivo, forzar señales, editor de etiquetas"],
  ["Modbus TCP", "502 TCP", "registros holding desde la dirección 0, float32 (2 registros por etiqueta)"],
  ["OPC-UA", "4840 TCP", "opc.tcp://localhost:4840/emulator/, anónimo"],
  ["MQTT", "1883 TCP", "broker Mosquitto incluido; temas como plant/sensor1/temperature"],
  ["SNMP", "161 UDP", "v1/v2c, comunidad public"],
  ["BACnet/IP", "47808 UDP", "dispositivo 999, objetos Analog Input"],
  ["DNP3", "20000 TCP", "básico: solo lectura de analógicas"],
  ["EtherNet/IP", "44818 TCP", "mínimo"],
];

const USOS = [
  {
    t: "Probar un SCADA o un HMI antes de ir a planta",
    c: "Das de alta los equipos contra localhost, compruebas direcciones, escalados y alarmas, y fuerzas una señal fuera de rango desde el panel para ver si salta la alarma. El panel genera además la configuración YAML de cada protocolo para pegarla.",
  },
  {
    t: "Node-RED, Home Assistant o Grafana",
    c: "Tienes datos industriales «de verdad» por Modbus, OPC-UA o MQTT para montar flujos y paneles sin comprar nada.",
  },
  {
    t: "Seguridad OT y formación",
    c: "Tráfico real de varios protocolos para practicar con Wireshark, Zeek o Suricata, o para una práctica de FP o de universidad. Todo en una red de laboratorio.",
  },
  {
    t: "Si fabricas equipos conectados (y te toca el CRA)",
    c: "Una pasarela o un PLC con firmware propio tiene que pasar pruebas antes de venderse. Con un emulador en el banco de pruebas puedes automatizar esas pruebas en cada versión, que es justo lo que pide el Reglamento de Ciberresiliencia: seguridad mantenida durante todo el periodo de soporte, no solo el día del lanzamiento.",
  },
];

export default function Guia() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">Guía · OT</p>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Un laboratorio OT <span className="gradient-text">en 5 minutos</span>
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed">
          Un solo contenedor libre (licencia MIT) que se hace pasar por una pequeña planta: los mismos datos servidos
          por Modbus TCP, OPC-UA, MQTT, SNMP y BACnet/IP, con un panel web para verlos y forzarlos. Sin PLC en la mesa.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">1. Arrancarlo</h2>
        <p className="text-neutral-400 leading-relaxed mb-3">Con Docker instalado, una sola orden:</p>
        <pre className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-950 p-4 text-sm text-neutral-300">
          <code>{DOCKER_RUN}</code>
        </pre>
        <p className="text-neutral-400 leading-relaxed mt-3">
          Abre <code>http://localhost:8080</code> y verás todas las etiquetas moviéndose en directo. En Linux, si
          necesitas el descubrimiento de BACnet (Who-Is), usa <code>--network host</code> en lugar de los{" "}
          <code>-p</code>.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">2. Qué tienes en cada puerto</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-neutral-500">
              <tr>
                <th className="py-2 pr-4 font-medium">Protocolo</th>
                <th className="py-2 pr-4 font-medium">Puerto</th>
                <th className="py-2 font-medium">Detalle</th>
              </tr>
            </thead>
            <tbody className="text-neutral-400">
              {PROTOCOLOS.map(([p, puerto, d]) => (
                <tr key={p} className="border-t border-neutral-800">
                  <td className="py-2 pr-4 text-neutral-200">{p}</td>
                  <td className="py-2 pr-4 whitespace-nowrap">{puerto}</td>
                  <td className="py-2">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">3. Comprobar que responde</h2>
        <pre className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-950 p-4 text-sm text-neutral-300">
          <code>{`snmpget -v2c -c public localhost 1.3.6.1.4.1.9999.1.1.0   # carga de CPU
mosquitto_sub -h localhost -t '#' -v                       # flujo MQTT
curl -s localhost:8080/api/state                           # todas las etiquetas`}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">4. Para qué sirve</h2>
        <div className="space-y-6">
          {USOS.map((u) => (
            <div key={u.t}>
              <h3 className="font-semibold mb-1">{u.t}</h3>
              <p className="text-neutral-400 leading-relaxed">{u.c}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">5. Lo que no hace (léelo antes)</h2>
        <ul className="list-disc pl-5 space-y-2 text-neutral-400 leading-relaxed">
          <li>Es una herramienta de pruebas, no un simulador de proceso: las señales son sintéticas e independientes.</li>
          <li>DNP3 es básico (solo lectura de analógicas) y EtherNet/IP es mínimo. Modbus, OPC-UA, MQTT y SNMP son los sólidos.</li>
          <li>
            No tiene autenticación ni cifrado en ningún protocolo ni en el panel. Úsalo en una red de laboratorio,{" "}
            <strong className="text-neutral-200">nunca expuesto a internet</strong>.
          </li>
          <li>Los valores forzados se pierden al reiniciar el contenedor.</li>
        </ul>
      </section>

      <section className="mt-14 rounded-xl border border-neutral-800 p-6">
        <h2 className="text-lg font-semibold mb-2">Código, capturas y avisos de fallos</h2>
        <p className="text-neutral-400 leading-relaxed mb-4">
          Todo está en GitHub, con un GIF del panel. Si echas en falta un protocolo o encuentras un fallo, abre una
          incidencia: especialmente se agradecen mejoras de DNP3 y EtherNet/IP.
        </p>
        <a href={REPO} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
          Ver el emulador en GitHub
        </a>
        <p className="text-neutral-400 leading-relaxed mt-4">
          ¿Fabricas equipos conectados? Mira si te aplica el CRA y en qué clase caes con el{" "}
          <Link href="/cra/" className="underline hover:text-white">
            clasificador gratuito
          </Link>{" "}
          o lee la{" "}
          <Link href="/guias/cra-firmware-esp32/" className="underline hover:text-white">
            guía del CRA para firmware ESP32 y PLC
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
