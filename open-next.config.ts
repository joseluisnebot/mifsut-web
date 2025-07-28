// @ts-nocheck            // ← desactiva los errores de tipos
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  /* -------------
     R2 STATIC ASSETS
     ------------- */
  r2: {
    binding: "ASSETS",                 // mismo nombre que en wrangler.toml
    bucketName: "mifsut-web-assets",   // bucket de producción
    previewBucketName: "mifsut-web-assets-preview" // bucket “preview” (opcional)
  }
});
