// Utilidades compartidas por las Pages Functions de /api (herramientas /cra y /dmarc).

export const json = (obj, status = 200, extra = {}) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extra },
  });

// Comparación en tiempo constante, para claves.
export function igual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

const HOSTS = ["mifsut.com", "www.mifsut.com", "mifsut-paginaweb.pages.dev", "localhost"];

// Solo aceptamos escrituras lanzadas desde nuestras propias páginas.
export function origenValido(request) {
  const origen = request.headers.get("origin");
  if (!origen) return false;
  try {
    const h = new URL(origen).hostname;
    return HOSTS.includes(h) || h.endsWith(".mifsut-paginaweb.pages.dev");
  } catch {
    return false;
  }
}

// Tope global por día para que nadie llene la base de datos a base de peticiones.
export async function bajoTope(env, tabla, max) {
  const fila = await env.DB.prepare(
    `SELECT COUNT(*) AS n FROM ${tabla} WHERE ts >= datetime('now','-1 day')`
  ).first();
  return (fila?.n ?? 0) < max;
}

export async function leerCuerpo(request, maxBytes = 4096) {
  const texto = await request.text();
  if (texto.length > maxBytes) return null;
  try {
    const obj = JSON.parse(texto);
    return obj && typeof obj === "object" ? obj : null;
  } catch {
    return null;
  }
}

export const recorta = (v, n) => (typeof v === "string" ? v.trim().slice(0, n) : "");
