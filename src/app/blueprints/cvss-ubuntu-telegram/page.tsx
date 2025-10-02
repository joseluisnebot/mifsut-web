// src/app/blueprints/cvss-ubuntu-telegram/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  getLatestRelease,
  getAssetDownloadUrl,
  formatDateES,
  type GitHubRelease,
} from "@/lib/github";

export const metadata: Metadata = {
  title: "CVSS Ubuntu → Telegram | Blueprints | MIFSUT",
  description:
    "Blueprint de n8n que envía avisos de seguridad de Ubuntu a Telegram filtrando por un umbral CVSS mínimo.",
};

const OWNER = "joseluisnebot";
const REPO = "mifsut-blueprints";
const ASSET_FILENAME = "cvss-ubuntu-telegram.json";

// Fallback directo por si la API de GitHub falla / rate-limit
const FALLBACK_LATEST =
  "https://github.com/joseluisnebot/mifsut-blueprints/releases/latest/download/cvss-ubuntu-telegram.json";

export default async function BlueprintPage() {
  const release: GitHubRelease | null = await getLatestRelease(OWNER, REPO);
  const downloadUrl = getAssetDownloadUrl(release, ASSET_FILENAME) ?? FALLBACK_LATEST;
  const version = release?.tag_name ?? "latest";
  const published = release?.published_at ? formatDateES(release.published_at) : "";

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">CVSS Ubuntu → Telegram</h1>
        <p className="mt-2 text-sm opacity-80">
          Blueprint de n8n para monitorizar avisos de seguridad de Ubuntu (USN/CVE) y enviarlos a
          Telegram cuando superan un umbral CVSS definido.
        </p>
        {release && (
          <p className="mt-2 text-xs opacity-70">
            Última versión: <span className="font-semibold">{version}</span>
            {published && <> · Publicado: {published}</>}
          </p>
        )}
      </header>

      <section className="rounded-2xl p-5 shadow mb-6">
        <h2 className="text-xl font-semibold">Resumen</h2>
        <p className="mt-2">
          Consulta periódicamente el feed de Ubuntu Security Notices, extrae CVEs y CVSS cuando
          están disponibles, filtra por un umbral mínimo y publica un mensaje formateado en un chat
          de Telegram.
        </p>
        <ul className="mt-3 list-disc pl-6 space-y-1">
          <li>Fuente por defecto: RSS de Ubuntu Security Notices</li>
          <li>
            Filtro configurable: <code>MIN_CVSS</code> (p. ej., 7)
          </li>
          <li>
            Evita duplicados con <em>workflow static data</em> de n8n
          </li>
        </ul>
      </section>

      <section className="rounded-2xl p-5 shadow mb-6">
        <h2 className="text-xl font-semibold">Variables de entorno</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left">
              <tr>
                <th className="py-2">Variable</th>
                <th className="py-2">Ejemplo</th>
                <th className="py-2">Descripción</th>
              </tr>
            </thead>
            <tbody className="opacity-90">
              <tr>
                <td className="py-2 font-mono">TELEGRAM_BOT_TOKEN</td>
                <td className="py-2">123456:ABC-DEF...</td>
                <td className="py-2">Token del bot de Telegram</td>
              </tr>
              <tr>
                <td className="py-2 font-mono">TELEGRAM_CHAT_ID</td>
                <td className="py-2">-1001234567890</td>
                <td className="py-2">ID del chat/canal</td>
              </tr>
              <tr>
                <td className="py-2 font-mono">UBUNTU_FEED_URL</td>
                <td className="py-2">https://ubuntu.com/security/notices/rss</td>
                <td className="py-2">Fuente de avisos (RSS por defecto)</td>
              </tr>
              <tr>
                <td className="py-2 font-mono">MIN_CVSS</td>
                <td className="py-2">7</td>
                <td className="py-2">Umbral mínimo para alertar</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl p-5 shadow mb-6">
        <h2 className="text-xl font-semibold">Instalación</h2>
        <ol className="mt-2 list-decimal pl-6 space-y-2">
          <li>Descarga el JSON del workflow.</li>
          <li>
            En <strong>n8n</strong>, importa el archivo (<em>Workflows → Import from File</em>).
          </li>
          <li>Configura las variables de entorno indicadas arriba.</li>
          <li>Ajusta la frecuencia en el nodo <strong>Cron</strong> y activa el workflow.</li>
        </ol>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={downloadUrl}
            className="rounded-2xl px-4 py-2 text-sm font-semibold shadow hover:opacity-90"
          >
            Descargar JSON ({version})
          </a>

          <Link
            href={`https://github.com/${OWNER}/${REPO}`}
            target="_blank"
            className="rounded-2xl px-4 py-2 text-sm font-semibold shadow hover:opacity-90"
          >
            Ver repositorio
          </Link>
        </div>
      </section>

      <section className="rounded-2xl p-5 shadow">
        <h2 className="text-xl font-semibold">Notas y buenas prácticas</h2>
        <ul className="mt-2 list-disc pl-6 space-y-2">
          <li>
            Rotar <code>TELEGRAM_BOT_TOKEN</code> periódicamente.
          </li>
          <li>Limitar el bot al chat imprescindible.</li>
          <li>
            Si el feed no trae CVSS, mostrar <code>N/A</code> o ajustar la lógica del Function.
          </li>
          <li>Duplicar rama si quieres enviar también a Slack/Email.</li>
        </ul>
      </section>
    </main>
  );
}
