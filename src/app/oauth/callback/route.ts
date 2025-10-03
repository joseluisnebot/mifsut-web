export const runtime = 'edge';

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookie = req.cookies.get("oauth_state")?.value;

  if (!code || !state || !cookie || state !== cookie) {
    return new NextResponse("Invalid OAuth state", { status: 400 });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new NextResponse("Missing GitHub OAuth env vars", { status: 500 });
  }

  // Intercambiar el code por un access token
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
      redirect_uri: `${req.nextUrl.origin}/oauth/callback`,
      state,
    }),
  });

  if (!tokenRes.ok) return new NextResponse("OAuth token exchange failed", { status: 502 });

  const data = await tokenRes.json();
  const token = data.access_token;
  if (!token) return new NextResponse("No access token", { status: 502 });

  // HTML que envía el token de vuelta al panel Decap
  const html = `
<!doctype html><html><body>
<script>
  (function() {
    var payload = { token: ${JSON.stringify(token)} };

    function send() {
      try { (window.opener || window.parent).postMessage(payload, "*"); } catch (e) {}
      try { window.close(); } catch (e) {}
    }

    // Varios intentos para asegurar entrega
    send();
    setTimeout(send, 75);
    setTimeout(send, 150);
    setTimeout(send, 300);

    // Último recurso: redirigir al panel
    setTimeout(function(){ window.location.href = "/admin/index.html#/"; }, 600);
  })();
</script>
OK
</body></html>`;

  return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
}
