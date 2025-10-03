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

  if (!tokenRes.ok) {
    return new Response("OAuth token exchange failed", { status: 502 });
  }

  const data = await tokenRes.json();
  const token = data.access_token;
  if (!token) return new Response("No access token", { status: 502 });

  const html = `
<!doctype html><html><body>
<script>
  (function() {
    var payload = { token: ${JSON.stringify(token)} };
    console.log("Sending token to Decap:", payload);

    function send() {
      try { 
        (window.opener || window.parent).postMessage(payload, "${url.origin}"); 
        console.log("postMessage sent:", payload);
      } catch (e) {
        console.error("postMessage error", e);
      }
    }

    send();
    setTimeout(send, 150);
    setTimeout(send, 400);

    // cerrar automáticamente
    setTimeout(function(){ window.close(); }, 800);
  })();
</script>
OK
</body></html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}
