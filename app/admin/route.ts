export const runtime = "edge";

/**
 * Redirige /admin a /admin/index.html
 * (necesario en producción porque Next.js intenta renderizar la ruta
 * en lugar de servir el HTML estático de public/admin/index.html).
 */
export function GET(request: Request) {
  const url = new URL("/admin/index.html", new URL(request.url).origin);
  return Response.redirect(url, 302);
}
