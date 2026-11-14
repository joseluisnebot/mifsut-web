// POST /api/uso — cuenta un uso anónimo del clasificador CRA (sin datos personales).
import { json, origenValido, bajoTope, leerCuerpo } from "../../lib-fn/comun.js";

const RESULTADOS = ["fuera", "defecto", "importante-1", "importante-2", "critico"];
const PAPELES = ["fabricante", "importador", "distribuidor", ""];
const TAMANOS = ["micro", "pequena", "mediana-grande", ""];

export const onRequestPost = async ({ request, env }) => {
  if (!origenValido(request)) return json({ ok: false }, 403);
  const c = await leerCuerpo(request, 512);
  if (!c || c.herramienta !== "cra" || !RESULTADOS.includes(c.resultado)) return json({ ok: false }, 400);
  const papel = PAPELES.includes(c.papel) ? c.papel : "";
  const tamano = TAMANOS.includes(c.tamano) ? c.tamano : "";
  if (!(await bajoTope(env, "usos", 5000))) return json({ ok: true });
  await env.DB.prepare("INSERT INTO usos (herramienta, resultado, detalle) VALUES ('cra', ?, ?)")
    .bind(c.resultado, JSON.stringify({ papel, tamano }))
    .run();
  return json({ ok: true });
};
