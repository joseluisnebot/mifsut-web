export const onRequestGet: PagesFunction = async ({ env, request }) => {
  const clientId = env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return new Response("Missing GITHUB_CLIENT_ID", { status: 500 });
  }

  const origin = new URL(request.url).origin;
  const redirectUri = new URL("/api/oauth/callback", origin).toString();
  const state = crypto.randomUUID();

  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  // Si el repo es privado, usa "repo"; si es público, "public_repo"
  url.searchParams.set("scope", "repo");
  url.searchParams.set("state", state);

  const headers = new Headers({ Location: url.toString() });
  headers.append(
    "Set-Cookie",
    `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=300`
  );
  return new Response(null, { status: 302, headers });
};
