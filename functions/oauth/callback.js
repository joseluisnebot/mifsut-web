export const onRequestGet = async ({ env, request }) => {
  const origin = new URL(request.url).origin;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookie = request.headers.get("cookie") || "";
  const stateCookieMatch = /oauth_state=([^;]+)/.exec(cookie);
  const stateCookie = stateCookieMatch ? stateCookieMatch[1] : null;

  if (!code || !state || !stateCookie || state !== stateCookie) {
    return new Response("Invalid OAuth state", { status: 400 });
  }
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return new Response("Missing GitHub OAuth env vars", { status: 500 });
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "mifsut-oauth"
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: new URL("/api/oauth/callback", origin).toString(),
      state
    })
  });

  if (!tokenRes.ok) return new Response("OAuth token exchange failed", { status: 502 });

  const data = await tokenRes.json();
  const token = data.access_token;
  if (!token) return new Response("No access token", { status: 502 });

  const html = `
<!doctype html><html><body>
<script>
  (function() {
    function send() {
      (window.opener || window.parent).postMessage(
        { token: ${JSON.stringify(token)} },
        "${origin}"
      );
      window.close();
    }
    send(); setTimeout(send, 75); setTimeout(send, 150);
  })();
</script>
OK
</body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html" } });
};

