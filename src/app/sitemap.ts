// src/app/sitemap.ts
export const dynamic = "force-static";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mifsut.com";
  const pages = [
    "/",
    "/blueprints/",
    "/sobre-mi/",
    "/colaboracion/",
    "/live/",
    "/privacidad/",
    "/terminos/",
    "/blueprints/tresycuarto/",
    "/blueprints/lamevaescola/",
    "/blueprints/elmeuinstitut/",
    "/blueprints/waveshare-weather-station/",
    "/blueprints/riego-controller/",
    "/blueprints/ubuntu-corp-iso/",
  ];
  return pages.map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));
}
