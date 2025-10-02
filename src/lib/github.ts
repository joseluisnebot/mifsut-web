// src/lib/github.ts

export type GitHubAsset = {
  name: string;
  browser_download_url: string;
};

export type GitHubRelease = {
  tag_name: string;          // p.ej. "v1.0.0"
  published_at: string;      // ISO date
  assets: GitHubAsset[];
  html_url: string;
};

export async function getLatestRelease(
  owner: string,
  repo: string,
  revalidateSeconds = 300
): Promise<GitHubRelease | null> {
  const headers: Record<string, string> = { "User-Agent": "mifsut-web" };

  // Si defines GITHUB_TOKEN en Cloudflare Pages, lo usará automáticamente
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
  const res = await fetch(url, { headers, next: { revalidate: revalidateSeconds } });

  if (!res.ok) {
    // 403 (rate limit) u otros → devolvemos null para que la UI haga fallback
    console.warn(`[github] getLatestRelease fallo ${res.status}: ${await res.text()}`);
    return null;
  }

  const data = (await res.json()) as GitHubRelease;
  if (!data || !Array.isArray(data.assets)) return null;
  return data;
}

/** Devuelve la URL de descarga de un asset por nombre (o el primero si no existe coincidencia) */
export function getAssetDownloadUrl(
  release: GitHubRelease | null,
  preferredAssetName?: string
): string | null {
  if (!release || !release.assets?.length) return null;

  if (preferredAssetName) {
    const match = release.assets.find(
      (a) => (a.name || "").toLowerCase() === preferredAssetName.toLowerCase()
    );
    if (match?.browser_download_url) return match.browser_download_url;
  }
  return release.assets[0]?.browser_download_url ?? null;
}

/** Formatea una fecha ISO a 'DD/MM/AAAA' (rápido y suficiente) */
export function formatDateES(iso: string | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}
