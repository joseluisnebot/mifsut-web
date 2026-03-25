// src/app/sitemap.ts
export const dynamic = "force-static";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mifsut.com";
  return [{ url: `${base}/`, lastModified: new Date() }];
}
