// GET /api/estado — recuentos del embudo para el panel interno. Requiere clave; no devuelve correos.
import { json, igual } from "../../lib-fn/comun.js";

export const onRequestGet = async ({ request, env }) => {
  if (!env.ESTADO_CLAVE || !igual(request.headers.get("x-clave") ?? "", env.ESTADO_CLAVE))
    return json({ ok: false }, 404);

  const [usos, leads, ultimos] = await env.DB.batch([
    env.DB.prepare(
      "SELECT herramienta, resultado, COUNT(*) AS n, SUM(ts >= datetime('now','-1 day')) AS n24 FROM usos GROUP BY 1, 2"
    ),
    env.DB.prepare(
      "SELECT herramienta, intencion, COUNT(*) AS n, SUM(ts >= datetime('now','-1 day')) AS n24 FROM leads GROUP BY 1, 2"
    ),
    env.DB.prepare("SELECT id, ts, herramienta, intencion, estado FROM leads ORDER BY id DESC LIMIT 20"),
  ]);
  const maxUso = await env.DB.prepare("SELECT COALESCE(MAX(id),0) AS id FROM usos").first();
  return json({ ok: true, usos: usos.results, leads: leads.results, ultimos: ultimos.results, max_uso: maxUso.id });
};
