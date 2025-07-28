// open-next.config.ts  (RAÍZ del proyecto)

import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * Configuración mínima:
 *  – bucket R2 para los estáticos         (obligatorio)
 *  – bucket R2 para preview (opcional)
 *  – nombre del Worker al desplegar
 */
export default defineCloudflareConfig({
  buckets: {
    static: {
      binding: "ASSETS",               // mismo nombre que en wrangler.toml
      bucketName: "mifsut-web-assets", // bucket de producción
      previewBucketName: "mifsut-web-assets-preview", // (opcional)
    },
  },

  // Opcional: personaliza el nombre del Worker
  workerName: "mifsut-web",
});
