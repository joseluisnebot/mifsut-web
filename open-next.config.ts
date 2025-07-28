// open-next.config.ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  r2: {
    binding: "ASSETS",            // ← nombre EXACTO del binding en wrangler.toml
    bucketName: "mifsut-web-assets",
    previewBucketName: "mifsut-web-assets-preview", // opcional, pero útil
  },
});
