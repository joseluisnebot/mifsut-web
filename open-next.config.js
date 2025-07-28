import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  r2: {
    binding: "ASSETS",          // mismo nombre que en wrangler.toml
    bucketName: "mifsut-web-assets",
    previewBucketName: "mifsut-web-assets-preview", // opcional
  },
});
