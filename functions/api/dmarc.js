// GET /api/dmarc?dominio=ejemplo.com — revisa SPF, DKIM y DMARC de un dominio por DNS público.
import { json, bajoTope, igual } from "../../lib-fn/comun.js";

const DOMINIO = /^(?=.{4,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z][a-z0-9-]{1,62}$/;

// Selectores DKIM habituales. DKIM no se puede listar: solo se puede probar nombre a nombre.
const SELECTORES = [
  "google", "selector1", "selector2", "default", "k1", "k2", "s1", "s2",
  "dkim", "mail", "smtp", "zoho", "protonmail", "mandrill", "mailjet", "brevo1",
  "cf2024-1", "k3", "s1-ionos", "s2-ionos",
];

const PROVEEDORES = [
  [/google\.com$|googlemail\.com$/, "Google Workspace"],
  [/outlook\.com$|protection\.outlook\.com$/, "Microsoft 365"],
  [/zoho\.(com|eu)$/, "Zoho Mail"],
  [/protonmail\.ch$|proton\.me$/, "Proton Mail"],
  [/ovh\.net$/, "OVH"],
  [/ionos\.(es|com|de)$|1and1\./, "IONOS"],
  [/secureserver\.net$/, "GoDaddy"],
  [/mailgun\.org$/, "Mailgun"],
  [/cloudflare\.net$/, "Cloudflare Email Routing"],
];

function normaliza(entrada) {
  let d = (entrada || "").trim().toLowerCase();
  if (d.includes("@")) d = d.split("@").pop();
  d = d.replace(/^[a-z]+:\/\//, "").split(/[/?#:]/)[0].replace(/\.$/, "").replace(/^www\./, "");
  try {
    d = new URL("http://" + d).hostname;
  } catch {
    return null;
  }
  return DOMINIO.test(d) ? d : null;
}

async function dns(nombre, tipo) {
  const r = await fetch(
    `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(nombre)}&type=${tipo}`,
    { headers: { accept: "application/dns-json" } }
  );
  if (!r.ok) throw new Error("dns");
  const d = await r.json();
  return { estado: d.Status, respuestas: d.Answer || [] };
}

// Un registro TXT puede venir troceado en varias cadenas entre comillas: se unen sin espacio.
const txt = (dato) => (dato.match(/"((?:[^"\\]|\\.)*)"/g) || [dato]).map((s) => s.replace(/^"|"$/g, "")).join("");

async function registrosTxt(nombre) {
  const { respuestas } = await dns(nombre, "TXT");
  return respuestas.filter((a) => a.type === 16).map((a) => txt(a.data));
}

// Cuenta las consultas DNS que provoca un SPF (el límite de la norma es 10).
async function consultasSpf(registro, presupuesto) {
  let total = 0;
  for (const parte of registro.split(/\s+/).slice(1)) {
    const m = parte.replace(/^[+\-~?]/, "");
    if (/^(a|mx|ptr)([:/]|$)/.test(m) || m.startsWith("exists:")) total += 1;
    const destino = m.startsWith("include:") ? m.slice(8) : m.startsWith("redirect=") ? m.slice(9) : null;
    if (destino) {
      total += 1;
      if (presupuesto.n <= 0) continue;
      presupuesto.n -= 1;
      try {
        const hijo = (await registrosTxt(destino)).find((t) => /^v=spf1(\s|$)/i.test(t));
        if (hijo) total += await consultasSpf(hijo, presupuesto);
      } catch {
        /* si un include no responde, seguimos con lo que hay */
      }
    }
  }
  return total;
}

function etiquetas(registro) {
  const o = {};
  for (const par of registro.split(";")) {
    const i = par.indexOf("=");
    if (i > 0) o[par.slice(0, i).trim().toLowerCase()] = par.slice(i + 1).trim();
  }
  return o;
}

export const onRequestGet = async ({ request, env }) => {
  const dominio = normaliza(new URL(request.url).searchParams.get("dominio"));
  if (!dominio) return json({ ok: false, error: "dominio" }, 400);

  let mx, raiz, dmarcTxt, dkim;
  try {
    [mx, raiz, dmarcTxt, dkim] = await Promise.all([
      dns(dominio, "MX"),
      registrosTxt(dominio),
      registrosTxt("_dmarc." + dominio),
      Promise.all(
        SELECTORES.map(async (s) => {
          const { respuestas } = await dns(`${s}._domainkey.${dominio}`, "TXT");
          const ok = respuestas.some((a) => a.type === 5 || (a.type === 16 && /(^|[;\s"])p=/.test(a.data)));
          return ok ? s : null;
        })
      ),
    ]);
  } catch {
    return json({ ok: false, error: "dns" }, 502);
  }
  if (mx.estado === 3) return json({ ok: false, error: "no-existe" }, 404);

  const avisos = []; // { nivel: 'mal' | 'ojo' | 'bien', texto }
  const servidores = mx.respuestas.filter((a) => a.type === 15).map((a) => a.data.split(" ").pop().replace(/\.$/, ""));
  const proveedor = PROVEEDORES.find(([re]) => servidores.some((s) => re.test(s)))?.[1] ?? null;
  if (!servidores.length)
    avisos.push({ nivel: "ojo", texto: "El dominio no tiene servidores de correo (MX): no recibe correo. Aun así conviene protegerlo para que nadie envíe en su nombre." });

  // SPF
  const spfs = raiz.filter((t) => /^v=spf1(\s|$)/i.test(t));
  const spf = { registro: spfs[0] ?? null, estado: "falta", consultas: null };
  if (spfs.length === 0) {
    avisos.push({ nivel: "mal", texto: "No hay registro SPF: los servidores que reciben tu correo no saben qué máquinas pueden enviar en tu nombre." });
  } else if (spfs.length > 1) {
    spf.estado = "duplicado";
    avisos.push({ nivel: "mal", texto: `Hay ${spfs.length} registros SPF. Solo puede haber uno: con varios, el SPF falla siempre.` });
  } else {
    const final = (spfs[0].match(/\s([+\-~?]?)all\s*$/i) || [])[1];
    spf.consultas = await consultasSpf(spfs[0], { n: 9 });
    spf.estado = "correcto";
    if (final === undefined && !/redirect=/.test(spfs[0])) {
      spf.estado = "abierto";
      avisos.push({ nivel: "mal", texto: "El SPF no termina en «-all» ni «~all»: no dice qué hacer con los envíos no autorizados." });
    } else if (final === "+" || final === "") {
      spf.estado = "abierto-total";
      avisos.push({ nivel: "mal", texto: "El SPF termina en «+all»: autoriza a cualquier servidor del mundo a enviar en tu nombre." });
    } else if (final === "?") {
      spf.estado = "abierto";
      avisos.push({ nivel: "ojo", texto: "El SPF termina en «?all» (neutro): no protege." });
    }
    if (spf.consultas > 10) {
      spf.estado = "demasiadas-consultas";
      avisos.push({ nivel: "mal", texto: `El SPF necesita ${spf.consultas} consultas DNS y el máximo es 10: los receptores lo dan por inválido. Suele pasar al acumular proveedores de envío.` });
    } else if (spf.estado === "correcto") {
      avisos.push({ nivel: "bien", texto: `SPF correcto (${spf.consultas} de 10 consultas DNS).` });
    }
  }

  // DKIM
  const selectores = dkim.filter(Boolean);
  if (selectores.length)
    avisos.push({ nivel: "bien", texto: `DKIM publicado (selector${selectores.length > 1 ? "es" : ""}: ${selectores.join(", ")}).` });
  else
    avisos.push({ nivel: "ojo", texto: "No encontramos DKIM con los nombres de selector habituales. Puede existir con otro nombre; sin DKIM, DMARC depende solo del SPF y los reenvíos fallan." });

  // DMARC
  let dmarcs = dmarcTxt.filter((t) => /^v=DMARC1/i.test(t));
  // Un subdominio sin DMARC propio hereda el del dominio padre (y su «sp», si lo tiene).
  let heredado = null;
  const partes = dominio.split(".");
  for (let i = 1; !dmarcs.length && partes.length - i >= 2; i++) {
    const padre = partes.slice(i).join(".");
    try {
      dmarcs = (await registrosTxt("_dmarc." + padre)).filter((t) => /^v=DMARC1/i.test(t));
    } catch {
      break;
    }
    if (dmarcs.length) heredado = padre;
  }
  const dmarc = { registro: dmarcs[0] ?? null, politica: null, pct: null, informes: false, heredado };
  let nivel;
  if (dmarcs.length === 0) {
    nivel = "sin-dmarc";
    avisos.push({ nivel: "mal", texto: "No hay registro DMARC: cualquiera puede enviar correos que parezcan tuyos y no te enteras." });
  } else if (dmarcs.length > 1) {
    nivel = "sin-dmarc";
    avisos.push({ nivel: "mal", texto: "Hay más de un registro DMARC: los receptores los ignoran todos." });
  } else {
    const e = etiquetas(dmarcs[0]);
    dmarc.politica = ((heredado && e.sp) || e.p || "").toLowerCase() || null;
    if (heredado) avisos.push({ nivel: "ojo", texto: `${dominio} no tiene DMARC propio: se le aplica el de ${heredado}.` });
    dmarc.pct = e.pct ? parseInt(e.pct, 10) : 100;
    dmarc.informes = Boolean(e.rua);
    if (dmarc.politica === "reject" && dmarc.pct >= 100) nivel = "protegido";
    else if (dmarc.politica === "reject" || dmarc.politica === "quarantine") nivel = "parcial";
    else nivel = "vigilando";

    if (nivel === "protegido") avisos.push({ nivel: "bien", texto: "DMARC en «p=reject»: los correos falsos con tu dominio se rechazan." });
    if (nivel === "parcial")
      avisos.push({ nivel: "ojo", texto: `DMARC en «p=${dmarc.politica}»${dmarc.pct < 100 ? ` aplicado solo al ${dmarc.pct} %` : ""}: los correos falsos van a spam o pasan en parte. Falta el último paso a «p=reject».` });
    if (nivel === "vigilando")
      avisos.push({ nivel: "mal", texto: "DMARC en «p=none»: solo vigila. Los correos falsos con tu dominio se siguen entregando." });
    if (!dmarc.informes)
      avisos.push({ nivel: "ojo", texto: "El DMARC no tiene dirección de informes (rua): no puedes ver quién envía con tu dominio." });
    if (!heredado && e.sp && e.sp.toLowerCase() === "none" && dmarc.politica !== "none")
      avisos.push({ nivel: "ojo", texto: "Los subdominios quedan sin proteger («sp=none»)." });
  }
  // Un «+all» hace pasar el SPF a cualquiera, y con eso también el DMARC.
  if (nivel === "protegido" && spf.estado === "abierto-total") nivel = "parcial";

  // La autocomprobación del panel interno (lleva la clave) no cuenta como uso.
  const interna = Boolean(env.ESTADO_CLAVE) && igual(request.headers.get("x-clave") ?? "", env.ESTADO_CLAVE);
  if (!interna && env.DB && (await bajoTope(env, "usos", 5000)))
    await env.DB.prepare("INSERT INTO usos (herramienta, resultado, detalle) VALUES ('dmarc', ?, ?)")
      .bind(nivel, JSON.stringify({ spf: spf.estado, dkim: selectores.length > 0, proveedor }))
      .run();

  return json({ ok: true, dominio, nivel, proveedor, servidores, spf, dkim: { selectores }, dmarc, avisos });
};
