export const runtime = "edge";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookie = req.headers.get("cookie") || "";
  const stateCookieMatch = /oauth_state=([^;]+)/.exec(cookie);
  const stateCookie = stateCookieMatch ? stateCookieMatch[1] : null;

  if (!code || !state || !stateCookie || state !== stateCookie) {
    return new Response("Invalid OAuth state", { status: 400 });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new Response("Missing GitHub OAuth env vars", { status: 500 });
  }

  // Intercambio code -> access_token
  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "mifsut-oauth",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: new URL("/oauth/callback", url.origin).toString(),
      state,
    }),
  });

  if (!tokenRes.ok) return new Response("OAuth token exchange failed", { status: 502 });

  const data = await tokenRes.json();
  const token = data.access_token;
  if (!token) return new Response("No access token", { status: 502 });

  // Enviar en ambos formatos y a ambos targets
  const payloadString = `authorization:github:success:${token}`;
  const payloadObject = { token };

  const html = `
<!doctype html><html><body>
<script>
  (function() {
    var payloadString = ${JSON.stringify(payloadString)};
    var payloadObject = ${JSON.stringify(payloadObject)};
    var origin = ${JSON.stringify(url.origin)};

    function sendOnce() {
      try { (window.opener || window.parent).postMessage(payloadString, origin); } catch(e) {}
      try { (window.opener || window.parent).postMessage(payloadString, "*"); } catch(e) {}
      try { (window.opener || window.parent).postMessage(payloadObject, origin); } catch(e) {}
      try { (window.opener || window.parent).postMessage(payloadObject, "*"); } catch(e) {}
    }

    // Reintentos durante 2s para asegurar que el listener de Decap esté listo
    sendOnce();
    setTimeout(sendOnce, 150);
    setTimeout(sendOnce, 400);
    setTimeout(sendOnce, 800);
    setTimeout(sendOnce, 1200);
    setTimeout(sendOnce, 1800);

    // Como último recurso, volver al panel
    setTimeout(function() {
      try { window.location.href = "/admin/index.html#/"; } catch(e) {}
    }, 2200);
  })();
</script>
OK
</body></html>`;

  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
