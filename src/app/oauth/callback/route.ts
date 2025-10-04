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

  // 1) Formato string que espera Decap
  const msgString = `authorization:github:success:${token}`;
  // 2) Objeto alternativo
  const msgObject = { token };

  // 3) URL del admin con token en el hash (fallback reconocido por varias versiones)
  const adminHash = `#/` + encodeURIComponent(msgString); // quedará /admin/index.html#/%3Cmsg%3E
  const adminURL = `/admin/index.html${adminHash}`;

  const html = `
<!doctype html><html><body>
<script>
  (function() {
    var origin = ${JSON.stringify(url.origin)};
    var msgString = ${JSON.stringify(msgString)};
    var msgObject = ${JSON.stringify(msgObject)};
    var adminURL = ${JSON.stringify(adminURL)};

    function sendOnce() {
      try { (window.opener || window.parent).postMessage(msgString, origin); } catch(e) {}
      try { (window.opener || window.parent).postMessage(msgString, "*"); } catch(e) {}
      try { (window.opener || window.parent).postMessage(msgObject, origin); } catch(e) {}
      try { (window.opener || window.parent).postMessage(msgObject, "*"); } catch(e) {}
    }

    // Enviamos varias veces por si el listener tarda
    sendOnce();
    setTimeout(sendOnce, 150);
    setTimeout(sendOnce, 400);
    setTimeout(sendOnce, 800);
    setTimeout(sendOnce, 1200);

    // Fallback robusto: llevar el token en el hash al admin
    // Varias versiones del CMS leen ese hash y completan el login.
    setTimeout(function() {
      try { (window.opener || window.parent).location.href = adminURL; } catch(e) {}
      try { window.location.href = adminURL; } catch(e) {}
    }, 1500);

    // Cerrar el popup después
    setTimeout(function(){ try{ window.close(); }catch(e){} }, 2200);
  })();
</script>
OK
</body></html>`;

  return new Response(html, { headers: { "Content-Type": "text/html" } });
}
