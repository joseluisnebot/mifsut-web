// open-next.config.ts
import { defineConfig } from "@opennextjs/cloudflare";

export default defineConfig({
  // con la configuración por defecto basta,
  // pero lo dejamos explícito por claridad
  outputMode: "workers",
});
