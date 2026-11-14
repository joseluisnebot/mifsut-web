// POST /api/lead — guarda una reserva (CRA) o una solicitud (DMARC). No hay pago.
import { json, origenValido, bajoTope, leerCuerpo, recorta } from "../../lib-fn/comun.js";

const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;
const INTENCION = { cra: "reserva", dmarc: "solicitud" };

export const onRequestPost = async ({ request, env }) => {
  if (!origenValido(request)) return json({ ok: false, error: "origen" }, 403);
  const c = await leerCuerpo(request);
  if (!c) return json({ ok: false, error: "formato" }, 400);

  // Campo trampa: los humanos no lo ven; si viene relleno es un robot. Respondemos OK sin guardar.
  if (recorta(c.web, 200)) return json({ ok: true });

  const herramienta = c.herramienta;
  const email = recorta(c.email, 254).toLowerCase();
  if (!INTENCION[herramienta]) return json({ ok: false, error: "herramienta" }, 400);
  if (!EMAIL.test(email)) return json({ ok: false, error: "email" }, 400);
  if (c.consentimiento !== true) return json({ ok: false, error: "consentimiento" }, 400);

  const detalle = {};
  for (const k of ["producto", "dominio", "resultado", "proveedor"]) {
    const v = recorta(c[k], 200);
    if (v) detalle[k] = v;
  }

  if (!(await bajoTope(env, "leads", 200))) return json({ ok: false, error: "tope" }, 429);
  await env.DB.prepare(
    "INSERT INTO leads (herramienta, intencion, email, empresa, detalle, consentimiento) VALUES (?, ?, ?, ?, ?, 1)"
  )
    .bind(herramienta, INTENCION[herramienta], email, recorta(c.empresa, 120), JSON.stringify(detalle))
    .run();
  return json({ ok: true });
};
