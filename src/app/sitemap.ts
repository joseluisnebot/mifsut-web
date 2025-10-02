// src/app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mifsut.com";
  return [{ url: `${base}/`, lastModified: new Date() }];
}
